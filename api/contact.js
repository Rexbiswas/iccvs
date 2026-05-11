import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default async function handler(req, res) {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

    try {
        console.log('--- Contact Diagnostic ---');
        console.log('MONGO_URI:', process.env.MONGO_URI ? `Defined (len: ${process.env.MONGO_URI.length})` : 'UNDEFINED');
        
        if (mongoose.connection.readyState < 1) {
            if (!process.env.MONGO_URI) {
                throw new Error('[DEPLOYMENT_V2_CHECK]: MONGO_URI is missing from Vercel. Please go to Settings > Environment Variables, add it, and then click REDEPLOY.');
            }
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000
            });
            console.log("✅ MongoDB Connected (Contact)");
        }

        // Clean and Validate Phone
        const cleanedPhone = (req.body.phone || req.body.mobile || '').replace(/\D/g, '');
        if (cleanedPhone && cleanedPhone.length !== 10) {
            return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit mobile number.' });
        }
        
        // Normalize phone in body for duplicate check
        if (req.body.phone) req.body.phone = cleanedPhone;
        if (req.body.mobile) req.body.mobile = cleanedPhone;

        // Duplicate Check
        const existingContact = await Contact.findOne({
            $or: [
                { phone: req.body.phone },
                { email: req.body.email }
            ]
        });

        if (existingContact) {
            return res.status(409).json({ 
                success: false, 
                message: "A message has already been received from this email/phone. We will get back to you shortly!" 
            });
        }

        const lead = new Contact(req.body);
        await lead.save();
        console.log(`✅ Contact lead saved: ${req.body.name}`);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.GOOGLE_EMAIL, pass: process.env.GOOGLE_APP_PASSWORD }
        });

        await transporter.sendMail({
            from: process.env.GOOGLE_EMAIL,
            to: 'insd.admissionleads@gmail.com',
            subject: `[Contact Form] ${req.body.subject || 'General Inquiry'}`,
            text: JSON.stringify(req.body, null, 2)
        });

        return res.status(200).json({ success: true, message: "Message sent successfully!" });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
