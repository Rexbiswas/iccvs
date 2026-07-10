import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StepVisual = () => {
    const containerRef = useRef(null);
    const stepsRef = useRef(null);

    const steps = [
        {
            id: "01",
            title: "Fast paced learning",
            description: "Industry-aligned curriculum designed for maximum impact in minimum time. We don't wait for the future; we build it daily.",
            color: "from-primary to-rose-500",
            img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
        },
        {
            id: "02",
            title: "Skill based education",
            description: "Beyond theory. Hands-on mastery of tools, techniques, and trends that define the global design landscape.",
            color: "from-secondary to-indigo-500",
            img: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
        },
        {
            id: "03",
            title: "Getting you placed",
            description: "Our dedicated career cell connects you with global giants. Transform your education into a high-octane career.",
            color: "from-emerald-500 to-teal-500",
            img: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg"
        }
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Section Title Animation
            gsap.from(".step-title-part", {
                y: 100,
                opacity: 0,
                stagger: 0.1,
                ease: "power4.out",
                duration: 1.5,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });

            // Steps Animation
            const steps_elements = gsap.utils.toArray(".step-card");
            steps_elements.forEach((step, i) => {
                gsap.from(step, {
                    x: i % 2 === 0 ? -100 : 100,
                    opacity: 0,
                    duration: 1.2,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: step,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // Progress Line Animation
            gsap.from(".step-progress-line", {
                scaleY: 0,
                transformOrigin: "top center",
                ease: "none",
                scrollTrigger: {
                    trigger: stepsRef.current,
                    start: "top 60%",
                    end: "bottom 80%",
                    scrub: true
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative bg-white text-black py-24 md:py-40 px-6 md:px-12 overflow-hidden">
            {/* Background Aesthetic */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-slate-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-slate-50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-50 pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-24 md:mb-40 gap-8">
                    <div className="max-w-4xl">
                        <span className="block text-xs font-mono tracking-[0.5em] uppercase text-slate-400 mb-6 font-bold">The ICCVS Protocol</span>
                        <h2 className="text-[10vw] md:text-[7vw] leading-[0.8] font-black uppercase tracking-tighter mb-8">
                            <span className="step-title-part block opacity-40">Not Just</span>
                            <span className="step-title-part block text-transparent bg-clip-text bg-linear-to-r from-secondary to-primary">Education.</span>
                            <span className="step-title-part block mt-2">Industry</span>
                            <span className="step-title-part block text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Preparation.</span>
                        </h2>
                    </div>
                    <div className="md:w-1/3 pb-4">
                        <h2 className="text-xl md:text-4xl font-black leading-tight text-slate-500 border-l-2 border-primary pl-6 hover:border-secondary transition-colors duration-500">
                            We don't just teach design. We culture creative rebels who redefine the status quo.
                        </h2>
                    </div>
                </div>

                {/* Steps Container */}
                <div ref={stepsRef} className="relative">
                    {/* Central Progress Line (Desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 -translate-x-1/2">
                        <div className="step-progress-line absolute top-0 left-0 w-full h-full bg-linear-to-b from-primary via-secondary to-emerald-500 scale-y-0 origin-top" />
                    </div>

                    <div className="space-y-32 md:space-y-24 relative z-10">
                        {steps.map((step, index) => (
                            <div key={step.id} className={`step-card flex flex-col md:flex-row items-center gap-12 md:gap-24 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Image Visual */}
                                <div className="w-full md:w-1/2 group relative">
                                    <div className="aspect-video overflow-hidden rounded-2xl shadow-2xl relative">
                                        <img
                                            src={step.img}
                                            alt={step.title}
                                            className="w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-100"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                    </div>
                                    {/* Large Floating ID */}
                                    <span className={`absolute -top-12 ${index % 2 === 0 ? '-right-8' : '-left-8'} text-[12rem] font-black text-slate-100 opacity-50 select-none pointer-events-none -z-10 group-hover:text-slate-200 transition-colors duration-500`}>
                                        {step.id}
                                    </span>
                                </div>

                                {/* Content Section */}
                                <div className="w-full md:w-1/2 space-y-6">
                                    <div className={`w-12 h-1.5 bg-linear-to-r ${step.color} rounded-full mb-8`} />
                                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                                        {step.title}
                                    </h3>
                                    <h2 className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-md">
                                        {step.description}
                                    </h2>
                                    <motion.button
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-4 text-sm font-mono font-bold tracking-widest uppercase text-slate-400 hover:text-primary transition-colors cursor-pointer group/btn"
                                    >
                                        Discovery Protocol
                                        <div className="w-8 h-px bg-slate-200 group-hover/btn:w-12 group-hover/btn:bg-primary transition-all underline underline-offset-8" />
                                    </motion.button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Stats/CTA */}
                <div className="mt-40 pt-20 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex gap-12">
                        <div>
                            <span className="block text-4xl font-black tracking-tighter">98%</span>
                            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">Placement Rate</span>
                        </div>
                        <div className="border-l border-slate-200 pl-12">
                            <span className="block text-4xl font-black tracking-tighter">50+</span>
                            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">Global Partners</span>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:shadow-2xl transition-all"
                    >
                        Join The Movement
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default StepVisual;
