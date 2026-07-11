import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './_utils/db.js';
import Enquiry from '../backend/models/Enquiry.js';
import History from '../backend/models/History.js';
import { sendWelcomeEmail, sendAdminLeadEmail, pushToNPF } from '../backend/utils/notifications.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
    await connectDB();
    next();
});

app.post('/api/admission', async (req, res) => {
    try {
        const { name, email, phone, mobile, course, program, city, state, centre, center } = req.body;
        
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
            city,
            state,
            centre: centre || center,
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

        // Send notifications
        Promise.allSettled([
            sendWelcomeEmail(email, name, course || program || 'Design'),
            sendAdminLeadEmail("iccvs.admissionleads@gmail.com", {
                source: "Website Admission Inquiry",
                name,
                email,
                phone: cleanedPhone,
                city,
                centre: centre || center,
                program: course || program
            }),
            pushToNPF({
                name,
                email,
                phone: cleanedPhone,
                city,
                state,
                course: course || program,
                source: "Website Admission"
            })
        ]).catch(err => console.error('[Admission Notification Error]', err.message));

        res.status(200).json({ 
            success: true, 
            message: "Admission inquiry submitted successfully!",
            dbStatus: 'Connected'
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default app;
