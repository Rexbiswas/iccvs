import express from 'express';
import StepLead from '../models/StepLead.js';
import { sendSMS, sendWelcomeEmail, sendAdminLeadEmail } from '../utils/notifications.js';
import { backupOfflineData } from '../utils/offlineLogger.js';

const router = express.Router();

// @route   POST /api/step-leads
// @desc    Submit a new multi-step lead
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, mobile, email, city, readyToStart, inquiryType, marketingConsent } = req.body;

        // Clean and Validate Phone (Slice last 10 to ignore +91)
        const cleanedMobile = (mobile || '').replace(/\D/g, '').slice(-10);
        if (cleanedMobile.length !== 10) {
            return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit mobile number' });
        }

        console.log(`[StepLead] Processing submission for: ${name}`);

        const newLead = new StepLead({
            name,
            mobile,
            email,
            city,
            readyToStart,
            inquiryType,
            marketingConsent
        });

        // --- TRIPLE REDUNDANCY SAVING ---
        let savedLead = null;
        try {
            // Attempt Database Save with a hard timeout for Vercel
            const mongoose = (await import('mongoose')).default;
            if (mongoose.connection.readyState === 1) {
                savedLead = await Promise.race([
                    newLead.save(),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Database Save Timeout')), 5000))
                ]);
                console.log(`✅ [DB Success] Multi-step lead saved to MongoDB: ${name}`);
            } else {
                throw new Error('Database not connected');
            }
        } catch (dbErr) {
            console.warn(`⚠️ [DB Offline/Timeout] Data buffered locally. Reason: ${dbErr.message}`);
            savedLead = newLead;
        }

        // Always Backup data locally to JSON (Fail-Safe)
        backupOfflineData('step-leads', req.body);

        // Send notifications async - don't await to prevent timeout
        const processNotifications = async () => {
            try {
                await Promise.allSettled([
                    sendWelcomeEmail(email, name, "Career Roadmap"),
                    sendSMS(mobile, name),
                    sendAdminLeadEmail("insd.admissionleads@gmail.com", {
                        source: "Multi-Step Lead Form",
                        name,
                        email,
                        phone: mobile,
                        city,
                        inquiryType,
                        readyToStart: readyToStart === 'yes' ? "Expert Talk" : "Career Decide"
                    }, "Step Lead Inquiry")
                ]);
                console.log(`[Notifications] Processed for ${name}`);
            } catch (err) {
                console.error('[Notification Error]', err.message);
            }
        };

        processNotifications();

        res.status(201).json({ success: true, lead: savedLead });
    } catch (err) {
        console.error('StepLead Error:', err.message);
        res.status(500).json({ 
            success: false, 
            message: 'Server Error: ' + err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
});

export default router;
