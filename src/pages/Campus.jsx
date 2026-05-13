import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ArrowUpRight, ArrowLeft, Mic, Scissors, Monitor, Camera, Coffee, Utensils, Hexagon, Gem, Briefcase, Palette, Castle, BookOpen, Sun, Globe2, Compass, GraduationCap } from 'lucide-react';
import Lenis from 'lenis';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { campusData } from '../data/campusData';

gsap.registerPlugin(ScrollTrigger);

const IconMap = {
    Mic: Mic,
    Scissors: Scissors,
    Monitor: Monitor,
    Camera: Camera,
    Coffee: Coffee,
    Utensils: Utensils,
    Hexagon: Hexagon,
    Gem: Gem,
    Briefcase: Briefcase,
    Palette: Palette,
    Castle: Castle,
    BookOpen: BookOpen,
    Sun: Sun,
    Globe2: Globe2,
    Compass: Compass,
    GraduationCap: GraduationCap
};

const CampusDetail = ({ campus }) => {
    const heroRef = useRef(null);
    const { scrollYProgress: heroScroll } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const heroImgY = useTransform(heroScroll, [0, 1], ["0%", "40%"]);
    const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "80%"]);
    const opacityFade = useTransform(heroScroll, [0, 0.8], [1, 0]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-[#fcfcfc] min-h-screen font-sans selection:bg-black selection:text-white"
        >
            <SEO
                title={campus.seo.title}
                description={campus.seo.description}
                keywords={campus.seo.keywords}
            />

            {/* Cinematic Hero */}
            <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#e5e5e5]">
                <motion.div
                    style={{ y: heroImgY, opacity: opacityFade }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={campus.heroImage}
                        alt={campus.city}
                        className="w-full h-full object-cover mix-blend-multiply opacity-60"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#fcfcfc]/20 to-[#fcfcfc]" />
                </motion.div>

                <motion.div
                    style={{ y: heroTextY }}
                    className="relative z-10 text-center px-6 max-w-6xl mx-auto mt-20"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="flex flex-col items-center justify-center gap-4 mb-8"
                    >
                        <MapPin size={24} className="text-black/50" />
                        <span className="text-xs font-bold uppercase tracking-[0.4em] text-black/60">{campus.tagline}</span>
                    </motion.div>

                    <h1
                        className="text-clamp-5xl font-black uppercase tracking-tighter text-[#111] leading-[0.8] mb-8"
                    >
                        {campus.city.split(' ')[0]}<br />
                        <span className="text-transparent" style={{ WebkitTextStroke: '2px #111' }}>{campus.city.split(' ')[1] || campus.fullTitle.split('.')[0]}</span>
                    </h1>
                </motion.div>

                <Link to="/campuses" className="absolute top-32 left-8 md:left-20 z-50 flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-full border border-black/5 hover:bg-black hover:text-white transition-all group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">All Campuses</span>
                </Link>
            </section>

            {/* Brutalist Intro Statement */}
            <section className="py-32 md:py-48 px-6">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-start">
                    <div className="md:w-1/3">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-sm font-bold uppercase tracking-widest text-black/40 border-l border-black/20 pl-6"
                        >
                            Node Coordinate / 01
                        </motion.span>
                    </div>
                    <div className="md:w-2/3">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-clamp-3xl font-black uppercase tracking-tighter text-[#111] leading-[1.1] mb-10"
                        >
                            {campus.description.split('.')[0]}.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-lg md:text-xl font-medium text-black/60 leading-relaxed max-w-2xl"
                        >
                            {campus.description.split('.').slice(1).join('.')}
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Visual Tour / Horizontal Scroll (Simulated for dynamic) */}
            {campus.visuals && campus.visuals.length > 0 && (
                <section className="relative h-screen bg-[#f2f2f2] py-20 overflow-hidden">
                    <div className="h-full flex items-center px-10 md:px-20 gap-8">
                        {campus.visuals.map((img, i) => (
                            <div key={i} className="w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] md:h-[70vh] rounded-[2rem] overflow-hidden shrink-0 relative group shadow-xl">
                                <img
                                    src={img}
                                    className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-all duration-1000"
                                    alt={`Campus view ${i}`}
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Infrastructure Bento Grid */}
            <section className="py-32 px-6 lg:px-12 max-w-[1400px] mx-auto bg-white border-y border-black/5 relative z-10 rounded-t-[3rem] mt-20">
                <div className="mb-20 pt-10">
                    <h2 className="text-clamp-4xl font-black uppercase tracking-tighter text-[#111]">
                        Infrastructure.
                    </h2>
                </div>

                <div className="grid grid-cols-12 gap-4 md:gap-6">
                    {campus.infrastructure.map((fac, idx) => {
                        const Icon = IconMap[fac.icon] || Hexagon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className={`${idx % 3 === 0 ? 'col-span-12 lg:col-span-8' : 'col-span-12 md:col-span-6 lg:col-span-4'} bg-[#f5f5f5] rounded-[2rem] p-10 flex flex-col justify-between group overflow-hidden relative cursor-crosshair min-h-[400px] md:min-h-[500px]`}
                            >
                                <img
                                    src={fac.img}
                                    alt={fac.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-1000 group-hover:scale-105 mix-blend-multiply"
                                />
                                <div className="relative z-10 w-full h-full flex flex-col">
                                    <Icon size={24} className="mb-6 text-black/40" />
                                    <div className="mt-auto">
                                        <h3 className="text-clamp-2xl font-black uppercase tracking-tighter text-black mb-4">
                                            {fac.title}
                                        </h3>
                                        <p className="text-black/60 font-medium">
                                            {fac.desc}
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 p-8 transform translate-x-8 -translate-y-8 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                                    <span className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center bg-white shadow-lg">
                                        <ArrowUpRight size={18} className="text-black" />
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Connectivity & CTA */}
            <section className="bg-black text-white py-40 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-clamp-5xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                        Design The <br /> <span className="italic font-serif font-light text-white/50">Future @ {campus.city}.</span>
                    </h2>
                    <p className="text-white/60 text-lg md:text-xl font-medium mb-12 max-w-xl mx-auto">
                        Join the next cohort of designers defining the global creative economy. Book a personalized campus walk-through today.
                    </p>
                    <button className="bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform flex items-center justify-center gap-4 mx-auto">
                        Schedule Visit <ArrowUpRight size={18} />
                    </button>
                </div>
            </section>

            <Footer />
        </motion.div>
    );
};

const Campuses = () => {
    const { campusId } = useParams();
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const horizontalScrollRef = useRef(null);
    const horizontalSectionRef = useRef(null);
    const portalTextRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1,
            smoothWheel: true,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, [campusId]);

    useLayoutEffect(() => {
        if (campusId) return;

        let ctx = gsap.context(() => {
            const heroTl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "+=200%",
                    scrub: 1,
                    pin: true,
                }
            });

            heroTl.to(".portal-gate-l", { xPercent: -100, opacity: 0, scale: 2, filter: "blur(20px)" }, 0)
                .to(".portal-gate-r", { xPercent: 100, opacity: 0, scale: 2, filter: "blur(20px)" }, 0)
                .to(portalTextRef.current, { scale: 50, opacity: 0, duration: 2, ease: "power2.in" }, 0)
                .from(".hero-content-reveal", { scale: 0.5, opacity: 0, filter: "blur(30px)", duration: 2 }, 0.5)
                .to(".hero-bg-video", { scale: 1.2, filter: "blur(0px)", opacity: 0.6 }, 0);

            if (horizontalScrollRef.current) {
                const scrollAmount = horizontalScrollRef.current.scrollWidth - window.innerWidth;
                gsap.to(horizontalScrollRef.current, {
                    x: -scrollAmount,
                    ease: "none",
                    scrollTrigger: {
                        trigger: horizontalSectionRef.current,
                        start: "top top",
                        end: () => `+=${scrollAmount}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });
            }

            const magneticButtons = document.querySelectorAll(".magnetic-btn");
            magneticButtons.forEach(btn => {
                const xTo = gsap.quickTo(btn, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
                const yTo = gsap.quickTo(btn, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

                btn.addEventListener("mousemove", (e) => {
                    const { clientX, clientY } = e;
                    const { left, top, width, height } = btn.getBoundingClientRect();
                    const x = (clientX - (left + width / 2)) * 0.5;
                    const y = (clientY - (top + height / 2)) * 0.5;
                    xTo(x);
                    yTo(y);
                });

                btn.addEventListener("mouseleave", () => {
                    xTo(0);
                    yTo(0);
                });
            });

            gsap.to(".scroll-progress", {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.3
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, [campusId]);

    const locations = [
        { id: "south-delhi", city: "South Delhi", title: "Flagship Campus", desc: "Our primary creative ecosystem situated in the cultural heart of India's capital.", img: `https://images.pexels.com/photos/1547637/pexels-photo-1547637.jpeg?auto=compress&cs=tinysrgb&w=${isMobile ? 800 : 1600}`, num: "01" },
        { id: "north-delhi", city: "North Delhi", title: "Innovation Hub", desc: "A dynamic center focusing on future paradigms of design and technology.", img: `https://images.pexels.com/photos/10861113/pexels-photo-10861113.jpeg?auto=compress&cs=tinysrgb&w=${isMobile ? 800 : 1600}`, num: "02" },
        { id: "paris", city: "Paris (CDP)", title: "Global Couture", desc: "In the world's fashion capital, defining the bleeding edge of luxury design.", img: `https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=${isMobile ? 800 : 1600}`, num: "03" },
        { id: "washington", city: "Washington (IBSW)", title: "Strategic Design", desc: "Where design thinking meets international business leadership and strategy.", img: `https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?auto=compress&cs=tinysrgb&w=${isMobile ? 800 : 1600}`, num: "04" },
        { id: "dubai", city: "Dubai (IBSW)", title: "Future Aesthetics", desc: "Positioned in the hub of futuristic architecture and retail innovation.", img: `https://images.pexels.com/photos/1708601/pexels-photo-1708601.jpeg?auto=compress&cs=tinysrgb&w=${isMobile ? 800 : 1600}`, num: "05" },
        { id: "united-kingdom", city: "United Kingdom (UCA)", title: "Creative Arts", desc: "A prestigious partnership nurturing the next generation of visual arts pioneers.", img: `https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=${isMobile ? 800 : 1600}`, num: "06" }
    ];

    if (campusId && campusData[campusId]) {
        return <CampusDetail campus={campusData[campusId]} />;
    }

    return (
        <div ref={containerRef} className="bg-white text-black selection:bg-primary selection:text-white overflow-hidden font-sans">
            <SEO
                title="Our Global Campus Network - Delhi, Paris, London, Dubai"
                description="International School of Design (INSD) has a strong presence across India and international locations. Explore our flagship campuses in South Delhi, Paris, Washington, and more."
                keywords="INSD campuses, design school locations, South Delhi campus, INSD Paris, INSD Dubai, international design school"
            />

            <div className="fixed top-0 left-0 w-full h-[2px] bg-black/10 z-100 origin-left">
                <div className="scroll-progress h-full bg-primary scale-x-0 w-full origin-left" />
            </div>

            <div className="fixed inset-0 pointer-events-none opacity-20 z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            <div ref={heroRef} className="relative h-screen bg-white flex items-center justify-center overflow-hidden">
                <div className="hero-bg-video absolute inset-0 z-0 scale-125 filter blur-2xl opacity-0 transition-opacity duration-1000">
                    <video autoPlay muted loop playsInline className="w-full h-full object-cover" src="https://www.pexels.com/download/video/3129957/" />
                </div>

                <div className="portal-gate-l absolute left-0 top-0 w-1/2 h-full bg-white z-20 flex items-center justify-end overflow-hidden">
                    <h2 className="text-[30vw] font-black text-black/5 leading-none translate-x-1/2">CAM</h2>
                </div>
                <div className="portal-gate-r absolute right-0 top-0 w-1/2 h-full bg-white z-20 flex items-center justify-start overflow-hidden">
                    <h2 className="text-[30vw] font-black text-black/5 leading-none -translate-x-1/2">PUS</h2>
                </div>

                <div ref={portalTextRef} className="relative z-30 pointer-events-none px-4 text-center">
                    <h1 className="text-black text-clamp-5xl font-black uppercase tracking-tighter leading-none italic">
                        ENT<span className="text-transparent strok-text-black opacity-40">E</span>R
                    </h1>
                </div>

                <div className="hero-content-reveal absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
                    <span className="text-primary font-mono tracking-[0.8em] md:tracking-[1.5em] uppercase text-[9px] md:text-[10px] mb-8 animate-pulse">Unlocking The Ecosystem</span>
                    <h2 className="text-clamp-5xl font-black uppercase tracking-tighter text-center max-w-5xl leading-[0.85]">
                        Nodes Of <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Pure Creation.</span>
                    </h2>
                </div>
            </div>

            <section className="py-64 px-6 bg-white relative space-y-32">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                    <div className="order-2 md:order-1 relative">
                        <div className="aspect-square bg-white rounded-[3rem] overflow-hidden group border border-white/10">
                            <img src={`https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=${isMobile ? 800 : 1200}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 blur-[100px] -z-10" />
                    </div>
                    <div className="order-1 md:order-2">
                        <span className="text-primary font-bold uppercase tracking-[0.5em] text-[10px] block mb-6">Atmosphere</span>
                        <h3 className="text-clamp-3xl font-black uppercase leading-none tracking-tighter mb-8">
                            Beyond <br /> Four Walls.
                        </h3>
                        <p className="text-black/60 text-lg md:text-xl leading-relaxed font-light mb-12">
                            An INSD campus is not just building—it's a high-performance laboratory where craftsmen, rebels, and visionaries meet to define the new luxury world.
                        </p>
                        <button className="magnetic-btn px-12 py-5 border border-black/20 rounded-full font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                            View 3D Tour
                        </button>
                    </div>
                </div>
            </section>

            {/* Campus Ecosystem Mosaic Section */}
            <section className="py-32 md:py-60 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[150px] md:auto-rows-[250px]">
                        {/* Mosaic Item 1 */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="col-span-6 md:col-span-3 row-span-1 md:row-span-2 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white"
                        >
                            <img src="/brain/b291e1a3-1cb2-4efc-ac17-c19bc4ddc65e/campus_reception_modern_1776962671863.png" className="w-full h-full object-cover" alt="Campus" />
                        </motion.div>

                        {/* Mosaic Item 2 */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="col-span-6 md:col-span-3 row-span-1 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white"
                        >
                            <img src="/brain/b291e1a3-1cb2-4efc-ac17-c19bc4ddc65e/campus_studio_mural_1776962689497.png" className="w-full h-full object-cover" alt="Campus" />
                        </motion.div>

                        {/* Mosaic Item 3 */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="col-span-6 md:col-span-3 row-span-1 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white"
                        >
                            <img src="/brain/b291e1a3-1cb2-4efc-ac17-c19bc4ddc65e/campus_fashion_workshop_1776962708536.png" className="w-full h-full object-cover" alt="Campus" />
                        </motion.div>

                        {/* Central Text Block */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="col-span-12 md:col-span-6 row-span-1 md:row-span-2 bg-white flex items-center justify-center text-center p-12 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] relative z-10 border border-slate-100"
                        >
                            <h2 className="text-clamp-4xl font-black uppercase tracking-tighter text-slate-900 leading-[0.85]">
                                OUR CAMPUS IS <br />
                                <span className="text-primary italic">WELL-EQUIPPED</span> <br />
                                TO DELIVER THE <br />
                                <span className="text-slate-300">PERFECT TRAINING</span>
                            </h2>
                        </motion.div>

                        {/* Mosaic Item 4 */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="col-span-6 md:col-span-3 row-span-1 md:row-span-2 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white"
                        >
                            <img src="/brain/b291e1a3-1cb2-4efc-ac17-c19bc4ddc65e/campus_computer_lab_tech_1776962724124.png" className="w-full h-full object-cover" alt="Campus" />
                        </motion.div>

                        {/* Mosaic Item 5 */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="col-span-6 md:col-span-3 row-span-1 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white"
                        >
                            <img src="/brain/b291e1a3-1cb2-4efc-ac17-c19bc4ddc65e/campus_mural_creative_wall_1776962741811.png" className="w-full h-full object-cover" alt="Campus" />
                        </motion.div>

                        {/* Mosaic Item 6 */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="col-span-6 md:col-span-3 row-span-1 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white"
                        >
                            <img src="/brain/b291e1a3-1cb2-4efc-ac17-c19bc4ddc65e/campus_office_meeting_room_1776962757325.png" className="w-full h-full object-cover" alt="Campus" />
                        </motion.div>

                        {/* Mosaic Item 7 */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="col-span-6 md:col-span-3 row-span-1 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white"
                        >
                            <img src="/brain/b291e1a3-1cb2-4efc-ac17-c19bc4ddc65e/campus_art_studio_tables_1776962773027.png" className="w-full h-full object-cover" alt="Campus" />
                        </motion.div>

                        {/* Mosaic Item 8 (Placeholder/Additional) */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                            className="col-span-6 md:col-span-3 row-span-1 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white"
                        >
                            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000" className="w-full h-full object-cover" alt="Campus" />
                        </motion.div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 }}
                        className="mt-16 text-center"
                    >
                        <p className="text-slate-400 text-[10px] uppercase tracking-widest">
                            ©All rights reserved 2026. International School of Design, Head Office, New Delhi
                        </p>
                    </motion.div>
                </div>
            </section>

            <section ref={horizontalSectionRef} className="h-screen bg-white">
                <div ref={horizontalScrollRef} className="h-full flex items-center px-[5vw] gap-32">
                    <div className="min-w-[85vw] md:min-w-[40vw] flex flex-col justify-center">
                        <span className="text-primary font-bold uppercase tracking-widest text-xs mb-6 block">— The Network</span>
                        <h2 className="text-clamp-4xl font-black text-black leading-[0.85] tracking-tighter uppercase mb-12">
                            Global <br /> <span className="text-transparent stroke-text-white stroke-black!">Dominance.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-500 max-w-sm">
                            Strategic hubs positioned in the epicenters of India's cultural and commercial revolutions.
                        </p>
                    </div>

                    {locations.map((loc, i) => (
                        <div key={i} className="min-w-[85vw] md:min-w-[70vw] h-[80vh] bg-white rounded-[3rem] relative overflow-hidden group group border border-black/5 shadow-2xl">
                            <div className="absolute -bottom-20 -left-10 opacity-5 select-none pointer-events-none">
                                <span className="text-[35vw] font-black text-black leading-none uppercase">{loc.city[0]}</span>
                            </div>
                            <div className="relative z-10 w-full h-full p-8 md:p-24 flex flex-col md:flex-row items-center gap-10 md:gap-12">
                                <div className="w-full md:w-1/2 space-y-6 md:space-y-8">
                                    <span className="text-primary font-mono text-sm md:text-xl border border-primary/30 px-4 md:px-6 py-1 md:py-2 rounded-full w-fit block">{loc.num}</span>
                                    <h3 className="text-clamp-4xl font-black uppercase text-black tracking-tighter leading-none">{loc.city.split(' ')[0]}</h3>
                                    <p className="text-black/60 text-base md:text-xl font-light whitespace-normal max-w-sm"><span className="text-black font-bold">{loc.title}.</span> {loc.desc}</p>
                                    <Link to={`/campuses/${loc.id}`} className="inline-block px-8 md:px-10 py-3 md:py-4 bg-black text-white font-bold uppercase tracking-widest rounded-full hover:bg-primary transition-all text-xs md:text-base">Explore Node</Link>
                                </div>
                                <div className="w-full md:w-1/2 h-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative min-h-[200px] md:min-h-0">
                                    <img src={loc.img} className="loc-panel-img w-full h-full object-cover brightness-75 transition-all duration-1000 scale-125 group-hover:scale-100" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-64 bg-white relative overflow-hidden border-t border-black/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
                        <div className="max-w-2xl">
                            <span className="text-primary font-mono uppercase tracking-[0.5em] text-[9px] md:text-[10px] block mb-4">Inside the Labs</span>
                            <h2 className="text-clamp-4xl font-black uppercase leading-none tracking-tighter text-black">
                                World-Class <br /> <span className="text-transparent strok-text-black">Infrastructure.</span>
                            </h2>
                        </div>
                        <p className="text-black/60 text-lg max-w-sm mb-4 border-l border-black/10 pl-8">
                            Our environments are engineered to reduce friction between idea and execution.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { name: "Couture Suite", desc: "Equipped with high-performance industrial machinery and couture tools.", icon: "🧵", bg: "bg-primary/5" },
                            { name: "Animation Farm", desc: "Ultrafast rendering nodes and full-body motion capture stages.", icon: "⚡", bg: "bg-secondary/5" },
                            { name: "3D Workshops", desc: "Advanced rapid prototyping, SLA printing, and material libraries.", icon: "📐", bg: "bg-secondary/5" }
                        ].map((lab, i) => (
                            <div key={i} className={`lab-card group relative p-16 rounded-[3rem] border border-white/5 ${lab.bg} hover:border-white/20 transition-all duration-700 overflow-hidden`}>
                                <div className="absolute top-0 right-0 p-8 text-6xl transition-all opacity-20 group-hover:opacity-100">{lab.icon}</div>
                                <div className="relative z-10">
                                    <span className="text-primary font-mono text-[10px] md:text-xs block mb-6">Lab Unit 0{i + 1}</span>
                                    <h4 className="text-2xl md:text-3xl font-black uppercase mb-6 text-black">{lab.name}</h4>
                                    <p className="text-black/60 leading-relaxed font-light text-sm md:text-base">{lab.desc}</p>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Campuses;
