import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, ArrowRight, Star, Globe, ShieldCheck, Plus, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

const IccvsLuxe = () => {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            question: "What programs or courses does ICCVS Luxe offer?",
            answer: "ICCVS Luxe offers elite programs in Luxury Brand Management, Fashion Design Management, and specialized courses focusing on Indian craftsmanship and Parisian luxury standards."
        },
        {
            question: "How do i apply for admission to ICCVS Luxe?",
            answer: "You can apply through our online portal or by visiting our flagship campus. The selection process involves a portfolio review and a personal interview to assess your potential in the luxury sector."
        },
        {
            question: "Are Scholarships or Financial Aids available for students at ICCVS Luxe?",
            answer: "Yes, ICCVS Luxe provides merit-based scholarships for high-potential transformation artists. Details can be requested during the application process or through our academic counselors."
        }
    ];

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-secondary selection:text-white">
            <SEO 
                title="ICCVS Luxe Mumbai | International School of Design"
                description="Experience a first-of-its-kind luxury education in India & Paris. ICCVS Luxe Mumbai offers elite programs in fashion and design management."
            />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-40 md:pt-48 pb-64 px-6 md:px-12 lg:px-24 overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-20">
                    
                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 space-y-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-4 font-black"
                        >
                            <span className="text-sm tracking-[0.4em] text-slate-400 uppercase">Premium Experience</span>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl text-gold uppercase tracking-tighter leading-[0.9]">
                                ICCVS LUXE <br />
                                <span className="text-black">MUMBAI</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-600 font-bold max-w-lg leading-relaxed uppercase tracking-tight"
                        >
                            Introducing a first-of-its-kind experience in India & Paris. <br />
                            A unique destination for luxury and design enthusiasts.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-wrap items-center gap-8"
                        >
                            <button 
                                onClick={() => navigate('/course-apply-now')}
                                className="px-10 py-4 bg-gold text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-secondary transition-all transform hover:scale-105 shadow-xl shadow-gold/20"
                            >
                                Apply Now
                            </button>
                            <button className="flex items-center gap-3 text-slate-900 group">
                                <PlayCircle className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform" />
                                <span className="font-black uppercase text-xs tracking-widest">View all the Programs</span>
                            </button>
                        </motion.div>
                    </div>

                    {/* Right Logos */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="space-y-12 text-center lg:text-right"
                        >
                            <p className="text-xl font-black text-slate-900 uppercase tracking-tighter">
                                In Association with
                            </p>
                            
                            <div className="flex flex-col md:flex-row items-center gap-12 lg:justify-end">
                                <div className="text-center group">
                                    <div className="text-6xl md:text-8xl font-black text-black leading-none tracking-tighter">
                                        ESG <br /> LUXE
                                    </div>
                                    <div className="h-1.5 w-full bg-gold mt-2 group-hover:bg-secondary transition-colors" />
                                </div>
                                
                                <div className="text-center group">
                                    <div className="text-6xl md:text-8xl font-black text-black leading-none tracking-tighter">
                                        ESG <br /> <span className="text-secondary">SPORT</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-secondary mt-2 group-hover:bg-gold transition-colors" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Diagonal Edge Component */}
                <div 
                    className="absolute bottom-0 left-0 w-full h-32 md:h-48 bg-[#f4f4f7]"
                    style={{ clipPath: 'polygon(0 80%, 100% 0, 100% 100%, 0% 100%)' }}
                />
            </section>

            {/* --- CORE FEATURES --- */}
            <section className="bg-[#f4f4f7] py-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { 
                            title: "Paris Connection", 
                            desc: "Immersive workshops and industry exposure in the fashion capital of the world.",
                            icon: Globe
                        },
                        { 
                            title: "Luxury Pedagogy", 
                            desc: "Curriculum designed by global legacy experts from the luxury goods sector.",
                            icon: Star
                        },
                        { 
                            title: "Elite Network", 
                            desc: "Exclusive access to premium brands, luxury houses, and high-end design firms.",
                            icon: ShieldCheck
                        }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-secondary/5 flex items-center justify-center text-gold mb-8 group-hover:bg-secondary group-hover:text-white transition-all">
                                <feature.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">{feature.title}</h3>
                            <p className="text-slate-500 font-bold text-sm leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- PHILOSOPHY SECTION --- */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[50%] h-full bg-secondary/5 -skew-x-12 translate-x-1/2" />
                
                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="text-gold font-black uppercase tracking-[0.3em] text-[10px]">Excellence Defined</span>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                                Where Legacy <br /> <span className="text-secondary">Meets Innovation</span>
                            </h2>
                        </div>
                        <p className="text-slate-600 font-bold leading-relaxed text-lg italic">
                            "Luxury is not about the brand, but about the story, the craftsmanship, and the uncompromising pursuit of perfection."
                        </p>
                        <div className="space-y-4">
                            <p className="text-slate-500 font-medium">
                                ICCVS Luxe is a curated platform for the next generation of creative leaders. We bridge the gap between Indian craftsmanship and Parisian luxury standards through our exclusive partnership with ESG Luxe & ESG Sport.
                            </p>
                        </div>
                        <button className="flex items-center gap-4 text-secondary font-black uppercase text-xs tracking-widest hover:translate-x-3 transition-transform">
                            Discover the Heritage <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="relative h-[500px] md:h-[600px] mt-12 lg:mt-0">
                        {/* Primary Image */}
                        <div className="absolute top-0 left-0 w-[80%] h-[80%] rounded-[3rem] overflow-hidden shadow-xl border-4 border-white z-10 hover:shadow-2xl transition-shadow duration-500">
                            <img 
                                src="https://ik.imagekit.io/fmldynl4j4/ESG%20Luxe/WhatsApp%20Image%202025-04-11%20at%2012.03.36%20(1).jpeg?updatedAt=1774285587686" 
                                alt="ICCVS Luxe Education" 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                            />
                        </div>
                        {/* Secondary Image */}
                        <div className="absolute bottom-0 right-0 w-[65%] h-[60%] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-[#f4f4f7] z-20 transform hover:-translate-y-4 hover:-translate-x-4 transition-transform duration-700">
                            <img 
                                src="https://ik.imagekit.io/fmldynl4j4/ESG%20Luxe/WhatsApp%20Image%202025-04-11%20at%2012.03.36.jpeg?updatedAt=1774285587716" 
                                alt="ESG Sport Education" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute top-10 -left-6 md:-left-10 bg-gold text-white p-8 md:p-10 rounded-4xl shadow-2xl z-30 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="text-3xl md:text-4xl font-black text-center leading-none">ESG</div>
                            <div className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-center mt-2">Partnership</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PROGRAM INTEREST SECTION --- */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#c5a059]">
                <div className="max-w-7xl mx-auto space-y-16 text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                        Choose Your Program of Interest
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                        {[
                            { title: "Master Programs", img: "https://www.rathoreuniversity.com/wp-content/uploads/2024/09/1-year-fashion-design.jpg" },
                            { title: "Bachelor Programs", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSYv0poO3gKDj65QD7NUaDkImIGdMLZNUeig&s" },
                            { title: "Diploma Programs", img: "https://r.fashionunited.com/oNpO8OJMVKZNUCcYC2oA4suF-lsG9c36xIDekzr3K6U/resize:fill:360:288:0/gravity:ce/quality:70/aHR0cHM6Ly9mYXNoaW9udW5pdGVkLmNvbS9tZWRpYS9pbWFnZXMvZmFzaGlvbl9zY2hvb2xzX2RpcmVjdG9yeV9iYW5uZXJfbW9iaWxlLmpwZw" },
                            { title: "Certificate Programs", img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800" },
                        ].map((program, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="space-y-6 group cursor-pointer"
                            >
                                <div className="relative aspect-3/2 rounded-[2.5rem] overflow-hidden shadow-2xl">
                                    <img 
                                        src={program.img} 
                                        alt={program.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-slate-800 uppercase tracking-tighter transition-colors group-hover:text-white">
                                    {program.title}
                                </h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FAQ SECTION --- */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-16 tracking-tight">
                        Frequently Asked Questions (FAQs)
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="border-b border-slate-100 last:border-0">
                                <button 
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 transition-colors group text-left"
                                >
                                    <div className="flex items-center gap-6">
                                        <Plus className={`w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-transform duration-500 ${openFaq === idx ? 'rotate-45' : ''}`} />
                                        <span className="text-lg md:text-xl font-bold text-slate-700 tracking-tight leading-tight">
                                            {faq.question}
                                        </span>
                                    </div>
                                    <ChevronRight className={`w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-transform duration-500 ${openFaq === idx ? 'rotate-90' : ''}`} />
                                </button>
                                
                                <AnimatePresence>
                                    {openFaq === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                                            className="overflow-hidden bg-slate-50"
                                        >
                                            <p className="px-16 pb-8 text-slate-500 font-medium leading-relaxed max-w-4xl">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-white border-t border-slate-100">
                <div className="max-w-5xl mx-auto text-center space-y-12">
                    <h2 className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter">
                        Join the <span className="text-secondary">Elite</span>
                    </h2>
                    <p className="text-slate-500 font-bold text-lg md:text-xl max-w-2xl mx-auto uppercase tracking-tight">
                        Experience the convergence of business and design. Apply for the 2026 international exchange program today.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button 
                            onClick={() => navigate('/course-apply-now')}
                            className="px-12 py-5 bg-gold text-white rounded-full font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-secondary hover:text-white transition-all transform hover:scale-105"
                        >
                            Start Application
                        </button>
                        <button className="px-12 py-5 border border-slate-200 text-slate-900 rounded-full font-black uppercase text-xs tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                            Request Brochure
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default IccvsLuxe;
