import express from 'express';
import mongoose from 'mongoose';
import Contact from '../models/Contact.js';
import History from '../models/History.js';
import { verifyAdmin } from '../middleware/auth.js';
import { sendSMS, sendWelcomeEmail, sendAdminLeadEmail, pushToNPF } from '../utils/notifications.js';
import { validateContact } from '../middleware/validate.js';

const router = express.Router();

// Submit a contact form (Public)
router.post('/', validateContact, async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Clean and Validate Phone (Slice last 10 to ignore +91)
        const cleanedPhone = (phone || '').replace(/\D/g, '').slice(-10);
        if (cleanedPhone && cleanedPhone.length !== 10) {
            return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit mobile number' });
        }

        // 5-Minute Cooldown Check (Throttle to prevent spamming)
        if (mongoose.connection.readyState === 1) {
            const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
            const duplicate = await Contact.findOne({ email, createdAt: { $gte: fiveMinutesAgo } });
            if (duplicate) {
                return res.status(409).json({ success: false, message: 'You have already submitted an inquiry recently. Please wait 5 minutes.' });
            }
        }

        const newContact = new Contact({
            name,
            email,
            phone: cleanedPhone,
            subject,
            message
        });

        const savedContact = await newContact.save();

        // Log action in history
        try {
            await new History({
                action: 'CONTACT_SUBMIT',
                details: { contactId: savedContact._id, name, email },
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            }).save();
        } catch (logErr) {}

        // Backup data locally (Triple Redundancy)
        import('../utils/offlineLogger.js').then(m => m.backupOfflineData('contacts', req.body));

        // Send notifications
        Promise.allSettled([
            sendWelcomeEmail(email, name, subject || 'General Inquiry'),
            cleanedPhone ? sendSMS(cleanedPhone, name) : Promise.resolve(),
            sendAdminLeadEmail('iccvs.admissionleads@gmail.com', req.body, 'Contact Form Inquiry'),
            pushToNPF(req.body)
        ]).catch(err => console.error('[Contact Notification Error]', err.message));

        res.status(201).json({ 
            success: true, 
            message: 'Your message has been sent successfully!', 
            data: savedContact 
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

// Get all contacts (Admin only)
router.get('/', verifyAdmin, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: contacts.length, data: contacts });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Delete contact submission (Admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) return res.status(404).json({ success: false, message: 'Contact message not found' });

        // Log action in history
        try {
            await new History({
                action: 'CONTACT_DELETE',
                details: { contactId: id, name: contact.name, email: contact.email },
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            }).save();
        } catch (logErr) {}

        res.status(200).json({ success: true, message: 'Contact message deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
