import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ArrowUpRight, Search, Sparkles, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const coursesData = [
    {
        id: "fashion",
        title: "Fashion Design",
        category: "Fashion",
        duration: "3 Years Bachelors",
        path: "/courses/fashion-designing",
        description: "Master the art of haute couture, drape, and structural design in our state-of-the-art studios. Focus heavily on modern fabric manipulation, sustainable design strategies, and direct-to-runway seasonal collections."
    },
    {
        id: "interior",
        title: "Interior Design",
        category: "Interior",
        duration: "3 Years Bachelors",
        path: "/courses/interior-designing",
        description: "Learn to build immersive environments that blend high-performance luxury with human ergonomics. Modules strictly revolve around spatial psychology, architectural lighting, and 3D environment drafting."
    },
    {
        id: "graphic",
        title: "Graphic Design",
        category: "VFX",
        duration: "2 Years Masters",
        path: "/courses/graphic-designing",
        description: "From brand logic to motion design, define the visual language of the next digital era. Intensive focus on typography, brand identity synthesis, and algorithmic visual generation."
    },
    {
        id: "bachelors-graphic",
        title: "Bachelors in Graphic Design",
        category: "VFX",
        duration: "3 Years Bachelors",
        path: "/courses/bachelors-in-graphic-design",
        description: "Master the visual code of modern commerce. A comprehensive studio-oriented degree framework covering typography, brand engineering, package layouts, and high-performance UI/UX design."
    },
    {
        id: "adv-graphic",
        title: "Advanced Graphic Design",
        category: "VFX",
        duration: "1 Year Diploma",
        path: "/courses/diploma-in-graphic-design",
        description: "An intensive diploma designed specifically for career changers looking to enter the design industry. Master standard industry tools including the Adobe Suite, Figma, and Cinema 4D."
    },
    {
        id: "diploma-textile",
        title: "Diploma in Textile Design",
        category: "Fashion",
        duration: "1 Year Diploma",
        path: "/courses/diploma-in-textile-design",
        description: "Craft the fabrics of tomorrow. Master digital repeats, organic dyes, yarn structures, and visual strategies for premium apparel and home collections."
    },
    {
        id: "animation",
        title: "Animation & VFX",
        category: "VFX",
        duration: "6 Months",
        path: "/courses/animation-and-vfx",
        description: "Focused animation course for digital content artists and visual storytellers. Jump straight into compositing, keyframe rigging, and render pipeline management for OTT platforms."
    },
    {
        id: "luxury",
        title: "Luxury Brand Management",
        category: "Management",
        duration: "1 Year PG",
        path: "/courses/msc-luxury-brand-management",
        description: "Understand the psychology of high-end consumerism and manage global luxury conglomerates. Explore elite supply chain logistics, heritage brand marketing, and exclusive event direction."
    },
    {
        id: "jewellery",
        title: "Jewellery Design",
        category: "Fashion",
        duration: "2 Years Diploma",
        path: "/courses/jewellery-designing",
        description: "The intersection of material engineering and fine art. Craft the heirlooms of tomorrow while understanding gemology, precious metal casting, and 3D CAD modeling for rapid prototyping."
    },
    {
        id: "photo",
        title: "Photography",
        category: "VFX",
        duration: "2 Years Diploma",
        path: "/courses/photography",
        description: "From editorial high-fashion to cinematic digital storytelling, master the clinical lens. Study studio lighting, color grading theory, and high-end retouching workflows for magazine print."
    }
];

const categories = ["All", "Fashion", "Interior", "VFX", "Management"];

const MagneticButton = ({ children, className }) => {
    const buttonRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = button.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * 0.2);
            yTo(y * 0.2);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            button.removeEventListener("mousemove", handleMouseMove);
            button.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div ref={buttonRef} className={className}>
            {children}
        </div>
    );
};

const CourseCard = ({ course, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="group block w-full border border-zinc-200 bg-zinc-50 hover:bg-black rounded-xl p-8 md:p-12 transition-all duration-700 h-full flex flex-col justify-between shadow-xs hover:shadow-2xl hover:-translate-y-2"
        >
            <div>
                <div className="flex justify-between items-start mb-8">
                    <span className="px-4 py-2 rounded-full border border-zinc-300 group-hover:border-zinc-700 bg-white group-hover:bg-zinc-900 group-hover:text-white text-zinc-600 text-[10px] font-mono uppercase tracking-widest transition-colors duration-500">
                        {course.category} • {course.duration}
                    </span>
                    <div className="w-12 h-12 rounded-full border border-zinc-200 group-hover:border-zinc-700 group-hover:bg-white bg-white text-black flex items-center justify-center transition-colors duration-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-pink-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                        <ArrowUpRight size={20} className="relative z-10 group-hover:text-white transition-colors duration-500" />
                    </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-black group-hover:text-white uppercase tracking-tighter leading-[0.95] mb-6 transition-colors duration-500">
                    {course.title}
                </h3>

                <p className="text-zinc-600 group-hover:text-zinc-400 text-sm md:text-base font-light leading-relaxed mb-8 transition-colors duration-500">
                    {course.description}
                </p>
            </div>

            <Link
                to={course.path}
                className="inline-flex items-center gap-3 text-black group-hover:text-pink-500 font-bold uppercase tracking-widest text-xs transition-colors duration-500 mt-auto"
            >
                <span>Syllabus & Fees</span>
                <MoveRight size={16} className="transform group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
        </motion.div>
    );
};

