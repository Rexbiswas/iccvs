import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MapPin, Building2, BookOpen, GraduationCap, CheckCircle2, AlertCircle, ChevronDown, Send } from 'lucide-react';

const AdmissionForm = ({ isModal = false, title, subtitle }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        state: '',
        city: '',
        program: '',
        course: '',
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

    const programs = [
        "Industry Diploma",
        "PG Degree",
        "UG Degree",
        "certificate course"
    ];

    const courses = [
        "Fashion Design",
        "Interior Design",
        "Graphic Design",
        "Animation & VFX",
        "Jewellery Design",
        "UI/UX Design",
        "Beauty & Makeup",
        "Photography",
        "Textile Design"
    ];

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
        
        // Validate 10-digit mobile number
        if (formData.phone.length !== 10) {
            setErrorMessage('Please enter a valid 10-digit mobile number');
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

            // Robust Content-Type Check
            const contentType = response.headers.get("content-type");
            let data;
            
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                // If it's not JSON, it's likely a server error page (HTML)
                const text = await response.text();
                console.error("Non-JSON response received:", text.substring(0, 200));
                throw new Error(`Server returned non-JSON response (${response.status})`);
            }

            if (response.ok) {
                setStatus('success');
                const submittedName = formData.name;
                setFormData({
                    name: '', email: '', phone: '', state: '', city: '', 
                    program: '', course: '', marketingConsent: false
                });
                
                // Set flag to prevent duplicate submissions
                // localStorage.setItem('admission-form-filled', 'true');

                // Redirect to Thank You page
                setTimeout(() => {
                    navigate('/thank-you', { state: { name: submittedName, type: 'admission' } });
                }, 300);
            } else {
                setErrorMessage(data.message || `Server Error (${response.status}): Submission failed.`);
                setStatus('error');
            }
        } catch (error) {
            console.error('Submission Error:', error);
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
                className={`w-full max-w-4xl mx-auto ${isModal ? 'p-8' : 'p-12'} bg-slate-900 rounded-4xl border border-primary/20 text-center space-y-8`}
            >
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto border border-primary/30">
                    <CheckCircle2 className="text-primary w-10 h-10" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Application Received</h2>
                    <p className="text-slate-400 text-lg max-w-md mx-auto">
                        Thank you for your interest in INSD. Our admissions team will get back to you within two business days.
                    </p>
                </div>
                <button 
                    onClick={() => setStatus('idle')}
                    className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white hover:text-black transition-all"
                >
                    Submit Another Inquiry
                </button>
            </motion.div>
        );
    }

    return (
        <div id="admission-form" className={`w-full max-w-6xl mx-auto bg-black ${isModal ? '' : 'rounded-4xl'} overflow-hidden shadow-2xl border border-white/5 relative group`}>
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 opacity-50 pointer-events-none" />
            
            <form onSubmit={handleSubmit} className={`relative z-10 ${isModal ? 'p-6 md:p-10' : 'p-8 md:p-16'} space-y-8 md:space-y-12`}>
                {/* Header Subtitle */}
                <div className="space-y-4 text-center max-w-3xl mx-auto mb-6 md:mb-10">
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="w-8 h-px bg-primary/30" />
                        <span className="text-primary font-black uppercase text-[10px] tracking-[0.4em]">
                            {title ? "Priority Access" : "Your Creative Journey"}
                        </span>
                        <div className="w-8 h-px bg-primary/30" />
                    </div>
                    <h2 className="text-white text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                        {title || "Admission Form"}
                    </h2>
                    <p className="text-slate-400 font-medium text-sm md:text-lg leading-relaxed px-4 opacity-70">
                        {subtitle || "Take the first step towards a career in creative excellence."}
                    </p>
                </div>

                <div className="flex flex-col space-y-5 max-w-2xl mx-auto">
                    {/* Personal Info */}
                    <div className="relative group/field">
                         <input 
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text" 
                            placeholder="Full Name *" 
                            className="w-full h-15 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:bg-white/10 focus:ring-4 focus:ring-primary/10 transition-all font-bold text-sm md:text-base shadow-inner"
                         />
                         <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/field:text-primary transition-colors" size={18} />
                    </div>

                    <div className="relative group/field">
                             <input 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="text" 
                                placeholder="Email Address (Optional)" 
                                className="w-full h-15 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:bg-white/10 focus:ring-4 focus:ring-primary/10 transition-all font-bold text-sm md:text-base shadow-inner"
                             />
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/field:text-primary transition-colors" size={18} />
                    </div>

                    <div className="relative group/field">
                        <div className="flex items-stretch h-15 bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all shadow-inner">
                            <div className="flex items-center px-4 bg-white/5 border-r border-white/10 gap-3">
                                <Phone className="text-slate-500 group-focus-within/field:text-primary transition-colors" size={18} />
                                <span className="text-slate-400 font-bold text-sm md:text-base">+91</span>
                            </div>
                            <input 
                                required
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                type="tel" 
                                inputMode="numeric"
                                placeholder="Mobile Number *" 
                                className="flex-1 bg-transparent px-4 text-white placeholder-slate-500 focus:outline-none font-bold text-sm md:text-base"
                            />
                        </div>
                    </div>

                    {/* Preferences Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="relative group/field">
                            <select 
                                required
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full h-15 bg-white/5 border border-white/10 rounded-2xl pl-12 px-8 text-white font-bold focus:outline-none focus:border-primary appearance-none cursor-pointer placeholder-slate-500 text-sm md:text-base shadow-inner"
                            >
                                <option value="" disabled className="bg-slate-900">Select State *</option>
                                {states.map(state => <option key={state} value={state} className="bg-slate-900">{state}</option>)}
                            </select>
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/field:text-primary transition-colors" size={18} />
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={14} />
                        </div>

                        <div className="relative group/field">
                            <select 
                                required
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full h-15 bg-white/5 border border-white/10 rounded-2xl pl-12 px-8 text-white font-bold focus:outline-none focus:border-primary appearance-none cursor-pointer disabled:opacity-50 text-sm md:text-base shadow-inner"
                                disabled={!formData.state}
                            >
                                <option value="" disabled className="bg-slate-900">Select City *</option>
                                {formData.state && stateCityData[formData.state]?.map(city => (
                                    <option key={city} value={city} className="bg-slate-900">{city}</option>
                                ))}
                            </select>
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/field:text-primary transition-colors" size={18} />
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={14} />
                        </div>

                        <div className="relative group/field">
                            <select 
                                required
                                name="program"
                                value={formData.program}
                                onChange={handleChange}
                                className="w-full h-15 bg-white/5 border border-white/10 rounded-2xl pl-12 px-8 text-white font-bold focus:outline-none focus:border-primary appearance-none cursor-pointer text-sm md:text-base shadow-inner"
                            >
                                <option value="" disabled className="bg-slate-900">Select Program *</option>
                                {programs.map(prog => <option key={prog} value={prog} className="bg-slate-900">{prog}</option>)}
                            </select>
                            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/field:text-primary transition-colors" size={18} />
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={14} />
                        </div>

                        <div className="relative group/field">
                            <select 
                                required
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                className="w-full h-15 bg-white/5 border border-white/10 rounded-2xl pl-12 px-8 text-white font-bold focus:outline-none focus:border-primary appearance-none cursor-pointer text-sm md:text-base shadow-inner"
                            >
                                <option value="" disabled className="bg-slate-900">Select Course *</option>
                                {courses.map(course => <option key={course} value={course} className="bg-slate-900">{course}</option>)}
                            </select>
                            <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/field:text-primary transition-colors" size={18} />
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={14} />
                        </div>
                    </div>
                </div>

                {/* Consent Checkbox */}
                <div className="flex flex-col items-center justify-center space-y-8 pt-4">
                    <label className="flex items-start gap-4 cursor-pointer group/consent max-w-xl">
                        <div className={`mt-1 w-6 h-6 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${formData.marketingConsent ? 'bg-primary border-primary shadow-[0_0_15px_rgba(219,52,54,0.4)]' : 'border-white/20 hover:border-white/40 bg-white/5'}`}>
                            {formData.marketingConsent && <CheckCircle2 className="text-white w-4 h-4" />}
                        </div>
                        <input 
                            type="checkbox" 
                            name="marketingConsent"
                            checked={formData.marketingConsent}
                            onChange={handleChange}
                            className="hidden" 
                        />
                        <span className="text-slate-400 text-xs md:text-sm font-medium select-none group-hover/consent:text-white transition-colors">
                            I agree to give my consent to receive updates through SMS/Email*
                        </span>
                    </label>

                    {status === 'error' && (
                        <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-6 py-3 rounded-full border border-red-500/20">
                            <AlertCircle size={16} />
                            <span className="text-sm font-bold uppercase tracking-wider">{errorMessage}</span>
                        </div>
                    )}

                    <button 
                        type="submit"
                        disabled={status === 'loading'}
                        className="group relative w-full md:w-[400px] h-20 bg-primary text-white rounded-full overflow-hidden shadow-2xl transition-all active:scale-95 disabled:opacity-50"
                    >
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                        <span className="relative z-10 flex items-center justify-center gap-4 text-xl md:text-2xl font-black uppercase tracking-widest group-hover:text-black transition-colors">
                            {status === 'loading' ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Submit Inquiry
                                    <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                                </>
                            )}
                        </span>
                    </button>
                    
                    
                </div>
            </form>
        </div>
    );
};

export default AdmissionForm;
