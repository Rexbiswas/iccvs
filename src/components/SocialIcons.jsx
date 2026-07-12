import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Phone } from 'lucide-react';

const socialLinks = [
    { icon: Instagram, label: "Instagram", color: "#E4405F", link: "https://www.instagram.com/insd_official" },
    { icon: Facebook, label: "Facebook", color: "#1877F2", link: "https://www.facebook.com/share/1CMuRdTV69/" },
    { icon: Phone, label: "Phone", color: "#3b82f6", link: "tel:+919868444888" },
];

const SocialIcons = ({ className = "", dark = false }) => {
    const baseColor = dark ? "rgba(15, 23, 42, 0.4)" : "rgba(255, 255, 255, 0.8)";
    const hoverBg = dark ? "rgba(15, 23, 42, 0.05)" : "rgba(255, 255, 255, 0.05)";

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                    <motion.a
                        key={idx}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        whileHover="hover"
                        initial="initial"
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all duration-500 relative group overflow-visible ${dark ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'} border`}
                    >
                        {/* Glassmorphic Frost Background */}
                        <div className={`absolute inset-0 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-inherit ${dark ? 'bg-slate-900/5' : 'bg-white/5'}`}></div>
                        
                        {/* Brand Color Aura (Glowing behind) */}
                        <motion.div
                            variants={{
                                hover: { opacity: 0.2, scale: 1.5 }
                            }}
                            className="absolute inset-0 blur-2xl pointer-events-none rounded-full"
                            style={{ backgroundColor: social.color, opacity: 0 }}
                        />

                        {/* Minimalist Outline Reveal */}
                        <div className={`absolute inset-0 border rounded-inherit scale-[0.8] opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 ease-out ${dark ? 'border-slate-900/10' : 'border-white/30'}`}></div>

                        {/* The Icon itself */}
                        <motion.div
                            variants={{
                                initial: { color: baseColor },
                                hover: {
                                    scale: 1.15,
                                    y: -3,
                                    rotate: [0, -12, 12, 0],
                                    color: social.color
                                }
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 20,
                                color: { duration: 0.3 }
                            }}
                            className="relative z-10"
                        >
                            <Icon className="w-5 h-5 md:w-6 md:h-6 stroke-[1.8px]" />
                        </motion.div>

                        {/* High-Fidelity Floating Tooltip */}
                        <span className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                            <span className={`relative px-3 py-1.5 ${dark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl whitespace-nowrap`}>
                                {social.label}
                                {/* Arrow Tip */}
                                <span className={`absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 ${dark ? 'bg-slate-900' : 'bg-white'} rotate-45 -translate-y-[4px]`}></span>
                            </span>
                        </span>
                    </motion.a>
                );
            })}
        </div>
    );
};

export default SocialIcons;
