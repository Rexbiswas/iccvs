import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Enquiry from '../backend/models/Enquiry.js';
import History from '../backend/models/History.js';
import { connectDB } from './_utils/db.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Standalone Admission Route (Legacy/Direct)
app.post('/admission', async (req, res) => {
    await connectDB();
    try {
        const { name, email, phone, mobile, course, program } = req.body;
        
        if (!name || !email || (!phone && !mobile)) {
            return res.status(400).json({ success: false, message: "Name, email, and phone are required" });
        }

        const cleanedPhone = (phone || mobile || '').replace(/\D/g, '').slice(-10);

        const newEnquiry = new Enquiry({
            name,
            email,
            phone: cleanedPhone,
            type: 'admission',
            course: course || program,
            additionalInfo: { ...req.body }
        });

        await newEnquiry.save();

        // Log action in history
        try {
            await new History({
                action: 'ENQUIRY_SUBMIT',
                details: { enquiryId: newEnquiry._id, name, email, type: 'admission' },
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            }).save();
        } catch (logErr) {}

        // Send Email (Wrap in try-catch so it doesn't crash the route on Vercel if SMTP fails)
        try {
            if (process.env.GOOGLE_EMAIL && process.env.GOOGLE_APP_PASSWORD) {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.GOOGLE_EMAIL,
                        pass: process.env.GOOGLE_APP_PASSWORD
                    }
                });

                await transporter.sendMail({
                    from: process.env.GOOGLE_EMAIL,
                    to: 'iccvs.admissionleads@gmail.com',
                    subject: `[New Lead] ${name}`,
                    text: JSON.stringify(req.body, null, 2)
                });
                console.log("✅ Email sent successfully");
            }
        } catch (emailErr) {
            console.error("❌ Email sending failed during legacy route:", emailErr.message);
        }

        res.status(200).json({ success: true, message: "Lead saved successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Health Check
app.get('/health', (req, res) => res.send('API is Online'));
app.get('/api', (req, res) => res.send('Working now!'));

export default app;