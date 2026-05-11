import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CheckCircle2, 
    ChevronDown, 
    Sparkles, 
    Palette, 
    Layers, 
    Scissors, 
    ArrowRight,
    GraduationCap,
    Clock,
    BookOpen,
    PenTool,
    Globe,
    ShoppingBag,
    Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

const FashionDesigning = () => {
    const navigate = useNavigate();
    const [activeOutline, setActiveOutline] = useState('Industry Diploma');
    const [expandedSem, setExpandedSem] = useState(1);

    const curriculumData = {
        "Industry Diploma": {
            "Part 1: Creative Foundation": [
                "Foundation with AI",
                "Elements of Design with AI",
                "Basic Design Idea / Fashion Language",
                "Fashion Illustration Mastery",
                "Computer Aided Design (CAD) + AI Platforms",
                "Fashion Forecasting with AI"
            ],
            "Part 2: Professional Mastery": [
                "Strategic Brand Projects",
                "Advanced Market Trends with AI",
                "Garment Construction & Tailoring",
                "Pattern Engineering (PMT)",
                "Digital Texture & Fabric Concept",
                "Personality Development & Grooming"
            ]
        },
        Bachelors: {
            "Year 1": {
                "Semester 1": [
                    "Foundation Art",
                    "Introduction of Pattern making",
                    "Fashion Illustration",
                    "History of costumes",
                    "Practical - 1 Sewing Technology",
                    "Practical - 2 Fashion Project"
                ],
                "Semester 2": [
                    "Design foundation",
                    "Introduction of Textile",
                    "Introduction to PMT Part 2",
                    "Basic embroidery",
                    "Practical - 1 CAD",
                    "Practical - 2 GMT"
                ]
            },
            "Year 2": {
                "Semester 3": [
                    "Adv. fashion illustration",
                    "Introduction to draping",
                    "Pattern making techniques part 1",
                    "History of indian costumes",
                    "Practical - 1 inspiration on project",
                    "Practical - 2- Garment Project"
                ],
                "Semester 4": [
                    "Apparel design",
                    "Theory of dyeing",
                    "PMT AND GMT",
                    "Traditional Embroidery",
                    "Practical - 1 CAD",
                    "Practical - 2 Dyeing Project"
                ]
            },
            "Year 3": {
                "Semester 5": [
                    "Fashion Analysis",
                    "Quality Control",
                    "Intro to Painting techniques",
                    "History of Western world fashion",
                    "Practical -1 Fashion Forecasting",
                    "Practical - 2 Men’s Wear Project"
                ],
                "Semester 6": [
                    "Advanced - fashion illustration - II",
                    "Surface ornamentation",
                    "Fashion Merchandising",
                    "Industry Project & viva",
                    "Fashion presentation",
                    "Portfolio development"
                ]
            },
            "Year 4": {
                "Semester 7": [
                    "Advanced illustration",
                    "Commercial pattern Making Apparel",
                    "Apparel design",
                    "Art Appreciation",
                    "Practical 1 - garment Construction",
                    "Practical 2 - design folio"
                ],
                "Semester 8": [
                    "Design development",
                    "Commercial Pattern making - II",
                    "Entrepreneurship development",
                    "Apparel design - II",
                    "Advanced Draping",
                    "Industry Internship"
                ]
            }
        },
        PG: {
            "Year 1": [
                "Advanced Fashion Theory",
                "Luxury Brand Perception",
                "Apparel Manufacturing Technology",
                "Global Marketing & Sourcing",
                "Advanced Draping & Construction",
                "Digital Illustration Mastery"
            ],
            "Year 2": [
                "Strategic Fashion Management",
                "E-Commerce & Digital Retail",
                "Sustainable Fashion Practices",
                "Major Research Project",
                "Final Collection & Exhibition"
            ]
        }
    };

    const careerPaths = [
        { title: "Couture Designer", desc: "Crafting exclusive, high-end bespoke garments for international luxury labels.", img: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=800" },
        { title: "Fashion Illustrator", desc: "Translating concepts into high-impact visual narratives for global publications.", img: "https://tse3.mm.bing.net/th/id/OIP.mwqmmBNn_aPTNK9R3TMH0QHaJY?rs=1&pid=ImgDetMain&o=7&rm=3" },
        { title: "Personal Stylist", desc: "Setting the visual identity for celebrities, influencers, and luxury brand ambassadors.", img: "https://tse4.mm.bing.net/th/id/OIP.pUiakNrbcElp0LrKhdHz_wHaNK?pid=ImgDet&w=188&h=333&c=7&o=7&rm=3" },
        { title: "Fashion Entrepreneur", desc: "Launching and managing independent fashion labels and high-end boutiques.", img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800" },
        { title: "Costume Designer", desc: "Designing evocative wardrobes for high-production theatre, film, and media.", img: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&q=80&w=800" },
        { title: "Fashion Consultant", desc: "Strategic advising for heritage brands on trend forecasting and market positioning.", img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800" },
        { title: "Technical Designer", desc: "Mastering the blueprint of garments and ensuring engineering precision in apparel.", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" },
        { title: "Brand Merchant", desc: "Managing inventory and sales strategies for global luxury fashion houses.", img: "https://media.istockphoto.com/id/1783667046/photo/female-customer-making-a-mobile-payment-at-local-flower-shop.jpg?s=612x612&w=0&k=20&c=0U_nu0zNASVM6oXqr8KsE8o1V6hDNbkSwpsbOvnxQWs=" },
        { title: "Pattern Scientist", desc: "Precision engineering of complex silhouettes and fit dynamics for manufacturing.", img: "https://tse1.mm.bing.net/th/id/OIP.-p2UXkdKTArGlfFllhJMowHaDH?rs=1&pid=ImgDetMain&o=7&rm=3" }
    ];

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-primary selection:text-white">
            <SEO 
                title="The Art of Couture Engineering | Premiere Fashion Designing Degree @ INSD"
                description="Master the intersection of creative vision and technical precision. Our 'Art of Couture Engineering' program equips you with global techniques in draping, pattern science, and luxury couture strategy."
            />

            {/* --- HERO SECTION --- */}
            <section className="relative h-[70vh] md:h-[85vh] flex items-center justify-center pt-20 md:pt-32 text-center px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        alt="Fashion Design Studio" 
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto space-y-8 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-center"
                    >
                        <h1 className="text-clamp-5xl font-black text-white uppercase tracking-tighter leading-tight md:leading-none mb-6">
                            <span className="text-primary">Fashion</span> Designing
                        </h1>
                        
                        <div className="flex items-center justify-center gap-4 text-white/50 animate-bounce cursor-default mt-8">
                            <span className="text-[10px] font-black uppercase tracking-widest">Scroll to Explore</span>
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
                        className="px-12 py-5 bg-primary text-white rounded-full font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-white hover:text-slate-900 transition-all transform hover:scale-105 flex items-center gap-3"
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
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-none mb-2">
                            Learning outcomes
                        </h2>
                        <p className="text-clamp-lg text-white/70 leading-relaxed font-bold tracking-tight">
                            INSD's Fashion Design program equips students with cutting-edge design techniques and fosters innovation and creativity. Through hands-on training, students master trend analysis, develop professional portfolios, and gain critical business acumen. With a strong emphasis on sustainability and ethics, our program prepares students for success in the dynamic fashion world. Internships and global perspectives further enhance their readiness to thrive in diverse fashion environments.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[600px]">
                        <div className="col-span-1 md:col-span-7 h-[300px] md:h-full rounded-2xl overflow-hidden shadow-2xl">
                            <img 
                                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800" 
                                alt="Fashion Design Student Work" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-4 h-[200px] md:h-full">
                            <div className="rounded-2xl overflow-hidden shadow-2xl">
                                <img 
                                    src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&q=80&w=800" 
                                    alt="Sketching Sessions" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="rounded-2xl overflow-hidden shadow-2xl">
                                <img 
                                    src="https://b.she-buy.com/wp-content/uploads/Quality-Control-in-Garment-Construction-.webp" 
                                    alt="Final Garment Construction" 
                                    className="w-full h-full object-cover"
                                />
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
                                { id: 'Industry Diploma', label: '(AIIFD)', badge: 'Featured' },
                                { id: 'Bachelors', label: 'Undergraduate' },
                                { id: 'PG', label: 'Post Graduate' }
                            ].map((tab) => (
                                <button 
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveOutline(tab.id);
                                        setExpandedSem(1);
                                    }}
                                    className={`px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest transition-all whitespace-nowrap flex flex-col items-center gap-1 relative overflow-visible ${
                                        activeOutline === tab.id 
                                        ? 'bg-slate-900 text-white shadow-lg' 
                                        : 'text-slate-400 hover:text-slate-900'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span>{tab.label}</span>
                                        {tab.badge && (
                                            <span className="px-1.5 py-0.5 text-[8px] font-black uppercase tracking-tighter bg-primary text-white rounded-xs animate-pulse">
                                                {tab.badge}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {activeOutline === 'Industry Diploma' && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-12 p-8 rounded-[2.5rem] bg-slate-900 text-white border border-primary/20 shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="space-y-2 text-center md:text-left">
                                    <p className="text-primary font-black uppercase text-[10px] tracking-[0.4em]">Program Name</p>
                                    <h3 className="text-clamp-2xl font-black uppercase tracking-tighter leading-none">
                                        Advanced Industry-Integrated Fashion Diploma (AIIFD)
                                    </h3>
                                </div>
                                <div className="flex items-center gap-6 px-8 py-4 bg-white/5 rounded-2xl border border-white/10">
                                    <div className="text-center md:text-right">
                                        <p className="text-white/40 font-black uppercase text-[8px] tracking-widest mb-1">Duration</p>
                                        <p className="text-clamp-xl font-black text-primary leading-none uppercase tracking-tight">1 Year</p>
                                    </div>
                                    <div className="w-px h-10 bg-white/10" />
                                    <div className="text-center md:text-left">
                                        <p className="text-white/40 font-black uppercase text-[8px] tracking-widest mb-1">Learning Hours</p>
                                        <p className="text-clamp-xl font-black text-white leading-none uppercase tracking-tight">420 Hours</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {curriculumData[activeOutline] && Object.entries(curriculumData[activeOutline]).map(([semName, items], idx) => {
                            const semNumber = idx + 1;
                            return (
                                <div 
                                    key={semName}
                                    className={`border border-slate-100 rounded-[2.5rem] overflow-hidden transition-all duration-500 ${
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
            <section className="section-py container-px bg-white">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-clamp-4xl font-black text-slate-900 tracking-tighter uppercase">
                            Career Paths
                        </h2>
                        <p className="text-slate-500 font-bold max-w-2xl">
                            Unlock your potential and pursue diverse career opportunities in Fashion Design with INSD Global.
                        </p>
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
                                        {role.title.split(' ').map((word, i) => (
                                            <span key={i} className="block">{word}</span>
                                        ))}
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
                        <span className="text-primary font-black uppercase text-[10px] tracking-[0.4em]">Academic Excellence</span>
                        <h2 className="text-clamp-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                            Why Choose <br /> <span className="text-primary">INSD</span> Fashion Design Courses?
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
                                <h3 className="text-clamp-3xl font-black text-white uppercase tracking-tighter">
                                    Ready to set the <br /> <span className="text-primary">next trend?</span>
                                </h3>
                                <p className="text-white/50 font-medium max-w-sm">Join the 2026 session. Limited seats for high-potential creative visionaries.</p>
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

export default FashionDesigning;
