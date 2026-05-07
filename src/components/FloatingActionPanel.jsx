import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepLeadCTA from './StepLeadCTA';
import BackToTop from './BackToTop';
import WhatsappCTA from './WhatsappCTA';
import AIChatbot from './AIChatbot';

const FloatingActionPanel = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            const show = window.scrollY > 200;
            setIsVisible(show);
        };
        checkScroll();
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="fixed bottom-24 md:bottom-10 right-6 md:right-10 z-[1001] flex flex-col items-end gap-4"
                >
                    {/* <StepLeadCTA isFloatingPanel /> */}
                    <BackToTop isFloatingPanel />
                    <WhatsappCTA isFloatingPanel />
                    <AIChatbot isFloatingPanel />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FloatingActionPanel;
