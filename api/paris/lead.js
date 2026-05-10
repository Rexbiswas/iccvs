import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Paris Lead Schema (Inline for consistency with other Vercel handlers)
const ParisLeadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'interview_scheduled', 'accepted', 'rejected'],
        default: 'pending'
    },
    source: { type: String, default: 'Paris Project Page' }
}, { timestamps: true });

const ParisLead = mongoose.models.ParisLead || mongoose.model('ParisLead', ParisLeadSchema);

export default async function handler(req, res) {
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
        // Connect to DB
        if (mongoose.connection.readyState < 1) {
            if (!process.env.MONGO_URI) {
                throw new Error('MONGO_URI is missing from environment variables.');
            }
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 8000
            });
        }

        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Save Lead
        const lead = new ParisLead({ name, email, phone });
        await lead.save();

        // Send Email Notification
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GOOGLE_EMAIL,
                pass: process.env.GOOGLE_APP_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.GOOGLE_EMAIL,
            to: 'insd.admissionleads@gmail.com',
            subject: `[New Paris Project Lead] ${name}`,
            text: `A new application has been received for the Paris Project.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nPlease follow up with the candidate.`
        });

        return res.status(200).json({ 
            success: true, 
            message: "Application submitted successfully!" 
        });
    } catch (err) {
        console.error("❌ Paris Lead Error:", err.message);
        return res.status(500).json({ 
            success: false, 
            message: "Server Error: " + err.message 
        });
    }
}
