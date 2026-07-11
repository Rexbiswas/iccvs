import express from 'express';
const router = express.Router();
import History from '../models/History.js';
import { verifyAdmin } from '../middleware/auth.js';

// Get all history logs (Admin only)
router.get('/', verifyAdmin, async (req, res) => {
    try {
        const logs = await History.find()
            .populate('userId', 'username email')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: logs.length, data: logs });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Create history log
router.post('/', async (req, res) => {
    try {
        const { userId, action, details } = req.body;
        const newLog = new History({
            userId,
            action,
            details,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent']
        });
        await newLog.save();
        res.status(201).json({ success: true, data: newLog });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Clear history logs (Admin only)
router.delete('/', verifyAdmin, async (req, res) => {
    try {
        await History.deleteMany({});
        res.status(200).json({ success: true, message: "History logs cleared successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
