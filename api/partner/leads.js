import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

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
        const existingLead = await Partner.findOne({
            $or: [
                { email: req.body.email },
                { mobile: req.body.mobile || req.body.contact }
            ]
        });

        if (existingLead) {
            return res.status(409).json({ 
                success: false, 
                message: "You have already submitted an inquiry with this email or mobile. Our team will contact you soon!" 
            });
        }

        const lead = new Partner(req.body);
        await lead.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.GOOGLE_EMAIL, pass: process.env.GOOGLE_APP_PASSWORD }
        });

        await transporter.sendMail({
            from: process.env.GOOGLE_EMAIL,
            to: 'insd.franchiseleads@gmail.com',
            subject: `[Franchise Lead] ${req.body.name}`,
            text: JSON.stringify(req.body, null, 2)
        });

        return res.status(200).json({ success: true, message: "Partner inquiry submitted successfully!" });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
