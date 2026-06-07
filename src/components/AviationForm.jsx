import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Mail,
    Phone,
    ChevronDown,
    CheckCircle2,
    AlertCircle,
    Send,
    X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const AviationForm = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

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

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('hide-navbar');
        } else {
            document.body.classList.remove('hide-navbar');
        }
        return () => {
            document.body.classList.remove('hide-navbar');
        };
    }, [isOpen]);

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
                navigate('/aviation-thankyou', { state: { name: submittedName } });
                setFormData({
                    name: '', email: '', phone: '', state: '', city: '', 
                    program: 'certificate course', course: 'Aviation & Cabin Crew', marketingConsent: false
                });
                onClose();
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

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                    {/* Backdrop Click */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 cursor-pointer"
                    />

                    {/* Modal Content container */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                        className="relative z-10 w-full max-w-lg bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl overflow-hidden border border-slate-100"
                    >
                        {/* Close Button */}
                        <button 
                            onClick={onClose}
                            className="absolute right-6 top-6 z-30 p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-full border border-slate-100 transition-colors shadow-xs"
                        >
                            <X size={16} />
                        </button>

                        <div className="relative z-10 space-y-6">
                            <div className="text-left space-y-2">
                                <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900">Talk to our experts</h3>
                                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Request a call back and plan your career path.</p>
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
                                        className="w-full h-12 bg-white border border-slate-200 rounded-xl pl-10 pr-4 text-slate-900 text-sm placeholder-slate-455 focus:outline-none focus:border-[#db3436] focus:ring-4 focus:ring-[#db3436]/10 transition-all font-bold"
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
                                        className="w-full h-12 bg-white border border-slate-200 rounded-xl pl-10 pr-4 text-slate-900 text-sm placeholder-slate-455 focus:outline-none focus:border-[#db3436] focus:ring-4 focus:ring-[#db3436]/10 transition-all font-bold"
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
                                            className="flex-1 h-full bg-transparent px-3 text-slate-900 text-sm placeholder-slate-455 focus:outline-none font-bold"
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
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AviationForm;
