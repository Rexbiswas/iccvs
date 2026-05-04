import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Palette, PenTool, Layout, Monitor, Scissors, Home, Camera, Video, Rocket, Globe, Target, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import DirectorProfile from '../components/DirectorProfile';
import { useAdmissionModal } from '../context/AdmissionModalContext';

gsap.registerPlugin(ScrollTrigger);

const Undergraduate = () => {
    const navigate = useNavigate();
    const { openAdmissionModal } = useAdmissionModal();
    const containerRef = useRef(null);
    const [activeCategory, setActiveCategory] = React.useState("Undergraduate");

    const courseData = {
        "Undergraduate": {
            description: "Three and four year degrees",
            courses: ["Fashion Design", "Graphic Design", "Jewellery Design", "Textile Design", "Interior Design", "Animation", "Product Design"]
        },
        "Postgraduate": {
            description: "Advanced specialization degrees",
            courses: ["M.Des Fashion", "M.Des Interior", "Luxury Brand Management", "Fashion Management", "M.Sc Multimedia", "M.Sc Textile"]
        },
        "Advanced Diploma": {
            description: "Professional skill development",
            courses: ["Fashion Tech", "Interior Architecture", "Graphic Art", "VFX & Animation", "Diamond Grading"]
        },
        "Diploma": {
            description: "Foundation and core skills",
            courses: ["Fashion Design", "Interior Design", "Graphic Design", "Textile Design", "Photography"]
        },
        "Short Term Courses": {
            description: "Intensive workshops and certifications",
            courses: ["Fashion Styling", "Photography", "Draping", "Illustration", "AutoCAD", "Merchandising"]
        }
    };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Hero Text Entrance
            gsap.from(".hero-title-char", {
                y: 100,
                opacity: 0,
                rotateX: -90,
                stagger: 0.05,
                duration: 1.5,
                ease: "power4.out",
                delay: 0.5
            });

            gsap.from(".hero-subtitle", {
                y: 20,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                delay: 1.5
            });

            // Manifesto Reveal
            gsap.from(".manifesto-text", {
                scrollTrigger: {
                    trigger: ".manifesto-section",
                    start: "top 70%",
                },
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out"
            });

            // Course Cards Stagger
            gsap.from(".course-card", {
                scrollTrigger: {
                    trigger: ".courses-grid",
                    start: "top 80%",
                },
                y: 100,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const courses = [
        { title: "Fashion Design", icon: <Scissors />, desc: "From sketching to runway, master the art of couture and ready-to-wear.", color: "bg-pink-500", img: "https://images.pexels.com/photos/1579930/pexels-photo-1579930.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { title: "Interior Design", icon: <Home />, desc: "Transform spaces with sustainable architecture and modern aesthetics.", color: "bg-blue-500", img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { title: "Graphic Design", icon: <Layout />, desc: "Visual storytelling through typography, branding, and digital art.", color: "bg-purple-500", img: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { title: "textile Design", icon: <Palette />, desc: "Innovate with fabrics, prints, and sustainable weaving techniques.", color: "bg-orange-500", img: "https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { title: "Animation & VFX", icon: <Monitor />, desc: "Bring characters to life with 3D modeling and motion graphics.", color: "bg-green-500", img: "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { title: "Photography", icon: <Camera />, desc: "Capture the world through professional lens and studio lighting.", color: "bg-yellow-500", img: "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { title: "Jewellery Design", icon: <PenTool />, desc: "Craft exquisite pieces mixing traditional metals with modern gems.", color: "bg-teal-500", img: "https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { title: "UI/UX Design", icon: <Layout />, desc: "Design seamless digital experiences for web and mobile.", color: "bg-indigo-500", img: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800" },
        { title: "Filmmaking", icon: <Video />, desc: "Direct, shoot, and edit your cinematic vision.", color: "bg-red-500", img: "https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=800" },
    ];

    // Helper to split text
    const splitText = (text) => text.split("").map((char, i) => (
        <span key={i} className="hero-title-char inline-block">{char === " " ? "\u00A0" : char}</span>
    ));

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-primary selection:text-white pt-28">
            <SEO 
                title="Undergraduate Design Degrees | B.Des India - Fashion, Interior, Graphic"
                description="Elevate your creative career with INSD's world-class B.Des and undergraduate degrees. Master your craft in India's top design college with industry-standard protocols."
                keywords="undergraduate design courses, B.Des India, bachelor of design India, fashion design degree, interior design degree, top design colleges India"
            />

            {/* --- NEXT-LEVEL HERO SECTION --- */}
            <section className="relative h-screen min-h-[900px] flex items-center px-6 md:px-12 lg:px-24 overflow-hidden bg-slate-50">
                {/* Cinematic Background Layer */}
                <div className="absolute inset-0 z-0">
                    <motion.div 
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.2 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <img 
                            src="https://images.pexels.com/photos/3771088/pexels-photo-3771088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="College Campus" 
                            className="w-full h-full object-cover mix-blend-multiply"
                        />
                    </motion.div>
                    
                    <div className="absolute inset-0 bg-linear-to-b from-white via-transparent to-white" />
                    <div className="absolute inset-0 noise-bg opacity-[0.03]" />
                    <div className="absolute inset-0 cyber-grid opacity-[0.05]" />
                    
                    <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] animate-blob" />
                    <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '3s' }} />
                </div>

                {/* Floating Admission Cards */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    {[
                        { val: "100%", label: "Placement Drive", pos: "top-[18%] right-[10%]", icon: Rocket, delay: 0.6 },
                        { val: "20k+", label: "Alumni Network", pos: "bottom-[38%] left-[12%]", icon: Globe, delay: 0.9 },
                        { val: "15+", label: "Global Centres", pos: "bottom-[22%] right-[15%]", icon: Target, delay: 1.2 }
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: stat.delay, duration: 1.2 }}
                            className={`absolute ${stat.pos} hidden lg:block`}
                        >
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4 + idx, repeat: Infinity, ease: "easeInOut" }}
                                className="p-8 apple-glass border-slate-200/50 rounded-[2.5rem] backdrop-blur-3xl shadow-xl group hover:rotate-3 transition-transform duration-500"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:scale-110 shadow-sm">
                                        <stat.icon size={28} />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-black text-slate-900 tracking-tighter mb-1">{stat.val}</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto w-full relative z-30">
                    <div className="max-w-5xl space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <div className="inline-flex items-center gap-4 mb-10 px-6 py-2 bg-white border border-slate-200 rounded-full shadow-sm shadow-slate-200/50">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">
                                    Admissions Open 2026-27
                                </span>
                            </div>

                            <div className="space-y-4">
                                <h1 className="text-8xl md:text-[11rem] font-black text-slate-900 leading-[0.75] tracking-tighter uppercase overflow-hidden">
                                    <motion.span 
                                        initial={{ y: "110%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                        className="block"
                                    >
                                        Creative <br />
                                        <span className="stroke-text-slate-900 opacity-20">Genesis.</span>
                                    </motion.span>
                                </h1>
                                <motion.div 
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1, delay: 0.6 }}
                                    className="text-7xl md:text-[9rem] font-black leading-none tracking-tighter uppercase text-primary italic font-serif"
                                >
                                    Unleashed.
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.9 }}
                            className="text-xl md:text-3xl text-slate-500 font-medium max-w-3xl leading-relaxed tracking-tight"
                        >
                           Bridge the gap between vision and reality. INSD's undergraduate programs are the intensive breeding ground for the next generation of global designers.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 1.1 }}
                            className="flex flex-wrap items-center gap-12 pt-10"
                        >
                            <button 
                                onClick={() => openAdmissionModal({
                                    title: 'Talk to a Counsellor',
                                    subtitle: 'Our senior experts will call you within 24 hours.',
                                    ctaText: 'Request Call',
                                    successMsg: 'Thank you! A counselor will reach out to you shortly.'
                                })}
                                className="relative group overflow-hidden h-12 md:h-14 px-12 md:px-20 bg-slate-900 text-white rounded-full font-black uppercase text-[10px] tracking-[0.4em] transition-all hover:pr-24 shadow-2xl shadow-slate-900/20"
                            >
                                <span className="relative z-10">TALK TO OUR EXPERTS</span>
                                <div className="absolute inset-0 bg-primary translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
                                <ArrowRight className="absolute right-10 top-1/2 -translate-y-1/2 w-7 h-7 opacity-0 group-hover:opacity-100 transition-all text-white" />
                            </button>
                            
                            <button 
                                onClick={() => openAdmissionModal({
                                    title: 'Download Prospectus',
                                    subtitle: 'Get detailed insights into our undergraduate programs.',
                                    ctaText: 'Download Now',
                                    successMsg: 'successful! Your prospectus download is ready. Check your email for the direct link.'
                                })}
                                className="flex items-center gap-6 group"
                            >
                                <div className="relative w-16 h-16 flex items-center justify-center">
                                    <div className="absolute inset-0 border-2 border-slate-200 rounded-full group-hover:border-primary/50 group-hover:scale-110 transition-all duration-700" />
                                    <div className="absolute inset-4 bg-slate-50 rounded-full scale-0 group-hover:scale-100 transition-all duration-500" />
                                    <Monitor className="w-7 h-7 text-slate-900 group-hover:text-primary transition-all relative z-10" />
                                </div>
                                <div className="space-y-0.5">
                                    <span className="block font-black uppercase text-[10px] tracking-[0.2em] text-slate-950">View Prospectus</span>
                                    <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Digital Edition 2026</span>
                                </div>
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* Aesthetic Detail */}
                <div className="absolute bottom-16 left-6 md:left-24 flex items-center gap-10">
                    <motion.div 
                        animate={{ height: [0, 80, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-px h-24 bg-linear-to-b from-primary to-transparent" 
                    />
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 [writing-mode:vertical-lr]">Scroll To Discover</span>
                </div>
            </section>

            {/* --- MANIFESTO SECTION (Editorial Upgrade) --- */}
            <section className="py-40 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                    <div className="lg:col-span-5 space-y-12 sticky top-40">
                        <div className="relative">
                            <span className="text-[14rem] font-black text-slate-50 absolute -top-32 -left-12 -z-10 select-none">01</span>
                            <motion.h2 
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-6xl md:text-8xl font-black text-slate-950 uppercase tracking-tighter leading-[0.85]"
                            >
                                THE <br /> <span className="text-primary italic font-serif lowercase">Academic</span> <br /> REVOLUTION.
                            </motion.h2>
                        </div>
                        <div className="h-px w-24 bg-primary" />
                    </div>
                    
                    <div className="lg:col-span-7 space-y-12">
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl md:text-4xl text-slate-900 font-medium leading-[1.3] tracking-tight"
                        >
                            <span className="font-black text-primary">INSD was established</span> with a radical premise: that design is not just a skill, but a <span className="stroke-text-slate-900 opacity-30">neural framework</span> for the future.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-12 bg-slate-50 border border-slate-100 rounded-[3rem] space-y-8"
                        >
                            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                                More than a college, it is a high-performance ecosystem designed to brush raw talent into sharp-edged industry leaders.
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-black text-xl">?</div>
                                <p className="text-lg font-black text-slate-900 uppercase tracking-widest leading-none">
                                    ARE YOU A <span className="text-primary italic">"WHY NOT?"</span> THINKER?
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- COURSE CARDS (Quantum Grid) --- */}
            <section className="py-40 bg-slate-50 px-6 md:px-12 lg:px-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {courses.map((course, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative h-[600px] rounded-[4rem] overflow-hidden cursor-pointer shadow-2xl shadow-slate-200/50"
                            >
                                <img
                                    src={course.img}
                                    alt={course.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent group-hover:from-primary/80 transition-all duration-700" />
                                
                                <div className="absolute inset-0 p-16 flex flex-col justify-end">
                                    <div className="flex items-center gap-4 mb-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <div className="w-px h-8 bg-white/40" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Advanced Module Phase 1</span>
                                    </div>
                                    
                                    <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-6 transform group-hover:-translate-y-2 transition-transform duration-500">
                                        {course.title}
                                    </h3>
                                    
                                    <div className="overflow-hidden h-0 group-hover:h-24 transition-all duration-700">
                                        <p className="text-white/80 text-lg leading-relaxed font-medium">
                                            {course.desc}
                                        </p>
                                    </div>

                                    <div className="mt-8 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Enrollment Open</span>
                                        <ArrowRight className="text-white" size={32} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PROGRAM SELECTOR (Premium Light Interface) --- */}
            <section className="py-40 bg-white px-6 md:px-12 lg:px-24 border-y border-slate-100">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">
                    <div className="lg:col-span-4 space-y-4">
                        {Object.keys(courseData).map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ x: 10 }}
                                className="group cursor-pointer relative py-4"
                                onClick={() => setActiveCategory(item)}
                            >
                                {activeCategory === item && (
                                    <motion.div layoutId="activeInd" className="absolute left-[-2rem] top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full" />
                                )}
                                <h3 className={`text-4xl md:text-5xl font-black transition-all duration-500 uppercase tracking-tighter ${activeCategory === item ? 'text-slate-900 translate-x-4' : 'text-slate-200 group-hover:text-slate-400'}`}>
                                    {item}
                                </h3>
                            </motion.div>
                        ))}
                    </div>

                    <div className="lg:col-span-8 p-20 bg-slate-50 rounded-[4rem] border border-slate-100 relative min-h-[500px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-16"
                            >
                                <div className="space-y-4">
                                    <span className="text-primary font-black uppercase text-[10px] tracking-[0.8em]">{courseData[activeCategory].title}</span>
                                    <h4 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">{courseData[activeCategory].description}</h4>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                                    {courseData[activeCategory].courses.map((course, i) => (
                                        <motion.div 
                                            key={i} 
                                            whileHover={{ x: 10 }}
                                            className="group flex items-center justify-between border-b border-slate-200 pb-6 cursor-pointer"
                                        >
                                            <span className="text-xl font-black text-slate-400 group-hover:text-slate-900 transition-colors uppercase tracking-tight">{course}</span>
                                            <ArrowRight size={20} className="text-slate-200 group-hover:text-primary transition-all opacity-0 group-hover:opacity-100" />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* --- DIRECTOR PROFILE --- */}
            <DirectorProfile />

            {/* --- QUANTUM FINAL CTA --- */}
            <section className="py-60 px-6 md:px-12 lg:px-24 bg-slate-950 relative overflow-hidden">
                <div className="max-w-6xl mx-auto text-center space-y-24 relative z-10">
                    <div className="inline-flex flex-col items-center gap-10">
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="w-24 h-24 rounded-full border-2 border-primary border-dashed flex items-center justify-center"
                        >
                            <Palette size={40} className="text-white" />
                        </motion.div>
                        <span className="text-primary font-black uppercase text-xs tracking-[1em]">Enrollment Protocol v.26</span>
                    </div>
                    
                    <h2 className="text-7xl md:text-[14rem] font-black text-white uppercase tracking-tighter leading-[0.7]">
                        Forge <br /> <span className="stroke-text-white opacity-20">Your</span> <br /> <span className="text-primary italic font-serif lowercase">Legacy.</span>
                    </h2>
                    
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 pt-12">
                        <button 
                            onClick={() => openAdmissionModal({
                                title: 'Apply Admission',
                                subtitle: 'Take the first step towards your creative career.',
                                ctaText: 'Apply Now'
                            })}
                            className="w-full sm:w-auto h-12 md:h-14 px-12 md:px-20 bg-white text-slate-950 rounded-full font-black uppercase text-[10px] tracking-[0.5em] shadow-[0_30px_70px_rgba(255,255,255,0.1)] hover:bg-primary hover:text-white transition-all transform hover:scale-105 flex items-center justify-center"
                        >
                            Apply Admission
                        </button>
                        <button 
                            onClick={() => openAdmissionModal({
                                title: 'Curriculum Access',
                                subtitle: 'Request detailed curriculum for our undergraduate programs.',
                                ctaText: 'Request Access'
                            })}
                            className="w-full sm:w-auto h-12 md:h-14 px-12 md:px-20 border-2 border-white/20 text-white rounded-full font-black uppercase text-[10px] tracking-[0.5em] hover:bg-white hover:text-slate-950 transition-all transform hover:scale-105 flex items-center justify-center"
                        >
                            Curriculum Access
                        </button>
                    </div>
                </div>
            </section>

            {/* 6. CTA */}
            <section className="bg-black text-white py-24 text-center px-4">
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">
                    Ready to <br /> Create?
                </h2>
                <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                    <button 
                        onClick={() => navigate('/apply')}
                        className="px-12 md:px-20 h-12 md:h-14 bg-primary text-white font-bold uppercase tracking-widest rounded-full hover:bg-[#a61517] shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                        Apply Now
                    </button>
                    <button 
                        onClick={() => openAdmissionModal({
                            title: 'Download Brochure',
                            subtitle: 'Explore our world-class undergraduate curriculum.',
                            ctaText: 'Download Now',
                            successMsg: 'successful! The brochure link has been sent to your email.'
                        })}
                        className="px-12 md:px-20 h-12 md:h-14 border border-white text-white font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-center gap-3"
                    >
                        Download Brochure
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Undergraduate;