const Courses = () => {
    const containerRef = useRef(null);
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Text reveal animations
        const titles = gsap.utils.toArray('.reveal-text');
        titles.forEach(title => {
            gsap.fromTo(title,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 90%",
                    }
                }
            );
        });

        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const filteredCourses = coursesData.filter(course => {
        const matchesFilter = activeFilter === "All" || course.category === activeFilter;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div ref={containerRef} className="bg-white min-h-screen text-zinc-900 font-sans selection:bg-pink-100 selection:text-pink-900">
            <SEO
                title="Academic Programs | INSD India's Skill School"
                description="Explore ultra-modern job-oriented design programs at INSD."
            />

            {/* MINIMALIST TYPOGRAPHIC HERO */}
            <section className="relative h-[80vh] flex items-center justify-center pt-24 overflow-hidden bg-zinc-50 border-b border-zinc-200">
                <div className="absolute inset-0 z-0">
                    {/* Architectural / typographic grid background hint */}
                    <div className="absolute top-0 left-1/4 w-[1px] h-full bg-zinc-200/50" />
                    <div className="absolute top-0 left-2/4 w-[1px] h-full bg-zinc-200/50" />
                    <div className="absolute top-0 left-3/4 w-[1px] h-full bg-zinc-200/50" />
                </div>

                <div className="relative z-10 w-full px-6 md:px-12 max-w-[1600px] mx-auto text-center flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <span className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-pink-600 bg-pink-50 px-6 py-2 rounded-full border border-pink-100">
                            The Design Academics
                        </span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-[12vw] md:text-[9vw] font-black uppercase leading-[0.85] tracking-tighter text-black"
                    >
                        Programs &<br />
                        <span className="text-zinc-400">Curriculum.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-12 max-w-2xl text-zinc-600 font-light text-lg md:text-xl leading-relaxed"
                    >
                        Our carefully curated degree and diploma programs focus purely on skill-extraction and industry preparation, entirely stripping away redundant theory to bring you directly to the bleeding edge of the creative market.
                    </motion.p>
                </div>
            </section>

            {/* PROGRAM PHILOSOPHY / DETAILS (WHITE THEME TYPOGRAPHY) */}
            <section className="py-24 md:py-32 px-6 bg-white relative z-10 border-b border-zinc-200">
                <div className="max-w-[1600px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                        <div className="lg:col-span-5 space-y-8">
                            <div>
                                <span className="font-mono text-xs uppercase tracking-[0.3em] text-pink-600 mb-6 block font-bold">Pedagogy Design</span>
                                <h2 className="reveal-text text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-black">
                                    Engineered <br /> for <span className="text-zinc-300">Excellence.</span>
                                </h2>
                            </div>
                            <p className="text-zinc-600 leading-relaxed text-lg font-light max-w-lg">
                                We believe in an environment entirely devoid of creative restriction. From your very first semester, you are treated not just as a student, but as an emerging design professional navigating high-stakes briefs.
                            </p>
                        </div>

                        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8 lg:mt-24">
                            <div className="border-t-2 border-black pt-6 bg-zinc-50 p-8 rounded-xl">
                                <div className="text-4xl font-black text-pink-600 mb-4 tracking-tighter">01.</div>
                                <h3 className="text-xl font-bold uppercase tracking-wider text-black mb-3">Industry-Integrated</h3>
                                <p className="text-zinc-600 font-light leading-relaxed text-sm">
                                    Our programs are designed in direct consultation with top design councils and luxury brands, ensuring you learn the exact technical workflows and aesthetics the global market demands right now.
                                </p>
                            </div>

                            <div className="border-t-2 border-zinc-300 hover:border-pink-600 pt-6 bg-zinc-50 hover:bg-pink-50 p-8 rounded-xl transition-colors duration-500">
                                <div className="text-4xl font-black text-black mb-4 tracking-tighter">02.</div>
                                <h3 className="text-xl font-bold uppercase tracking-wider text-black mb-3">Global Masterclasses</h3>
                                <p className="text-zinc-600 font-light leading-relaxed text-sm">
                                    Learn directly from practicing architects, haute couture designers, and VFX supervisors through exclusive extended weekend workshops, seminars, and intensive live-client briefs.
                                </p>
                            </div>

                            <div className="border-t-2 border-zinc-300 hover:border-pink-600 pt-6 bg-zinc-50 hover:bg-pink-50 p-8 rounded-xl transition-colors duration-500">
                                <div className="text-4xl font-black text-black mb-4 tracking-tighter">03.</div>
                                <h3 className="text-xl font-bold uppercase tracking-wider text-black mb-3">Guaranteed Placement</h3>
                                <p className="text-zinc-600 font-light leading-relaxed text-sm">
                                    We do not merely teach logic—we architect careers. Benefit from our heavily active placement cell that bridges the gap between your portfolio and leading global design agencies.
                                </p>
                            </div>

                            <div className="border-t-2 border-zinc-300 hover:border-black pt-6 bg-zinc-50 hover:bg-zinc-100 p-8 rounded-xl transition-colors duration-500">
                                <div className="text-4xl font-black text-zinc-400 mb-4 tracking-tighter">04.</div>
                                <h3 className="text-xl font-bold uppercase tracking-wider text-black mb-3">Live Projects</h3>
                                <p className="text-zinc-600 font-light leading-relaxed text-sm">
                                    Replace standard examinations with highly scrutinized jury panels evaluating real-world project outcomes, branding presentations, and spatial design maquettes.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CONTROLS (FILTER / SEARCH) */}
            <section className="sticky top-[72px] z-40 px-6 py-4 border-b border-zinc-200 bg-white/90 backdrop-blur-xl transition-all shadow-sm">
                <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2 lg:pb-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-5 py-2.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] transition-all whitespace-nowrap ${activeFilter === cat
                                    ? "bg-black text-white"
                                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-black"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:w-[350px]">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEARCH PROGRAMS..."
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-10 py-2.5 focus:border-pink-500 focus:bg-white outline-none text-black text-sm transition-all uppercase tracking-wider font-mono placeholder:text-zinc-400"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                    </div>
                </div>
            </section>

            {/* CURATED GRID */}
            <section className="py-24 px-6 bg-white relative z-10">
                <div className="max-w-[1600px] mx-auto">

                    <div className="mb-20 flex flex-col lg:flex-row gap-12 items-baseline justify-between border-b border-zinc-200 pb-12">
                        <div className="overflow-hidden">
                            <h2 className="reveal-text text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-black">
                                Select <br className="hidden md:block" />
                                <span className="text-zinc-300">Discipline</span>
                            </h2>
                        </div>
                        <div className="max-w-md text-zinc-500 font-mono text-sm tracking-wide leading-relaxed">
                            BROWSE OUR CORE PROGRAMS <br /> AND SPECIALIZED DIPLOMAS. EVERYTHING YOU NEED TO LAUNCH A CREATIVE CAREER.
                        </div>
                    </div>

                    <AnimatePresence mode="popLayout">
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                        >
                            {filteredCourses.map((course, i) => (
                                <CourseCard key={course.id} course={course} index={i} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filteredCourses.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-[30vh] flex flex-col items-center justify-center text-center space-y-6 bg-zinc-50 rounded-2xl border border-zinc-200 mt-8"
                        >
                            <Sparkles className="text-zinc-300" size={48} />
                            <p className="text-xl font-medium text-black tracking-wide">NO DISCIPLINES MATCH YOUR QUERY.</p>
                            <button
                                onClick={() => { setActiveFilter("All"); setSearchQuery(""); }}
                                className="text-pink-600 font-bold uppercase tracking-[0.2em] text-xs hover:text-black transition-colors"
                            >
                                Reset Search
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* POST-GRID CALL TO ACTION */}
            <section className="py-32 px-6 bg-black text-white relative overflow-hidden">
                <div className="max-w-[1600px] mx-auto relative z-10 flex flex-col items-center text-center">
                    <span className="font-mono text-xs uppercase tracking-[0.4em] mb-8 font-bold text-pink-500">
                        Enrollment Open
                    </span>
                    <h2 className="text-[10vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.8] mb-12">
                        Ready To <br /> Create?
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <MagneticButton>
                            <Link to="/apply" className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 hover:bg-pink-500 hover:text-white transition-all">
                                Apply Now <ArrowUpRight size={18} />
                            </Link>
                        </MagneticButton>
                    </div>
                </div>

                {/* Abstract Vector Graphic in BG */}
                <svg className="absolute -top-[20%] -right-[10%] w-[80vw] h-[80vw] text-white/[0.03] pointer-events-none rotate-12" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
                    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
                    <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" />
                </svg>
            </section>

            <Footer />
        </div>
    );
};

export default Courses;

