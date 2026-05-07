import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const FloatingSocialBar = () => {
    const socials = [
        { 
            icon: Instagram, 
            color: '#E4405F', 
            link: 'https://www.instagram.com/insd_official',
            label: 'Instagram'
        },
        { 
            icon: Facebook, 
            color: '#1877F2', 
            link: 'https://www.facebook.com/share/1CMuRdTV69/',
            label: 'Facebook'
        },
        { 
            icon: Youtube, 
            color: '#FF0000', 
            link: 'https://youtube.com/@insd-internationalschoolof5139?feature=shared',
            label: 'YouTube'
        }
    ];

    return (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[999] hidden xl:flex flex-col gap-4">
            {socials.map((social, index) => (
                <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 260, damping: 20 }}
                    whileHover={{ scale: 1.1, x: 5 }}
                    className="group relative w-12 h-12 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    {/* Hover Glow */}
                    <div 
                        className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        style={{ backgroundColor: social.color }}
                    />
                    
                    <social.icon 
                        size={20} 
                        className="relative z-10 transition-colors duration-300" 
                        style={{ color: '#0f172a' }} // Default dark slate
                        onMouseEnter={(e) => e.currentTarget.style.color = social.color}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#0f172a'}
                    />

                    {/* Label Tooltip */}
                    <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
                        {social.label}
                        <div className="absolute top-1/2 right-full -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45 translate-x-1" />
                    </div>
                </motion.a>
            ))}
        </div>
    );
};

export default FloatingSocialBar;
