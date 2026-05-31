import React from 'react';
import { motion } from 'framer-motion';
import { 
    Users, 
    MessageSquare, 
    Video, 
    Calendar, 
    Award, 
    Globe, 
    TrendingUp,
    Mic2,
    Briefcase,
    Star,
    ArrowRight,
    X,
    Cpu,
    Target,
    Layers,
    ShieldCheck,
    BarChart3
} from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import PartnerFormModal from '../components/PartnerFormModal';
import EIDC_Slider from '../components/EIDC_Slider';
import ConclaveSlider from '../components/ConclaveSlider';


const IndustryInteraction = () => {
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [videoState, setVideoState] = React.useState({ isOpen: false, id: "cOfbepnObYX" });
    const [currentTime, setCurrentTime] = React.useState("00:00:00");

    React.useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-GB', { hour12: false }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    React.useEffect(() => {
        if (videoState.isOpen) {
            const script = document.createElement('script');
            script.src = `https://go.screenpal.com/player/appearance/${videoState.id}`;
            script.async = true;
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            };
        }
    }, [videoState.isOpen, videoState.id]);

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-primary selection:text-white">
            <SEO 
                title="Industry Interaction & Expert Sessions | INSD"
                description="Connect with the world's most influential design leaders through INSD's industry interaction program. We host regular masterclasses, workshops, and expert sessions to bridge the gap between classroom and career."
            />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-24 px-6 md:px-12 lg:px-24 overflow-hidden bg-slate-50">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=1600" 
                        alt="Industry Interaction" 
                        className="w-full h-full object-cover opacity-5"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-slate-50 via-slate-50/90 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-4xl space-y-8 text-center md:text-left mx-auto md:mx-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-4"
                        >
                            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-primary/10">
                                Bridging the Gap
                            </span>
                            <h1 className="text-5xl md:text-[6rem] font-black text-slate-900 uppercase tracking-tighter leading-[0.9]">
                                Industry <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Interaction</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-600 font-bold max-w-2xl leading-relaxed uppercase tracking-tight"
                        >
                            Exposing students to real-world workflows through high-impact masterclasses, workshops, and live interactions with global design titans.
                        </motion.p>
                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-wrap items-center justify-center md:justify-start gap-8 pt-4"
                        >
                                <button className="px-10 py-4 bg-slate-900 text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-primary transition-all transform hover:scale-105 shadow-xl shadow-slate-900/10">
                                    Our Ecosystem
                                </button>
                            <button 
                                onClick={() => setVideoState({ isOpen: true, id: "cOfbepnObYX" })}
                                className="flex items-center gap-3 text-slate-900 group"
                            >
                                <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                                    <Video className="w-5 h-5" />
                                </div>
                                <span className="font-black uppercase text-xs tracking-widest">Watch Archives</span>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- INTERACTION MODES --- */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-white relative z-20">
                <div className="max-w-7xl mx-auto space-y-24">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {[
                            { 
                                title: "Masterclasses", 
                                icon: Mic2, 
                                desc: "Deep dives into specialized techniques led by international masters." 
                            },
                            { 
                                title: "Live Portfolio Reviews", 
                                icon: Star, 
                                desc: "Get one-on-one feedback from industry leaders on your professional body of work." 
                            },
                            { 
                                title: "Workshop Residencies", 
                                icon: Briefcase, 
                                desc: "Intensive 3-5 day programs focused on product innovation and execution." 
                            },
                            { 
                                title: "Virtual Summits", 
                                icon: Globe, 
                                desc: "Connecting with global design trends through online interaction labs." 
                            }
                        ].map((mode, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="space-y-6 group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm border border-slate-100">
                                    <mode.icon size={28} />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">{mode.title}</h3>
                                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest leading-relaxed">
                                    {mode.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>


                    {/* --- VIDEO SHOWCASE: INDUSTRY VISITS --- */}
                    <div className="pt-24 space-y-16">
                        <div className="text-center space-y-4">
                            <span className="text-primary font-black uppercase text-[10px] tracking-[0.4em]">Live from the Hub</span>
                            <h2 className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                                INDUSTRY <span className="text-slate-300">EXPOSURE</span>
                            </h2>
                            <p className="text-slate-500 font-bold text-xs md:text-sm uppercase tracking-widest max-w-lg mx-auto leading-relaxed">
                                Experience the raw energy of our industry visits and masterclasses through the lens of our students.
                            </p>
                        </div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-video rounded-[3.5rem] overflow-hidden bg-slate-900 group shadow-2xl"
                        >
                            {/* Cinematic Video Background */}
                            <video 
                                autoPlay 
                                loop 
                                muted 
                                playsInline 
                                className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000 pointer-events-none"
                            >
                                <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-show-runway-with-models-34444-large.mp4" type="video/mp4" />
                            </video>
                            
                            {/* Live/Real-time Indicator Overlay */}
                            <div className="absolute top-8 left-8 flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#db3436]" />
                                <span className="text-white text-[9px] font-black uppercase tracking-[0.4em]">REAL-TIME FEED</span>
                            </div>

                            {/* Animated Play Button Wrapper */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.button
                                    onClick={() => setVideoState({ isOpen: true, id: "cOfbf9nObOZ" })}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-2xl transition-all group-hover:bg-primary group-hover:text-white"
                                >
                                    <ArrowRight size={32} className="ml-2 group-hover:scale-110 transition-transform" />
                                    
                                    {/* Pulse Effect */}
                                    <div className="absolute inset-0 rounded-full border border-white/50 animate-ping opacity-20" />
                                </motion.button>
                            </div>

                            {/* Video Progress Bar (Simulation) */}
                            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10 overflow-hidden">
                                <motion.div 
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "0%" }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className="h-full w-full bg-primary shadow-[0_0_15px_#db3436]"
                                />
                            </div>

                            <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between items-end gap-6 pointer-events-none">
                                <div className="space-y-2">
                                    <span className="text-white/60 font-black uppercase tracking-[0.4em] text-[10px]">Documentary Series</span>
                                    <h4 className="text-white text-3xl font-black uppercase tracking-tighter">Day in the life: Paris Fashion Week</h4>
                                </div>
                                <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span>TIMECODE: {currentTime}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* --- NEW DESIGN CONCLAVE SECTION: THE GLOBAL SUMMIT --- */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto space-y-24">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                        <div className="space-y-6">
                            <span className="text-primary font-black uppercase text-[10px] tracking-[0.5em]">Annual Flagship Summit</span>
                            <h2 className="text-6xl md:text-[9rem] font-black text-slate-900 uppercase tracking-tighter leading-[0.8]">
                                DESIGN <br /> <span className="text-slate-200">CONCLAVE</span>
                            </h2>
                        </div>
                        <div className="max-w-md text-right space-y-6">
                             <p className="text-slate-500 font-bold text-sm uppercase tracking-widest leading-relaxed">
                                Our industry benchmark event where international CEOs, luxury curators, and tech pioneers converge to set the design agenda for the next decade.
                             </p>
                             <button className="px-8 py-4 bg-slate-950 text-white rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:bg-primary transition-all">
                                Explore previous editions
                             </button>
                        </div>
                    </div>



                    {/* Conclave Moments Slider */}
                    <div className="relative z-10 -mx-6 md:-mx-12 lg:-mx-24 mt-24">
                        <ConclaveSlider />
                    </div>
                </div>
            </section>

            {/* --- EIDC SLIDER SECTION --- */}
            <EIDC_Slider />



            {/* --- TESTIMONIAL --- */}
            <section className="py-32 px-6 md:px-12 lg:px-24 bg-white">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((_, i) => <Star key={i} size={20} className="text-primary fill-primary" />)}
                    </div>
                    <blockquote className="text-2xl md:text-4xl font-black text-slate-800 uppercase tracking-tighter leading-tight italic">
                        "The guest sessions at INSD weren't just lectures; they were reality checks. Hearing directly from someone building the brands we only see in magazines changed how I approached my designs."
                    </blockquote>
                    <div className="space-y-1">
                        <p className="text-slate-900 font-black uppercase tracking-widest text-sm">— ARYA MALHOTRA</p>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Master of Fashion Design '24</p>
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-slate-900 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full" />
                 
                 <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                     <div className="space-y-6 text-center md:text-left">
                         <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                             Join the <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Conversation</span>
                         </h2>
                         <p className="text-slate-400 font-bold text-lg uppercase tracking-tight max-w-md">
                             Are you a design leader interested in mentoring the next generation of creative talent?
                         </p>
                     </div>
                     <div className="flex flex-col sm:flex-row gap-6">

                        <button 
                            onClick={() => setIsFormOpen(true)}
                            className="px-10 py-5 border border-white/20 text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-white hover:text-slate-900 transition-all"
                        >
                            Partner with us
                        </button>
                     </div>
                 </div>
            </section>

            <PartnerFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

            {/* --- VIDEO ARCHIVE MODAL --- */}
            {videoState.isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
                        onClick={() => setVideoState(prev => ({ ...prev, isOpen: false }))}
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="relative w-full max-w-[400px] bg-black rounded-[3rem] overflow-hidden shadow-2xl border border-white/10"
                    >
                        <button 
                            onClick={() => setVideoState(prev => ({ ...prev, isOpen: false }))}
                            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-2">
                             <div 
                                className="sp-embed-player" 
                                data-id={videoState.id}
                                data-aspect-ratio="0.562500" 
                                data-padding-top="177.777778%" 
                                style={{ position: 'relative', width: '100%', paddingTop: '177.777778%', height: 0 }}
                             >
                                <iframe 
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }} 
                                    scrolling="no" 
                                    src={`https://go.screenpal.com/player/${videoState.id}?ff=1&ahc=1&dcc=1&tl=1&bg=transparent&share=1&download=1&embed=1&cl=1`}
                                    allowFullScreen={true}
                                ></iframe>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default IndustryInteraction;
