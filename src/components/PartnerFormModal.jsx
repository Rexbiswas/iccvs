import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, Building2, Mail, Phone, User as UserIcon, Briefcase } from 'lucide-react';

const PartnerFormModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        company: '',
        industry: '',
        potential: 'Mentor',
        message: '',
        address: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);

    // Toggle body class to hide navbar and prevent scroll
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('hide-navbar');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.classList.remove('hide-navbar');
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.classList.remove('hide-navbar');
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validate 10-digit mobile number
        if (formData.contact.length !== 10) {
            setError('Please enter a valid 10-digit mobile number');
            return;
        }

        setIsSubmitting(true);
        
        try {
            const response = await fetch('/api/partner/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    contact: `+91${formData.contact}`
                })
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    setFormData({ name: '', email: '', contact: '', company: '', industry: '', potential: 'Mentor', message: '', address: '' });
                    onClose();
                }, 500);
            } else {
                throw new Error(data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error('Partner submission error:', error.message);
            alert("Submission failed: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-xl max-h-[90vh] flex flex-col bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        {/* Elegant Header Background */}
                        <div className="absolute top-0 left-0 w-full h-32 bg-slate-50 -z-10">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
                            <div className="absolute bottom-0 left-0 w-full h-px bg-slate-100" />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/5 hover:bg-slate-900/10 text-slate-500 hover:text-slate-900 transition-all z-20"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 md:p-12 overflow-y-auto no-scrollbar">
                            {!isSuccess ? (
                                <div className="space-y-10">
                                    <div className="text-center md:text-left">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-6 shadow-sm">
                                            <Building2 size={14} className="text-primary" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Industry Collaboration</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-black text-slate-800 uppercase tracking-tighter leading-none">
                                            Partner <br /><span className="text-slate-300">With us</span>
                                        </h2>
                                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-4">
                                            Join our global network of design leaders and mentors.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Name</label>
                                            <div className="relative group">
                                                <UserIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" />
                                                <input 
                                                    type="text" 
                                                    required 
                                                    placeholder="Your Full Name" 
                                                    value={formData.name}
                                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-slate-900 focus:bg-white transition-all text-slate-900 font-medium placeholder:text-slate-300"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Email ID</label>
                                            <div className="relative group">
                                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" />
                                                <input 
                                                    type="email" 
                                                    required 
                                                    placeholder="Official Email" 
                                                    value={formData.email}
                                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-slate-900 focus:bg-white transition-all text-slate-900 font-medium placeholder:text-slate-300"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Company Name</label>
                                            <div className="relative group">
                                                <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" />
                                                <input 
                                                    type="text" 
                                                    required 
                                                    placeholder="Brand / Organization" 
                                                    value={formData.company}
                                                    onChange={e => setFormData({...formData, company: e.target.value})}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-slate-900 focus:bg-white transition-all text-slate-900 font-medium placeholder:text-slate-300"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Industry</label>
                                            <div className="relative group">
                                                <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" />
                                                <input 
                                                    type="text" 
                                                    required 
                                                    placeholder="e.g. Fashion, UX, Interior" 
                                                    value={formData.industry}
                                                    onChange={e => setFormData({...formData, industry: e.target.value})}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-slate-900 focus:bg-white transition-all text-slate-900 font-medium placeholder:text-slate-300"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Phone No</label>
                                            <div className="flex items-stretch h-14 bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden focus-within:border-slate-900 focus-within:bg-white transition-all">
                                                <div className="flex items-center px-4 bg-slate-100 border-r border-slate-200 gap-3">
                                                    <Phone size={18} className="text-slate-300 group-focus-within:text-slate-900 transition-colors" />
                                                    <span className="text-slate-400 font-bold text-xs">+91</span>
                                                </div>
                                                <input 
                                                    type="tel" 
                                                    required 
                                                    inputMode="numeric"
                                                    placeholder="00000 00000" 
                                                    value={formData.contact}
                                                    onChange={e => {
                                                        const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                        setFormData({...formData, contact: digits});
                                                    }}
                                                    className="flex-1 h-full px-4 outline-none bg-transparent text-slate-900 font-medium placeholder:text-slate-300"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Nature of Partnership</label>
                                            <select 
                                                value={formData.potential}
                                                onChange={e => setFormData({...formData, potential: e.target.value})}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-slate-900 focus:bg-white transition-all text-slate-900 font-black uppercase text-xs tracking-widest appearance-none cursor-pointer"
                                            >
                                                <option value="Mentor">Mentor / Speaker</option>
                                                <option value="Collaborator">Project Collaborator</option>
                                                <option value="Employer">Hiring Partner</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div className="md:col-span-2 space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Message (Optional)</label>
                                            <textarea 
                                                rows="3" 
                                                placeholder="Briefly describe your interest..." 
                                                value={formData.message}
                                                onChange={e => setFormData({...formData, message: e.target.value})}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-4 outline-none focus:border-slate-900 focus:bg-white transition-all text-slate-900 font-medium placeholder:text-slate-300 resize-none"
                                            />
                                        </div>

                                        {error && (
                                            <div className="md:col-span-2 p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-2 text-red-600 text-[10px] font-bold uppercase tracking-wider">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                                {error}
                                            </div>
                                        )}

                                        <div className="md:col-span-2 pt-4">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-slate-900 text-white rounded-2xl py-5 font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-primary transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                            >
                                                {isSubmitting ? (
                                                    "Connecting..."
                                                ) : (
                                                    <>
                                                        Partner with INSD <ArrowRight size={16} />
                                                    </>
                                                )}
                                            </motion.button>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <div className="py-20 flex flex-col items-center text-center space-y-8">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", damping: 15 }}
                                        className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/30"
                                    >
                                        <Check size={40} className="text-white" />
                                    </motion.div>
                                    <div className="space-y-4">
                                        <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Request Received.</h3>
                                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
                                            Thank you for your interest. Our academic relations board will review your profile and reach out within 48 hours.
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="px-12 py-4 border-2 border-slate-900 rounded-full text-xs uppercase font-black tracking-widest text-slate-900 hover:bg-slate-900 hover:text-white transition-all"
                                    >
                                        Back to Industry Hub
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PartnerFormModal;
