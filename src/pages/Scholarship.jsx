import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, GraduationCap, Calendar, CheckCircle2, ChevronRight, FileText, Gift, Sparkles, BookOpen, ShieldCheck, HelpCircle, ArrowRight, UserCheck } from 'lucide-react';
import { useRegisterModal } from '../context/RegisterModalContext';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const scholarshipTypes = [
    {
        title: "Merit-Based Excellence",
        tag: "Academic Achievers",
        desc: "Designed for high-performing students who have demonstrated outstanding academic results or technical aptitude.",
        waiver: "Merit Scholarship",
        eligibility: "80% and above in school/college examinations or high score in ICCVS Aptitude Test.",
        gradient: "from-[#DB3436] to-[#ff6b6b]",
        icon: Award
    },
    {
        title: "Need-Based Financial Aid",
        tag: "Equal Opportunity",
        desc: "Dedicated to supporting brilliant minds from economically constrained backgrounds who wish to acquire industry-ready computer skills.",
        waiver: "Financial Aid",
        eligibility: "Based on family income statements, academic inclination, and a personal counselor interview.",
        gradient: "from-[#2563EB] to-[#60A5FA]",
        icon: Gift
    }
];

const steps = [
    {
        number: "01",
        title: "Online Registration",
        desc: "Click on 'Apply for Scholarship' and fill out our registration form. Make sure to check the 'Require Scholarship' option in the final step."
    },
    {
        number: "02",
        title: "Counselor Evaluation",
        desc: "Our academic counselor will schedule a brief discussion (online or in-person) to review your goals, eligibility, and academic records."
    },
    {
        number: "03",
        title: "Scholarship & Enrollment",
        desc: "Once approved, receive your scholarship offer details and enroll directly into your tech program with a reduced fee structure."
    }
];

const faqs = [
    {
        q: "How are the scholarship amounts decided?",
        a: "Scholarships are awarded based on student eligibility, academic records, and performance in our counselor evaluation."
    },
    {
        q: "Are these scholarships applicable to all computer and design courses?",
        a: "Yes! Scholarships are applicable to all our certified training programs, including Data Analytics, Web Designing, Tally Prime, Software Engineering, and Diploma programs."
    },
    {
        q: "What documents are required to claim the scholarship?",
        a: "Typically, you'll need your academic transcripts (mark sheets), government ID, and relevant income proofs (only for need-based aid) during the evaluation session."
    },
    {
        q: "Is there an application fee for the scholarship?",
        a: "No, applying for the ICCVS scholarship is completely free of charge. You only need to register and complete the counseling assessment."
    }
];

