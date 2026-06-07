import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plane, ArrowLeft, PhoneCall } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const AviationThankYou = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { name } = location.state || {};



    return (
        <div className="min-h-screen bg-white">
            <SEO 
                title="Thank You | Submission Received | INSD Aviation"
                description="Thank you for contacting the International School of Design. We have received your request and will get back to you shortly."
                robots="noindex, follow"
            />
            <div className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    {/* Success Icon: Styled themed Plane Icon with Pulsing Effect */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", damping: 12, stiffness: 200 }}
                        className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center mx-auto border-4 border-red-100 shadow-[0_12px_30px_rgba(219,52,54,0.15)] relative"
                    >
                        <motion.div 
                            animate={{ scale: [1, 1.05, 1] }} 
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-[#db3436]"
                        >
                            <Plane className="w-16 h-16 transform -rotate-45" />
                        </motion.div>
                    </motion.div>

                    {/* Content */}
                    <div className="space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-clamp-4xl font-black text-slate-950 uppercase tracking-tighter leading-none"
                        >
                            {name ? `Thanks, ${name.split(' ')[0]}!` : 'Submission Successful!'}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-clamp-lg font-bold text-slate-500 max-w-2xl mx-auto leading-relaxed"
                        >
                            Thank you for reaching out to INSD Aviation. Your inquiry has been successfully received, and our career counsellors will connect with you within 24 hours to help guide you through your journey.
                        </motion.p>
                    </div>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap items-center justify-center gap-6 pt-8"
                    >
                        <button
                            onClick={() => navigate('/courses/aviation')}
                            className="flex items-center gap-3 px-8 h-14 bg-slate-950 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#db3436] transition-all duration-300 shadow-xl cursor-pointer"
                        >
                            <ArrowLeft size={18} />
                            Back to Aviation
                        </button>

                        <a
                            href="tel:+919804443300"
                            className="flex items-center gap-3 px-8 h-14 bg-[#db3436] text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-950 transition-all duration-300 shadow-xl cursor-pointer"
                        >
                            <PhoneCall size={18} />
                            Contact Us
                        </a>
                    </motion.div>

                    {/* Secondary Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-100"
                    >
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#db3436]">Call Us</span>
                            <p className="font-bold text-slate-900">+91 98044 43300</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#db3436]">Email Us</span>
                            <p className="font-bold text-slate-900">info@insd.edu.in</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#db3436]">Follow Us</span>
                            <div className="flex items-center justify-center gap-4 text-slate-400">
                                <span className="text-xs font-bold hover:text-[#db3436] cursor-pointer transition-colors">Instagram</span>
                                <span className="text-xs font-bold hover:text-[#db3436] cursor-pointer transition-colors">LinkedIn</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AviationThankYou;
