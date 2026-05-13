import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CheckCircle2, 
    Zap, 
    ShieldCheck, 
    Globe, 
    TrendingUp, 
    Award,
    Send,
    ChevronDown,
    Check
} from 'lucide-react';
import { stateCityData as locationsData } from '../data/locations';

const CustomDropdown = ({ label, options, placeholder, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="space-y-2 relative" ref={dropdownRef}>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">{label}</label>
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-slate-50 border ${isOpen ? 'border-primary ring-4 ring-primary/5 bg-white' : 'border-slate-100'} rounded-2xl px-6 py-4 flex items-center justify-between cursor-pointer transition-all duration-300 group`}
            >
                <span className={`font-medium ${value ? 'text-slate-900' : 'text-slate-400'}`}>
                    {value || placeholder}
                </span>
                <ChevronDown className={`text-slate-400 group-hover:text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={18} />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute z-50 top-full left-0 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden p-2"
                    >
                        <div className="max-h-60 overflow-y-auto dropdown-scrollbar">
                            {options.map((option, idx) => (
                                <div 
                                    key={idx}
                                    onClick={() => {
                                        onChange(option);
                                        setIsOpen(false);
                                    }}
                                    className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all ${value === option ? 'bg-primary/5 text-primary' : 'hover:bg-slate-50 text-slate-600'}`}
                                >
                                    <span className="font-bold text-sm tracking-tight">{option}</span>
                                    {value === option && <Check size={16} />}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// locationsData import replaces local definition

const FranchiseCTA = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '+91',
        email: '',
        investment: '',
        preference: '',
        state: '',
        city: '',
        referred: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/partner/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                setIsSuccess(true);
                setFormData({
                    name: '', mobile: '', email: '', investment: '', preference: '', state: '', city: '', referred: false
                });
            } else {
                throw new Error(data.message || "Submission failed");
            }
        } catch (error) {
            console.error('Franchise submission error:', error);
            // Handle error messages from the backend if it was thrown in the try block
            alert(error.message || "There was an error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const pointers = [
        {
            icon: <Award className="text-primary" />,
            title: "Award-Winning Legacy",
            desc: "Join a brand recognized by national and international design awards."
        },
        {
            icon: <ShieldCheck className="text-primary" />,
            title: "IAS Led Vision",
            desc: "Co-founded by the 1st DG of NIFT & IAS, ensuring academic excellence."
        },
        {
            icon: <TrendingUp className="text-primary" />,
            title: "High ROI Model",
            desc: "Proven business framework with rapid growth and market penetration."
        },
        {
            icon: <Globe className="text-primary" />,
            title: "Global Connectivity",
            desc: "Access to international design weeks, workshops, and placement leads."
        },
        {
            icon: <Zap className="text-primary" />,
            title: "Full Support",
            desc: "Academic, marketing, and operational guidance from day one."
        },
        {
            icon: <CheckCircle2 className="text-primary" />,
            title: "Skill India Aligned",
            desc: "Curriculum designed to meet the demands of the modern creative economy."
        }
    ];

    const states = Object.keys(locationsData);
    const cities = formData.state ? locationsData[formData.state] : [];

    return (
        <section className="py-24 px-6 bg-white overflow-hidden relative border-t border-slate-200">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-secondary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    
                    {/* Left Side: Pointers */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="text-primary font-mono text-sm uppercase tracking-[0.4em] block mb-6 font-bold">The Opportunity</span>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-10 text-slate-900">
                            Empower The Next <br /> <span className="text-primary italic">Generation.</span>
                        </h2>
                        
                        <div className="space-y-10">
                            {pointers.map((item, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                    className="flex gap-6 group"
                                >
                                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        {React.cloneElement(item.icon, { size: 28, className: "group-hover:text-white transition-colors" })}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900 uppercase tracking-tight mb-2">{item.title}</h4>
                                        <p className="text-slate-600 font-medium leading-relaxed max-w-md">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="bg-white p-8 md:p-12 rounded-4xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border border-slate-100 relative z-10 overflow-hidden text-slate-900">
                            {/* Decorative Top Accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary via-secondary to-primary" />
                            
                            {/* Form Header */}
                            <div className="mb-10 text-center md:text-left">
                                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">I would like to explore <br /><span className="text-primary italic">opportunities!</span></h3>
                                <p className="text-slate-500 font-medium text-sm">Join India's most prestigious design education network. Share your details below.</p>
                            </div>

                            {!isSuccess ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Full Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            placeholder="Enter your name"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none text-slate-900 font-medium focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Mobile */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Mobile Number</label>
                                            <input 
                                                type="tel" 
                                                required
                                                value={formData.mobile}
                                                onChange={(e) => {
                                                    let val = e.target.value;
                                                    if (!val.startsWith('+91')) {
                                                        val = '+91' + val.replace(/^\+?91?/, '');
                                                    }
                                                    const digits = val.slice(3).replace(/\D/g, '').slice(0, 10);
                                                    setFormData({...formData, mobile: '+91' + digits});
                                                }}
                                                placeholder="0000-000-000"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none text-slate-900 font-medium focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Email Address</label>
                                            <input 
                                                type="email" 
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                placeholder="your@email.com"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none text-slate-900 font-medium focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Investment Dropdown */}
                                        <CustomDropdown 
                                            label="Investment"
                                            placeholder="Select Investment"
                                            options={["25 to 30 Lakhs", "30 to 40 Lakhs"]}
                                            value={formData.investment}
                                            onChange={(val) => setFormData({...formData, investment: val})}
                                        />

                                        {/* Preference Dropdown */}
                                        <CustomDropdown 
                                            label="Preference"
                                            placeholder="Select Preference"
                                            options={["Immediately", "within 3 months", "within 6 months", "No Preference"]}
                                            value={formData.preference}
                                            onChange={(val) => setFormData({...formData, preference: val})}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* State Dropdown */}
                                        <CustomDropdown 
                                            label="State"
                                            placeholder="Select State"
                                            options={states}
                                            value={formData.state}
                                            onChange={(val) => setFormData({...formData, state: val, city: ''})}
                                        />

                                        {/* City Dropdown - Dependent on State */}
                                        <CustomDropdown 
                                            label="Target City"
                                            placeholder={formData.state ? "Select City" : "Select State First"}
                                            options={cities}
                                            value={formData.city}
                                            onChange={(val) => setFormData({...formData, city: val})}
                                        />
                                    </div>

                                    {/* Referred Checkbox */}
                                    <div 
                                        onClick={() => setFormData({...formData, referred: !formData.referred})}
                                        className="flex items-center gap-4 px-2 py-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-300 transition-colors cursor-pointer group"
                                    >
                                        <input 
                                            type="checkbox" 
                                            id="referred" 
                                            checked={formData.referred}
                                            onChange={() => {}} // Handled by div click
                                            className="w-5 h-5 accent-primary cursor-pointer" 
                                        />
                                        <label htmlFor="referred" className="text-xs font-bold text-slate-600 cursor-pointer group-hover:text-slate-900 transition-colors">Were you referred by someone?</label>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <button 
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-slate-900 text-white font-black uppercase tracking-[0.3em] py-6 rounded-2xl hover:bg-primary transition-all duration-500 shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-4 group disabled:opacity-50"
                                        >
                                            <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
                                            <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                                        </button>
                                    </div>
                                    
                                    <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-2">
                                        Official Partnership Inquiry . Secure
                                    </p>
                                </form>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-20 text-center space-y-6"
                                >
                                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                                        <Check size={40} />
                                    </div>
                                    <h3 className="text-3xl font-black uppercase tracking-tight">Application Sent!</h3>
                                    <p className="text-slate-500 font-medium">Thank you for your interest. Our partnership team will contact you shortly.</p>
                                    <button 
                                        onClick={() => setIsSuccess(false)}
                                        className="text-primary font-bold uppercase tracking-widest text-xs hover:underline"
                                    >
                                        Submit another
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        {/* Ambient Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary/5 blur-[120px] rounded-full -z-0" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FranchiseCTA;
