import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { sanitize } from './utils/sanitize.js';
import { schemas, validateRequest } from './utils/validate.js';

// Partner Schema
const partnerSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    city: String,
    investment: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const Partner = mongoose.models.Partner || mongoose.model('Partner', partnerSchema);

export default async function handler(req, res) {
    // Sanitize inputs
    if (req.body) req.body = sanitize(req.body);
    if (req.query) req.query = sanitize(req.query);

    // Validate inputs
    if (req.method === 'POST') {
        if (!validateRequest(schemas.partner, req, res)) return;
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
        const cleanedMobile = (req.body.mobile || req.body.phone || req.body.contact || '').replace(/\D/g, '').slice(-10);
        if (cleanedMobile.length !== 10) {
            return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit mobile number' });
        }
        req.body.mobile = cleanedMobile; // Normalize to cleaned version
        
        // Duplicate Check
        /*
        const existingLead = await Partner.findOne({
            $or: [
                { mobile: req.body.mobile },
                { email: req.body.email }
            ]
        });

        if (existingLead) {
            return res.status(409).json({ 
                success: false, 
                message: "You have already applied for a franchise. Our team is reviewing your application!" 
            });
        }
        */

        const lead = new Partner(req.body);
        await lead.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.GOOGLE_EMAIL, pass: process.env.GOOGLE_APP_PASSWORD }
        });

        await transporter.sendMail({
            from: process.env.GOOGLE_EMAIL,
            to: 'insd.franchiseleads@gmail.com',
            subject: `[New Franchise Lead] ${req.body.name}`,
            text: JSON.stringify(req.body, null, 2)
        });

        return res.status(200).json({ success: true, message: "Franchise inquiry submitted successfully!" });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
