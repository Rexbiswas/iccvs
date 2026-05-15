import mongoose from 'mongoose';

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

export default mongoose.model('Blog', blogSchema);
