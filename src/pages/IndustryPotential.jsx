import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import IndustryExposure from '../components/IndustryExposure';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const CardSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [images]);

    const prevSlide = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const nextSlide = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const currentSrc = images[currentIndex];
    const isVideo = currentSrc.toLowerCase().endsWith('.mp4');

    return (
        <div className="absolute inset-0 w-full h-full">
            <AnimatePresence mode="wait">
                {isVideo ? (
                    <motion.video
                        key={currentIndex}
                        src={currentSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-1000 pointer-events-none"
                    />
                ) : (
                    <motion.img
                        key={currentIndex}
                        src={currentSrc}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-1000 pointer-events-none"
                    />
                )}
            </AnimatePresence>
            
            {/* Manual Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button 
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary hover:border-primary focus:outline-none"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button 
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary hover:border-primary focus:outline-none"
                    >
                        <ChevronRight size={20} />
                    </button>
                </>
            )}
            
            {/* Pagination Indicators */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 px-8 flex-wrap">
                    {images.map((_, idx) => (
                        <div 
                            key={idx}
                            className={`h-0.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-primary' : 'w-1.5 bg-white/30'}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
const IndustryPotential = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const weaverRef = useRef(null);
    const sliderRef = useRef(null);

    const scrollSlider = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <main className="min-h-screen bg-[#fafafa]">
            <SEO 
                title="Global Industry Potential & Opportunities | INSD"
                description="Explore the massive global potential and industry demand for design professionals. Learn how INSD prepares students for top-tier design careers."
                keywords="design industry potential, design career opportunities, global design market, fashion industry growth, interior design demand"
                canonical="https://subdomain.insd.edu.in/industry-potential"
            />
            {/* Minimal Hero Section to introduce Industry Potential */}
            <section className="relative section-py overflow-hidden border-b border-slate-200/50">
                {/* Background Details */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-primary/5 to-transparent blur-3xl opacity-60 mix-blend-multiply" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-linear-to-tr from-slate-200/60 to-transparent blur-2xl opacity-50" />
                </div>
                
                <div className="container mx-auto container-px relative z-10 text-center max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-8 shadow-sm">
                            Real-World Demand
                        </span>
                        <h1 className="text-clamp-5xl font-black uppercase leading-[0.85] tracking-tighter text-slate-900 mb-8">
                            Industry <span className="text-primary inline-block">Potential</span>
                        </h1>
                        <p className="max-w-3xl mx-auto text-clamp-lg text-slate-600 font-medium leading-relaxed">
                            A deep dive into the massive global opportunities waiting for design professionals across every major economic sector.
                        </p>
                    </motion.div>
                </div>
            </section>



            {/* --- FIELD INTELLIGENCE: THE IMMERSION PROTOCOL (New Industry Visits Section) --- */}
            <section className="section-py bg-slate-950 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
                
                <div className="container mx-auto container-px relative z-10">
                    <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-32">
                        <div className="space-y-6">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-12 h-px bg-primary" />
                                <span className="text-primary font-black uppercase text-clamp-sm tracking-[0.8em]">Operational Experience</span>
                            </motion.div>
                            
                            <h2 className="text-clamp-5xl font-black uppercase tracking-tighter leading-[0.85]">
                                Field <br /> <span className="stroke-text-white opacity-50">Intelligence.</span>
                            </h2>
                        </div>
                        <p className="max-w-md text-white/40 text-clamp-lg font-medium leading-relaxed uppercase tracking-tight">
                            Beyond theory. We deploy our students into the world's most sophisticated design ecosystems to witness the velocity of industry first-hand.
                        </p>
                    </div>

                    {/* Premium Card Slider Implementation */}
                    <div className="relative group/slider px-4">
                        <div className="overflow-x-auto no-scrollbar py-20 px-10" ref={sliderRef}>
                            <div className="flex gap-10 w-max">
                                {[
                                    { 
                                        title: "weaver Visit", 
                                        type: "Textile Weaving", 
                                        images: [
                                            "https://ik.imagekit.io/fmldynl4j4/waever/Image.jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/waever/Image(1).jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/waever/Image(2).jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/waever/Image(3).jpg"
                                        ]
                                    },
                                    { 
                                        title: "IKEA Mumbai", 
                                        type: "Retail Logistics", 
                                        images: [
                                            "https://ik.imagekit.io/fmldynl4j4/ikea-mumbai/Our%20Interior%20Design%20students%20explored%20the%20world%20of%20Knock%20Down%20Furniture%20and%20Modular%20Concepts%20at%20IKEA%20Mumbai.This%20hands-on%20visit%20helped%20them%20understand%20the%20functionality,%20design%20logic,%20and%20user-centric%20approach%20b%20(1).jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/ikea-mumbai/Our%20Interior%20Design%20students%20explored%20the%20world%20of%20Knock%20Down%20Furniture%20and%20Modular%20Concepts%20at%20IKEA%20Mumbai.This%20hands-on%20visit%20helped%20them%20understand%20the%20functionality,%20design%20logic,%20and%20user-centric%20approach%20b%20(2).jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/ikea-mumbai/Our%20Interior%20Design%20students%20explored%20the%20world%20of%20Knock%20Down%20Furniture%20and%20Modular%20Concepts%20at%20IKEA%20Mumbai.This%20hands-on%20visit%20helped%20them%20understand%20the%20functionality,%20design%20logic,%20and%20user-centric%20approach%20b%20(3).jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/ikea-mumbai/Our%20Interior%20Design%20students%20explored%20the%20world%20of%20Knock%20Down%20Furniture%20and%20Modular%20Concepts%20at%20IKEA%20Mumbai.This%20hands-on%20visit%20helped%20them%20understand%20the%20functionality,%20design%20logic,%20and%20user-centric%20approach%20b%20(4).jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/ikea-mumbai/Our%20Interior%20Design%20students%20explored%20the%20world%20of%20Knock%20Down%20Furniture%20and%20Modular%20Concepts%20at%20IKEA%20Mumbai.This%20hands-on%20visit%20helped%20them%20understand%20the%20functionality,%20design%20logic,%20and%20user-centric%20approach%20b%20(5).jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/ikea-mumbai/Our%20Interior%20Design%20students%20explored%20the%20world%20of%20Knock%20Down%20Furniture%20and%20Modular%20Concepts%20at%20IKEA%20Mumbai.This%20hands-on%20visit%20helped%20them%20understand%20the%20functionality,%20design%20logic,%20and%20user-centric%20approach%20b%20(6).jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/ikea-mumbai/Our%20Interior%20Design%20students%20explored%20the%20world%20of%20Knock%20Down%20Furniture%20and%20Modular%20Concepts%20at%20IKEA%20Mumbai.This%20hands-on%20visit%20helped%20them%20understand%20the%20functionality,%20design%20logic,%20and%20user-centric%20approach%20b%20(7).jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/ikea-mumbai/Our%20Interior%20Design%20students%20explored%20the%20world%20of%20Knock%20Down%20Furniture%20and%20Modular%20Concepts%20at%20IKEA%20Mumbai.This%20hands-on%20visit%20helped%20them%20understand%20the%20functionality,%20design%20logic,%20and%20user-centric%20approach%20b%20(8).jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/ikea-mumbai/Our%20Interior%20Design%20students%20explored%20the%20world%20of%20Knock%20Down%20Furniture%20and%20Modular%20Concepts%20at%20IKEA%20Mumbai.This%20hands-on%20visit%20helped%20them%20understand%20the%20functionality,%20design%20logic,%20and%20user-centric%20approach%20b%20(9).jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/ikea-mumbai/Our%20Interior%20Design%20students%20explored%20the%20world%20of%20Knock%20Down%20Furniture%20and%20Modular%20Concepts%20at%20IKEA%20Mumbai.This%20hands-on%20visit%20helped%20them%20understand%20the%20functionality,%20design%20logic,%20and%20user-centric%20approach%20%20(10).jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/ikea-mumbai/Our%20Interior%20Design%20students%20explored%20the%20world%20of%20Knock%20Down%20Furniture%20and%20Modular%20Concepts%20at%20IKEA%20Mumbai.This%20hands-on%20visit%20helped%20them%20understand%20the%20functionality,%20design%20logic,%20and%20user-centric%20approach%20behin.jpg"
                                        ]
                                    },
                                    { title: "JB Homes & Show Spaces", type: "Luxury Interior", video: "https://ik.imagekit.io/fmldynl4j4/INTERI~1.MP4" },
                                    { 
                                        title: "Hafele Industry Visit", 
                                        type: "Precision Fittings", 
                                        images: [
                                            "https://ik.imagekit.io/fmldynl4j4/hafele%20industries/WhatsApp%20Image%202025-04-24%20at%2013.53.22%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/hafele%20industries/WhatsApp%20Image%202025-04-24%20at%2013.53.22.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/hafele%20industries/WhatsApp%20Image%202025-04-24%20at%2013.53.23%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/hafele%20industries/WhatsApp%20Image%202025-04-24%20at%2013.53.23.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/hafele%20industries/WhatsApp%20Image%202025-04-24%20at%2013.53.24%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/hafele%20industries/WhatsApp%20Image%202025-04-24%20at%2013.53.24%20(2).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/hafele%20industries/WhatsApp%20Image%202025-04-24%20at%2013.53.24.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/hafele%20industries/WhatsApp%20Image%202025-04-24%20at%2013.53.25%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/hafele%20industries/WhatsApp%20Image%202025-04-24%20at%2013.53.25%20(2).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/hafele%20industries/WhatsApp%20Image%202025-04-24%20at%2013.53.25%20(2).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/hafele%20industries/WhatsApp%20Image%202025-04-24%20at%2013.53.25.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/hafele%20industries/WhatsApp%20Image%202025-04-24%20at%2013.53.26%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/hafele%20industries/WhatsApp%20Image%202025-04-24%20at%2013.53.26%20(2).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/hafele%20industries/WhatsApp%20Image%202025-04-24%20at%2013.53.54.jpeg"
                                        ]
                                    },
                                    { 
                                        title: "Daksh Jewellery Manufacturing", 
                                        type: "Craft Engineering", 
                                        date: "23 May 2025", 
                                        images: [
                                            "https://ik.imagekit.io/fmldynl4j4/daksh%20jwellers/WhatsApp%20Image%202025-05-26%20at%2010.35.46%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/daksh%20jwellers/WhatsApp%20Image%202025-05-26%20at%2010.35.46%20(2).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/daksh%20jwellers/WhatsApp%20Image%202025-05-26%20at%2010.35.46.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/daksh%20jwellers/WhatsApp%20Image%202025-05-26%20at%2010.35.47%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/daksh%20jwellers/WhatsApp%20Image%202025-05-26%20at%2010.35.47.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/daksh%20jwellers/WhatsApp%20Image%202025-05-26%20at%2010.35.48%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/daksh%20jwellers/WhatsApp%20Image%202025-05-26%20at%2010.35.48%20(2).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/daksh%20jwellers/WhatsApp%20Image%202025-05-26%20at%2010.35.48.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/daksh%20jwellers/WhatsApp%20Video%202025-05-26%20at%2010.39.09.mp4",
                                            "https://ik.imagekit.io/fmldynl4j4/daksh%20jwellers/WhatsApp%20Video%202025-05-26%20at%2010.39.11%20(1).mp4",
                                            "https://ik.imagekit.io/fmldynl4j4/daksh%20jwellers/WhatsApp%20Video%202025-05-26%20at%2010.39.11%20(2).mp4",
                                            "https://ik.imagekit.io/fmldynl4j4/daksh%20jwellers/WhatsApp%20Video%202025-05-26%20at%2010.39.11%20(3).mp4",
                                            "https://ik.imagekit.io/fmldynl4j4/daksh%20jwellers/WhatsApp%20Video%202025-05-26%20at%2010.39.11.mp4",
                                            "https://ik.imagekit.io/fmldynl4j4/daksh%20jwellers/WhatsApp%20Video%202025-05-27%20at%201.55.28%20PM.mp4",
                                            "https://ik.imagekit.io/fmldynl4j4/daksh%20jwellers/WhatsApp%20Video%202025-05-27%20at%201.55.29%20PM.mp4"
                                        ]
                                    },
                                    { 
                                        title: "Ply Mahal Visit", 
                                        type: "Material Sciences", 
                                        images: [
                                            "https://ik.imagekit.io/fmldynl4j4/Ply%20Mahal%20Visit-20260429T080259Z-3-001/Ply%20Mahal%20Visit/WhatsApp%20Image%202025-04-24%20at%2013.55.46%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/Ply%20Mahal%20Visit-20260429T080259Z-3-001/Ply%20Mahal%20Visit/WhatsApp%20Image%202025-04-24%20at%2013.55.46.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/Ply%20Mahal%20Visit-20260429T080259Z-3-001/Ply%20Mahal%20Visit/WhatsApp%20Image%202025-04-24%20at%2013.55.47%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/Ply%20Mahal%20Visit-20260429T080259Z-3-001/Ply%20Mahal%20Visit/WhatsApp%20Image%202025-04-24%20at%2013.55.47%20(2).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/Ply%20Mahal%20Visit-20260429T080259Z-3-001/Ply%20Mahal%20Visit/WhatsApp%20Image%202025-04-24%20at%2013.55.47.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/Ply%20Mahal%20Visit-20260429T080259Z-3-001/Ply%20Mahal%20Visit/WhatsApp%20Image%202025-04-24%20at%2013.55.49%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/Ply%20Mahal%20Visit-20260429T080259Z-3-001/Ply%20Mahal%20Visit/WhatsApp%20Image%202025-04-24%20at%2013.55.49%20(2).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/Ply%20Mahal%20Visit-20260429T080259Z-3-001/Ply%20Mahal%20Visit/WhatsApp%20Image%202025-04-24%20at%2013.55.49.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/Ply%20Mahal%20Visit-20260429T080259Z-3-001/Ply%20Mahal%20Visit/WhatsApp%20Image%202025-04-24%20at%2013.55.50.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/Ply%20Mahal%20Visit-20260429T080259Z-3-001/Ply%20Mahal%20Visit/To%20Post/01.jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/Ply%20Mahal%20Visit-20260429T080259Z-3-001/Ply%20Mahal%20Visit/To%20Post/02.jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/Ply%20Mahal%20Visit-20260429T080259Z-3-001/Ply%20Mahal%20Visit/To%20Post/03.jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/Ply%20Mahal%20Visit-20260429T080259Z-3-001/Ply%20Mahal%20Visit/WhatsApp%20Video%202025-04-08%20at%2011.43.29.mp4",
                                            "https://ik.imagekit.io/fmldynl4j4/Ply%20Mahal%20Visit-20260429T080259Z-3-001/Ply%20Mahal%20Visit/WhatsApp%20Video%202025-04-08%20at%2011.43.28.mp4"
                                        ]
                                    },
                                    { 
                                        title: "IDAC Exhibition", 
                                        type: "Global Showcase", 
                                        images: [
                                            "https://ik.imagekit.io/fmldynl4j4/IDAC%20Exhibition-20260429T072744Z-3-001/IDAC%20Exhibition/WhatsApp%20Image%202025-04-24%20at%2014.01.43%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/IDAC%20Exhibition-20260429T072744Z-3-001/IDAC%20Exhibition/WhatsApp%20Image%202025-04-24%20at%2014.01.43%20(2).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/IDAC%20Exhibition-20260429T072744Z-3-001/IDAC%20Exhibition/WhatsApp%20Image%202025-04-24%20at%2014.01.43.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/IDAC%20Exhibition-20260429T072744Z-3-001/IDAC%20Exhibition/WhatsApp%20Image%202025-04-24%20at%2014.01.44%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/IDAC%20Exhibition-20260429T072744Z-3-001/IDAC%20Exhibition/WhatsApp%20Image%202025-04-24%20at%2014.01.44.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/IDAC%20Exhibition-20260429T072744Z-3-001/IDAC%20Exhibition/WhatsApp%20Image%202025-04-24%20at%2014.02.57%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/IDAC%20Exhibition-20260429T072744Z-3-001/IDAC%20Exhibition/WhatsApp%20Image%202025-04-24%20at%2014.02.57%20(2).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/IDAC%20Exhibition-20260429T072744Z-3-001/IDAC%20Exhibition/WhatsApp%20Image%202025-04-24%20at%2014.02.57.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/IDAC%20Exhibition-20260429T072744Z-3-001/IDAC%20Exhibition/WhatsApp%20Image%202025-04-24%20at%2014.02.58.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/IDAC%20Exhibition-20260429T072744Z-3-001/IDAC%20Exhibition/Retouched/01.jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/IDAC%20Exhibition-20260429T072744Z-3-001/IDAC%20Exhibition/Retouched/02.jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/IDAC%20Exhibition-20260429T072744Z-3-001/IDAC%20Exhibition/Retouched/03.jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/IDAC%20Exhibition-20260429T072744Z-3-001/IDAC%20Exhibition/Retouched/04.jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/IDAC%20Exhibition-20260429T072744Z-3-001/IDAC%20Exhibition/Retouched/05.jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/IDAC%20Exhibition-20260429T072744Z-3-001/IDAC%20Exhibition/Retouched/06.jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/IDAC%20Exhibition-20260429T072744Z-3-001/IDAC%20Exhibition/Retouched/07.jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/IDAC%20Exhibition-20260429T072744Z-3-001/IDAC%20Exhibition/Retouched/08.jpg"
                                        ]
                                    },
                                    { 
                                        title: "State Emporium Visit", 
                                        type: "Heritage Design", 
                                        images: [
                                            "https://ik.imagekit.io/fmldynl4j4/State%20Emporium%20Visit-20260429T091122Z-3-001/State%20Emporium%20Visit/WhatsApp%20Image%202025-05-02%20at%2019.58.17.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/State%20Emporium%20Visit-20260429T091122Z-3-001/State%20Emporium%20Visit/WhatsApp%20Image%202025-05-02%20at%2019.58.17%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/State%20Emporium%20Visit-20260429T091122Z-3-001/State%20Emporium%20Visit/WhatsApp%20Image%202025-05-02%20at%2019.58.17%20(7).jpeg"
                                        ]
                                    },
                                    { 
                                        title: "AP Beautiful Homes", 
                                        type: "Roy Paint Protocol", 
                                        images: [
                                            "https://ik.imagekit.io/fmldynl4j4/ap%20beautiful%20roys/WhatsApp%20Image%202025-04-24%20at%2014.06.59%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/ap%20beautiful%20roys/WhatsApp%20Image%202025-04-24%20at%2014.06.59%20(2).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/ap%20beautiful%20roys/WhatsApp%20Image%202025-04-24%20at%2014.06.59.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/ap%20beautiful%20roys/WhatsApp%20Image%202025-04-24%20at%2014.07.00.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/ap%20beautiful%20roys/WhatsApp%20Image%202025-04-24%20at%2014.07.01%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/ap%20beautiful%20roys/WhatsApp%20Image%202025-04-24%20at%2014.07.01%20(2).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/ap%20beautiful%20roys/WhatsApp%20Image%202025-04-24%20at%2014.07.01.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/ap%20beautiful%20roys/WhatsApp%20Image%202025-04-24%20at%2014.07.02.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/ap%20beautiful%20roys/WhatsApp%20Image%202025-04-24%20at%2014.09.17.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/ap%20beautiful%20roys/WhatsApp%20Image%202025-04-24%20at%2014.09.18%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/ap%20beautiful%20roys/WhatsApp%20Image%202025-04-24%20at%2014.09.18.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/ap%20beautiful%20roys/WhatsApp%20Image%202025-04-24%20at%2014.09.19.jpeg"
                                        ]
                                    },
                                    { title: "Eboco Hardware Solutions", type: "Systems Architecture", video: "https://ik.imagekit.io/fmldynl4j4/From%20smart%20home%20solutions%20to%20sustainable%20materials,%20our%20students%20got%20hands-on%20experience%20with%20the%20latest%20technologies%20and%20innovations.%20%20A%20big%20thank%20you%20to%20@ebcosolutions%20Bhopal%20for%20sharing%20their%20expertise!%20%20Amazing.mp4" },
                                    { title: "Tour to Vastravan", type: "Textile Weaving", video: "https://ik.imagekit.io/fmldynl4j4/BEHIND~1.MP4" },
                                    { 
                                        title: "National Gallary Of Modern Art", 
                                        type: "culture & context", 
                                        images: [
                                            "https://ik.imagekit.io/fmldynl4j4/National%20Gallery%20of%20Modern%20Art-20260429T083145Z-3-001/National%20Gallery%20of%20Modern%20Art/To%20Post/01.jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/National%20Gallery%20of%20Modern%20Art-20260429T083145Z-3-001/National%20Gallery%20of%20Modern%20Art/WhatsApp%20Image%202025-05-12%20at%2011.16.04%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/National%20Gallery%20of%20Modern%20Art-20260429T083145Z-3-001/National%20Gallery%20of%20Modern%20Art/WhatsApp%20Image%202025-05-12%20at%2011.16.04%20(2).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/National%20Gallery%20of%20Modern%20Art-20260429T083145Z-3-001/National%20Gallery%20of%20Modern%20Art/WhatsApp%20Image%202025-05-12%20at%2011.16.04.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/National%20Gallery%20of%20Modern%20Art-20260429T083145Z-3-001/National%20Gallery%20of%20Modern%20Art/WhatsApp%20Image%202025-05-12%20at%2011.16.05%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/National%20Gallery%20of%20Modern%20Art-20260429T083145Z-3-001/National%20Gallery%20of%20Modern%20Art/WhatsApp%20Image%202025-05-12%20at%2011.16.05%20(2).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/National%20Gallery%20of%20Modern%20Art-20260429T083145Z-3-001/National%20Gallery%20of%20Modern%20Art/WhatsApp%20Image%202025-05-12%20at%2011.16.05.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/National%20Gallery%20of%20Modern%20Art-20260429T083145Z-3-001/National%20Gallery%20of%20Modern%20Art/WhatsApp%20Image%202025-05-12%20at%2011.16.06%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/National%20Gallery%20of%20Modern%20Art-20260429T083145Z-3-001/National%20Gallery%20of%20Modern%20Art/WhatsApp%20Image%202025-05-12%20at%2011.16.06.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/National%20Gallery%20of%20Modern%20Art-20260429T083145Z-3-001/National%20Gallery%20of%20Modern%20Art/WhatsApp%20Image%202025-05-12%20at%2011.18.41%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/National%20Gallery%20of%20Modern%20Art-20260429T083145Z-3-001/National%20Gallery%20of%20Modern%20Art/WhatsApp%20Image%202025-05-12%20at%2011.18.41.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/National%20Gallery%20of%20Modern%20Art-20260429T083145Z-3-001/National%20Gallery%20of%20Modern%20Art/WhatsApp%20Image%202025-05-12%20at%2011.20.43%20(1).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/National%20Gallery%20of%20Modern%20Art-20260429T083145Z-3-001/National%20Gallery%20of%20Modern%20Art/WhatsApp%20Image%202025-05-12%20at%2011.20.43%20(2).jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/National%20Gallery%20of%20Modern%20Art-20260429T083145Z-3-001/National%20Gallery%20of%20Modern%20Art/WhatsApp%20Image%202025-05-12%20at%2011.20.43.jpeg",
                                            "https://ik.imagekit.io/fmldynl4j4/National%20Gallery%20of%20Modern%20Art-20260429T083145Z-3-001/National%20Gallery%20of%20Modern%20Art/To%20Post/02.jpg",
                                            "https://ik.imagekit.io/fmldynl4j4/National%20Gallery%20of%20Modern%20Art-20260429T083145Z-3-001/National%20Gallery%20of%20Modern%20Art/To%20Post/04.jpg"
                                        ]
                                    },
                                ].map((visit, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -20, scale: 1.02 }}
                                        className="shrink-0 w-[320px] md:w-[400px] relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-slate-900 border border-white/5 group shadow-2xl transition-all duration-500"
                                    >
                                        {visit.video ? (
                                            <video 
                                                src={visit.video} 
                                                autoPlay 
                                                loop 
                                                muted 
                                                playsInline 
                                                className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-1000 pointer-events-none" 
                                            />
                                        ) : visit.images ? (
                                            <CardSlider images={visit.images} />
                                        ) : (
                                            <img src={visit.img} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-1000 pointer-events-none" />
                                        )}
                                        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
                                        
                                        {/* Card Content Overlay */}
                                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                            <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-8 h-px bg-primary" />
                                                    <span className="text-primary font-black uppercase text-[10px] tracking-widest">{visit.type}</span>
                                                </div>
                                                <h3 className="text-clamp-xl font-black uppercase tracking-tighter leading-tight text-white group-hover:text-primary transition-colors">
                                                    {visit.title}
                                                </h3>
                                                {visit.date && <p className="text-white/40 font-bold text-[9px] uppercase tracking-widest">{visit.date}</p>}
                                            </div>
                                        </div>

                                        {/* Decorative Corner Element */}
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Custom Navigation Controls */}
                        <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none px-4">
                            <button 
                                onClick={() => scrollSlider('left')}
                                className="w-16 h-16 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all pointer-events-auto opacity-0 group-hover/slider:opacity-100 -translate-x-4 group-hover/slider:translate-x-0"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                            </button>
                            <button 
                                onClick={() => scrollSlider('right')}
                                className="w-16 h-16 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all pointer-events-auto opacity-0 group-hover/slider:opacity-100 translate-x-4 group-hover/slider:translate-x-0"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                            </button>
                        </div>
                    </div>

                    {/* Minimalist Pagination Bar */}
                    <div className="mt-10 flex flex-col items-center gap-6">
                        <div className="flex gap-2">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === 0 ? 'w-12 bg-primary' : 'w-4 bg-white/10'}`} />
                            ))}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 animate-pulse">Drag or Scroll to Navigate</span>
                    </div>
                </div>
            </section>



            {/* --- INDUSTRY EXPOSURE SECTION --- */}
            <section className="section-py bg-slate-50 border-t border-slate-100">
                <IndustryExposure />
            </section>


            <Footer />
        </main>
    );
};

export default IndustryPotential;
