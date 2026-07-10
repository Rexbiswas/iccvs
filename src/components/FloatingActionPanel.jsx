import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BackToTop from './BackToTop';
import AIChatbot from './AIChatbot';
import WhatsappCTA from './WhatsappCTA';
import EnquiryCTA from './EnquiryCTA';
import SocialPanel from './SocialPanel';
import { useAdmissionModal } from '../context/AdmissionModalContext';
import { useRegisterModal } from '../context/RegisterModalContext';


const FloatingActionPanel = () => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSocialOpen, setIsSocialOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { isAdmissionOpen } = useAdmissionModal();
    const { isOpen: isRegisterOpen } = useRegisterModal();

    const isAnyModalOpen = isAdmissionOpen || isRegisterOpen || isModalVisible;
    const shouldHideIcons = isSocialOpen || isAnyModalOpen || isMenuOpen;

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
            const isBodyMenuOpen = document.body.classList.contains('mobile-menu-open');
            const isBodyModalOpen = document.body.classList.contains('hide-navbar');
            setIsSocialOpen(isBodySocialOpen);
            setIsMenuOpen(isBodyMenuOpen);
            setIsModalVisible(isBodyModalOpen);
        };

        const handleSocialState = (e) => {
            setIsSocialOpen(e.detail.isOpen);
        };

        const handleMenuState = (e) => {
            setIsMenuOpen(e.detail.isOpen);
        };

        checkSocialStatus();

        // MutationObserver to track class changes on body (for hide-navbar)
        const observer = new MutationObserver(checkSocialStatus);
        observer.observe(document.body, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });

        window.addEventListener('social-panel-state', handleSocialState);
        window.addEventListener('menu-state', handleMenuState);

        return () => {
            window.removeEventListener('scroll', checkScroll);
            window.removeEventListener('social-panel-state', handleSocialState);
            window.removeEventListener('menu-state', handleMenuState);
            observer.disconnect();
        };
    }, [location.pathname]);

    return (
        <div className="fixed bottom-4 md:bottom-10 right-4 md:right-10 z-[1001] flex flex-col items-end gap-3 md:gap-4 pointer-events-none">
            {/* Persistent Icons - Desktop and Mobile */}
            <div className="flex flex-col items-end gap-3 md:gap-4 pointer-events-auto">
                <AnimatePresence>
                    {!shouldHideIcons && (
                        <div className="flex flex-col items-end gap-3 md:gap-4">
                            {/* Desktop BackToTop - Only show after scroll */}
                            {isScrolled && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                >
                                    <BackToTop isFloatingPanel />
                                </motion.div>
                            )}
                            {/* Whatsapp is now persistent on all devices but hides when menu is open */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                            >
                                <WhatsappCTA isFloatingPanel />
                            </motion.div>
                            <EnquiryCTA isFloatingPanel />
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Headless AIChatbot for mobile event listening */}
            <div className="lg:hidden pointer-events-auto">
                <AIChatbot showTrigger={false} isFloatingPanel />
            </div>

            {/* Scroll-Dependent Icons (Bot & Social) */}
            <AnimatePresence>
                {isScrolled && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="pointer-events-auto flex flex-col items-end gap-4"
                    >
                        {!shouldHideIcons && (
                            <motion.div
                                key="floating-extra"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex flex-col items-end gap-4"
                            >
                                {/* Desktop Bot */}
                                <div className="hidden lg:block">
                                    <AIChatbot isFloatingPanel />
                                </div>
                            </motion.div>
                        )}

                        {/* SocialPanel - Desktop only */}
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
