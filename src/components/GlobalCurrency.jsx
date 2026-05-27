import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, MapPin, Briefcase } from 'lucide-react';

const cities = [
    { name: "London", top: "28%", left: "47%", delay: 0 },
    { name: "New York", top: "35%", left: "28%", delay: 0.2 },
    { name: "Paris", top: "31%", left: "48%", delay: 0.4 },
    { name: "Milan", top: "33%", left: "49%", delay: 0.6 },
    { name: "Tokyo", top: "38%", left: "85%", delay: 0.8 },
    { name: "Dubai", top: "43%", left: "63%", delay: 1.0 },
    { name: "Mumbai", top: "46%", left: "67%", delay: 0.3 },
    { name: "Delhi", top: "42%", left: "68%", delay: 0.5 },
    { name: "Bangalore", top: "49%", left: "68%", delay: 0.7 },
    { name: "Kolkata", top: "45%", left: "71%", delay: 0.9 },
    { name: "Hyderabad", top: "47%", left: "69%", delay: 0.4 },
    { name: "Pune", top: "47%", left: "67%", delay: 0.6 },
];

const brands = [
    { name: "NIKE", top: "40%", left: "20%", color: "bg-white text-black" },
    { name: "LV", top: "29%", left: "46%", color: "bg-amber-800 text-white" },
    { name: "GOOGLE", top: "45%", left: "18%", color: "bg-blue-600 text-white" },
    { name: "BOLLYWOOD", top: "50%", left: "67%", color: "bg-red-600 text-white" },
];

const GlobalCurrency = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="py-40 bg-slate-950 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 cyber-grid opacity-[0.05]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-32 space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
                    >
                        <Globe size={16} className="text-primary" />
                        <span className="text-white font-bold uppercase tracking-[0.4em] text-[10px]">Borderless Talent</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-clamp-4xl font-black text-white uppercase tracking-tighter leading-[0.9]"
                    >
                        Skills Accepted <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-500 italic">Globally.</span>
                    </motion.h2>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 font-medium text-lg md:text-2xl max-w-2xl mx-auto tracking-tight"
                    >
                        Your talent has no borders and your skills are a global currency in the modern creative economy.
                    </motion.p>
                </div>

                {/* Interactive Map Visual */}
                <div className="relative max-w-6xl mx-auto h-[600px] md:h-[800px] rounded-[3rem] border border-white/10 bg-slate-900/50 backdrop-blur-3xl overflow-hidden flex items-center justify-center">
                    
                    {/* Central Image Layer */}
                    <motion.div style={{ y, opacity }} className="relative w-full h-full p-12 md:p-24">
                        <div className="w-full h-full relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                            <img 
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600" 
                                alt="Global Network Map" 
                                className="w-full h-full object-cover object-center opacity-40"
                            />
                            <div className="absolute inset-0 bg-linear-to-b from-slate-950/50 via-transparent to-slate-950/80" />
                        </div>
                    </motion.div>

                    {/* Orbital Rings */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[400px] h-[400px] border border-white/5 rounded-full absolute animate-spin-slow" />
                        <div className="w-[600px] h-[600px] border border-white/5 rounded-full absolute animate-reverse-spin" />
                        <div className="w-[800px] h-[800px] border border-primary/10 rounded-full absolute animate-spin-slow" style={{ animationDuration: '30s' }} />
                    </div>

                    {/* Floating Cities */}
                    {cities.map((city, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: city.delay, duration: 1, type: "spring" }}
                            className="absolute flex items-center gap-2 group cursor-pointer z-20"
                            style={{ top: city.top, left: city.left }}
                        >
                            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_rgba(255,255,255,0.8)] group-hover:scale-150 transition-transform" />
                            <span className="text-white/80 font-black uppercase text-[10px] tracking-widest group-hover:text-white transition-colors bg-black/50 px-1 rounded-sm backdrop-blur-xs">
                                {city.name}
                            </span>
                        </motion.div>
                    ))}

                    {/* Floating Brand Badges */}
                    {brands.map((brand, idx) => (
                        <motion.div
                            key={`brand-${idx}`}
                            animate={{ 
                                y: [0, -10, 0],
                            }}
                            transition={{ 
                                duration: 4, 
                                repeat: Infinity, 
                                delay: idx * 1.2,
                                ease: "easeInOut"
                            }}
                            className={`absolute px-4 py-2 ${brand.color} rounded-lg shadow-2xl font-black text-[10px] uppercase tracking-widest border border-white/20 z-30 backdrop-blur-md bg-opacity-90`}
                            style={{ top: brand.top, left: brand.left }}
                        >
                            {brand.name}
                        </motion.div>
                    ))}
                    
                    {/* Center Glow Overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)] pointer-events-none" />
                </div>
            </div>
        </section>
    );
};

export default GlobalCurrency;
