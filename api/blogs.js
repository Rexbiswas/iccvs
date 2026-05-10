import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import nodemailer from 'nodemailer';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (err) {
        console.error("DB Connection Error:", err.message);
    }
};

// Blog Schema
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    readTime: { type: String },
    image: { type: String },
    content: { type: String, required: true },
    date: { type: String },
    likes: { type: Number, default: 0 }
}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

// GET all blogs
app.get('/api/blogs', async (req, res) => {
    await connectDB();
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, blogs });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// PATCH like a blog
app.patch('/api/blogs/:id/like', async (req, res) => {
    await connectDB();
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id, 
            { $inc: { likes: 1 } }, 
            { new: true }
        );
        res.status(200).json({ success: true, likes: blog.likes });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST new blog
app.post('/api/blogs', async (req, res) => {
    await connectDB();
    try {
        const blog = new Blog({
            ...req.body,
            likes: 0
        });
        const savedBlog = await blog.save();

        // Optional: Notify Admin via Email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GOOGLE_EMAIL,
                pass: process.env.GOOGLE_APP_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.GOOGLE_EMAIL,
            to: 'insd.admissionleads@gmail.com',
            subject: `[New Blog Post] ${req.body.title}`,
            text: `Author: ${req.body.author}\nCategory: ${req.body.category}\n\n${req.body.excerpt}`
        }).catch(err => console.error("Email Error:", err));

        res.status(201).json({ success: true, blog: savedBlog });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default app;
