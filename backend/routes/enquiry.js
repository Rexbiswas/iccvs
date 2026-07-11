import express from 'express';
const router = express.Router();
import Enquiry from '../models/Enquiry.js';
import History from '../models/History.js';
import { verifyAdmin } from '../middleware/auth.js';
import { sendWelcomeEmail, sendAdminLeadEmail, pushToNPF } from '../utils/notifications.js';

// Submit a new enquiry
router.post('/', async (req, res) => {
    try {
        const {
            name, email, phone, mobile, type, course, program, city, state, centre,
            readyToStart, inquiryType, investment, preference, company, industry,
            qualification, message, additionalInfo
        } = req.body;

        if (!name || !email || (!phone && !mobile)) {
            return res.status(400).json({ success: false, message: "Name, email, and phone are required" });
        }

        const cleanedPhone = (phone || mobile || '').replace(/\D/g, '').slice(-10);

        const newEnquiry = new Enquiry({
            name,
            email,
            phone: cleanedPhone,
            type: type || 'general',
            course,
            program,
            city,
            state,
            centre,
            readyToStart,
            inquiryType,
            investment,
            preference,
            company,
            industry,
            qualification,
            message,
            additionalInfo
        });

        await newEnquiry.save();

        // Log action in history
        try {
            await new History({
                action: 'ENQUIRY_SUBMIT',
                details: { enquiryId: newEnquiry._id, name, email, type: type || 'general' },
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            }).save();
        } catch (logErr) {
            console.error('[History Log Error]', logErr.message);
        }

        // Send notification emails / CRM push (in background, do not block response)
        Promise.allSettled([
            sendWelcomeEmail(email, name, course || program || 'Design'),
            sendAdminLeadEmail("iccvs.admissionleads@gmail.com", {
                source: `Website Enquiry - ${type || 'General'}`,
                name,
                email,
                phone: cleanedPhone,
                city,
                centre,
                program: course || program,
                message
            }),
            pushToNPF({
                name,
                email,
                phone: cleanedPhone,
                city,
                state,
                course: course || program,
                source: `Website - ${type || 'General'}`
            })
        ]).then(() => {
            console.log(`[Enquiry Notifications] Complete for ${name}`);
        }).catch(err => console.error('[Enquiry Notification Error]', err.message));

        res.status(201).json({ success: true, message: "Inquiry submitted successfully!", data: newEnquiry });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get all enquiries (Admin only)
router.get('/', verifyAdmin, async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: enquiries.length, data: enquiries });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Update enquiry status (Admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!enquiry) return res.status(404).json({ success: false, message: "Enquiry not found" });

        // Log action in history
        try {
            await new History({
                action: 'ENQUIRY_STATUS_UPDATE',
                details: { enquiryId: enquiry._id, status },
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            }).save();
        } catch (logErr) {}

        res.status(200).json({ success: true, message: "Enquiry status updated successfully", data: enquiry });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Delete an enquiry (Admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
        if (!enquiry) return res.status(404).json({ success: false, message: "Enquiry not found" });

        // Log action in history
        try {
            await new History({
                action: 'ENQUIRY_DELETE',
                details: { enquiryId: enquiry._id, name: enquiry.name, email: enquiry.email },
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            }).save();
        } catch (logErr) {}

        res.status(200).json({ success: true, message: "Enquiry deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
