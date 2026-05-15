import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, Sparkles, LogIn } from 'lucide-react';
import { useRegisterModal } from '../context/RegisterModalContext';
import { useAuth } from '../context/AuthContext';

const RegistrationModal = () => {
    const { isOpen, closeModal } = useRegisterModal();
    const { register, login } = useAuth();
    const [authMode, setAuthMode] = useState('register'); // 'register' | 'login' | 'forgot'
    const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: Code & New Password
    const [forgotData, setForgotData] = useState({ email: '', code: '', newPassword: '' });
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        pinCode: '',
        country: '',
        phone: '',
        dob: '',
        centre: '',
        level: '',
        stream: '',
        scholarship: '',
        comments: '',
        communications: {
            email: true,
            sms: false
        },
        privacy: false,
        captchaInput: ''
    });
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: 0 });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('hide-navbar');
            document.body.style.overflow = 'hidden';
            // Generate simple math captcha
            const n1 = Math.floor(Math.random() * 10);
            const n2 = Math.floor(Math.random() * 10);
            setCaptcha({ num1: n1, num2: n2, answer: n1 + n2 });

            setTimeout(() => {
                setAuthMode('register');
                setStep(1);
                setIsSuccess(false);
                setFormData({
                    username: '', email: '', password: '', firstName: '', lastName: '',
                    street1: '', street2: '', city: '', state: '', pinCode: '', country: '',
                    phone: '', dob: '', centre: '', level: '', stream: '', scholarship: '',
                    comments: '', communications: { email: true, sms: false },
                    privacy: false, captchaInput: ''
                });
                setErrors({});
                setLoginData({ email: '', password: '' });
                // Regenerate captcha on reset
                const r1 = Math.floor(Math.random() * 10);
                const r2 = Math.floor(Math.random() * 10);
                setCaptcha({ num1: r1, num2: r2, answer: r1 + r2 });
            }, 500);
        } else {
            document.body.classList.remove('hide-navbar');
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.classList.remove('hide-navbar');
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        let newErrors = {};

        // Step-by-Step Form Validation
        if (step === 1) {
            if (formData.username.trim().length < 3) {
                newErrors.username = "Username must be at least 3 characters long.";
            } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
                newErrors.username = "Username can only contain letters, numbers, and underscores.";
            }

            if (formData.password.length < 8 || formData.password.length > 12) {
                newErrors.password = "Password must be exactly between 8 to 12 characters long.";
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
                newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number.";
            }
        }

        if (step === 2) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = "Please enter a valid email address.";
            }
            if (formData.phone.length !== 10) {
                newErrors.phone = "Please enter a valid 10-digit mobile number";
            }
        }

        if (step === 3) {
            if (formData.firstName.trim().length < 2) {
                newErrors.firstName = "First name must be at least 2 characters long.";
            } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
                newErrors.firstName = "First name can only contain alphabetic characters.";
            }

            if (formData.lastName.trim().length < 2) {
                newErrors.lastName = "Last name must be at least 2 characters long.";
            } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName)) {
                newErrors.lastName = "Last name can only contain alphabetic characters.";
            }
        }

        if (step === 7) {
            if (formData.pinCode && !/^[0-9]{8}$/.test(formData.pinCode.trim())) {
                newErrors.pinCode = "Please enter a valid 8-digit PIN Code.";
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (step < 10) {
            setStep(step + 1);
            return;
        }

        // Final Step Validation
        if (!formData.privacy) {
            alert("Please accept the Privacy Notice.");
            return;
        }
        if (parseInt(formData.captchaInput) !== captcha.answer) {
            alert("Incorrect Captcha. Please try again.");
            // Regenerate captcha
            const n1 = Math.floor(Math.random() * 10);
            const n2 = Math.floor(Math.random() * 10);
            setCaptcha({ num1: n1, num2: n2, answer: n1 + n2 });
            setFormData(prev => ({ ...prev, captchaInput: '' }));
            return;
        }

        setIsSubmitting(true);

        try {
            await register({
                ...formData,
                phone: `+91${formData.phone}`
            });
            setIsSuccess(true);
        } catch (error) {
            console.error("Registration Error:", error);
            alert(error.message || "Registration failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await login(loginData.email, loginData.password);
            console.log("Login Successful");
            setIsSuccess(true);
        } catch (error) {
            console.error("Login Error:", error);
            alert(error.message || "Login failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleForgotPasswordRequest = async (e) => {
        e.preventDefault();
        if (!forgotData.email) return;
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: forgotData.email })
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                setForgotStep(2);
            } else {
                alert(data.message || 'Error sending code.');
            }
        } catch (error) {
            alert('Network error requesting code.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (!forgotData.code || !forgotData.newPassword) return;
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: forgotData.email, code: forgotData.code, newPassword: forgotData.newPassword })
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                setAuthMode('login');
                setForgotStep(1);
            } else {
                alert(data.message || 'Error resetting password.');
            }
        } catch (error) {
            alert('Network error resetting password.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const toggleComm = async (type) => {
        const isOptingIn = !formData.communications[type];

        setFormData(prev => ({
            ...prev,
            communications: { ...prev.communications, [type]: isOptingIn }
        }));

        if (isOptingIn && type === 'email' && formData.email) {
            try {
                alert('Sending a real-time verification email to ' + formData.email + '...');
                const response = await fetch('/api/auth/send-test-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: formData.email,
                        firstName: formData.firstName
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Check your inbox! An email has been successfully sent in real-time to ' + formData.email);
                } else {
                    console.error('Email failed:', data.message);
                }
            } catch (error) {
                console.error("Network Error during email dispatch:", error);
            }
        } else if (isOptingIn && type === 'email' && !formData.email) {
            alert('Please fill out your Email Address in Step 2 first to receive real-time notifications!');
        } else if (isOptingIn && type === 'sms' && formData.phone) {
            try {
                alert('Sending a test SMS to ' + formData.phone + '...');
                const response = await fetch('/api/auth/send-test-sms', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        phone: `+91${formData.phone}`,
                        firstName: formData.firstName
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Message triggered! Check your backend terminal to see the Mock SMS delivery to ' + formData.phone + '.');
                } else {
                    console.error('SMS failed:', data.message);
                }
            } catch (error) {
                console.error("Network Error during SMS dispatch:", error);
            }
        } else if (isOptingIn && type === 'sms' && !formData.phone) {
            alert('Please fill out your Phone Number in Step 2 first to receive real-time SMS notifications!');
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Darker, blurrier backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
                    />

                    {/* Glass Modal Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 30 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-[2.5rem] shadow-2xl"
                    >
                        {/* Glass Layer with Overflow Hidden for Border Radius */}
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-[40px] border border-white/20 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] rounded-[2.5rem] overflow-hidden">
                            {/* Decorative Background Orbs inside the overflow-hidden layer */}
                            <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-pink-500/30 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />
                            <div className="absolute bottom-[-20%] left-[-20%] w-64 h-64 bg-violet-600/30 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />
                        </div>

                        {/* Content Scrollable Area */}
                        <div className="relative z-10 p-6 md:p-10 flex flex-col h-full min-h-[500px] md:min-h-[750px] overflow-y-auto no-scrollbar">


                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/20 text-white/70 hover:text-white transition-all backdrop-blur-sm group z-50"
                            >
                                <X size={20} className="group-hover:rotate-90 transition-transform" />
                            </button>

                            {!isSuccess ? (
                                <div className="flex flex-col h-full">
                                    {/* Header */}
                                    <div className="mb-6 shrink-0">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-pink-300 mb-4 backdrop-blur-md shadow-lg shadow-pink-500/20">
                                            {authMode === 'register' ? <Sparkles size={10} /> : <LogIn size={10} />}
                                            <span>{authMode === 'register' ? 'Join the Elite' : 'Welcome Back'}</span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                                            {authMode === 'register' && (
                                                <>Begin Your <br /><span className="text-transparent bg-clip-text bg-linear-to-r from-pink-300 to-violet-300">Design Legacy</span></>
                                            )}
                                            {authMode === 'login' && (
                                                <>Access <br /><span className="text-transparent bg-clip-text bg-linear-to-r from-pink-300 to-violet-300">Your Terminal</span></>
                                            )}
                                            {authMode === 'forgot' && (
                                                <>Recover <br /><span className="text-transparent bg-clip-text bg-linear-to-r from-pink-300 to-violet-300">Your Clearance</span></>
                                            )}
                                        </h2>

                                    </div>

                                    {/* Form Steps */}
                                    {authMode === 'register' && (
                                        <form onSubmit={handleRegisterSubmit} className="flex-1 flex flex-col justify-between">
                                            <div className="space-y-6">
                                                <AnimatePresence mode="wait">

                                                    {/* Step 1: User & Pass */}
                                                    {step === 1 && (
                                                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                                            <h3 className="text-sm font-bold text-pink-300 uppercase tracking-widest mb-4">Account Setup (1/10)</h3>
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Username</label>
                                                                <input autoFocus type="text" placeholder="Choose a username" value={formData.username} onChange={e => { setFormData({ ...formData, username: e.target.value }); setErrors({ ...errors, username: null }); }} className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-3 md:px-6 md:py-4 text-white focus:border-pink-500/50 transition-all outline-none text-sm md:text-base" />
                                                                {errors.username && <p className="text-red-400 text-[10px] mt-1.5 ml-1 font-semibold bg-red-500/10 px-2 py-1 rounded-md border border-red-500/20">{errors.username}</p>}
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Password *</label>
                                                                <input type="password" required placeholder="Create a password" value={formData.password} onChange={e => { setFormData({ ...formData, password: e.target.value }); setErrors({ ...errors, password: null }); }} className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-3 md:px-6 md:py-4 text-white focus:border-pink-500/50 transition-all outline-none text-sm md:text-base" />
                                                                {errors.password && <p className="text-red-400 text-[10px] mt-1.5 ml-1 font-semibold bg-red-500/10 px-2 py-1 rounded-md border border-red-500/20">{errors.password}</p>}
                                                            </div>

                                                        </motion.div>
                                                    )}

                                                    {/* Step 2: Email & Phone */}
                                                    {step === 2 && (
                                                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                                            <h3 className="text-sm font-bold text-pink-300 uppercase tracking-widest mb-4">Contact Info (2/10)</h3>
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Email Address *</label>
                                                                <input autoFocus type="email" required placeholder="hello@example.com" value={formData.email} onChange={e => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: null }); }} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-pink-500 transition-all outline-none" />
                                                                {errors.email && <p className="text-red-400 text-[10px] mt-1.5 ml-1 font-semibold bg-red-500/10 px-2 py-1 rounded-md border border-red-500/20">{errors.email}</p>}
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Phone *</label>
                                                                <div className="flex items-stretch h-14 bg-black/20 border border-white/10 rounded-2xl overflow-hidden focus-within:border-pink-500 transition-all">
                                                                    <div className="flex items-center px-4 bg-white/5 border-r border-white/10 gap-2">
                                                                        <span className="text-slate-400 font-bold text-xs">+91</span>
                                                                    </div>
                                                                    <input 
                                                                        type="tel" 
                                                                        required 
                                                                        inputMode="numeric"
                                                                        placeholder="XXXXX XXXXX" 
                                                                        value={formData.phone} 
                                                                        onChange={e => { 
                                                                            const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                                            setFormData({ ...formData, phone: digits }); 
                                                                            setErrors({ ...errors, phone: null }); 
                                                                        }} 
                                                                        className="flex-1 h-full bg-transparent px-6 py-4 text-white focus:outline-none" 
                                                                    />
                                                                </div>
                                                                {errors.phone && <p className="text-red-400 text-[10px] mt-1.5 ml-1 font-semibold bg-red-500/10 px-2 py-1 rounded-md border border-red-500/20">{errors.phone}</p>}
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {/* Step 3: Name */}
                                                    {step === 3 && (
                                                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                                            <h3 className="text-sm font-bold text-pink-300 uppercase tracking-widest mb-4">Personal Details (3/10)</h3>
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">First Name *</label>
                                                                <input autoFocus type="text" required placeholder="First Name" value={formData.firstName} onChange={e => { setFormData({ ...formData, firstName: e.target.value }); setErrors({ ...errors, firstName: null }); }} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-pink-500/50 transition-all outline-none" />
                                                                {errors.firstName && <p className="text-red-400 text-[10px] mt-1.5 ml-1 font-semibold bg-red-500/10 px-2 py-1 rounded-md border border-red-500/20">{errors.firstName}</p>}
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Last Name *</label>
                                                                <input type="text" required placeholder="Last Name" value={formData.lastName} onChange={e => { setFormData({ ...formData, lastName: e.target.value }); setErrors({ ...errors, lastName: null }); }} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-pink-500/50 transition-all outline-none" />
                                                                {errors.lastName && <p className="text-red-400 text-[10px] mt-1.5 ml-1 font-semibold bg-red-500/10 px-2 py-1 rounded-md border border-red-500/20">{errors.lastName}</p>}
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {/* Step 4: DOB & Country */}
                                                    {step === 4 && (
                                                        <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                                            <h3 className="text-sm font-bold text-pink-300 uppercase tracking-widest mb-4">Basic Info (4/10)</h3>
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Date of Birth</label>
                                                                <input autoFocus type="date" value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-pink-500/50 transition-all outline-none" />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Country</label>
                                                                <input type="text" placeholder="Country" value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-pink-500/50 transition-all outline-none" />
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {/* Step 5: Address 1 */}
                                                    {step === 5 && (
                                                        <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                                            <h3 className="text-sm font-bold text-pink-300 uppercase tracking-widest mb-4">Address Details (5/10)</h3>
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Street Address</label>
                                                                <input autoFocus type="text" placeholder="House/Flat No, Street" value={formData.street1} onChange={e => setFormData({ ...formData, street1: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-pink-500/50 transition-all outline-none" />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Street Address 2</label>
                                                                <input type="text" placeholder="Apartment, suite, unit, etc." value={formData.street2} onChange={e => setFormData({ ...formData, street2: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-pink-500/50 transition-all outline-none" />
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {/* Step 6: City & State */}
                                                    {step === 6 && (
                                                        <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                                            <h3 className="text-sm font-bold text-pink-300 uppercase tracking-widest mb-4">Location (6/10)</h3>
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">City</label>
                                                                <input autoFocus type="text" placeholder="City" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-pink-500/50 transition-all outline-none" />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">State</label>
                                                                <input type="text" placeholder="State" value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-pink-500/50 transition-all outline-none" />
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {/* Step 7: PIN & Centre */}
                                                    {step === 7 && (
                                                        <motion.div key="step7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                                            <h3 className="text-sm font-bold text-pink-300 uppercase tracking-widest mb-4">Location & Campus (7/10)</h3>
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">PIN Code</label>
                                                                <input autoFocus type="text" placeholder="PIN Code" value={formData.pinCode} onChange={e => { setFormData({ ...formData, pinCode: e.target.value }); setErrors({ ...errors, pinCode: null }); }} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-pink-500/50 transition-all outline-none" />
                                                                {errors.pinCode && <p className="text-red-400 text-[10px] mt-1.5 ml-1 font-semibold bg-red-500/10 px-2 py-1 rounded-md border border-red-500/20">{errors.pinCode}</p>}
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Which Centre?</label>
                                                                <select value={formData.centre} onChange={e => setFormData({ ...formData, centre: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-pink-500/50 transition-all outline-none appearance-none cursor-pointer bg-slate-900">
                                                                    <option value="">Select a Centre</option>
                                                                    <option value="North Campus">North Campus</option>
                                                                    <option value="South Campus">South Campus</option>
                                                                    <option value="West Campus">West Campus</option>
                                                                    <option value="East Campus">East Campus</option>
                                                                </select>
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {/* Step 8: Level & Stream */}
                                                    {step === 8 && (
                                                        <motion.div key="step8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                                            <h3 className="text-sm font-bold text-pink-300 uppercase tracking-widest mb-4">Course Details (8/10)</h3>
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Level of Studies</label>
                                                                <select autoFocus value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-pink-500/50 transition-all outline-none appearance-none cursor-pointer bg-slate-900">
                                                                    <option value="">Select Level</option>
                                                                    <option value="Undergraduate">Undergraduate</option>
                                                                    <option value="Postgraduate">Postgraduate</option>
                                                                    <option value="Diploma">Diploma</option>
                                                                    <option value="Certificate">Certificate</option>
                                                                </select>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Stream of Interest</label>
                                                                <select value={formData.stream} onChange={e => setFormData({ ...formData, stream: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-pink-500/50 transition-all outline-none appearance-none cursor-pointer bg-slate-900">
                                                                    <option value="">Select a Stream</option>
                                                                    <option value="fashion">Fashion Design</option>
                                                                    <option value="interior">Interior Design</option>
                                                                    <option value="graphic">Graphic Design</option>
                                                                    <option value="animation">Animation</option>
                                                                </select>
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {/* Step 9: Scholarship & Comments */}
                                                    {step === 9 && (
                                                        <motion.div key="step9" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                                            <h3 className="text-sm font-bold text-pink-300 uppercase tracking-widest mb-4">Additional Info (9/10)</h3>
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Require Scholarship?</label>
                                                                <select autoFocus value={formData.scholarship} onChange={e => setFormData({ ...formData, scholarship: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-pink-500/50 transition-all outline-none appearance-none cursor-pointer bg-slate-900">
                                                                    <option value="">Select Option</option>
                                                                    <option value="Yes">Yes</option>
                                                                    <option value="No">No</option>
                                                                </select>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Comments/Questions</label>
                                                                <textarea rows="2" placeholder="Any specific questions?" value={formData.comments} onChange={e => setFormData({ ...formData, comments: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-pink-500/50 transition-all outline-none resize-none" />
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {/* Step 10: Finalizing */}
                                                    {step === 10 && (
                                                        <motion.div key="step10" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                                            <h3 className="text-sm font-bold text-pink-300 uppercase tracking-widest mb-4">Finalizing (10/10)</h3>

                                                            <div className="space-y-2">
                                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Your Communications</label>
                                                                <div className="flex gap-4 px-2">
                                                                    {['email', 'sms'].map((type) => (
                                                                        <label key={type} className="flex items-center gap-2 cursor-pointer group">
                                                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${formData.communications[type] ? 'bg-pink-500 border-pink-500' : 'border-slate-500 group-hover:border-pink-400'}`}>
                                                                                {formData.communications[type] && <Check size={10} className="text-white" />}
                                                                            </div>
                                                                            <input type="checkbox" className="hidden" checked={formData.communications[type]} onChange={() => toggleComm(type)} />
                                                                            <span className="text-xs uppercase font-bold text-slate-300">{type}</span>
                                                                        </label>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <div className="space-y-2 mt-4 px-2">
                                                                <label className="flex items-start gap-3 cursor-pointer group">
                                                                    <div className={`mt-0.5 min-w-[16px] h-4 rounded border flex items-center justify-center transition-all ${formData.privacy ? 'bg-pink-500 border-pink-500' : 'border-slate-500 group-hover:border-pink-400'}`}>
                                                                        {formData.privacy && <Check size={10} className="text-white" />}
                                                                    </div>
                                                                    <input type="checkbox" className="hidden" checked={formData.privacy} onChange={() => setFormData({ ...formData, privacy: !formData.privacy })} />
                                                                    <span className="text-[10px] text-slate-400 leading-tight">
                                                                        I confirm I have read the Privacy Notice.
                                                                    </span>
                                                                </label>
                                                            </div>

                                                            <div className="space-y-2 mt-2">
                                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Security Question</label>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="bg-white/10 px-4 py-3 rounded-xl text-white font-mono font-bold tracking-wider">
                                                                        {captcha.num1} + {captcha.num2} = ?
                                                                    </div>
                                                                    <input
                                                                        type="number"
                                                                        // autoFocus
                                                                        placeholder="Answer"
                                                                        value={formData.captchaInput}
                                                                        onChange={e => setFormData({ ...formData, captchaInput: e.target.value })}
                                                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-6 py-3 text-white focus:border-pink-500/50 transition-all outline-none"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* Footer Actions */}
                                            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between shrink-0">
                                                {step > 1 ? (
                                                    <button
                                                        type="button"
                                                        onClick={handleBack}
                                                        className="text-slate-400 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors"
                                                    >
                                                        Back
                                                    </button>
                                                ) : (
                                                    <div className="flex gap-1" />
                                                )}

                                                {/* Step Indicators */}
                                                <div className="absolute left-1/2 -translate-x-1/2 flex gap-1">
                                                    {[...Array(10)].map((_, i) => (
                                                        <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i + 1 <= step ? 'w-2 bg-pink-500' : 'w-1 bg-white/20'}`} style={{ width: i + 1 === step ? '16px' : '4px' }} />
                                                    ))}
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="group relative px-4 py-2 text-xs bg-white text-black rounded-lg font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all overflow-hidden"
                                                >
                                                    <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    <span className="relative z-10 group-hover:text-white flex items-center gap-2">
                                                        {step === 10 ? (isSubmitting ? 'Sending...' : 'Submit Request') : 'Next'}
                                                        {!isSubmitting && <ArrowRight size={14} />}
                                                    </span>
                                                </button>
                                            </div>

                                            <div className="text-center mt-4 shrink-0">
                                                <button
                                                    type="button"
                                                    onClick={() => setAuthMode('login')}
                                                    className="text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors py-2"
                                                >
                                                    Already a member? <span className="text-pink-400 underline underline-offset-4">Login here</span>
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                    {authMode === 'login' && (
                                        <form onSubmit={handleLoginSubmit} className="flex-1 flex flex-col justify-between">
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Email</label>
                                                    <input autoFocus type="email" placeholder="hello@example.com" value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:bg-black/30 focus:border-pink-500/50 transition-all shadow-inner" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Password</label>
                                                    <input type="password" placeholder="••••••••" value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:bg-black/30 focus:border-pink-500/50 transition-all shadow-inner" />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <button type="button" onClick={() => setAuthMode('forgot')} className="text-[10px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Forgot Password?</button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setAuthMode('register');
                                                            setStep(1);
                                                        }}
                                                        className="text-[10px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                                                    >
                                                        New to the collective? <span className="text-pink-400 underline underline-offset-4">Apply Now</span>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Login Footer Actions */}
                                            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4 shrink-0">
                                                <button type="submit" disabled={isSubmitting} className="w-full group relative px-6 py-4 bg-white text-black rounded-xl font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all overflow-hidden">
                                                    <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    <span className="relative z-10 group-hover:text-white flex items-center justify-center gap-2">
                                                        {isSubmitting ? 'Accessing...' : 'Enter System'}
                                                    </span>
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {authMode === 'forgot' && (
                                        <div className="flex-1 flex flex-col justify-between">
                                            {forgotStep === 1 ? (
                                                <form onSubmit={handleForgotPasswordRequest} className="space-y-6">
                                                    <p className="text-sm text-slate-300 mb-6 font-medium">Enter your registered email address to receive a 6-digit verification code.</p>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">Email Address</label>
                                                        <input autoFocus type="email" required placeholder="hello@example.com" value={forgotData.email} onChange={e => setForgotData({ ...forgotData, email: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:bg-black/30 focus:border-pink-500/50 transition-all shadow-inner" />
                                                    </div>

                                                    <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4">
                                                        <button type="submit" disabled={isSubmitting} className="w-full group relative px-6 py-4 bg-white text-black rounded-xl font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all overflow-hidden">
                                                            <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                            <span className="relative z-10 group-hover:text-white flex items-center justify-center gap-2">
                                                                {isSubmitting ? 'Sending Request...' : 'Send Verification Code'}
                                                            </span>
                                                        </button>
                                                        <button type="button" onClick={() => setAuthMode('login')} className="text-[10px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Return to Login</button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <form onSubmit={handlePasswordReset} className="space-y-6">
                                                    <p className="text-sm text-green-400 mb-6 font-medium bg-green-400/10 p-4 rounded-xl border border-green-500/20">We sent a 6-digit code to {forgotData.email}</p>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">6-Digit Code</label>
                                                        <input autoFocus type="text" maxLength="6" required placeholder="XXXXXX" value={forgotData.code} onChange={e => setForgotData({ ...forgotData, code: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white text-center tracking-[1em] focus:outline-none focus:bg-black/30 focus:border-pink-500/50 transition-all shadow-inner" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 ml-2">New Password</label>
                                                        <input type="password" required placeholder="••••••••" value={forgotData.newPassword} onChange={e => setForgotData({ ...forgotData, newPassword: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:bg-black/30 focus:border-pink-500/50 transition-all shadow-inner" />
                                                    </div>

                                                    <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4">
                                                        <button type="submit" disabled={isSubmitting} className="w-full group relative px-6 py-4 bg-white text-black rounded-xl font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all overflow-hidden">
                                                            <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                            <span className="relative z-10 group-hover:text-white flex items-center justify-center gap-2">
                                                                {isSubmitting ? 'Updating...' : 'Set New Password'}
                                                            </span>
                                                        </button>
                                                    </div>
                                                </form>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", damping: 15 }}
                                        className="w-24 h-24 rounded-full bg-linear-to-tr from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-500/30"
                                    >
                                        <Check size={48} className="text-white" />
                                    </motion.div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white uppercase mb-2">{authMode === 'register' ? 'Application Received' : 'Access Granted'}</h3>
                                        <p className="text-slate-300 max-w-xs mx-auto">
                                            {authMode === 'register' ? 'Welcome to the network. Our admissions team will contact you shortly.' : 'Welcome back, agent. Synchronizing your dashboard...'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white font-bold uppercase tracking-wider transition-all backdrop-blur-md"
                                    >
                                        Close
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

export default RegistrationModal;
