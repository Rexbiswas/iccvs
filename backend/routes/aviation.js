import express from 'express';
import mongoose from 'mongoose';
import AviationLead from '../models/AviationLead.js';

import { sendSMS, sendWelcomeEmail, sendAdminLeadEmail } from '../utils/notifications.js';
import { backupOfflineData } from '../utils/offlineLogger.js';

const router = express.Router();

router.post('/', async (req, res) => {
    console.log(`\n[Aviation] New Request Received at ${new Date().toISOString()}`);
    console.log(`[Aviation] Body:`, JSON.stringify(req.body, null, 2));
    
    try {
        const {
            name,
            email,
            phone,
            mobile,
            state,
            city,
            program,
            course,
            marketingConsent
        } = req.body;

        // Clean and Validate Phone (Slice last 10 to ignore +91)
        const cleanedPhone = (phone || mobile || '').replace(/\D/g, '').slice(-10);
        if (cleanedPhone.length !== 10) {
            return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit mobile number' });
        }

        const newLead = new AviationLead({
            name,
            email,
            phone: phone || mobile,
            state,
            city,
            program,
            course,
            marketingConsent
        });

        // --- TRIPLE REDUNDANCY SAVING ---
        let savedLead = null;
        let isRealDBSave = false;

        try {
            // 1. Attempt Database Save with a hard timeout
            if (mongoose.connection.readyState === 1) {
                savedLead = await Promise.race([
                    newLead.save(),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Database Save Timeout')), 5000))
                ]);
                console.log(`✅ [DB Success] Aviation Lead saved to MongoDB: ${name}`);
                isRealDBSave = true;
            } else {
                throw new Error('Database not connected');
            }
        } catch (dbErr) {
            console.warn(`⚠️ [DB Offline/Timeout] Aviation data buffered locally. Reason: ${dbErr.message}`);
            savedLead = newLead;
        }

        // 2. Always Backup to JSON (Fail-Safe)
        console.log(`[Aviation] 📁 Attempting local backup for: ${name}`);
        backupOfflineData('aviation', req.body);

        // Fire off notifications async - don't await to prevent timeout
        const processNotifications = async () => {
            try {
                await Promise.allSettled([
                    sendWelcomeEmail(email, name, course || program || 'Aviation & Cabin Crew Course'),
                    sendSMS(phone || mobile || '', name),
                    sendAdminLeadEmail('insd.admissionleads@gmail.com', req.body, 'Aviation Inquiry')
                ]);
                console.log(`[Aviation Notifications] Processed for ${name}`);
            } catch (err) {
                console.error('[Aviation Notification Error]', err.message);
            }
        };

        processNotifications();

        res.status(201).json({
            success: true,
            message: isRealDBSave ? 'Inquiry submitted successfully' : 'Inquiry received (Stored in Offline Buffer)',
            lead: savedLead
        });

    } catch (err) {
        console.error('AviationLead Submission Error:', err.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error: ' + err.message,
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
});

export default router;
