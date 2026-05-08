import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepLeadCTA from './StepLeadCTA';
import BackToTop from './BackToTop';
import FloatingSocialCTA from './FloatingSocialCTA';
import WhatsappCTA from './WhatsappCTA';
import AIChatbot from './AIChatbot';

const FloatingActionPanel = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            const show = window.scrollY > 200;
            setIsScrolled(show);
        };
        checkScroll();
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    return (
        <div className="fixed bottom-24 md:bottom-10 right-6 md:right-10 z-[1001] flex flex-col items-end gap-4 pointer-events-none">
            {/* Make children pointer-events-auto so they can be clicked, but the invisible container doesn't block clicks */}
            
            <AnimatePresence>
                {isScrolled && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        className="flex flex-col items-end gap-4 pointer-events-auto"
                    >
                        <BackToTop isFloatingPanel />
                        <FloatingSocialCTA />
                        <AIChatbot isFloatingPanel />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* WhatsApp is ALWAYS visible at the bottom of the stack */}
            <div className="pointer-events-auto">
                <WhatsappCTA isFloatingPanel />
            </div>
        </div>
    );
};

export default FloatingActionPanel;
