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
        <footer id="footer" ref={footerRef} className="relative bg-linear-to-br from-[#801e20] to-[#0a2746] text-white pt-32 pb-12 overflow-hidden">

            {/* Atmospheric Orbs */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 blur-[150px] -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 blur-[150px] translate-y-1/2 -translate-x-1/2 rounded-full pointer-events-none" />

            <div className="relative z-10 container mx-auto px-6 lg:px-12">

                {/* Secondary Links & Info */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32 pt-16 border-t border-white/5">

                    {/* Brand Meta */}
                    <div className="lg:col-span-5">
                        <div className="mb-12">
                            <div className="mb-6">
                                <img 
                                    src="https://ik.imagekit.io/fmldynl4j4/INSD-Logo_Horizontal-removebg-preview.png" 
                                    alt="INSD Logo" 
                                    className="h-[84px] w-auto object-contain brightness-0 invert"
                                />
                            </div>
                            <p className="text-lg text-white/60 leading-relaxed font-light">
                                International School of Design is a global design education group. We don't teach design; we build visionaries. Our curriculum is an ever-evolving protocol for the future.
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
                                {[
                                    { name: "Fashion Design", path: "/courses/fashion-designing" },
                                    { name: "Interior Design", path: "/courses/interior-designing" },
                                    { name: "Graphic Design", path: "/courses/graphic-designing" },
                                    { name: "Animation Design", path: "/courses/animation-and-vfx" },
                                    { name: "Jewellery Design", path: "/courses/jewellery-designing" },
                                    { name: "UI/UX Design", path: "/courses/uiux-designing" },
                                    { name: "Beauty & Makeup", path: "/courses/beauty-and-makeup" },
                                    { name: "Photography", path: "/courses/photography" },
                                    { name: "Textile Design", path: "/courses/textile-designing" },
                                    { name: "Short Term Courses", path: "/courses/short-term-courses" },
                                    { name: "INSD Luxe", path: "/courses/msc-luxury-brand-management" }
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Link to={item.path} className="text-[13px] text-white/50 hover:text-primary transition-all duration-300 flex items-center gap-2 group/link whitespace-nowrap">
                                            <span className="w-0 group-hover/link:w-2 h-px bg-primary transition-all duration-300 shrink-0"></span>
                                            {item.name}
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
                                {[

                                    { name: "15 Years Legacy", path: "/15-years-legacy" },
                                    { name: "Mentors", path: "/mentors" },
                                    { name: "Center Across India", path: "/centers-across-india" },
                                    { name: "Paris Project", path: "/insd-360/paris-project" },
                                    { name: "Awards", path: "/awards-recognition" },
                                    { name: "Enquiry", path: "/course-apply-now" },
                                    { name: "Franchise", path: "/franchise" }
                                ].map((item, i) => (
                                    <motion.li key={i} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                                        <Link to={item.path} className="text-[13px] text-white/50 hover:text-white transition-all duration-300 flex items-center gap-2 group/link whitespace-nowrap">
                                            <span className="w-0 group-hover/link:w-2 h-px bg-white transition-all duration-300 shrink-0"></span>
                                            {item.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Experience */}
                        <div className="sitemap-column">
                            <h5 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-8 flex items-center gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                                Experience
                            </h5>
                            <ul className="space-y-4">
                                {[
                                    { name: "Life at INSD", path: "/student" },
                                    { name: "Placements", path: "/placement" },
                                    { name: "Entrepreneurs", path: "/entrepreneur" },
                                    { name: "Industry Visits", path: "/industry-potential" },
                                    { name: "Expert Interactions", path: "/industry-interaction" },
                                    { name: "Training Partners", path: "/placementandtraining" },
                                    { name: "Future of Design", path: "/future-of-design" },
                                    { name: "Events", path: "/events" },
                                    { name: "Blogs", path: "/insd-360/blog" },
                                    { name: "Success Stories", path: "/success-stories" }
                                ].map((item, i) => (
                                    <motion.li key={i} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                                        <Link to={item.path} className="text-[13px] text-white/50 hover:text-primary transition-all duration-300 flex items-center gap-2 group/link whitespace-nowrap">
                                            <span className="w-0 group-hover/link:w-2 h-px bg-primary transition-all duration-300 shrink-0"></span>
                                            {item.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4: Connect */}
                        <div className="sitemap-column">
                            <h5 className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-8">
                                Connect
                            </h5>
                            <div className="space-y-6">
                                <motion.div whileHover={{ x: 5 }} className="group cursor-pointer">
                                    <span className="block text-[10px] uppercase tracking-widest text-primary mb-1">Enquiry</span>
                                    <a href="tel:+919804443300" className="text-sm font-bold border-b border-white/5 group-hover:border-primary transition-all pb-1">+91 98044 43300</a>
                                </motion.div>
                                <motion.div whileHover={{ x: 5 }} className="group cursor-pointer">
                                    <span className="block text-[10px] uppercase tracking-widest text-secondary mb-1">Email</span>
                                    <a href="mailto:info@insd.edu.in" className="text-sm font-bold border-b border-white/5 group-hover:border-secondary transition-all pb-1">info@insd.edu.in</a>
                                </motion.div>
                                <motion.div whileHover={{ x: 5 }} className="group cursor-pointer">
                                    <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">Location</span>
                                    <Link to="/contact-us" className="text-sm font-bold border-b border-white/5 group-hover:border-white transition-all pb-1">Delhi, India</Link>
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
                    <h1 className="giant-footer-text absolute text-[25vw] lg:text-[35vw] font-black text-transparent stroke-text-white/2 select-none whitespace-nowrap leading-none tracking-[-0.05em] uppercase pointer-events-none">
                        INSD
                    </h1>

                    {/* Layer 2: The "Spotlight" Reveal */}
                    <h1
                        className="giant-footer-text text-[25vw] lg:text-[35vw] font-black text-white/15 select-none whitespace-nowrap leading-none tracking-[-0.05em] uppercase pointer-events-none transition-all duration-300"
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
                        <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
                        <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
                        <Link to="/cookie-policy" className="hover:text-primary transition-colors">Cookies</Link>
                        <Link to="/terms-and-conditions" className="hover:text-primary transition-colors">Terms and Condition</Link>
                    </div>

                    <a href="https://www.linkedin.com/in/rishi-biswas-0474a6258/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowUpRight className="w-3 h-3" />
                        Design By Rishi Biswas
                    </a>
                </div>
            </div >
        </footer >
    );
};

export default Footer;
