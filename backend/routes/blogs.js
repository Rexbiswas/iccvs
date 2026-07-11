import express from 'express';
import Blog from '../models/Blog.js';
import History from '../models/History.js';
import { verifyAdmin } from '../middleware/auth.js';
import { sendAdminLeadEmail } from '../utils/notifications.js';

const router = express.Router();

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, blogs });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Create blog post (Admin only)
router.post('/', verifyAdmin, async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        const savedBlog = await newBlog.save();
        
        // Log action in history
        try {
            await new History({
                action: 'BLOG_CREATE',
                details: { blogId: savedBlog._id, title: savedBlog.title },
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            }).save();
        } catch (logErr) {}



        // Notify Admin
        sendAdminLeadEmail('iccvs.admissionleads@gmail.com', req.body, 'New Blog Submission')
            .catch(err => console.error('[Blog Notification Error]', err.message));

        res.status(201).json({ success: true, blog: savedBlog });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
});

// Like / unlike blog post
router.patch('/:id/like', async (req, res) => {
    try {
        const { id } = req.params;
        const { action } = req.body; // 'like' or 'unlike'
        
        const increment = action === 'unlike' ? -1 : 1;
        
        const blog = await Blog.findByIdAndUpdate(
            id,
            { $inc: { likes: increment } },
            { new: true }
        );
        
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        
        res.status(200).json({ success: true, likes: blog.likes });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Delete blog post (Admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

        // Log action in history
        try {
            await new History({
                action: 'BLOG_DELETE',
                details: { blogId: id, title: blog.title },
                ipAddress: req.ip,
                userAgent: req.headers['user-agent']
            }).save();
        } catch (logErr) {}

        res.status(200).json({ success: true, message: 'Blog deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default router;
