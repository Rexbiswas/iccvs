import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackToTop from './BackToTop';
import AIChatbot from './AIChatbot';
import WhatsappCTA from './WhatsappCTA';
import SocialPanel from './SocialPanel';


const FloatingActionPanel = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            const show = window.scrollY > 50;
            setIsScrolled(show);
        };
        checkScroll();
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    return (
        <div className="fixed bottom-24 md:bottom-10 right-6 md:right-10 z-[1001] flex flex-col items-end gap-4 pointer-events-none">
            {/* Persistently Fixed Icons - Always Visible */}
            <div className="hidden lg:flex flex-col items-end gap-4 pointer-events-auto">
                <BackToTop isFloatingPanel />
                <WhatsappCTA isFloatingPanel />
            </div>
            {/* Scroll-Dependent AI Chatbot (Desktop Only) */}
            <AnimatePresence>
                {isScrolled && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="pointer-events-auto flex flex-col items-end gap-4"
                    >
                        <AIChatbot isFloatingPanel />
                        <SocialPanel isFloatingPanel />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FloatingActionPanel;
