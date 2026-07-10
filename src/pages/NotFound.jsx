import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, RefreshCw, WifiOff, MapPinOff, ArrowLeft, Terminal } from 'lucide-react';
import gsap from 'gsap';
import SEO from '../components/SEO';

const NotFound = () => {
    const navigate = useNavigate();
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const containerRef = useRef(null);
    const glitchRef = useRef(null);

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        const handleKeyPress = (e) => {
            // Shift + Alt + O to toggle offline state for debugging
            if (e.shiftKey && e.altKey && e.key.toLowerCase() === 'o') {
                setIsOffline(prev => !prev);
            }
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        window.addEventListener('keydown', handleKeyPress);

        // GSAP animations for premium feel
        const ctx = gsap.context(() => {
            // Floating orbs background animation
            gsap.to(".orb", {
                x: "random(-100, 100)",
                y: "random(-100, 100)",
                duration: "random(10, 20)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: {
                    each: 2,
                    from: "random"
                }
            });

            // Glitch effect on the large text
            const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
            glitchTl
                .to(".glitch-text", { skewX: 20, duration: 0.1, ease: "power4.inOut" })
                .to(".glitch-text", { skewX: -20, duration: 0.1 })
                .to(".glitch-text", { skewX: 0, duration: 0.1 })
                .to(".glitch-text", { x: -5, y: 2, color: "#db3436", duration: 0.05 })
                .to(".glitch-text", { x: 5, y: -2, color: "#134a84", duration: 0.05 })
                .to(".glitch-text", { x: 0, y: 0, color: "inherit", duration: 0.05 });
        }, containerRef);

        document.body.classList.add('is-404-page');

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('keydown', handleKeyPress);
            document.body.classList.remove('is-404-page');
            ctx.revert();
        };
    }, []);

    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div ref={containerRef} className="fixed inset-0 z-1000 bg-[#0f172b] flex items-center justify-center overflow-hidden font-sans">
            <SEO 
                title="404 - Page Not Found | ICCVS"
                description="The page you are looking for does not exist or has been moved. Return to the home page to continue exploring ICCVS."
                robots="noindex, follow"
            />
            {/* Liquid Background Orbs */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="orb absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
                <div className="orb absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/20 blur-[150px] rounded-full" />
                <div className="orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full" />
            </div>

            {/* Content Wrapper */}
            <div className="relative z-10 w-full max-w-4xl px-6 text-center">
                <AnimatePresence mode="wait">
                    {isOffline ? (
                        <motion.div
                            key="offline"
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col items-center"
                        >
                            <div className="relative mb-12">
                                <motion.div
                                    animate={{ rotate: [0, -5, 5, 0] }}
                                    transition={{ duration: 6, repeat: -1, ease: "easeInOut" }}
                                    className="w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-3xl shadow-2xl"
                                >
                                    <WifiOff size={64} className="text-white brightness-150 animate-pulse" strokeWidth={1.5} />
                                </motion.div>
                                <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center shadow-lg animate-bounce">
                                    <Terminal size={20} className="text-white" />
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
                                Connection <span className="text-primary italic">Lost</span>
                            </h1>
                            <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed font-light">
                                It seems you've drifted out of range. Check your network cables or Wi-Fi status to continue your creative journey.
                            </p>

                            <div className="flex flex-col md:flex-row gap-6">
                                <button
                                    onClick={handleRetry}
                                    className="group relative px-10 py-4 bg-white text-slate-900 rounded-full font-bold uppercase tracking-widest text-sm overflow-hidden flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
                                >
                                    <RefreshCw className="group-hover:rotate-180 transition-transform duration-700" size={18} />
                                    Retry Connection
                                </button>
                                <button
                                    onClick={() => navigate('/')}
                                    className="px-10 py-4 bg-white/5 border border-white/20 text-white rounded-full font-bold uppercase tracking-widest text-sm backdrop-blur-xl hover:bg-white/10 transition-all flex items-center gap-3"
                                >
                                    <Home size={18} />
                                    Safe Zone
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="404"
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col items-center"
                        >
                            <div className="relative mb-8 md:mb-12">
                                <h2 className="glitch-text text-[15vw] md:text-[12rem] font-black leading-none text-white select-none pointer-events-none tracking-tighter">
                                    404
                                </h2>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-0">
                                    {/* Scanline Effect Overlay */}
                                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent h-20 animate-scan pointer-events-none" />
                                </div>
                            </div>

                            <div className="mb-12">
                                <h1 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                                    Coordinate <span className="text-secondary italic">Mismatch</span>
                                </h1>
                                <p className="text-slate-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
                                    The page you're looking for has been moved to another dimension or never existed in this reality.
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/')}
                                className="group relative px-12 py-5 bg-linear-to-r from-primary to-secondary rounded-full text-white font-black uppercase tracking-[0.2em] text-sm overflow-hidden shadow-[0_20px_50px_rgba(219,52,54,0.3)]"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                <span className="relative z-10 flex items-center gap-3">
                                    <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
                                    Return to Reality
                                </span>
                            </motion.button>

                            {/* Decorative Grid Pin */}
                            <div className="mt-20 flex items-center justify-center gap-4 text-white/20 font-mono text-xs tracking-widest uppercase">
                                <MapPinOff size={14} />
                                <span>Error_Type: UNDEFINED_ENDPOINT</span>
                                <div className="w-12 h-px bg-white/10" />
                                <span>Status: 404</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* CRT Flicker Overlay */}
            <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
        </div>
    );
};

export default NotFound;
