import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, Clock, User, ArrowUpRight, 
    Share2, Heart, BookOpen, ChevronRight,
    MessageSquare, X, Plus, Edit3, Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedPost, setSelectedPost] = useState(null);
    const [isWriting, setIsWriting] = useState(false);
    const [newPost, setNewPost] = useState({ 
        title: '', 
        excerpt: '', 
        author: '',
        category: 'Fashion', 
        content: '', 
        image: 'https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const categories = ['All', 'Fashion', 'Interior', 'Graphic', 'Luxury', 'Career'];
    
    const templates = {
        Fashion: {
            title: "Trend Report: [Seasonal Trend Name] 2026",
            excerpt: "Analyzing the shift towards [Trend] and its impact on the upcoming fashion cycle.",
            content: "## The Resurgence of [Trend]\nDesigners this season are focusing on...\n\n### Key Materiality\nWe are seeing a heavy use of [Material] which symbolizes...\n\n### Global Impact\nThis trend is more than just aesthetic; it reflects a deeper cultural shift towards..."
        },
        Interior: {
            title: "Maximizing Small Spaces: [Concept] Approach",
            excerpt: "How [Concept] is helping urban dwellers transform compact apartments into luxury living spaces.",
            content: "## The Art of Space Optimization\nIn modern cities, space is a luxury. Here is how to...\n\n### Lighting Strategy\nNatural light plays a crucial role in...\n\n### Multipurpose Furniture\nChoosing pieces that serve dual functions like..."
        },
        Graphic: {
            title: "The Evolution of [Style Name] in Digital Branding",
            excerpt: "Why [Style] is making a comeback in modern app interfaces and marketing campaigns.",
            content: "## Defining the [Style] Aesthetic\nThis style is characterized by...\n\n### Why it Works Now\nIn a world of minimalist design, [Style] offers a breath of fresh air because...\n\n### Case Study\nLook at how [Brand Name] utilized this to increase engagement by..."
        },
        Career: {
            title: "5 Skills Every Junior [Designer Type] Needs in 2026",
            excerpt: "Navigating the entry-level market with these essential technical and soft skills.",
            content: "## The Entry-Level Landscape\nGetting your first job in design requires more than just a portfolio...\n\n### 1. [Skill Name]\nThis is critical because...\n\n### 2. [Skill Name]\nMastering this tool will set you apart from..."
        }
    };

    const categoryImages = {
        Fashion: [
            "https://images.unsplash.com/photo-1539109132314-34a77ae7012?w=800&q=80",
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
            "https://images.unsplash.com/photo-1529139513075-1231982e614d?w=800&q=80",
            "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
            "https://images.unsplash.com/photo-1564485371866-c5602058e469?w=800&q=80",
            "https://images.unsplash.com/photo-1581044777072-4767793a62d1?w=800&q=80",
            "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
            "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=800&q=80",
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
            "https://images.unsplash.com/photo-1479064566235-aa6a00b63bb3?w=800&q=80",
            "https://images.unsplash.com/photo-1537832816519-689ad163238b?w=800&q=80",
            "https://images.unsplash.com/photo-1507702553912-a15641e827c8?w=800&q=80",
            "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80",
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
            "https://images.unsplash.com/photo-1524041255072-7da0525d6b3b?w=800&q=80",
            "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80"
        ],
        Interior: [
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
            "https://images.unsplash.com/photo-1616489953149-80327f12e84b?w=800&q=80",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
            "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80",
            "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?w=800&q=80",
            "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80",
            "https://images.unsplash.com/photo-1615876234886-fd9a39faa97f?w=800&q=80",
            "https://images.unsplash.com/photo-1616489953149-80327f12e84b?w=800&q=80",
            "https://images.unsplash.com/photo-1615876234886-fd9a39faa97f?w=800&q=80",
            "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80",
            "https://images.unsplash.com/photo-1616594831818-83792033009d?w=800&q=80",
            "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80",
            "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800&q=80",
            "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?w=800&q=80",
            "https://images.unsplash.com/photo-1616489953149-80327f12e84b?w=800&q=80",
            "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80",
            "https://images.unsplash.com/photo-1615876234886-fd9a39faa97f?w=800&q=80",
            "https://images.unsplash.com/photo-1616489953149-80327f12e84b?w=800&q=80",
            "https://images.unsplash.com/photo-1615876234886-fd9a39faa97f?w=800&q=80",
            "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80"
        ],
        Graphic: [
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
            "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80",
            "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
            "https://images.unsplash.com/photo-1541462608141-ad60346369c0?w=800&q=80",
            "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
            "https://images.unsplash.com/photo-1614036417651-efe591214971?w=800&q=80",
            "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80",
            "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80",
            "https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?w=800&q=80",
            "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80",
            "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=800&q=80",
            "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800&q=80",
            "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&q=80",
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
            "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
            "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80",
            "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
            "https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&q=80"
        ],
        Luxury: [
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
            "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=800&q=80",
            "https://images.unsplash.com/photo-1560243563-062bff001d68?w=800&q=80",
            "https://images.unsplash.com/photo-1556905055-8f358a7a4bb4?w=800&q=80",
            "https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?w=800&q=80",
            "https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?w=800&q=80",
            "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80",
            "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80",
            "https://images.unsplash.com/photo-1551028150-64b9f398f678?w=800&q=80",
            "https://images.unsplash.com/photo-1551201602-3f945eca1150?w=800&q=80",
            "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?w=800&q=80",
            "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&q=80",
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
            "https://images.unsplash.com/photo-1556905055-8f358a7a4bb4?w=800&q=80",
            "https://images.unsplash.com/photo-1560243563-062bff001d68?w=800&q=80",
            "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=800&q=80",
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
            "https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?w=800&q=80",
            "https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?w=800&q=80",
            "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80"
        ],
        Career: [
            "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
            "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
            "https://images.unsplash.com/photo-1521791136064-7986c2959d93?w=800&q=80",
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
            "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
            "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
        ]
    };

    const handleImageError = (e) => {
        e.target.src = "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=800&q=80"; // Professional Design Fallback
    };

    const handleTemplateSelect = (category) => {
        if (templates[category]) {
            setNewPost(prev => ({
                ...prev,
                category: category,
                title: templates[category].title,
                excerpt: templates[category].excerpt,
                content: templates[category].content,
                // Automatically pick the first image for this category as a default
                image: categoryImages[category] ? categoryImages[category][0] : prev.image
            }));
        }
    };

    const [posts, setPosts] = useState([
        {
            id: "65ed3c2e1f4a5b6c7d8e9f01",
            title: "Sustainable Couture: The Future of Fashion in 2026",
            excerpt: "How ethical material sourcing and zero-waste patterns are redefining the global runway standards.",
            category: "Fashion",
            author: "Dr. Elena Rossi",
            date: "Mar 15, 2026",
            readTime: "6 min",
            likes: 124,
            image: "https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: "65ed3c2e1f4a5b6c7d8e9f02",
            title: "Smart Spaces: Psychology of Color in Living Environments",
            excerpt: "Exploring how interior shades influence mental well-being and productivity in modern urban homes.",
            category: "Interior",
            author: "Ar. Rahul Mehta",
            date: "Mar 12, 2026",
            readTime: "8 min",
            likes: 89,
            image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: "65ed3c2e1f4a5b6c7d8e9f03",
            title: "Typography & AI: Generative Design in Branding",
            excerpt: "The intersection of algorithmic creativity and traditional type design in the age of neural networks.",
            category: "Graphic",
            author: "Liam Wright",
            date: "Mar 10, 2026",
            readTime: "4 min",
            likes: 256,
            image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: "65ed3c2e1f4a5b6c7d8e9f04",
            title: "Quiet Luxury: Branding Strategies for the New Era",
            excerpt: "Why subtle elegance and heritage story-telling are winning over loud branding in the luxury market.",
            category: "Luxury",
            author: "Sophia Laurent",
            date: "Mar 05, 2026",
            readTime: "7 min",
            likes: 112,
            image: "https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: "65ed3c2e1f4a5b6c7d8e9f05",
            title: "Designing Your Portfolio for Global Studios",
            excerpt: "A comprehensive guide on what international creative directors look for in a junior design portfolio.",
            category: "Career",
            author: "Sanjay Malhotra",
            date: "Feb 28, 2026",
            readTime: "12 min",
            likes: 342,
            image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            id: "65ed3c2e1f4a5b6c7d8e9f06",
            title: "The Return of Hand-Drawn Illustration in Media",
            excerpt: "Analyzing the resurgence of organic, hand-crafted textures in a predominantly digital advertising space.",
            category: "Graphic",
            author: "Elena Rossi",
            date: "Feb 20, 2026",
            readTime: "5 min",
            likes: 76,
            image: "https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
    ]);

    useEffect(() => {
        if (selectedPost || isWriting) {
            document.body.classList.add('hide-navbar');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.classList.remove('hide-navbar');
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.classList.remove('hide-navbar');
            document.body.style.overflow = 'unset';
        };
    }, [selectedPost, isWriting]);

    useEffect(() => {
        const fetchBlogs = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get('/api/blogs');
                if (res.data.success && res.data.blogs.length > 0) {
                    const dbPosts = res.data.blogs.map(b => ({
                        ...b,
                        id: b._id
                    }));
                    setPosts(prev => {
                        const existingIds = new Set(prev.map(p => p.id));
                        const newPosts = dbPosts.filter(p => !existingIds.has(p.id));
                        return [...newPosts, ...prev];
                    });
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const filteredPosts = posts.filter(post => {
        const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Filter out locally deleted posts (persistent across refresh)
        const deletedIds = JSON.parse(localStorage.getItem('deleted_blogs') || '[]');
        const isNotDeleted = !deletedIds.includes(String(post.id));
        
        return matchesCategory && matchesSearch && isNotDeleted;
    });

    const isPostLiked = (postId) => {
        const likedBlogs = JSON.parse(localStorage.getItem('liked_blogs') || '[]');
        return likedBlogs.includes(String(postId));
    };

    const handleLike = async (e, postId) => {
        e.stopPropagation();
        
        // 1. Determine action based on localStorage
        const likedBlogs = JSON.parse(localStorage.getItem('liked_blogs') || '[]');
        const isAlreadyLiked = likedBlogs.includes(String(postId));
        const action = isAlreadyLiked ? 'unlike' : 'like';
        const increment = isAlreadyLiked ? -1 : 1;

        // 2. Optimistic UI update
        setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: (p.likes || 0) + increment } : p));
        if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(prev => ({ ...prev, likes: (prev.likes || 0) + increment }));
        }

        // 3. Update localStorage
        if (isAlreadyLiked) {
            const updated = likedBlogs.filter(id => id !== String(postId));
            localStorage.setItem('liked_blogs', JSON.stringify(updated));
        } else {
            localStorage.setItem('liked_blogs', JSON.stringify([...likedBlogs, String(postId)]));
        }

        // 4. Sync with Backend
        try {
            const res = await axios.patch(`/api/blogs/${postId}/like`, { action });
            if (res.data.success) {
                // Confirm server count (ensures UI stays synced with real DB counts)
                setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: res.data.likes } : p));
                if (selectedPost && selectedPost.id === postId) {
                    setSelectedPost(prev => ({ ...prev, likes: res.data.likes }));
                }
            }
        } catch (err) {
            console.error("Error toggling like:", err);
        }
    };

    const handleDelete = async (e, postId) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        console.log("Attempting to delete post with ID:", postId);
        
        // 1. Permanent Local Storage Deletion (for dummy posts)
        const deletedIds = JSON.parse(localStorage.getItem('deleted_blogs') || '[]');
        if (!deletedIds.includes(String(postId))) {
            localStorage.setItem('deleted_blogs', JSON.stringify([...deletedIds, String(postId)]));
        }

        // 2. Remove from UI immediately
        setPosts(prev => prev.filter(p => String(p.id) !== String(postId)));
        if (selectedPost && String(selectedPost.id) === String(postId)) {
            setSelectedPost(null);
        }

        // 3. API Deletion (for real DB posts)
        try {
            await axios.delete(`/api/blogs/${postId}`);
        } catch (err) {
            console.warn("API delete failed (likely a dummy post), but card removed from view.", err);
        }
    };

    const [copySuccess, setCopySuccess] = useState(false);

    const handleShare = async (e, post) => {
        e.stopPropagation();
        const shareUrl = `${window.location.origin}/blog?id=${post.id}`;
        
        try {
            // Try Native Share first if available and on HTTPS
            if (navigator.share && window.isSecureContext) {
                await navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: shareUrl
                });
            } else {
                // Fallback to Clipboard
                await navigator.clipboard.writeText(shareUrl);
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 3000);
            }
        } catch (err) {
            console.error("Share failed:", err);
            // Forced fallback if navigator.share was cancelled or failed
            try {
                await navigator.clipboard.writeText(shareUrl);
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 3000);
            } catch (clipErr) {
                console.error("Final fallback failed:", clipErr);
            }
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!newPost.title || !newPost.excerpt || !newPost.content || !newPost.author) return;
        
        try {
            const now = new Date();
            const formattedDate = now.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
            }) + " at " + now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });

            const postObj = {
                ...newPost,
                date: formattedDate,
                readTime: Math.max(1, Math.ceil(newPost.content.length / 500)) + " min",
                likes: 0
            };

            const res = await axios.post('/api/blogs', postObj);
            
            if (res.data.success) {
                const finalPost = { ...res.data.blog, id: res.data.blog._id };
                setPosts([finalPost, ...posts]);
                setIsWriting(false);
                setNewPost({ 
                    title: '', 
                    excerpt: '', 
                    author: '',
                    category: 'Fashion', 
                    content: '', 
                    image: 'https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
                });
            }
        } catch (error) {
            console.error("Error creating blog:", error);
            alert("Submission failed. Please check your connection.");
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-slate-900 selection:text-white">
            <SEO 
                title="Design Perspectives - The INSD Official Blog"
                description="Explore the latest insights in fashion, interior design, and creative industries. Professional trends and academic perspectives from INSD."
                canonical="https://subdomain.insd.edu.in/blog"
            />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-12 lg:px-24 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://ik.imagekit.io/fmldynl4j4/IMG_3440.JPG" 
                        alt="INSD Campus Life" 
                        className="w-full h-full object-cover scale-105"
                        onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[1px]" />
                </div>

                <div className="max-w-7xl mx-auto space-y-8 md:space-y-12 text-center relative z-10">
                    <div className="space-y-2 md:space-y-4">
                        <span className="text-primary font-black uppercase text-[8px] md:text-[10px] tracking-[0.4em] block">The Official Journal</span>
                        <h1 className="text-4xl md:text-7xl lg:text-[8rem] font-black text-white tracking-tighter leading-[0.9]">
                            INSD <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-white/50 to-secondary">BLOGS.</span>
                        </h1>
                    </div>

                    <div className="max-w-xl mx-auto flex flex-col md:flex-row items-center gap-4 px-2">
                        <div className="relative w-full">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-14 md:h-20 pl-14 pr-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white placeholder:text-white/40 focus:bg-white focus:text-slate-900 focus:placeholder:text-slate-400 transition-all outline-none text-base md:text-lg font-bold"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-w-2xl mx-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 md:px-8 py-2 md:py-4 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                                    activeCategory === cat 
                                    ? 'bg-primary text-white shadow-xl shadow-primary/30 scale-105' 
                                    : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- BLOG GRID --- */}
            <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-8">
                        <div className="w-16 h-16 border-4 border-slate-100 border-t-primary rounded-full animate-spin" />
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Curating the latest insights...</p>
                    </div>
                ) : filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                        {filteredPosts.map((post, idx) => (
                            <article 
                                key={post.id}
                                onClick={() => setSelectedPost(post)}
                                className="group flex flex-col h-full bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 cursor-pointer"
                            >
                                {/* Image Wrapper */}
                                <div className="relative aspect-16/10 overflow-hidden">
                                    <img 
                                        src={post.image} 
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        onError={handleImageError}
                                    />
                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-lg">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-10 flex flex-col flex-1 justify-between gap-6 md:gap-8">
                                    <div className="space-y-4 md:space-y-6">
                                        <div className="flex items-center gap-4 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">
                                            <div className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</div>
                                            <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                            <div>{post.date}</div>
                                        </div>
                                        <h3 className="text-xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors duration-300">
                                            {post.title}
                                        </h3>
                                        <p className="text-slate-500 text-xs md:text-base leading-relaxed font-medium line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    </div>

                                    <div className="pt-6 md:pt-8 border-t border-slate-50 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] uppercase text-slate-500">
                                                {post.author[0]}
                                            </div>
                                            <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{post.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <button 
                                                onClick={(e) => handleDelete(e, post.id)}
                                                className="p-2.5 rounded-full bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm"
                                                title="Delete Post"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <button 
                                                onClick={(e) => handleLike(e, post.id)}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all group/like ${isPostLiked(post.id) ? 'bg-red-50 text-red-500' : 'hover:bg-red-50 text-slate-400 hover:text-red-500'}`}
                                            >
                                                <Heart size={14} className={`${isPostLiked(post.id) ? 'fill-red-500' : 'group-hover/like:fill-red-500'} transition-all`} />
                                                <span className="text-[10px] font-black">{post.likes || 0}</span>
                                            </button>
                                            <button 
                                                onClick={(e) => handleShare(e, post)}
                                                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-primary transition-all"
                                                title="Share Article"
                                            >
                                                <Share2 size={14} />
                                            </button>
                                            <button className="text-primary hover:translate-x-1 transition-transform">
                                                <ArrowUpRight size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 md:py-32 space-y-6">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                            <Search size={32} />
                        </div>
                        <div className="space-y-2 px-6">
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tighter">No articles found</h3>
                            <p className="text-slate-500 text-sm md:text-base font-medium">We couldn't find any results for "{searchQuery}"</p>
                        </div>
                        <button 
                            onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                            className="text-primary font-black uppercase text-[10px] tracking-widest hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                <div className="mt-24 flex items-center justify-center">
                    <button 
                        onClick={() => setIsWriting(true)}
                        className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all duration-300 shadow-2xl hover:-translate-y-1"
                    >
                        <Edit3 size={14} /> Write Your Blog
                    </button>
                </div>
            </main>



            <Footer />

            {/* --- SHARE NOTIFICATION --- */}
            <AnimatePresence>
                {copySuccess && (
                    <motion.div 
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[10000] bg-slate-900 text-white px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl flex items-center gap-3 border border-white/10"
                    >
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        Link Copied to Clipboard
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- READ MODAL --- */}
            {selectedPost && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-12">
                    <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setSelectedPost(null)} />
                    <motion.div 
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="relative w-full max-w-4xl bg-white rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                    >
                        <button 
                            onClick={() => setSelectedPost(null)}
                            className="absolute z-10 top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur text-slate-900 rounded-full flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all shadow-lg"
                        >
                            <X size={20} className="stroke-[3]" />
                        </button>
                        
                        <div className="w-full h-48 sm:h-64 md:h-80 relative shrink-0">
                            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" onError={handleImageError} />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 pr-6">
                                <span className="px-4 py-1.5 bg-primary rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-4 inline-block">
                                    {selectedPost.category}
                                </span>
                                <h2 className="text-2xl md:text-5xl font-black text-white leading-tight mt-2">{selectedPost.title}</h2>
                            </div>
                        </div>

                        <div className="p-6 md:p-10 lg:p-16 overflow-y-auto bg-white flex-1 custom-scrollbar">
                            <div className="flex items-center justify-between pb-8 border-b border-slate-100 mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-black text-lg text-slate-500 uppercase">
                                        {selectedPost.author[0]}
                                    </div>
                                    <div>
                                        <div className="font-black text-sm uppercase tracking-widest text-slate-900">{selectedPost.author}</div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">
                                            <span>{selectedPost.date}</span>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                            <span className="flex items-center gap-1"><Clock size={10} /> {selectedPost.readTime} read</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={(e) => handleDelete(e, selectedPost.id)}
                                        className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
                                        title="Delete Article"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <button 
                                        onClick={(e) => handleLike(e, selectedPost.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all group/modal-like ${isPostLiked(selectedPost.id) ? 'bg-red-50 text-red-500 border-red-100' : 'border-slate-200 text-slate-400 hover:bg-red-50 hover:text-red-500 hover:border-red-100'}`}
                                    >
                                        <Heart size={16} className={`${isPostLiked(selectedPost.id) ? 'fill-red-500' : 'group-hover/modal-like:fill-red-500'} transition-all`} />
                                        <span className="text-xs font-black">{selectedPost.likes || 0}</span>
                                    </button>
                                    <button 
                                        onClick={(e) => handleShare(e, selectedPost)}
                                        className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-primary transition-colors"
                                        title="Share Article"
                                    >
                                        <Share2 size={16} />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="prose prose-lg prose-slate max-w-none">
                                <p className="text-xl md:text-2xl font-medium text-slate-600 leading-relaxed mb-8">
                                    {selectedPost.excerpt}
                                </p>
                                <div className="text-slate-600 leading-loose space-y-6">
                                    {selectedPost.content ? (
                                        <div dangerouslySetInnerHTML={{ __html: selectedPost.content.replace(/\n /g, '<br />') }} />
                                    ) : (
                                        <>
                                            <p>This is a placeholder for the extended blog content. In a full production environment, this would be fetched from a CMS like Sanity, Strapi, or Contentful.</p>
                                            <p>Design and creativity are at the core of everything we do. Through the exploration of form, function, and aesthetics, we reshape human experiences and interactions.</p>
                                            <h3 className="text-2xl font-black text-slate-900 mt-12 mb-4 uppercase tracking-tighter">The Vision Moving Forward</h3>
                                            <p>As we embrace the future of learning, the barriers between traditional crafts and digital innovations diminish. Our approach focuses on developing holistic and multidisciplinary capabilities.</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            , document.body)}

            {/* --- WRITE MODAL --- */}
            {isWriting && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8">
                    <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsWriting(false)} />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] max-h-[800px]"
                    >
                        {/* Write Form Side */}
                        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col h-full bg-slate-50 overflow-y-auto custom-scrollbar">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Draft Article</h2>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Publish to INSD Network</p>
                                </div>
                                <button onClick={() => setIsWriting(false)} className="md:hidden p-2 bg-slate-200 rounded-full"><X size={16}/></button>
                            </div>

                            <div className="mb-8 p-6 bg-white rounded-3xl border border-slate-100">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 block">Quick Templates</span>
                                <div className="flex flex-wrap gap-2">
                                    {Object.keys(templates).map(temp => (
                                        <button 
                                            key={temp}
                                            type="button"
                                            onClick={() => handleTemplateSelect(temp)}
                                            className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                                                newPost.category === temp 
                                                ? 'bg-slate-900 text-white' 
                                                : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                            }`}
                                        >
                                            {temp}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-8 p-6 bg-white rounded-3xl border border-slate-100">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 block">Choose Cover Image</span>
                                <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar snap-x">
                                    {(categoryImages[newPost.category] || []).map((img, i) => (
                                        <button 
                                            key={i}
                                            type="button"
                                            onClick={() => setNewPost({...newPost, image: img})}
                                            className={`relative shrink-0 w-24 h-24 rounded-2xl overflow-hidden snap-start transition-all ${
                                                newPost.image === img 
                                                ? 'ring-4 ring-primary ring-offset-2' 
                                                : 'opacity-60 hover:opacity-100'
                                            }`}
                                        >
                                            <img src={img} className="w-full h-full object-cover" alt={`Template ${i}`} onError={handleImageError} />
                                            {newPost.image === img && (
                                                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                                    <div className="bg-white rounded-full p-1"><Plus size={10} className="text-primary rotate-45" /></div>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <form onSubmit={handleCreatePost} className="flex-1 flex flex-col space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Title</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={newPost.title}
                                        onChange={e => setNewPost({...newPost, title: e.target.value})}
                                        className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-base font-bold focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                        placeholder="Enter an engaging title..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Your Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={newPost.author}
                                        onChange={e => setNewPost({...newPost, author: e.target.value})}
                                        className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                        placeholder="Enter your full name..."
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Category</label>
                                    <select 
                                        value={newPost.category}
                                        onChange={e => setNewPost({...newPost, category: e.target.value})}
                                        className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none appearance-none"
                                    >
                                        {categories.filter(c => c !== 'All').map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Excerpt (Short Description)</label>
                                    <textarea 
                                        required
                                        value={newPost.excerpt}
                                        onChange={e => setNewPost({...newPost, excerpt: e.target.value})}
                                        className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-medium focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none h-24"
                                        placeholder="A brief summary of your article..."
                                    />
                                </div>

                                <div className="space-y-2 flex-1 flex flex-col">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Full Content</label>
                                    <textarea 
                                        required
                                        value={newPost.content}
                                        onChange={e => setNewPost({...newPost, content: e.target.value})}
                                        className="w-full flex-1 min-h-[200px] bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none"
                                        placeholder="Write your article here... Markdown-like text supported."
                                    />
                                </div>

                                <div className="pt-4 flex items-center justify-between">
                                    <button type="button" onClick={() => setIsWriting(false)} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900">Cancel</button>
                                    <button type="submit" className="px-10 py-4 bg-primary text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl active:scale-95 flex items-center gap-2">
                                        <Plus size={14} /> Publish Post
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Live Preview Side */}
                        <div className="hidden md:flex flex-col w-1/2 h-full bg-white border-l border-slate-100 relative overflow-y-auto custom-scrollbar">
                            <button onClick={() => setIsWriting(false)} className="absolute top-6 right-6 z-10 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors"><X size={16} /></button>
                            
                            <div className="sticky top-0 bg-white/90 backdrop-blur z-0 p-6 border-b border-slate-50">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Live Preview</span>
                            </div>

                            <div className="p-10">
                                <span className="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500 mb-6 inline-block">
                                    {newPost.category}
                                </span>
                                <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-tight mb-6">
                                    {newPost.title || "Your Engaging Title Will Appear Here"}
                                </h1>
                                
                                <div className="flex items-center gap-3 mb-10 pb-8 border-b border-slate-100">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-xs uppercase">
                                        {newPost.author ? newPost.author[0] : 'U'}
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                                            {newPost.author || "Your Name"}
                                        </div>
                                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                            Just now at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>

                                <div className="prose prose-slate">
                                    <p className="text-xl font-medium text-slate-600 leading-relaxed mb-8">
                                        {newPost.excerpt || "Your thoughtful excerpt summarizing the main idea."}
                                    </p>
                                    <div className="text-slate-600 whitespace-pre-wrap">
                                        {newPost.content || "The full body of your article will be rendered beautifully right here, supporting paragraphs and structure."}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            , document.body)}
        </div>
    );
};

export default Blog;
