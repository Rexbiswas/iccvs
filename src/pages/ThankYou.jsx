import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Download, ExternalLink, Calendar, Mail, PhoneCall } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const ThankYou = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { name, type } = location.state || {};

    // Safety check: If no state is present, the user likely accessed the URL directly
    useEffect(() => {
        if (!location.state && window.location.hostname !== 'localhost') {
            navigate('/', { replace: true });
        }
    }, [location.state, navigate]);

    const isPlacementReport = type === 'report';

    return (
        <div className="min-h-screen bg-white">
            <SEO 
                title="Thank You | Submission Received | INSD"
                description="Thank you for contacting the International School of Design. We have received your request and will get back to you shortly."
                robots="noindex, follow"
            />
            <div className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", damping: 12, stiffness: 200 }}
                        className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mx-auto border-4 border-green-100"
                    >
                        <CheckCircle2 className="text-green-500 w-16 h-16" />
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
                            className="text-clamp-lg font-bold text-slate-500 max-w-2xl mx-auto"
                        >
                            {isPlacementReport 
                                ? "Your request for the 2025/26 Placement Report has been received. Our team is processing the audited data and will send the PDF to your registered email shortly."
                                : "Thank you for reaching out to INSD. Your request has been received, and our experts will contact you within 24 hours to guide you through your creative journey."
                            }
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
                            onClick={() => navigate('/')}
                            className="flex items-center gap-3 px-8 h-14 bg-slate-950 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-primary transition-all duration-300 shadow-xl"
                        >
                            <ArrowLeft size={18} />
                            Back to Home
                        </button>

                        <a
                            href="tel:+919868444888"
                            className="flex items-center gap-3 px-8 h-14 bg-[#db3436] text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-primary transition-all duration-300 shadow-xl"
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
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Call Us</span>
                            <p className="font-bold text-slate-900">+91 98044 43300</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Email Us</span>
                            <p className="font-bold text-slate-900">iccvsinstitute@gmail.com</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Follow Us</span>
                            <div className="flex items-center justify-center gap-4 text-slate-400">
                                <span className="text-xs font-bold hover:text-primary cursor-pointer transition-colors">Instagram</span>
                                <span className="text-xs font-bold hover:text-primary cursor-pointer transition-colors">LinkedIn</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ThankYou;
