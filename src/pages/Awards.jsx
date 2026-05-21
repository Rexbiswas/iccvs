import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import TOICertification from '../components/TOICertification';
import { Award } from 'lucide-react';
import SEO from '../components/SEO';

const Awards = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen pt-24 md:pt-32 bg-[#fafafa]">
            <SEO 
                title="Awards and Recognitions | INSD - National Design Excellence"
                description="Explore the awards and industry recognition earned by the International School of Design for excellence in fashion, interior, and graphic design education."
                keywords="design school awards, INSD achievements, national design excellence, best design institute recognition"
                canonical="https://subdomain.insd.edu.in/awards"
            />
            {/* Hero Section */}
            <section className="relative overflow-hidden mb-8 md:mb-12">
                {/* Background Details */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-primary/5 to-transparent blur-3xl opacity-60 mix-blend-multiply" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-linear-to-tr from-slate-200/50 to-transparent blur-2xl opacity-50" />
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl pt-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6 border border-primary/20 shadow-sm">
                            <Award size={16} /> Our Achievements
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black uppercase leading-[0.85] tracking-tighter text-slate-900 mb-6">
                            Awards <span className="font-light block my-2 text-slate-400">&</span> <span className="text-primary inline-block transform hover:scale-105 transition-transform duration-500">Recognition</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
                            Celebrating excellence and innovation in design education. Our accreditations and awards stand as a testament to our commitment to shaping next-generation creators.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* TOI Certification Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <TOICertification />
            </motion.div>
        </main>
    );
};

export default Awards;
