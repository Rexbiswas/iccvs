import React, { useState } from 'react';
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
    CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import { useAdmissionModal } from '../context/AdmissionModalContext';

const Aviation = () => {
    const navigate = useNavigate();
    const { openAdmissionModal } = useAdmissionModal();

    const scrollToForm = () => {
        const element = document.getElementById('admission-form');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        state: '',
        city: '',
        program: 'certificate course',
        course: 'Aviation & Cabin Crew',
        marketingConsent: false
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const stateCityData = {
        "Andhra Pradesh": ["Vishakhapatnam", "Vijayawada"],
        "Arunachal Pradesh": ["Itanagar"],
        "Assam": ["Guwahati"],
        "Chhattisgarh": ["Bhilai", "Raipur"],
        "Delhi": ["Head Campus", "Dwarka"],
        "Gujarat": ["Ahmedabad", "Surat"],
        "Haryana": ["Hisar"],
        "Jammu & Kashmir": ["Jammu"],
        "Karnataka": ["Bangalore JP Nagar", "Kalaburagi", "Mysore", "Bangalore Whitefield", "Shivamogga", "Davanagere"],
        "Kerala": ["Kochin", "Thrissur", "Trivandrum"],
        "Madhya Pradesh": ["Bhopal"],
        "Maharashtra": ["Amravati", "Mumbai Andheri", "Pune Baner", "Mumbai Ghtakopar", "Pune Hadapsar", "Mumbai Kandivali", "Nanded", "Pune PCMC", "Pune Deccan", "Pune Kothrud", "Navi Mumbai Sanpada", "Mumbai Thane", "Navi Mumbai Vasai"],
        "Manipur": ["Imphal"],
        "Odisha": ["Bhubaneshvar"],
        "Punjab": ["Mohali", "New Amritsar", "Ludhiana"],
        "Rajasthan": ["Jaipur", "Udaipur", "Kota"],
        "Tamil Nadu": ["Coimbatore", "Salem", "Chennai"],
        "Uttar Pradesh": ["Bareilly", "Prayagraj"],
        "West Bengal": ["Kolkata", "Siliguri"]
    };

    const states = Object.keys(stateCityData);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'phone') {
            const digits = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, [name]: digits }));
            return;
        }
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.phone.length !== 10) {
            setErrorMessage('Please enter a valid 10-digit mobile number');
            setStatus('error');
            return;
        }
        if (!formData.marketingConsent) {
            setErrorMessage('Please consent to receive updates');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('/api/admission', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    phone: `+91${formData.phone}`
                })
            });

            const contentType = response.headers.get("content-type");
            let data;
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.error("Non-JSON response:", text.substring(0, 200));
                throw new Error(`Server returned non-JSON response (${response.status})`);
            }

            if (response.ok) {
                setStatus('success');
                const submittedName = formData.name;
                setFormData({
                    name: '', email: '', phone: '', state: '', city: '', 
                    program: 'certificate course', course: 'Aviation & Cabin Crew', marketingConsent: false
                });
                setTimeout(() => {
                    navigate('/thank-you', { state: { name: submittedName, type: 'admission' } });
                }, 300);
            } else {
                setErrorMessage(data.message || `Submission failed (${response.status}).`);
                setStatus('error');
            }
        } catch (error) {
            console.error('Submission Error:', error);
            setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
            setStatus('error');
        }
    };

    const growthFacts = [
        { count: "157+", text: "Airports Across India" },
        { count: "UDAN", text: "Government Initiative Expanding Air Connectivity" },
        { count: "400+", text: "Airport Development & Expansion Projects" },
        { count: "Booming", text: "Hospitality & Tourism Industry" },
        { count: "Surging", text: "Demand For Skilled Service Professionals" }
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
        { name: "Radisson", desc: "Luxury Hotels" },
        { name: "Oberoi Maidens", desc: "Heritage Hospitality" },
        { name: "Marriott Bonvoy", desc: "Premium Hotels" },
        { name: "Tommy Hilfiger", desc: "Premium Apparel" },
        { name: "Pantaloons", desc: "Retail Fashion" },
        { name: "H&M", desc: "Global Retail" },
        { name: "Nike", desc: "Sportswear Retail" },
        { name: "Jigar Mali", desc: "Luxury Couture" },
        { name: "Westside", desc: "Retail Group" },
        { name: "Levi's", desc: "Premium Denim" }
    ];

    const coursesData = [
        {
            title: "Certificate Course in Aviation, Hospitality and Travel Management",
            type: "Certificate",
            duration: "6 Months",
            desc: "Develop key skills in cabin services, airline codes, check-in software, and travel routing layouts.",
            badge: "Popular"
        },
        {
            title: "Certificate Course in Hospitality, Travel and Customer Service",
            type: "Certificate",
            duration: "6 Months",
            desc: "Master front-desk administration, client management, luxury hospitality standards, and retail relations.",
            badge: "Recommended"
        },
        {
            title: "Advance Certificate Course in Aviation, Hospitality, Travel and Customer Service",
            type: "Advanced",
            duration: "1 Year",
            desc: "Comprehensive academic track linking ground operations, in-flight management, VVIP styling, and leadership skills.",
            badge: "Premium"
        }
    ];

    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans selection:bg-[#db3436] selection:text-white">
            <SEO
                title="INSD Aviation & Cabin Crew | Airport & Airline Career Training"
                description="Introducing INSD Aviation. Master cabin crew safety, airport logistics, global hospitality, and premium retail customer services."
            />

            {/* --- HERO SECTION --- */}
            <section className="relative min-h-[95vh] lg:min-h-screen flex items-center pt-28 lg:pt-36 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden bg-white">
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Content */}
                    <div className="lg:col-span-7 text-left space-y-8 lg:space-y-10">
                        {/* Tagline Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 shadow-sm"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#db3436] animate-pulse" />
                            <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#db3436]">
                                Launching Careers in the Sky
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <div className="space-y-6">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-slate-900"
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
                                className="space-y-3 border-l-4 border-[#134a84] pl-6 py-2"
                            >
                                <p className="text-lg md:text-xl font-extrabold tracking-tight text-slate-800 leading-snug">
                                    Airports. Airlines. Luxury Hotels. Luxury Retail Brands.
                                </p>
                                <p className="text-xs md:text-sm font-extrabold uppercase tracking-[0.15em] text-[#db3436]">
                                    One Course. Endless Opportunities.
                                </p>
                            </motion.div>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-slate-600 text-sm md:text-base font-medium max-w-xl leading-relaxed"
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
                                onClick={scrollToForm}
                                className="group bg-[#db3436] hover:bg-[#db3436]/95 text-white font-black uppercase text-xs md:text-sm tracking-widest px-8 md:px-10 py-4 md:py-5 rounded-full flex items-center justify-center gap-3 shadow-[0_12px_30px_rgba(219,52,54,0.35)] hover:shadow-[0_15px_35px_rgba(219,52,54,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 w-fit"
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
                            className="grid grid-cols-4 gap-4 md:gap-6 pt-8 border-t border-slate-100 max-w-2xl"
                        >
                            {[
                                { number: "15+", label: "Years Legacy", color: "text-[#db3436]" },
                                { number: "75+", label: "Centres", color: "text-[#db3436]" },
                                { number: "30,000+", label: "Students Trained", color: "text-[#134a84]" },
                                { number: "18 Lakh", label: "Highest Salary", color: "text-[#134a84]" }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col relative pr-2 last:pr-0">
                                    <h4 className={`text-2xl md:text-3xl font-black tracking-tight ${stat.color}`}>{stat.number}</h4>
                                    <p className="text-[9px] md:text-[10px] font-bold uppercase text-slate-505 tracking-wider mt-1.5 leading-tight">{stat.label}</p>
                                    {i < 3 && (
                                        <div className="absolute right-0 top-1/6 bottom-1/6 w-px bg-slate-200" />
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Column - Visual Graphic */}
                    <div className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0">
                        {/* Decorative background circle */}
                        <div className="absolute w-[110%] aspect-square rounded-full bg-slate-50 border border-slate-100 -z-10 animate-pulse duration-[6000ms]" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full max-w-[450px]"
                        >
                            {/* Main Foreground Card (Students/Desk) */}
                            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl shadow-slate-200">
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                                    alt="INSD Students Collaboration"
                                    className="w-full aspect-4/3 object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Floating Badge 1 - Aviation Theme */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-6 -right-6 z-20 bg-white border border-slate-100 shadow-xl rounded-2xl p-4 flex items-center gap-3 max-w-[200px]"
                            >
                                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#db3436] shrink-0">
                                    <Plane size={20} className="rotate-45" />
                                </div>
                                <div>
                                    <h5 className="text-xs font-black uppercase text-slate-800 leading-tight">INSD Aviation</h5>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Academy</p>
                                </div>
                            </motion.div>

                            {/* Floating Badge 2 - Flight visual overlay card */}
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-6 -left-6 z-20 rounded-2xl overflow-hidden border-4 border-white shadow-xl max-w-[150px] aspect-video"
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
                            India's Aviation, Hospitality & Travel sectors are witnessing unprecedented growth, creating exciting career opportunities for skilled professionals. India's service industries are growing faster than ever.
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

                            <div className="space-y-6">
                                {growthFacts.map((fact, idx) => (
                                    <div key={idx} className="flex gap-4 items-start group">
                                        <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[#db3436] text-xs font-mono font-black h-7 flex items-center justify-center shadow-xs">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-sm uppercase tracking-tight text-slate-800 group-hover:text-[#db3436] transition-colors">{fact.count}</h4>
                                            <p className="text-xs text-slate-500 font-bold">{fact.text}</p>
                                        </div>
                                    </div>
                                ))}
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
                                className="group relative bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <h4 className="text-lg md:text-xl font-black text-slate-855 group-hover:text-[#db3436] transition-colors tracking-tight uppercase">
                                    {brand.name}
                                </h4>
                                <p className="text-[9px] text-slate-400 group-hover:text-slate-500 font-bold uppercase tracking-widest mt-1.5">
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
                                className="group bg-white border border-slate-200/60 hover:border-[#db3436]/20 rounded-[2rem] p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                            >
                                <div className="space-y-6">
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

                                <div className="mt-8 pt-6 border-t border-slate-100">
                                    <button
                                        onClick={scrollToForm}
                                        className="w-full flex items-center justify-between py-3.5 px-6 bg-slate-900 hover:bg-[#db3436] group-hover:bg-[#db3436] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all"
                                    >
                                        <span>Apply Online</span>
                                        <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- ADMISSION FORM SECTION --- */}
            <section id="admission-form" className="py-24 px-6 md:px-12 lg:px-24 bg-white border-t border-slate-100 relative overflow-hidden">
                <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left Side Content */}
                    <div className="lg:col-span-6 space-y-6 text-left">
                        <div className="space-y-4">
                            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#db3436] font-extrabold bg-red-50 border border-red-100 px-4 py-2 rounded-full inline-block">
                                Counseling & Admissions
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight text-slate-900">
                                Start Your Aviation <br />
                                Journey Today.
                            </h2>
                            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                                Connect with our senior counselors and aviation career experts. We'll guide you through course details, structures, placement support, and scheduling a campus visit.
                            </p>
                        </div>

                        {/* Contact details list */}
                        <div className="space-y-4 pt-4">
                            {[
                                { icon: Mail, title: "Email Us", val: "admissions@insd.edu.in", desc: "Get detailed brochures in your inbox" },
                                { icon: Phone, title: "Call Hotline", val: "+91 88000 88000", desc: "Mon-Sat, 9:00 AM - 6:00 PM" },
                                { icon: MapPin, title: "Our Centres", val: "75+ Locations Across India", desc: "Visit your nearest design and aviation campus" }
                            ].map((detail, idx) => (
                                <div key={idx} className="flex gap-4 items-start group">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#134a84] group-hover:bg-[#134a84] group-hover:text-white transition-all shrink-0">
                                        <detail.icon size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider leading-none mb-1">{detail.title}</h4>
                                        <p className="font-black text-sm text-slate-900 group-hover:text-[#db3436] transition-colors">{detail.val}</p>
                                        <p className="text-[10px] text-slate-505 mt-0.5">{detail.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side Form Card */}
                    <div className="lg:col-span-6 relative">
                        <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-100 relative overflow-hidden">
                            <div className="relative z-10 space-y-6">
                                <div className="text-left space-y-2">
                                    <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">Talk to our experts</h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Request a call back and plan your career path.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="relative group">
                                        <input
                                            required
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Full Name *"
                                            className="w-full h-12 bg-white border border-slate-200 rounded-xl pl-10 pr-4 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-[#db3436] focus:ring-4 focus:ring-[#db3436]/10 transition-all font-bold"
                                        />
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#db3436] transition-colors" size={16} />
                                    </div>

                                    <div className="relative group">
                                        <input
                                            required
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            type="email"
                                            placeholder="Email Address *"
                                            className="w-full h-12 bg-white border border-slate-200 rounded-xl pl-10 pr-4 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-[#db3436] focus:ring-4 focus:ring-[#db3436]/10 transition-all font-bold"
                                        />
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#db3436] transition-colors" size={16} />
                                    </div>

                                    <div className="relative group">
                                        <div className="flex items-stretch h-12 bg-white border border-slate-200 rounded-xl overflow-hidden focus-within:border-[#db3436] focus-within:ring-4 focus-within:ring-[#db3436]/10 transition-all">
                                            <div className="flex items-center px-3 bg-slate-50 border-r border-slate-200 gap-2">
                                                <Phone className="text-slate-400" size={16} />
                                                <span className="text-slate-505 font-bold text-xs">+91</span>
                                            </div>
                                            <input
                                                required
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                type="tel"
                                                placeholder="Mobile Number *"
                                                className="flex-1 h-full bg-transparent px-3 text-slate-900 text-sm placeholder-slate-400 focus:outline-none font-bold"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative group">
                                            <select
                                                required
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                className="w-full h-12 bg-white border border-slate-200 rounded-xl px-3 text-slate-700 text-xs font-bold focus:outline-none focus:border-[#db3436] appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>State *</option>
                                                {states.map(state => <option key={state} value={state}>{state}</option>)}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={12} />
                                        </div>

                                        <div className="relative group">
                                            <select
                                                required
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                className="w-full h-12 bg-white border border-slate-200 rounded-xl px-3 text-slate-700 text-xs font-bold focus:outline-none focus:border-[#db3436] appearance-none cursor-pointer disabled:opacity-50"
                                                disabled={!formData.state}
                                            >
                                                <option value="" disabled>City *</option>
                                                {formData.state && stateCityData[formData.state]?.map(city => (
                                                    <option key={city} value={city}>{city}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={12} />
                                        </div>
                                    </div>

                                    <label className="flex items-start gap-3 cursor-pointer group/consent pt-2">
                                        <div className={`mt-0.5 w-5 h-5 rounded border shrink-0 flex items-center justify-center transition-all ${formData.marketingConsent ? 'bg-[#db3436] border-[#db3436]' : 'border-slate-200 bg-white'}`}>
                                            {formData.marketingConsent && <CheckCircle2 className="text-white w-3.5 h-3.5" />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            name="marketingConsent"
                                            checked={formData.marketingConsent}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <span className="text-slate-500 text-[10px] font-medium leading-normal select-none group-hover/consent:text-slate-800 transition-colors">
                                            I agree to receive communications from INSD.
                                        </span>
                                    </label>

                                    {status === 'error' && (
                                        <div className="flex items-center gap-2 text-red-655 bg-red-50 px-4 py-2.5 rounded-lg border border-red-100 text-xs">
                                            <AlertCircle size={14} />
                                            <span className="font-bold uppercase tracking-wider">{errorMessage}</span>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="group relative w-full h-12 bg-[#db3436] text-white rounded-xl overflow-hidden shadow-md transition-all active:scale-98 disabled:opacity-50 mt-2 hover:bg-[#db3436]/90 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2"
                                    >
                                        {status === 'loading' ? (
                                            "Sending Request..."
                                        ) : (
                                            <>
                                                Submit Inquiry
                                                <Send size={14} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Aviation;
