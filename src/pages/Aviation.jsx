import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plane,
    Sparkles,
    Globe,
    Award,
    Clock,
    GraduationCap,
    BookOpen,
    ArrowRight,
    User,
    Mail,
    Phone,
    MapPin,
    AlertCircle,
    Send,
    ChevronDown,
    TrendingUp,
    Briefcase,
    CheckCircle2,
    Users,
    Building2,
    Hotel,
    Heart,
    ShieldCheck,
    X,
    Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import { useAdmissionModal } from '../context/AdmissionModalContext';
const Aviation = () => {
    const navigate = useNavigate();
    const { openAdmissionModal } = useAdmissionModal();
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('hide-navbar');
        } else {
            document.body.classList.remove('hide-navbar');
        }
        return () => {
            document.body.classList.remove('hide-navbar');
        };
    }, [isModalOpen]);


    const growthFacts = [
        { count: "157+ Airports", text: "Active airports operating across India with massive passenger traffic.", icon: Plane, label: "Expanding Reach", color: "text-[#db3436] bg-red-50" },
        { count: "UDAN Scheme", text: "Government policy driving regional connectivity & affordable flying.", icon: Globe, label: "Connectivity Boost", color: "text-blue-600 bg-blue-50" },
        { count: "400+ Projects", text: "Ongoing airport development, expansion, and modernization plans.", icon: TrendingUp, label: "Infrastructure Growth", color: "text-emerald-600 bg-emerald-50" },
        { count: "Booming Tourism", text: "Hospitality & travel industry driving double-digit employment growth.", icon: Sparkles, label: "Market Demand", color: "text-amber-600 bg-amber-50" },
        { count: "Careers Demand", text: "Surging requirements for certified service and cabin crew staff.", icon: GraduationCap, label: "Career Security", color: "text-purple-600 bg-purple-50" }
    ];

    const lifestyleBullets = [
        { label: "₹35,000+ Starting Packages", desc: "Highly competitive starting packages for entry roles." },
        { label: "₹1,50,000+ Career Growth Potential", desc: "Tremendous career scale potential for experienced crew." },
        { label: "Travel Opportunities", desc: "Layovers and destination travels worldwide." },
        { label: "Luxury Work Environments", desc: "State-of-the-art flights and VVIP lounges." },
        { label: "International Exposure", desc: "Gain massive cross-cultural communications experiences." },
        { label: "Career Advancement", desc: "Fast-track roles in aviation leadership." },
        { label: "Premium Lifestyle", desc: "Acquire prestige and elite standard perks." }
    ];

    const brandLogos = [
        { name: "Radisson", desc: "Luxury Hotels", logo: "https://i.pinimg.com/564x/fc/79/68/fc79683d38ba80c0153351b37892332f.jpg" },
        { name: "Oberoi Maidens", desc: "Heritage Hospitality", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b2/The_Oberoi_Group_-_Logo.png" },
        { name: "Marriott Bonvoy", desc: "Premium Hotels", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKsLVNPBg3THZW0vi99gvNt2UvSKdCBZKJA&s" },
        { name: "Tommy Hilfiger", desc: "Premium Apparel", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk_d_m-BBWIiihl4Wep305BP0VwG4JSkjx9w&s" },
        { name: "Pantaloons", desc: "Retail Fashion", logo: "https://m.media-amazon.com/images/I/21sBau88cJL.jpg" },
        { name: "H&M", desc: "Global Retail", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg" },
        { name: "Nike", desc: "Sportswear Retail", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
        { name: "Jigar Mali", desc: "Luxury Couture", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKrUgdAxbX3Z6O8SCTpbu4hWyHNn2ZsnU60g&s" },
        { name: "Westside", desc: "Retail Group", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA_8D4VwMpxJH0jF3TTPczyrfOlILWXKwitQ&s" },
        { name: "Levi's", desc: "Premium Denim", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwvb2v2L5X52bVkw7m7J8jV8imi4KRAsIZZQ&s" }
    ];

    const coursesData = [
        {
            title: "Certificate Course in Aviation, Hospitality and Travel Management",
            type: "Certificate",
            duration: "6 Months",
            desc: "Develop key skills in cabin services, airline codes, check-in software, and travel routing layouts.",
            badge: "Popular",
            modalTitle: "Aviation & Hospitality",
            modalQuote: "From in-flight cabin services to airport check-in desks — step into global aviation.",
            image: "https://ik.imagekit.io/fmldynl4j4/New%20folder/832d6436-39c4-4e81-a25a-34f17dbd5064_1.jfif",
            sectors: [
                { name: "Airlines Operations", icon: Plane },
                { name: "Cabin Services", icon: Users },
                { name: "Travel Management", icon: Globe },
                { name: "Airport Ground Staff", icon: Building2 }
            ]
        },
        {
            title: "Certificate Course in Hospitality, Travel and Customer Service",
            type: "Certificate",
            duration: "6 Months",
            desc: "Master front-desk administration, client management, luxury hospitality standards, and retail relations.",
            badge: "Recommended",
            modalTitle: "Hospitality & Customer Care",
            modalQuote: "Master client relations, front-desk operations, and premium services for elite hospitality networks.",
            image: "https://ik.imagekit.io/fmldynl4j4/New%20folder/92b3d960-c0fd-4d1a-9060-8904251fe134_2.jfif",
            sectors: [
                { name: "Luxury Hotels", icon: Hotel },
                { name: "Travel & Tourism", icon: Globe },
                { name: "Customer Relations", icon: Heart },
                { name: "Premium Retail", icon: Briefcase }
            ]
        },
        
        {
            title: "Advance Certificate Course in Aviation, Hospitality, Travel and Customer Service",
            type: "Advanced",
            duration: "1 Year",
            desc: "Comprehensive academic track linking ground operations, in-flight management, VVIP styling, and leadership skills.",
            badge: "Premium",
            modalTitle: "Aviation & Travel Management",
            modalQuote: "An advanced track merging in-flight leadership, operations coordination, VVIP styling, and terminal management.",
            image: "https://ik.imagekit.io/fmldynl4j4/New%20folder/ebd8322c-d3c0-47a1-8f4a-53725f09571c_3.jfif",
            sectors: [
                { name: "In-Flight Management", icon: Plane },
                { name: "VVIP Airport Lounges", icon: Award },
                { name: "Global Hospitality", icon: ShieldCheck },
                { name: "Aviation Leadership", icon: TrendingUp }
            ]
        }
    ];

    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-[#db3436] selection:text-white">
            <SEO
                title="INSD Aviation & Cabin Crew | Airport & Airline Career Training"
                description="Introducing INSD Aviation. Master cabin crew safety, airport logistics, global hospitality, and premium retail customer services."
            />

            {/* --- HERO SECTION --- */}
            <section className="relative min-h-[90vh] lg:h-screen lg:min-h-[640px] flex items-center pt-28 lg:pt-36 pb-8 lg:pb-12 px-6 md:px-12 lg:px-24 overflow-hidden bg-white">
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Content */}
                    <div className="lg:col-span-6 text-left space-y-4 lg:space-y-5 xl:space-y-6">
                        {/* Heading */}
                        <div className="space-y-3 lg:space-y-4">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4.25rem] font-black uppercase tracking-tighter leading-[0.95] text-slate-900"
                            >
                                Introducing <br />
                                INSD <br />
                                <span className="text-[#db3436] italic relative inline-block">
                                    Aviation.
                                    {/* Underline decorative stroke */}
                                    <span className="absolute left-0 bottom-1 w-full h-[6px] bg-[#db3436]/10 -z-10 rounded-full" />
                                </span>
                            </motion.h1>

                            {/* Subheading */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="space-y-1 border-l-4 border-[#134a84] pl-4 lg:pl-5 py-0.5"
                            >
                                <p className="text-base md:text-lg lg:text-lg xl:text-xl font-extrabold tracking-tight text-slate-800 leading-snug">
                                    Airports. Airlines. Luxury Hotels. Luxury Retail Brands.
                                </p>
                                <p className="text-[10px] md:text-xs font-extrabold uppercase tracking-[0.15em] text-[#db3436]">
                                    One Course. Endless Opportunities.
                                </p>
                            </motion.div>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-slate-600 text-xs md:text-sm lg:text-base font-medium max-w-xl leading-relaxed"
                            >
                                Study with INSD to start a high-impact career in Cabin Crew, Ground Staff, Airport Operations, Hospitality Management, and Premium Customer Relations. Get trained by global professionals.
                            </motion.p>
                        </div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <button
                                onClick={() => openAdmissionModal({ title: 'Talk to our experts', subtitle: 'Get professional guidance for your aviation career.' })}
                                className="group bg-[#db3436] hover:bg-[#db3436]/95 text-white font-black uppercase text-xs tracking-widest px-6 lg:px-8 py-3 lg:py-3.5 rounded-full flex items-center justify-center gap-2.5 shadow-[0_12px_30px_rgba(219,52,54,0.35)] hover:shadow-[0_15px_35px_rgba(219,52,54,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 w-fit"
                            >
                                Talk to our experts
                                <ArrowRight size={18} className="transform group-hover:translate-x-1.5 transition-transform" />
                            </button>
                        </motion.div>

                        {/* Stats Strip */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="grid grid-cols-4 gap-3 md:gap-6 pt-3 lg:pt-4 border-t border-slate-100 max-w-2xl"
                        >
                            {[
                                { number: "15+", label: "Years Legacy", color: "text-[#db3436]" },
                                { number: "75+", label: "Centres", color: "text-[#db3436]" },
                                { number: "30,000+", label: "Students Trained", color: "text-[#134a84]" },
                                { number: "18 Lakh", label: "Highest Salary", color: "text-[#134a84]" }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col relative pr-2 last:pr-0">
                                    <h4 className={`text-xl lg:text-2xl xl:text-3xl font-black tracking-tight ${stat.color}`}>{stat.number}</h4>
                                    <p className="text-[8px] lg:text-[9px] xl:text-[10px] font-bold uppercase text-slate-500 tracking-wider mt-1 leading-tight">{stat.label}</p>
                                    {i < 3 && (
                                        <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-slate-200" />
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Column - Visual Graphic */}
                    <div className="lg:col-span-6 relative flex items-center justify-center pt-4 lg:pt-0">
                        {/* Decorative background circle */}
                        <div className="absolute w-[110%] aspect-square rounded-full bg-slate-50 border border-slate-100 -z-10 animate-pulse duration-[6000ms]" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[460px] xl:max-w-[540px]"
                        >
                            {/* Main Foreground Card (Students/Desk) */}
                            <div className="relative z-10 rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden border-4 lg:border-8 border-white shadow-2xl shadow-slate-200">
                                <img
                                    src="https://ik.imagekit.io/fmldynl4j4/Screenshot%202026-06-06%20222243.png"
                                    alt="INSD Students Collaboration"
                                    className="w-full aspect-4/3 object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>


                            {/* Floating Badge 2 - Flight visual overlay card */}
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 z-20 rounded-xl lg:rounded-2xl overflow-hidden border-2 lg:border-4 border-white shadow-xl max-w-[110px] lg:max-w-[150px] aspect-video"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=300"
                                    alt="Aviation Flight Backdrop"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- WHY AVIATION SECTION --- */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#134a84]/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto space-y-16 relative z-10">
                    <div className="text-center space-y-4">
                        <h2 className="text-[10px] font-mono text-[#db3436] font-bold uppercase tracking-[0.4em]">Why Aviation?</h2>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-slate-900">
                            The Future Is Taking Off
                        </h1>
                        <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide text-slate-500">
                            The Industries Shaping Tomorrow's Careers
                        </h2>
                        <p className="text-slate-600 text-sm md:text-base max-w-3xl mx-auto leading-relaxed font-medium">
                            India's service industries are growing faster than ever.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                        {/* Growth Factors */}
                        <div className="lg:col-span-6 bg-white border border-slate-200/60 rounded-3xl p-8 md:p-10 flex flex-col justify-between space-y-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-[#db3436]">
                                    <TrendingUp size={24} />
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">Growth & Infrastructure</h3>
                                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Unprecedented Expansion Metrics</p>
                            </div>

                            <div className="space-y-3">
                                {growthFacts.map((fact, idx) => {
                                    const IconComponent = fact.icon;
                                    return (
                                        <div 
                                            key={idx} 
                                            className="flex gap-4 items-center p-3.5 bg-slate-50/50 hover:bg-white rounded-2xl transition-all duration-300 group hover:shadow-md hover:shadow-slate-100/50"
                                        >
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 ${fact.color}`}>
                                                <IconComponent size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h4 className="font-extrabold text-sm text-slate-800 tracking-tight leading-none group-hover:text-[#db3436] transition-colors">
                                                        {fact.count}
                                                    </h4>
                                                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">
                                                        {fact.label}
                                                    </span>
                                                </div>
                                                <p className="text-[11px] text-slate-500 font-medium mt-1 leading-snug">
                                                    {fact.text}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Lifestyle & Income */}
                        <div className="lg:col-span-6 bg-linear-to-b from-white to-slate-50/50 border border-slate-200/60 rounded-3xl p-8 md:p-10 flex flex-col justify-between space-y-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#134a84]">
                                    <Award size={24} />
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">Earn More Than A Salary. Build A Lifestyle.</h3>
                                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Exclusive Career Incentives</p>
                            </div>

                            <div className="space-y-5">
                                {lifestyleBullets.map((bullet, idx) => (
                                    <div key={idx} className="flex gap-4 items-start group">
                                        <div className="w-5 h-5 rounded-full bg-blue-50/70 flex items-center justify-center text-[#134a84] shrink-0 mt-0.5 border border-blue-100 shadow-2xs">
                                            <CheckCircle2 size={12} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-sm uppercase tracking-tight text-slate-800 group-hover:text-[#134a84] transition-colors">{bullet.label}</h4>
                                            <p className="text-xs text-slate-500 font-medium">{bullet.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- BRAND PARTNERS SECTION --- */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-white border-b border-slate-100 overflow-hidden">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-[10px] font-mono text-[#134a84] font-bold uppercase tracking-[0.4em]">Corporate Grid</h2>
                        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-slate-900">
                            Where INSD Students Build Their Dream Careers
                        </h1>
                        <h2 className="text-base md:text-lg font-bold uppercase tracking-widest text-slate-500">
                            Leading Brands. Premium Workplaces. Endless Opportunities.
                        </h2>
                    </div>

                    {/* Logo Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {brandLogos.map((brand, idx) => (
                            <div
                                key={idx}
                                className="group relative bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center min-h-[160px] transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                
                                <div className="h-16 w-full flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-105">
                                    {brand.logo ? (
                                        <img 
                                            src={brand.logo} 
                                            alt={`${brand.name} Logo`} 
                                            referrerPolicy="no-referrer"
                                            className="max-h-full max-w-[90%] object-contain transition-all duration-300"
                                        />
                                    ) : (
                                        <span className="text-lg font-serif font-black tracking-widest text-slate-700 uppercase italic group-hover:text-[#db3436] transition-colors">
                                            {brand.name}
                                        </span>
                                    )}
                                </div>

                                <p className="text-[10px] text-slate-400 group-hover:text-slate-500 font-bold uppercase tracking-wider transition-colors text-center">
                                    {brand.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- COURSES SECTION --- */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-slate-50 relative">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-[10px] font-mono text-[#db3436] font-bold uppercase tracking-[0.4em]">Program Directory</h2>
                        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-slate-900 max-w-4xl mx-auto">
                            Ready To Turn Your Dream Lifestyle Into Your Career?
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {coursesData.map((course, idx) => (
                            <div
                                key={idx}
                                onClick={() => {
                                    setSelectedCourse(course);
                                    setIsModalOpen(true);
                                }}
                                className="group bg-white border border-slate-200/60 hover:border-[#db3436]/20 rounded-[2rem] overflow-hidden flex flex-col justify-start shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                            >
                                {/* Course Image Banner */}
                                <div className="relative h-48 w-full overflow-hidden">
                                    <img 
                                        src={course.image} 
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
                                </div>

                                {/* Content Container */}
                                <div className="p-8 space-y-5">
                                    <div className="flex justify-between items-center">
                                        <span className="px-3 py-1 bg-slate-100 border border-slate-200 text-[9px] font-mono font-bold uppercase tracking-widest text-slate-655 rounded-full">
                                            {course.type} • {course.duration}
                                        </span>
                                        <span className="px-2.5 py-0.5 bg-red-50 text-[#db3436] text-[8px] font-black uppercase tracking-widest rounded border border-red-100">
                                            {course.badge}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-[#db3436] transition-colors uppercase tracking-tight leading-snug">
                                        {course.title}
                                    </h3>
                                    <p className="text-slate-500 text-xs leading-relaxed font-medium">
                                        {course.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- WHY INSD AVIATION? SECTION --- */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="text-center space-y-4">
                        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#db3436] font-extrabold bg-red-50 border border-red-100 px-4 py-2 rounded-full inline-block">
                            INSD Edge
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none text-slate-900">
                            Why INSD Aviation?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[
                            {
                                title: "Aviation-Focused Training",
                                desc: "Learn the skills airlines, airports, hospitality and travel companies actually look for.",
                                icon: Plane,
                                color: "text-[#db3436] bg-red-50 border-red-100"
                            },
                            {
                                title: "Industry-Ready From Day One",
                                desc: "Professional grooming, communication, customer service and interview preparation designed for real-world careers.",
                                icon: Sparkles,
                                color: "text-blue-600 bg-blue-50 border-blue-100"
                            },
                            {
                                title: "Multi-Industry Career Pathways",
                                desc: "One program preparing you for opportunities across Aviation, Hospitality, Travel & Customer Service sectors.",
                                icon: Briefcase,
                                color: "text-emerald-600 bg-emerald-50 border-emerald-100"
                            },
                            {
                                title: "Practical Learning Experience",
                                desc: "Hands-on training, CRS software exposure, role-play sessions and industry-oriented learning.",
                                icon: BookOpen,
                                color: "text-purple-600 bg-purple-50 border-purple-100"
                            },
                            {
                                title: "100% Placement Support",
                                desc: "Career assistance and placement support to help students confidently enter the workforce.",
                                icon: Award,
                                color: "text-amber-600 bg-amber-50 border-amber-100"
                            },
                            {
                                title: "Transforming Personalities Into Professionals",
                                desc: "We don't just train students—we prepare confident professionals ready for customer-facing careers.",
                                icon: GraduationCap,
                                color: "text-indigo-600 bg-indigo-50 border-indigo-100"
                            }
                        ].map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <div 
                                    key={index}
                                    className="group bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200/80 rounded-[2rem] p-8 transition-all duration-300 hover:shadow-xl hover:shadow-slate-100/50"
                                >
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border mb-6 transition-all duration-300 group-hover:scale-110 ${item.color}`}>
                                        <IconComponent size={22} className="group-hover:rotate-6 transition-transform" />
                                    </div>
                                    <h3 className="text-lg font-black uppercase text-slate-800 tracking-tight leading-snug group-hover:text-[#db3436] transition-colors mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-500 text-xs leading-relaxed font-medium">
                                        {item.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- THE INSD AVIATION DIFFERENCE SECTION --- */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#db3436]/5 blur-[150px] rounded-full pointer-events-none" />
                
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
                    {/* Left Column: Title & Quote */}
                    <div className="lg:col-span-6 space-y-6 text-left">
                        <div className="space-y-4">
                            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#db3436] font-extrabold bg-red-50 border border-red-100 px-4 py-2 rounded-full inline-block">
                                The INSD Aviation Difference
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight text-slate-900">
                                We Train The Skills <br />
                                That Get You Hired.
                            </h2>
                        </div>

                        <div className="border-l-4 border-[#db3436] pl-5 space-y-2">
                            <p className="text-sm font-bold text-slate-700 leading-relaxed italic">
                                "Success in Aviation, Hospitality, Travel & Customer Service requires more than qualifications. It requires confidence, communication, professionalism and a customer-first attitude."
                            </p>
                        </div>

                        <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed max-w-xl">
                            At INSD Aviation, we prepare students with the industry-ready skills employers look for.
                        </p>
                    </div>

                    {/* Right Column: 6 Core Skills List */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                "Personality Development",
                                "Professional Grooming",
                                "Communication & Interpersonal Skills",
                                "Customer Service Excellence",
                                "Interview Preparation",
                                "Career Readiness Training"
                            ].map((skill, index) => (
                                <div 
                                    key={index}
                                    className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-2xs hover:shadow-md transition-shadow duration-300 group"
                                >
                                    <div className="w-6 h-6 rounded-full bg-red-50 text-[#db3436] flex items-center justify-center shrink-0 border border-red-100/50 group-hover:bg-[#db3436] group-hover:text-white transition-colors duration-300">
                                        <CheckCircle2 size={12} />
                                    </div>
                                    <span className="text-xs font-extrabold uppercase tracking-tight text-slate-800 group-hover:text-[#db3436] transition-colors leading-tight">
                                        {skill}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center italic mt-4">
                            Because great careers are built on great skills.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA SECTION --- */}
            <section className="relative py-28 px-6 md:px-12 lg:px-24 bg-slate-950 text-white overflow-hidden border-t border-slate-900">
                {/* Visual Accent Backdrops */}
                <div className="absolute inset-0 z-0">
                    {/* Glowing radial gradient */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#db3436]/10 rounded-full blur-[150px] pointer-events-none" />
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#134a84]/15 rounded-full blur-[120px] pointer-events-none" />
                    
                    {/* Cyber Grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
                    <div className="inline-flex flex-col items-center gap-4">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="w-16 h-16 rounded-3xl bg-[#db3436]/10 border border-[#db3436]/30 flex items-center justify-center text-[#db3436] shadow-[0_8px_20px_rgba(219,52,54,0.15)]"
                        >
                            <Sparkles size={28} className="animate-pulse" />
                        </motion.div>
                        <span className="text-[#db3436] font-extrabold uppercase text-xs tracking-[0.4em] bg-[#db3436]/10 border border-[#db3436]/20 px-4 py-2 rounded-full">
                            Begin Your Journey
                        </span>
                    </div>

                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-tight max-w-4xl mx-auto"
                    >
                        The Career You've <br />
                        <span className="text-[#db3436] italic font-serif lowercase tracking-normal">dreamed about</span> Starts Here
                    </motion.h2>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed font-medium"
                    >
                        Enroll in India's leading aviation, hospitality & customer service training program. Real-world skills, premium grooming, and 100% placement support await you.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-6 max-w-3xl mx-auto"
                    >
                        <button
                            onClick={() => setIsFormModalOpen(true)}
                            className="group relative w-full sm:w-auto h-14 px-8 md:px-10 bg-[#db3436] hover:bg-[#db3436]/90 text-white rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-300 shadow-[0_12px_35px_rgba(219,52,54,0.3)] hover:shadow-[0_15px_45px_rgba(219,52,54,0.45)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                        >
                            Apply Now
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            onClick={() => openAdmissionModal({
                                title: 'Book Career Counselling',
                                subtitle: 'Connect with our expert counselors to map your career path.',
                                ctaText: 'Book Now',
                                successMsg: 'Thank you! We have booked your career counselling session. A counselor will call you shortly.'
                            })}
                            className="w-full sm:w-auto h-14 px-8 md:px-10 border-2 border-white/10 hover:border-white/30 hover:bg-white/5 text-white rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                        >
                            Book Career Counselling
                        </button>

                        <button
                            onClick={() => setIsFormModalOpen(true)}
                            className="w-full sm:w-auto h-14 px-8 md:px-10 border-2 border-[#db3436]/20 hover:border-[#db3436]/50 hover:bg-[#db3436]/5 text-white rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                        >
                            <Download size={14} className="text-[#db3436]" />
                            Download Brochure
                        </button>
                    </motion.div>
                </div>
            </section>

            <Footer />

            {/* --- COURSE DETAILS MODAL --- */}
            <AnimatePresence>
                {isModalOpen && selectedCourse && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                        {/* Backdrop Click */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 cursor-pointer"
                        />

                        {/* Modal Container */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                            className="relative z-10 w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl flex flex-col md:flex-row min-h-0 max-h-[90vh] md:max-h-[85vh] lg:max-h-none overflow-y-auto overflow-x-hidden md:overflow-hidden"
                        >
                            {/* Close Button */}
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute right-4 top-4 md:right-6 md:top-6 z-30 p-2 bg-white/90 hover:bg-white text-slate-500 hover:text-slate-800 rounded-full border border-slate-100/80 transition-colors shadow-xs"
                            >
                                <X size={16} />
                            </button>

                            {/* Left Side: Visual Image & Heading overlay */}
                            <div className="relative w-full md:w-[48%] aspect-[4/5] md:aspect-auto md:h-auto shrink-0">
                                <img 
                                    src={selectedCourse.image} 
                                    alt={selectedCourse.title} 
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
                                
                                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                                    <h4 className="text-xl md:text-3xl font-black uppercase text-white tracking-tight leading-none">
                                        {selectedCourse.modalTitle}
                                    </h4>
                                </div>
                            </div>

                            {/* Right Side: Details & Sectors */}
                            <div className="w-full md:w-[52%] p-6 md:p-10 flex flex-col justify-between flex-1">
                                <div className="space-y-5">
                                    {/* Header */}
                                    <div>
                                        <h3 className="text-slate-400 font-extrabold uppercase text-[9px] md:text-[10px] tracking-[0.2em] mb-1.5 flex items-center gap-1.5 flex-wrap">
                                            Not Just <span className="text-[#db3436] italic font-serif normal-case">{selectedCourse.modalTitle}</span>
                                        </h3>
                                        <h2 className="text-xl md:text-3xl font-black uppercase text-slate-800 tracking-tight leading-tight md:leading-none">
                                            Be Part of a Larger Industry
                                        </h2>
                                    </div>

                                    {/* Quote Description */}
                                    <div className="border-l-2 border-[#db3436] pl-4">
                                        <p className="text-xs font-semibold text-slate-500 leading-relaxed italic">
                                            {selectedCourse.modalQuote}
                                        </p>
                                    </div>

                                    {/* Work in sectors */}
                                    <div className="space-y-3">
                                        <span className="text-[#db3436] text-[9px] font-black tracking-widest uppercase block flex items-center gap-1.5">
                                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#db3436]" />
                                            Work in the largest sectors
                                        </span>

                                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                                            {selectedCourse.sectors.map((sector, idx) => {
                                                const SectorIcon = sector.icon;
                                                return (
                                                    <div 
                                                        key={idx}
                                                        className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl p-3 md:p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-xs hover:border-slate-200"
                                                    >
                                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-50 text-[#db3436] flex items-center justify-center mb-2 md:mb-2.5 shrink-0">
                                                            <SectorIcon size={16} />
                                                        </div>
                                                        <span className="text-[9px] md:text-[10px] font-extrabold uppercase tracking-tight text-slate-800 leading-tight">
                                                            {sector.name}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Action button & Footer Disclaimer */}
                                <div className="space-y-4 mt-6">
                                    <button
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            openAdmissionModal({ title: 'Apply for Aviation Course' });
                                        }}
                                        className="w-full py-3 md:py-3.5 px-6 bg-[#db3436] hover:bg-[#db3436]/90 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] text-center transition-all shadow-md shadow-red-500/10 hover:shadow-red-500/20"
                                    >
                                        Apply for this course
                                    </button>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider border-t border-slate-100 pt-4 leading-normal text-center md:text-left">
                                        Program outcomes may vary based on individual portfolio excellence and industry demand.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Aviation;
