import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, MapPin, ArrowRight, ArrowLeft, Sparkles, MessageSquare, X } from 'lucide-react';
import { useAdmissionModal } from '../context/AdmissionModalContext';

const StepLeadForm = ({ isModal = false, initialChoice = null, title = null, subtitle = null, showClose = true }) => {
    const navigate = useNavigate();
    const { closeAdmissionModal } = useAdmissionModal();
    const sectionRef = useRef(null);
    const [choice, setChoice] = useState(initialChoice);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        state: '',
        city: '',
        marketingConsent: false
    });
    const [submitted, setSubmitted] = useState(false);
    const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const stateCityData = {
        "Andhra Pradesh": ["Vishakhapattnam", "Anantapur", "Guntur", "Kadappa", "Kakinada", "Kurnool", "Nellor", "Rajamundari", "Tirupati", "Vizianagram", "Eluru", "Machhlipattnam", "Nandayal", "Ongole"],
        "Assam": ["Guwahati", "Dibrugarh", "Jorhat", "Nagaon", "Silchar"],
        "Bihar": ["Patna", "Ara", "Begusarai", "Bhagalpur", "Biharsharif", "Darbhanga", "Gaya", "Mungher", "Muzaffarpur", "Purnea", "Katihar", "Sasaram"],
        "Chhatisgarh": ["Raipur", "Bhilai", "Bilaspur", "Durg", "Korba"],
        "Delhi/NCR": ["Delhi", "Faridabad", "Ghzaiabad", "Gurugram", "Noida", "Greater Noida"],
        "Goa": ["North Goa", "South Goa"],
        "Gujarat": ["Ahmedabad", "Rajkot", "Surat", "Vadodara", "Bardoli", "Jamnagar", "Junagarh", "Idar", "Rapar", "Songarh"],
        "Haryana": ["Ambala", "Bhiwani", "Karnal", "Panipat", "Rohtak", "Panchkula", "Sonipat", "Yamunanagar"],
        "Himachal Pradesh": ["Baddi", "Dharamshala", "Hamirpur", "Kullu", "Mandi", "Nahan", "Palampur", "Shimla", "Solan", "Una"],
        "J & K": ["Sri Nagar", "Anantnag"],
        "Jharkhand": ["Dhanbad", "Jamshedpur", "Ranchi", "Bokaro", "Deoghar"],
        "Karnataka": ["Benagaluru", "Belgaun", "Hubballi", "Mangalore", "Bijapur", "Udupi"],
        "Kerala": ["Thiruvananthapuram", "Kochi", "Kollam", "Kozhikod", "Allapuzha", "Mallapuram", "Palakkad"],
        "Madhya Pradesh": ["Bhopal", "Gwallior", "Indore", "Jabalpur", "Sagar", "Ujjain", "Dewas", "Ratlam", "Rewa", "Satna"],
        "Maharashtra": ["Kalyan/Dombivli", "Mumbai", "Nagpur", "Nashik", "Navi Mumbai", "Pune", "Sambhaji Nagar", "Thane", "Ahmednagar", "Akola", "Bhiwandi", "Chandrapur", "Dhule", "Jalgaon", "Kolhapur", "Latur", "Malegaon", "Mira-Bhayandar", "Sangli-miraj-kupwad", "Solapur", "Ulhashnagar", "Parbhani"],
        "Manipur": ["Imphal West", "Senapati", "Churachandpur"],
        "Mijoram": ["Aizwal", "Champhai", "Lunglei"],
        "Nagaland": ["Dimapur", "Kohima", "Mon"],
        "Odisha": ["Bhubneshwar", "Cuttack", "Balasore", "Berhampur", "Puri", "Rourkela", "Sambhal pur"],
        "Punjab": ["Amritsar", "Ludhiana", "Bathinda", "Jalandhar", "Mohali (SAS Nagar)", "Patiala", "Zirakpur", "Firozpur", "Hoshiarpur", "Khanna", "Moga", "Pathankot", "Phagwara"],
        "Rajasthan": ["Jaipur", "Jodhpur", "Ajmer", "Alwar", "Bikaner", "Udaipur", "Bharatpur", "Pali", "Sikar", "Sri Ganganagar"],
        "Sikkim": ["Gangtok", "Namchi"],
        "Tamilnadu": ["Chennai", "Coimbatore", "Madurai", "Tambaram", "Trippur", "Avadi", "Erode", "Hosur", "Nagarcoil", "Salem", "Tirunaveli", "Trichy", "Tuticorin", "Vellore"],
        "Telengana": ["Hydrabad", "Karimnagar", "Nizamabad", "Warangal", "Godavarikhani", "Ramagundam", "Secundrabad"],
        "Tripura": ["Agartala", "Dharmanagar"],
        "Uttar Pradesh": ["Agra", "Kanpur", "Lucknow", "Meerut", "Varanasi", "Aligarh", "Ayodhya", "Bareilly", "Firozabad", "Gorakhpur", "Jhansi", "Mathura", "Moradabad", "Muzaffarnagar", "Rampur", "Saharanpur", "Amroha", "Budaun", "Bulandshahr", "Etawah", "Farrukhabad", "Mau", "Mirzapur", "Shahjahanpur"],
        "West Bengal": ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda", "Baharampur", "Shantipur", "Ranaghat", "Haldia"]
    };

    const handleChoice = (val) => {
        setChoice(val);

        // Auto-scroll to top of section when choice is made
        setTimeout(() => {
            if (sectionRef.current) {
                const navHeight = 100; // Account for fixed navbar
                const elementPosition = sectionRef.current.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 100);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate 10-digit mobile number
        if (formData.mobile.length !== 10) {
            setError('Please enter a valid 10-digit mobile number');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/step-leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    mobile: `+91${formData.mobile}`,
                    readyToStart: choice,
                    inquiryType: choice === 'yes' ? "Talk to our Career Expert" : "Let us Career Decide"
                }),
            });

            // Handle non-JSON or error responses from Vercel/Server
            const contentType = response.headers.get("content-type");
            let data;

            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.error('Server error response:', text.substring(0, 200));
                throw new Error(`Server Error (${response.status})`);
            }

            if (data.success || response.ok) {
                setSubmitted(true);
                // Set flag to prevent duplicate submissions
                // localStorage.setItem('admission-form-filled', 'true');

                // Redirect to Thank You page after a brief delay
                setTimeout(() => {
                    closeAdmissionModal();
                    navigate('/thank-you', { state: { name: formData.name, type: 'enquiry' } });
                }, 300);
            } else {
                setError(data.message || `Server Error (${response.status}): Submission failed.`);
            }
        } catch (error) {
            console.error('Submission Error:', error);

            // --- DEVELOPMENT WARNING ---
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.error('❌ Submission failed on localhost. Ensure backend is running on :5001');
            }

            if (error.name === 'TypeError') {
                setError("Connection Error: Server is unreachable. Please check your internet.");
            } else {
                setError(error.message || "An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const content = (
        <div className={`relative ${isModal ? 'overflow-y-auto max-h-[85vh] rounded-[2rem]' : 'py-24 md:py-32 bg-white overflow-hidden selection:bg-primary selection:text-white'}`}>
            {!isModal && (
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
                </div>
            )}

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">

                    {/* Header Area - Transformed based on state */}
                    <div className={`relative ${!choice && !submitted ? 'bg-white p-8 md:p-16 rounded-[3rem] text-center border border-slate-100 shadow-3xl text-slate-900 overflow-hidden' : 'text-center mb-10 md:mb-16'}`}>
                        {(!choice && !submitted && isModal && showClose) && (
                            <>
                                {/* Close Button */}
                                <button
                                    onClick={() => closeAdmissionModal()}
                                    className="absolute top-2 right-2 z-[1002] p-2.5 rounded-full bg-slate-50/80 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all border border-slate-100 group backdrop-blur-sm"
                                >
                                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                </button>
                                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary via-secondary to-primary" />
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                            </>
                        )}

                        <motion.span
                            animate={{ opacity: submitted ? 0 : 1, y: submitted ? -20 : 0 }}
                            className="inline-block px-4 py-1 rounded-full bg-slate-100 text-slate-500 font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-8"
                        >
                            {submitted ? "success" : "Take the first step"}
                        </motion.span>

                        <div className="relative inline-flex items-center justify-center gap-4 md:gap-8 group">
                            <motion.h2
                                layout
                                animate={{
                                    scale: choice ? 0.8 : 1,
                                    opacity: submitted ? 0 : 1
                                }}
                                className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-slate-950 leading-[0.9]"
                            >
                                {title ? title : (
                                    choice
                                        ? (choice === 'yes' ? "Talk to our Career Expert" : "Let us Career Decide")
                                        : <>Start Your <br /> <span className="text-primary italic font-serif">Creative Career</span> <br /> Today</>
                                )}
                            </motion.h2>

                            {choice && !submitted && isModal && showClose && (
                                <button
                                    onClick={() => closeAdmissionModal()}
                                    className="p-2 md:p-3 rounded-full bg-slate-50 text-slate-400 hover:bg-primary hover:text-white transition-all border border-slate-100 shadow-lg active:scale-90"
                                >
                                    <X size={24} className="transition-transform group-hover:rotate-90" />
                                </button>
                            )}
                        </div>

                        {!choice && !submitted && (
                            <>
                                <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-16 leading-relaxed">
                                    {subtitle || "Our experts are ready to help you navigate your design journey and identify your creative strengths."}
                                </p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8"
                                >
                                    <button
                                        onClick={() => handleChoice('yes')}
                                        className="group relative w-full sm:w-64 h-20 bg-transparent border-2 border-slate-950 text-slate-950 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:text-white active:scale-95"
                                    >
                                        <div className="absolute inset-0 bg-slate-950 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                        <span className="relative z-10 text-2xl font-black uppercase tracking-widest inline-block transition-transform duration-300 group-hover:scale-110">
                                            Yes
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => handleChoice('no')}
                                        className="group relative w-full sm:w-64 h-20 bg-white border-2 border-slate-200 text-slate-400 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-slate-800 hover:text-slate-900 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] active:scale-95"
                                    >
                                        <div className="absolute inset-0 bg-slate-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                        <span className="relative z-10 text-2xl font-black uppercase tracking-widest inline-block transition-transform duration-300 group-hover:scale-110">
                                            No
                                        </span>
                                    </button>
                                </motion.div>
                            </>
                        )}
                    </div>

                    <AnimatePresence mode="wait">
                        {choice && !submitted && (
                            <motion.div
                                key="form-expansion"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                            >
                                <div className="bg-white rounded-[3rem] p-6 md:p-10 border border-slate-100 shadow-3xl text-slate-900 relative">
                                    {/* Close Button Removed from here as it is now next to the title above */}

                                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                                        {choice === 'yes' ? <MessageSquare size={120} /> : <Sparkles size={120} />}
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-center">
                                        <div className="lg:col-span-2 space-y-6">
                                            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
                                                {choice === 'yes'
                                                    ? "Our industry mentors are ready to guide you through your design journey. Excellence awaits."
                                                    : "Unsure about your path? Our career counselors will help identify your creative strengths."
                                                }
                                            </p>
                                            <div className="flex items-center gap-3 text-primary">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Institutional Intake 2026</span>
                                            </div>
                                        </div>

                                        <div className="lg:col-span-3">
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="relative group">
                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                        <input
                                                            required
                                                            type="text"
                                                            placeholder="Full Name"
                                                            className="w-full h-14 bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary/50 transition-all font-bold text-sm"
                                                            value={formData.name}
                                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="flex items-stretch h-14 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden focus-within:border-secondary/50 transition-all">
                                                        <div className="flex items-center px-4 bg-slate-100 border-r border-slate-200 gap-2">
                                                            <Phone className="w-4 h-4 text-slate-500" />
                                                            <span className="text-slate-400 font-bold text-xs">+91</span>
                                                        </div>
                                                        <input
                                                            required
                                                            type="tel"
                                                            inputMode="numeric"
                                                            placeholder="00000 00000"
                                                            className="flex-1 h-full bg-transparent px-4 text-slate-900 placeholder-slate-400 focus:outline-none font-bold text-sm"
                                                            value={formData.mobile}
                                                            onChange={(e) => {
                                                                const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                                setFormData({ ...formData, mobile: digits });
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="relative group">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                    <input
                                                        type="email"
                                                        placeholder="Email Address (Optional)"
                                                        className="w-full h-14 bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary/50 transition-all font-bold text-sm"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="relative">
                                                        <div
                                                            onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                                                            className="w-full h-14 bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 text-slate-900 flex items-center justify-between cursor-pointer focus-within:border-primary/50 hover:bg-slate-100 transition-all font-bold text-sm group"
                                                        >
                                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                                                            <span className={formData.state ? "text-slate-900" : "text-slate-400"}>
                                                                {formData.state || "Select State"}
                                                            </span>
                                                            <motion.div animate={{ rotate: isStateDropdownOpen ? 180 : 0 }}>
                                                                <ArrowRight className="w-4 h-4 rotate-90 opacity-40" />
                                                            </motion.div>
                                                        </div>

                                                        <AnimatePresence>
                                                            {isStateDropdownOpen && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    exit={{ opacity: 0, y: 10 }}
                                                                    className="absolute z-50 left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white border border-slate-100 rounded-xl shadow-2xl custom-scrollbar"
                                                                >
                                                                    {Object.keys(stateCityData).map((state) => (
                                                                        <div
                                                                            key={state}
                                                                            onClick={() => {
                                                                                setFormData({ ...formData, state: state, city: '' });
                                                                                setIsStateDropdownOpen(false);
                                                                            }}
                                                                            className="px-6 py-3 hover:bg-primary hover:text-white cursor-pointer transition-colors text-sm font-bold text-slate-600"
                                                                        >
                                                                            {state}
                                                                        </div>
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>

                                                    <div className="relative">
                                                        <div
                                                            onClick={() => formData.state && setIsCityDropdownOpen(!isCityDropdownOpen)}
                                                            className={`w-full h-14 bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 text-slate-900 flex items-center justify-between cursor-pointer focus-within:border-primary/50 hover:bg-slate-100 transition-all font-bold text-sm group ${!formData.state ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        >
                                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                                                            <span className={formData.city ? "text-slate-900" : "text-slate-400"}>
                                                                {formData.city || (formData.state ? "Select City" : "Choose State First")}
                                                            </span>
                                                            <motion.div animate={{ rotate: isCityDropdownOpen ? 180 : 0 }}>
                                                                <ArrowRight className="w-4 h-4 rotate-90 opacity-40" />
                                                            </motion.div>
                                                        </div>

                                                        <AnimatePresence>
                                                            {isCityDropdownOpen && formData.state && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    exit={{ opacity: 0, y: 10 }}
                                                                    className="absolute z-40 left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white border border-slate-100 rounded-xl shadow-2xl custom-scrollbar"
                                                                >
                                                                    {stateCityData[formData.state].map((city) => (
                                                                        <div
                                                                            key={city}
                                                                            onClick={() => {
                                                                                setFormData({ ...formData, city: city });
                                                                                setIsCityDropdownOpen(false);
                                                                            }}
                                                                            className="px-6 py-3 hover:bg-primary hover:text-white cursor-pointer transition-colors text-sm font-bold text-slate-600"
                                                                        >
                                                                            {city}
                                                                        </div>
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>

                                                {/* Marketing Consent */}
                                                <div className="pt-2 pb-2">
                                                    <label className="flex items-start gap-4 cursor-pointer group/consent">
                                                        <div className={`mt-1 md:mt-0 w-6 h-6 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${formData.marketingConsent ? 'bg-primary border-primary shadow-[0_0_15px_rgba(219,52,54,0.4)]' : 'border-slate-200 hover:border-primary/40 bg-slate-50'}`}>
                                                            {formData.marketingConsent && <ArrowRight className="text-white w-4 h-4" />}
                                                        </div>
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.marketingConsent}
                                                            onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
                                                            className="hidden"
                                                        />
                                                        <span className="text-slate-500 text-[10px] md:text-xs font-medium select-none group-hover/consent:text-slate-900 transition-colors">
                                                            I agree to give my consent to receive updates through SMS/Email*
                                                        </span>
                                                    </label>
                                                </div>

                                                {error && (
                                                    <div className="p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 animate-fade-in">
                                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                                                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">{error}</span>
                                                    </div>
                                                )}

                                                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                                    <button
                                                        disabled={loading}
                                                        type="submit"
                                                        className="flex-1 h-16 md:h-20 bg-primary text-white rounded-full font-black uppercase tracking-[0.25em] text-sm md:text-base hover:bg-slate-950 transition-all duration-500 shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
                                                    >
                                                        {loading ? "Processing..." : "Submit Request"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => { setChoice(null); }}
                                                        className="px-6 h-14 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all font-black uppercase tracking-widest text-xs flex items-center justify-center"
                                                    >
                                                        <ArrowLeft className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {submitted && (
                            <motion.div
                                key="success-state"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white p-12 md:p-20 rounded-[4rem] text-center text-slate-950 relative overflow-hidden border border-slate-100 shadow-3xl"
                            >
                                {isModal && showClose && (
                                    <button
                                        onClick={() => closeAdmissionModal()}
                                        className="absolute top-6 right-6 md:top-10 md:right-10 p-2 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all border border-slate-100 group z-50"
                                    >
                                        <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                    </button>
                                )}

                                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-secondary to-primary" />
                                <div className="p-8 inline-flex bg-primary/10 rounded-3xl mb-8">
                                    <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Request Sent</h2>
                                <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto font-medium">
                                    Thank you, {formData.name.split(' ')[0]}! Our mentor will connect with you within 24 business hours.
                                </p>
                                <button
                                    onClick={() => { setChoice(null); setSubmitted(false); if (isModal) closeAdmissionModal(); }}
                                    className="px-10 py-4 bg-slate-950 hover:bg-primary text-white rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all"
                                >
                                    Finish
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );

    if (isModal) return content;

    return (
        <section ref={sectionRef} id="step-lead-form">
            {content}
        </section>
    );
};

export default StepLeadForm;
