import express from 'express';
import ContactLead from '../models/ContactLead.js';
import { sendSMS, sendWelcomeEmail, sendAdminLeadEmail } from '../utils/notifications.js';

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Clean and Validate Phone (Slice last 10 to ignore +91)
        const cleanedPhone = (phone || '').replace(/\D/g, '').slice(-10);
        if (cleanedPhone && cleanedPhone.length !== 10) {
            return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit mobile number' });
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
            sendAdminLeadEmail('insd.admissionleads@gmail.com', req.body, 'Contact Form Inquiry')
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
