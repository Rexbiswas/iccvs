import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const InsdiansByDesign = () => {
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

            // 2. Main Assemble Timeline - Simplified for Performance
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=200%",
                    pin: true,
                    scrub: 0.5, // Faster scrub = less visible frame lag
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
                    opacity: 0.1,
                    scale: 1.1,
                    z: -100,
                    duration: 0.5,
                    stagger: 0.1
                }, "-=0.5");

            // 3. Subtle "Breathing" - Apply to container, not individual chars
            gsap.to(contentRef.current, {
                y: "+=20",
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // 4. Optimized Mouse Follow - Single element spotlight
            const xTo = gsap.quickTo(spotlightRef.current, "x", { duration: 0.4, ease: "power3" });
            const yTo = gsap.quickTo(spotlightRef.current, "y", { duration: 0.4, ease: "power3" });

            const handleMouseMove = (e) => {
                const rect = containerRef.current.getBoundingClientRect();
                xTo(e.clientX - rect.left);
                yTo(e.clientY - rect.top);

                // Low-impact tilt
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

    const text = "We are #insdians by design.";

    return (
        <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">

            {/* Background Texture - Static & Stable */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
            </div>

            {/* Spotlight - Single Layer Follow */}
            <div ref={spotlightRef} className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-primary/10 blur-[120px] rounded-full pointer-events-none z-10 -translate-x-1/2 -translate-y-1/2"></div>

            {/* Main Stage */}
            <div ref={contentRef} className="relative z-20 w-full max-w-7xl px-6 flex flex-col items-center justify-center">

                {/* Ghost Echoes - Single Text Strings (Not split) to reduce DOM nodes */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -z-10">
                    {[1, 2].map((_, i) => (
                        <h2
                            key={i}
                            ref={el => layersRef.current[i] = el}
                            className="absolute text-[10vw] font-black uppercase text-white/5 whitespace-nowrap opacity-0 text-center w-full"
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
                    <h2 className="text-[9vw] md:text-[8vw] xl:text-[7rem] font-black uppercase tracking-tighter text-white leading-[0.9] flex flex-wrap justify-center text-center gap-x-[0.15em] w-full">
                        {text.split(" ").map((word, wordIdx) => (
                            <span key={wordIdx} className={`inline-block ${word.startsWith('#') ? 'text-primary' : ''}`}>
                                {word.split("").map((char, charIdx) => (
                                    <span key={charIdx} className="char inline-block whitespace-nowrap">
                                        {char}
                                    </span>
                                ))}
                            </span>
                        ))}
                    </h2>
                </div>

                {/* Sub-tag */}
                <div className="mt-12 overflow-hidden">
                    <p className="text-primary/60 font-mono tracking-[0.5em] uppercase text-[10px] md:text-sm border-t border-white/10 pt-8 text-center">
                        Design • Innovation • Culture
                    </p>
                </div>
            </div>

            {/* Aesthetic Borders - Simple SVG overlays */}
            <div className="absolute inset-10 border border-white/5 pointer-events-none rounded-3xl">
                <div className="absolute top-0 left-12 h-px w-24 bg-primary/20"></div>
                <div className="absolute bottom-0 right-12 h-px w-24 bg-secondary/20"></div>
            </div>
        </div>
    );
};

export default InsdiansByDesign;
