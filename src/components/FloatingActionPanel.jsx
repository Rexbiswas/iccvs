import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackToTop from './BackToTop';
import AIChatbot from './AIChatbot';
import WhatsappCTA from './WhatsappCTA';
import SocialPanel from './SocialPanel';


const FloatingActionPanel = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSocialOpen, setIsSocialOpen] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            const show = window.scrollY > 50;
            setIsScrolled(show);
        };
        checkScroll();
        window.addEventListener('scroll', checkScroll);

        // Initial check and event listener for social panel state
        const checkSocialStatus = () => {
            const isBodySocialOpen = document.body.classList.contains('social-hub-open');
            setIsSocialOpen(isBodySocialOpen);
        };

        const handleSocialState = (e) => {
            setIsSocialOpen(e.detail.isOpen);
        };

        checkSocialStatus();
        window.addEventListener('social-panel-state', handleSocialState);

        return () => {
            window.removeEventListener('scroll', checkScroll);
            window.removeEventListener('social-panel-state', handleSocialState);
        };
    }, []);

    return (
        <div className="fixed bottom-24 md:bottom-10 right-6 md:right-10 z-[1001] flex flex-col items-end gap-4 pointer-events-none">
            {/* Desktop Persistent Icons */}
            <div className="hidden lg:flex flex-col items-end gap-4 pointer-events-auto">
                <AnimatePresence>
                    {!isSocialOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <BackToTop isFloatingPanel />
                        </motion.div>
                    )}
                </AnimatePresence>
                <WhatsappCTA isFloatingPanel />
            </div>

            {/* Scroll-Dependent Icons */}
            <AnimatePresence>
                {isScrolled && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="pointer-events-auto flex flex-col items-end gap-4"
                    >
                        {/* AIChatbot and Mobile BackToTop hide when social is open */}
                        <AnimatePresence>
                            {!isSocialOpen && (
                                <motion.div
                                    key="floating-icons"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="flex flex-col items-end gap-4"
                                >
                                    <AIChatbot isFloatingPanel />
                                    <div className="lg:hidden">
                                        <BackToTop isFloatingPanel />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* SocialPanel stays visible on desktop to allow closing */}
                        <div className="hidden lg:block">
                            <SocialPanel isFloatingPanel onToggle={(open) => setIsSocialOpen(open)} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FloatingActionPanel;
