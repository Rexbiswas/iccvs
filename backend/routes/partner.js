import express from 'express';
import PartnerLead from '../models/PartnerLead.js';
import { sendSMS, sendWelcomeEmail, sendAdminLeadEmail } from '../utils/notifications.js';

const router = express.Router();


router.post('/leads', async (req, res) => {
    try {
        const { 
            name, 
            email, 
            mobile, 
            phone,
            investment, 
            preference, 
            state, 
            city, 
            referred, 
            company, 
            industry, 
            potential, 
            message, 
            contact, 
            address 
        } = req.body;

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
