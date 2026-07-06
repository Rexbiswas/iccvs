import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CheckCircle2, 
    ChevronDown, 
    ArrowRight, 
    Briefcase, 
    Zap, 
    GraduationCap, 
    BookOpen, 
    Award 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';
import Footer from './Footer';
import { useAdmissionModal } from '../context/AdmissionModalContext';

const CourseTemplate = ({
    title = "",
    subtitle = "",
    description = "",
    image = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
    highlights = [],
    outcomes = [],
    curriculum = {},
    careerPaths = [],
    seoTitle = "",
    seoDesc = ""
}) => {
    const navigate = useNavigate();
    const { openAdmissionModal } = useAdmissionModal();
    const [activeOutline, setActiveOutline] = useState(Object.keys(curriculum)[0] || '');
    const [expandedSem, setExpandedSem] = useState(null);

    // Dynamic Curriculum structure checking
    const currentCurriculum = curriculum[activeOutline] || {};
    const hasSemesters = typeof Object.values(currentCurriculum)[0] === 'object' && !Array.isArray(Object.values(currentCurriculum)[0]);

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-slate-950 selection:text-white">
            <SEO 
                title={seoTitle || `${title} Course | ICCVS Computer Education`}
                description={seoDesc || description}
            />

            {/* --- HERO SECTION --- */}
            <section className="relative h-[60vh] md:h-[75vh] flex items-center justify-center pt-20 md:pt-32 text-center px-6 overflow-hidden bg-slate-950">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={image} 
                        alt={title} 
                        className="w-full h-full object-cover opacity-45 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto space-y-6 pt-12 md:pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <span className="inline-block px-5 py-2 rounded-full border border-white/10 text-white/60 font-black uppercase tracking-[0.3em] text-[9px] bg-white/5 backdrop-blur-md">
                            ICCVS Career Accelerator
                        </span>
                        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                            {title}
                        </h1>
                        <p className="max-w-2xl mx-auto text-white/70 text-sm md:text-lg font-light tracking-tight leading-relaxed">
                            {subtitle || description}
                        </p>
                        
                        <div className="flex items-center gap-3 text-white/40 justify-center pt-8">
                            <span className="text-[10px] font-black uppercase tracking-widest">Scroll to Explore Syllabus</span>
                            <ArrowRight size={14} className="rotate-90 animate-bounce" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- QUICK HIGHLIGHTS --- */}
            <section className="py-10 bg-slate-950 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(highlights.length ? highlights : [
                        { label: "Duration", value: "Industry Aligned", icon: GraduationCap },
                        { label: "Placement", value: "100% Support Assured", icon: Briefcase },
                        { label: "Mode", value: "Practical Training", icon: Award }
                    ]).map((item, idx) => {
                        const Icon = item.icon || Award;
                        return (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 group hover:border-white/30 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-slate-950 transition-all">
                                    <Icon size={22} />
                                </div>
                                <div>
                                    <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.15em] mb-1">{item.label}</p>
                                    <p className="text-white font-black text-base tracking-tight uppercase">{item.value}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* --- LEARNING OUTCOMES --- */}
            {outcomes.length > 0 && (
                <section className="py-24 px-6 md:px-12 bg-white text-slate-900 overflow-hidden relative border-b border-slate-100">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-5 space-y-8">
                            <span className="font-mono text-xs uppercase tracking-[0.3em] text-slate-400 font-bold block">Skills & Methodology</span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none text-slate-900 uppercase">
                                What You <br /> Will <span className="text-slate-400">Master</span>
                            </h2>
                            <p className="text-slate-500 font-light text-base leading-relaxed">
                                Our syllabus is entirely redesigned to match the technical standard of modern corporate roles. We strip away redundant theory and focus strictly on hands-on application.
                            </p>
                        </div>
                        <div className="lg:col-span-7 space-y-6">
                            {outcomes.map((outcome, i) => (
                                <div key={i} className="flex gap-6 group border-b border-slate-100 pb-6 last:border-b-0 last:pb-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                                    <div>
                                        <h4 className="font-black uppercase text-sm tracking-widest text-slate-800 mb-2">{outcome.title}</h4>
                                        <p className="text-slate-500 text-xs font-bold leading-relaxed max-w-xl uppercase tracking-tight">{outcome.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* --- CURRICULUM SECTION --- */}
            {Object.keys(curriculum).length > 0 && (
                <section className="py-24 px-6 md:px-12 bg-slate-50 relative z-10 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                            <span className="font-mono text-xs uppercase tracking-[0.3em] text-slate-400 font-bold block">Course Structure</span>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                                Curriculum <span className="text-slate-400">Overview.</span>
                            </h2>
                        </div>

                        {/* Curriculum Tabs */}
                        {Object.keys(curriculum).length > 1 && (
                            <div className="flex flex-wrap justify-center gap-4 mb-12">
                                {Object.keys(curriculum).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => {
                                            setActiveOutline(tab);
                                            setExpandedSem(null);
                                        }}
                                        className={`px-8 py-3 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest transition-all border ${
                                            activeOutline === tab
                                                ? 'bg-slate-900 border-slate-900 text-white shadow-lg'
                                                : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400'
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] border border-slate-100 p-6 md:p-12 shadow-xl">
                            {hasSemesters ? (
                                <div className="space-y-4">
                                    {Object.entries(currentCurriculum).map(([sem, topics], idx) => {
                                        const isExpanded = expandedSem === idx;
                                        return (
                                            <div 
                                                key={sem} 
                                                className={`border rounded-2xl transition-all ${
                                                    isExpanded ? 'border-slate-900 bg-slate-50/50' : 'border-slate-100 hover:border-slate-300'
                                                }`}
                                            >
                                                <button
                                                    onClick={() => setExpandedSem(isExpanded ? null : idx)}
                                                    className="w-full flex items-center justify-between p-6 text-left"
                                                >
                                                    <span className="font-black text-sm uppercase tracking-wider text-slate-800">{sem}</span>
                                                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-slate-900' : 'text-slate-400'}`} />
                                                </button>

                                                <AnimatePresence>
                                                    {isExpanded && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="px-6 pb-8 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100">
                                                                {Object.entries(topics).map(([moduleTitle, details]) => (
                                                                    <div key={moduleTitle} className="space-y-2">
                                                                        <h5 className="font-black text-xs uppercase text-slate-800 tracking-wider flex items-center gap-2">
                                                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                                                                            {moduleTitle}
                                                                        </h5>
                                                                        <ul className="pl-3.5 space-y-1">
                                                                            {Array.isArray(details) ? (
                                                                                details.map((item, i) => (
                                                                                    <li key={i} className="text-slate-500 text-xs font-bold uppercase tracking-tight list-disc list-inside">{item}</li>
                                                                                ))
                                                                            ) : (
                                                                                <li className="text-slate-500 text-xs font-bold uppercase tracking-tight list-disc list-inside">{details}</li>
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {Object.entries(currentCurriculum).map(([sectionTitle, topics]) => (
                                        <div key={sectionTitle} className="space-y-4">
                                            <h4 className="font-black text-sm uppercase text-slate-900 tracking-wider border-b border-slate-100 pb-2">
                                                {sectionTitle}
                                            </h4>
                                            <ul className="space-y-2">
                                                {Array.isArray(topics) ? (
                                                    topics.map((topic, i) => (
                                                        <li key={i} className="flex items-start gap-2.5">
                                                            <CheckCircle2 size={16} className="text-slate-800 shrink-0 mt-0.5" />
                                                            <span className="text-slate-500 text-xs font-bold uppercase tracking-tight">{topic}</span>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="flex items-start gap-2.5">
                                                        <CheckCircle2 size={16} className="text-slate-800 shrink-0 mt-0.5" />
                                                        <span className="text-slate-500 text-xs font-bold uppercase tracking-tight">{topics}</span>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* --- CAREER PATHS --- */}
            {careerPaths.length > 0 && (
                <section className="py-24 px-6 md:px-12 bg-white overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                            <span className="font-mono text-xs uppercase tracking-[0.3em] text-slate-400 font-bold block">Opportunities</span>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                                Career <span className="text-slate-400">Pathways.</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {careerPaths.map((path, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="p-8 rounded-3xl border border-slate-100 hover:border-slate-900 transition-all flex flex-col justify-between group bg-slate-50/50 hover:bg-white hover:shadow-2xl"
                                >
                                    <div className="space-y-4">
                                        <h4 className="text-lg font-black uppercase text-slate-900 group-hover:text-slate-950 transition-colors tracking-tight">
                                            {path.title}
                                        </h4>
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-tight leading-relaxed">
                                            {path.desc}
                                        </p>
                                    </div>
                                    <div className="pt-8 flex justify-end">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                            <ArrowRight size={18} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* --- ADMISSION CTA --- */}
            <section className="py-24 px-6 md:px-12 bg-slate-950 text-white relative overflow-hidden">
                {/* Subtle Ambient Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                    <span className="font-mono text-xs uppercase tracking-[0.4em] text-white/50 block font-black">Ready to Start?</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tightest leading-tight text-white">
                        Enroll in the {title} Program
                    </h2>
                    <p className="text-white/60 text-sm md:text-lg max-w-xl mx-auto font-light leading-relaxed">
                        Transform your career and gain high-demand technical qualifications from India's leading IT training school.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <button
                            onClick={() => openAdmissionModal({
                                title: `Apply for ${title}`,
                                subtitle: 'Get professional guidance for your career.',
                                ctaText: 'Apply Now'
                            })}
                            className="px-10 py-5 bg-white text-slate-950 rounded-full font-black uppercase text-xs tracking-widest hover:bg-slate-900 hover:text-white transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-2xl"
                        >
                            Apply Now
                            <ArrowRight size={16} />
                        </button>
                        <button
                            onClick={() => navigate('/contact-us')}
                            className="px-10 py-5 border border-white/20 text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-white hover:text-slate-950 transition-all flex items-center justify-center gap-3"
                        >
                            Contact Counselor
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CourseTemplate;
