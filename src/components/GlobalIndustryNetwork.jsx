import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Users, Trophy, Building2, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GlobalIndustryNetwork = () => {
    const sectionRef = useRef(null);
    const marqueeAnim1 = useRef(null);
    const marqueeAnim2 = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Marquee 1 - Left to Right
            marqueeAnim1.current = gsap.to(".marquee-inner-1", {
                xPercent: -50,
                repeat: -1,
                duration: 30,
                ease: "linear"
            });

            // Marquee 2 - Right to Left
            marqueeAnim2.current = gsap.to(".marquee-inner-2", {
                xPercent: 0,
                repeat: -1,
                duration: 35,
                ease: "linear",
                startAt: { xPercent: -50 }
            });

            // Section Heading Reveal
            gsap.from(".network-header > *", {
                y: 50,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true
                }
            });
        }, sectionRef.current);

        return () => ctx.revert();
    }, []);

    const partners = [
        "Levi’s", "PC Jewellers", "Malabar gold", "Tissot", 
        "Porche", "Shalini passi foundation", "Mash", "Marshall", 
        "Accenture", "Pantaloons", "Liv space", "Asian paints", 
        "Lakmé", "Jaipur rugs", "Gaurav Gupta", "Jigar mali", 
        "IKEA", "RADO", "Study by Janak", "La polo", 
        "Mufti", "Central park cocktails", "Kawasaki"
    ];

    return (
        <section ref={sectionRef} className="relative py-24 md:py-48 bg-slate-950 text-white overflow-hidden">
            {/* Background Narrative */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(219,52,54,0.05),transparent)] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-6 relative z-10 mb-24 md:mb-32">
                <div className="network-header flex flex-col items-center text-center">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px w-8 bg-primary"></div>
                        <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">Global Ecosystem</span>
                        <div className="h-px w-8 bg-primary"></div>
                    </div>

                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-12">
                        Your Career <br />
                        <span className="text-transparent stroke-text-white italic font-serif">is</span> Borderless.
                    </h2>

                    <div className="max-w-2xl">
                        <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
                            With over <span className="text-white font-bold">500+ Placement Partners</span> and direct industry pipelines, your education at INSD is a passport to the global design elite.
                        </p>
                    </div>
                </div>
            </div>

            {/* Marquee Row 1 */}
            <div className="relative py-8 md:py-12 -rotate-2 bg-white group hover:rotate-0 transition-transform duration-700">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div 
                    ref={marqueeAnim1} 
                    className="marquee-container overflow-hidden whitespace-nowrap cursor-pointer"
                    onMouseEnter={() => marqueeAnim1.current?.pause()}
                    onMouseLeave={() => marqueeAnim1.current?.resume()}
                >
                    <div className="marquee-inner-1 flex items-center">
                        {[...partners, ...partners].map((partner, i) => (
                            <div key={i} className="flex items-center gap-12 md:gap-24 mx-6 md:mx-12">
                                <span className="text-slate-900 text-3xl md:text-5xl font-black uppercase tracking-tight hover:text-primary transition-colors cursor-default whitespace-nowrap">
                                    {partner}
                                </span>
                                <div className="w-2 h-2 rounded-full bg-slate-200" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Marquee Row 2 */}
            <div className="relative py-8 md:py-12 rotate-1 bg-slate-900 mt-4 group hover:rotate-0 transition-transform duration-700 border-y border-white/5">
                <div 
                    ref={marqueeAnim2} 
                    className="marquee-container overflow-hidden whitespace-nowrap cursor-pointer"
                    onMouseEnter={() => marqueeAnim2.current?.pause()}
                    onMouseLeave={() => marqueeAnim2.current?.resume()}
                >
                    <div className="marquee-inner-2 flex items-center">
                        {[...partners.reverse(), ...partners].map((partner, i) => (
                            <div key={i} className="flex items-center gap-12 md:gap-24 mx-6 md:mx-12">
                                <span className="text-white/40 text-3xl md:text-5xl font-black uppercase tracking-tight hover:text-white transition-colors cursor-default whitespace-nowrap">
                                    {partner}
                                </span>
                                <div className="w-2 h-2 rounded-full bg-white/10" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Placement CTA Stats */}
            <div className="container mx-auto px-6 mt-24 md:mt-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="p-10 rounded-4xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                        <div className="flex items-start justify-between mb-8">
                            <Trophy className="text-primary w-8 h-8 group-hover:scale-110 transition-transform" />
                            <ExternalLink size={16} className="text-slate-600" />
                        </div>
                        <h3 className="text-4xl font-black mb-2 tracking-tighter">98%</h3>
                        <p className="text-xs font-black uppercase tracking-widest text-white/50">successful placement track record</p>
                    </div>

                    <div className="p-10 rounded-4xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                        <div className="flex items-start justify-between mb-8">
                            <Building2 className="text-primary w-8 h-8 group-hover:scale-110 transition-transform" />
                            <ExternalLink size={16} className="text-slate-600" />
                        </div>
                        <h3 className="text-4xl font-black mb-2 tracking-tighter">500+</h3>
                        <p className="text-xs font-black uppercase tracking-widest text-white/50">Industry Recruiters</p>
                    </div>

                    <div className="p-10 rounded-4xl bg-primary text-white hover:bg-white hover:text-primary transition-all group cursor-pointer">
                        <div className="flex items-start justify-between mb-8">
                            <Users className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                        </div>
                        <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Hire INSD Talent</h3>
                        <p className="text-xs font-black uppercase tracking-widest opacity-80">Employer Portal →</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GlobalIndustryNetwork;
