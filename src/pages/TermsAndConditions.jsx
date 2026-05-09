import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck, Scale, AlertCircle, Clock, Gavel } from 'lucide-react';

const TermsAndConditions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing or using insd.edu.in, its subdomains, or any related online platforms or applications (collectively, the “Website”), you (“User”, “you”, “your”) agree to be bound by these Terms and Conditions (“Terms”). If you do not agree to these Terms, you should not access or use the Website.",
            icon: <Scale className="w-6 h-6 text-primary" />
        },
        {
            title: "2. About INSD and Website Content",
            content: "International School of Design (“INSD”, “we”, “us”, “our”) is a design education institution offering various programs and courses in fashion, interior, graphic and related fields across India. We aim to keep the information on the Website accurate and up to date; however, course structures, modules, locations, fees, schedules and other details are subject to change, modification, suspension or discontinuation at any time without prior notice. Nothing on the Website constitutes a binding offer of admission or guarantee of course availability.",
            icon: <FileText className="w-6 h-6 text-primary" />
        },
        {
            title: "3. Eligibility and Your Responsibilities",
            content: "The Website is intended for individuals who can form a legally binding contract under applicable law; if you are under 18, you may use the Website only with the consent and supervision of a parent or legal guardian. You are responsible for ensuring that all information you provide on the Website is true, accurate, current and complete.",
            icon: <ShieldCheck className="w-6 h-6 text-primary" />
        },
        {
            title: "4. Permitted Use and User Conduct",
            content: "You agree to use the Website only for lawful purposes. You agree that you will not: use the Website in any manner that could damage or disable any INSD server; attempt to gain unauthorised access; upload defamatory or obscene content; infringe intellectual property rights; or send unsolicited advertising/spam.",
            icon: <Gavel className="w-6 h-6 text-primary" />
        },
        {
            title: "5. Intellectual Property",
            content: "All content on the Website—including text, graphics, logos, icons, images, and software—is owned by or licensed to INSD and protected by applicable intellectual property laws. You may download or print limited portions solely for personal, non-commercial reference.",
            icon: <Scale className="w-6 h-6 text-primary" />
        },
        {
            title: "6. User Content",
            content: "Where the Website allows you to submit content, you remain solely responsible for it. By submitting, you grant INSD a worldwide, royalty-free licence to use, reproduce, and distribute such content for academic and promotional purposes.",
            icon: <FileText className="w-6 h-6 text-primary" />
        },
        {
            title: "7. Privacy and Data Security",
            content: "Your use of the Website is also governed by our Privacy Policy and Cookie Policy. We take reasonable technical measures to protect your data, but we do not guarantee complete security.",
            icon: <ShieldCheck className="w-6 h-6 text-primary" />
        },
        {
            title: "8. Third-Party Links",
            content: "The Website may contain links to third-party sites not owned by INSD. INSD does not endorse and is not responsible for the content or practices of such third-party sites; your use of them is at your own risk.",
            icon: <AlertCircle className="w-6 h-6 text-primary" />
        },
        {
            title: "9. Disclaimers",
            content: "The Website is provided on an “as is” basis without warranties. INSD does not warrant that the Website will be uninterrupted or error-free. Any reliance on Website information is strictly at your own risk.",
            icon: <AlertCircle className="w-6 h-6 text-primary" />
        },
        {
            title: "10. Limitation of Liability",
            content: "To the fullest extent permitted by law, INSD will not be liable for any direct, indirect, or consequential damages arising from your use of the Website or reliance on its content.",
            icon: <Gavel className="w-6 h-6 text-primary" />
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen font-sans selection:bg-primary/10 selection:text-primary">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-white border-b border-slate-200">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                            <Scale size={12} />
                            Legal Documentation
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-8">
                            Terms & <span className="text-primary italic">Conditions</span>
                        </h1>
                        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-500 text-sm font-bold uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-primary" />
                                Last Updated: May 09, 2026
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={16} className="text-primary" />
                                Official Policy
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 container mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-12">
                        {sections.map((section, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 border border-slate-100">
                                        {section.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">
                                            {section.title}
                                        </h2>
                                        <p className="text-slate-600 leading-relaxed text-base">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Remaining full text details as provided by user */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="p-8 rounded-[32px] bg-slate-900 text-white mt-16 shadow-2xl shadow-slate-900/20"
                        >
                            <h3 className="text-2xl font-black mb-6 uppercase italic">Important Notice</h3>
                            <div className="space-y-6 text-slate-400 font-medium">
                                <p>For sections 11 through 16 including Indemnity, Force Majeure, and Governing Law, please refer to our full legal framework. These terms are governed by the laws of India, and the courts at New Delhi shall have exclusive jurisdiction.</p>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">Contact Legal Department</h4>
                                    <p className="text-slate-400">For any questions or concerns regarding these Terms, please contact: <a href="mailto:office@insd.edu.in" className="text-primary hover:underline transition-all font-black">office@insd.edu.in</a></p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar / Quick Links */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="sticky top-32">
                            <div className="p-8 rounded-[32px] bg-white shadow-xl shadow-slate-200/50 border border-slate-100">
                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-6">Quick Navigation</h3>
                                <div className="space-y-4">
                                    {sections.slice(0, 5).map((section, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-slate-500 hover:text-primary transition-colors cursor-pointer group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary transition-colors" />
                                            <span className="text-xs font-black uppercase tracking-widest truncate">{section.title}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-8 border-t border-slate-100">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] leading-relaxed">
                                        By using our website, you acknowledge that you have read and understood these terms in their entirety.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 p-8 rounded-[32px] bg-linear-to-tr from-primary to-secondary text-white shadow-xl shadow-primary/20">
                                <h3 className="text-lg font-black uppercase mb-4 italic">Need Help?</h3>
                                <p className="text-white/80 text-sm font-medium mb-6 leading-relaxed">If you have any questions about our terms, our support team is here to help.</p>
                                <button className="w-full py-4 bg-white text-primary rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all duration-500 shadow-lg">
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
};

export default TermsAndConditions;
