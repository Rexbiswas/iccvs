import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SocialIcons from './SocialIcons';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);
    const gridRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Sitemap Columns Entrance
            gsap.fromTo(".sitemap-column",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 1.2,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: ".sitemap-column",
                        start: "top 95%"
                    }
                }
            );

            // Parallax for the and large text
            gsap.fromTo(".giant-footer-text",
                { xPercent: -5 },
                {
                    xPercent: 5,
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    }
                }
            );

            // Magnetic Grid Animation removed

        }, footerRef);
        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="relative bg-linear-to-br from-[#801e20] to-[#0a2746] text-white pt-32 pb-12 overflow-hidden">

            {/* Atmospheric Orbs */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 blur-[150px] -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 blur-[150px] translate-y-1/2 -translate-x-1/2 rounded-full pointer-events-none" />

            <div className="relative z-10 container mx-auto px-6 lg:px-12">

                {/* Secondary Links & Info */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32 pt-16 border-t border-white/5">

                    {/* Brand Meta */}
                    <div className="lg:col-span-5">
                        <div className="mb-12">
                            <h3 className="text-4xl font-black tracking-tighter mb-6 flex items-center gap-4">
                                <div className="w-2 h-12 bg-primary"></div>
                                INSD.
                            </h3>
                            <p className="text-lg text-white/60 leading-relaxed font-light">
                                International School of Design is a global design conglomerate. We don't teach design; we engineer visionaries. Our curriculum is an ever-evolving protocol for the future.
                            </p>
                        </div>

                        <SocialIcons />
                    </div>

                    {/* --- THE GLOBAL SITEMAP --- */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-12">
                        {/* Column 1: Courses */}
                        <div className="sitemap-column">
                            <h5 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-8 flex items-center gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                                Courses
                            </h5>
                            <ul className="space-y-4">
                                {["Fashion Designing", "Interior Designing", "Graphic Designing", "Animation & VFX"].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Link to={item === "Fashion Designing" ? "/courses/fashion-designing" : item === "Interior Designing" ? "/courses/interior-designing" : item === "Graphic Designing" ? "/courses/graphic-designing" : item === "Animation & VFX" ? "/courses/animation-and-vfx" : "#"} className="text-sm text-white/50 hover:text-primary transition-all duration-300 flex items-center gap-2 group/link whitespace-nowrap">
                                            <span className="w-0 group-hover/link:w-2 h-px bg-primary transition-all duration-300 shrink-0"></span>
                                            {item}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 2: Institute */}
                        <div className="sitemap-column">
                            <h5 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-8 flex items-center gap-2">
                                <div className="w-1 h-1 bg-secondary rounded-full animate-pulse"></div>
                                Institute
                            </h5>
                            <ul className="space-y-4">
                                <li>
                                    <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                                        <Link to="/about-us" className="text-sm text-white/50 hover:text-white transition-all duration-300 flex items-center gap-2 group/link whitespace-nowrap">
                                            <span className="w-0 group-hover/link:w-2 h-px bg-white transition-all duration-300 shrink-0"></span>
                                            About Us
                                        </Link>
                                    </motion.div>
                                </li>
                                <li>
                                    <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                                        <Link to="/campuses" className="text-sm text-white/50 hover:text-white transition-all duration-300 flex items-center gap-2 group/link whitespace-nowrap">
                                            <span className="w-0 group-hover/link:w-2 h-px bg-white transition-all duration-300 shrink-0"></span>
                                            Campuses
                                        </Link>
                                    </motion.div>
                                </li>
                                <li>
                                    <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                                        <Link to="/student-careers" className="text-sm text-white/50 hover:text-white transition-all duration-300 flex items-center gap-2 group/link whitespace-nowrap">
                                            <span className="w-0 group-hover/link:w-2 h-px bg-white transition-all duration-300 shrink-0"></span>
                                            Careers
                                        </Link>
                                    </motion.div>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3: Lifestyle */}
                        <div className="sitemap-column">
                            <h5 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-8 flex items-center gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                                Lifestyle
                            </h5>
                            <ul className="space-y-4">
                                <li>
                                    <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                                        <Link to="/success-stories" className="text-sm text-white/50 hover:text-primary transition-all duration-300 flex items-center gap-2 group/link whitespace-nowrap">
                                            <span className="w-0 group-hover/link:w-2 h-px bg-primary transition-all duration-300 shrink-0"></span>
                                            success stories
                                        </Link>
                                    </motion.div>
                                </li>
                                <li>
                                    <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                                        <Link to="/insd-360/fashion-week" className="text-sm text-white/50 hover:text-primary transition-all duration-300 flex items-center gap-2 group/link whitespace-nowrap">
                                            <span className="w-0 group-hover/link:w-2 h-px bg-primary transition-all duration-300 shrink-0"></span>
                                            Fashion Shows
                                        </Link>
                                    </motion.div>
                                </li>
                                <li>
                                    <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                                        <Link to="/gallery" className="text-sm text-white/50 hover:text-primary transition-all duration-300 flex items-center gap-2 group/link whitespace-nowrap">
                                            <span className="w-0 group-hover/link:w-2 h-px bg-primary transition-all duration-300 shrink-0"></span>
                                            Gallery
                                        </Link>
                                    </motion.div>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4: Base Connect */}
                        <div className="sitemap-column">
                            <h5 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-8">
                                Connect
                            </h5>
                            <div className="space-y-6">
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    className="group cursor-pointer"
                                >
                                    <span className="block text-[10px] uppercase tracking-widest text-primary mb-1">Admissions</span>
                                    <div className="flex flex-col gap-1">
                                        <a href="tel:+919804443300" className="text-sm font-bold border-b border-white/5 group-hover:border-primary transition-all pb-1">+91 98044 43300</a>
                                    </div>
                                </motion.div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Branding Parallax Layer (Ultra-Premium Spotlight Reveal) */}
                <div
                    className="relative h-[25vw] flex items-center justify-center overflow-hidden group/giant cursor-default"
                    onMouseMove={(e) => {
                        const { currentTarget, clientX, clientY } = e;
                        const { left, top, width, height } = currentTarget.getBoundingClientRect();
                        const x = ((clientX - left) / width) * 100;
                        const y = ((clientY - top) / height) * 100;
                        currentTarget.style.setProperty('--x', `${x}%`);
                        currentTarget.style.setProperty('--y', `${y}%`);
                    }}
                    style={{ '--x': '50%', '--y': '50%' }}
                >
                    {/* Layer 1: The "Ghost" Outline */}
                    {/* Layer 1: The "Ghost" Outline */}
                    <h1 className="giant-footer-text absolute text-[35vw] font-black text-transparent stroke-text-white/2 select-none whitespace-nowrap leading-none tracking-[-0.05em] uppercase pointer-events-none">
                        INSD
                    </h1>

                    {/* Layer 2: The "Spotlight" Reveal */}
                    <h1
                        className="giant-footer-text text-[35vw] font-black text-white/15 select-none whitespace-nowrap leading-none tracking-[-0.05em] uppercase pointer-events-none transition-all duration-300"
                        style={{
                            maskImage: 'radial-gradient(circle 300px at var(--x) var(--y), black 20%, transparent 100%)',
                            WebkitMaskImage: 'radial-gradient(circle 300px at var(--x) var(--y), black 20%, transparent 100%)',
                        }}
                    >
                        INSD
                    </h1>

                    {/* Ambient Luxury Detail */}
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </div>

                {/* Bottom Signature */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
                    <div className="flex items-center gap-4">
                        <Globe className="w-3 h-3 text-primary animate-spin-slow" />
                        Est. 2026 INSD Consortium
                    </div>

                    <div className="flex gap-10">
                        <a href="#" className="hover:text-primary transition-colors">Security</a>
                        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a>
                    </div>

                    <a href="https://rishibiswas.dev" className="flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowUpRight className="w-3 h-3" />
                        Design By Rishi Biswas
                    </a>
                </div>
            </div >
        </footer >
    );
};

export default Footer;
