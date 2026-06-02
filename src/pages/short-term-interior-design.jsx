import React from 'react';
import { motion } from 'framer-motion';
import { 
    Sparkles, 
    Clock, 
    GraduationCap, 
    BookOpen, 
    MousePointerClick 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

const ShortTermInteriorDesign = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-50 min-h-screen font-sans selection:bg-[#c5a044] selection:text-white text-slate-800">
            <SEO 
                title="Short Term Interior Design Courses in Delhi - INSD"
                description="Fast-track your design career. Choose from intensive 4 to 10-week specialized modules in Residential Styling, CAD drafting, Vastu Shastra, or AI-Driven Spatial Design."
            />

            {/* --- HERO SECTION --- */}
            <section className="relative min-h-[85vh] flex flex-col justify-end pt-32 pb-20 px-6 overflow-hidden bg-white">
                <div className="absolute inset-0 pointer-events-none z-0">
                    {/* Warm ambient blue & red glows (subtle light mode) */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-[#134a84]/5 to-transparent blur-[120px] rounded-full" />
                    <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-b from-[#db3436]/3 to-transparent blur-[100px] rounded-full" />
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                    <div className="absolute inset-0 cyber-grid opacity-[0.03]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-end gap-12">
                    <div className="flex-1">
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 bg-[#db3436]/10 border border-[#db3436]/30 text-[#db3436] px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-xs mb-8"
                        >
                            <Sparkles size={14} /> Intensive Skill Modules
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-7xl lg:text-[7.5rem] font-black uppercase tracking-tighter leading-[0.85] text-slate-900"
                        >
                            Spatial <br/>
                            <span className="bg-gradient-to-r from-[#db3436] to-[#134a84] text-transparent bg-clip-text">Accelerated.</span>
                        </motion.h1>
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-md text-left md:text-right"
                    >
                        <p className="text-slate-600 text-base md:text-lg font-semibold leading-relaxed uppercase tracking-wide">
                            Master industry-specific spatial design modules, professional 3D tools, or sacred space planning. 
                            Zero fluff. Pure portfolio-oriented expertise in 4 to 10 weeks.
                        </p>

                    </motion.div>
                </div>
            </section>

            {/* --- PREMIUM CTA SECTION --- */}
            <section className="bg-gradient-to-br from-[#134a84]/10 via-[#db3436]/2 to-slate-50 text-slate-900 py-32 px-6 border-t border-slate-100 select-none relative overflow-hidden">
                {/* Floating graphic lines */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.01] cyber-grid" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#134a84]/5 blur-[150px] rounded-full" />
                
                <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
                    <MousePointerClick size={48} className="mx-auto text-[#db3436] animate-bounce" />
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-slate-900">
                        Accelerate Your <br /> Spatial Portfolio.
                    </h2>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                        <button 
                            onClick={() => navigate('/')}
                            className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-sm cursor-pointer w-full sm:w-auto"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#db3436] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#db3436]"></span>
                            </span>
                            Coming Soon
                        </button>
                        <button 
                            onClick={() => navigate('/contact-us')}
                            className="border border-slate-200 hover:border-slate-400 text-slate-800 px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all w-full sm:w-auto"
                        >
                            Speak with an Advisor
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ShortTermInteriorDesign;