const Scholarship = () => {
    const { openModal } = useRegisterModal();
    const [activeFaq, setActiveFaq] = useState(null);

    return (
        <div className="bg-slate-950 min-h-screen text-slate-100 font-sans selection:bg-[#DB3436] selection:text-white overflow-hidden">
            <SEO 
                title="ICCVS Scholarship Program | Technical & Coding Courses"
                description="Apply for the ICCVS Computer Education Scholarship. Get scholarship support on premium IT training, Python coding, data analytics, web designing, and accounting programs."
                keywords="computer education scholarship, computer courses scholarship Delhi, coding scholarship, web design financial aid, ICCVS, free computer course evaluation"
            />

            {/* Glowing Abstract Backgrounds */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/10 blur-[180px] rounded-full pointer-events-none -z-10" />
            <div className="absolute top-[800px] right-1/4 w-[600px] h-[600px] bg-[#00D893]/5 blur-[200px] rounded-full pointer-events-none -z-10" />

            {/* HERO SECTION */}
            <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black uppercase tracking-[0.2em] mb-8"
                >
                    <Award size={14} className="animate-pulse" />
                    <span>EMPOWERING TECH TALENT</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-white max-w-4xl"
                >
                    Unlock Your Future with <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DB3436] to-[#ff7b7b] italic font-serif font-light normal-case">
                        ICCVS Scholarship
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-slate-400 text-lg md:text-xl max-w-2xl mt-8 leading-relaxed font-medium"
                >
                    We believe financial constraints should never stand in the way of ambition. Access scholarship opportunities on our premium coding, IT, and creative courses.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-10 flex flex-wrap gap-4 justify-center"
                >
                    <button
                        onClick={openModal}
                        className="h-14 px-8 md:px-10 bg-gradient-to-r from-[#DB3436] to-[#e84a4c] text-white rounded-full font-black uppercase tracking-wider text-xs shadow-[0_10px_25px_-5px_rgba(219,52,54,0.4)] flex items-center gap-3 hover:scale-105 transition-transform"
                    >
                        Apply For Scholarship
                        <ArrowRight size={16} />
                    </button>
                    <a
                        href="#schemes"
                        className="h-14 px-8 md:px-10 bg-slate-900 border border-white/10 hover:border-red-500/30 text-slate-300 hover:text-white rounded-full font-black uppercase tracking-wider text-xs flex items-center justify-center transition-colors"
                    >
                        Explore Schemes
                    </a>
                </motion.div>
            </section>

            {/* STATS OVERVIEW */}
            <section className="border-y border-white/5 bg-white/[0.02] backdrop-blur-xl">
                <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/5">
                    <div className="flex flex-col items-center p-4">
                        <span className="text-4xl md:text-5xl font-black text-white">1000+</span>
                        <span className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-[0.2em] mt-2">Scholarships Awarded</span>
                    </div>
                    <div className="flex flex-col items-center p-4">
                        <span className="text-4xl md:text-5xl font-black text-white">1-on-1</span>
                        <span className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-[0.2em] mt-2">Dedicated Mentorship</span>
                    </div>
                </div>
            </section>

            {/* SCHOLARSHIP SCHEMES */}
            <section id="schemes" className="py-20 md:py-28 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
                        Scholarship Pathways
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base font-medium">
                        Choose the program that matches your background and goals.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {scholarshipTypes.map((type, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 35 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            className="bg-slate-900/50 border border-white/5 hover:border-red-500/20 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between hover:shadow-2xl hover:shadow-red-500/5 transition-all duration-500 group"
                        >
                            <div>
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${type.gradient} flex items-center justify-center text-white mb-8 shadow-lg`}>
                                    <type.icon size={26} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400">{type.tag}</span>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight mt-2 mb-4 group-hover:text-red-400 transition-colors">
                                    {type.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                                    {type.desc}
                                </p>
                            </div>

                            <div className="pt-6 border-t border-white/5 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Benefit</span>
                                    <span className="text-sm font-black text-white bg-white/5 px-3 py-1 rounded-full border border-white/5">{type.waiver}</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Eligibility</span>
                                    <p className="text-xs text-slate-400 leading-relaxed font-medium">{type.eligibility}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* SELECTION PROCESS */}
            <section className="py-20 md:py-28 border-t border-white/5 bg-slate-950 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-5 space-y-6">
                            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#00D893]">EASY ADMISSIONS</span>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">
                                How to Apply & <br />Get Awarded
                            </h2>
                            <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                                Our evaluation system is fast and transparent. In just three simple steps, you can secure your financial aid and start coding.
                            </p>
                            <div className="pt-4">
                                <button
                                    onClick={openModal}
                                    className="h-14 px-8 bg-white text-slate-950 hover:bg-[#DB3436] hover:text-white rounded-full font-black uppercase tracking-wider text-xs flex items-center gap-3 transition-all duration-300"
                                >
                                    Start Application
                                    <UserCheck size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-7 space-y-6">
                            {steps.map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                                    className="flex items-start gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                                >
                                    <div className="text-3xl font-black text-red-500/20 font-mono tracking-tight shrink-0 select-none">
                                        {step.number}
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-lg font-black text-white uppercase tracking-tight">{step.title}</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed font-medium">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-20 md:py-28 border-t border-white/5 max-w-5xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white flex items-center justify-center gap-3">
                        <HelpCircle className="text-red-500 w-8 h-8 md:w-12 md:h-12" />
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden transition-colors"
                        >
                            <button
                                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-bold text-sm md:text-base text-white uppercase tracking-tight">{faq.q}</span>
                                <ChevronRight
                                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeFaq === i ? 'rotate-90 text-red-500' : ''}`}
                                />
                            </button>

                            <AnimatePresence initial={false}>
                                {activeFaq === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 pt-2 text-slate-400 text-sm leading-relaxed font-medium border-t border-white/5">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>

            {/* CALL TO ACTION BOTTOM */}
            <section className="relative py-24 md:py-32 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-[#00D893]/10 opacity-30 pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">
                        Shape Your Career <br />
                        Without Fee Burden.
                    </h2>
                    <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto font-medium">
                        Begin your enrollment application today. Our counselors are ready to help you navigate through the process and secure your scholarship.
                    </p>
                    <div className="pt-4">
                        <button
                            onClick={openModal}
                            className="h-16 px-12 bg-white text-slate-950 hover:bg-[#DB3436] hover:text-white rounded-full font-black uppercase tracking-widest text-xs shadow-2xl flex items-center gap-3 mx-auto hover:scale-105 transition-transform"
                        >
                            APPLY FOR SCHOLARSHIP NOW
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </section>

            <Footer showTagline={false} />
        </div>
    );
};

export default Scholarship;
