import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import ParisFormModal from '../components/ParisFormModal';
import VuittonSlider from '../components/VuittonSlider';
import IndiaToParisSlider from '../components/IndiaToParisSlider';

gsap.registerPlugin(ScrollTrigger);

const ParisProject = () => {
    const [isParisModalOpen, setIsParisModalOpen] = useState(false);
    const containerRef = useRef(null);
    const horizontalRef = useRef(null);
    const galleryContainerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: galleryContainerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
    const y2 = useTransform(scrollYProgress, [0, 1], ["-40%", "0%"]);
    const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Horizontal Scroll Section
            const pinWrap = horizontalRef.current;
            if (pinWrap) {
                let pinWrapWidth = pinWrap.scrollWidth;
                let horizontalScrollLength = pinWrapWidth - window.innerWidth;

                gsap.to(pinWrap, {
                    scrollTrigger: {
                        scrub: 1,
                        trigger: "#paris-journey",
                        pin: true,
                        start: "center center",
                        end: () => "+=" + horizontalScrollLength,
                        invalidateOnRefresh: true
                    },
                    x: () => -horizontalScrollLength,
                    ease: "none"
                });
            }

            // Reveal Text
            gsap.utils.toArray('.reveal-up').forEach((elem) => {
                gsap.fromTo(elem,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        scrollTrigger: {
                            trigger: elem,
                            start: "top 80%",
                        }
                    }
                );
            });
        }, containerRef); // Scope to containerRef

        return () => ctx.revert(); // Clean up on unmount
    }, []);

    return (
        <div ref={containerRef} className="bg-[#f3f3f3] min-h-screen text-slate-900 overflow-hidden font-sans">
            <SEO
                title="The Paris Project - Global Exposure Program | INSD"
                description="Join INSD's exclusive global exposure program in Paris. A 14-day intensive design journey in the fashion capital of the world, collaborating with luxury houses."
                keywords="Paris design program, global exposure design, study in Paris, fashion design Paris, INSD global programs"
            />



            {/* Hero Section */}
            <section className="relative h-screen w-full flex items-center justify-center pt-20 px-6 z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] md:w-[80vh] md:h-[80vh] bg-slate-200 rounded-full blur-3xl opacity-50 z-0 mix-blend-multiply"></div>

                <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 bg-white/50 backdrop-blur-md mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Global Exposure Program</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                        className="text-5xl md:text-8xl lg:text-[10rem] font-serif leading-[0.95] md:leading-[0.85] tracking-tighter text-slate-900"
                    >
                        The Paris<br />
                        <span className="text-slate-400 italic font-light">Project.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="mt-8 md:mt-12 text-slate-500 max-w-2xl text-lg md:text-xl font-light leading-relaxed tracking-wide"
                    >
                        Immerse yourself in the fashion capital of the world. A curated, 14-day intensive where INSD designers collaborate with European luxury houses.
                    </motion.p>
                </div>

                {/* Floating Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: -2 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    className="absolute bottom-10 right-10 w-64 md:w-96 aspect-3/4 p-2 bg-white shadow-2xl z-20 hidden lg:block"
                >
                    <div className="w-full h-full relative group overflow-hidden">
                        <iframe 
                            src="https://go.screenpal.com/player/cOe0D9nT6Dx?ff=1&ahc=1&dcc=1&tl=1&bg=transparent&share=1&download=1&embed=1&cl=1"
                            className="absolute inset-0 w-full h-full border-0 transition-all duration-1000"
                            allowFullScreen
                        />
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-slate-900 text-white px-4 py-2 text-xs font-mono uppercase tracking-widest">
                        Paris, France
                    </div>
                </motion.div>
            </section>

            {/* Intro Stats */}
            <section className="py-20 border-y border-slate-300 relative z-10 bg-[#f3f3f3]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0">
                        {[
                            { label: "Duration", value: "14 Days" },
                            { label: "Industry Visits", value: "10+" },
                            { label: "Masterclasses", value: "08" },
                            { label: "Cohort Size", value: "Min. 25" }
                        ].map((stat, i) => (
                            <div key={i} className={`reveal-up text-center px-4 ${i !== 0 ? 'md:border-l border-slate-300' : ''} ${i % 2 !== 0 ? 'border-l border-slate-300 md:border-l-0' : ''}`}>
                                <h3 className="text-4xl md:text-5xl font-serif text-slate-900 mb-2">{stat.value}</h3>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* India to Paris Journey Slider */}
            <IndiaToParisSlider />

            {/* Fondation Louis Vuitton Itinerary Slider */}
            <section id="paris-journey" className="relative z-10 bg-[#f3f3f3]">
                <VuittonSlider />
            </section>

            {/* Immersive Versailles Parallax Gallery */}
            <section ref={galleryContainerRef} className="relative h-[150vh] bg-[#f3f3f3] overflow-hidden z-10 w-full flex items-center justify-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center pointer-events-none mix-blend-difference w-full">
                    <h2 className="text-7xl md:text-[12rem] font-serif text-white uppercase tracking-tighter leading-none">Le Palais</h2>
                    <p className="text-white text-lg md:text-2xl uppercase tracking-[0.5em] mt-4 font-bold stroke-text-white/50">Versailles</p>
                </div>

                <div className="flex justify-center gap-4 md:gap-8 h-[200vh] w-full px-4 md:px-12 -rotate-6 scale-110 opacity-80 hover:opacity-100 transition-opacity duration-700">

                    {/* Column 1 - Travels Up */}
                    <motion.div style={{ y: y1 }} className="flex flex-col gap-4 md:gap-8 w-1/3 pt-[20vh]">
                        <img src="https://ik.imagekit.io/fmldynl4j4/Palace%20of%20Versailles/WhatsApp%20Image%202025-04-11%20at%2012.03.18%20(3).jpeg" alt="Versailles 1" className="w-full object-cover hover:z-20 transform hover:scale-105 transition-all duration-700 shadow-2xl" />
                        <img src="https://ik.imagekit.io/fmldynl4j4/Palace%20of%20Versailles/WhatsApp%20Image%202025-04-11%20at%2012.03.19%20(1).jpeg" alt="Versailles 2" className="w-full object-cover hover:z-20 transform hover:scale-105 transition-all duration-700 shadow-2xl" />
                        <img src="https://ik.imagekit.io/fmldynl4j4/Palace%20of%20Versailles/WhatsApp%20Image%202025-04-11%20at%2012.03.19.jpeg" alt="Versailles 3" className="w-full object-cover hover:z-20 transform hover:scale-105 transition-all duration-700 shadow-2xl" />
                    </motion.div>

                    {/* Column 2 - Travels Down */}
                    <motion.div style={{ y: y2 }} className="flex flex-col gap-4 md:gap-8 w-1/3">
                        <img src="https://ik.imagekit.io/fmldynl4j4/Palace%20of%20Versailles/WhatsApp%20Image%202025-04-11%20at%2012.03.21%20(2).jpeg" alt="Versailles 4" className="w-full object-cover hover:z-20 transform hover:scale-105 transition-all duration-700 shadow-2xl" />
                        <img src="https://ik.imagekit.io/fmldynl4j4/Palace%20of%20Versailles/WhatsApp%20Image%202025-04-11%20at%2012.03.21.jpeg" alt="Versailles 5" className="w-full object-cover hover:z-20 transform hover:scale-105 transition-all duration-700 shadow-2xl" />
                        <img src="https://ik.imagekit.io/fmldynl4j4/Palace%20of%20Versailles/WhatsApp%20Image%202025-04-11%20at%2012.03.18%20(3).jpeg" alt="Versailles 6" className="w-full object-cover hover:z-20 transform hover:scale-105 transition-all duration-700 shadow-2xl" />
                    </motion.div>

                    {/* Column 3 - Travels Up Fast */}
                    <motion.div style={{ y: y3 }} className="flex flex-col gap-4 md:gap-8 w-1/3 pt-[10vh]">
                        <img src="https://ik.imagekit.io/fmldynl4j4/Palace%20of%20Versailles/WhatsApp%20Image%202025-04-11%20at%2012.03.19%20(1).jpeg" alt="Versailles 7" className="w-full object-cover hover:z-20 transform hover:scale-105 transition-all duration-700 shadow-2xl" />
                        <img src="https://ik.imagekit.io/fmldynl4j4/Palace%20of%20Versailles/WhatsApp%20Image%202025-04-11%20at%2012.03.19.jpeg" alt="Versailles 8" className="w-full object-cover hover:z-20 transform hover:scale-105 transition-all duration-700 shadow-2xl" />
                        <img src="https://ik.imagekit.io/fmldynl4j4/Palace%20of%20Versailles/WhatsApp%20Image%202025-04-11%20at%2012.03.21%20(2).jpeg" alt="Versailles 9" className="w-full object-cover hover:z-20 transform hover:scale-105 transition-all duration-700 shadow-2xl" />
                    </motion.div>

                </div>
            </section>

            {/* Immersive Fashion Show Showcase */}
            <section className="relative w-full min-h-[120vh] bg-white overflow-hidden flex items-center justify-center py-32 z-10 border-y border-slate-300">
                <div className="absolute inset-0 w-full h-full object-cover">
                    <motion.img
                        initial={{ scale: 1.1 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        viewport={{ once: true }}
                        src="https://images.unsplash.com/photo-1509631179647-0c114ee3c235?q=80&w=2000&auto=format&fit=crop"
                        alt="Paris Fashion Runway"
                        className="w-full h-full object-cover opacity-20 object-top"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#f3f3f3] via-transparent to-white/80"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 max-w-7xl flex flex-col items-center">
                    <div className="text-center mb-16 reveal-up px-4">
                        <span className="inline-block text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400 mb-6 border border-slate-300 px-4 py-1 rounded-full bg-white/50 backdrop-blur-md">The Pinnacle</span>
                        <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif text-slate-900 leading-[1] md:leading-[0.9] tracking-tighter">
                            Parisian <br /><span className="italic text-slate-400 font-light text-3xl md:text-7xl">Runway.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full mt-8">
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="relative aspect-3/4 w-full max-w-md mx-auto lg:mr-auto overflow-hidden group shadow-2xl bg-slate-100 p-3"
                        >
                            <img src="https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=1000" alt="Couture Detail" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-white/95 backdrop-blur-md p-5 flex justify-between items-end border border-slate-200 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                    <div>
                                        <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1">Look 01</p>
                                        <h4 className="font-serif text-2xl text-slate-900">Avant-Garde</h4>
                                    </div>
                                    <span className="text-slate-900/40 font-serif italic text-lg">Paris</span>
                                </div>
                            </div>
                        </motion.div>

                        <div className="flex flex-col gap-12 lg:pl-10">
                            <motion.div className="reveal-up">
                                <p className="text-3xl lg:text-4xl font-light text-slate-800 leading-snug font-serif italic mb-6">
                                    Experience the raw energy of a live runway show in the heart of Paris.
                                </p>
                                <div className="w-16 h-px mb-6 bg-slate-300"></div>
                                <p className="text-slate-500 font-light leading-relaxed text-lg">
                                    Watch top-tier models showcase collections engineered by INSD visionaries, backed by the dramatic architecture of historic Parisian venues. This isn't just an exhibition; it's a statement of arrival on the global stage. Immerse in the flash bulbs, the elite networking, and the pinnacle of global high-fashion.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ x: 30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="relative aspect-[9/16] w-full max-w-[350px] mx-auto overflow-hidden shadow-2xl group border border-slate-200 bg-black"
                            >
                                <iframe 
                                    src="https://go.screenpal.com/player/cOe0DRnT6Dp?ff=1&ahc=1&dcc=1&tl=1&bg=transparent&share=1&download=1&embed=1&cl=1"
                                    className="absolute inset-0 w-full h-full border-0 transition-all duration-1000"
                                    allowFullScreen
                                />
                                <div className="absolute inset-0 bg-linear-to-tr from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 text-[10px] uppercase font-bold tracking-widest text-slate-900 border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 z-10">
                                    Live Runway Pass
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Editorial Footer CTA */}
            <section className="py-48 md:py-64 flex items-center justify-center text-center px-6 relative z-10 overflow-hidden bg-slate-950">
                {/* Background Image Layer */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=2000" 
                        alt="Paris Eiffel Tower" 
                        className="w-full h-full object-cover opacity-30 scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-slate-950" />
                </div>
                
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-8xl lg:text-9xl font-serif text-white mb-8 leading-[1] md:leading-[0.85] tracking-tighter uppercase">
                            Your Journey to <br />
                            <span className="text-transparent stroke-text-white italic font-serif">The Capital.</span>
                        </h2>
                        <p className="text-slate-400 mb-12 md:mb-16 text-base md:text-2xl font-light max-w-2xl mx-auto leading-relaxed px-4">
                            Applications for The Paris Project are highly competitive. <br className="hidden md:block" /> Secure your interview slot today for the upcoming cohort.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(219,52,54,0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsParisModalOpen(true)}
                            className="bg-primary text-white px-10 md:px-20 py-5 md:py-7 text-[10px] md:text-xs tracking-[0.3em] font-black uppercase transition-all duration-300 shadow-2xl rounded-full"
                        >
                            Apply for Paris
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            <ParisFormModal 
                isOpen={isParisModalOpen} 
                onClose={() => setIsParisModalOpen(false)} 
            />

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default ParisProject;
