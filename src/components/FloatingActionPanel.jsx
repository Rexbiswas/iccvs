import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackToTop from './BackToTop';
import AIChatbot from './AIChatbot';
import WhatsappCTA from './WhatsappCTA';
import SocialPanel from './SocialPanel';
import { useAdmissionModal } from '../context/AdmissionModalContext';
import { useRegisterModal } from '../context/RegisterModalContext';


const FloatingActionPanel = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSocialOpen, setIsSocialOpen] = useState(false);
    const { isAdmissionOpen } = useAdmissionModal();
    const { isOpen: isRegisterOpen } = useRegisterModal();

    const isAnyModalOpen = isAdmissionOpen || isRegisterOpen;

    const [isFooterVisible, setIsFooterVisible] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            const show = window.scrollY > 50;
            setIsScrolled(show);
        };
        checkScroll();
        window.addEventListener('scroll', checkScroll);

        // Footer Intersection Observer
        const footerObserver = new IntersectionObserver(
            ([entry]) => {
                setIsFooterVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        const footerElement = document.getElementById('footer');
        if (footerElement) footerObserver.observe(footerElement);

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
            if (footerElement) footerObserver.unobserve(footerElement);
        };
    }, []);

    return (
        <div className={`fixed transition-all duration-500 ease-in-out ${isFooterVisible ? 'bottom-75 md:bottom-60' : 'bottom-28 md:bottom-10'} right-6 md:right-10 z-[1001] flex flex-col items-end gap-4 pointer-events-none`}>
            {/* Desktop Persistent Icons */}
            <div className="hidden lg:flex flex-col items-end gap-4 pointer-events-auto">
                <AnimatePresence>
                    {!isSocialOpen && !isAnyModalOpen && (
                        <div className="flex flex-col items-end gap-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                            >
                                <BackToTop isFloatingPanel />
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
                <WhatsappCTA isFloatingPanel />
            </div>

            {/* Headless AIChatbot for mobile event listening - Must be outside isScrolled to stay mounted */}
            <div className="lg:hidden pointer-events-auto">
                <AIChatbot showTrigger={false} isFloatingPanel />
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
                        {/* AIChatbot and Mobile BackToTop hide when social or modals are open */}
                        <AnimatePresence>
                            {!isSocialOpen && !isAnyModalOpen && (
                                <motion.div
                                    key="floating-icons"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="flex flex-col items-end gap-4"
                                >
                                    {/* Desktop Scroll-Dependent Bot */}
                                    <div className="hidden lg:block">
                                        <AIChatbot isFloatingPanel />
                                    </div>

                                    <div className="lg:hidden flex flex-col items-end gap-4">
                                        <WhatsappCTA isFloatingPanel />
                                        <BackToTop isFloatingPanel />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* SocialPanel - Visible only on desktop, mobile has its own in Navbar */}
                        <div className="hidden lg:block">
                            <SocialPanel 
                                isFloatingPanel 
                                isOpen={isSocialOpen}
                                onToggle={(open) => setIsSocialOpen(open)} 
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FloatingActionPanel;
