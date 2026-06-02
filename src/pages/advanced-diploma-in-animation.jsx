import React from 'react';
import { motion } from 'framer-motion';
import {
    Sparkles,
    ArrowRight,
    GraduationCap,
    Clock,
    BookOpen,
    Film,
    Play,
    Zap,
    Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import { useAdmissionModal } from '../context/AdmissionModalContext';

const AdvancedDiplomaInAnimation = () => {
    const navigate = useNavigate();
    const { openAdmissionModal } = useAdmissionModal();

    const toolsData = [
        { 
            name: "Autodesk Maya", 
            desc: "For industry-standard 3D character modeling, rigging, simulation, and complex animation pipelines.", 
            logo: "https://www.vectorlogo.zone/logos/autodesk_maya/autodesk_maya-icon.svg" 
        },
        { 
            name: "Blender 3D", 
            desc: "For versatile polygonal modeling, sculpting, real-time rendering, and indie animation workflows.", 
            logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg" 
        },
        { 
            name: "Adobe After Effects", 
            desc: "For advanced motion graphics, cinematic compositing, dynamic tracking, and post-production VFX.", 
            logo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg" 
        },
        { 
            name: "Cinema 4D", 
            desc: "For premium 3D motion design, procedural modeling, fast rendering, and abstract visual animations.", 
            logo: "https://www.vectorlogo.zone/logos/maxon_cinema_4d/maxon_cinema_4d-icon.svg" 
        }
    ];

    const highlights = [
        {
            title: "Character Design & Artistry",
            desc: "Study advanced anatomical drawing, conceptual design, expressions, and the core 12 principles of animation.",
            icon: Sparkles
        },
        {
            title: "3D Asset & Rigging Pipeline",
            desc: "Build highly optimized character models and complex skeletal structures with advanced controllers.",
            icon: Layers
        },
        {
            title: "Cinematic Lighting & VFX",
            desc: "Master post-production pipeline integration, high-end compositing, keying, and real-time environmental staging.",
            icon: Film
        },
        {
            title: "Industry Showreel Production",
            desc: "Work on studio-grade briefs, production schedules, and complete a professional CGI portfolio film.",
            icon: Zap
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen font-sans selection:bg-primary selection:text-white text-slate-800">
            <SEO
                title="Advanced Diploma in Animation Courses in Delhi - INSD"
                description="Study a professional 1-Year Advanced Diploma in Animation at INSD. Master Maya, Blender, After Effects, character rigging, and VFX."
                keywords="advanced diploma animation, animation diploma Delhi, design school, learn 3D animation, digital animation course"
            />

            {/* --- HERO SECTION --- */}
            <section className="relative min-h-[85vh] flex flex-col justify-end pt-32 pb-20 px-6 overflow-hidden bg-white">
                <div className="absolute inset-0 pointer-events-none z-0">
                    {/* Atmospheric brand glows */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-primary/5 to-transparent blur-[120px] rounded-full" />
                    <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-b from-secondary/5 to-transparent blur-[100px] rounded-full" />
                    {/* Amber/Violet shimmer accent */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/3 via-transparent to-transparent blur-[80px] rounded-full" />
                    <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                    <div className="absolute inset-0 cyber-grid opacity-[0.03]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-end gap-12">
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-xs mb-8 animate-pulse-soft"
                        >
                            <Sparkles size={14} /> Coming Soon
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-7xl lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.85] text-slate-900"
                        >
                            Dynamic Motion <br />
                            <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">Visual Depth.</span>
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-md text-left md:text-right"
                    >
                        <p className="text-slate-600 text-base md:text-lg font-semibold leading-relaxed mb-8 uppercase tracking-wide">
                            Command physical mechanics and cinematic aesthetics. Master character modeling, rigging, simulation, and real-time CGI rendering.
                            Elite, studio-oriented advanced diploma framework.
                        </p>
                        <div className="flex justify-start md:justify-end gap-4">
                            <button
                                onClick={openAdmissionModal}
                                className="px-8 py-4 bg-primary hover:bg-slate-950 text-white rounded-full font-black uppercase text-xs tracking-widest flex items-center gap-2 transition-all shadow-lg hover:shadow-primary/20 scale-100 hover:scale-[1.03] duration-300 cursor-pointer"
                            >
                                Register Interest
                                <ArrowRight size={16} />
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-black uppercase text-xs tracking-widest flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                Coming Soon
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- QUICK STATS STRIP --- */}
            <section className="border-y border-slate-100 bg-white py-8">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { label: "Duration", value: "1 Year Advanced Diploma", icon: Clock },
                        { label: "Eligibility", value: "10+2 / High School Equivalent", icon: GraduationCap },
                        { label: "Credentials Offered", value: "Advanced Diploma in Animation", icon: BookOpen }
                    ].map((fact, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary">
                                <fact.icon size={22} />
                            </div>
                            <div>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-wider">{fact.label}</p>
                                <p className="text-slate-800 text-sm font-black uppercase tracking-tight">{fact.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- DESIGN TOOLS SUITE --- */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">Industry Standard Stack</span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                            Master The Animation Suite
                        </h2>
                        <p className="text-slate-500 font-bold uppercase text-xs tracking-widest leading-relaxed">
                            No shortcuts. We train you directly on the platforms used by top CGI studios and creative agencies worldwide.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {toolsData.map((tool, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col items-center text-center space-y-4"
                            >
                                <div className="w-16 h-16 flex items-center justify-center bg-white rounded-2xl border border-slate-100 shadow-sm p-3 group-hover:scale-110 transition-transform duration-300">
                                    <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain" />
                                </div>
                                <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">{tool.name}</h3>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed uppercase tracking-tight">{tool.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PROGRAM HIGHLIGHTS --- */}
            <section className="py-24 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-secondary">Course Overview</span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                            What You Will Master
                        </h2>
                        <p className="text-slate-500 font-bold uppercase text-xs tracking-widest leading-relaxed">
                            A carefully crafted, fast-track curriculum focused entirely on portfolio outcomes and technical excellence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {highlights.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.15 }}
                                className="group p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 flex flex-col sm:flex-row gap-6 items-start"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    <item.icon size={26} />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-500 text-xs font-semibold leading-relaxed uppercase tracking-tight">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- COMING SOON CTA SECTION --- */}
            <section className="py-28 px-6 bg-white border-t border-slate-100 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
                    <Play size={44} className="mx-auto text-primary animate-bounce fill-primary" />
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-slate-900">
                        Next-Gen Animation <br />
                        <span className="text-slate-400">Launch Approaching.</span>
                    </h2>
                    <p className="text-slate-500 font-bold uppercase text-xs tracking-widest max-w-md mx-auto leading-relaxed">
                        We are tailoring our advanced pipeline, tools integration, and character acting curriculum for the upcoming cohort. Stay updated.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                        <button
                            onClick={() => navigate('/')}
                            className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-sm cursor-pointer w-full sm:w-auto"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Coming Soon
                        </button>
                        <button
                            onClick={openAdmissionModal}
                            className="bg-primary hover:bg-slate-950 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-primary/20 scale-100 hover:scale-[1.03] duration-300 cursor-pointer w-full sm:w-auto"
                        >
                            Register Interest
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AdvancedDiplomaInAnimation;
