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
            savedLead = await newLead.save();
            console.log(`✅ [DB Success] Multi-step lead saved to MongoDB: ${name}`);
        } catch (dbErr) {
            console.warn(`⚠️ [DB Offline] Could not save multi-step lead yet. Data is buffered.`);
            savedLead = newLead;
        }

        // Always Backup data locally to JSON (Fail-Safe)
        backupOfflineData('step-leads', req.body);

        // Send notifications
        Promise.allSettled([
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
            })
        ]).then(() => {
            console.log(`[Notifications] Processed for ${name}`);
        }).catch(err => console.error('[Notification Error]', err.message));

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
