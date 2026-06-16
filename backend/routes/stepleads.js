import express from 'express';
import StepLead from '../models/StepLead.js';
import { sendSMS, sendWelcomeEmail, sendAdminLeadEmail } from '../utils/notifications.js';
import { backupOfflineData } from '../utils/offlineLogger.js';

const router = express.Router();

// @route   POST /api/step-leads
// @desc    Submit a new multi-step lead
// @access  Public
router.post('/', async (req, res) => {
    console.log(`\n📩 [StepLead] New Request: ${req.body.name}`);
    try {
        const { name, mobile, phone, email, city, readyToStart, inquiryType, marketingConsent } = req.body;

        if (!name || !email || (!mobile && !phone) || !city || !readyToStart || !inquiryType) {
            return res.status(400).json({
                success: false,
                message: 'Required fields missing (Name, Email, Mobile, City, Ready to Start, Inquiry Type)'
            });
        }

        const mobileNumber = mobile || phone;

        // Clean and Validate Phone (Slice last 10 to ignore +91)
        const cleanedMobile = (mobileNumber || '').replace(/\D/g, '').slice(-10);
        if (cleanedMobile.length !== 10) {
            return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit mobile number' });
        }

        const newLead = new StepLead({
            name,
            mobile: mobileNumber,
            email,
            city,
            readyToStart,
            inquiryType,
            marketingConsent
        });

        // --- TRIPLE REDUNDANCY SAVING ---
        let savedLead = null;
        let isRealDBSave = false;
        try {
            const mongoose = (await import('mongoose')).default;
            if (mongoose.connection.readyState === 1) {
                savedLead = await Promise.race([
                    newLead.save(),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('Database Save Timeout')), 5000))
                ]);
                console.log(`✅ [StepLead] DB Success: ${name}`);
                isRealDBSave = true;
            } else {
                throw new Error('Database not connected');
            }
        } catch (dbErr) {
            console.warn(`⚠️ [StepLead] DB Offline. Buffering locally.`);
            savedLead = newLead;
        }

        // Always Backup data locally to JSON (Fail-Safe)
        backupOfflineData('stepleads', req.body);

        // Send notifications
        Promise.allSettled([
            sendWelcomeEmail(email, name, "Career Roadmap"),
            sendSMS(mobileNumber, name),
            sendAdminLeadEmail("insd.admissionleads@gmail.com", {
                ...req.body,
                phone: mobileNumber
            }, "Step Lead Inquiry")
        ]).catch(err => console.error('[StepLead Notifications] Error:', err.message));

        res.status(201).json({
            success: true,
            message: isRealDBSave ? 'Lead saved successfully' : 'Lead stored in offline buffer',
            lead: savedLead
        });
    } catch (err) {
        console.error('❌ [StepLead] Fatal Error:', err.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

export default router;
