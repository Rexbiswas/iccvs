import express from 'express';
import mongoose from 'mongoose';
import AdmissionLead from '../models/AdmissionLead.js';
import { validateAdmission } from '../middleware/validate.js';

import { sendSMS, sendWelcomeEmail, sendWhatsApp, sendAdminLeadEmail } from '../utils/notifications.js';
import { backupOfflineData } from '../utils/offlineLogger.js';

const router = express.Router();


router.post('/', validateAdmission, async (req, res) => {
    console.log(`\n📩 [Admission] New Request Received at ${new Date().toISOString()}`);
    console.log(`📦 [Admission] Body:`, JSON.stringify(req.body, null, 2));
    
    try {
        const {
            name,
            email,
            phone,
            mobile,
            state,
            city,
            centre,
            program,
            course,
            referred,
            marketingConsent,
            readyToStart,
            industry,
            qualification
        } = req.body;

        // Clean and Validate Phone (Slice last 10 to ignore +91)
        const cleanedPhone = (phone || mobile || '').replace(/\D/g, '').slice(-10);
        if (cleanedPhone.length !== 10) {
            return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit mobile number' });
        }

        const newLead = new AdmissionLead({
            name,
            email,
            phone: phone || mobile,
            state,
            city,
            centre,
            program,
            course,
            referred,
            marketingConsent,
            readyToStart,
            industry,
            qualification
        });

        // --- TRIPLE REDUNDANCY SAVING ---
        let savedLead = null;

        try {
            // 1. Attempt Database Save with a hard timeout for Vercel
            if (mongoose.connection.readyState === 1) {
                savedLead = await Promise.race([
                    newLead.save(),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Database Save Timeout')), 5000))
                ]);
                console.log(`✅ [DB Success] Lead saved to MongoDB: ${name}`);
            } else {
                throw new Error('Database not connected');
            }
        } catch (dbErr) {
            console.warn(`⚠️ [DB Offline/Timeout] Data buffered locally. Reason: ${dbErr.message}`);
            savedLead = newLead;
        }

        // 2. Always Backup to JSON (Fail-Safe)
        console.log(`[Admission] 📁 Attempting local backup for: ${name}`);
        backupOfflineData('admission', req.body);


        // Fire off notifications async - don't await to prevent timeout
        const processNotifications = async () => {
            try {
                await Promise.allSettled([
                    sendWelcomeEmail(email, name, course || program || 'Design Course'),
                    sendSMS(phone || mobile || '', name),
                    sendAdminLeadEmail('insd.admissionleads@gmail.com', req.body, 'Admission Inquiry')
                ]);
                console.log(`[Notifications] Processed for ${name}`);
            } catch (err) {
                console.error('[Notification Error]', err.message);
            }
        };

        processNotifications();

        res.status(201).json({
            success: true,
            message: savedLead && !savedLead.isNew ? 'Inquiry submitted successfully' : 'Inquiry received (Mock Mode: DB offline)',
            lead: savedLead
        });

    } catch (err) {
        console.error('AdmissionLead Submission Error:', err.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error: ' + err.message,
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
});

export default router;
