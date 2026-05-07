import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';

const socialLinks = [
    { icon: Instagram, label: "Instagram", color: "#E4405F", link: "https://www.instagram.com/insd_official" },
    { icon: Linkedin, label: "LinkedIn", color: "#0A66C2", link: "https://www.linkedin.com/school/international-school-of-design/" },
    { icon: Facebook, label: "Facebook", color: "#1877F2", link: "https://www.facebook.com/share/1CMuRdTV69/" },
    { icon: Youtube, label: "YouTube", color: "#FF0000", link: "https://youtube.com/@insd-internationalschoolof5139?feature=shared" },
    { 
        icon: (props) => (
            <svg {...props} viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ), 
        label: "WhatsApp", 
        color: "#25D366", 
        link: "https://wa.me/919804443300?text=Hi%20INSD%2C%20I%20would%20like%20to%20know%20more%20about%20your%20courses." 
    }
];

const SocialIcons = ({ className = "", dark = false }) => {
    const baseColor = dark ? "rgba(15, 23, 42, 0.4)" : "rgba(255, 255, 255, 0.8)";
    const hoverBg = dark ? "rgba(15, 23, 42, 0.05)" : "rgba(255, 255, 255, 0.05)";

    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {socialLinks.map((social, idx) => (
                <motion.a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
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
                        <social.icon className="w-5 h-5 md:w-6 md:h-6 stroke-[1.8px]" />
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
            ))}
        </div>
    );
};

export default SocialIcons;
