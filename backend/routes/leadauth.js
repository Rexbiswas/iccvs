import express from 'express';
const router = express.Router();
import Lead from '../models/Lead.js';
import { sendWelcomeEmail, sendAdminLeadEmail } from '../utils/notifications.js';

router.post('/submit', async (req, res) => {
    try {
        const { fullName, email, phone, city, industry, qualification, readyToStart } = req.body;

        const newLead = new Lead({
            fullName,
            email,
            phone,
            city,
            industry,
            qualification,
            readyToStart
        });

        await newLead.save();

        // Fire off notifications async
        Promise.allSettled([
            sendWelcomeEmail(email, fullName, industry || 'Design Course'),
            sendAdminLeadEmail('insd.admissionleads@gmail.com', req.body, 'Web Application Lead')
        ]).catch(err => console.error('[LeadAuth Notification Error]', err.message));

        res.status(201).json({ message: "Lead submitted successfully!", lead: newLead });
    } catch (err) {
        console.error("Lead Submission Error:", err);
        res.status(500).json({ message: "Server error: " + err.message });
    }
});

export default router;
