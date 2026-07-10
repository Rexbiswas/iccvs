import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { sanitize } from './_utils/sanitize.js';
import { schemas, validateRequest } from './_utils/validate.js';

dotenv.config();

// Aviation Lead Schema (Inline for consistency with other Vercel handlers)
const AviationLeadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    state: { type: String },
    city: { type: String },
    program: { type: String },
    course: { type: String },
    marketingConsent: { type: Boolean, default: false }
}, { timestamps: true });

const AviationLead = mongoose.models.AviationLead || mongoose.model('AviationLead', AviationLeadSchema);

export default async function handler(req, res) {
    // Sanitize inputs
    if (req.body) req.body = sanitize(req.body);
    if (req.query) req.query = sanitize(req.query);

    // Validate inputs
    if (req.method === 'POST') {
        if (!validateRequest(schemas.admission, req, res)) return;
    }

    // Handle CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        // --- Serverless Diagnostic ---
        console.log('--- Aviation Serverless Diagnostic ---');
        console.log('MONGO_URI:', process.env.MONGO_URI ? `Defined (len: ${process.env.MONGO_URI.length})` : 'UNDEFINED');
        console.log('GOOGLE_EMAIL:', process.env.GOOGLE_EMAIL ? 'Defined' : 'UNDEFINED');
        console.log('--- End Diagnostic ---');

        // Connect to DB
        if (mongoose.connection.readyState < 1) {
            if (!process.env.MONGO_URI) {
                throw new Error('MONGO_URI is missing from environment variables.');
            }
            console.log('📡 Connecting to MongoDB Atlas (Aviation Serverless)...');
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 8000
            });
            console.log("✅ MongoDB Connected Successfully");
        }

        const { name, email, phone, state, city, program, course, marketingConsent } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // 10-Digit Validation (Slice last 10 to ignore +91)
        const cleanedPhone = phone.replace(/\D/g, '').slice(-10);
        if (cleanedPhone.length !== 10) {
            return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit mobile number' });
        }

        // 5-Minute Cooldown Check (Throttle to prevent replay spamming)
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        const duplicate = await AviationLead.findOne({ email, createdAt: { $gte: fiveMinutesAgo } });
        if (duplicate) {
            return res.status(409).json({ success: false, message: 'You have already submitted an inquiry recently. Please wait 5 minutes.' });
        }

        // Save Lead
        const lead = new AviationLead({
            name,
            email,
            phone: cleanedPhone,
            state,
            city,
            program,
            course,
            marketingConsent
        });
        await lead.save();
        console.log(`✅ Aviation Lead saved: ${name}`);

        // Send Email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GOOGLE_EMAIL,
                pass: process.env.GOOGLE_APP_PASSWORD
            }
        });

        // Build a readable list of lead details
        const detailsHtml = Object.entries(req.body)
            .filter(([key, value]) => value && typeof value !== 'object')
            .map(([key, value]) => `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</li>`)
            .join('');

        await transporter.sendMail({
            from: `"ICCVS Lead System" <${process.env.GOOGLE_EMAIL || 'admissions@iccvs.edu.in'}>`,
            to: 'iccvs.admissionleads@gmail.com',
            subject: `[New Aviation Lead] ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #db3436; border-bottom: 2px solid #db3436; padding-bottom: 10px;">New Aviation Submission</h2>
                    <p>A new lead has been captured on the ICCVS Aviation page.</p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <ul style="list-style: none; padding: 0;">
                            ${detailsHtml}
                        </ul>
                    </div>
                    <p style="font-size: 12px; color: #777;">Captured on: ${new Date().toLocaleString()}</p>
                </div>
            `
        });
        console.log('✅ Notification email sent');

        return res.status(200).json({ 
            success: true, 
            message: "Aviation inquiry submitted successfully!",
            dbStatus: 'Connected'
        });
    } catch (err) {
        console.error("❌ Aviation Route Error:", err.message);
        return res.status(500).json({ 
            success: false, 
            message: "Server Error: " + err.message,
            error: err.message
        });
    }
}
