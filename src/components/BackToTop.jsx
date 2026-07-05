import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const BackToTop = ({ isFloatingPanel = false }) => {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (isFloatingPanel) return;
        const show = latest > 50;
        if (show !== isVisible) {
            setIsVisible(show);
        }
    });

    React.useEffect(() => {
        if (isFloatingPanel) return;
        const checkScroll = () => {
            const show = window.scrollY > 50;
            setIsVisible(show);
        };
        checkScroll();
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, [isFloatingPanel]);

    // Scroll to top smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const content = (
        <motion.button
            initial={isFloatingPanel ? {} : { opacity: 0, scale: 0.5, y: 20 }}
            animate={isFloatingPanel ? {} : { opacity: 1, scale: 1, y: 0 }}
            exit={isFloatingPanel ? {} : { opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className={`${isFloatingPanel ? 'relative' : 'fixed bottom-[272px] md:bottom-[200px] right-6 md:right-10'} z-999 group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl bg-white/90 backdrop-blur-xl border border-slate-200/50 hover:border-primary/50 hover:shadow-primary/20 transition-all duration-300`}
            aria-label="Back to top"
        >
            <div className="absolute inset-0 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Ring animation */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 scale-100 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />

            <ArrowUp
                className="relative z-10 text-slate-800 group-hover:text-white transition-all duration-300"
                size={28}
                strokeWidth={3}
            />
        </motion.button>
    );

    if (isFloatingPanel) return content;

    return (
        <AnimatePresence>
            {isVisible && content}
        </AnimatePresence>
    );
};

export default BackToTop;
