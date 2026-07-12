import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturedIn = () => {
    const containerRef = useRef(null);
    const marqueeRef = useRef(null);

    // Highly optimized brand list with fashion-forward press addition
    const brands = [
        {
            name: "India Today",
            url: "https://iccvs.edu.in/wp-content/uploads/2021/04/India_Today_Group_Logo.png",
            w: "w-32 md:w-48"
        },
        {
            name: "The Hindu",
            url: "https://iccvs.edu.in/wp-content/uploads/2021/04/TheHindu-Logo.png",
            w: "w-40 md:w-60"
        },
        {
            name: "The Tribune", // JPEG with a white background -> fixed by mix-blend-multiply
            url: "https://iccvs.edu.in/wp-content/uploads/2021/04/tribune-india-logo.jpg",
            w: "w-44 md:w-64"
        },
        {
            name: "Harper's Bazaar",
            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Harper%27s_Bazaar_Logo.svg/1280px-Harper%27s_Bazaar_Logo.svg.png",
            w: "w-48 md:w-72"
        },
        {
            name: "Times of India",
            url: "https://www.vhv.rs/dpng/d/588-5881296_times-of-india-newspaper-logo-hd-png-download.png",
            w: "w-40 md:w-60"
        }
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1 });
            const marqueeContent = marqueeRef.current;
            const marqueeAnim = tl.to(marqueeContent, {
                xPercent: -50, // Seamlessly jumps back at halfway point since we double the rendered array
                ease: "none",
                duration: 40
            });
            marqueeRef.current.marqueeAnim = marqueeAnim;
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Double the array logically before spreading
    const marqueeItems = [...brands, ...brands];

    return (
        <section ref={containerRef} className="w-full bg-[#f3f3f3] py-24 md:py-32 overflow-hidden relative border-y border-slate-300">

            {/* Dynamic Background Noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-multiply pointer-events-none"></div>

            <div className="relative z-10 container mx-auto px-6 mb-20 md:mb-28 text-center pt-8">
                <span className="text-xs uppercase tracking-[0.4em] font-bold text-slate-500 mb-6 border border-slate-300 inline-block px-6 py-2 rounded-full bg-white/60 backdrop-blur-md shadow-sm">Global Press Recognition</span>
                <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-serif text-slate-900 leading-[0.9] tracking-tighter mt-4">
                    Featured <span className="italic font-light text-slate-400">In.</span>
                </h2>
            </div>

            {/* Seamless Marquee Track */}
            <div className="relative w-full overflow-hidden mask-linear-fade-wide bg-white/50 border-y border-slate-300/80 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]">

                <div 
                    ref={marqueeRef} 
                    className="flex items-center w-max py-12 md:py-16 gap-16 md:gap-32 px-8"
                    onMouseEnter={() => marqueeRef.current.marqueeAnim?.pause()}
                    onMouseLeave={() => marqueeRef.current.marqueeAnim?.resume()}
                >
                    {/* Render sequence multiple times heavily to ensure the screen is always filled */}
                    {[...marqueeItems, ...marqueeItems].map((brand, i) => (
                        <div
                            key={i}
                            className={`group relative shrink-0 flex items-center justify-center transition-all duration-500 ease-out hover:scale-[1.15] cursor-pointer h-16 md:h-24 ${brand.w}`}
                        >
                            {/* 
                                mix-blend-multiply: Instantly makes any white background in JPEGs completely transparent against the light grey track 
                                & opacity: Makes logos uniform and sophisticated
                            */}
                            <img
                                src={brand.url}
                                alt={brand.name}
                                className="w-full h-full object-contain mix-blend-multiply transition-all duration-500"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    ))}
                </div>

            </div>

        </section>
    );
};

export default FeaturedIn;
