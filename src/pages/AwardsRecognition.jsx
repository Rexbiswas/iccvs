import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useAdmissionModal } from '../context/AdmissionModalContext';

const AwardsRecognition = () => {
    const { openAdmissionModal } = useAdmissionModal();
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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

            <Footer />
        </div>
    );
};



export default AwardsRecognition;
