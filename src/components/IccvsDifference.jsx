import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Briefcase, Building2, Globe, Rocket, Play, CheckCircle2 } from 'lucide-react';
import { useAdmissionModal } from '../context/AdmissionModalContext';


const IccvsDifference = () => {
    const { openAdmissionModal } = useAdmissionModal();
    const [isPlaying, setIsPlaying] = useState(false);

    React.useEffect(() => {
        if (isPlaying) {
            const script = document.createElement('script');
            script.src = "https://go.screenpal.com/player/appearance/cOhlXkntYyn";
            script.async = true;
            document.body.appendChild(script);
            return () => {
                if (document.body.contains(script)) {
                    document.body.removeChild(script);
                }
            };
        }
    }, [isPlaying]);

    const tiles = [
        {
            title: "Skill-First Learning",
            desc: "Industry-driven curriculum, not theory-heavy education",
            icon: <Target className="text-primary" />,
            color: "bg-primary/5"
        },
        {
            title: "Job-Oriented Programs",
            desc: "Designed for employability from day one",
            icon: <Briefcase className="text-blue-500" />,
            color: "bg-blue-50"
        },
        {
            title: "Real Industry Exposure",
            desc: "Live projects, studios & internships",
            icon: <Building2 className="text-emerald-500" />,
            color: "bg-emerald-50"
        }
    ];

    return (
        <section className="relative py-24 md:py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Left Side: Scroller Tiles (60%) */}
                    <div className="w-full lg:w-[60%] space-y-12">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3 mb-6"
                            >
                                <div className="w-12 h-px bg-primary"></div>
                                <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">The Excellence Framework</span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-black text-slate-950 leading-[1.1] tracking-tighter mb-6"
                            >
                                See the <span className="text-primary italic">INSD Difference</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-xl md:text-2xl font-bold text-slate-500 tracking-tight"
                            >
                                Because Skills. Careers. Placements Come First.
                            </motion.p>
                        </div>

                        {/* Interactive Scroller Tiles */}
                        <div className="grid grid-cols-1 gap-4">
                            {tiles.map((tile, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group p-8 rounded-4xl border border-slate-100 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-primary/20 relative overflow-hidden h-full"
                                >
                                    <div className="relative z-10">
                                        <div className={`w-12 h-12 ${tile.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                            {tile.icon}
                                        </div>
                                        <h4 className="text-lg font-black text-slate-950 uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">
                                            {tile.title}
                                        </h4>
                                        <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                            {tile.desc}
                                        </p>
                                    </div>
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <CheckCircle2 size={16} className="text-primary" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>

                    {/* Right Side: Video Content (40%) */}
                    <div className="w-full lg:w-[40%] flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative w-full aspect-9/16 max-w-sm rounded-4xl overflow-hidden shadow-3xl group/video cursor-pointer border border-slate-100 bg-slate-900"
                            onClick={() => setIsPlaying(true)}
                        >
                            {!isPlaying ? (
                                <>
                                    {/* Cinematic Video Loop */}
                                    <video
                                        src="https://player.vimeo.com/external/494163967.sd.mp4?s=6a982924151a6907d64380f681bc7e828e8b6b90&profile_id=165"
                                        className="w-full h-full object-cover -20 group-hover/video:-0 transition-all duration-1000 group-hover/video:scale-105"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent" />

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl transform group-hover/video:scale-110 transition-transform duration-500 animate-pulse">
                                            <Play size={40} className="text-white fill-white ml-2" />
                                        </div>
                                    </div>

                                    {/* Floating Stats on Video */}
                                    <div className="absolute bottom-10 left-10 right-10 z-20 space-y-4">
                                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                                            <p className="text-white text-[10px] font-black uppercase tracking-widest opacity-60">Career Success</p>
                                            <h4 className="text-white text-xl font-black">2000+ success stories</h4>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                    <div className="relative w-full h-full overflow-hidden">
                                        <iframe 
                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }} 
                                            scrolling="no" 
                                            src="https://go.screenpal.com/player/cOhlXkntYyn?ff=1&ahc=1&dcc=1&tl=1&bg=transparent&share=1&download=1&embed=1&cl=1" 
                                            allowFullScreen={true}
                                            title="INSD Difference Video"
                                        ></iframe>
                                    </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default IccvsDifference;
