import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, ChevronDown, Send } from 'lucide-react';
import { stateCityData } from '../data/locations';

const AdmissionFormWhite = ({ isModal = false, onClose, title, subtitle, ctaText, successMsg }) => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        state: '',
        city: '',
        referred: false
    });

    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const states = ["Select State", ...Object.keys(stateCityData)];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
            ...(name === 'state' ? { city: '' } : {})
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        
        try {
            const response = await fetch('/api/admission', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    mobile: formData.mobile,
                    email: formData.email,
                    state: formData.state,
                    city: formData.city,
                    referred: formData.referred
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setFormData({
                    name: '', mobile: '', email: '', state: '', city: '', referred: false
                });
            } else {
                alert(data.message || "Something went wrong. Please try again.");
                setStatus('idle');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert(`Connection Error: ${error.message || "Please check your internet."}`);
            setStatus('idle');
        }
    };

    const benefits = [
        "Limited Intakes Annually",
        "Expert Career Counseling"
    ];

    if (status === 'success') {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl mx-auto p-12 bg-white rounded-[2rem] text-center space-y-8 shadow-2xl border border-slate-100"
            >
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto border-2 border-green-100">
                    <CheckCircle2 className="text-green-500 w-12 h-12" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-4xl font-black text-slate-900 leading-tight">Registration <span className="text-green-500">successful!</span></h2>
                    <p className="text-slate-600 text-xl font-medium">
                        {successMsg || "Thank you for your interest. One of our senior counselors will call you within 24 hours."}
                    </p>
                </div>
                <button 
                    onClick={() => setStatus('idle')}
                    className="px-12 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-xl hover:shadow-2xl active:scale-95 uppercase tracking-widest"
                >
                    Submit Another Inquiry
                </button>
            </motion.div>
        );
    }

    return (
        <div className={`w-full max-w-6xl mx-auto overflow-hidden bg-white md:rounded-[2rem] shadow-2xl flex flex-col md:flex-row relative ${isModal ? 'max-h-[95vh] md:max-h-[90vh]' : 'my-4 md:my-10 animate-fade-in'}`}>


            {/* Absolute Close Button for Modal (Visible on all devices, top right) */}
            {isModal && (
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 md:p-3 rounded-full bg-white/90 md:bg-slate-50 text-slate-400 hover:bg-[#db3436] hover:text-white transition-all border border-slate-100 shadow-xl group backdrop-blur-sm"
                >
                    <X size={20} className="md:w-6 md:h-6 group-hover:rotate-90 transition-transform" />
                </button>
            )}

            {/* Left Content - Marketing */}
            <div className={`w-full md:w-[45%] bg-gradient-to-br from-[#134a84] to-[#db3436] text-white flex flex-col justify-between relative overflow-hidden ${isModal ? 'h-[200px] md:h-auto' : 'min-h-[200px] md:min-h-[650px]'}`}>
                {/* Background decorative glows removed */}

                <div className="p-4 md:p-10 relative z-10 flex flex-col h-full items-center text-center justify-center">
                    <div className="space-y-3 md:space-y-8 flex flex-col items-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full w-fit">
                            <div className="w-1.5 h-1.5 bg-[#db3436] rounded-full animate-pulse" />
                            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-black text-white">Limited Seats Available</span>
                        </div>

                        <h2 className="text-xl md:text-4xl font-black leading-tight tracking-tight">
                            Start Your<br className="hidden md:block" />
                            <span className="text-[#db3436] ml-2 md:ml-0">Creative Career</span><br className="hidden md:block" />
                            <span className="ml-2 md:ml-0">Today</span>
                        </h2>

                        <p className="text-white font-bold text-[10px] md:text-sm max-w-[280px] leading-relaxed opacity-80 hidden md:block">
                            Limited Intakes Annually. Enroll Now to Secure Your Seat!
                        </p>

                        <div className="flex md:flex-col items-center gap-4 md:gap-3 pt-1 w-full justify-center">
                            {benefits.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-2 md:gap-3">
                                    <div className="w-3.5 h-3.5 md:w-4 md:h-4 bg-[#db3436] rounded-full flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-2 md:w-2.5 h-2 md:h-2.5 text-white" strokeWidth={5} />
                                    </div>
                                    <span className="text-[10px] md:text-sm font-bold text-white tracking-tight">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Content - Form */}
            <div className={`flex-1 bg-white flex flex-col relative ${isModal ? 'overflow-y-auto max-h-[65vh] md:max-h-full' : ''}`}>
                {/* Visual Accent Line on far right */}
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-[#db3436] opacity-10 pointer-events-none hidden md:block" />
                <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-[#db3436] opacity-30 pointer-events-none hidden md:block" />
                
                <div className="p-5 md:p-10 space-y-5 md:space-y-8">
                    <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1">
                            <h3 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight uppercase">
                                {title || "Talk to our Career Expert"}
                            </h3>
                            <p className="text-slate-500 font-bold text-sm md:text-base">
                                {subtitle || "Our experts will call you within 24 hours"}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                        {/* Name Field */}
                        <div className="space-y-1">
                            <label className="text-[10px] md:text-xs font-black text-slate-800 ml-1 uppercase tracking-wider">Full Name</label>
                            <input 
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                                className="w-full h-11 md:h-14 px-5 bg-slate-50/50 border border-slate-200 rounded-xl md:rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#134a84]/5 focus:border-[#134a84] transition-all text-slate-900 font-bold text-sm md:text-base placeholder:text-slate-300"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {/* Mobile Number Field */}
                            <div className="space-y-1">
                                <label className="text-[10px] md:text-xs font-black text-slate-800 ml-1 uppercase tracking-wider">Mobile Number</label>
                                <input 
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder="+91 00000 00000"
                                    required
                                    className="w-full h-11 md:h-14 px-5 bg-slate-50/50 border border-slate-200 rounded-xl md:rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#134a84]/5 focus:border-[#134a84] transition-all text-slate-900 font-bold text-sm md:text-base placeholder:text-slate-300"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="space-y-1">
                                <label className="text-[10px] md:text-xs font-black text-slate-800 ml-1 uppercase tracking-wider">Email Address</label>
                                <input 
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="yourname@gmail.com"
                                    required
                                    className="w-full h-11 md:h-14 px-5 bg-slate-50/50 border border-slate-200 rounded-xl md:rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#134a84]/5 focus:border-[#134a84] transition-all text-slate-900 font-bold text-sm md:text-base placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {/* State Dropdown */}
                            <div className="space-y-1">
                                <label className="text-[10px] md:text-xs font-black text-slate-800 ml-1 uppercase tracking-wider">State</label>
                                <div className="relative">
                                    <select 
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-11 md:h-14 px-5 bg-slate-50/50 border border-slate-200 rounded-xl md:rounded-2xl focus:outline-none focus:border-[#134a84] appearance-none text-slate-900 font-bold text-sm md:text-base cursor-pointer"
                                    >
                                        {states.map(opt => (
                                            <option key={opt} value={opt === states[0] ? "" : opt} disabled={opt === states[0]}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <ChevronDown size={18} />
                                    </div>
                                </div>
                            </div>

                            {/* City Dropdown */}
                            <div className="space-y-1">
                                <label className="text-[10px] md:text-xs font-black text-slate-800 ml-1 uppercase tracking-wider">City</label>
                                <div className="relative">
                                    <select 
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        disabled={!formData.state}
                                        required
                                        className="w-full h-11 md:h-14 px-5 bg-slate-50/50 border border-slate-200 rounded-xl md:rounded-2xl focus:outline-none focus:border-[#134a84] appearance-none text-slate-900 font-bold text-sm md:text-base cursor-pointer disabled:opacity-50"
                                    >
                                        <option value="">Select City</option>
                                        {(formData.state ? stateCityData[formData.state] : []).map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <ChevronDown size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Referral Checkbox */}
                        <div className="pt-1">
                            <label className="flex items-center gap-3 cursor-pointer group select-none">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.referred ? 'bg-[#134a84] border-[#134a84]' : 'border-slate-200 group-hover:border-slate-300'}`}>
                                    {formData.referred && <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={4} />}
                                </div>
                                <input 
                                    type="checkbox" 
                                    name="referred" 
                                    checked={formData.referred} 
                                    onChange={handleChange} 
                                    className="hidden" 
                                />
                                <span className="text-slate-600 font-bold text-xs md:text-sm">Referral?</span>
                            </label>
                        </div>

                        {/* Submit Button */ }
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full h-16 md:h-20 bg-linear-to-r from-[#134a84] to-[#db3436] hover:brightness-110 disabled:opacity-50 text-white font-black uppercase tracking-[0.25em] text-sm md:text-base rounded-full transition-all shadow-2xl hover:shadow-[0_10px_40px_-10px_rgba(219,52,54,0.6)] active:scale-[0.95] mt-4 flex items-center justify-center gap-3"
                        >
                            {status === 'loading' ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    {ctaText || "REQUEST CALLBACK"}
                                    <Send size={18} className="rotate-[-10deg]" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default AdmissionFormWhite;


