import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, GraduationCap, Lightbulb, BookOpen, Handshake, Trophy, Play, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAdmissionModal } from '../context/AdmissionModalContext';
import { Link } from 'react-router-dom';

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
            title: "Expert Mentors",
            short: "Learn directly from experienced industry professionals.",
            detailed: "Our mentors provide personalized guidance, practical insights, and continuous support throughout your learning journey.",
            tagline: "Learn from experts. Grow with confidence.",
            icon: <GraduationCap className="text-[#A62B2B]" />,
            color: "bg-[#A62B2B]/5"
        },
        {
            title: "Passion to Profession",
            short: "Turn your creativity into a rewarding career.",
            detailed: "ICCVS helps you develop industry-ready skills that transform your passion into a successful and fulfilling career.",
            tagline: "Dream it. Learn it. Live it.",
            icon: <Lightbulb className="text-[#00D893]" />,
            color: "bg-[#00D893]/5"
        },
        {
            title: "Practical Training",
            short: "Gain hands-on experience through live projects.",
            detailed: "Work on live projects, real-world assignments, workshops, and portfolio development that prepare you for professional challenges.",
            icon: <Target className="text-blue-500" />,
            color: "bg-blue-50"
        },
        {
            title: "Industry Curriculum",
            short: "Stay ahead with modern, job-oriented courses.",
            detailed: "Our courses are designed according to the latest industry standards, ensuring you gain practical knowledge and job-ready skills.",
            icon: <BookOpen className="text-amber-500" />,
            color: "bg-amber-50"
        },
        {
            title: "Placement Support",
            short: "Career guidance and interview preparation included.",
            detailed: "From resume building and interview preparation to career guidance and placement support, we help you launch successful careers.",
            icon: <Handshake className="text-indigo-500" />,
            color: "bg-indigo-50"
        },
        {
            title: "Trusted Since 2002",
            short: "Over two decades of excellence in education.",
            detailed: "ICCVS has empowered thousands of students with quality education, professional skills, and career opportunities.",
            icon: <Trophy className="text-orange-500" />,
            color: "bg-orange-50"
        }
    ];

    return (
        <section className="relative py-20 md:py-28 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                
                {/* Upper Section: Split 60/40 */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
                    
                    {/* Left Column: Heading and Grid */}
                    <div className="w-full lg:w-[63%] space-y-10">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3 mb-4"
                            >
                                <div className="w-12 h-px bg-[#A62B2B]"></div>
                                <span className="text-[#A62B2B] font-black uppercase tracking-[0.4em] text-xs">Why Choose ICCVS?</span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-5xl font-black text-slate-950 leading-tight tracking-tighter mb-4 uppercase"
                            >
                                Transform Your Passion <br />
                                <span className="text-[#A62B2B] italic">Into a Successful Career</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-slate-500 text-sm md:text-base leading-relaxed font-medium"
                            >
                                At ICCVS, we don't just teach skills—we nurture creativity, build confidence, and prepare students for real-world success. With industry-focused training, experienced mentors, and practical learning, we help you turn your dreams into a rewarding profession.
                            </motion.p>
                        </div>

                        {/* Interactive Scroller Tiles */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            {tiles.map((tile, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group p-6 bg-slate-50/50 hover:bg-white rounded-3xl border border-slate-100 hover:border-[#A62B2B]/20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[160px]"
                                >
                                    <div className="relative z-10">
                                        <div className={`w-10 h-10 ${tile.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                                            {tile.icon}
                                        </div>
                                        <h4 className="text-sm md:text-base font-black text-slate-900 uppercase tracking-tight mb-1 group-hover:text-[#A62B2B] transition-colors">
                                            {tile.title}
                                        </h4>
                                        <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                            {tile.short}
                                        </p>
                                        
                                        {/* Smooth Expansion on Hover */}
                                        <div className="max-h-0 opacity-0 group-hover:max-h-[140px] group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                                            <p className="text-slate-400 text-[11px] leading-relaxed mt-2 pt-2 border-t border-slate-100 font-medium">
                                                {tile.detailed}
                                            </p>
                                            {tile.tagline && (
                                                <p className="text-[#A62B2B] text-[9px] font-black uppercase tracking-wider mt-2.5 italic">
                                                    {tile.tagline}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <CheckCircle2 size={14} className="text-[#A62B2B]" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Video Content (Sticky) */}
                    <div className="w-full lg:w-[37%] flex justify-center lg:sticky lg:top-28">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative w-full aspect-9/16 max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl group/video cursor-pointer border border-slate-100 bg-slate-900"
                            onClick={() => setIsPlaying(true)}
                        >
                            {!isPlaying ? (
                                <>
                                    {/* Cinematic Video Loop */}
                                    <video
                                        src="https://player.vimeo.com/external/494163967.sd.mp4?s=6a982924151a6907d64380f681bc7e828e8b6b90&profile_id=165"
                                        className="w-full h-full object-cover transition-all duration-1000 group-hover/video:scale-105"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent" />

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-20 h-20 bg-[#A62B2B] rounded-full flex items-center justify-center shadow-2xl transform group-hover/video:scale-110 transition-transform duration-500 animate-pulse">
                                            <Play size={32} className="text-white fill-white ml-1.5" />
                                        </div>
                                    </div>

                                    {/* Floating Stats on Video */}
                                    <div className="absolute bottom-8 left-8 right-8 z-20">
                                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                                            <p className="text-white text-[9px] font-black uppercase tracking-widest opacity-60">Career Success</p>
                                            <h4 className="text-white text-base font-black">2000+ success stories</h4>
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
                                        title="ICCVS Difference Video"
                                    ></iframe>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Section: Premium CTA Banner */}
                <div className="mt-20 md:mt-28 max-w-5xl mx-auto bg-gradient-to-br from-[#A62B2B] to-[#00D893] p-8 md:p-14 rounded-[2.5rem] text-center text-white relative overflow-hidden shadow-2xl">
                    {/* Background decorative elements */}
                    <div className="absolute top-[-20%] left-[-20%] w-[350px] h-[350px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-[-20%] right-[-20%] w-[350px] h-[350px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 space-y-6">
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] bg-white/15 px-5 py-2 rounded-full border border-white/10 inline-block">
                            Ready to Shape Your Future?
                        </span>
                        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                            Join ICCVS Today
                        </h3>
                        <p className="text-white/90 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-medium">
                            Join ICCVS today and take the first step toward a creative, successful, and future-ready career.
                        </p>
                        <div className="pt-4 flex flex-wrap justify-center gap-4">
                            <Link
                                to="/courses"
                                className="h-12 px-8 bg-white text-slate-900 hover:bg-slate-100 rounded-full font-black uppercase tracking-wider text-xs flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg"
                            >
                                Explore Courses
                            </Link>
                            <button
                                onClick={() => openAdmissionModal({
                                    title: 'ENQUIRY NOW',
                                    subtitle: 'Get professional guidance for your career.',
                                    ctaText: 'SUBMIT ENQUIRY'
                                })}
                                className="h-12 px-8 bg-slate-950 hover:bg-slate-900 text-white rounded-full font-black uppercase tracking-wider text-xs flex items-center justify-center transition-all duration-300 hover:scale-105 border border-white/10"
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default IccvsDifference;
