import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, MapPin, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Building, Briefcase, GraduationCap, Monitor, Palette, Hexagon, Star } from 'lucide-react';

const AdmissionStepForm = () => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        readyToStart: '',
        industry: '',
        name: '',
        phone: '',
        email: '',
        city: '',
        qualification: '',
        marketingConsent: false
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const TOTAL_STEPS = 4;

    const handleNext = () => {
        if (step < TOTAL_STEPS) setStep(step + 1);
        scrollToTop();
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
        scrollToTop();
    };

    const scrollToTop = () => {
        setTimeout(() => {
            if (sectionRef.current) {
                const navHeight = 100;
                const elementPosition = sectionRef.current.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 100);
    };

    const handleOptionSelect = (field, value, autoAdvance = true) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (autoAdvance) {
            setTimeout(() => {
                // If user clicks "No" on step 1, jump to submittion state as requested
                if (field === 'readyToStart' && value === 'No') {
                    handleSubmit();
                    return;
                }

                if (step === TOTAL_STEPS) {
                    handleSubmit();
                } else {
                    handleNext();
                }
            }, 300);
        }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/admission', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            
            if (response.ok && data.success) {
                setSubmitted(true);
                setTimeout(() => {
                    navigate('/thank-you', { state: { name: formData.name, type: 'admission' } });
                }, 1000);
            } else {
                setError(data.message || 'Submission failed. Please try again.');
                console.error('Submission failed:', data.message);
                
                // If it's a conflict (duplicate), scroll to the error
                scrollToTop();
            }
        } catch (err) {
            console.error('Submission error:', err);
            setError(err.message || "An unexpected error occurred. Please try again.");
            scrollToTop();
        } finally {
            setLoading(false);
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="space-y-8"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-clamp-3xl font-black uppercase tracking-tighter mb-4 text-slate-900 leading-[0.9]">
                                Start Your <br /> <span className="text-primary italic font-serif">Creative Career</span> <br /> Today
                            </h2>
                            <p className="text-slate-500 font-medium max-w-lg mx-auto text-lg">
                                Start your creative career with industry-standard protocols. Let's determine the right path for your talent.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto">
                            <button
                                onClick={() => handleOptionSelect('readyToStart', 'Yes')}
                                className={`flex-1 group relative h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${formData.readyToStart === 'Yes' ? 'border-primary bg-primary/10' : 'border-slate-200 hover:border-slate-950 bg-white'}`}
                            >
                                <div className="absolute inset-0 bg-slate-950 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                <span className={`relative z-10 text-2xl font-black uppercase tracking-widest flex items-center justify-center h-full transition-colors duration-300 ${formData.readyToStart === 'Yes' ? 'text-primary group-hover:text-white' : 'text-slate-950 group-hover:text-white'}`}>
                                    Yes
                                </span>
                            </button>
                            <button
                                onClick={() => handleOptionSelect('readyToStart', 'No')}
                                className={`flex-1 group relative h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${formData.readyToStart === 'No' ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 hover:border-slate-300 bg-white text-slate-400'}`}
                            >
                                <div className="absolute inset-0 bg-slate-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                <span className={`relative z-10 text-2xl font-black uppercase tracking-widest flex items-center justify-center h-full transition-colors duration-300 ${formData.readyToStart === 'No' ? 'text-white' : 'text-slate-400 group-hover:text-slate-950'}`}>
                                    No
                                </span>
                            </button>
                        </div>
                    </motion.div>
                );
            case 2:
                const industries = [
                    { name: 'Fashion Design', icon: <Star /> },
                    { name: 'Graphic Design', icon: <Palette /> },
                    { name: 'Interior Design', icon: <Building /> },
                    { name: 'Jewellery Design', icon: <Hexagon /> },
                    { name: 'Animation & VFX', icon: <Monitor /> },
                    { name: 'UIUX', icon: <Sparkles /> },
                ];
                return (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="space-y-8"
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-clamp-3xl font-black uppercase tracking-tighter mb-4 text-slate-900 leading-[0.9]">
                                Which Billion-dollar <br /> Industry <span className="text-secondary italic font-serif">Excites</span> You?
                            </h2>
                            <p className="text-slate-500 font-medium text-lg">Select a discipline to personalize your path.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {industries.map((ind, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleOptionSelect('industry', ind.name)}
                                    className={`relative p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-4 group ${formData.industry === ind.name ? 'border-primary bg-primary text-white shadow-xl scale-105' : 'border-slate-100 hover:border-primary/30 bg-white text-slate-700 hover:shadow-lg'}`}
                                >
                                    <div className={`p-5 rounded-full transition-all duration-500 ${formData.industry === ind.name ? 'bg-white/20 scale-110' : 'bg-slate-50 group-hover:bg-primary/5 group-hover:text-primary'}`}>
                                        {React.cloneElement(ind.icon, { size: 32 })}
                                    </div>
                                    <span className="font-bold text-sm md:text-base uppercase tracking-wider text-center">{ind.name}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="space-y-8"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-clamp-3xl font-black uppercase tracking-tighter mb-4 text-slate-900 leading-none">
                                Tell Us About <span className="text-primary italic font-serif">Yourself</span>
                            </h2>
                            <p className="text-slate-500 font-medium text-lg">We need these details to send you the admission brochure.</p>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="max-w-2xl mx-auto space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                        <input
                                            required
                                            type="text"
                                            placeholder="Jane Doe"
                                            className="w-full h-14 bg-white border-2 border-slate-200 rounded-xl pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-bold text-sm"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Phone Number</label>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                        <input
                                            required
                                            type="tel"
                                            placeholder="00000-00000"
                                            className="w-full h-14 bg-white border-2 border-slate-200 rounded-xl pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-bold text-sm"
                                            value={formData.phone}
                                            onChange={(e) => {
                                                setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">Email Address (Optional)</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="email"
                                            placeholder="jane@example.com"
                                            className="w-full h-14 bg-white border-2 border-slate-200 rounded-xl pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-bold text-sm"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-2">City</label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                        <input
                                            required
                                            type="text"
                                            placeholder="New Delhi"
                                            className="w-full h-14 bg-white border-2 border-slate-200 rounded-xl pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-bold text-sm"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <button type="submit" className="w-full h-16 md:h-20 bg-primary text-white rounded-full font-black uppercase tracking-[0.25em] text-sm md:text-base hover:bg-slate-950 hover:shadow-2xl transition-all duration-500 flex items-center justify-center gap-3 active:scale-[0.95]">
                                    Continue <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                );
            case 4:
                const qualifications = [
                    { name: "12th Appearing", icon: <GraduationCap /> },
                    { name: "12th Passed", icon: <GraduationCap /> },
                    { name: "Graduate", icon: <Briefcase /> },
                    { name: "Working Professional", icon: <Briefcase /> }
                ];
                return (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="space-y-8"
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-clamp-3xl font-black uppercase tracking-tighter mb-4 text-slate-900 leading-[0.9]">
                                Current <span className="text-primary italic font-serif">Qualification</span>
                            </h2>
                            <p className="text-slate-500 font-medium text-lg">Help us recommend the right programs for you.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                            {qualifications.map((qual, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleOptionSelect('qualification', qual.name, false)}
                                    className={`relative p-6 h-auto md:h-32 rounded-3xl border-2 transition-all duration-300 flex items-center justify-start gap-6 group ${formData.qualification === qual.name ? 'border-primary bg-primary/5 shadow-md scale-105' : 'border-slate-100 hover:border-slate-300 bg-white hover:shadow-lg'}`}
                                >
                                    <div className={`p-4 flex-shrink-0 rounded-full transition-all duration-500 ${formData.qualification === qual.name ? 'bg-primary text-white scale-110' : 'bg-slate-50 text-slate-500 group-hover:bg-slate-900 group-hover:text-white'}`}>
                                        {React.cloneElement(qual.icon, { size: 28 })}
                                    </div>
                                    <span className={`text-lg md:text-xl font-bold tracking-tight text-left transition-colors ${formData.qualification === qual.name ? 'text-primary' : 'text-slate-700 group-hover:text-slate-950'}`}>
                                        {qual.name}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className="max-w-3xl mx-auto pt-10 space-y-8">
                            {/* Marketing Consent */}
                            <div className="flex justify-center">
                                <label className="flex items-start gap-4 cursor-pointer group/consent max-w-lg">
                                    <div className={`mt-1 md:mt-0 w-6 h-6 rounded-md border-2 shrink-0 flex items-center justify-center transition-all ${formData.marketingConsent ? 'bg-primary border-primary shadow-[0_0_15px_rgba(219,52,54,0.4)]' : 'border-slate-300 hover:border-slate-500 bg-white'}`}>
                                        {formData.marketingConsent && <CheckCircle2 className="text-white w-4 h-4" />}
                                    </div>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.marketingConsent}
                                        onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
                                        className="hidden" 
                                    />
                                    <span className="text-slate-500 text-xs md:text-sm font-medium select-none group-hover/consent:text-slate-900 transition-colors">
                                        I agree to give my consent to receive updates through SMS/Email*
                                    </span>
                                </label>
                            </div>

                            {error && (
                                <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 animate-fade-in max-w-lg mx-auto">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                                    <span className="text-xs font-bold uppercase tracking-wider text-center flex-1">{error}</span>
                                </div>
                            )}

                            <button
                                onClick={handleSubmit}
                                disabled={!formData.qualification || loading}
                                className="w-full h-16 md:h-20 bg-slate-900 text-white rounded-full font-black uppercase tracking-[0.25em] text-sm md:text-base hover:bg-primary hover:shadow-2xl transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.95]"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Submitting...
                                    </span>
                                ) : "Submit Application"}
                            </button>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-[#fafafa] relative overflow-hidden z-20">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="container mx-auto px-6 relative z-10 max-w-5xl">
                {!submitted ? (
                    <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 p-6 md:p-16 relative">

                        {/* Progress Header */}
                        <div className="flex items-center justify-between mb-12 md:mb-16 relative">
                            {/* Back button */}
                            <button
                                onClick={handleBack}
                                className={`w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95 ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>

                            {/* Progress Indicators */}
                            <div className="flex-1 flex gap-2 md:gap-3 mx-4 md:mx-12 relative">
                                {[1, 2, 3, 4].map(num => (
                                    <div key={num} className="flex-1 relative">
                                        <div className={`h-1.5 md:h-2 w-full rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= num ? 'bg-primary shadow-[0_0_10px_rgba(219,52,54,0.3)]' : 'bg-slate-100'}`} />
                                    </div>
                                ))}
                            </div>

                            {/* Steps Counter */}
                            <div className="text-right w-12 text-xs md:text-sm font-bold text-slate-400 font-mono tracking-widest">
                                0{step}/0{TOTAL_STEPS}
                            </div>
                        </div>

                        {/* Form Body */}
                        <div className="min-h-[400px]">
                            <AnimatePresence mode="wait">
                                {renderStepContent()}
                            </AnimatePresence>
                        </div>

                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 p-12 md:p-24 rounded-[3rem] text-center text-white relative overflow-hidden shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-8 border border-primary/30 relative">
                                <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                                <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-20" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
                                APPLICATION <br /> <span className="text-primary italic font-serif">RECEIVED</span>
                            </h2>
                            <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed">
                                Thank you, <span className="text-white font-bold">{formData.name || 'Future Insdian'}</span>! Your details have been submitted. Our admission counselor will contact you shortly to guide you through the next steps.
                            </p>
                            <button
                                onClick={() => {
                                    setStep(1);
                                    setFormData({ readyToStart: '', industry: '', name: '', phone: '', email: '', city: '', qualification: '' });
                                    setSubmitted(false);
                                }}
                                className="px-10 py-5 bg-white text-slate-900 hover:bg-primary hover:text-white rounded-full font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-primary/30 active:scale-95 flex items-center gap-3"
                            >
                                <ArrowLeft size={16} /> RETURN TO START
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default AdmissionStepForm;
