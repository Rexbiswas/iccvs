import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
    {
        year: "2011",
        title: "INSD IS FOUNDED",
        description: "With a simple idea: Make design education practical. Prepare students to be self-focused and placement ready.",
        image: "https://ik.imagekit.io/fmldynl4j4/INSD-Logo_Vertical-removebg-preview.png",
        dotColor: "bg-[#2d4a8a]"
    },
    {
        year: "2013",
        title: "LAUNCH OF CORE PROGRAMS",
        description: "In Fashion, Interior and Graphic Design with studio-based learning at the centre.",
        image: "https://ik.imagekit.io/fmldynl4j4/WhatsApp%20Image%202026-03-23%20at%201.15.04%20PM-2011.jpeg",
        dotColor: "bg-[#b91c1c]"
    },
    {
        year: "2016",
        title: "INSD WINS RECOGNITION",
        description: "As one of India's promising design schools for its hands-on teaching approach.",
        image: "https://ik.imagekit.io/fmldynl4j4/Best%20design%20school%20award%202017%20insd%20(1).jpg_2017.jpeg",
        dotColor: "bg-[#0891b2]"
    },
    {
        year: "2017",
        title: "INTRODUCTION OF SPECIALISED PROGRAMS",
        description: "In Jewellery Design, Textile Design, Photography, Animation & VFX and Beauty & Hair.",
        image: "https://plus.unsplash.com/premium_photo-1681276170281-cf50a487a1b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8amV3ZWxyeXxlbnwwfHwwfHx8MA%3D%3D",
        dotColor: "bg-[#1e40af]"
    },
    {
        year: "2018",
        title: "NETWORK EXPANDS",
        description: "To 50+ centers across 19 states, bringing design careers closer to students from tier-2 and tier-3 cities.",
        image: "https://ik.imagekit.io/fmldynl4j4/9f11619c-4fc4-44cc-be8d-41fa366258f6.jfif",
        dotColor: "bg-[#4c1d95]"
    },
    {
        year: "2019",
        title: "INTERNATIONAL STUDY PROGRAMS",
        description: "Begin taking students to fashion and design hubs like Paris, London etc.",
        image: "https://ik.imagekit.io/fmldynl4j4/WhatsApp%20Image%202025-04-11%20at%2012.03.33%20(1)%20(4)-2019.jpeg",
        dotColor: "bg-[#831843]"
    },
    {
        year: "2023",
        title: "NATIONAL RECOGNITION",
        description: "Shri Yogendra Upadhyay Honourable Education Minister UPI awards INSD as 'The Fastest Growing Design Institute in India in 2023'.",
        image: "https://ik.imagekit.io/fmldynl4j4/INSD%20receives%20National%20award%20(3).jpg.jpeg",
        dotColor: "bg-[#b91c1c]"
    },
    {
        year: "2024",
        title: "CURRICULUM UPGRADED",
        description: "With AI, UX/UI and digital-first modules to keep students future-ready.",
        image: "https://ik.imagekit.io/fmldynl4j4/Gemini_Generated_Image_h6q9gdh6q9gdh6q9%20(1).png",
        dotColor: "bg-[#ea580c]"
    },
    {
        year: "2025",
        title: "AWARDED BY TIMES OF INDIA",
        description: "For 'Excellence in Design Education', having trained more than 30,000 students.",
        image: "https://ik.imagekit.io/fmldynl4j4/WhatsApp%20Image%202025-05-03%20at%205.24.15%20PM%20(1)%20(3).jpeg",
        dotColor: "bg-[#0891b2]"
    },

    {
        year: "2026",
        title: "15 YEARS OF INSD",
        description: "Completes 15 years and reaches 75+ centres in 23 states.",
        image: "https://ik.imagekit.io/fmldynl4j4/WhatsApp%20Image%202026-03-23%20at%201.12.09%20PM%20(2).jpeg",
        dotColor: "bg-[#1e40af]"
    }
];

