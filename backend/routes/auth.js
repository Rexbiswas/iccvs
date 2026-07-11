import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import History from '../models/History.js';
import axios from 'axios';
import { getGoogleTransporter } from '../utils/email.js';
import { sendWelcomeEmail, sendAdminLeadEmail, pushToNPF } from '../utils/notifications.js';
import { validateRegister, validateLogin, validateResetPassword } from '../middleware/validate.js';
import { verifyAdmin } from '../middleware/auth.js';

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

        // Log user registration history
        try {
            await new History({
                userId: newUser._id,
                action: 'USER_REGISTER',
                details: { username, email },
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            }).save();
        } catch (logErr) {
            console.error('[History Log Error] Failed to log registration:', logErr.message);
        }

        // Backup data locally (Fail-Safe)
        import('../utils/offlineLogger.js').then(m => m.backupOfflineData('users', req.body));

        // Unified Notifications
        Promise.allSettled([
            communications?.email ? sendWelcomeEmail(email, firstName, `${level || ''} in ${stream || 'Design'}`) : Promise.resolve(),
            sendAdminLeadEmail("iccvs.admissionleads@gmail.com", {
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

        // Log user login history
        try {
            await new History({
                userId: user._id,
                action: 'USER_LOGIN',
                details: { username: user.username, email: user.email },
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            }).save();
        } catch (logErr) {
            console.error('[History Log Error] Failed to log login:', logErr.message);
        }

        const { password: _, ...userInfo } = user._doc;
        res.status(200).json({ ...userInfo, token });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: "Server error during login." });
    }
});

// Send Test Email in Real-Time via Google OAuth2
router.post('/send-test-email', async (req, res) => {
    try {
        const { email, firstName } = req.body;
        if (!email) return res.status(400).json({ message: "Email required" });

        const transporter = await getGoogleTransporter();
        if (!transporter) return res.status(500).json({ message: "Transporter not available" });

        await transporter.sendMail({
            from: `"Admissions" <${process.env.GOOGLE_EMAIL || 'admissions@iccvs.edu.in'}>`,
            to: email,
            subject: "Welcome! Verification delivered",
            html: `<h2>Hello ${firstName || 'Future Designer'},</h2>
                   <p>You have explicitly opted-in to receive Email Communications from ICCVS.</p>
                   <p>We are thrilled to welcome you to our creative network!</p><br/>
                   <p>Enjoy your real-time notification.</p>`,
        });

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
            return res.status(200).json({ 
                message: "SMS logged in console! To get real SMS, add FAST2SMS_API_KEY to your backend .env" 
            });
        }

        await axios({
            method: 'POST',
            url: 'https://www.fast2sms.com/dev/bulkV2',
            headers: {
                "authorization": API_KEY,
                "Content-Type": "application/json"
            },
            data: {
                route: process.env.FAST2SMS_TEMPLATE_ID ? "dlt" : "q", 
                ...(process.env.FAST2SMS_TEMPLATE_ID && { 
                    sender_id: "INSDIN", 
                    variables_values: firstName || 'Future Designer' 
                }),
                message: process.env.FAST2SMS_TEMPLATE_ID 
                    ? process.env.FAST2SMS_TEMPLATE_ID 
                    : `Hello ${firstName || 'Future Designer'}, You have explicitly opted-in to receive Email Communications from ICCVS.`,
                language: "english",
                flash: 0,
                numbers: phone.replace(/[^0-9]/g, '').slice(-10),
            }
        });

        res.status(200).json({ 
            message: "SMS successfully sent in real time via Fast2SMS!" 
        });
    } catch (err) {
        console.error("SMS API Failed:", err?.response?.data || err.message);
        res.status(500).json({ message: "Server error sending SMS. API failed." });
    }
});

// Reset password maps
export const resetTokens = new Map();

// Generate Password Reset Token & Email it
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        const record = resetTokens.get(email);
        if (record && (Date.now() - record.createdAt < 60 * 1000)) {
            return res.status(429).json({ message: "Please wait 60 seconds before requesting another reset code." });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "No account found with this email." });

        const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
        resetTokens.set(email, { 
            token: resetToken, 
            expires: Date.now() + 15 * 60 * 1000, 
            createdAt: Date.now() 
        });

        const transporter = await getGoogleTransporter();
        if (transporter) {
            await transporter.sendMail({
                from: `"ICCVS Security" <${process.env.GOOGLE_EMAIL || 'security@iccvs.edu.in'}>`,
                to: email,
                subject: "Your Password Reset Code",
                html: `<h2>Password Reset Request</h2><p>Your 6-digit verification code is: <strong>${resetToken}</strong></p><p>This code will expire in 15 minutes.</p>`
            });
        }

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

        // Log reset event
        try {
            await new History({
                userId: user._id,
                action: 'USER_PASSWORD_RESET',
                details: { username: user.username, email: user.email },
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            }).save();
        } catch (logErr) {}

        resetTokens.delete(email);

        res.status(200).json({ message: "Password updated successfully! You can now login." });
    } catch (err) {
        res.status(500).json({ message: "Server error resetting password." });
    }
});

// User CRUD (Admin-protected)
// Get all users
router.get('/users', verifyAdmin, async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete user
router.delete('/users/:id', verifyAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Log action
        try {
            await new History({
                action: 'USER_DELETE',
                details: { deletedUserId: req.params.id, username: user.username, email: user.email },
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            }).save();
        } catch (logErr) {}

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
