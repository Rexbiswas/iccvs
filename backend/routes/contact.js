import express from 'express';
import mongoose from 'mongoose';
import ContactLead from '../models/ContactLead.js';
import { sendSMS, sendWelcomeEmail, sendAdminLeadEmail, pushToNPF } from '../utils/notifications.js';
import { validateContact } from '../middleware/validate.js';

const router = express.Router();


router.post('/', validateContact, async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Clean and Validate Phone (Slice last 10 to ignore +91)
        const cleanedPhone = (phone || '').replace(/\D/g, '').slice(-10);
        if (cleanedPhone && cleanedPhone.length !== 10) {
            return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit mobile number' });
        }

        // 5-Minute Cooldown Check (Throttle to prevent replay spamming)
        if (mongoose.connection.readyState === 1) {
            const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
            const duplicate = await ContactLead.findOne({ email, createdAt: { $gte: fiveMinutesAgo } });
            if (duplicate) {
                return res.status(409).json({ success: false, message: 'You have already submitted an inquiry recently. Please wait 5 minutes.' });
            }
        }

        const newLead = new ContactLead({
            name,
            email,
            phone,
            subject,
            message
        });

        const lead = await newLead.save();

        // Backup data locally (Triple Redundancy)
        import('../utils/offlineLogger.js').then(m => m.backupOfflineData('contacts', req.body));

        // Send notifications
        Promise.allSettled([
            sendWelcomeEmail(email, name, subject || 'General Inquiry'),
            sendSMS(phone || '', name),
            sendAdminLeadEmail('iccvs.admissionleads@gmail.com', req.body, 'Contact Form Inquiry'),
            pushToNPF(req.body)
        ]).catch(err => console.error('[Contact Notification Error]', err.message));

        res.status(201).json({ 
            success: true, 
            message: 'Your message has been sent successfully!', 
            data: lead 
        });
    } catch (err) {
        console.error('Contact Submission Error:', err.message);
        res.status(500).json({ 
            success: false, 
            message: 'Server Error', 
            error: err.message 
        });
    }
});

export default router;
