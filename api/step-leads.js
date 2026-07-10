import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { sanitize } from './_utils/sanitize.js';
import { schemas, validateRequest } from './_utils/validate.js';

// StepLead Schema
const stepLeadSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    city: String,
    readyToStart: String,
    inquiryType: String,
    marketingConsent: Boolean,
    createdAt: { type: Date, default: Date.now }
});

const StepLead = mongoose.models.StepLead || mongoose.model('StepLead', stepLeadSchema);

export default async function handler(req, res) {
    // Sanitize inputs
    if (req.body) req.body = sanitize(req.body);
    if (req.query) req.query = sanitize(req.query);

    // Validate inputs
    if (req.method === 'POST') {
        if (!validateRequest(schemas.stepLead, req, res)) return;
    }

    // Handle CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

    try {
        if (mongoose.connection.readyState < 1) await mongoose.connect(process.env.MONGO_URI);
        
        // Clean and Validate Phone (Slice last 10 to ignore +91)
        const cleanedMobile = (req.body.mobile || req.body.phone || '').replace(/\D/g, '').slice(-10);
        if (cleanedMobile.length !== 10) {
            return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit mobile number' });
        }
        req.body.mobile = cleanedMobile; // Normalize to cleaned version
        
        // 5-Minute Cooldown Check (Throttle to prevent replay spamming)
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        const duplicate = await StepLead.findOne({ email: req.body.email, createdAt: { $gte: fiveMinutesAgo } });
        if (duplicate) {
            return res.status(409).json({ success: false, message: 'You have already submitted an inquiry recently. Please wait 5 minutes.' });
        }

        const lead = new StepLead(req.body);
        await lead.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.GOOGLE_EMAIL, pass: process.env.GOOGLE_APP_PASSWORD }
        });

        await transporter.sendMail({
            from: process.env.GOOGLE_EMAIL,
            to: 'iccvs.admissionleads@gmail.com',
            subject: `[Step Lead] ${req.body.name}`,
            text: JSON.stringify(req.body, null, 2)
        });

        return res.status(200).json({ success: true, message: "Step lead submitted successfully!" });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
