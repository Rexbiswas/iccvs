import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

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
    // Handle CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

    try {
        if (mongoose.connection.readyState < 1) await mongoose.connect(process.env.MONGO_URI);
        
        // Duplicate Check
        const existingLead = await StepLead.findOne({
            $or: [
                { mobile: req.body.mobile },
                { email: req.body.email }
            ]
        });

        if (existingLead) {
            return res.status(409).json({ 
                success: false, 
                message: "This mobile or email is already registered. Our experts will call you soon!" 
            });
        }

        const lead = new StepLead(req.body);
        await lead.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.GOOGLE_EMAIL, pass: process.env.GOOGLE_APP_PASSWORD }
        });

        await transporter.sendMail({
            from: process.env.GOOGLE_EMAIL,
            to: 'insd.admissionleads@gmail.com',
            subject: `[Step Lead] ${req.body.name}`,
            text: JSON.stringify(req.body, null, 2)
        });

        return res.status(200).json({ success: true, message: "Step lead submitted successfully!" });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
