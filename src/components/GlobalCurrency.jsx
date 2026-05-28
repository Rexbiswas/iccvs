import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, MapPin, Briefcase } from 'lucide-react';


const GlobalCurrency = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="py-24 md:py-40 bg-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-slate-50 opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#db3436]/5 blur-[150px] rounded-full pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20 space-y-4">
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight"
                    >
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#db3436] to-[#134a84]">
                            SKILLS ACCEPTED GLOBALLY
                        </span>
                    </motion.h2>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-[#db3436] font-medium text-xl md:text-2xl max-w-4xl mx-auto"
                    >
                        Your talent has no borders & your skills are a global currency.
                    </motion.p>
                </div>

                <div className="relative max-w-5xl mx-auto flex items-center justify-center pt-8">
                    <img 
                        src="https://ik.imagekit.io/fmldynl4j4/drive-download-20260527T033750Z-3-001/Gemini_Generated_Image_cpaoc7cpaoc7cpao.png" 
                        alt="Global Currency Map" 
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default GlobalCurrency;
