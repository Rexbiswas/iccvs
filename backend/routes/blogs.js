import express from 'express';
import Blog from '../models/Blog.js';
import { sendAdminLeadEmail } from '../utils/notifications.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, blogs });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        const savedBlog = await newBlog.save();
        
        // Backup data locally (Fail-Safe)
        import('../utils/offlineLogger.js').then(m => m.backupOfflineData('blogs', req.body));

        // Notify Admin
        sendAdminLeadEmail('insd.admissionleads@gmail.com', req.body, 'New Blog Submission')
            .catch(err => console.error('[Blog Notification Error]', err.message));

        res.status(201).json({ success: true, blog: savedBlog });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
});

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

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Blog.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Blog deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default router;
