import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2,
    ChevronDown,
    Sparkles,
    Palette,
    Wind,
    Scissors,
    ArrowRight,
    Star,
    Globe,
    Award,
    Target,
    Download,
    Clock,
    GraduationCap,
    BookOpen,
    PenTool,
    ShoppingBag,
    Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import { useAdmissionModal } from '../context/AdmissionModalContext';

const BeautyAndMakeup = () => {
    const navigate = useNavigate();
    const { openAdmissionModal } = useAdmissionModal();
    const [activeOutline, setActiveOutline] = useState('Industry Diploma');
    const [expandedSem, setExpandedSem] = useState(1);

    const curriculumData = {
        "Industry Diploma": {
            "Foundation: Aesthetic Art": [
                "Basics of Skin & Hygiene",
                "Color Theory in Artistry",
                "Self-Grooming & Etiquette",
                "Day & Evening Makeup Mastery",
                "Hair Styling Basics"
            ],
            "Industry: Professional Glam": [
                "Bridal Artistry & Tradition",
                "High-Fashion & Editorial Shoots",
                "Special Effects (SFX) Basics",
                "Salon Management & Marketing",
                "Digital Portfolio + Industry Placement"
            ]
        },
        Bachelors: {
            "Year 1": {
                "Semester 1": [
                    "Skin Science & Hygiene Standards",
                    "Color Theory in Artistry",
                    "Day, Evening & Bridal Makeup Basics"
                ],
                "Semester 2": [
                    "Hair Styling & Cutting Foundations",
                    "Dermal Science & Aesthetics Lab",
                    "Self-Grooming & Professional Etiquette",
                    "Salon Management Basics"
                ]
            },
            "Year 2": {
                "Semester 3": [
                    "High-Fashion & Editorial Artistry",
                    "Special effects (SFX) & Prosthetics",
                    "Runway & Stage Character Design"
                ],
                "Semester 4": [
                    "Airbrush Makeup Mastery",
                    "Beauty Brand Marketing & Global Business",
                    "Creative Portfolio & Showreel",
                    "Industrial Internship (OJT)",
                    "Final Graduation Showcase"
                ]
            }
        },
        PG: {
            "Year 1": {
                "Semester 1": [
                    "Advanced Dermal Esthetics",
                    "Film & Cinematic Character Design",
                    "Beauty Business Strategy"
                ],
                "Semester 2": [
                    "Advanced SFX & Prosthetics",
                    "Artistic Direction in Media"
                ]
            },
            "Year 2": {
                "Semester 3": [
                    "Professional Portfolio Lab",
                    "Master Research Thesis"
                ],
                "Semester 4": [
                    "Industry Placement Show",
                    "Final Graduation Gallery"
                ]
            }
        }
    };

    const careerPaths = [
        { title: "Bridal Makeup Artist", desc: "Expertly crafting timeless and radiant looks for high-end weddings and traditional ceremonies.", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800" },
        { title: "Editorial Stylist", desc: "Designing avant-garde and high-fashion looks for global magazine covers and luxury runways.", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800" },
        { title: "SFX Artist (Film)", desc: "Creating hyper-realistic prosthetics and special effects makeup for international cinema.", img: "https://tse2.mm.bing.net/th/id/OIP.ml_u0tWd69H7NWANxCFJ4gHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" },
        { title: "Cosmetic Consultant", desc: "Advising global beauty brands on product development, color theory, and dermal trends.", img: "https://tse2.mm.bing.net/th/id/OIP.g1hPWcDKy992uui0rHKU6wHaEo?pid=ImgDet&w=474&h=296&rs=1&o=7&rm=3" },
        { title: "Salon Manager/Owner", desc: "Overseeing the luxury operations and client experiences of premium international beauty ateliers.", img: "https://courses.farn-ct.ac.uk/banner/6495b0ff68673-UCF-Header-72.jpg" },
        { title: "Beauty Educator", desc: "Shaping the next generation of artists as a professional trainer in elite design schools.", img: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&q=80&w=800" },
    ];

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-primary selection:text-white">
            <SEO
                title="Beauty & Makeup Degree | Cinematic Artistry & Glamour @ INSD"
                description="Master the art of transformation. From cinematic SFX to editorial high-fashion, engineer the next generation of visual beauty standards."
            />

            {/* --- HERO SECTION --- */}
            <section className="relative h-[70vh] md:h-[85vh] flex items-center justify-center pt-20 md:pt-32 text-center px-6 overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://ik.imagekit.io/fmldynl4j4/Untitled%20folder/Copy%20of%20hair%20&%20beauty%20.png"
                        alt="Beauty & Makeup Studio"
                        className="w-full h-full object-cover opacity-60 scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/20 to-black/80" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-6"
                    >
                        <h1 className="text-clamp-5xl font-black text-white uppercase tracking-tighter leading-tight md:leading-[0.85] mb-8">
                            <span className="text-primary">Beauty </span>
                            & Makeup
                        </h1>
                        
                        <div className="flex items-center gap-4 text-white/50 animate-bounce cursor-default justify-center">
                                <span className="text-clamp-sm font-black uppercase tracking-widest">Scroll to Explore</span>
                                <ArrowRight size={16} className="rotate-90" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- COURSE HIGHLIGHTS --- */}
            <section className="py-12 bg-slate-900 overflow-hidden">
                <div className="max-w-7xl mx-auto container-px grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { label: "Sector", value: "Retail Industry", icon: ShoppingBag },
                        { label: "Sector", value: "Hospitality Industry", icon: Briefcase },
                        { label: "Sector", value: "Design Industry", icon: Palette },
                    ].map((item, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 group hover:border-primary/50 transition-colors"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                <item.icon size={28} />
                            </div>
                            <div>
                                <p className="text-white/40 text-clamp-sm font-black uppercase tracking-[0.2em] mb-1">{item.label}</p>
                                <p className="text-white font-black text-clamp-lg tracking-tight uppercase">{item.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Enroll Now Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center mt-12 mb-4"
                >
                    <button
                        onClick={() => navigate('/apply')}
                        className="px-12 py-5 bg-primary text-white rounded-full font-black uppercase text-clamp-sm tracking-widest shadow-2xl hover:bg-white hover:text-slate-900 transition-all transform hover:scale-105 flex items-center gap-3"
                    >
                        Enroll Now
                        <ArrowRight size={18} />
                    </button>
                </motion.div>
            </section>

            {/* --- LEARNING OUTCOMES --- */}
            <section className="section-py container-px bg-black text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-3xl rounded-full" />
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="space-y-8">
                        <h2 className="text-clamp-2xl font-black tracking-tight leading-none mb-2 text-primary uppercase">
                            The Science of <br /> Metamorphosis
                        </h2>
                        <div className="space-y-6">
                            {[
                                { title: "SFX Mastery", desc: "Scientific mastery of prosthetics and cinematic makeup for high-end visual production." },
                                { title: "Dermal Science", desc: "Evaluating dermal health and providing expert medical treatments in high-end medical spas." },
                                { title: "Editoral Glamour", desc: "Designing avant-garde and high-fashion looks for global magazine covers." }
                            ].map((outcome, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="w-px h-16 bg-white/10 group-hover:bg-primary transition-colors" />
                                    <div>
                                        <h4 className="font-black uppercase text-clamp-sm tracking-widest text-primary mb-2">{outcome.title}</h4>
                                        <p className="text-white/50 text-clamp-sm font-bold leading-relaxed max-w-md uppercase tracking-tight">{outcome.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative grid grid-cols-2 lg:grid-cols-2 gap-4 h-auto">
                        <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600" className="rounded-3xl w-full aspect-2/3 object-cover translate-y-4 md:translate-y-8" alt="Makeup Artistry" />
                    </div>
                </div>
            </section>

            {/* --- COURSE OVERVIEW (QUICK FACTS) --- */}
            <section className="py-12 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { label: "Course Length", value: "3 or 4 Years Option", icon: Clock },
                        { label: "Degree", value: "Bachelors accredited by UGC", icon: GraduationCap },
                        { label: "Eligibility", value: "10+2", icon: BookOpen },
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col p-6 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-3 mb-4">
                                <item.icon className="text-primary" size={20} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                            </div>
                            <p className="text-lg font-black text-slate-900 uppercase tracking-tight">{item.value}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- CURRICULUM SECTION --- */}
            <section className="section-py container-px bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="space-y-4">
                            <h2 className="text-clamp-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                                Course <br /> <span className="text-slate-300">Curriculum</span>
                            </h2>
                        </div>
                        
                        <div className="flex bg-white p-2 rounded-full border border-slate-200 shadow-sm overflow-x-auto no-scrollbar">
                            {[
                                { id: 'Industry Diploma', label: 'Industry Diploma', badge: 'Featured' },
                                { id: 'Bachelors', label: 'Undergraduate' },
                                { id: 'PG', label: 'Post Graduate' }
                            ].map((tab) => (
                                <button 
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveOutline(tab.id);
                                        setExpandedSem(1);
                                    }}
                                    className={`px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest transition-all whitespace-nowrap flex flex-col items-center gap-1 ${
                                        activeOutline === tab.id 
                                        ? 'bg-slate-900 text-white shadow-lg' 
                                        : 'text-slate-400 hover:text-slate-900'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span>{tab.label}</span>
                                        {tab.badge && (
                                            <span className="px-1.5 py-0.5 rounded-full bg-primary text-[8px] text-white">
                                                {tab.badge}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {curriculumData[activeOutline] && Object.entries(curriculumData[activeOutline]).map(([semName, items], idx) => {
                            const semNumber = idx + 1;
                            return (
                                <div 
                                    key={semName}
                                    className={`border border-slate-100 rounded-3xl md:rounded-4xl overflow-hidden transition-all duration-500 ${
                                        expandedSem === semNumber 
                                        ? 'bg-white shadow-2xl shadow-slate-200/50 border-primary/20 ring-1 ring-primary/10' 
                                        : 'bg-slate-50 hover:bg-white'
                                    }`}
                                >
                                    <button 
                                        onClick={() => setExpandedSem(expandedSem === semNumber ? 0 : semNumber)}
                                        className="w-full flex items-center justify-between p-8 group"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${
                                                expandedSem === semNumber ? 'bg-primary text-white' : 'bg-white text-slate-400 group-hover:text-primary border border-slate-100'
                                            }`}>
                                                {semNumber}
                                            </div>
                                            <span className="text-clamp-xl font-black text-slate-900 tracking-tight uppercase">{semName}</span>
                                        </div>
                                        <div className={`transition-transform duration-500 ${expandedSem === semNumber ? 'rotate-180 text-primary' : 'text-slate-300'}`}>
                                            <ChevronDown size={24} />
                                        </div>
                                    </button>
                                    
                                    <AnimatePresence initial={false}>
                                        {expandedSem === semNumber && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                                            >
                                                <div className="px-8 pb-10 space-y-4">
                                                    <div className="h-px w-full bg-slate-100 mb-6" />
                                                    {Array.isArray(items) ? (
                                                        items.map((item, i) => (
                                                            <motion.div 
                                                                key={i}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: i * 0.05 }}
                                                                className="flex items-start gap-4 group/item"
                                                            >
                                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/30 group-hover/item:bg-primary group-hover/item:scale-150 transition-all shrink-0" />
                                                                <span className="text-slate-600 font-bold text-clamp-sm uppercase tracking-tight group-hover/item:text-slate-900 transition-colors">
                                                                    {item}
                                                                </span>
                                                            </motion.div>
                                                        ))
                                                    ) : (
                                                        Object.entries(items).map(([subSemName, subItems], subIdx) => (
                                                            <div key={subIdx} className="mb-6 last:mb-0">
                                                                <h4 className="text-primary font-black uppercase text-clamp-sm tracking-widest mb-4">{subSemName}</h4>
                                                                <div className="space-y-3">
                                                                    {subItems.map((item, i) => (
                                                                        <motion.div 
                                                                            key={i}
                                                                            initial={{ opacity: 0, x: -10 }}
                                                                            animate={{ opacity: 1, x: 0 }}
                                                                            transition={{ delay: i * 0.05 }}
                                                                            className="flex items-start gap-4 group/item"
                                                                        >
                                                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/30 group-hover/item:bg-primary group-hover/item:scale-150 transition-all shrink-0" />
                                                                            <span className="text-slate-600 font-bold text-clamp-sm uppercase tracking-tight group-hover/item:text-slate-900 transition-colors">
                                                                                {item}
                                                                            </span>
                                                                        </motion.div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- CAREER PATHS GRID --- */}
            <section className="section-py container-px bg-white relative">
                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="text-center space-y-4">
                        <h2 className="text-clamp-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                            Career <br /> <span className="text-slate-300">Artistry</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                        {careerPaths.map((role, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="relative aspect-square md:aspect-4/3 overflow-hidden group border border-white/10"
                            >
                                <img 
                                    src={role.img} 
                                    alt={role.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-clamp-xl font-black text-white uppercase tracking-tighter leading-none mb-2">
                                        {role.title}
                                    </h3>
                                    <p className="text-white/60 text-clamp-sm font-bold leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 uppercase tracking-tight">
                                        {role.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- WHY CHOOSE SECTION --- */}
            <section className="section-py container-px bg-slate-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                            Why Choose <br /> <span className="text-primary">INSD</span> Beauty & Makeup Courses?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { 
                                title: "100% Placement Support", 
                                desc: "Career focused learning with continuous guidance, ensuring you don’t just learn fashion—you build a real career in it.", 
                                icon: GraduationCap 
                            },
                            { 
                                title: "Industry + AI Integrated Curriculum", 
                                desc: "Learn what the industry actually demands with a curriculum that blends real-world practices and the latest AI-driven tools shaping fashion today.", 
                                icon: Sparkles 
                            },
                            { 
                                title: "Hands-On Training & Portfolio Building", 
                                desc: "From practical projects to creating your own professional portfolio, every step is focused on making you industry-ready.", 
                                icon: PenTool 
                            },
                            { 
                                title: "Expert Mentorship & Global Exposure", 
                                desc: "Learn from experienced faculty, gain global insights, and grow through a fast-paced learning environment designed for future designers.", 
                                icon: Globe 
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50">
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-clamp-2xl font-black text-slate-900 uppercase tracking-tighter mb-4 leading-tight group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 text-clamp-base leading-relaxed font-medium transition-colors">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Final CTA Strip */}
                    <div className="relative p-12 md:p-24 bg-slate-900 rounded-[3.5rem] overflow-hidden group">
                        <div className="absolute inset-0 z-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                            <div className="space-y-4">
                                <h3 className="text-clamp-3xl font-black text-white uppercase tracking-tighter">
                                    Ready to redefine <br /> <span className="text-primary">glamour?</span>
                                </h3>
                                <p className="text-white/50 max-w-sm uppercase text-clamp-sm tracking-widest font-black">Join the 2026 session. Limited seats for high-potential aesthetic visionaries.</p>
                            </div>
                            <button 
                                onClick={() => navigate('/apply')}
                                className="px-16 py-6 bg-white text-slate-900 rounded-full font-black uppercase text-clamp-sm tracking-widest shadow-2xl hover:bg-primary hover:text-white transition-all transform hover:scale-105"
                            >
                                Start Application
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BeautyAndMakeup;
