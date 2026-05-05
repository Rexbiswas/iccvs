import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, SendHorizonal } from 'lucide-react';

const StepLeadCTA = ({ isFloatingPanel = false }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isFloatingPanel) return;
        const checkScroll = () => {
            const show = window.scrollY > 300;
            setIsVisible(show);
        };
        checkScroll();
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, [isFloatingPanel]);

    const handleNavigate = (e) => {
        e.preventDefault();
        const formElement = document.getElementById('step-lead-form');
        if (formElement) {
            const navHeight = 100; // Account for fixed navbar
            const y = formElement.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const content = (
        <motion.button
            onClick={handleNavigate}
            initial={isFloatingPanel ? {} : { opacity: 0, scale: 0.5, y: 50 }}
            animate={isFloatingPanel ? {} : { opacity: 1, scale: 1, y: 0 }}
            exit={isFloatingPanel ? {} : { opacity: 0, scale: 0.5, y: 50 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className={`${isFloatingPanel ? 'relative' : 'fixed bottom-[352px] md:bottom-[280px] right-6 md:right-10'} z-1000 group flex items-center justify-center`}
        >
            {/* Tooltip */}
            <div className="absolute right-full mr-4 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-4 group-hover:translate-x-0 whitespace-nowrap shadow-2xl">
                Quick Inquiry
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45" />
            </div>

            {/* Glowing Ring */}
            <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-20 group-hover:opacity-40 animate-pulse transition-opacity duration-500" />

            {/* Main Button */}
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-900 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden border border-white/20">
                {/* Shine Animation */}
                <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <SendHorizonal className="w-6 h-6 text-white relative z-10 transition-transform duration-500 group-hover:-rotate-12" />
            </div>
        </motion.button>
    );

    if (isFloatingPanel) return content;

    return (
        <AnimatePresence>
            {isVisible && content}
        </AnimatePresence>
    );
};

export default StepLeadCTA;
