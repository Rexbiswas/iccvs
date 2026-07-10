import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SocialIcons from './SocialIcons';
import ICCVSTagline from './ICCVSTagline';

gsap.registerPlugin(ScrollTrigger);

const Footer = ({ showTagline = false }) => {
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
        <>
            {showTagline && (
                <div className="bg-slate-950 w-full overflow-hidden">
                    <ICCVSTagline />
                </div>
            )}
            <footer id="footer" ref={footerRef} className="relative bg-linear-to-r from-primary to-secondary text-white pt-32 pb-12 overflow-hidden">

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
                                    src="https://ik.imagekit.io/fmldynl4j4/ICCVS%20COMPUTER%20EDUCATION%20%2020260704_094136.jpg"
                                    alt="ICCVS Logo"
                                    className="h-[56px] w-[56px] rounded-full object-cover border border-white/10"
                                />
                            </div>
                            <p className="text-lg text-white/60 leading-relaxed font-light">
                                ICCVS Computer Education is a leading IT training institute. We don't just teach coding; we build innovators. Our curriculum is an ever-evolving protocol for the future.
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
                                    { name: "Basic Computer Course", path: "/courses/basic-computer-course" },
                                    { name: "DTP", path: "/courses/dtp" },
                                    { name: "Diploma", path: "/courses/diploma" },
                                    { name: "Tally Prime / ERP 9", path: "/courses/tally" },
                                    { name: "DFA", path: "/courses/dfa" },
                                    { name: "ADFA", path: "/courses/adfa" },
                                    { name: "PDFA", path: "/courses/pdfa" },
                                    { name: "Taxation Course", path: "/courses/taxation" },
                                    { name: "ADCA", path: "/courses/adca" },
                                    { name: "NIIT Authorized Courses", path: "/courses/niit" },
                                    { name: "DIT", path: "/courses/dit" },
                                    { name: "ADIT / A Level", path: "/courses/adit" },
                                    { name: "Data Analyst", path: "/courses/data-analyst" },
                                    { name: "Advance Excel", path: "/courses/advance-excel" },
                                    { name: "Advance Excel (MIS)", path: "/courses/advance-excel-mis" },
                                    { name: "Advance Excel (Macro)", path: "/courses/advance-excel-macro" },
                                    { name: "Advance Excel (Dash Board)", path: "/courses/advance-excel-dashboard" }
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
                                    { name: "Mentors", path: "/mentors" },
                                    { name: "Scholarship", path: "/scholarship" },
                                    { name: "Enquiry", path: "/contact-us" }
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
                                    { name: "Blogs", path: "/iccvs-360/blog" }
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
                                    <a href="tel:+919868444888" className="text-sm font-bold border-b border-white/5 group-hover:border-primary transition-all pb-1">+91 98684 44888</a>
                                </motion.div>
                                <motion.div whileHover={{ x: 5 }} className="group cursor-pointer">
                                    <span className="block text-[10px] uppercase tracking-widest text-secondary mb-1">Email</span>
                                    <a href="mailto:iccvsinstitute@gmail.com" className="text-sm font-bold border-b border-white/5 group-hover:border-secondary transition-all pb-1">iccvsinstitute@gmail.com</a>
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
                        ICCVS
                    </h1>

                    {/* Layer 2: The "Spotlight" Reveal */}
                    <h1
                        className="giant-footer-text text-[25vw] lg:text-[35vw] font-black text-white/15 select-none whitespace-nowrap leading-none tracking-[-0.05em] uppercase pointer-events-none transition-all duration-300"
                        style={{
                            maskImage: 'radial-gradient(circle 300px at var(--x) var(--y), black 20%, transparent 100%)',
                            WebkitMaskImage: 'radial-gradient(circle 300px at var(--x) var(--y), black 20%, transparent 100%)',
                        }}
                    >
                        ICCVS
                    </h1>

                    {/* Ambient Luxury Detail */}
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </div>

                {/* Bottom Signature */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
                    <div className="flex items-center gap-4">
                        <Globe className="w-3 h-3 text-primary animate-spin-slow" />
                        Est. 2026 ICCVS Consortium
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
        </>
    );
};

export default Footer;
