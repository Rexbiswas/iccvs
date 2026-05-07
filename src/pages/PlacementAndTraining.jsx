import React from 'react';
import { motion } from 'framer-motion';
import { 
    Award, 
    Briefcase, 
    Users, 
    TrendingUp, 
    BadgeCheck, 
    Globe, 
    ArrowRight,
    Star,
    CheckCircle2,
    Building2,
    GraduationCap,
    MessageSquare
} from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import { useAdmissionModal } from '../context/AdmissionModalContext';

const PlacementAndTraining = () => {
    const { openAdmissionModal } = useAdmissionModal();
    return (
        <div className="bg-white min-h-screen font-sans selection:bg-primary selection:text-white">
            <SEO 
                title="Placement & Training Partners | INSD"
                description="Explore INSD's vast corporate network and placement records. We provide comprehensive training to ensure our students are industry-ready for top design houses and global brands."
            />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-48 px-6 md:px-12 lg:px-24 overflow-hidden bg-slate-50">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="w-full lg:w-2/3 space-y-8 text-center lg:text-left mx-auto lg:mx-0">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="space-y-4"
                            >
                                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-primary/10">
                                    Placement & Training
                                </span>
                                <h1 className="text-5xl md:text-[6.5rem] font-black text-slate-900 uppercase tracking-tighter leading-[0.85]">
                                    Crafting <br />
                                    <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Careers</span>
                                </h1>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-xl text-slate-600 font-bold max-w-2xl leading-relaxed uppercase tracking-tight"
                            >
                                More than just a portfolio. We build professional identities. Connecting INSD talent with the world's most prestigious design houses.
                            </motion.p>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-4"
                            >
                                <button 
                                    onClick={() => openAdmissionModal({ 
                                        title: 'Download Placement Report', 
                                        subtitle: 'Please fill in your details to receive our latest placement audit and report.',
                                        successMsg: 'Your request has been received! The placement report will be sent to your email shortly.'
                                    })}
                                    className="h-16 md:h-20 px-12 bg-slate-900 text-white rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-primary transition-all transform hover:scale-105 shadow-2xl shadow-slate-900/10 flex items-center justify-center"
                                >
                                    Download Placement Report
                                </button>
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-4">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-slate-200">
                                                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Student" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-slate-900 font-black text-xs leading-none">10K+ PLACEMENTS</p>
                                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Global Network</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="w-full lg:w-1/3">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                className="relative p-12 bg-white rounded-[3.5rem] border border-slate-100 shadow-3xl text-center space-y-8 overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-primary mb-2">
                                        <Building2 size={40} />
                                    </div>
                                    <h4 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">300+</h4>
                                    <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em]">Hiring Partners</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 bg-slate-50 rounded-3xl">
                                        <p className="text-2xl font-black text-slate-900 tracking-tight">18 LPA</p>
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Highest Package 2025</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-3xl">
                                        <p className="text-2xl font-black text-slate-900 tracking-tight">98%</p>
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Placement Record</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- TRAINING ECOSYSTEM --- */}
            <section className="py-32 px-6 md:px-12 lg:px-24 bg-white">
                <div className="max-w-7xl mx-auto space-y-24">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                        <div className="space-y-6 max-w-2xl text-center md:text-left mx-auto md:mx-0">
                            <span className="text-primary font-black uppercase text-[10px] tracking-[0.4em]">The INSD Advantage</span>
                            <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                                Career <span className="text-slate-300 text-[10px]">Readiness</span> <br /> Blueprint
                            </h2>
                        </div>
                        <p className="text-slate-500 font-bold text-sm uppercase tracking-tight max-w-md text-center md:text-right">
                            We don't just provide job leads. We train you through every stage—from portfolio building to professional industry preparation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { 
                                title: "Build Your Portfolio", 
                                icon: BadgeCheck, 
                                desc: "Rigorous auditing of your academic body of work to align with global creative agency standards." 
                            },
                            { 
                                title: "Get Industry Ready", 
                                icon: Users, 
                                desc: "Personal branding, soft skills, and leadership communication training for high-value client interaction." 
                            },
                            { 
                                title: "Prepare for Interviews", 
                                icon: MessageSquare, 
                                desc: "Realistic mock interview panels with industry experts to refine your storytelling and expertise." 
                            }
                        ].map((item, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 hover:bg-slate-900 group transition-all duration-500"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm border border-slate-100 mb-8">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 group-hover:text-white uppercase tracking-tighter mb-4 transition-colors">{item.title}</h3>
                                <p className="text-slate-500 group-hover:text-slate-400 font-bold text-xs uppercase tracking-widest leading-relaxed transition-colors">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* --- PLACEMENT SPOTLIGHT --- */}
            <section className="py-32 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="space-y-4 text-center md:text-left">
                            <span className="text-primary font-black uppercase text-[10px] tracking-[0.4em]">success spotlight</span>
                            <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                                Recent <span className="text-slate-300">Hires</span>
                            </h2>
                        </div>
                        <button 
                            onClick={() => openAdmissionModal({
                                title: 'View All success stories',
                                subtitle: 'Get inspired by the journeys of our top achievers.',
                                ctaText: 'View Stories'
                            })}
                            className="h-16 md:h-20 px-10 border border-slate-200 text-slate-900 rounded-full font-black uppercase text-xs tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center"
                        >
                            Browse All success stories
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { name: "Sanya Gupta", label: "LUXURY FASHION HOUSE", role: "Sr. Creative Lead", loc: "London", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800" },
                            { name: "Kabir Mehra", label: "GLOBAL DESIGN FIRM", role: "Interaction Designer", loc: "Singapore", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" },
                            { name: "Meera Das", label: "PREMIUM INTERIORS", role: "Concept Architect", loc: "Dubai", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800" }
                        ].map((hire, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group cursor-pointer relative"
                            >
                                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl">
                                    <img src={hire.img} alt={hire.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                                    <div className="absolute bottom-10 left-10 p-2 space-y-1">
                                        <p className="text-primary font-black text-[10px] tracking-widest uppercase">{hire.label}</p>
                                        <p className="text-white text-3xl font-black tracking-tighter uppercase leading-none">{hire.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-start justify-between px-4">
                                    <div>
                                        <p className="text-slate-900 font-black text-lg uppercase tracking-tighter leading-tight">{hire.role}</p>
                                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">{hire.loc}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="py-32 px-6 md:px-12 lg:px-24 bg-slate-900 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[200px] rounded-full" />
                 
                 <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
                     <div className="inline-block p-4 rounded-full bg-white/5 border border-white/10 mb-4 animate-bounce">
                         <Star size={40} className="text-primary fill-primary" />
                     </div>
                     <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]">
                         Your Career <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Begins Here</span>
                     </h2>
                     <p className="text-slate-400 font-bold text-lg md:text-2xl max-w-3xl mx-auto uppercase tracking-tight leading-relaxed">
                         Don't just dream about the industry. Become part of it. Join the INSD talent pool and let your professional journey take flight.
                     </p>
                     <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
                         <button 
                            onClick={() => openAdmissionModal({
                                title: 'Connect with Placement Head',
                                subtitle: 'Get personalized career guidance from our industry experts.',
                                ctaText: 'Request Meeting'
                            })}
                            className="h-16 md:h-20 px-12 bg-primary text-white rounded-full font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-secondary transition-all transform hover:scale-105 flex items-center justify-center"
                         >
                             Connect with Placement Head
                         </button>
                         <button 
                            onClick={() => openAdmissionModal({
                                title: 'View Career Guide',
                                subtitle: 'Download our comprehensive 2026 design career roadmap.',
                                ctaText: 'Download Guide'
                            })}
                            className="h-16 md:h-20 px-12 border border-white/20 text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center"
                         >
                             View Career Guide
                         </button>
                     </div>
                 </div>
            </section>

            <Footer />
        </div>
    );
};

export default PlacementAndTraining;
