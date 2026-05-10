import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    TrendingUp, 
    Target, 
    Award, 
    Globe, 
    Cpu, 
    Layers, 
    ArrowRight,
    Zap,
    Briefcase,
    GraduationCap,
    Lightbulb,
    BarChart3
} from 'lucide-react';
import GrowthChart from '../components/GrowthChart';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import { useAdmissionModal } from '../context/AdmissionModalContext';

const FutureOfDesign = () => {
    const { openAdmissionModal } = useAdmissionModal();

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-primary selection:text-white overflow-hidden">
            <SEO 
                title="Future of Design | Skills are the Future | INSD"
                description="Explore the massive shift in India's creative economy. Discover why design is the new tech and how skill-based education is shaping the 2026 budget and beyond."
            />

            {/* --- HERO SECTION: DESIGN IS EVERYWHERE --- */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
                {/* Subtle Background Elements */}
                <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
                    <motion.div 
                        animate={{ 
                            x: [0, 50, 0],
                            y: [0, -30, 0],
                            rotate: [0, 5, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-10 left-[10%] w-[30%] aspect-video rounded-3xl overflow-hidden border border-slate-200 blur-[1px]"
                    >
                        <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200" alt="Fashion" className="w-full h-full object-cover" />
                    </motion.div>
                    <motion.div 
                        animate={{ 
                            x: [0, -40, 0],
                            y: [0, 40, 0],
                            rotate: [0, -3, 0]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-20 right-[5%] w-[35%] aspect-square rounded-full overflow-hidden border border-slate-200 blur-[2px]"
                    >
                        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" alt="Architecture" className="w-full h-full object-cover" />
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 px-6 text-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-6 md:space-y-10"
                    >
                        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-slate-950 uppercase tracking-tightest leading-[0.85] mb-4 md:mb-8">
                            Design Is <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-slate-400 to-primary italic">Everywhere</span>
                        </h1>
                        <p className="text-slate-400 font-bold text-xs sm:text-sm md:text-xl lg:text-2xl max-w-4xl mx-auto uppercase tracking-normal sm:tracking-tight leading-relaxed sm:leading-loose">
                            From the products you touch to the spaces you inhabit. 
                            <span className="text-slate-950"> Design is no longer a hobby; it is a serious career opportunity.</span>
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- THE SHIFT IN INDIA SECTION (Inspired by Image 1) --- */}
            <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto space-y-12 md:space-y-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
                        <div className="space-y-6 md:space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-primary font-black uppercase text-[10px] md:text-xs tracking-[0.4em]">The Market Shift</h2>
                                <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-950 uppercase tracking-tighter leading-none">
                                    Skills Are <br /> <span className="text-slate-300">The Future</span>
                                </h3>
                            </div>
                            
                            <p className="text-slate-600 text-lg font-bold uppercase tracking-tight leading-relaxed border-l-4 border-primary pl-6">
                                India is moving towards skill-based education. The "Orange Economy" is projected to need 20 lakh professionals by 2033.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { text: "Design is a high-growth career path.", icon: TrendingUp },
                                    { text: "Projected 20 Lakh jobs in Creative Sector by 2033.", icon: Briefcase },
                                    { text: "Global demand for professional Indian Designers.", icon: Globe }
                                ].map((item, idx) => (
                                    <motion.div 
                                        key={idx}
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 group transition-all"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                            <item.icon size={24} />
                                        </div>
                                        <span className="text-slate-900 font-extrabold uppercase text-sm tracking-widest">{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Data Visualization */}
                        <GrowthChart />
                    </div>
                </div>
            </section>

            {/* --- BUDGET 2026 SECTION (Inspired by Image 2) --- */}
            <section className="py-32 px-6 md:px-12 lg:px-24 bg-slate-50 relative border-y border-slate-100">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-8 space-y-12">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest">
                                <Zap size={14} />
                                Budget 2026 Update
                            </div>
                            <h2 className="text-clamp-5xl font-black text-slate-950 uppercase tracking-tighter leading-none">
                                Design Is <br /> <span className="text-primary italic">The New Tech</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-sm">
                                <GraduationCap className="text-primary" size={32} />
                                <h4 className="text-xl font-black uppercase tracking-tighter">15,000 Schools</h4>
                                <p className="text-slate-500 text-sm font-bold uppercase tracking-tight leading-relaxed">
                                    Govt. to introduce AVGC Labs in schools nationwide to boost skill development from the foundation.
                                </p>
                            </div>
                            <div className="p-8 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-sm">
                                <Award className="text-primary" size={32} />
                                <h4 className="text-xl font-black uppercase tracking-tighter">New NID Clusters</h4>
                                <p className="text-slate-500 text-sm font-bold uppercase tracking-tight leading-relaxed">
                                    Strategic expansion of National Institutes of Design to bridge the industry-talent gap.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 relative group">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            className="relative overflow-hidden rounded-[3.5rem] shadow-2xl h-full min-h-[400px]"
                        >
                            <img 
                                src="https://tse2.mm.bing.net/th/id/OIP.KWaUVJW5bvb12bdMy9k7DQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" 
                                alt="Nirmala Sitharaman Budget" 
                                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 brightness-75 group-hover:brightness-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                            
                            <div className="absolute bottom-10 left-10 right-10 space-y-4">
                                <div className="w-12 h-1 bg-primary" />
                                <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">The Budget <br /> Narrative</h3>
                                <p className="text-white/70 font-bold uppercase text-[10px] tracking-widest leading-relaxed">
                                    "Special focus on Skill India and Creative Economy."
                                </p>
                            </div>
                        </motion.div>
                        <div className="absolute -inset-4 border-2 border-primary/10 rounded-[4rem] -z-10 group-hover:border-primary/30 transition-colors duration-500" />
                    </div>
                </div>
            </section>

            {/* --- NATIONAL INFRASTRUCTURE: 75+ CENTERS --- */}
            <section className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-20">
                        <div className="lg:w-1/2 space-y-8 md:space-y-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-px bg-primary"></div>
                                    <span className="text-primary font-black uppercase text-[9px] md:text-[10px] tracking-[0.4em]">National Footprint</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-slate-950 uppercase tracking-tighter leading-[0.85]">
                                    A Network <br /> <span className="text-slate-300">Of Excellence</span>
                                </h2>
                            </div>
                            
                            <p className="text-slate-600 text-sm md:text-lg font-bold uppercase tracking-tight leading-relaxed border-l-4 border-primary pl-6 md:pl-8">
                                With 75+ centers across India, INSD is the engine driving the government's Skill India mission. Our centers bridge the gap between regional talent and global design standards.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-4">
                                <div className="p-6 md:p-8 bg-slate-50 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 group hover:border-primary/30 transition-all">
                                    <Target className="text-primary mb-4 md:mb-6 group-hover:scale-110 transition-transform" size={28} md={32} />
                                    <h4 className="text-lg md:text-xl font-black uppercase tracking-tighter mb-2 md:mb-3">Govt. Partnership</h4>
                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                                        Aligned with NSDC protocols and National Education Policy (NEP) standards.
                                    </p>
                                </div>
                                <div className="p-6 md:p-8 bg-slate-50 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 group hover:border-primary/30 transition-all">
                                    <Globe className="text-primary mb-4 md:mb-6 group-hover:scale-110 transition-transform" size={28} md={32} />
                                    <h4 className="text-lg md:text-xl font-black uppercase tracking-tighter mb-2 md:mb-3">Pan-India Reach</h4>
                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                                        Empowering creative youth from Tier-1 to Tier-3 cities through a unified design ecosystem.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative w-full pt-12 md:pt-0">
                            <div className="aspect-square relative flex items-center justify-center">
                                {/* Abstract Map Visualization */}
                                <div className="absolute inset-0 bg-primary/5 rounded-full blur-[60px] md:blur-[100px] animate-pulse"></div>
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                    className="relative w-full h-full border border-slate-100 rounded-full flex items-center justify-center"
                                >
                                    {[...Array(8)].map((_, i) => (
                                        <div 
                                            key={i}
                                            className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full"
                                            style={{ 
                                                transform: `rotate(${i * 45}deg) translateY(-50%)`,
                                                top: '50%'
                                            }}
                                        />
                                    ))}
                                </motion.div>
                                <div className="absolute inset-8 md:inset-12 border border-slate-100 rounded-full flex items-center justify-center">
                                    <h3 className="text-5xl md:text-8xl font-black text-slate-100 select-none">75+</h3>
                                </div>
                                <div className="absolute z-20 text-center">
                                    <span className="block text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-1 md:mb-2">Flagship Centers</span>
                                    <span className="block text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tighter">Across India</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-24 px-6 bg-slate-50 text-slate-950 overflow-hidden relative border-t border-slate-100">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 lg:gap-32 text-center">
                    {[
                        { label: "Projected Professionals", value: "20 Lakh+", sub: "By 2033" },
                        { label: "Investment Growth", value: "3.5X", sub: "Creative Sector" },
                        { label: "New Tech Focus", value: "AVGC-XR", sub: "Next-Gen Design" }
                    ].map((stat, i) => (
                        <div key={i} className="space-y-2">
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">{stat.label}</p>
                            <h4 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary uppercase tracking-tightest">{stat.value}</h4>
                            <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">{stat.sub}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- CALL TO ACTION: JOIN THE REVOLUTION --- */}
            <section className="py-20 md:py-32 px-6 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative rounded-[2.5rem] md:rounded-[4rem] bg-slate-950 p-8 md:p-24 overflow-hidden group">
                        {/* Animated background accent */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 blur-[80px] md:blur-[120px] -rotate-12 translate-x-1/2 group-hover:bg-primary/30 transition-all duration-700" />
                        
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-16">
                            <div className="space-y-6 md:space-y-8 text-center lg:text-left max-w-2xl">
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tightest leading-none">
                                    Be Part of the <br />
                                    <span className="text-primary italic">Creative Shift.</span>
                                </h2>
                                <p className="text-white/60 font-bold uppercase text-xs md:text-lg tracking-tight leading-relaxed">
                                    The "Orange Economy" is calling. Join INSD to master the skills 
                                    demanded by the 2033 job market and build a high-impact career in design.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-8">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => openAdmissionModal()}
                                    className="w-full sm:w-auto h-16 md:h-20 px-8 md:px-12 bg-primary text-white rounded-full font-black uppercase tracking-[0.2em] text-[10px] md:text-xs shadow-2xl shadow-primary/40 flex items-center justify-center gap-4 hover:bg-white hover:text-slate-950 transition-all duration-500"
                                >
                                    Join the 2026 Batch
                                    <ArrowRight size={18} md={20} />
                                </motion.button>
                                
                                <div className="flex flex-col items-center lg:items-start">
                                    <span className="text-white font-black text-2xl tracking-tighter">100%</span>
                                    <span className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Placement Support</span>
                                </div>
                            </div>
                        </div>

                        {/* Decorative floating icon */}
                        <div className="absolute -bottom-10 -left-10 text-white/5 opacity-10 pointer-events-none hidden md:block">
                            <Lightbulb size={300} strokeWidth={1} />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default FutureOfDesign;
