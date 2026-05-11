import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, Stars, Mail, Phone, User as UserIcon } from 'lucide-react';

const ParisFormModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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
        setIsSubmitting(true);
        
        try {
            const response = await fetch('/api/paris/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    setFormData({ name: '', email: '', phone: '' });
                    onClose();
                }, 3000);
            } else {
                throw new Error(data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error('Paris submission error:', error.message);
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
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-md max-h-[95vh] flex flex-col bg-white rounded-4xl shadow-2xl overflow-hidden"
                    >
                        {/* Elegant Header Background */}
                        <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-[#f3f3f3] -z-10">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/5 hover:bg-slate-900/10 text-slate-500 hover:text-slate-900 transition-all z-20"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-6 md:p-12 overflow-y-auto no-scrollbar">
                            {!isSuccess ? (
                                <div className="space-y-8">
                                    <div className="text-center md:text-left">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md mb-6 shadow-sm">
                                            <Stars size={14} className="text-primary" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">The Paris Protocol</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-serif text-slate-900 leading-tight">
                                            Enroll in <br /><span className="italic text-slate-400 font-light">The Project.</span>
                                        </h2>
                                        <p className="text-slate-500 font-light text-sm mt-4">
                                            Enter your credentials to secure a slot for the Paris Cohort interview with our board.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                                    placeholder="Official Email Address" 
                                                    value={formData.email}
                                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-slate-900 focus:bg-white transition-all text-slate-900 font-medium placeholder:text-slate-300"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Phone No</label>
                                            <div className="relative group">
                                                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" />
                                                <input 
                                                    type="tel" 
                                                    required 
                                                    placeholder="10-digit mobile number" 
                                                    value={formData.phone}
                                                    onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-slate-900 focus:bg-white transition-all text-slate-900 font-medium placeholder:text-slate-300"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <motion.button
                                                whileHover={{ scale: 1.02, backgroundColor: "#000" }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-slate-900 text-white rounded-2xl py-4 font-bold uppercase text-xs tracking-[0.2em] shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                            >
                                                {isSubmitting ? (
                                                    "Synchronizing..."
                                                ) : (
                                                    <>
                                                        Submit Application <ArrowRight size={16} />
                                                    </>
                                                )}
                                            </motion.button>
                                        </div>
                                    </form>

                                    <div className="text-center">
                                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                                            By submitting, you agree to the INSD global guidelines.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-12 flex flex-col items-center text-center space-y-6">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", damping: 15 }}
                                        className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-500/20"
                                    >
                                        <Check size={32} className="text-white" />
                                    </motion.div>
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-serif text-slate-900">Application Saved.</h3>
                                        <p className="text-slate-500 font-light max-w-xs mx-auto">
                                            A confirmation has been sent to your email. We will contact you shortly for the formal interview.
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="text-xs uppercase font-bold tracking-widest text-slate-900 hover:underline underline-offset-8"
                                    >
                                        Return to Project Home
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

export default ParisFormModal;