const LegacyTimeline = () => {
    const containerRef = useRef(null);
    const lineRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(lineRef.current, {
                scaleY: 0,
                transformOrigin: "top",
                scrollTrigger: {
                    trigger: ".timeline-items",
                    start: "top 20%",
                    end: "bottom 80%",
                    scrub: true
                }
            });

            gsap.utils.toArray(".timeline-item").forEach((item) => {
                gsap.from(item, {
                    opacity: 0,
                    x: 30,
                    duration: 1,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

            // Dynamic Counter Animation
            gsap.utils.toArray(".stat-number").forEach((stat) => {
                const targetValue = parseInt(stat.innerText);
                gsap.from(stat, {
                    textContent: 0,
                    duration: 2.5,
                    ease: "expo.out",
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: stat,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen bg-[#f8f5f0] py-24 md:py-32 px-4 md:px-12 overflow-hidden selection:bg-primary selection:text-white">

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/paper.png')]"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">

                    {/* LEFT COLUMN: FIXED CONTENT + GRAPHIC */}
                    <div className="lg:col-span-5 relative">
                        <div className="lg:sticky lg:top-32 mb-16 lg:mb-0">
                            {/* Logo */}
                            <div className="mb-12">
                                <img 
                                    src="https://ik.imagekit.io/fmldynl4j4/INSD-Logo_Vertical-removebg-preview.png" 
                                    alt="INSD Logo" 
                                    className="h-32 w-auto object-contain"
                                />
                            </div>

                            {/* Main Title */}
                            <div className="relative mb-8">
                                <span className="text-[20vw] lg:text-[10rem] font-black leading-none text-slate-200/50 absolute -top-8 -left-4 select-none italic font-serif">15</span>
                                <div className="relative z-10">
                                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-slate-900">
                                        <span className="block text-primary">15</span>
                                        <span className="block italic font-serif text-[0.4em] lg:text-[0.45em] tracking-tight bg-linear-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent mt-2">Years of</span>
                                        <span className="block -mt-2">Legacy</span>
                                    </h1>
                                </div>
                            </div>

                            {/* Slogan */}
                            <div className="max-w-xs border-l-[3px] border-primary/40 pl-6 py-2 mb-12 lg:mb-16">
                                <p className="text-slate-500 text-sm md:text-base font-bold uppercase tracking-widest leading-tight italic">
                                    Nurturing Creative Talent. Shaping Design Futures.
                                </p>
                            </div>

                            {/* Flowing Graphic + Floorplan */}
                            <div className="relative w-full max-w-md lg:ml-0 translate-x-4 lg:translate-x-0 h-[400px] lg:min-h-[1200px] flex items-center">
                                {/* Red Flowing Graphic - Extended Height for Parallel 2026 */}
                                <div className="absolute inset-0 group lg:perspective-3000 w-full h-full overflow-hidden rounded-[2rem] lg:rounded-[3rem]">
                                    <img
                                        src="https://ik.imagekit.io/fmldynl4j4/b5542294-ca42-4241-8288-e2809ec01b6d_1.jfif"
                                        alt="Flowing Design"
                                        className="h-full w-full object-cover shadow-[20px_20px_60px_rgba(0,0,0,0.1)] lg:shadow-[40px_40px_100px_rgba(0,0,0,0.2)] transition-all duration-[1.5s] ease-in-out lg:group-hover:scale-110 lg:group-hover:rotate-y-4"
                                    />
                                    {/* Lustrous overlay */}
                                    <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent mix-blend-overlay"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: THE TIMELINE */}
                    <div className="lg:col-span-1 hidden lg:flex justify-center relative">
                        <div ref={lineRef} className="absolute top-0 w-[2px] h-full bg-slate-200/80"></div>
                    </div>

                    <div className="lg:col-span-6 timeline-items space-y-8 lg:space-y-12">
                        {timelineData.map((item, index) => (
                            <div key={index} className="timeline-item relative group pb-8 lg:pb-12 last:pb-0">
                                {/* Dot - Hidden on Mobile, shown on Large */}
                                <div className={`hidden lg:block absolute left-[-29px] md:left-[-45.5px] lg:left-[-55px] top-1.5 w-4 h-4 rounded-full border-[3px] border-white shadow-lg z-20 ${item.dotColor} group-hover:scale-150 transition-transform duration-300`}></div>

                                <div className="flex flex-col sm:grid sm:grid-cols-12 gap-6 bg-white/40 hover:bg-white/80 p-5 lg:p-6 rounded-2xl lg:rounded-3xl border border-white/50 backdrop-blur-sm transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/5">

                                    <div className="sm:col-span-12 lg:col-span-7 order-2 lg:order-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-xl lg:text-2xl font-black text-slate-800 tracking-tighter">{item.year}</span>
                                            <div className="h-px w-6 bg-slate-200"></div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80">{item.title}</span>
                                        </div>
                                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="sm:col-span-12 lg:col-span-5 order-1 lg:order-2">
                                        <div className="relative overflow-hidden rounded-xl lg:rounded-2xl aspect-video sm:aspect-[21/9] lg:aspect-video shadow-lg">
                                            <img
                                                src={item.image}
                                                className="w-full h-full object-cover transform group-hover:scale-[1.15] transition-transform duration-1000 ease-out"
                                                alt={item.title}
                                            />
                                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* BOTTOM SECTION: STATS & LOGO */}
                <div className="stats-section mt-16 md:mt-32 relative">
                    {/* Decorative Background for Stats */}
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent -z-10 rounded-full blur-[120px] opacity-30"></div>

                    <div className="text-center mb-12 md:mb-20">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-slate-200 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 shadow-sm">Metrics of Excellence</span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                            Our Legacy <span className="text-primary italic font-serif lowercase tracking-normal">in Numbers</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 pb-12 lg:pb-20">

                        {/* Years of Excellence Card */}
                        <div className="group relative">
                            <div className="h-full bg-white/50 backdrop-blur-md border border-white p-8 lg:p-12 rounded-[2rem] lg:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(var(--primary-rgb),0.1)] transition-all duration-700 hover:-translate-y-4 overflow-hidden">
                                {/* Abstract Shape in background */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                                <div className="relative z-10">
                                    <div className="mb-8 w-16 h-16 bg-white shadow-lg rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-12">
                                        <GraduationCap className="w-8 h-8" />
                                    </div>
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="stat-number text-6xl md:text-7xl font-black text-slate-900 leading-none tracking-tighter">15</span>
                                        <span className="text-primary text-4xl font-black leading-none">+</span>
                                    </div>
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-600 transition-colors">Years of<br />Legacy</p>
                                </div>
                            </div>
                        </div>

                        {/* Students Trained Card */}
                        <div className="group relative">
                            <div className="h-full bg-linear-to-br from-primary via-primary/95 to-primary/90 p-8 md:p-12 rounded-[2.5rem] shadow-[0_30px_60px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_50px_90px_rgba(var(--primary-rgb),0.5)] transition-all duration-700 hover:-translate-y-6 overflow-hidden">
                                {/* Flowing Glow */}
                                <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

                                <div className="relative z-10">
                                    <div className="mb-8 w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shadow-xl">
                                        <Users className="w-8 h-8" />
                                    </div>
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="stat-number text-6xl md:text-7xl font-black text-white leading-none tracking-tighter">30000</span>
                                        <span className="text-white/60 text-4xl font-black leading-none ml-1">+</span>
                                    </div>
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">Creative Students<br />Trained & Placed</p>
                                </div>
                            </div>
                        </div>

                        {/* Centres Card */}
                        <div className="group relative">
                            <div className="h-full bg-white/50 backdrop-blur-md border border-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(var(--primary-rgb),0.1)] transition-all duration-700 hover:-translate-y-4 overflow-hidden">
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                                <div className="relative z-10">
                                    <div className="mb-8 w-16 h-16 bg-white shadow-lg rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:-rotate-12">
                                        <MapPin className="w-8 h-8" />
                                    </div>
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="stat-number text-6xl md:text-7xl font-black text-slate-900 leading-none tracking-tighter">75</span>
                                        <span className="text-primary text-4xl font-black leading-none">+</span>
                                    </div>
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-600 transition-colors">Centres ACROSS<br />THE GLOBAL NETWORK</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Aesthetic Blurs */}
            <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[-5%] w-96 h-96 bg-secondary/5 blur-[100px] rounded-full pointer-events-none"></div>

        </section>
    );
};

export default LegacyTimeline;
