import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Heart, TrendingUp, Award, DollarSign, Navigation, ArrowLeft, BarChart3, Users, Globe, Coffee, ShoppingBag, Film, Palette } from 'lucide-react';
import StepLeadForm from './StepLeadForm';

const programs = [
    {
        title: "FASHION DESIGN",
        tag: "FASHION",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder/Copy%20of%20Fd%20.png?updatedAt=1774326592482",
        headline: "Create Trends. Build Your Label.",
        subtitle: "From styling to runway — step into the world of fashion.",
        careerPath: {
            title: "Fashion Design",
            stats: {
                industrySize: "₹45 Lakh Crore Industry",
                demand: "15 Lakh designers till 2030"
            },
            tracks: [],
            salaries: { entry: "Rs. 20,000", mid: "Rs. 75,000", senior: "Rs. 1,50,000" },
            sectors: [
                { label: "Hospitality Industry", icon: Coffee },
                { label: "Retail Industry", icon: ShoppingBag },
                { label: "Media & Entertainment", icon: Film },
                { label: "Design Industry", icon: Palette }
            ]
        }
    },
    {
        title: "INTERIOR DESIGN",
        tag: "INTERIOR",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder/Copy%20of%20ID%20.png?updatedAt=1774326590892",
        headline: "Design Spaces That Inspire.",
        subtitle: "Turn ideas into real-world environments people live in.",
        careerPath: {
            title: "Interior Design",
            stats: {
                industrySize: "₹2.88 Lakh Crore Industry",
                demand: "26 Lakh designers till 2030"
            },
            tracks: [
                { title: "Interior Designer", desc: "Design homes, offices & commercial spaces", img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800" },
                { title: "Space Planner", desc: "Optimize layouts for functionality & aesthetics", img: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800" }
            ],
            salaries: { entry: "Rs. 20,000", mid: "Rs. 50,000", senior: "Rs. 1,00,000+" },
            sectors: [
                { label: "Hospitality Industry", icon: Coffee },
                { label: "Retail Industry", icon: ShoppingBag },
                { label: "Media & Entertainment", icon: Film },
                { label: "Design Industry", icon: Palette }
            ]
        }
    },
    {
        title: "GRAPHIC DESIGN",
        tag: "GRAPHIC",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder/Copy%20of%20GD%20.png?updatedAt=1774326590920",
        headline: "Design Brands That Stand Out.",
        subtitle: "Create visuals, identities & campaigns that people remember.",
        careerPath: {
            title: "Graphic Design",
            stats: {
                industrySize: "₹1.2 Lakh Crore Digital Economy",
                demand: "18 Lakh designers till 2030"
            },
            tracks: [
                { title: "Graphic Designer", desc: "Create logos, branding & marketing creatives", img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800" },
                { title: "Brand Identity Designer", desc: "Shape how brands look, feel & communicate", img: "https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg?auto=compress&cs=tinysrgb&w=800" }
            ],
            salaries: { entry: "Rs. 20,000", mid: "Rs. 60,000", senior: "Rs. 1,20,000+" },
            sectors: [
                { label: "Hospitality Industry", icon: Coffee },
                { label: "Retail Industry", icon: ShoppingBag },
                { label: "Media & Entertainment", icon: Film },
                { label: "Design Industry", icon: Palette }
            ]
        }
    },
    {
        title: "UI/UX DESIGN",
        tag: "UI/UX",
        img: "https://ik.imagekit.io/fmldynl4j4/UIUX%20.png",
        headline: "Design the Digital World.",
        subtitle: "Build apps, websites & experiences used by millions",
        careerPath: {
            title: "UI/UX Design",
            stats: {
                industrySize: "₹3.5 – ₹5 Lakh Crore Digital Economy",
                demand: "20 Lakh designers till 2030"
            },
            tracks: [
                { title: "UI Designer", desc: "Design apps, websites & interfaces", img: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800" },
                { title: "UX Designer", desc: "Improve user experience & product usability", img: "https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg?auto=compress&cs=tinysrgb&w=800" }
            ],
            salaries: { entry: "Rs. 35,000", mid: "Rs. 80,000", senior: "Rs. 2,00,000+" },
            sectors: [
                { label: "Hospitality Industry", icon: Coffee },
                { label: "Retail Industry", icon: ShoppingBag },
                { label: "Media & Entertainment", icon: Film },
                { label: "Design Industry", icon: Palette }
            ]
        }
    },
    {
        title: "ANIMATION & VFX",
        tag: "ANIMATION",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder/Copy%20of%20animation%20.png?updatedAt=1774326593242",
        headline: "Bring Stories to Life.",
        subtitle: "Work in films, gaming & digital entertainment.",
        careerPath: {
            title: "Animation & VFX",
            stats: {
                industrySize: "$2.2 Billion creating 2 Million Jobs",
                demand: "20 Lakh designers till 2030"
            },
            tracks: [
                { title: "Animator", desc: "Work in films, OTT & gaming", img: "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=800" },
                { title: "VFX Artist", desc: "Create visual effects for movies & ads", img: "https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=800" }
            ],
            salaries: { entry: "Rs. 25,000", mid: "Rs. 70,000", senior: "Rs. 1,50,000+" },
            sectors: [
                { label: "Hospitality Industry", icon: Coffee },
                { label: "Retail Industry", icon: ShoppingBag },
                { label: "Media & Entertainment", icon: Film },
                { label: "Design Industry", icon: Palette }
            ]
        }
    },
    {
        title: "PHOTOGRAPHY",
        tag: "PHOTOGRAPHY",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder/Copy%20of%20photography%20.png?updatedAt=1774326593691",
        headline: "Create Content That Connects.",
        subtitle: "From shoots to social media — become a visual storyteller.",
        careerPath: {
            title: "Photography",
            stats: {
                industrySize: "₹679 Billion Industry",
                demand: "8 Lakh photographers till 2030"
            },
            tracks: [
                { title: "Photographer", desc: "Fashion, product, wedding & commercial shoots", img: "https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=800" },
                { title: "Content Creator", desc: "Build your personal brand or work with brands", img: "https://images.pexels.com/photos/3052848/pexels-photo-3052848.jpeg?auto=compress&cs=tinysrgb&w=800" }
            ],
            salaries: { entry: "Rs. 20,000", mid: "Rs. 50,000", senior: "High Potential" },
            sectors: [
                { label: "Hospitality Industry", icon: Coffee },
                { label: "Retail Industry", icon: ShoppingBag },
                { label: "Media & Entertainment", icon: Film },
                { label: "Design Industry", icon: Palette }
            ]
        }
    },
    {
        title: "HAIR, BEAUTY & MAKEUP",
        tag: "BEAUTY",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder/Copy%20of%20hair%20&%20beauty%20.png?updatedAt=1774326593991",
        headline: "Build a Career in Beauty & Glam.",
        subtitle: "Work in fashion, media, salons & personal branding.",
        careerPath: {
            title: "Hair, Beauty & Makeup",
            stats: {
                industrySize: "₹410 Billion Industry (Projected ₹519B by 2031)",
                demand: "11-15 Lakh artists till 2030"
            },
            tracks: [
                { title: "Makeup Artist", desc: "Work in fashion, films & bridal industry", img: "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?auto=compress&cs=tinysrgb&w=800" },
                { title: "Hair Stylist", desc: "Professional styling for salons & shoots", img: "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=800" }
            ],
            salaries: { entry: "Rs. 18,000", mid: "Rs. 45,000", senior: "High Potential" },
            sectors: [
                { label: "Hospitality Industry", icon: Coffee },
                { label: "Retail Industry", icon: ShoppingBag },
                { label: "Media & Entertainment", icon: Film },
                { label: "Design Industry", icon: Palette }
            ]
        }
    },
    {
        title: "TEXTILE DESIGN",
        tag: "TEXTILE",
        img: "https://ik.imagekit.io/fmldynl4j4/ChatGPT%20Image%20Apr%2029,%202026,%2005_39_40%20PM.png",
        headline: "Create Fabrics. Define Trends.",
        subtitle: "Blend creativity with craftsmanship and innovation.",
        careerPath: {
            title: "Textile Design",
            stats: {
                industrySize: "₹12 – ₹15 Lakh Crore Industry",
                demand: "5 Lakh designers till 2030"
            },
            tracks: [
                { title: "Textile Designer", desc: "Create fabrics, patterns & materials for fashion and lifestyle brands", img: "https://images.pexels.com/photos/4622437/pexels-photo-4622437.jpeg?auto=compress&cs=tinysrgb&w=800" },
                { title: "Print & Surface Designer", desc: "Design prints for apparel, home décor, and global collections", img: "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=800" }
            ],
            salaries: { entry: "Rs. 20,000", mid: "Rs. 55,000", senior: "Rs. 1,00,000+" },
            sectors: [
                { label: "Hospitality Industry", icon: Coffee },
                { label: "Retail Industry", icon: ShoppingBag },
                { label: "Media & Entertainment", icon: Film },
                { label: "Design Industry", icon: Palette }
            ]
        }
    },
    {
        title: "JEWELLERY DESIGN",
        tag: "JEWELLERY",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder/Copy%20of%20JD.PNG?updatedAt=1774326594063",
        headline: "Design Precious Legacies.",
        subtitle: "From gemstone styling to luxury manufacturing — become a master crafter.",
        careerPath: {
            title: "Jewellery Design",
            stats: {
                industrySize: "₹9.5 Lakh Crore Market",
                demand: "5 Lakh professionals till 2030"
            },
            tracks: [
                { title: "Jewellery Designer", desc: "Design bespoke pieces, wedding collections & brand labels", img: "https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=800" },
                { title: "Gemologist / Stone Grader", desc: "Expert assessment, grading and sourcing of precious stones", img: "https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&cs=tinysrgb&w=800" }
            ],
            salaries: { entry: "Rs. 25,000", mid: "Rs. 65,000", senior: "Own Brand" },
            sectors: [
                { label: "Hospitality Industry", icon: Coffee },
                { label: "Retail Industry", icon: ShoppingBag },
                { label: "Media & Entertainment", icon: Film },
                { label: "Design Industry", icon: Palette }
            ]
        }
    }
];

const ProgramGrid = () => {
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [showLeadForm, setShowLeadForm] = useState(false);

    const highlightTitle = (text) => {
        if (!text) return text;
        return <span className="text-primary font-serif italic">{text}</span>;
    };

    useEffect(() => {
        if (selectedProgram) {
            document.body.classList.add('hide-navbar');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.classList.remove('hide-navbar');
            document.body.style.overflow = 'unset';
            setShowLeadForm(false);
        }
        return () => {
            document.body.classList.remove('hide-navbar');
            document.body.style.overflow = 'unset';
            setShowLeadForm(false);
        };
    }, [selectedProgram]);

    const ProgramCard = ({ program, index, onClick }) => (
        <motion.div
            onClick={onClick}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.8 }}
            className="group relative aspect-4/5 rounded-4xl overflow-hidden cursor-pointer shadow-xl hover:shadow-primary/20 border border-white/5 hover:border-primary/40 transition-all duration-700"
        >
            <img
                src={program.img}
                alt={program.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
            />
            {/* Multi-layer overlay for maximum readability */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-700 z-0" />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-black/40 opacity-100 z-0" />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-white font-black text-[32px] md:text-[38px] lg:text-[44px] leading-none uppercase tracking-tighter transition-all duration-700 group-hover:scale-110 group-hover:text-primary drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                    {program.title}
                </h3>

                <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-700">
                    {program.headline && (
                        <p className="text-white font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            {program.headline}
                        </p>
                    )}
                </div>

                <div className="absolute bottom-10 left-8 right-8 flex items-center gap-3 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 border-t border-white/10 pt-6">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">View Career Path</span>
                    <ArrowUpRight className="text-primary w-5 h-5 ml-auto group-hover:rotate-45 transition-transform duration-500" />
                </div>
            </div>
        </motion.div>
    );

    return (
        <section id="programs-grid" className="py-20 md:py-24 bg-white overflow-hidden relative">
            <div className="container mx-auto px-6 mb-16 md:mb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <h2 className="text-clamp-4xl font-black uppercase tracking-tighter leading-[0.9] text-slate-950">
                        Turn passion, <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary to-slate-500 italic py-2 inline-block">into profession.</span>
                    </h2>

                    <div className="space-y-4 max-w-2xl mx-auto pt-2">
                        <p className="text-clamp-xl font-bold text-slate-800 tracking-tight leading-relaxed">
                            Pick the creative career that excites you— <span className="text-primary italic whitespace-nowrap">we’ll help you build it.</span>
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-8 h-px bg-slate-100" />
                            <p className="text-[10px] md:text-sm font-black uppercase tracking-[0.25em] text-slate-400">
                                Skill-based programs designed for real careers
                            </p>
                            <div className="w-8 h-px bg-slate-100" />
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
                    {programs.slice(0, 9).map((program, index) => (
                        <ProgramCard
                            key={index}
                            program={program}
                            index={index}
                            onClick={() => setSelectedProgram(program)}
                        />
                    ))}
                </div>
            </div>

            {/* Career Path Modal - Rendered via Portal to escape stacking contexts */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence mode="wait">
                    {selectedProgram && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-6 lg:p-12 pointer-events-auto"
                        >
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedProgram(null)}
                                className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl"
                            />

                            {/* Modal Content */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                                className="relative w-full max-w-5xl h-full max-h-[95vh] md:max-h-[90vh] lg:max-h-[92vh] bg-white rounded-[2rem] md:rounded-[3rem] lg:rounded-[4xl] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col lg:flex-row"
                            >
                                {/* Mobile Close Button - Visible only on mobile, placed outside hidden panels */}
                                <button
                                    onClick={() => setSelectedProgram(null)}
                                    className="lg:hidden absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/60 backdrop-blur-xl text-white border border-white/20 z-[110000] shadow-2xl active:scale-95 transition-all"
                                >
                                    <X size={18} />
                                </button>

                                {/* Left Side: Program Branding */}
                                <div className="hidden lg:flex lg:w-1/3 relative overflow-hidden bg-slate-900 group/modal">
                                    <div className="absolute inset-0 bg-slate-950/60 z-10" />
                                    <img
                                        src={selectedProgram.img}
                                        className="absolute inset-0 w-full h-full object-cover -50 group-hover/modal:-0 group-hover/modal:scale-110 transition-all duration-1000"
                                        alt={selectedProgram.title}
                                    />

                                    <div className="relative z-20 p-10 flex flex-col justify-end h-full">
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <div className="w-12 h-px bg-primary mb-4" />
                                            <h2 className="text-white text-[44px] font-black uppercase tracking-tighter leading-[0.9] mb-4 italic drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                                                {selectedProgram.title}
                                            </h2>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Right Side: Career Data */}
                                <div className="flex-1 lg:w-2/3 flex flex-col bg-white relative">
                                    {/* Desktop Close Button */}
                                    <button
                                        onClick={() => setSelectedProgram(null)}
                                        className="hidden lg:flex absolute top-6 right-6 p-3 rounded-full bg-slate-50 shadow-lg hover:bg-primary hover:text-white transition-all duration-300 border border-slate-100 group z-50"
                                    >
                                        <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                    </button>

                                    <div className="flex-1 overflow-x-hidden overflow-y-auto p-5 md:p-10 md:pt-10 space-y-6 pb-20" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                        <style>{`
                                            div::-webkit-scrollbar { display: none; }
                                        `}</style>
                                        <AnimatePresence mode="wait">
                                            {showLeadForm ? (
                                                <motion.div
                                                    key="lead-form"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className="w-full"
                                                >
                                                    <button
                                                        onClick={() => setShowLeadForm(false)}
                                                        className="mb-6 flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px] touch-target"
                                                    >
                                                        <ArrowLeft size={14} />
                                                        Back to Program Details
                                                    </button>
                                                    <StepLeadForm
                                                        isModal={true}
                                                        showClose={false}
                                                        title={`Apply for ${selectedProgram.title}`}
                                                    />
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="career-data"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    className="space-y-8"
                                                >
                                                    {/* Header Text */}
                                                    <div className="max-w-xl">
                                                        <h3 className="text-clamp-xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tighter italic flex flex-wrap items-center uppercase">
                                                            <span className="text-slate-400 not-italic font-medium opacity-60 mr-3">not just</span>
                                                            {highlightTitle(selectedProgram.careerPath.title)}
                                                            <span className="text-slate-400 not-italic font-medium opacity-60 ml-3">be part of a larger industry</span>
                                                        </h3>

                                                        {selectedProgram.careerPath.salaries && (
                                                            <div className="flex flex-wrap gap-2 mb-6">
                                                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full">
                                                                    <TrendingUp className="w-3 h-3 text-slate-400" />
                                                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">Entry: {selectedProgram.careerPath.salaries.entry}</span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full">
                                                                    <Award className="w-3 h-3 text-slate-400" />
                                                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">Mid: {selectedProgram.careerPath.salaries.mid}</span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary">
                                                                    <DollarSign className="w-3 h-3" />
                                                                    <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap">Senior: {selectedProgram.careerPath.salaries.senior}</span>
                                                                </div>
                                                            </div>
                                                        )}

                                                        <p className="text-slate-500 font-medium text-sm md:text-base border-l-4 border-slate-200 pl-4 mb-6">
                                                            {selectedProgram.subtitle}
                                                        </p>

                                                        {/* Largest Sectors Section */}
                                                        {selectedProgram.careerPath.sectors && (
                                                            <div className="space-y-4">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                                    <h4 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Work in the Largest Sectors</h4>
                                                                </div>
                                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                                    {selectedProgram.careerPath.sectors.map((sector, idx) => (
                                                                        <div key={idx} className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-primary/20 hover:shadow-lg transition-all duration-500 group/sector">
                                                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary mb-2.5 shadow-sm group-hover/sector:scale-110 transition-transform">
                                                                                <sector.icon size={18} />
                                                                            </div>
                                                                            <span className="text-[9px] font-black uppercase tracking-wider text-slate-700 text-center leading-tight">{sector.label}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>



                                                    {/* Professional Outcomes Disclaimer */}
                                                    <div className="pt-6 border-t border-slate-100 italic">
                                                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                                            Program outcomes may vary based on individual portfolio excellence and industry demand.
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
};

export default ProgramGrid;
