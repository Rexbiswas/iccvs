import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Award, Clock, Star, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const programs = [
    {
        id: "1Y",
        title: "Advanced Diploma",
        duration: "1 Year",
        desc: "A rigorously paced deep-dive designed to transform beginners into industry-ready practitioners within 12 months.",
        features: ["Comprehensive Curriculum", "Live Industry Projects", "Placement Assistance"],
        theme: "from-[#0a0a0a] to-[#1a1a1a]",
        textColor: "text-white"
    },
    {
        id: "6M",
        title: "Professional Certificate",
        duration: "6 Months",
        desc: "Intensive upskilling focused entirely on technical mastery and portfolio generation. Ideal for quick career pivots.",
        features: ["Software Mastery", "Intensive Bootcamp", "Capstone Project"],
        theme: "from-[#ffffff] to-[#f2f2f2]",
        textColor: "text-[#111]"
    },
    {
        id: "3M",
        title: "Specialized Masterclass",
        duration: "3 Months",
        desc: "Hyper-focused modules targeting specific software, emerging industry trends, or niche design philosophies.",
        features: ["Micro-Specialization", "Weekend Batches available", "Digital Certification"],
        theme: "from-[#fcfcfc] to-[#e6e6e6]",
        textColor: "text-[#111]"
    }
];

const specialties = [
    "Fashion Design", "Interior Architecture", "Graphic & UI/UX", "Animation & VFX", 
    "Photography", "Jewelry Design", "Textile Science", "Digital Marketing"
];

