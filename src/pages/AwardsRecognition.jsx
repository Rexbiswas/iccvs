import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Star, ShieldCheck, Trophy, Sparkles, ArrowDown } from 'lucide-react';
import TOICertification from '../components/TOICertification';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useAdmissionModal } from '../context/AdmissionModalContext';

gsap.registerPlugin(ScrollTrigger);

const AwardsRecognition = () => {
    const { openAdmissionModal } = useAdmissionModal();
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const statsRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Stats Reveal
            gsap.from(".stat-item", {
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

            // Section Divider Morph
            gsap.to(".section-divider", {
                scrollTrigger: {
                    trigger: ".section-divider",
                    start: "top bottom",
                    scrub: 1
                },
                width: "100%",
                ease: "none"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const timelineAchievements = [
        { year: "2025", event: "National Design Excellence Award", icon: <Trophy className="text-primary" /> },
        { year: "2023", event: "Best Placement Record in Northern India", icon: <Star className="text-secondary" /> },
        { year: "2021", event: "International College of the Year (IBSW)", icon: <Globe className="text-primary" /> },
        { year: "15+", event: "Years of Academic Leadership", icon: <ShieldCheck className="text-secondary" /> }
    ];

    return (
        <div ref={containerRef} className="bg-white min-h-screen selection:bg-slate-900 selection:text-white overflow-x-hidden">
            <SEO
                title="Awards & Recognition | Excellence in Design Education - INSD"
                description="Explore the prestigious awards and official recognitions that define INSD's legacy of excellence. From National Awards to Global Placement Records, our achievements speak for themselves."
                keywords="design school awards, INSD ranking, best fashion college India, top interior design institute, national design excellence award"
            />

            {/* --- PRESTIGE HERO --- */}
            <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
                {/* Parallax Background */}
                <motion.div
                    style={{ y, opacity }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-white z-10" />
                    <img
                        src="/C:/Users/Rishi/.gemini/antigravity/brain/8980b6ce-25db-4a18-a093-a44406a5ec23/awards_recognition_hero_1774030014761.png"
                        alt="Prestige Recognition"
                        className="w-full h-full object-cover scale-110"
                    />
                    <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />
                </motion.div>

                {/* Content Overlay */}
                <div className="relative z-20 max-w-6xl px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-white/40 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-primary mb-12 shadow-2xl"
                    >
                        <Award size={14} className="animate-pulse" />
                        A Legacy of Distinction
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-black uppercase leading-[0.85] tracking-tighter text-slate-500 mix-blend-difference"
                    >
                        Trusted. Recognised. <br className="md:hidden" /> <span className="text-primary italic font-serif">Proven.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="mt-12 text-lg md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto tracking-tighter mix-blend-difference"
                    >
                        Defining the global horizon of design education <br /> through 15 years of uninterrupted excellence.
                    </motion.p>
                </div>


            </section>

            {/* --- IMPACT STATS --- */}
            <section ref={statsRef} className="py-24 md:py-40 bg-white relative z-20 -mt-20 rounded-t-[5rem]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
                        {timelineAchievements.map((item, i) => (
                            <div key={i} className="stat-item space-y-6 group cursor-default">
                                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 w-fit group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500 scale-100 group-hover:scale-110">
                                    {React.cloneElement(item.icon, { size: 32, className: "group-hover:text-white transition-colors" })}
                                </div>
                                <div className="space-y-2">
                                    <div className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                                        {item.year}
                                    </div>
                                    <p className="text-slate-500 font-medium leading-tight max-w-[200px] uppercase tracking-tighter text-sm">
                                        {item.event}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="section-divider mt-32 h-px bg-slate-200 mx-auto w-0" />
                </div>
            </section>

            {/* --- ACCOMPLISHMENTS REVEAL --- */}
            <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">



                {/* Integrating TOICertification Here */}
                <div className="relative z-10">
                    <TOICertification />
                </div>

            </section>
            <div className="flex justify-start items-center pb-24 relative z-10 px-6 md:px-12 lg:px-24">
                <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openAdmissionModal({
                        title: 'TALK TO OUR EXPERTS',
                        subtitle: 'Get professional guidance for your design career.',
                        ctaText: 'Connect Now'
                    })}
                    className="group relative h-12 md:h-14 px-12 md:px-20 bg-slate-900 text-white rounded-full font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl overflow-hidden transition-all duration-500 flex items-center justify-center"
                >
                    <span className="relative z-10 flex items-center gap-4">
                        TALK TO OUR EXPERTS
                    </span>
                    <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </motion.button>
            </div>




            <Footer />
        </div>
    );
};

// Simplified Globe for icon replacement if needed
const Globe = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

export default AwardsRecognition;
