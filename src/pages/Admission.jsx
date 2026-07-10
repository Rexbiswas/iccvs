import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLenisSmoothScroll from '../hooks/useLenisSmoothScroll';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRegisterModal } from '../context/RegisterModalContext';
import AdmissionForm from '../components/AdmissionForm';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const Admission = () => {
    const { openModal } = useRegisterModal();
    const containerRef = useRef(null);
    const apertureRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // Lenis Smooth Scroll (optimized for Safari/Chrome)
    useLenisSmoothScroll({ lerp: 0.08 });

    // GSAP Aperture Logic
    useEffect(() => {
        let ctx = gsap.context(() => {
            // Aperture Expanding Circle
            gsap.to(".aperture-mask", {
                width: "300vmax",
                height: "300vmax",
                duration: 2,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: apertureRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                    pin: true,
                }
            });

            // Title Reveal within Aperture
            gsap.from(".aperture-title", {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: apertureRef.current,
                    start: "top 40%",
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const sections = [
        { title: "Design Tech", img: `https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=${isMobile ? 800 : 1200}`, hex: "var(--color-primary)" },
        { title: "Visual Arts", img: `https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=${isMobile ? 800 : 1200}`, hex: "var(--color-secondary)" },
        { title: "Luxury Fashion", img: `https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=${isMobile ? 800 : 1200}`, hex: "var(--color-primary)" }
    ];


    return (
        <div ref={containerRef} className="bg-[#f3f3f3] text-slate-900 selection:bg-primary font-sans overflow-hidden border-y border-slate-300">
            <SEO
                title="Design Admissions 2026 India | Apply for Fashion & Interior - ICCVS"
                description="Secure your seat at ICCVS, India's top-rated design school. Admissions open for 2026 Batch in Fashion, Interior, Graphic, and Animation. Apply online and launch your creative career."
                keywords="design admissions 2026, design school admission Delhi, apply for fashion design India, NIFT alternative, design course application, creative education 2026, design entrance exams India"
            />

            <FinalCTA />
            {/* 1. THE APERTURE HERO */}

            <div className="py-24 px-6 md:px-12 bg-[#f3f3f3] border-b border-slate-300">
                <AdmissionForm />
            </div>            

            <Footer />
        </div>
    );
};

export default Admission;
