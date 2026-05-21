import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Lenis from 'lenis';



import NationalAwards from '../components/NationalAwards';
import StepLeadForm from '../components/StepLeadForm';
import ProgramSearch from '../components/ProgramSearch';
import TestimonialSlider from '../components/TestimonialSlider';
import FeaturedIn from '../components/FeaturedIn';

import StepVisual from '../components/StepVisual';
import EventBlogs from '../components/EventBlogs';
import InstagramGallery from '../components/InstagramGallery';
import InsdiansByDesign from '../components/InsdiansByDesign';
import Footer from '../components/Footer';
import NetworkCounter from '../components/NetworkCounter';
import WhyInsd from '../components/WhyInsd';
import AiFutureDesign from '../components/AiFutureDesign';
import CelebritySlider from '../components/CelebritySlider';
import LegacyTimeline from '../components/LegacyTimeline';
import ProgramGrid from '../components/ProgramGrid';
import InsdDifference from '../components/InsdDifference';
import IndustryInsights from '../components/IndustryInsights';
import HeroSlider from '../components/HeroSlider';
import { ArrowRight, CheckCircle2, Sparkles, Briefcase, Rocket, FileDown } from 'lucide-react';
import PlacementPartners from '../components/PlacementPartners';
import SuccessStory from '../components/SuccessStory';
import { useAdmissionModal } from '../context/AdmissionModalContext';
import CreativeRevolution from '../components/CreativeRevolution';


import SEO from '../components/SEO';


gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const containerRef = useRef(null);


    const insdRef = useRef(null);
    const fifteenRef = useRef(null);
    const galleryContainerRef = useRef(null);
    const subTitleRef = useRef(null);
    const maskRef = useRef(null);
    const heroRef = useRef(null);
    const shutterRef = useRef(null);
    const marqueeRef = useRef(null);
    const studentRef = useRef(null);
    const scrollHintRef = useRef(null);
    const legacyRef = useRef(null);

    const [isMobile, setIsMobile] = React.useState(false);
    const { openAdmissionModal } = useAdmissionModal();
    const navigate = useNavigate();


    // Lenis Smooth Scroll Integration
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const lenis = new Lenis({
            duration: 1.0, // Reduced from 1.2 for faster response
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: !isMobile, // Disable smooth scroll on mobile to avoid conflicts
        });

        // Sync ScrollTrigger with Lenis
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
            window.removeEventListener('resize', checkMobile);
        };
    }, [isMobile]);

    useEffect(() => {
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 1 }); // Reduced from 3.8 for snappier feel


            // 2. Infinite Marquee Animation
            gsap.to(marqueeRef.current, {
                xPercent: -50,
                repeat: -1,
                duration: 20,
                ease: "linear",
            });

            // Subtle entrance for Creative Excellence
            gsap.from(insdRef.current, {
                opacity: 0,
                y: 10,
                duration: 1.2,
                ease: "power2.out",
                delay: 0.3
            });



            // Entrance animation for Gallery items when they come into view
            gsap.from(".gallery-item", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 1,
                scrollTrigger: {
                    trigger: galleryContainerRef.current,
                    start: "top 80%",
                }
            });

            // 3. Legacy Section - Text Reveal, Magnetic Search & Vertical Carousel
            const searchContainer = document.querySelector('.search-container');
            const carouselTrack = document.querySelector('.carousel-track');

            if (searchContainer && carouselTrack) {
                // Smart Transition: Soft Fade Up
                const content = legacyRef.current.querySelector('.legacy-content');

                // 1. Content Fades In Smoothly
                gsap.fromTo(content,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: legacyRef.current,
                            start: "top 95%",
                            end: "top 60%",
                            scrub: 0.5
                        }
                    }
                );

                // 2. High-Impact Quote Reveal
                const quotes = legacyRef.current.querySelectorAll('.legacy-quote');

                quotes.forEach((quote, i) => {
                    gsap.to(quote, {
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                        duration: 1.5,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: quote,
                            start: "top 90%",
                            end: "top 40%",
                            scrub: true,
                        }
                    });
                });




                // 4. Carousel
                gsap.to(carouselTrack, {
                    yPercent: -50,
                    duration: 30,
                    ease: "linear",
                    repeat: -1
                });
            }

            // 6. Student Spotlight - Dark Mode Transition
            gsap.fromTo(studentRef.current,
                { backgroundColor: "#ffffff", color: "#000000" },
                {
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    scrollTrigger: {
                        trigger: studentRef.current,
                        start: "top 60%",
                        end: "top 20%",
                        scrub: true,
                    }
                }
            );

            gsap.from(".spotlight-img-main", {
                scale: 1.2,
                scrollTrigger: {
                    trigger: studentRef.current,
                    start: "top bottom",
                    scrub: 1
                }
            });

            // Parallax Title
            gsap.to(".spotlight-title-1", {
                xPercent: 10,
                scrollTrigger: {
                    trigger: studentRef.current,
                    start: "top bottom",
                    scrub: 1
                }
            });

            gsap.to(".spotlight-title-2", {
                xPercent: -10,
                scrollTrigger: {
                    trigger: studentRef.current,
                    start: "top bottom",
                    scrub: 1
                }
            });

            // Chaotic Quote Reveal
            gsap.from(".quote-word", {
                scrollTrigger: {
                    trigger: ".quote-container",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                rotate: 10,
                stagger: 0.02,
                duration: 1,
                ease: "expo.out"
            });



        }, containerRef.current);

        return () => {
            ctx.revert();
        };
    }, []);

    // const galleryItems = [
    //     {
    //         title: "Industry",
    //         img: `https://ik.imagekit.io/fmldynl4j4/insd-awards/Gemini_Generated_Image_wy3si8wy3si8wy3s.png?tr=w-${isMobile ? 800 : 1800},fo-auto`,
    //         link: "/industry-potential"
    //     },
    //     {
    //         title: "INSD",
    //         img: `https://ik.imagekit.io/fmldynl4j4/insd-awards/Gemini_Generated_Image_u2ubidu2ubidu2ub.png?tr=w-${isMobile ? 800 : 1800},fo-auto`,
    //         link: "/student"
    //     },
    //     {
    //         title: "Required Professional",
    //         img: `https://ik.imagekit.io/fmldynl4j4/insd-awards/Gemini_Generated_Image_hzzhu5hzzhu5hzzh.png?tr=w-${isMobile ? 800 : 1800},fo-auto`,
    //         link: "/placement"
    //     }
    // ];




    // Helper to split text by characters
    const splitText = (text, className) => {
        return text.split("").map((char, index) => (
            <span key={index} className={`inline-block ${className}`}>
                {char === " " ? "\u00A0" : char}
            </span>
        ));
    };

    // Helper to split text by words
    const splitWords = (text, className) => {
        return text.split(" ").map((word, index) => (
            <span key={index} className={`inline-block ${className}`}>
                {word}&nbsp;
            </span>
        ));
    };

    return (
        <div ref={containerRef} className="min-h-screen text-slate-900 relative overflow-x-hidden">
            <SEO
                title="Best Design Institute for Fashion, Interior & Graphic Courses in Delhi | INSD"
                description="Best design institute in Delhi, India. Join INSD is one of the top design colleges in Delhi, NCR offers fashion, interior, textile and graphic design courses in UG and PG."
                keywords="best design institute in Delhi, skill-based design school Delhi, job-ready design institute, 100% placement design course, fashion design course in Delhi, interior design course in Delhi, graphic design course in Delhi, animation VFX course in Delhi, INSD Delhi placement"
                canonical="https://subdomain.insd.edu.in/"
                ogImage="https://ik.imagekit.io/fmldynl4j4/insd-awards/Gemini_Generated_Image_wy3si8wy3si8wy3s.png?tr=w-1200,h-630,fo-auto"
                robots="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
            />



            {/* Hero Split Section */}
            <div ref={heroRef} className="relative z-10 min-h-screen w-full flex flex-col lg:flex-row bg-white overflow-hidden pt-28 lg:pt-12 cursor-default items-center">

                {/* Left Side: Content & Headlines */}
                <div className="w-full lg:w-[55%] flex flex-col justify-center px-6 md:px-16 lg:px-24 py-8 md:py-16 space-y-6 md:space-y-8 relative z-20 text-center lg:text-left items-center lg:items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-5 flex flex-col items-center lg:items-start"
                    >

                        <div className="space-y-4">

                            <h1 className="text-clamp-3xl font-black text-slate-900 tracking-tighter leading-[0.95]">
                                20 Lakh Professionals <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-slate-400 italic text-[0.9em]">Needed by 2030.</span>
                            </h1>
                            <p className="text-clamp-lg font-bold text-slate-600 tracking-tight max-w-xl">
                                Study with INSD to start a high-impact career in Fashion, Interior, Graphic Design UI/UX, Animation & VFX, Jewellery, Textile, Photography or Make-up
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="w-full flex justify-center lg:justify-start pt-6">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => openAdmissionModal({
                                    title: 'TALK TO OUR EXPERTS',
                                    subtitle: 'Get professional guidance for your design career.',
                                    ctaText: 'Connect Now'
                                })}
                                className="w-full sm:w-auto h-12 md:h-14 px-12 md:px-16 bg-primary text-white rounded-full font-black uppercase tracking-widest text-[11px] shadow-xl flex items-center justify-center gap-3 transition-all hover:bg-slate-950"
                            >
                                TALK TO OUR EXPERTS
                                <ArrowRight size={18} />
                            </motion.button>
                        </div>

                        {/* Stats Highlights */}
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center lg:justify-start gap-y-8 gap-x-4 md:gap-6 pt-8">
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                                <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-[#db3436] to-[#134a84]">15+</span>
                                <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-slate-900 mt-1">Years Legacy</span>
                            </div>
                            <div className="w-px h-8 bg-slate-100 hidden sm:block" />
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                                <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-[#db3436] to-[#134a84]">75+</span>
                                <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-slate-900 mt-1">Centres</span>
                            </div>
                            <div className="w-px h-8 bg-slate-100 hidden sm:block" />
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                                <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-[#db3436] to-[#134a84]">30,000+</span>
                                <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-slate-900 mt-1">Students Trained</span>
                            </div>
                            <div className="w-px h-8 bg-slate-100 hidden sm:block" />
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                                <span className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-[#db3436] to-[#134a84]">18 Lakh</span>
                                <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-slate-900 mt-1">Highest Salary</span>
                            </div>
                        </div>

                        {/* Transformation Vision - Pills removed */}


                    </motion.div>
                </div>


                {/* Right Side: Visual Elements */}
                <div className="w-full lg:w-[45%] h-[50vh] lg:h-[95vh] lg:pr-12 lg:py-16 relative overflow-hidden bg-white flex flex-col justify-center">
                    <HeroSlider />

                    {/* Visual Overlay removed to let the card stand out */}
                </div>

            </div>

            <IndustryInsights />
            <ProgramGrid />


            <div className="w-full bg-white py-16 md:py-24 container-px">
                <div className="max-w-7xl mx-auto mb-16 md:mb-24">
                    <PlacementPartners />
                </div>
                {/* Monumental CTA Section */}
                <CreativeRevolution />
            </div>


            {/* <NetworkCounter /> */}
            <InsdDifference />
            <CelebritySlider />
            <SuccessStory />
            {/* <InstagramGallery /> */}


            {/* Section 2: Interactive Gallery - Now More Compact */}
            {/* <div ref={galleryContainerRef} className="relative z-10 bg-white py-12 lg:py-24 overflow-hidden pointer-events-auto">
                <div className="max-w-7xl mx-auto px-6 h-[500px] md:h-[600px] flex flex-col lg:flex-row gap-6">
                    {
                        galleryItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.link || "#"}
                                className="gallery-item relative flex-1 group transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:flex-2 cursor-pointer border border-slate-100 rounded-[2rem] overflow-hidden shadow-2xl"
                            >
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent transition-colors duration-700 pointer-events-none" />
                                </div>

                                <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 pb-12">
                                    <div className="overflow-hidden">
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary translate-y-0 group-hover:scale-105 transition-all duration-500 delay-100 uppercase tracking-tighter leading-tight">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <div className="overflow-hidden mt-4 opacity-100 transition-opacity duration-500 delay-200">
                                        <p className="text-white/80 text-[10px] md:text-xs font-black tracking-widest uppercase border-t border-primary/50 pt-4 inline-block">
                                            Explore Program
                                        </p>
                                    </div>
                                </div>

                            </Link>
                        ))
                    }
                </div>
            </div> */}

            {/* <WhyInsd /> */}
            {/* <StepLeadForm /> */}
            {/* <ProgramSearch /> */}
            {/* <NationalAwards /> */}
            {/* <AiFutureDesign /> */}
            {/* <TestimonialSlider /> */}


            {/* Student Spotlight Section - High Fashion Editorial Style */}
            {/* <div ref={studentRef} className="relative section-py container-px overflow-hidden transition-colors duration-700">
                <div className="max-w-360 mx-auto">

                    <div className="mb-16 md:mb-24 border-b border-current pb-8 md:pb-12 overflow-hidden">
                        <span className="block text-[10px] md:text-sm font-mono tracking-widest uppercase mb-4 opacity-60">Spotlight</span>
                        <h2 className="text-[12vw] md:text-[6vw] font-black uppercase tracking-tighter leading-none flex flex-col">
                            <span className="spotlight-title-1 block">Future</span>
                            <span className="spotlight-title-2 italic font-serif font-light text-secondary block self-end">Visionaries</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        <div className="lg:col-span-7 relative">
                            <div className="overflow-hidden rounded-sm aspect-3/4">
                                <img
                                    src={`https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=${isMobile ? 800 : 1260}`}
                                    alt="Future Visionaries"
                                    loading="lazy"
                                    className="spotlight-img-main w-full h-full object-cover transition-all duration-700 ease-out hover:scale-105"
                                />
                            </div>
                            
                            <div className="absolute -bottom-12 -right-12 text-[12rem] leading-none font-black text-transparent stroke-text opacity-20 select-none pointer-events-none">
                                2026
                            </div>
                        </div>

                        <div className="lg:col-span-5 flex flex-col justify-between h-full pl-0 lg:pl-8">
                            <div className="mb-12">
                                <p className="text-clamp-xl font-light leading-relaxed mb-8 opacity-80 flex flex-wrap gap-x-2 quote-container">
                                    {splitText("\"INSD gave me the freedom to fail, which is the only way to truly succeed in design. My final collection was a direct result of that chaos.\"", "quote-word")}
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-8 md:w-12 h-px bg-current"></div>
                                    <span className="uppercase tracking-widest font-bold text-[10px] md:text-sm">Aravind K., Fashion Design '25</span>
                                </div>
                            </div>

                            <div className="relative w-2/3 ml-auto mt-12 rotate-3 spotlight-img-small transition-transform duration-500">
                                <img
                                    src="https://images.pexels.com/photos/2836486/pexels-photo-2836486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    className="w-full shadow-2xl rounded-lg"
                                    alt="Process"
                                />
                                <div className="absolute -z-10 top-4 -right-4 w-full h-full border border-current opacity-30 rounded-lg"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div> */}



            {/* <FeaturedIn /> */}
            {/* <EventBlogs /> */}
            <InsdiansByDesign />
            <div className="relative z-50">
                <Footer />
            </div>
        </div>
    );
};

export default Home;
