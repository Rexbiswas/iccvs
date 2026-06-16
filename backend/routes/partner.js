import express from 'express';
import PartnerLead from '../models/PartnerLead.js';
import { sendSMS, sendWelcomeEmail, sendAdminLeadEmail } from '../utils/notifications.js';
import { validatePartner } from '../middleware/validate.js';

const router = express.Router();


router.post('/leads', validatePartner, async (req, res) => {
    try {
        const { 
            name, email, mobile, phone, investment, preference, state, city, 
            referred, company, industry, potential, message, contact, address 
        } = req.body;

        // Clean and Validate Phone (Slice last 10 to ignore +91)
        const cleanedMobile = (mobile || phone || contact || '').replace(/\D/g, '').slice(-10);
        if (cleanedMobile.length !== 10) {
            return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit mobile number' });
        }

        const newLead = new PartnerLead({
            name,
            email,
            mobile: mobile || phone || contact,
            investment,
            preference,
            state,
            city,
            referred,
            company,
            industry,
            potential,
            message,
            contact: contact || mobile || phone,
            address,
        });

        const lead = await newLead.save();

        // Backup data locally (Fail-Safe)
        import('../utils/offlineLogger.js').then(m => m.backupOfflineData('partner', req.body));

        // Send notifications
        Promise.allSettled([
            sendWelcomeEmail(email, name, 'Franchise/Partnership'),
            sendSMS(mobile || phone || contact || '', name),
            sendAdminLeadEmail('insd.franchiseleads@gmail.com', req.body, 'Franchise Inquiry')
        ]).catch(err => console.error('[Partner Notification Error]', err.message));

        res.json({ success: true, message: 'Partner inquiry submitted successfully!', data: lead });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
