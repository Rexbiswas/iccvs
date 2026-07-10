import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DesignLifestyle = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const gridRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Title Animation
            gsap.from(".lifestyle-title span", {
                y: 100,
                opacity: 0,
                stagger: 0.1,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

            // Subtitle Animation
            gsap.from(".lifestyle-subtitle", {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

            // Grid Items Animation
            const items = gsap.utils.toArray(".lifestyle-item");
            items.forEach((item, i) => {
                gsap.from(item, {
                    scale: 0.8,
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    delay: 0.2 * i,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                    }
                });
            });

            // Parallax effect for images
            items.forEach((item) => {
                const img = item.querySelector("img");
                gsap.to(img, {
                    yPercent: 20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });
        }, sectionRef.current);

        return () => ctx.revert();
    }, []);

    const lifestyles = [
        {
            title: "Shows",
            image: "https://ik.imagekit.io/fmldynl4j4/insd-awards/Gemini_Generated_Image_1ms50w1ms50w1ms5.png",
            desc: "Command the runway. Present your vision on the world's most prestigious stages."
        },
        {
            title: "Studios",
            image: "https://ik.imagekit.io/fmldynl4j4/insd-awards/Gemini_Generated_Image_epq9o5epq9o5epq9.png",
            desc: "Innovate in high-tech creative hubs where ideas become reality."
        },
        {
            title: "Freelancing",
            image: "https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            desc: "Work from anywhere. Your talent is your passport to a global lifestyle."
        },
        {
            title: "Entrepreneurship",
            image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            desc: "Build your own brand. Turn your creative spark into a thriving global empire."
        }
    ];

    return (
        <section ref={sectionRef} className="relative py-20 md:py-32 bg-[#f3f3f3] overflow-hidden">
            <div className="container mx-auto px-4 md:px-12">
                <div ref={contentRef} className="max-w-4xl mb-16 md:mb-24">
                    <h1 className="lifestyle-title text-[10vw] md:text-[5vw] font-black uppercase leading-[0.9] tracking-tighter mb-8 flex flex-wrap gap-x-4">
                        {"This Is The Life Design Can Give You".split(" ").map((word, i) => (
                            <span key={i} className="inline-block">{word}</span>
                        ))}
                    </h1>
                    <h2 className="lifestyle-subtitle text-xl md:text-3xl font-medium text-slate-600 leading-relaxed border-l-4 border-primary pl-6">
                        Design today is not just a career. It’s a global lifestyle powered by skills, creativity, and opportunity.
                    </h2>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    {lifestyles.map((item, index) => (
                        <div key={index} className="lifestyle-item group relative h-[500px] md:h-[600px] overflow-hidden rounded-[2.5rem] shadow-xl hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer">
                            {/* Improved Image Layer */}
                            <div className="absolute inset-0 z-0 h-full w-full transition-transform duration-1000 ease-out group-hover:scale-105">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover brightness-[0.6] group-hover:brightness-100 transition-all duration-1000 ease-in-out"
                                />
                                {/* Dynamic Gradient Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700"></div>

                                {/* Inner Border Glow */}
                                <div className="absolute inset-0 border-[1px] border-white/0 group-hover:border-white/20 transition-all duration-700 rounded-[2.5rem] m-4"></div>
                            </div>

                            {/* Content Layer */}
                            <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-12 transition-transform duration-500 ease-out group-hover:-translate-y-2">
                                <div className="mb-1">
                                    <span className="text-white font-black uppercase tracking-tighter text-2xl mb-1 block opacity-100">
                                        {item.title}
                                    </span>
                                    <span className="inline-block text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-1">
                                        Perspective {index + 1}
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter group-hover:text-primary transition-colors duration-500 leading-none">
                                        {item.title}
                                    </h3>
                                </div>

                                <div className="relative">
                                    <p className="text-white/80 text-sm md:text-base font-medium max-w-sm mb-6 opacity-80 group-hover:opacity-100 transition-all duration-700 leading-relaxed translate-y-0">
                                        {item.desc}
                                    </p>

                                    {/* Action Bar */}
                                    <div className="flex items-center gap-4">
                                        <div className="h-[2px] w-12 bg-primary group-hover:w-32 transition-all duration-700 ease-in-out"></div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white opacity-100 transition-opacity duration-500">
                                            Explore
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Stylized Floating Number */}
                            <div className="absolute top-10 right-10 z-20 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12">
                                <span className="text-white/10 text-7xl md:text-9xl font-black italic select-none stroke-text">
                                    0{index + 1}
                                </span>
                            </div>

                            {/* Top Right Corner Accent */}
                            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="w-10 h-10 border-t-2 border-r-2 border-primary"></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 flex justify-center">
                    <div className="text-[12vw] font-black text-slate-200/50 select-none pointer-events-none uppercase tracking-widest italic">
                        ICCVS
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DesignLifestyle;
