import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Send, ArrowRight, MessageSquare, Clock, Globe, Instagram, Facebook, Linkedin, Twitter, CheckCircle2, Youtube } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const Contact = () => {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    // Form State
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate 10-digit mobile number
        if (formState.phone.length !== 10) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formState,
                    phone: `+91${formState.phone}`
                })
            });

            if (response.ok) {
                setIsSuccess(true);
                // Redirect to Thank You page after a brief delay
                setTimeout(() => {
                    navigate('/thank-you', { state: { name: formState.name, type: 'contact' } });
                }, 1000);
            } else {
                const contentType = response.headers.get("content-type");
                let errorMessage = "Failed to send message";
                if (contentType && contentType.includes("application/json")) {
                    const data = await response.json();
                    errorMessage = data.message || errorMessage;
                } else {
                    const text = await response.text();
                    console.error('Server error:', text);
                    errorMessage = `Server Error: ${text.substring(0, 30)}...`;
                }
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Contact error:', error);

            // --- DEVELOPMENT FALLBACK ---
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.warn('Backend unavailable on localhost. Simulating success for testing.');
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/thank-you', { state: { name: formState.name, type: 'contact' } });
                }, 1000);
                return;
            }

            alert(`Submission Error: ${error.message.includes('Unexpected token') ? "Server returned an invalid response. Please try again later." : error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let finalValue = value;

        if (name === 'phone') {
            finalValue = value.replace(/\D/g, '').slice(0, 10);
        }

        setFormState({ ...formState, [name]: finalValue });
    };

    // Stagger container for entrance animations
    const containerVars = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVars = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
    };

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            <SEO
                title="Contact US - Reach Out to INSD"
                description="Have questions about our programs or admissions? Get in touch with our expert counselors today. Visit our main campus in Delhi or contact us via phone or email."
                keywords="INSD contact, design school admission help, INSD Delhi address, contact design institute"
            />
            {/* Background Abstract Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-secondary/20 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-blob" />
                <div className="absolute top-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-primary/20 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-blob animation-delay-2000" />
                <div className="absolute bottom-[-20%] left-[20%] w-[45rem] h-[45rem] bg-secondary/20 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-blob animation-delay-4000" />
            </div>

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-slate-200 text-xs font-bold uppercase tracking-widest text-secondary mb-6 shadow-sm"
                    >
                        <MessageSquare size={12} />
                        <span>We're Here to Listen</span>
                    </motion.div>

                    <h1 className="text-clamp-4xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                        Let's Start a <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-secondary to-primary">Conversation.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Have a project in mind, a question about our courses, or simply want to say hello? We're ready to help you shape your future.
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

                    {/* Left Column: Contact Info Cards */}
                    <div className="lg:col-span-5 space-y-6">
                        <motion.div
                            variants={containerVars}
                            initial="hidden"
                            animate="show"
                            className="space-y-6"
                        >
                            {/* Contact Card 1: Main Office */}
                            <motion.div variants={itemVars} className="group relative p-8 bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-secondary to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-[2rem]" />
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300 shadow-inner">
                                        <MapPin size={24} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-slate-900 mb-4">Campuses</h3>
                                        <div className="space-y-6 max-h-[280px] overflow-y-auto pr-2 dropdown-scrollbar">
                                            <div className="space-y-1">
                                                <h4 className="font-bold text-sm text-slate-800">INSD Corporate Headquarters</h4>
                                                <p className="text-slate-600 text-xs leading-relaxed">
                                                    International School of Design,<br />
                                                    Gujranwala Town, Part 1,<br />
                                                    Delhi - 110009
                                                </p>
                                                <a href="https://maps.google.com/?q=International+School+of+Design+Gujranwala+Town+Delhi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold text-secondary hover:text-primary transition-colors mt-1">
                                                    Get Directions <ArrowRight size={12} className="ml-1" />
                                                </a>
                                            </div>
                                            <div className="space-y-1 pt-4 border-t border-slate-100">
                                                <h4 className="font-bold text-sm text-slate-800">INSD Vijayawada</h4>
                                                <p className="text-slate-600 text-xs leading-relaxed">
                                                    3rd floor, above Indian Bank, opposite Jade suites, Acharya Ranga Nagar, Benz Circle, Vijayawada, Andhra Pradesh 520010
                                                </p>
                                                <a href="https://maps.google.com/?q=INSD+Vijayawada+Acharya+Ranga+Nagar+Benz+Circle+Vijayawada+Andhra+Pradesh+520010" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold text-secondary hover:text-primary transition-colors mt-1">
                                                    Get Directions <ArrowRight size={12} className="ml-1" />
                                                </a>
                                            </div>
                                            <div className="space-y-1 pt-4 border-t border-slate-100">
                                                <h4 className="font-bold text-sm text-slate-800">INSD - Thrissur</h4>
                                                <p className="text-slate-600 text-xs leading-relaxed">
                                                    G65F+2HQ Fabis Arcade, High Rd, Kuriachira, Thrissur, Kerala 680006
                                                </p>
                                                <a href="https://maps.google.com/?q=INSD+Thrissur+Fabis+Arcade+High+Rd+Kuriachira+Thrissur+Kerala+680006" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold text-secondary hover:text-primary transition-colors mt-1">
                                                    Get Directions <ArrowRight size={12} className="ml-1" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                                    {/* Contact Card 2: Contact Info */}
                                    <motion.div variants={itemVars} className="group relative p-8 bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-[2rem]" />
                                        <div className="flex flex-col gap-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                                    <Phone size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Call Us</p>
                                                    <div className="flex flex-col">
                                                         <a href="tel:+919868444888" className="text-lg font-bold text-slate-900 hover:text-primary transition-colors">+91 98684 44888</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full h-px bg-slate-100" />
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                                                    <MessageSquare size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">WhatsApp</p>
                                                     <a href="https://wa.me/919868444888" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-slate-900 hover:text-green-500 transition-colors">+91 98684 44888</a>
                                                </div>
                                            </div>
                                            <div className="w-full h-px bg-slate-100" />
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                                    <Mail size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Us</p>
                                                    <a href="mailto:iccvsinstitute@gmail.com" className="text-lg font-bold text-slate-900 hover:text-primary transition-colors">iccvsinstitute@gmail.com</a>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Contact Card 3: Socials */}
                                    <motion.div variants={itemVars} className="p-8 bg-slate-900 text-white rounded-[2rem] shadow-2xl overflow-hidden relative group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary/40 transition-colors duration-500" />
                                        <div className="relative z-10">
                                            <h3 className="text-xl font-bold mb-6">Connect With Us</h3>
                                            <div className="flex gap-4">
                                                {[
                                                    { icon: Instagram, href: "https://www.instagram.com/insd_official" },
                                                    { icon: Facebook, href: "https://www.facebook.com/share/1CMuRdTV69/" },
                                                    { icon: Linkedin, href: "https://www.linkedin.com/school/international-school-of-design/" },
                                                    { icon: Youtube, href: "https://youtube.com/@insd-internationalschoolof5139?feature=shared" }
                                                ].map((soc, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={soc.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                                                    >
                                                        <soc.icon size={20} />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>

                            </motion.div>
                    </div>

                    {/* Right Column: Interactive Form */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
                        >
                            {/* Decorative gradients inside form */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-primary/20 to-secondary/20 opacity-30 blur-3xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-secondary/20 to-primary/20 opacity-30 blur-3xl pointer-events-none" />

                            <div className="relative z-10">
                                <h2 className="text-3xl font-black text-slate-900 mb-2">Send a Message</h2>
                                <p className="text-slate-500 mb-8">We usually respond within 24 hours.</p>

                                {!isSuccess ? (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Your Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    value={formState.name}
                                                    onChange={handleChange}
                                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 text-slate-800 font-medium focus:border-secondary focus:bg-white transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    value={formState.email}
                                                    onChange={handleChange}
                                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 text-slate-800 font-medium focus:border-secondary focus:bg-white transition-all outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Phone Number</label>
                                                <div className="flex items-stretch h-12 bg-slate-50 border-2 border-slate-100 rounded-xl overflow-hidden focus-within:border-secondary transition-all">
                                                    <div className="flex items-center px-4 bg-slate-100 border-r-2 border-slate-200">
                                                        <span className="text-slate-500 font-bold text-sm">+91</span>
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        required
                                                        inputMode="numeric"
                                                        placeholder="00000 00000"
                                                        value={formState.phone}
                                                        onChange={handleChange}
                                                        className="flex-1 px-4 bg-transparent text-slate-800 font-medium focus:outline-none"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Subject</label>
                                                <select
                                                    name="subject"
                                                    value={formState.subject}
                                                    onChange={handleChange}
                                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 text-slate-800 font-medium focus:border-secondary focus:bg-white transition-all outline-none appearance-none cursor-pointer"
                                                >
                                                    <option value="">Select a Subject</option>
                                                    <option value="Admission">Admission Inquiry</option>
                                                    <option value="Courses">Course Details</option>
                                                    <option value="Fees">Fee Structure</option>
                                                    <option value="General">General Inquiry</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Message</label>
                                            <textarea
                                                name="message"
                                                required
                                                rows="5"
                                                value={formState.message}
                                                onChange={handleChange}
                                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 text-slate-800 font-medium focus:border-secondary focus:bg-white transition-all outline-none resize-none"
                                            />
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full h-16 md:h-20 bg-slate-900 text-white rounded-full font-black uppercase tracking-[0.25em] text-sm md:text-base shadow-xl shadow-slate-900/20 hover:shadow-primary/30 hover:-translate-y-1 transition-all overflow-hidden relative group"
                                            >
                                                <span className="relative z-10 flex items-center justify-center gap-2">
                                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                                    {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 transition-transform" />}
                                                </span>
                                                <div className="absolute inset-0 bg-linear-to-r from-secondary via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-16 flex flex-col items-center justify-center text-center"
                                    >
                                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                                            <CheckCircle2 size={48} />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-2">Message Sent!</h3>
                                        <p className="text-slate-600 max-w-sm mx-auto">
                                            Thank you for reaching out. Our team will get back to you shortly.
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
