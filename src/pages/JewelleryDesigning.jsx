import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CheckCircle2, 
    ChevronDown, 
    Gem, 
    Sparkles, 
    Scissors, 
    Layers, 
    ArrowRight,
    Palette,
    Globe,
    Award,
    Target,
    Download,
    BookOpen,
    Clock,
    GraduationCap,
    PenTool,
    ShoppingBag,
    Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import { useAdmissionModal } from '../context/AdmissionModalContext';

const JewelleryDesigning = () => {
    const navigate = useNavigate();
    const { openAdmissionModal } = useAdmissionModal();
    const [activeOutline, setActiveOutline] = useState('Industry Diploma');
    const [expandedSem, setExpandedSem] = useState(1);

    const curriculumData = {
        "Industry Diploma": {
            "Foundation: Tech & Gems": [
                "Foundation with AI",
                "Elements of Design with AI",
                "Gemology",
                "Diamond Grading",
                "Design Project 1 with AI",
                "Design Project 2 inspiration"
            ],
            "Industry: CAD & Market": [
                "Concept Design with AI",
                "Costume Jewellery",
                "Coral draw CAD 2 D software with AI",
                "CAD Matrix 3D software with AI",
                "Industry Visit",
                "Market Survey"
            ]
        },
        PG: {
            "Year 1": {
                "Semester 1": [
                    "Gemology: Identification & Grading",
                    "Advanced Accessory Design",
                    "Jewelry Illustration & Rendering",
                    "Traditional Metal-smithing"
                ],
                "Semester 2": [
                    "History of Global Jewelry",
                    "Material Science: Precious Metals",
                    "Jewelry Casting Techniques",
                    "Design Ideation & Sketching"
                ]
            },
            "Year 2": {
                "Semester 3": [
                    "CAD for Jewelry (Rhino/Matrix)",
                    "Luxury Brand Management",
                    "Diamond Grading & Valuation"
                ],
                "Semester 4": [
                    "Sustainable Jewelry Practices",
                    "Appraisal & Quality Control",
                    "Professional Portfolio & Exhibition"
                ]
            }
        },
        Bachelors: {
            "Year 1": {
                "Semester 1": [
                    "Manual Design: Design with different motives and knowledge of jewellery.",
                    "shading, rendering of white gold, yellow gold, gemstones etc.",
                    "costume jewellery: making all jewellery by different types of beads, stones.",
                    "metallurgy- basic knowledge and theory of all terms used in jewellery."
                ],
                "Semester 2": [
                    "Manual design gemology: basic study of gemstones, shapes; origin, occurence etc.",
                    "diamond grading: basic knowledge of diamond . there 4cs of grading."
                ]
            },
            "Year 2": {
                "Semester 3": [
                    "Production management design projects.like state project, country project, detachable project, temple jewellery.",
                    "gemology- advanced study.",
                    "diamond grading -advanced study of diamonds."
                ],
                "Semester 4": [
                    "Market surveys.CAD Design – Rhino n Matrix.",
                    "Fashion Accessory Design",
                    "Hallmarking System of Jewellery",
                    "History of Eras",
                    "Eras Design Prac. 1",
                    "Accessory Design Prac 2"
                ]
            },
            "Year 3": {
                "Semester 5": [
                    "Human Resource Management",
                    "Custome Made Jewellery",
                    "Entrepreneurship Development",
                    "Study of Pearl",
                    "Inspirational Design (Prac. 1)",
                    "State Design (Prac 2)"
                ],
                "Semester 6": [
                    "Marketing"
                ]
            },
            "Year 4": {
                "Semester 7": [
                    "Industry Projects",
                    "Enterprenuership"
                ],
                "Semester 8": [
                    "Internship & On the Job Training",
                    "Market Dynamics"
                ]
            }
        },
    };

    const careerPaths = [
        { title: "High-Jewellery Designer", desc: "Designing exclusive, one-of-a-kind masterpieces for luxury international heritage brands.", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800" },
        { title: "Gemologist", desc: "Expertly identifying and grading diamonds and precious gemstones based on the 4Cs.", img: "https://th.bing.net/th/id/R.72769c74fbeea9c53315c4f78ab9bcc6?rik=UfIeA2QGlaizww&riu=http%3a%2f%2fwww.ismat.in%2fwp-content%2fuploads%2f2023%2f09%2frd.jpg&ehk=957qTJ6Yai4buMd3NfPD6Qg8ycCPyIDJjSlvByJ9Vtc%3d&risl=&pid=ImgRaw&r=0" },
        { title: "CAD Jewellery Designer", desc: "Using advanced 3D software to create high-precision digital models for production.", img: "https://tse4.mm.bing.net/th/id/OIP.jfpYhgPsDhDCMQ6UFj03CwHaFj?rs=1&pid=ImgDetMain&o=7&rm=3" },
        { title: "Product Head", desc: "Managing the end-to-end design and manufacturing lifecycle of jewellery collections.", img: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800" },
        { title: "Visual Merchandiser", desc: "Designing high-impact storefronts and displays for luxury jewellery boutiques.", img: "https://www.jewelrypackagingmall.com/cdn/shop/articles/article_797188_1776269411_1344x768_crop_center.jpg?v=1776269461" },
        { title: "Brand Consultant", desc: "Setting the strategic identity and market positioning for global gem houses.", img: "https://th.bing.net/th/id/OIP.vlGYh7JEMbqHEHuhowUDDAHaEO?w=314&h=180&c=7&r=0&o=7&pid=1.7&rm=3" },
    ];

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-primary selection:text-white">
            <SEO 
                title="Jewellery Designing Degree | Gemology & 3D CAD Engineering @ INSD"
                description="Master the art of luxury jewellery design. Our program balances traditional manual craftsmanship with high-end 3D CAD engineering."
            />

            {/* --- HERO SECTION --- */}
            <section className="relative h-[70vh] md:h-[85vh] flex items-center justify-center pt-20 md:pt-32 text-center px-6 overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://ik.imagekit.io/fmldynl4j4/Untitled%20folder/Copy%20of%20JD.PNG" 
                        alt="Jewellery Design Studio" 
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
                            <span className="text-primary">Jewellery</span> <br className="hidden md:block" /> 
                            Designing
                        </h1>
                       
                        <div className="flex items-center gap-4 text-white/50 animate-bounce cursor-default justify-center">
                                <span className="text-[10px] font-black uppercase tracking-widest">Scroll to Explore</span>
                                <ArrowRight size={16} className="rotate-90" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- COURSE HIGHLIGHTS --- */}
            <section className="py-12 bg-slate-900 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
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
                                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{item.label}</p>
                                <p className="text-white font-black text-lg tracking-tight uppercase">{item.value}</p>
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
                        className="px-12 py-5 bg-primary text-white rounded-full font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-white hover:text-slate-900 transition-all transform hover:scale-105 flex items-center gap-3"
                    >
                        Enroll Now
                        <ArrowRight size={18} />
                    </button>
                </motion.div>
            </section>

            {/* --- LEARNING OUTCOMES --- */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-black text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-3xl rounded-full" />
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-none mb-2 text-primary uppercase">
                            Jewellery <br /> Mastery
                        </h2>
                        <div className="space-y-6">
                            {[
                                { title: "Gem Grading", desc: "Scientific identification and grading of precious stones using industry-caliber equipment." },
                                { title: "Matrix CAD", desc: "Mastering the gold standard of 3D jewelry design for photorealistic prototyping." },
                                { title: "Bench Mastery", desc: "Traditional metalsmithing skills including soldering, setting, and archival craftsmanship." }
                            ].map((outcome, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="w-px h-16 bg-white/10 group-hover:bg-primary transition-colors" />
                                    <div>
                                        <h4 className="font-black uppercase text-sm tracking-widest text-primary mb-2">{outcome.title}</h4>
                                        <p className="text-white/50 text-xs font-bold leading-relaxed max-w-md uppercase tracking-tight">{outcome.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[600px]">
                        <div className="col-span-1 md:col-span-7 h-[300px] md:h-full rounded-2xl overflow-hidden shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="High Jewellery" />
                        </div>
                        <div className="col-span-1 md:col-span-12 lg:col-span-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-4 h-auto md:h-full">
                            <div className="rounded-2xl overflow-hidden shadow-2xl h-[200px] md:h-auto">
                                <img src="https://tse4.mm.bing.net/th/id/OIP.niArWJIrqnXGL60Pi_hspQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" className="w-full h-full object-cover" alt="Gemology" />
                            </div>
                            <div className="rounded-2xl overflow-hidden shadow-2xl h-[200px] md:h-auto">
                                <img src="https://tse4.mm.bing.net/th/id/OIP.jfpYhgPsDhDCMQ6UFj03CwHaFj?rs=1&pid=ImgDetMain&o=7&rm=3" className="w-full h-full object-cover" alt="Jewellery CAD" />
                            </div>
                        </div>
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
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-slate-50">
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
                                            <span className="px-1.5 py-0.5 rounded-full bg-primary text-[6px] text-white">
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
                                            <span className="text-xl font-black text-slate-900 tracking-tight uppercase">{semName}</span>
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
                                                                <span className="text-slate-600 font-black text-xs uppercase tracking-tight group-hover/item:text-slate-900 transition-colors">
                                                                    {item}
                                                                </span>
                                                            </motion.div>
                                                        ))
                                                    ) : (
                                                        Object.entries(items).map(([subSemName, subItems], subIdx) => (
                                                            <div key={subIdx} className="mb-6 last:mb-0">
                                                                <h4 className="text-primary font-black uppercase text-sm tracking-widest mb-4">{subSemName}</h4>
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
                                                                            <span className="text-slate-600 font-black text-xs uppercase tracking-tight group-hover/item:text-slate-900 transition-colors">
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

            {/* --- CAREER ARCHETYPES --- */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-white relative">
                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                            Career <br /> <span className="text-slate-300">Archetypes</span>
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
                                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter leading-none mb-2">
                                        {role.title}
                                    </h3>
                                    <p className="text-white/60 text-[10px] md:text-xs font-bold leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 uppercase tracking-tight">
                                        {role.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- WHY CHOOSE SECTION --- */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-slate-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                            Why Choose <br /> <span className="text-primary">INSD</span> Jewellery Design?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { 
                                title: "100% Placement Support", 
                                desc: "Career focused learning with continuous guidance, ensuring you build a real career in the luxury sector.", 
                                icon: GraduationCap 
                            },
                            { 
                                title: "Industry + AI Integrated Curriculum", 
                                desc: "Learn what the industry actually demands with a curriculum that blends real-world practices and the latest AI-driven tools.", 
                                icon: Sparkles 
                            },
                            { 
                                title: "Hands-On Training & Portfolio Building", 
                                desc: "From practical projects to creating your own professional portfolio, every step is focused on making you industry-ready.", 
                                icon: PenTool 
                            },
                            { 
                                title: "Expert Mentorship & Global Exposure", 
                                desc: "Learn from experienced faculty, gain global insights, and grow through a fast-paced learning environment.", 
                                icon: Globe 
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50">
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4 leading-tight group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium transition-colors">
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
                                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                                    Ready to craft your <br /> <span className="text-primary">vision?</span>
                                </h3>
                                <p className="text-white/50 max-w-sm uppercase text-xs tracking-widest font-black">Join the 2026 session. Limited seats for high-potential creative visionaries.</p>
                            </div>
                            <button 
                                onClick={() => navigate('/apply')}
                                className="px-16 py-6 bg-white text-slate-900 rounded-full font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-primary hover:text-white transition-all transform hover:scale-105"
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

export default JewelleryDesigning;
