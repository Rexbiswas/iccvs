import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Instagram, Facebook, Youtube, X } from 'lucide-react';

const FloatingSocialCTA = () => {
    const [isOpen, setIsOpen] = useState(false);

    const socialLinks = [
        { icon: Instagram, color: '#E4405F', label: 'Instagram', href: 'https://www.instagram.com/insd_official/' },
        { icon: Facebook, color: '#1877F2', label: 'Facebook', href: 'https://www.facebook.com/insdofficial/' },
        { icon: Youtube, color: '#FF0000', label: 'YouTube', href: 'https://www.youtube.com/@insdindia' }
    ];

    return (
        <div className="relative flex items-center">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-3 mr-4"
                    >
                        {socialLinks.map((social, idx) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0, x: 50 }}
                                animate={{ 
                                    opacity: 1, 
                                    scale: 1, 
                                    x: 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        delay: idx * 0.1
                                    }
                                }}
                                exit={{ opacity: 0, scale: 0, x: 20 }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-xl border border-slate-100 flex items-center justify-center text-slate-600 hover:text-white transition-all group overflow-hidden relative"
                            >
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ backgroundColor: social.color }}
                                />
                                <social.icon size={20} className="relative z-10 md:w-6 md:h-6" />
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center z-20 transition-all duration-500 border ${
                    isOpen 
                    ? 'bg-slate-900 text-white border-slate-800 rotate-90' 
                    : 'bg-white text-primary border-slate-100 hover:border-primary/20'
                }`}
            >
                {isOpen ? <X size={20} className="md:w-6 md:h-6" /> : <Share2 size={20} className="md:w-6 md:h-6" />}
            </motion.button>
        </div>
    );
};

export default FloatingSocialCTA;
