import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Maximize2, X, Camera, Image as ImageIcon, ArrowRight } from 'lucide-react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Gallery = () => {
    const containerRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [filter, setFilter] = useState('All');

    const galleryData = [
        { id: 1, category: 'Fashion', title: 'Vogue Runway 2025', image: 'https://images.unsplash.com/photo-1539109132314-34a77bd6819f?q=80&w=1974&auto=format&fit=crop' },
        { id: 2, category: 'Interior', title: 'Conceptual Living Space', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop' },
        { id: 3, category: 'Events', title: 'Global Design Summit', image: 'https://images.unsplash.com/photo-1540575861501-7c0011e7a48f?q=80&w=2070&auto=format&fit=crop' },
        { id: 4, category: 'Campus', title: 'North Delhi Creative Hub', image: 'https://images.unsplash.com/photo-1523050853064-dbad32c970a2?q=80&w=2070&auto=format&fit=crop' },
        { id: 5, category: 'Fashion', title: 'Sustainable Couture', image: 'https://images.unsplash.com/photo-1445053023192-8d45cb66099d?q=80&w=2070&auto=format&fit=crop' },
        { id: 6, category: 'Interior', title: 'Modernist Loft', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop' },
        { id: 7, category: 'Animation', title: 'VFX Masterclass', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop' },
        { id: 8, category: 'Events', title: 'Launch Night', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop' },
        { id: 9, category: 'Fashion', title: 'Editorial Shoot', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop' },
        { id: 10, category: 'Campus', title: 'Paris Studio', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop' },
    ];

    const categories = ['All', 'Fashion', 'Interior', 'Animation', 'Events', 'Campus'];
    const filteredData = filter === 'All' ? galleryData : galleryData.filter(item => item.category === filter);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".gallery-hero-title", {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: ".gallery-hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, [filter]);

    return (
        <div ref={containerRef} className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary selection:text-white overflow-x-hidden">
            <SEO 
                title="Design Portfolios & Campus Gallery - ICCVS Showcase"
                description="Explore the visual creative journey at ICCVS. Our gallery showcases the best in fashion, interior design, and student portfolios from across our global campuses."
                keywords="ICCVS gallery, design portfolios, fashion design showcase, interior design student work, campus gallery"
            />
            {/* --- HERO SECTION --- */}
            <section className="gallery-hero relative h-[50vh] md:h-[65vh] flex flex-col items-center justify-center overflow-hidden bg-slate-50 border-b border-slate-100">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white z-10" />
                    <motion.img 
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.15 }}
                        transition={{ duration: 1.5 }}
                        src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop" 
                        className="w-full h-full object-cover" 
                        alt="Gallery Background"
                    />
                </div>

                <div className="relative z-20 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4"
                    >
                        <span className="text-primary font-black text-[10px] md:text-xs uppercase tracking-[0.6em] mb-4 block">
                            Visual Portfolios
                        </span>
                        <h1 className="gallery-hero-title text-clamp-4xl font-black uppercase tracking-tighter leading-none m-0 text-slate-900 mix-blend-multiply">
                            GALLERY<span className="text-transparent stroke-text-slate opacity-10">.</span>
                        </h1>
                        <p className="text-slate-400 font-bold text-xs md:text-sm uppercase tracking-widest max-w-xl mx-auto">
                            The definitive collection of avant-garde design across all ICCVS global verticals.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- FILTER BAR --- */}
            <div className="sticky top-0 z-[60] py-8 border-b border-slate-100 backdrop-blur-xl bg-white/80">
                <div className="flex flex-wrap justify-center gap-4 px-6 md:px-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                                filter === cat 
                                ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 translate-y-[-2px]' 
                                : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100 hover:text-slate-600'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- MASONRY GRID --- */}
            <main className="py-24 container mx-auto px-6 md:px-12">
                <motion.div 
                    layout
                    className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredData.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                                className="break-inside-avoid relative group cursor-crosshair bg-slate-50 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 min-h-[200px]"
                                onClick={() => setSelectedImage(item)}
                            >
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-auto transition-all duration-1000 group-hover:scale-110 ease-out"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-end">
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">{item.category}</span>
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight drop-shadow-md">{item.title}</h3>
                                        <div className="mt-4 flex items-center gap-2 text-white/60 font-bold text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                                            View Project <ArrowRight size={12} className="text-primary" />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-6 right-6 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Maximize2 size={16} />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </main>

            {/* --- LIGHTBOX (MODERN MINIMALIST) --- */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-white backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 overflow-y-auto"
                    >
                        <button 
                            className="fixed top-8 right-8 md:top-12 md:right-12 text-slate-400 hover:text-slate-900 transition-colors z-50 p-4"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={40} strokeWidth={1} />
                        </button>
                        
                        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center py-20">
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ type: "spring", damping: 25 }}
                                className="lg:col-span-7 rounded-[3rem] overflow-hidden shadow-3xl bg-slate-50"
                            >
                                <img src={selectedImage.image} alt={selectedImage.title} className="w-full h-auto object-cover" />
                            </motion.div>
                            
                            <motion.div 
                                initial={{ x: 30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="lg:col-span-5 space-y-10 text-center lg:text-left"
                            >
                                <div className="space-y-4">
                                    <span className="text-primary font-black uppercase tracking-[0.4em] text-xs block">{selectedImage.category}</span>
                                    <h2 className="text-clamp-3xl font-black text-slate-900 uppercase tracking-tighter leading-[0.85]">{selectedImage.title}</h2>
                                </div>
                                <p className="text-slate-500 font-bold text-sm md:text-lg uppercase tracking-tight leading-relaxed">
                                    Showcasing the pinnacle of design excellence at ICCVS. This work represents the intersection of technology, art, and human-centric design.
                                </p>
                                <div className="space-y-4 pt-4">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Global Vertical Impact</p>
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                        {['Innovation', 'Craftsmanship', 'Industry 4.0'].map((tag, i) => (
                                            <span key={i} className="px-5 py-2 rounded-full border border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-8">
                                    <button className="px-12 py-5 bg-slate-900 text-white rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary transition-all shadow-2xl">
                                        Experience Full Case Study
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default Gallery;
