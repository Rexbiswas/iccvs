import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import axios from 'axios';
import { getGoogleTransporter } from '../utils/email.js';
import { sendWelcomeEmail, sendAdminLeadEmail, pushToNPF } from '../utils/notifications.js';
import { validateRegister, validateLogin, validateResetPassword } from '../middleware/validate.js';


// Register User
router.post('/register', validateRegister, async (req, res) => {
    try {
        const {
            username, email, password, firstName, lastName, phone, dob, country,
            street1, street2, city, state, pinCode,
            centre, level, stream, scholarship,
            comments, communications
        } = req.body;

        // Clean and Validate Phone (Slice last 10 to ignore +91)
        const cleanedPhone = (phone || '').replace(/\D/g, '').slice(-10);
        if (cleanedPhone.length !== 10) {
            return res.status(400).json({ message: 'Please enter a valid 10-digit mobile number' });
        }

        const existingUser = await User.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (existingUser) {
            return res.status(400).json({ message: "User with this email or username already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
            dob,
            country,
            address: { street1, street2, city, state, pinCode },
            academic: { centre, level, stream, scholarship },
            comments,
            communications
        });

        await newUser.save();

        // Backup data locally (Fail-Safe)
        import('../utils/offlineLogger.js').then(m => m.backupOfflineData('users', req.body));

        // Unified Notifications
        Promise.allSettled([
            communications?.email ? sendWelcomeEmail(email, firstName, `${level || ''} in ${stream || 'Design'}`) : Promise.resolve(),
            sendAdminLeadEmail("insd.admissionleads@gmail.com", {
                source: "Student Registration",
                name: `${firstName} ${lastName}`,
                email,
                phone,
                city,
                centre,
                program: `${level || ''} ${stream || ''}`,
                scholarship: scholarship || "No"
            }),
            pushToNPF(req.body)
        ]).then(() => {
            console.log(`[Registration Notifications] Processed for ${firstName}`);
        }).catch(err => console.error('[Registration Notification Error]', err.message));

        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Server error: " + err.message });
    }
});

// Login User
router.post('/login', validateLogin, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "10d" }
        );

        const { password: _, ...userInfo } = user._doc;
        res.status(200).json({ ...userInfo, token });
    } catch (err) {
        res.status(500).json({ error: "Server error during login." });
    }
});

// Send Test Email in Real-Time via Google OAuth2
router.post('/send-test-email', async (req, res) => {
    try {
        const { email, firstName } = req.body;
        if (!email) return res.status(400).json({ message: "Email required" });

        const transporter = await getGoogleTransporter();

        await transporter.sendMail({
            from: `"INSD Admissions" <${process.env.GOOGLE_EMAIL || 'admissions@insd.edu.in'}>`,
            to: email,
            subject: "Welcome to INSD! Verification delivered",
            html: `<h2>Hello ${firstName || 'Future Designer'},</h2>
                   <p>You have explicitly opted-in to receive Email Communications from INSD.</p>
                   <p>We are thrilled to welcome you to our creative network!</p><br/>
                   <p>Enjoy your real-time notification.</p>`,
        });

        console.log("Real OAuth2 Message sent successfully to", email);

        res.status(200).json({
            message: "Email sent successfully in real time!"
        });

    } catch (err) {
        console.error("Email API Failed:", err);
        res.status(500).json({ message: "Server error sending email." });
    }
});

