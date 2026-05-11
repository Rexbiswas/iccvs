import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Admission Schema
const admissionSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    course: String,
    state: String,
    city: String,
    center: String,
    createdAt: { type: Date, default: Date.now }
});

const Admission = mongoose.models.Admission || mongoose.model('Admission', admissionSchema);

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
        // --- EXTENDED DEBUG LOGGING ---
        console.log('--- Serverless Diagnostic ---');
        console.log('MONGO_URI:', process.env.MONGO_URI ? `Defined (len: ${process.env.MONGO_URI.length})` : 'UNDEFINED');
        console.log('GOOGLE_EMAIL:', process.env.GOOGLE_EMAIL ? 'Defined' : 'UNDEFINED');
        console.log('--- End Diagnostic ---');

        // Connect to DB with user requested options
        if (mongoose.connection.readyState < 1) {
            if (!process.env.MONGO_URI) {
                throw new Error('[DEPLOYMENT_V2_CHECK]: MONGO_URI is missing from Vercel. Please go to Settings > Environment Variables, add it, and then click REDEPLOY.');
            }
            console.log('📡 Connecting to MongoDB Atlas (Serverless)...');
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 8000
            });
            console.log("✅ MongoDB Connected Successfully");
        }

        // Save Lead with field normalization
        const leadData = {
            ...req.body,
            phone: req.body.phone || req.body.mobile // Support both field names
        };

        // --- DUPLICATE CHECK LOGIC ---
        const existingLead = await Admission.findOne({
            $or: [
                { phone: leadData.phone },
                { email: leadData.email }
            ]
        });

        if (existingLead) {
            console.log(`⚠️ Duplicate Lead Attempt: ${leadData.name} (${leadData.phone})`);
            return res.status(409).json({ 
                success: false, 
                message: "You have already submitted an inquiry with this email or phone number. Our team will contact you soon!" 
            });
        }

        const lead = new Admission(leadData);
        await lead.save();
        console.log(`✅ Lead saved: ${leadData.name}`);

        // Send Email
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
            subject: `[New Admission Lead] ${req.body.name}`,
            text: JSON.stringify(req.body, null, 2)
        });
        console.log('✅ Notification email sent');

        return res.status(200).json({ 
            success: true, 
            message: "Admission inquiry submitted successfully!",
            dbStatus: 'Connected'
        });
    } catch (err) {
        console.error("❌ Admission Error:", err.message);
        return res.status(500).json({ 
            success: false, 
            message: "Server Error: " + err.message,
            error: err.message
        });
    }
}
