import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X } from 'lucide-react';
import FacebookCTA from './FacebookCTA';
import InstagramCTA from './InstagramCTA';
import YoutubeCTA from './YoutubeCTA';

const SocialPanel = ({ isFloatingPanel = false, onToggle, isOpen: externalOpen }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Sync with external state if provided (e.g. from Navbar)
    useEffect(() => {
        if (externalOpen !== undefined && externalOpen !== isOpen) {
            setIsOpen(externalOpen);
        }
    }, [externalOpen]);

    const togglePanel = () => {
        const nextState = !isOpen;
        setIsOpen(nextState);
        if (onToggle) onToggle(nextState);
        
        // Notify others of the state change
        window.dispatchEvent(new CustomEvent('social-panel-state', { 
            detail: { isOpen: nextState } 
        }));
    };

    return (
        <div className="flex flex-col items-end gap-4 relative">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="flex flex-col items-end gap-4"
                    >
                        <YoutubeCTA isFloatingPanel={true} />
                        <InstagramCTA isFloatingPanel={true} />
                        <FacebookCTA isFloatingPanel={true} />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePanel}
                className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/20 overflow-hidden ${
                    isOpen ? 'bg-slate-900 text-white' : 'bg-white/90 backdrop-blur-xl text-slate-800 hover:border-primary/30'
                }`}
            >
                {/* Tooltip (only when closed) */}
                {!isOpen && (
                    <div className="absolute right-full mr-4 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-4 group-hover:translate-x-0 whitespace-nowrap shadow-2xl">
                        Social Channels
                        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="share"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <Share2 size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {/* Pulse for Attention (only when closed) */}
                {!isOpen && (
                    <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping pointer-events-none" />
                )}
            </motion.button>
        </div>
    );
};

export default SocialPanel;
