import express from 'express';
import mongoose from 'mongoose';
import ParisLead from '../models/ParisLead.js';
import { sendWelcomeEmail, sendSMS, sendAdminLeadEmail } from '../utils/notifications.js';

const router = express.Router();

router.post('/lead', async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const newLead = new ParisLead({ name, email, phone });

        let savedLead = null;
        // --- TRIPLE REDUNDANCY SAVING ---
        try {
            savedLead = await newLead.save();
            console.log(`✅ [DB Success] Paris Project saved for: ${name}`);
        } catch (dbErr) {
            console.warn(`⚠️ [DB Offline] Paris Project buffered for: ${name}`);
            savedLead = newLead;
        }

        // Backup data locally (Fail-Safe)
        import('../utils/offlineLogger.js').then(m => m.backupOfflineData('paris', req.body));

        // Send notifications (Optional but following project pattern)
        try {
            Promise.allSettled([
                sendWelcomeEmail(email, name, 'The Paris Project'),
                sendSMS(phone, name),
                sendAdminLeadEmail('insd.admissionleads@gmail.com', req.body, 'Paris Project Inquiry')
            ]).catch(err => console.error('[Paris Notification Error]', err.message));
        } catch (notifErr) {
            console.error('[Paris Notifications] Failed:', notifErr.message);
        }

        res.status(201).json({
            success: true,
            message: savedLead.id ? 'Application received successfully' : 'Application received (Dev Mode: DB offline)',
            lead: savedLead
        });

    } catch (err) {
        console.error('ParisLead Error:', err.message);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
    }
});

export default router;