// Send Test SMS using Fast2SMS Gateway
router.post('/send-test-sms', async (req, res) => {
    try {
        const { phone, firstName } = req.body;
        if (!phone) return res.status(400).json({ message: "Phone required" });

        const API_KEY = process.env.FAST2SMS_API_KEY;

        if (!API_KEY) {
            console.log(`\n[DEV MODE - FAST2SMS_API_KEY Missing in .env]`);
            console.log(`From INSD institute`);
            console.log(`To: ${phone}`);
            console.log(`Message: Hello ${firstName || 'Future Designer'}, welcome to the INSD network! Your SMS notifications are active.`);
            console.log(`============================\n`);
            
            return res.status(200).json({ 
                message: "SMS logged in console! To get real SMS, add FAST2SMS_API_KEY to your backend .env" 
            });
        }

        // Fast2SMS Axios API Call
        const response = await axios({
            method: 'POST',
            url: 'https://www.fast2sms.com/dev/bulkV2',
            headers: {
                "authorization": API_KEY,
                "Content-Type": "application/json"
            },
            data: {
                // Option A: DLT Premium Route (INSDIN Sender Name)
                // Automatically switches to verified INSDIN header when FAST2SMS_TEMPLATE_ID is added to .env
                route: process.env.FAST2SMS_TEMPLATE_ID ? "dlt" : "q", 
                
                // If DLT is active, use the INSDIN Sender ID and pass the user's name as a dynamic variable
                ...(process.env.FAST2SMS_TEMPLATE_ID && { 
                    sender_id: "INSDIN", 
                    variables_values: firstName || 'Future Designer' 
                }),
                
                // If DLT is active, use the Template ID. If not, use the fallback text.
                message: process.env.FAST2SMS_TEMPLATE_ID 
                    ? process.env.FAST2SMS_TEMPLATE_ID 
                    : `Hello ${firstName || 'Future Designer'}, You have explicitly opted-in to receive Email Communications from INSD. We are thrilled to welcome you to our creative network! Enjoy your real-time notification.\n\nFrom INSD (+91 7701933935)`,
                
                language: "english",
                flash: 0,
                numbers: phone.replace(/[^0-9]/g, '').slice(-10), // Send to user's phone from frontend form
            }
        });

        console.log("Real SMS successfully sent via Fast2SMS to:", phone);
        res.status(200).json({ 
            message: "SMS successfully sent in real time via Fast2SMS!" 
        });

    } catch (err) {
        console.error("SMS API Failed:", err?.response?.data || err.message);
        res.status(500).json({ message: "Server error sending SMS. API failed." });
    }
});

// Mock In-Memory Store for Password Reset Tokens (In production, use Redis or DB fields)
export const resetTokens = new Map();

// Generate Password Reset Token & Email it
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        // 60-Second Cooldown Check (Throttle to prevent replay email bombing)
        const record = resetTokens.get(email);
        if (record && (Date.now() - record.createdAt < 60 * 1000)) {
            return res.status(429).json({ message: "Please wait 60 seconds before requesting another reset code." });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "No account found with this email." });

        // Generate 6 digit code
        const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
        resetTokens.set(email, { 
            token: resetToken, 
            expires: Date.now() + 15 * 60 * 1000, 
            createdAt: Date.now() 
        }); // 15 mins

        const transporter = await getGoogleTransporter();

        await transporter.sendMail({
            from: `"INSD Security" <${process.env.GOOGLE_EMAIL || 'security@insd.edu.in'}>`,
            to: email,
            subject: "Your Password Reset Code",
            html: `<h2>Password Reset Request</h2><p>Your 6-digit verification code is: <strong>${resetToken}</strong></p><p>This code will expire in 15 minutes.</p>`
        });

        console.log("Password Reset Sent!");
        res.status(200).json({ message: "Password reset code sent to your email!" });

    } catch (err) {
        console.error("Reset Email Error:", err);
        res.status(500).json({ message: "Server error sending reset code: " + err.message });
    }
});

// Verify Token and Update Password
router.post('/reset-password', validateResetPassword, async (req, res) => {
    try {
        const { email, code, newPassword } = req.body;

        const record = resetTokens.get(email);
        if (!record) return res.status(400).json({ message: "Invalid or expired request. Please try again." });
        if (Date.now() > record.expires) {
            resetTokens.delete(email);
            return res.status(400).json({ message: "Code has expired. Please request a new one." });
        }
        if (record.token !== code) return res.status(400).json({ message: "Incorrect verification code." });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found." });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        // Clear token upon success
        resetTokens.delete(email);

        res.status(200).json({ message: "Password updated successfully! You can now login." });
    } catch (err) {
        res.status(500).json({ message: "Server error resetting password." });
    }
});

export default router;