const DiplomaAndCertificate = () => {
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityBg = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const scaleText = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

    const [activeHover, setActiveHover] = useState(null);

    return (
        <div className="bg-[#f2f2f2] min-h-screen font-sans selection:bg-[#111] selection:text-white">
            <SEO 
                title="Diploma & Certificate Courses in Design - Fashion, Interior, Graphic"
                description="Fast-track your creative career with ICCVS's professional diplomas and certificates. Intensive 3-month to 1-year programs in fashion, interior design, and graphic design."
                keywords="design diploma Delhi, design certificate courses, fast track design course, fashion design diploma, interior design certification, graphic design short course"
            />
            
            {/* Super Elite Hero Section */}
            <section ref={heroRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fcfcfc]">
                
                {/* Abstract animated grid background */}
                <motion.div 
                    style={{ y: yBackground, opacity: opacityBg }}
                    className="absolute inset-0 pointer-events-none"
                >
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)]" />
                </motion.div>

                {/* Rotating Gold Seal */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-32 right-12 md:top-40 md:right-32 w-32 h-32 md:w-48 md:h-48 rounded-full border border-black/10 flex items-center justify-center opacity-30 select-none pointer-events-none mix-blend-multiply z-0"
                >
                    <Star className="text-black w-8 h-8 md:w-16 md:h-16 absolute" />
                    <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_30s_linear_infinite]">
                        <path id="textPath" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" fill="none" />
                        <text className="text-[12px] font-bold uppercase tracking-[0.2em] fill-black">
                            <textPath href="#textPath" startOffset="0%">ICCVS • Certified • Excellence • Authentic • </textPath>
                        </text>
                    </svg>
                </motion.div>

                <div className="relative z-10 flex flex-col items-start px-6 md:px-20 w-full max-w-7xl mx-auto pt-24 md:pt-32">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-black/10 backdrop-blur-sm bg-black/5 mb-8"
                    >
                        <Award size={16} className="text-[#d4af37]" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#111]">Fast-Track Accreditations</span>
                    </motion.div>

                    <motion.h1 
                        style={{ scale: scaleText }}
                        className="text-clamp-5xl font-black uppercase tracking-tighter text-[#111] leading-[0.8] mb-8"
                    >
                        <motion.span 
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="block"
                        >
                            Intensive
                        </motion.span>
                        <motion.span 
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="block italic font-serif font-light text-[#d4af37]"
                        >
                            Mastery.
                        </motion.span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-[#111]/60 text-xl md:text-2xl max-w-xl leading-relaxed font-medium"
                    >
                        Accelerate your trajectory. Elite diplomas and certificates designed to forge industry professionals in record time.
                    </motion.p>
                </div>
            </section>

            {/* Disciplines Marquee Selection */}
            <section className="bg-[#111] py-8 border-y border-white/5 overflow-hidden flex whitespace-nowrap">
                <motion.div 
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    className="flex gap-16 px-8 items-center text-white/40 font-black uppercase tracking-widest text-xl"
                >
                    {specialties.concat(specialties).map((spec, i) => (
                        <div key={i} className="flex items-center gap-16 hover:text-white transition-colors duration-300">
                            <span>{spec}</span>
                            <Star size={12} className="text-[#d4af37]" />
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* Time-Based Program Expanders */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="mb-20">
                    <h2 className="text-clamp-4xl font-black uppercase tracking-tighter text-[#111] max-w-3xl leading-none">
                        Choose your <br/> <span className="italic font-serif font-light text-black/40">timeline.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {programs.map((prog, index) => (
                        <motion.div 
                            key={prog.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            onMouseEnter={() => setActiveHover(prog.id)}
                            onMouseLeave={() => setActiveHover(null)}
                            className={`relative overflow-hidden rounded-[2rem] p-10 flex flex-col h-[500px] md:h-[600px] bg-linear-to-b ${prog.theme} ${prog.textColor} shadow-2xl transition-transform hover:-translate-y-2 duration-500`}
                        >
                            {/* Inner abstract glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            
                            <div className="relative z-10 flex-1 flex flex-col">
                                <span className={`text-sm font-bold uppercase tracking-widest mb-4 inline-flex items-center gap-2 ${prog.textColor === 'text-white' ? 'text-[#d4af37]' : 'text-black/50'}`}>
                                    <Clock size={16} /> {prog.duration}
                                </span>
                                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6">
                                    {prog.title}
                                </h3>
                                <p className={`text-lg font-medium leading-relaxed mb-auto ${prog.textColor === 'text-white' ? 'text-white/60' : 'text-black/70'}`}>
                                    {prog.desc}
                                </p>
                            </div>

                            <div className="relative z-10 mt-8 space-y-4">
                                {prog.features.map((feat, i) => (
                                    <div key={i} className={`flex items-center gap-3 text-sm font-bold uppercase tracking-widest ${prog.textColor === 'text-white' ? 'text-white/80' : 'text-black/80'}`}>
                                        <ShieldCheck size={18} className={prog.textColor === 'text-white' ? 'text-[#d4af37]' : 'text-black'} />
                                        {feat}
                                    </div>
                                ))}
                            </div>
                            
                            {/* Interactive Hover Accent Reveal */}
                            <AnimatePresence>
                                {activeHover === prog.id && (
                                    <motion.div 
                                        initial={{ height: 0 }}
                                        animate={{ height: "4px" }}
                                        exit={{ height: 0 }}
                                        className={`absolute bottom-0 left-0 right-0 ${prog.textColor === 'text-white' ? 'bg-[#d4af37]' : 'bg-black'}`}
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Fast Paced CTA */}
            <section className="bg-[#d4af37] text-black py-40 px-6 overflow-hidden relative border-t border-black/10">
                <div className="absolute inset-0 z-0">
                     <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
                    <Zap size={64} className="text-black mb-8 animate-pulse" />
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-clamp-5xl font-black uppercase tracking-tighter leading-[0.85] mb-8"
                    >
                        Time Is <br/> <span className="italic font-serif font-light text-white mix-blend-overlay">Now.</span>
                    </motion.h2>
                    <p className="text-black/70 text-lg md:text-2xl font-bold uppercase tracking-widest max-w-xl mb-12">
                        Enrollments are processed on a rolling basis. Secure your creative future today.
                    </p>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/course-apply-now')}
                        className="bg-black text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm shadow-[0_20px_40px_rgba(0,0,0,0.2)] flex items-center gap-4 transition-all hover:bg-[#111]"
                    >
                        Register Interest <ArrowUpRight size={18} />
                    </motion.button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default DiplomaAndCertificate;
