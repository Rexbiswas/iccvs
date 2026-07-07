import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ICCVSTagline = () => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const textRef = useRef(null);
    const layersRef = useRef([]);
    const spotlightRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const chars = textRef.current.querySelectorAll('.char');

            // 1. Stable 3D Setup
            gsap.set(chars, {
                opacity: 0,
                y: 100,
                z: -500,
                rotateX: -90,
                filter: "blur(10px)",
                transformPerspective: 1000
            });

            // 2. Main Assemble Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=120%", // PIN duration relative to scroll height
                    pin: true,
                    scrub: 0.5,
                }
            });

            tl.to(chars, {
                opacity: 1,
                y: 0,
                z: 0,
                rotateX: 0,
                filter: "blur(0px)",
                duration: 1,
                stagger: {
                    each: 0.05,
                    from: "start"
                },
                ease: "power2.out"
            })
                .to(layersRef.current, {
                    opacity: 0.08,
                    scale: 1.1,
                    z: -100,
                    duration: 0.5,
                    stagger: 0.1
                }, "-=0.5");

            // 3. Subtle breathing effect
            gsap.to(contentRef.current, {
                y: "+=15",
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // 4. Mouse Follow Spotlight
            const xTo = gsap.quickTo(spotlightRef.current, "x", { duration: 0.4, ease: "power3" });
            const yTo = gsap.quickTo(spotlightRef.current, "y", { duration: 0.4, ease: "power3" });

            const handleMouseMove = (e) => {
                const rect = containerRef.current.getBoundingClientRect();
                xTo(e.clientX - rect.left);
                yTo(e.clientY - rect.top);

                const xPct = (e.clientX / window.innerWidth - 0.5);
                const yPct = (e.clientY / window.innerHeight - 0.5);
                gsap.to(textRef.current, {
                    rotateY: xPct * 10,
                    rotateX: -yPct * 10,
                    duration: 1,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const text = "our target your success";

    return (
        <div ref={containerRef} className="relative min-h-screen bg-slate-950 overflow-hidden flex items-center justify-center border-t border-white/5">

            {/* Background Texture */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>
            </div>

            {/* Spotlight */}
            <div ref={spotlightRef} className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-primary/10 blur-[120px] rounded-full pointer-events-none z-10 -translate-x-1/2 -translate-y-1/2"></div>

            {/* Main Stage */}
            <div ref={contentRef} className="relative z-20 w-full max-w-7xl px-6 flex flex-col items-center justify-center">

                {/* Ghost Echoes */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -z-10">
                    {[1, 2].map((_, i) => (
                        <h2
                            key={i}
                            ref={el => layersRef.current[i] = el}
                            className="absolute text-[9vw] font-black uppercase text-white/5 whitespace-nowrap opacity-0 text-center w-full"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {text}
                        </h2>
                    ))}
                </div>

                {/* Primary Text */}
                <div
                    ref={textRef}
                    className="relative transform-gpu"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <h2 className="text-[8vw] md:text-[7vw] xl:text-[6rem] font-black uppercase tracking-tighter text-white leading-[0.95] flex flex-wrap justify-center text-center gap-x-[0.25em] w-full">
                        {text.split(" ").map((word, wordIdx) => {
                            const isHighlight = word === "success";
                            return (
                                <span key={wordIdx} className="inline-block whitespace-nowrap">
                                    {word.split("").map((char, charIdx) => (
                                        <span 
                                            key={charIdx} 
                                            className={`char inline-block whitespace-nowrap ${isHighlight ? 'text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary font-black' : ''}`}
                                        >
                                            {char}
                                        </span>
                                    ))}
                                </span>
                            );
                        })}
                    </h2>
                </div>

                {/* Sub-tag */}
                <div className="mt-12 overflow-hidden w-full">
                    <p className="text-white/40 font-mono tracking-[0.5em] uppercase text-[10px] md:text-xs border-t border-white/10 pt-8 text-center flex items-center justify-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        Technology • Education • Excellence
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                    </p>
                </div>
            </div>

            {/* Aesthetic Borders */}
            <div className="absolute inset-10 border border-white/5 pointer-events-none rounded-3xl">
                <div className="absolute top-0 left-12 h-px w-24 bg-primary/20"></div>
                <div className="absolute bottom-0 right-12 h-px w-24 bg-secondary/20"></div>
            </div>
        </div>
    );
};

export default ICCVSTagline;
