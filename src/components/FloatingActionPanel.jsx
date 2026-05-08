import React, { useState, useEffect } from 'react';
import BackToTop from './BackToTop';

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
            {/* The BackToTop button is always visible as per user's previous request */}
            <div className="pointer-events-auto">
                <BackToTop isFloatingPanel />
            </div>
        </div>
    );
};

export default FloatingActionPanel;
