import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Initialize
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
const connectDB = async () => {
    console.log('🔍 MONGO_URI Debug:', process.env.MONGO_URI ? 'Defined (length: ' + process.env.MONGO_URI.length + ')' : 'UNDEFINED');
    if (mongoose.connection.readyState >= 1) return;
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('[DEPLOYMENT_V2_CHECK]: MONGO_URI is missing from Vercel. Please go to Settings > Environment Variables, add it, and then click REDEPLOY.');
        }
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("DB Connection Error:", err.message);
    }
};

// Admission Schema (Inline to avoid import issues)
const admissionSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    course: String,
    createdAt: { type: Date, default: Date.now }
});
const Admission = mongoose.models.Admission || mongoose.model('Admission', admissionSchema);

// Standalone Admission Route
app.post('/admission', async (req, res) => {
    await connectDB();
    try {
        const leadData = {
            ...req.body,
            phone: req.body.phone || req.body.mobile
        };
        const lead = new Admission(leadData);
        await lead.save();

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
            subject: `[New Lead] ${req.body.name}`,
            text: JSON.stringify(req.body, null, 2)
        });

        res.status(200).json({ success: true, message: "Lead saved and email sent!" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Health Check
app.get('/health', (req, res) => res.send('API is Online'));
app.get('/api', (req, res) => res.send('Working now!'));

export default app;