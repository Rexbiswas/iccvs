import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play, Pause, Clock, Globe, Sparkles, Star, BookOpen, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const OnlineCourse = () => {
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const navRef = useRef(null);
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    const { scrollY } = useScroll();

    // Parallax and scroll effects
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Magnetic button effect for specific elements
            const magneticElements = document.querySelectorAll('.magnetic');
            magneticElements.forEach(el => {
                el.addEventListener('mousemove', (e) => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    gsap.to(el, {
                        x: x * 0.3,
                        y: y * 0.3,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                });
                el.addEventListener('mouseleave', () => {
                    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
                });
            });

            // Reveal animations for cards
            gsap.utils.toArray('.reveal-card').forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: 100,
                    opacity: 0,
                    rotationX: -15,
                    duration: 1,
                    delay: i * 0.1,
                    ease: "expo.out"
                });
            });

            // Holographic line animation
            gsap.to('.holo-line', {
                xPercent: 100,
                duration: 2,
                repeat: -1,
                ease: "none",
                stagger: 0.5
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const curriculum = [
        { title: "Market Research Strategy", desc: "Deep dive into consumer behavior and market gap identification for elite ventures." },
        { title: "Luxury Branding", desc: "Mastering the codes of aesthetic excellence and brand heritage storytelling." },
        { title: "Principles of Luxury", desc: "Understanding the unique anti-laws and psychology of the luxury world." },
        { title: "Luxury Brand Strategy", desc: "Building sustainable competitive advantage in high-ticket industries." },
        { title: "Distribution Strategy", desc: "The logistics of exclusivity: From flagship boutiques to ultra-private digital apps." },
        { title: "Luxury Brand Marketing", desc: "Creating desire without mass-market dilution: The art of prestigious communication." },
        { title: "CRM & CSR", desc: "High-net-worth clienteling and the evolution of sustainable luxury practices." },
        { title: "Luxury Content Marketing", desc: "Editorial storytelling and digital content that resonates with the 1%." },
        { title: "Supply Chain", desc: "Managing artisan craftsmanship and ethical production at scale." },
        { title: "The Art of Selling Luxury", desc: "Consultative high-ticket sales: Mastering the psychology of high-spend clients." },
        { title: "Luxury Start-up Case Studies", desc: "Analyzing the disruptors: How modern labels scaled from zero to prestige." },
        { title: "Capstone Project", desc: "Final intensive project: Building your own luxury blueprint or business plan." }
    ];

    return (
        <div ref={containerRef} className="bg-white text-slate-900 overflow-x-hidden selection:bg-primary selection:text-white font-sans">
            <SEO 
                title="Online Design Courses - Study Fashion & Interior Anywhere"
                description="Join INSD's elite online design ecosystem. Our 'Education 5.0' platform offers industry-recognized certificates in luxury brand management and design disruptor masterclasses."
                keywords="online design courses India, fashion design online, interior design online course, luxury brand management online, virtual design school, remote creative education"
            />

            {/* --- NEXT LEVEL HERO SECTION --- */}
            <section ref={heroRef} className="relative min-h-[110vh] flex flex-col justify-center items-center overflow-hidden py-24 md:py-0 px-4 md:px-12 bg-slate-950">

                {/* Immersive Background: Dynamic Grid & Ambient Glows */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full animate-pulse-slow"></div>
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/20 blur-[120px] rounded-full animate-pulse-slow delay-700"></div>

                    {/* Floating Video Texture */}
                    <video
                        className="absolute inset-0 w-full h-full object-cover opacity-20 filter contrast-125 saturate-50"
                        autoPlay muted loop playsInline
                    >
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-in-a-gold-dress-34421-large.mp4" type="video/mp4" />
                    </video>
                </div>

                {/* Content Layer */}
                <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    <div className="lg:col-span-7 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-white/60 text-[10px] md:text-sm font-black uppercase tracking-widest">Enrollment Live for 2026 Batch</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-8xl xl:text-9xl font-black text-white leading-none uppercase tracking-tighter mb-8 italic">
                            Next Gen <br />
                            <span className="text-transparent strok-text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">Design </span>
                            <span className="text-primary italic">Masters.</span>
                        </h1>

                        <p className="text-white/40 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mb-12 hidden md:block">
                            Break the traditional boundaries of design education. Join our elite online ecosystem of visionaries and industry disruptors.
                        </p>

                        <div className="flex flex-col md:flex-row items-center gap-6 justify-center lg:justify-start">
                             <button 
                                onClick={() => navigate('/apply')}
                                className="magnetic group relative px-12 py-5 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl overflow-hidden"
                            >
                                <span className="relative z-10">Start Learning Now</span>
                                <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-primary transition-all duration-300 -z-0"></div>
                            </button>
                            <button className="flex items-center gap-4 text-white hover:text-primary transition-colors group">
                                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-500">
                                    <Play fill="currentColor" size={24} />
                                </div>
                                <span className="font-bold uppercase tracking-widest text-sm">Watch Showreel</span>
                            </button>
                        </div>
                    </div>

                    {/* Holographic Course Card */}
                    <div className="lg:col-span-5 relative perspective-[1000px]">
                        <motion.div
                            style={{ y: y1 }}
                            whileHover={{ rotateY: 5, rotateX: -5 }}
                            className="relative aspect-3/4 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/20 p-8 md:p-12 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden group/card"
                        >
                            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-white/10 to-transparent pointer-events-none"></div>

                            {/* Inner Card Elements */}
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <img src="https://ik.imagekit.io/fmldynl4j4/INSD-Logo_Vertical-removebg-preview.png" className="w-24 invert brightness-0" alt="INSD" />
                                    <div className="text-right">
                                        <p className="text-primary font-black text-2xl">4.9/5</p>
                                        <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Student Rating</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 bg-primary text-white text-[8px] font-black uppercase rounded-full">New</span>
                                        <span className="px-3 py-1 bg-white/10 text-white text-[8px] font-black uppercase rounded-full">Accredited</span>
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase">Luxury Brand <br />Directorship</h3>
                                    <div className="flex items-center gap-6 text-white/60">
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className="text-primary" />
                                            <span className="text-xs font-bold uppercase">12 Weeks</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <BookOpen size={16} className="text-primary" />
                                            <span className="text-xs font-bold uppercase">12 Key Pillars</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-white/10">
                                    <div className="flex -space-x-3 mb-4">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                                                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                                            </div>
                                        ))}
                                        <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-primary flex items-center justify-center text-[10px] font-bold text-white uppercase">+2k</div>
                                    </div>
                                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Enrolled Professionals Worldwide</p>
                                </div>
                            </div>

                            {/* Decorative Holo Line */}
                            <div className="holo-line absolute bottom-0 left-[-100%] w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent blur-sm"></div>
                        </motion.div>

                        {/* Floating elements behind card */}
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary/30 rounded-full blur-[60px] animate-bounce-slow"></div>
                        <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-primary/30 rounded-full blur-[50px] animate-pulse-slow"></div>
                    </div>
                </div>

                {/* Sub-navbar / Anchor Links - Glassmorphic Floating */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 hidden md:block">
                    <div className="bg-white/10 backdrop-blur-2xl border border-white/10 px-8 py-4 rounded-full flex gap-12">
                        {['Overview', 'Curriculum', 'Mentors', 'Register'].map(item => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CORE FEATURES --- */}
            <section id="overview" className="relative py-32 px-4 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Globe />, title: "Dual Global Campus", desc: "Experience the synergy of Paris and London through our virtual twin-campus model." },
                            { icon: <Sparkles />, title: "AI Enhanced Learning", desc: "Learn to leverage generative design tools to amplify your creative reach." },
                            { icon: <Star />, title: "Elite Mentorship", desc: "Direct feedback sessions from creative directors of heritage luxury houses." },
                            { icon: <Clock />, title: "Infinite Access", desc: "LIFETIME access to updated course materials and our global design repository." }
                        ].map((item, idx) => (
                            <div key={idx} className="reveal-card group p-8 rounded-4xl bg-slate-50 hover:bg-black transition-all duration-500 cursor-default">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                                    {item.icon}
                                </div>
                                <h4 className="text-xl font-black uppercase mb-4 group-hover:text-white transition-colors">{item.title}</h4>
                                <p className="text-slate-500 group-hover:text-white/60 transition-colors leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CINEMATIC VIDEO EXPERIENCE SECTION --- */}
            <section className="relative py-32 px-4 md:px-12 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div
                        onClick={togglePlay}
                        className="relative aspect-video rounded-4xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] group cursor-pointer"
                    >
                        {/* Video Element */}
                        <video
                            ref={videoRef}
                            loop
                            playsInline
                            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                        >
                            <source src="https://insd.edu.in/luxuryonline/img/videotap.mp4" type="video/mp4" />
                        </video>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

                        {/* Play/Pause Animated Feedback Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={isPlaying ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white"
                            >
                                {isPlaying ? <Pause fill="currentColor" size={48} /> : <Play fill="currentColor" size={48} className="translate-x-1" />}
                            </motion.div>
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 pointer-events-none">
                            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                                <div className="max-w-2xl">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-3 text-primary mb-4"
                                    >
                                        <div className="w-12 h-px bg-primary"></div>
                                        <span className="text-xs font-black uppercase tracking-[0.3em]">Official Course Preview</span>
                                    </motion.div>
                                    <h3 className="text-4xl md:text-7xl font-black text-white uppercase leading-none mb-4">
                                        Inside the <br />
                                        <span className="text-transparent strok-text-white italic">Elite Studio.</span>
                                    </h3>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Click to {isPlaying ? 'Pause' : 'Play'}</div>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-500 ${isPlaying ? 'bg-primary text-white' : 'bg-white text-slate-950'}`}
                                    >
                                        {isPlaying ? <Pause fill="currentColor" size={24} /> : <Play fill="currentColor" size={24} className="translate-x-1" />}
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive UI frame */}
                        <div className="absolute inset-8 border border-white/20 rounded-4xl pointer-events-none group-hover:inset-4 transition-all duration-700"></div>
                    </div>

                    {/* Captions / Legend */}
                    <div className="mt-12 flex flex-col md:flex-row gap-12 text-slate-400">
                        <div className="flex-1 p-8 border-l border-slate-100">
                            <p className="text-xs font-black uppercase text-primary mb-4 tracking-widest">Atmosphere</p>
                            <p className="text-lg leading-relaxed">Immerse yourself in a world where design meets high-octane luxury. Every frame of our curriculum is crafted for visual excellence.</p>
                        </div>
                        <div className="flex-1 p-8 border-l border-slate-100">
                            <p className="text-xs font-black uppercase text-primary mb-4 tracking-widest">Technology</p>
                            <p className="text-lg leading-relaxed">Recorded in 4K with industry-standard production, ensuring you don't just learn, but experience the brand's soul.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ENHANCED CURRICULUM SECTION --- */}
            <section id="curriculum" className="relative py-32 px-4 md:px-12 bg-slate-950 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                        <div className="max-w-3xl">
                            <span className="text-primary font-mono text-sm uppercase tracking-widest block mb-4">// Course Syllabus </span>
                            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                                The Luxury <br />
                                <span className="text-transparent strok-text-white italic">Protocol.</span>
                            </h2>
                        </div>
                        <div className="hidden md:flex flex-col items-end">
                            <p className="text-white/40 text-right font-bold uppercase tracking-widest text-xs mb-4">12 Core pillars of excellence</p>
                            <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="w-1/2 h-full bg-primary animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-[3rem] overflow-hidden backdrop-blur-sm">
                        {curriculum.map((mod, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                                className="group p-10 md:p-12 bg-slate-950 transition-all duration-500 flex flex-col justify-between aspect-square"
                            >
                                <div>
                                    <div className="flex justify-between items-center mb-8">
                                        <span className="text-4xl font-black text-white/10 group-hover:text-primary/40 transition-colors font-mono tracking-tighter">0{idx + 1}</span>
                                        <div className="w-8 h-px bg-white/20 group-hover:w-16 transition-all duration-500"></div>
                                    </div>
                                    <h4 className="text-2xl md:text-3xl font-black uppercase leading-tight mb-6 group-hover:translate-x-2 transition-transform duration-500">{mod.title}</h4>
                                    <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/70 transition-colors">{mod.desc}</p>
                                </div>
                                <div className="mt-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
                                    Explore Module <ArrowRight size={14} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Decorative Elements for Curriculum */}
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
            </section>

            {/* --- PREMIUM CERTIFICATION SECTION --- */}
            <section id="certification" className="relative py-32 px-4 md:px-12 bg-[#fafafa] overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative bg-white rounded-[4rem] p-12 md:p-24 border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] overflow-hidden group">
                        {/* Background Luxury Texture */}
                        <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full group-hover:bg-primary/10 transition-all duration-1000"></div>

                        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 md:gap-24">
                            {/* Certificate Image Column: Next Level 3D Display */}
                            <div className="w-full lg:w-1/2 flex justify-center">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
                                    whileInView={{ scale: 1, opacity: 1, rotateY: -10 }}
                                    transition={{ duration: 1.5, ease: "expo.out" }}
                                    className="relative group/cert h-[350px] md:h-[500px] w-full max-w-[550px]"
                                >
                                    {/* Holographic Background Glow */}
                                    <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full group-hover/cert:bg-primary/15 transition-all duration-1000 scale-110"></div>

                                    {/* The Certificate Frame */}
                                    <div className="relative h-full w-full bg-[#faf9f6] p-4 md:p-8 rounded-sm shadow-[0_40px_80px_rgba(0,0,0,0.1)] border-16 border-white transform-gpu transition-all duration-700 group-hover/cert:rotate-y-0 group-hover/cert:scale-105 overflow-hidden">

                                        {/* Inner Ornate Border */}
                                        <div className="absolute inset-2 border border-primary/20 pointer-events-none after:content-[''] after:absolute after:inset-1 after:border after:border-primary/10" />

                                        {/* Paper Texture Overlay */}
                                        <div className="absolute inset-0 opacity-[0.3] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

                                        <div className="relative z-10 h-full flex flex-col items-center justify-between text-center py-4">
                                            <img src="https://ik.imagekit.io/fmldynl4j4/INSD-Logo_Vertical-removebg-preview.png" className="w-24 opacity-80" alt="INSD" />

                                            <div className="space-y-4">
                                                <h4 className="font-serif italic text-primary text-[10px] md:text-xs tracking-widest uppercase">Certificate of Completion</h4>
                                                <h2 className="text-2xl md:text-4xl font-serif text-slate-900 border-b border-slate-200 pb-2">Professional Diploma</h2>
                                                <p className="text-[10px] md:text-xs font-mono tracking-widest text-slate-400 uppercase italic">Awarded for Excellence in Design & Disruptive Innovation</p>
                                            </div>

                                            <div className="w-full flex justify-between items-end px-4">
                                                <div className="text-left">
                                                    <div className="w-16 md:w-32 h-px bg-slate-300 mb-2" />
                                                    <p className="text-[8px] font-bold uppercase tracking-tighter opacity-40">Academic Dean</p>
                                                </div>
                                                <div className="relative">
                                                    <img src="https://ik.imagekit.io/fmldynl4j4/unnamed.jpg" className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg" alt="Seal" />
                                                </div>
                                                <div className="text-right">
                                                    <div className="w-16 md:w-32 h-px bg-slate-300 mb-2" />
                                                    <p className="text-[8px] font-bold uppercase tracking-tighter opacity-40">Director, INSD</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Glass Shine Effect */}
                                        <div className="absolute inset-0 z-20 bg-linear-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover/cert:translate-x-full transition-transform duration-2000 ease-in-out"></div>
                                    </div>

                                    {/* Signature Badge */}
                                    <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-slate-900 p-4 md:p-6 rounded-2xl shadow-2xl z-40 transform rotate-12 group-hover/cert:rotate-0 transition-transform duration-500">
                                        <div className="flex flex-col items-center">
                                            <div className="text-white font-black text-xl md:text-2xl italic font-serif leading-none">Verified</div>
                                            <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-white/40 mt-1">Authentic Credential</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Text Content Column */}
                            <div className="w-full lg:w-1/2 text-center lg:text-left">
                                <span className="inline-block text-primary font-bold tracking-[0.4em] uppercase text-xs mb-6">Credentialing</span>
                                <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none mb-8">
                                    Global <br />
                                    <span className="text-transparent strok-text-black italic">Recognition.</span>
                                </h2>
                                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium mb-12 max-w-2xl">
                                    On <span className="text-slate-900 font-bold">successful completion</span> of the course, you will receive an industry-recognized
                                    <span className="text-primary italic font-serif mx-2 underline decoration-primary/30">Certificate of Pursuit</span>
                                    from the <span className="text-slate-900 font-black">International School of Design</span>.
                                </p>

                                <div className="flex flex-wrap justify-center lg:justify-start gap-8 border-t border-slate-100 pt-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
                                            <CheckCircle2 size={24} className="text-primary" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs font-black uppercase tracking-widest text-slate-900">Verified</p>
                                            <p className="text-[10px] font-bold text-slate-400">Blockchain Secured</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
                                            <CheckCircle2 size={24} className="text-primary" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs font-black uppercase tracking-widest text-slate-900">Global</p>
                                            <p className="text-[10px] font-bold text-slate-400">Industry Accredited</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ADMISSION CTA: NEXT LEVEL --- */}
            <section className="relative py-40 px-4 md:px-12 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto rounded-[4rem] bg-black p-12 md:p-32 text-center text-white relative overflow-hidden">
                    {/* Background noise/shimmer */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                    <div className="relative z-10 max-w-4xl mx-auto">
                        <Sparkles className="mx-auto mb-8 text-primary" size={48} />
                        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-12 leading-none">
                            Shift your <br />
                            <span className="italic font-serif font-light lowercase text-slate-400">Perspective.</span>
                        </h2>
                        <p className="text-white/60 text-lg md:text-2xl mb-12 italic">
                            The future of design is decentralized. Our platform brings the industry’s brightest minds to your doorstep.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                             <button 
                                onClick={() => navigate('/apply')}
                                className="px-12 py-6 bg-primary text-white font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(219,52,54,0.4)]"
                            >
                                Claim My Seat
                            </button>
                            <button className="px-12 py-6 border border-white/20 text-white font-black uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all">
                                Get Scholarship Info
                            </button>
                        </div>

                        <div className="mt-20 flex items-center justify-center gap-8 md:gap-16 opacity-30 invert">
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">INSD</h1>
                            <div className="h-12 w-px bg-white"></div>
                            <h1 className="text-4xl md:text-4xl font-light italic font-serif">Education 5.0</h1>
                        </div>
                    </div>

                    {/* Ambient Glows */}
                    <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full"></div>
                    <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-secondary/20 blur-[150px] rounded-full"></div>
                </div>
            </section>

            <Footer />

            {/* STYLE INJECTION FOR OUTLINE TEXT */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .strok-text-white {
                    -webkit-text-stroke: 1px white;
                    color: transparent;
                }
                .strok-text-black {
                    -webkit-text-stroke: 1px black;
                    color: transparent;
                }
                @media (min-width: 768px) {
                    .strok-text-white { -webkit-text-stroke: 2px white; }
                    .strok-text-black { -webkit-text-stroke: 2px black; }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.1); }
                }
                .animate-pulse-slow { animation: pulse-slow 8s infinite ease-in-out; }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-30px); }
                }
                .animate-bounce-slow { animation: bounce-slow 6s infinite ease-in-out; }
            `}} />
        </div>
    );
};

export default OnlineCourse;
