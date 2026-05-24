import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import LegacyTimeline from '../components/LegacyTimeline';
import SEO from '../components/SEO';

const Legacy = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <SEO 
                title="15 Years of Legacy | INSD - International School of Design"
                description="Explore INSD's 15-year journey of nurturing creative talent and shaping design futures. From our foundation in 2011 to becoming India's fastest-growing design institute."
            />
            
            <main className="pt-20">
                {/* 15-Year Jubilee Hero Section */}
                <section className="relative min-h-[80vh] flex flex-col items-center justify-center bg-[#f8f5f0] overflow-hidden px-4 md:px-12">
                    {/* Massive 15 Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none select-none">
                        <span className="text-[40vw] font-black italic font-serif leading-none translate-y-12">15</span>
                    </div>

                    {/* Floating Design Elements (Parallax) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative z-10 text-center max-w-4xl"
                    >
                        <span className="inline-block px-6 py-2 rounded-full border border-primary/20 text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-8 bg-white/50 backdrop-blur-sm">A Decade and a Half of Vision</span>
                        <h1 className="text-[12vw] md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-slate-900 mb-8">
                            Fifteen Years <br />
                            <span className="italic font-serif lowercase tracking-normal text-primary">of</span> Creative <br />
                            Dynasty
                        </h1>
                    </motion.div>



                    {/* Decorative Blurs */}
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full"></div>
                </section>

                {/* The LegacyTimeline component now encompasses the core design from the mockup */}
                <LegacyTimeline />
            </main>

            <Footer />
        </div>
    );
};

export default Legacy;
