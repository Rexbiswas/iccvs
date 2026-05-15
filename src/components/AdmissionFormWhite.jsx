import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, ChevronDown, Send } from 'lucide-react';
import { stateCityData } from '../data/locations';

const AdmissionFormWhite = ({ isModal = false, onClose, title, subtitle, ctaText, successMsg }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        qualification: '',
        course: '',
        state: '',
        city: ''
    });

    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const states = ["Select State", ...Object.keys(stateCityData)];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        let finalValue = type === 'checkbox' ? checked : value;
        
        // Only allow 10 digit numbers for mobile field
        if (name === 'mobile') {
            finalValue = value.replace(/\D/g, '').slice(0, 10);
        }

        setFormData(prev => ({
            ...prev,
            [name]: finalValue,
            ...(name === 'state' ? { city: '' } : {})
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate 10-digit mobile number
        if (formData.mobile.length !== 10) {
            setErrorMessage('Please enter a valid 10-digit mobile number');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMessage('');
        
        try {
            const response = await fetch('/api/admission', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    mobile: `+91${formData.mobile}`
                }),
            });

            // Handle non-JSON or error responses
            const contentType = response.headers.get("content-type");
            let data;

            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.error("Non-JSON response received:", text.substring(0, 200));
                throw new Error(`Server Error (${response.status})`);
            }

            if (response.ok || data.success) {
                setStatus('success');
                setFormData({
                    name: '', mobile: '', email: '', qualification: '', course: '', state: '', city: ''
                });
                
                // Set flag to prevent duplicate submissions
                // localStorage.setItem('admission-form-filled', 'true');

                // Redirect to Thank You page after a brief delay
                setTimeout(() => {
                    if (onClose) onClose(); 
                    navigate('/thank-you', { state: { name: formData.name, type: title?.toLowerCase().includes('report') ? 'report' : 'admission' } });
                }, 300);
            } else {
                setErrorMessage(data.message || `Server Error (${response.status}): Submission failed.`);
                setStatus('error');
            }
        } catch (error) {
            console.error('Submission Error:', error);
            
            // --- DEVELOPMENT FALLBACK ---
            // If testing on localhost and backend fails, simulate success to show the Thank You page flow
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.warn('Backend unavailable on localhost. Simulating success for testing purposes.');
                setStatus('success');
                setTimeout(() => {
                    if (onClose) onClose();
                    navigate('/thank-you', { state: { name: formData.name, type: title?.toLowerCase().includes('report') ? 'report' : 'admission' } });
                }, 300);
                return;
            }

            if (error.name === 'TypeError') {
                setErrorMessage("Connection Error: Server is unreachable. Please check your internet.");
            } else {
                setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
            }
            setStatus('error');
        }
    };


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

            {/* Left Content - Marketing - Redesigned for Premium UI */}
            <div className={`w-full md:w-[42%] bg-gradient-to-br from-[#134a84] via-[#134a84] to-[#db3436] text-white flex flex-col justify-center relative overflow-hidden ${isModal ? 'h-[250px] md:h-auto' : 'min-h-[300px] md:min-h-[650px]'}`}>
                {/* Decorative background element */}
                <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#db3436]/20 rounded-full blur-3xl pointer-events-none" />

                <div className="p-8 md:p-12 relative z-10 text-center space-y-4 md:space-y-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-2xl md:text-5xl font-black leading-[1.1] tracking-tighter uppercase italic drop-shadow-2xl">
                            Are you ready <br />
                            <span className="text-white/90">to be part of this</span><br />
                            <span className="text-[#db3436] drop-shadow-[0_0_15px_rgba(219,52,54,0.4)] not-italic">
                                Billion-dollar <br />
                                Industry?
                            </span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className="w-12 h-1 bg-white/20 rounded-full" />
                        <p className="text-white/80 font-black text-sm md:text-xl uppercase tracking-[0.2em] drop-shadow-lg">
                            Start your creative <br className="hidden md:block" />
                            career today!
                        </p>
                    </motion.div>
                </div>

                {/* Subtle bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-linear-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Right Content - Form */}
            <div className={`flex-1 bg-white flex flex-col relative ${isModal ? 'overflow-y-auto max-h-[65vh] md:max-h-full' : ''}`}>
                {/* Visual Accent Line on far right */}
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-[#db3436] opacity-10 pointer-events-none hidden md:block" />
                <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-[#db3436] opacity-30 pointer-events-none hidden md:block" />
                
                <div className="p-4 md:p-8 space-y-4 md:space-y-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1">
                            <h3 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight uppercase">
                                {title || "TALK TO OUR EXPERTS"}
                            </h3>
                            <p className="text-slate-500 font-bold text-sm md:text-base">
                                {subtitle || "Our experts will call you within 24 hours"}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
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
                                    className="w-full h-10 md:h-12 px-5 bg-slate-50/50 border border-slate-200 rounded-xl md:rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#134a84]/5 focus:border-[#134a84] transition-all text-slate-900 font-bold text-sm md:text-base placeholder:text-slate-300"
                                />
                            </div>

                            {/* Email Field - Optional for Remarketing */}
                            <div className="space-y-1">
                                <label className="text-[10px] md:text-xs font-black text-slate-800 ml-1 uppercase tracking-wider">Email Address (Optional)</label>
                                <input 
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full h-10 md:h-12 px-5 bg-slate-50/50 border border-slate-200 rounded-xl md:rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#134a84]/5 focus:border-[#134a84] transition-all text-slate-900 font-bold text-sm md:text-base placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {/* Phone Number Field */}
                            <div className="space-y-1">
                                <label className="text-[10px] md:text-xs font-black text-slate-800 ml-1 uppercase tracking-wider">Phone Number</label>
                                <div className="flex items-stretch h-10 md:h-12 bg-slate-50/50 border border-slate-200 rounded-xl md:rounded-2xl overflow-hidden focus-within:ring-4 focus-within:ring-[#134a84]/5 focus-within:border-[#134a84] transition-all">
                                    <div className="flex items-center px-4 bg-slate-100 border-r border-slate-200">
                                        <span className="text-slate-500 font-bold text-xs md:text-sm">+91</span>
                                    </div>
                                    <input 
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="00000 00000"
                                        required
                                        inputMode="numeric"
                                        className="flex-1 h-full px-4 bg-transparent focus:outline-none text-slate-900 font-bold text-sm md:text-base placeholder:text-slate-300"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] md:text-xs font-black text-slate-800 ml-1 uppercase tracking-wider">Highest Qualification</label>
                                <div className="relative">
                                    <select 
                                        name="qualification"
                                        value={formData.qualification}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-10 md:h-12 px-5 bg-slate-50/50 border border-slate-200 rounded-xl md:rounded-2xl focus:outline-none focus:border-[#134a84] appearance-none text-slate-900 font-bold text-sm md:text-base cursor-pointer"
                                    >
                                        <option value="" disabled>Select Qualification</option>
                                        <option value="Completed 10th">Completed 10th</option>
                                        <option value="Completed 12th">Completed 12th</option>
                                        <option value="Graduate">Graduate</option>
                                        <option value="Postgraduate">Postgraduate</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <ChevronDown size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Course of Interest - Full Width for Balance */}
                        <div className="grid grid-cols-1">
                            <div className="space-y-1">
                                <label className="text-[10px] md:text-xs font-black text-slate-800 ml-1 uppercase tracking-wider">Course of Interest</label>
                                <div className="relative">
                                    <select 
                                        name="course"
                                        value={formData.course}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-10 md:h-12 px-5 bg-slate-50/50 border border-slate-200 rounded-xl md:rounded-2xl focus:outline-none focus:border-[#134a84] appearance-none text-slate-900 font-bold text-sm md:text-base cursor-pointer"
                                    >
                                        <option value="" disabled>Select Course</option>
                                        <option value="Fashion Design">Fashion Design</option>
                                        <option value="Interior Design">Interior Design</option>
                                        <option value="Graphic Design">Graphic Design</option>
                                        <option value="Animation VFX">Animation VFX</option>
                                        <option value="UI/UX Design">UI/UX Design</option>
                                        <option value="Jewellery Design">Jewellery Design</option>
                                        <option value="Photography">Photography</option>
                                        <option value="Beauty Make-up">Beauty Make-up</option>
                                        <option value="Textile Design">Textile Design</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <ChevronDown size={18} />
                                    </div>
                                </div>
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
                                        className="w-full h-10 md:h-12 px-5 bg-slate-50/50 border border-slate-200 rounded-xl md:rounded-2xl focus:outline-none focus:border-[#134a84] appearance-none text-slate-900 font-bold text-sm md:text-base cursor-pointer"
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
                                        className="w-full h-10 md:h-12 px-5 bg-slate-50/50 border border-slate-200 rounded-xl md:rounded-2xl focus:outline-none focus:border-[#134a84] appearance-none text-slate-900 font-bold text-sm md:text-base cursor-pointer disabled:opacity-50"
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

                        {status === 'error' && (
                            <div className="p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 animate-fade-in">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                                <span className="text-xs font-bold uppercase tracking-wider">{errorMessage}</span>
                            </div>
                        )}

                        {/* Submit Button */ }
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full h-11 md:h-13 bg-linear-to-r from-[#134a84] to-[#db3436] hover:brightness-110 disabled:opacity-50 text-white font-black uppercase tracking-[0.25em] text-sm md:text-base rounded-full transition-all shadow-2xl hover:shadow-[0_10px_40px_-10px_rgba(219,52,54,0.6)] active:scale-[0.95] mt-2 flex items-center justify-center gap-3"
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


