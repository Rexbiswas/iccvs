import express from 'express';
import mongoose from 'mongoose';
import AdmissionLead from '../models/AdmissionLead.js';

import { sendSMS, sendWelcomeEmail, sendWhatsApp, sendAdminLeadEmail } from '../utils/notifications.js';

const router = express.Router();


router.post('/', async (req, res) => {
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

        let savedLead = null;
        const isDbConnected = mongoose.connection.readyState === 1;

        if (!isDbConnected) {
            console.warn(`[DB Status] Database not connected. Proceeding in Mock Mode for: ${name}`);
            savedLead = newLead; // Mock successful save for internal logical flow
        } else {
            try {
                savedLead = await newLead.save();
                console.log(`[DB] New lead saved: ${name}`);
            } catch (dbErr) {
                console.error(`[DB Error] Failed to save lead: ${dbErr.message}`);
                // Proceed anyway as fall-through mock for dev
                savedLead = newLead;
            }
        }

        
        // Fire off notifications async
        Promise.allSettled([
            sendWelcomeEmail(email, name, course || program || 'Design Course'),
            sendSMS(phone || mobile || '', name),
            sendAdminLeadEmail('insd.admissionleads@gmail.com', req.body, 'Admission Inquiry')
        ]).then(() => {
            console.log(`[Notifications] Processed for ${name}`);
        }).catch(err => console.error('[Notification Error]', err.message));

        res.status(201).json({ 
            success: true, 
            message: savedLead.id ? 'Inquiry submitted successfully' : 'Inquiry received (Mock Mode: DB offline)',
            lead: savedLead 
        });

    } catch (err) {
        console.error('AdmissionLead Submission Error:', err.message);
        res.status(500).json({ 
            success: false, 
            message: 'Internal Server Error', 
            error: err.message 
        });
    }
});

export default router;
