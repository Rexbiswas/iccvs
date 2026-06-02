import React, { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Target, TrendingUp, Globe, Award, Users } from 'lucide-react';
import useLenisSmoothScroll from '../hooks/useLenisSmoothScroll';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import FranchiseCTA from '../components/FranchiseCTA';

gsap.registerPlugin(ScrollTrigger);

const Franchise = () => {
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const heroImageRef = useRef(null);
    const sealRef = useRef(null);
    const gridRef = useRef(null);

    // Lenis Smooth Scroll (optimized for Safari/Chrome)
    useLenisSmoothScroll({ lerp: 0.1 });

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            if (heroRef.current) {
                const heroChars = heroRef.current.querySelectorAll('.hero-char');
                if (heroChars.length > 0) {
                    gsap.from(heroChars, {
                        y: 100,
                        rotateX: -90,
                        opacity: 0,
                        stagger: 0.05,
                        duration: 1,
                        ease: "power4.out"
                    });
                }
            }

            // Sub-headline
            gsap.to(".hero-sub", {
                opacity: 1,
                letterSpacing: "0.5em",
                duration: 2,
                ease: "power2.out",
                delay: 0.5
            });

            // Image Reveal
            if (heroImageRef.current) {
                gsap.fromTo(heroImageRef.current,
                    { opacity: 0, scale: 0.8, y: 50 },
                    { opacity: 1, scale: 1, y: 0, duration: 2, ease: "expo.out", delay: 0.8 }
                );

                const handleMouseMove = (e) => {
                    const { clientX, clientY } = e;
                    const xPct = (clientX / window.innerWidth - 0.5);
                    const yPct = (clientY / window.innerHeight - 0.5);
                    gsap.to(heroImageRef.current, {
                        x: xPct * 30,
                        y: yPct * 30,
                        rotateY: xPct * 5,
                        rotateX: -yPct * 5,
                        duration: 1,
                        ease: "power2.out"
                    });
                };
                window.addEventListener('mousemove', handleMouseMove);
                return () => window.removeEventListener('mousemove', handleMouseMove);
            }

            // Seal Rotation
            if (sealRef.current) {
                gsap.to(sealRef.current, {
                    rotate: 360,
                    duration: 20,
                    repeat: -1,
                    ease: "none"
                });
            }

            // Grid Items
            if (gridRef.current) {
                const cards = gridRef.current.querySelectorAll('.feature-card');
                cards.forEach((card, i) => {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom-=100px",
                        },
                        y: 50,
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.8,
                        ease: "power3.out",
                        delay: i * 0.1
                    });
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const features = [
        { icon: Shield, title: "IAS Legacy", desc: "Co-founded by the visionary 1st Director General of NIFT." },
        { icon: Award, title: "National Award", desc: "India's leading National Award-Winning Design School." },
        { icon: TrendingUp, title: "High ROI", desc: "Proven business model with rapid growth potential." },
        { icon: Globe, title: "Global Network", desc: "Collaboration with international design weeks and mavericks." },
        { icon: Target, title: "Curriculum", desc: "Industry-aligned programs in Fashion, Interior & Multimedia." },
        { icon: Users, title: "Support", desc: "Full academic, marketing, and operational guidance." }
    ];

    return (
        <div ref={containerRef} className="relative z-10 bg-[#f3f3f3] text-slate-900 min-h-screen selection:bg-primary selection:text-white overflow-hidden font-sans border-y border-slate-300">
            <SEO
                title="Design Institute Franchise – India’s Skill School Concept"
                description="Join the pan-India design skill school network. Explore a high ROI design institute franchise with INSD – India’s Skill School for creative careers."
                keywords="design institute franchise, India's skill school concept, pan India design skill school network, profitable education franchise India, design school business opportunity, skill India design franchise"
            />

            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="bg-element absolute top-[10%] left-[5%] w-[40vw] h-[40vw] bg-primary/10 blur-[150px] mix-blend-multiply rounded-full"></div>
                <div className="bg-element absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] bg-secondary/10 blur-[150px] mix-blend-multiply rounded-full"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-multiply pointer-events-none"></div>
            </div>

            {/* Hero Section */}
            <FranchiseCTA />

            {/* Legacy Section */}
            <section className="relative py-32 px-6 z-10 border-t border-slate-300 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <h2 className="text-clamp-4xl font-bold leading-tight mb-8 text-slate-900">
                            Built on a <br /><span className="text-primary italic">Visionary</span> Foundation
                        </h2>
                        <p className="text-xl text-slate-600 font-light leading-relaxed mb-12">
                            INSD was co-founded by the IAS Officer and 1st Director General of NIFT, who pioneered design education in India. Today, we are a National Award-Winning brand with a legacy of excellence and innovation.
                        </p>
                        <div className="flex gap-12">
                            <div>
                                <span className="block text-4xl font-black mb-2 tracking-tighter">Award</span>
                                <span className="text-xs uppercase text-slate-500 tracking-widest">Winning Pedagogy</span>
                            </div>
                            <div>
                                <span className="block text-4xl font-black mb-2 tracking-tighter">Global</span>
                                <span className="text-xs uppercase text-slate-500 tracking-widest">Collaborations</span>
                            </div>
                        </div>
                    </div>

                    {/* Visual: Floating Blueprint */}
                    <div className="relative aspect-square bg-white rounded-[3rem] overflow-hidden border border-slate-200 shadow-xl group">
                        <img
                            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
                            alt="Meeting"
                            className="w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/90 rounded-3xl backdrop-blur-xl border border-slate-200 shadow-sm text-slate-900">
                            <Users className="text-primary w-12 h-12 mb-6" />
                            <h4 className="text-2xl font-bold mb-2 uppercase italic tracking-tighter">Community Driven</h4>
                            <p className="text-sm text-slate-600 font-medium">A ecosystem built for artists, designers, and entrepreneurs.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bento Grid: Why Join Us */}
            <section ref={gridRef} className="py-32 px-6 z-10 bg-[#f3f3f3] border-t border-slate-300">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-24 text-center md:text-left">
                        <h3 className="text-sm font-mono text-primary font-bold tracking-[0.5em] uppercase mb-4">The Model</h3>
                        <h2 className="text-clamp-5xl font-black uppercase tracking-tighter leading-none text-slate-900">Why Choose <br />INSD?</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="feature-card group relative p-12 bg-white border border-slate-200 rounded-[2.5rem] hover:shadow-2xl hover:border-slate-300 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden text-slate-900"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity mix-blend-multiply pointer-events-none"></div>
                                <f.icon className="w-12 h-12 text-primary mb-8 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                                <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight">{f.title}</h4>
                                <p className="text-slate-600 font-light leading-relaxed">{f.desc}</p>
                                <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                    Learn More <span className="text-lg">→</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            
            <Footer />
        </div>
    );
};

export default Franchise;
