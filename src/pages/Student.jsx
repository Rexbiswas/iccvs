import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    BookOpen,
    Globe,
    Award,
    Briefcase,
    ArrowRight,
    Play,
    X,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SuccessStory from '../components/SuccessStory';
import { useAdmissionModal } from '../context/AdmissionModalContext';

const Student = () => {
    const { openAdmissionModal } = useAdmissionModal();
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    useEffect(() => {
        if (isVideoModalOpen) {
            document.body.classList.add('hide-navbar');
        } else {
            document.body.classList.remove('hide-navbar');
        }
        return () => {
            document.body.classList.remove('hide-navbar');
        };
    }, [isVideoModalOpen]);

    return (
        <div className="min-h-screen bg-white">
            <SEO
                title="Student Life at INSD | Vibrant Campus & Creative Community"
                description="Experience a vibrant student life at INSD. Join our creative community, access world-class studios, and transform from a student into a design professional."
                keywords="student life, design campus, creative community, fashion design students, interior design workshops, INSD student experience"
                canonical="https://insd.edu.in/student"
            />

            {/* Hero Section - Editorial Style */}
            <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/0.jpg"
                        alt="Student Life at INSD"
                        className="w-full h-full object-cover brightness-50"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/40 to-transparent" />
                </div>

                <div className="container relative z-10 mx-auto container-px h-full flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px w-12 bg-primary"></div>
                            <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">The Student Journey</span>
                        </div>

                        <h1 className="text-clamp-5xl font-black uppercase leading-[0.85] tracking-tighter text-white mb-10">
                            Beyond <br />
                            <span className="text-transparent stroke-text-white">Boundaries.</span>
                        </h1>

                        <p className="text-clamp-lg font-bold text-white/80 max-w-2xl mb-12 leading-tight">
                            At INSD, we don't just teach design; we cultivate visionaries. Join a community where your creativity meets industry-standard expertise.
                        </p>

                        <div className="flex flex-wrap gap-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => openAdmissionModal()}
                                className="px-10 py-5 bg-primary text-white rounded-full font-black uppercase tracking-widest text-xs shadow-2xl flex items-center gap-3"
                            >
                                Start Your Story
                                <ArrowRight size={18} />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsVideoModalOpen(true)}
                                className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-white/20 transition-all"
                            >
                                <Play size={18} className="fill-white" />
                                Watch Campus Life
                            </motion.button>
                        </div>
                    </motion.div>
                </div>


            </section>

            {/* Career Skills Section - Editorial Skewed Layout */}
            <section className="section-py bg-white overflow-hidden relative">
                <div className="container mx-auto container-px">
                    <div className="text-center mb-20 md:mb-32">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-clamp-4xl font-black uppercase tracking-tighter text-primary leading-none mb-6"
                        >
                            successful career skills
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-clamp-xl font-bold text-slate-600 tracking-tight"
                        >
                            We train students for holistic growth
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-6">
                        {[
                            {
                                title: "Design Skills",
                                sub: "Create. Design. Execute.",
                                img: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
                                skew: "polygon(15% 0, 100% 0, 85% 100%, 0 100%)"
                            },
                            {
                                title: "Soft Skills",
                                sub: "Communicate. Present. Confidence.",
                                img: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800",
                                skew: "polygon(0 0, 85% 0, 100% 100%, 15% 100%)"
                            },
                            {
                                title: "AI Tools",
                                sub: "Prompt. Produce. Fast.",
                                img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
                                skew: "polygon(15% 0, 100% 0, 85% 100%, 0 100%)"
                            },
                            {
                                title: "Entrepreneurial Skills",
                                sub: "Price. Sell. Build. Earn.",
                                img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
                                skew: "polygon(0 0, 85% 0, 100% 100%, 15% 100%)"
                            }
                        ].map((skill, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group cursor-default"
                            >
                                <div
                                    className="relative h-[400px] mb-8 overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]"
                                    style={{ clipPath: skill.skew }}
                                >
                                    <img
                                        src={skill.img}
                                        alt={skill.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                                <div className="px-4">
                                    <h3 className="text-clamp-xl font-black uppercase tracking-tighter text-slate-900 mb-1 group-hover:text-primary transition-colors">
                                        {skill.title}
                                    </h3>
                                    <p className="text-clamp-sm font-black uppercase tracking-[0.2em] text-slate-400">
                                        {skill.sub}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Expert Faculties Section - Enhanced Text-Driven Editorial */}
            <section className="py-32 md:py-64 bg-[#050505] text-white overflow-hidden relative">
                {/* 1. Grainy Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.15] pointer-events-none z-0 mix-blend-overlay">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <filter id="noiseFilter">
                            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                    </svg>
                </div>

                {/* 2. Moving Light Source */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-primary rounded-full blur-[120px] pointer-events-none z-0"
                />

                {/* 3. Background Scrolling Marquee */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full rotate-[-5deg] opacity-[0.03] select-none pointer-events-none">
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="whitespace-nowrap flex gap-20 text-[20vw] font-black uppercase"
                    >
                        <span>Expert Faculty • Industry Mentors • Skill School • Expert Faculty •</span>
                        <span>Expert Faculty • Industry Mentors • Skill School • Expert Faculty •</span>
                    </motion.div>
                </div>

                <div className="container mx-auto container-px relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col items-center text-center space-y-24">

                            {/* Main Headline Group */}
                            <div className="space-y-12">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="px-6 py-2 border border-primary/30 rounded-full inline-block backdrop-blur-md"
                                >
                                    <span className="text-primary font-black uppercase tracking-[0.6em] text-clamp-sm">World-Class Mentors</span>
                                </motion.div>

                                <div className="space-y-4">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="text-clamp-5xl font-black uppercase tracking-tighter leading-[0.75] relative"
                                    >
                                        Learn <br />
                                        <span className="italic font-serif text-primary">From</span> <br />
                                        Expertise.
                                    </motion.h2>
                                </div>
                            </div>

                            {/* Accolade Card - Glassmorphism */}
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="w-full max-w-4xl"
                            >
                                <div className="group relative p-16 md:p-24 rounded-[4rem] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-2xl transition-all duration-1000 hover:border-primary/50">
                                    <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                                    <div className="relative z-10 space-y-6">
                                        <p className="text-primary font-black uppercase tracking-[0.5em] text-clamp-sm">Accreditation</p>
                                        <h3 className="text-clamp-4xl font-black uppercase tracking-tighter leading-none">
                                            India's #1 <br />
                                            <span className="text-transparent stroke-text-white italic">Skill School</span>
                                        </h3>

                                        <div className="flex flex-wrap justify-center gap-12 mt-12 opacity-40">
                                            {["Innovation", "Creativity", "Leadership", "success"].map((tag, idx) => (
                                                <span key={idx} className="text-clamp-sm font-black uppercase tracking-widest">• {tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-10 w-px h-64 bg-linear-to-b from-transparent via-primary/50 to-transparent"
                />
                <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 right-10 w-px h-64 bg-linear-to-b from-transparent via-primary/50 to-transparent"
                />
            </section>

            {/* Campus Experience Section - High Fidelity Collage */}
            <section className="section-py bg-white overflow-hidden relative">
                <div className="container mx-auto container-px">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 auto-rows-fr">

                        {/* Top Row */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2 aspect-square rounded-2xl overflow-hidden shadow-lg"
                        >
                            <img src="https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/ARI02557.JPG?updatedAt=1777556820463" className="w-full h-full object-cover transition-all duration-700" alt="Campus Life" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-3 aspect-square lg:aspect-auto rounded-2xl overflow-hidden shadow-lg"
                        >
                            <img src="https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/ARI02550.JPG?updatedAt=1777556820407" className="w-full h-full object-cover transition-all duration-700" alt="Campus Life" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-2 aspect-square rounded-2xl overflow-hidden shadow-lg"
                        >
                            <img src="https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/ARI02471.JPG?updatedAt=1777556820198" className="w-full h-full object-cover transition-all duration-700" alt="Campus Life" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-2 aspect-square rounded-2xl overflow-hidden shadow-lg"
                        >
                            <img src="https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/ARI02490.JPG?updatedAt=1777556819960" className="w-full h-full object-cover transition-all duration-700" alt="Campus Life" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="lg:col-span-3 aspect-square lg:aspect-auto rounded-2xl overflow-hidden shadow-lg"
                        >
                            <img src="https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/ARI02501.JPG?updatedAt=1777556819689" className="w-full h-full object-cover transition-all duration-700" alt="Campus Life" />
                        </motion.div>

                        {/* Middle Row */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-3 lg:row-span-1 rounded-2xl overflow-hidden shadow-lg"
                        >
                            <img src="https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/ARI02555.JPG?updatedAt=1777556819602" className="w-full h-full object-cover transition-all duration-700" alt="Campus Life" />
                        </motion.div>

                        {/* Central Text Block */}
                        <div className="lg:col-span-6 flex flex-col items-center justify-center text-center container-px bg-white">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-clamp-3xl font-black uppercase tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-linear-to-br from-[#db3436] to-[#134a84] py-4"
                            >
                                Our Campus <br />
                                Is Well-Equipped <br />
                                To Deliver The <br />
                                Perfect Training
                            </motion.h2>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-3 lg:row-span-1 rounded-2xl overflow-hidden shadow-lg"
                        >
                            <img src="https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/ARI02483.JPG?updatedAt=1777556819492" className="w-full h-full object-cover transition-all duration-700" alt="Campus Life" />
                        </motion.div>

                        {/* Bottom Row */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2 aspect-square rounded-2xl overflow-hidden shadow-lg"
                        >
                            <img src="https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/ARI02492.JPG?updatedAt=1777556819275" className="w-full h-full object-cover transition-all duration-700" alt="Campus Life" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-4 aspect-square lg:aspect-auto rounded-2xl overflow-hidden shadow-lg"
                        >
                            <img src="https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/ARI02554.JPG?updatedAt=1777556819183" className="w-full h-full object-cover transition-all duration-700" alt="Campus Life" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-3 aspect-square lg:aspect-auto rounded-2xl overflow-hidden shadow-lg"
                        >
                            <img src="https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/ARI02476.JPG?updatedAt=1777556818378" className="w-full h-full object-cover transition-all duration-700" alt="Campus Life" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-3 aspect-square lg:aspect-auto rounded-2xl overflow-hidden shadow-lg"
                        >
                            <img src="https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/ARI02486.JPG?updatedAt=1777556818363" className="w-full h-full object-cover transition-all duration-700" alt="Campus Life" />
                        </motion.div>

                        {/* Extra Row for More Images */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="lg:col-span-3 aspect-square lg:aspect-auto rounded-2xl overflow-hidden shadow-lg"
                        >
                            <img src="https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/ARI02484.JPG?updatedAt=1777556817796" className="w-full h-full object-cover transition-all duration-700" alt="Campus Life" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-3 aspect-square lg:aspect-auto rounded-2xl overflow-hidden shadow-lg"
                        >
                            <img src="https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/ARI02494.JPG?updatedAt=1777556817711" className="w-full h-full object-cover transition-all duration-700" alt="Campus Life" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-3 aspect-square lg:aspect-auto rounded-2xl overflow-hidden shadow-lg"
                        >
                            <img src="https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/ARI02481.JPG?updatedAt=1777556817558" className="w-full h-full object-cover transition-all duration-700" alt="Campus Life" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-3 aspect-square lg:aspect-auto rounded-2xl overflow-hidden shadow-lg"
                        >
                            <img src="https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/ARI02485.JPG?updatedAt=1777556814042" className="w-full h-full object-cover transition-all duration-700" alt="Campus Life" />
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* --- WORKSHOP CHRONICLES SECTION --- */}
            <section className="py-24 md:py-40 bg-slate-950 overflow-hidden relative">
                {/* Background Text Accent */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none select-none overflow-hidden">
                    <div className="text-[30vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap animate-marquee-slow">
                        WORKSHOPS • HANDS-ON • MASTERY • WORKSHOPS •
                    </div>
                </div>

                <div className="container mx-auto container-px relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3 mb-6"
                            >
                                <div className="w-12 h-px bg-primary"></div>
                                <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">Skills in Action</span>
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-clamp-4xl font-black text-white leading-none tracking-tighter uppercase"
                            >
                                Workshop <br />
                                <span className="text-primary italic">Chronicles</span>
                            </motion.h2>
                        </div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-400 font-bold text-clamp-lg max-w-md italic border-r-4 border-primary pr-8 text-right"
                        >
                            "Theory is just the starting point. Our workshops are where the real transformation happens."
                        </motion.p>
                    </div>

                    <WorkshopSlider />
                </div>
            </section>

            {/* Placement Support Section - Industry standard UI */}
            <section className="section-py bg-slate-50 overflow-hidden relative">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none select-none">
                    <div className="text-[20vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap animate-marquee">
                        Placements • Careers • Placements • Careers •
                    </div>
                </div>

                <div className="container mx-auto container-px relative z-10">
                    <div className="flex flex-col items-center">

                        {/* Top Image Row - Dynamic Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full mb-20">
                            {[
                                "https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/drive-download-20260501T070719Z-3-001/Scanned_20260220-1418.jpg",
                                "https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/drive-download-20260501T070719Z-3-001/Scanned_20260220-1420.jpg",
                                "https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/drive-download-20260501T070719Z-3-001/Scanned_20260220-1422-01.jpg",
                                "https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/drive-download-20260501T070719Z-3-001/Scanned_20260220-1422-02.jpg",
                                "https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/drive-download-20260501T070719Z-3-001/Scanned_20260220-1422-03.jpg",
                                "https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/drive-download-20260501T070719Z-3-001/Scanned_20260220-1422-04.jpg"
                            ].map((img, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white group"
                                >
                                    <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Placement" />
                                </motion.div>
                            ))}
                        </div>

                        {/* Central Stats Block */}
                        <div className="text-center space-y-10 max-w-5xl">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="space-y-4"
                            >
                                <h2 className="text-clamp-6xl font-black uppercase tracking-tighter leading-[0.8] text-transparent bg-clip-text bg-linear-to-br from-[#db3436] to-[#134a84]">
                                    100% Lifetime <br />
                                    Placement <br />
                                    Support
                                </h2>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="space-y-6"
                            >
                                <div className="inline-block px-10 py-4 bg-[#fdf2f2] rounded-full border border-[#fbdada] backdrop-blur-md">
                                    <p className="text-[#db3436] font-black uppercase tracking-widest text-[10px] md:text-xs">
                                        Average Salary: <span className="text-[#db3436]">Rs. 20,000 - Rs. 1,50,000</span> Per Month
                                    </p>
                                </div>

                                <div className="pt-2">
                                    <h3 className="text-clamp-lg font-black uppercase tracking-tight text-slate-900">
                                        Highest Package 2025: <span className="text-[#db3436]">Rs. 1,50,000</span> Per Month
                                    </h3>
                                </div>
                            </motion.div>
                        </div>

                        {/* Bottom Image Row - Staggered */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full mt-24">
                            {[
                                "https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/drive-download-20260501T070719Z-3-001/Scanned_20260220-1422-05.jpg",
                                "https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/drive-download-20260501T070719Z-3-001/Scanned_20260220-1422-07.jpg",
                                "https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/drive-download-20260501T070719Z-3-001/Scanned_20260220-1422-08.jpg",
                                "https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/drive-download-20260501T070719Z-3-001/Scanned_20260220-1422-09.jpg",
                                "https://ik.imagekit.io/fmldynl4j4/drive-download-20260430T134248Z-3-001/drive-download-20260501T070719Z-3-001/Scanned_20260220-1418.jpg"
                            ].map((img, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: -30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group ${i % 2 === 0 ? 'mt-12' : '-mt-12'}`}
                                >
                                    <img src={img} className="w-full h-full object-cover transition-all duration-1000" alt="Placement" />
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* Comparison Section - The INSD Advantage */}
            <section className="section-py bg-white overflow-hidden relative">
                <div className="container mx-auto container-px">
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <h2 className="text-clamp-4xl font-black uppercase tracking-tighter leading-none">
                                <span className="text-primary italic">INSD Students</span> <span className="text-slate-400">vs</span> <br />
                                <span className="text-secondary">Other Students</span>
                            </h2>
                            <p className="text-clamp-xl font-bold text-primary tracking-tight">
                                We develop professionals, not just designers.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                label: "Skill-based education",
                                imgInsd: "https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=800",
                                imgOther: "https://images.pexels.com/photos/159844/science-fair-school-education-learning-159844.jpeg?auto=compress&cs=tinysrgb&w=800",
                                comparison: {
                                    insd: "Direct Industry Mastery",
                                    others: "Theoretical Limitations"
                                }
                            },
                            {
                                label: "Industry preparation",
                                imgInsd: "https://images.pexels.com/photos/3182763/pexels-photo-3182763.jpeg?auto=compress&cs=tinysrgb&w=800",
                                imgOther: "https://images.pexels.com/photos/1181311/pexels-photo-1181311.jpeg?auto=compress&cs=tinysrgb&w=800",
                                comparison: {
                                    insd: "Real Industry Briefs",
                                    others: "Classroom Mock-ups"
                                }
                            },
                            {
                                label: "Launching your career",
                                imgInsd: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800",
                                imgOther: "https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg?auto=compress&cs=tinysrgb&w=800",
                                comparison: {
                                    insd: "100% Career Support",
                                    others: "Generic Job Boards"
                                }
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="group"
                            >
                                <div className="space-y-6">
                                    <h3 className="text-clamp-2xl font-black text-slate-900 uppercase tracking-tighter leading-tight border-l-4 border-primary pl-4">
                                        {item.label}
                                    </h3>
                                    
                                    <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-2 border-slate-100 flex">
                                        {/* Other Students Side */}
                                        <div className="relative w-1/2 h-full group/other overflow-hidden border-r border-white/20">
                                            <img 
                                                src={item.imgOther} 
                                                className="w-full h-full object-cover brightness-75 transition-all duration-1000 group-hover:scale-105" 
                                                alt="Other Students" 
                                            />
                                            <div className="absolute inset-0 bg-slate-900/40" />
                                            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full">
                                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Other Students</span>
                                            </div>
                                            <div className="absolute bottom-6 left-4 right-4">
                                                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest line-through">{item.comparison.others}</p>
                                            </div>
                                        </div>

                                        {/* INSD Students Side */}
                                        <div className="relative w-1/2 h-full group/insd overflow-hidden">
                                            <img 
                                                src={item.imgInsd} 
                                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
                                                alt="INSD Students" 
                                            />
                                            <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                                            <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full shadow-lg">
                                                <span className="text-[10px] font-black text-white uppercase tracking-widest">INSD Edge</span>
                                            </div>
                                            <div className="absolute bottom-6 left-4 right-4">
                                                <p className="text-white font-black text-[10px] uppercase tracking-widest">{item.comparison.insd}</p>
                                                <div className="w-8 h-1 bg-primary mt-2" />
                                            </div>
                                        </div>

                                        {/* Floating VS Badge */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-2xl flex items-center justify-center z-10 border-4 border-slate-50">
                                            <span className="text-primary font-black italic text-sm">VS</span>
                                        </div>
                                    </div>

                                    <p className="text-slate-500 font-bold text-center px-4 text-sm italic">
                                        "We develop professionals, not just designers."
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Largest Sectors Section - High Fashion Editorial */}
            <section className="section-py container-px bg-white overflow-hidden relative">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Title Block */}
                        <div className="lg:col-span-4 mb-12 lg:mb-0">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-4"
                            >
                                <span className="text-primary font-black uppercase tracking-[0.4em] text-xs block mb-6">Industry Reach</span>
                                <h2 className="text-clamp-4xl font-black uppercase tracking-tighter leading-[0.85] text-slate-950">
                                    Work <br />
                                    <span className="italic font-serif text-slate-700">in the</span> <br />
                                    <span className="text-primary">Largest</span> <br />
                                    Sectors
                                </h2>
                                <div className="w-20 h-2 bg-primary mt-8"></div>
                            </motion.div>
                        </div>

                        {/* Sectors Grid */}
                        <div className="lg:col-span-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                {[
                                    {
                                        label: "Hospitality Industry",
                                        img: "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=800",
                                        delay: 0.1
                                    },
                                    {
                                        label: "Retail Industry",
                                        img: "https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg?auto=compress&cs=tinysrgb&w=800",
                                        delay: 0.2
                                    },
                                    {
                                        label: "Media & Entertainment",
                                        img: "https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=800",
                                        delay: 0.3
                                    },
                                    {
                                        label: "Design Industry",
                                        img: "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=800",
                                        delay: 0.4
                                    }
                                ].map((sector, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 100 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: sector.delay, ease: "easeOut" }}
                                        className="group"
                                    >
                                        <div className="aspect-[4/9] md:aspect-[1/3] rounded-3xl overflow-hidden mb-6 shadow-2xl relative">
                                            <img
                                                src={sector.img}
                                                alt={sector.label}
                                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors duration-500" />

                                            {/* Hover Accent */}
                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                                        </div>
                                        <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-900 text-center leading-tight">
                                            {sector.label.split(' ').map((word, idx) => (
                                                <span key={idx} className="block">{word}</span>
                                            ))}
                                        </h3>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Stories Section */}
            <SuccessStory />

            {/* Video Modal */}
            <AnimatePresence>
                {isVideoModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                        onClick={() => setIsVideoModalOpen(false)}
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsVideoModalOpen(false);
                            }}
                        >
                            <X size={24} />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src="https://www.youtube.com/embed/FgYVSFwWD9k?autoplay=1&mute=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1" 
                                title="Unlocking the Best Designing Institute in Pune: INSD PUNE Campus Review" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerPolicy="strict-origin-when-cross-origin" 
                                allowFullScreen
                            ></iframe>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <Footer />
        </div >
    );
};

const WorkshopSlider = () => {
    const workshops = [
        {
            id: 1,
            title: "Creative Exploration",
            subtitle: "Workshop 01",
            desc: "Unlocking foundational design thinking through hands-on creative exercises and conceptual mapping.",
            media: [
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%201/Workshop%201.jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%201/Workshop%201(1).jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%201/Workshop%201(2).jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%201/Workshop%201(3).jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%201/Workshop%201(4).jpg' },
            ]
        },
        {
            id: 2,
            title: "Industry Techniques",
            subtitle: "Workshop 02",
            desc: "Mastering professional tools and machinery under the guidance of seasoned industry veterans.",
            media: [
                { type: 'video', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%202/Workshop%202.mp4' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%202/Workshop%202.jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%202/Workshop%202(2).jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%202/Workshop%202(3).jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%202/Workshop%202(4).jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%202/Workshop%202(5).jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%202/Workshop%202(6).jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%202/Workshop%202(7).jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%202/Workshop%202(8).jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%202/Workshop%202(9).jpg' },
            ],
            thumbnail: "https://ik.imagekit.io/fmldynl4j4/Workshop%202/Workshop%202.jpg"
        },
        {
            id: 3,
            title: "Prototyping Labs",
            subtitle: "Workshop 03",
            desc: "Converting digital concepts into physical reality using rapid prototyping and experimental materials.",
            media: [
                { type: 'video', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%203/Workshop%203.mp4' }
            ],
            thumbnail: "https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg"
        },
        {
            id: 4,
            title: "Advanced Design",
            subtitle: "Workshop 04",
            desc: "Complex problem solving and design execution for high-end luxury market standards.",
            media: [
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%204/Workshop%20-%204_.jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%204/Workshop%20-%204_(1).jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%204/Workshop%20-%204_(2).jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%204/Workshop%20-%204_(3).jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%204/Workshop%20-%204_(4).jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%204/Workshop%20-%204_(5).jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%204/Workshop%20-%204_(6).jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%204/Workshop%20-%204_(7).jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%204/Workshop%20-%204_(8).jpg' },
                { type: 'image', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%204/Workshop%20-%204_(9).jpg' },
            ]
        },
        {
            id: 5,
            title: "Fashion & Textile Painting",
            subtitle: "Workshop 05",
            desc: "The talented Ms. Bharti Malhotra shares her expertise in the fashion industry and textile painting at INSD.",
            media: [
                { type: 'video', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%205/The%20talented%20Ms.%20Bharti%20Malhotra,%20our%20distinguished%20guest,%20shares%20her%20expertise%20in%20the%20fashion%20industry%20and%20textile%20painting%20at%20INSD%20!_.mp4' }
            ],
            thumbnail: "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg"
        },
        {
            id: 6,
            title: "Material Trends in Interiors",
            subtitle: "Workshop 06",
            desc: "Interior Design students exploring the latest Material Trends in Interiors led by mentor Hussain Patanwala.",
            media: [
                { type: 'video', url: 'https://ik.imagekit.io/fmldynl4j4/Workshop%206/Interior%20Design%20students%20exploring%20the%20latest%20Material%20Trends%20in%20Interiors%20in%20an%20insightful%20workshop%20led%20by%20mentor%20Hussain%20Patanwala.Learning,%20discovering,%20and%20getting%20inspired_one%20trend%20at%20a%20time!....._InteriorDesi.mp4' }
            ],
            thumbnail: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [activeMediaIndex, setActiveMediaIndex] = useState(0);

    const nextWorkshop = () => {
        setActiveIndex((prev) => (prev + 1) % workshops.length);
        setActiveMediaIndex(0);
    };

    const prevWorkshop = () => {
        setActiveIndex((prev) => (prev - 1 + workshops.length) % workshops.length);
        setActiveMediaIndex(0);
    };

    const currentWorkshop = workshops[activeIndex];
    const currentMedia = currentWorkshop.media[activeMediaIndex];

    return (
        <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Media Display Area */}
                <div className="lg:col-span-8">
                    <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl border border-white/5">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeIndex}-${activeMediaIndex}`}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0"
                            >
                                {currentMedia.type === 'video' ? (
                                    <video
                                        src={currentMedia.url}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src={currentMedia.url}
                                        alt={currentWorkshop.title}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* Media Navigation Overlays */}
                        <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent">
                            <div className="flex justify-between items-end">
                                <div className="space-y-4 max-w-xl">
                                    <div className="flex items-center gap-3">
                                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                                            {currentWorkshop.subtitle}
                                        </span>
                                        <div className="h-px w-8 bg-white/20"></div>
                                        <span className="text-white/40 font-bold uppercase tracking-widest text-[8px]">
                                            {activeMediaIndex + 1} / {currentWorkshop.media.length}
                                        </span>
                                    </div>
                                    <h3 className="text-white text-clamp-3xl font-black uppercase tracking-tighter leading-none">
                                        {currentWorkshop.title}
                                    </h3>
                                    <p className="text-white/60 text-clamp-base font-medium leading-relaxed">
                                        {currentWorkshop.desc}
                                    </p>
                                </div>
                                
                                {currentWorkshop.media.length > 1 && (
                                    <div className="flex gap-2 mb-2">
                                        {currentWorkshop.media.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveMediaIndex(i)}
                                                className={`w-12 h-1 rounded-full transition-all duration-500 ${
                                                    i === activeMediaIndex ? 'bg-primary w-20' : 'bg-white/20 hover:bg-white/40'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info & Global Navigation Area */}
                <div className="lg:col-span-4 flex flex-col justify-center">
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <p className="text-slate-500 font-bold text-sm uppercase tracking-[0.2em]">
                                Browse Collections
                            </p>
                            <div className="flex items-center gap-4">
                                <span className="text-6xl font-black text-white/10">{String(activeIndex + 1).padStart(2, '0')}</span>
                                <div className="h-px flex-1 bg-white/10"></div>
                                <span className="text-6xl font-black text-white/10">{String(workshops.length).padStart(2, '0')}</span>
                            </div>
                        </div>

                        {/* Thumbnails of other workshops */}
                        <div className="grid grid-cols-3 gap-4">
                            {workshops.map((ws, idx) => (
                                <button
                                    key={ws.id}
                                    onClick={() => {
                                        setActiveIndex(idx);
                                        setActiveMediaIndex(0);
                                    }}
                                    className={`relative aspect-square rounded-2xl overflow-hidden transition-all duration-500 group ${
                                        idx === activeIndex 
                                            ? 'ring-2 ring-primary ring-offset-4 ring-offset-slate-950 scale-105' 
                                            : 'opacity-40 hover:opacity-100 grayscale hover:grayscale-0'
                                    }`}
                                >
                                    <img 
                                        src={ws.thumbnail || ws.media[0].url} 
                                        className="w-full h-full object-cover"
                                        alt={ws.title}
                                    />
                                    {ws.media.some(m => m.type === 'video') && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                            <Play size={12} className="text-white fill-white" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-4 pt-8">
                            <button
                                onClick={prevWorkshop}
                                className="p-6 rounded-full border border-white/10 text-white hover:bg-primary hover:border-primary transition-all duration-500 group"
                            >
                                <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={nextWorkshop}
                                className="flex-1 p-6 rounded-full bg-white text-slate-950 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl"
                            >
                                Next Workshop
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Student;
