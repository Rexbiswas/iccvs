import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowUpRight, ChevronLeft, ChevronRight,
    PlayCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import CoFoundingVisionary from '../components/CoFoundingVisionary';


const Mentors = () => {
    const [visitingIndex, setVisitingIndex] = useState(0);



    const visitingLegends = [
        {
            name: "Sunjey Aggarwal",
            title: "Founder & Chairman, INSD",
            tags: ["Visionary Leader", "Educational Pioneer", "Chairman"],
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder/Copy%20of%20Sunjey%20sir%20.jpeg",
            desc: "The visionary behind INSD's global footprint. Sunjey has dedicated decades to revolutionizing design education in India, bridging the gap between local talent and international standards.",
            impact: "Global Design Vision"
        },
        {
            name: "Pranav Raj Aggarwal",
            title: "CEO, INSD",
            tags: ["Global Strategy", "Tech Optimist", "Executive Board"],
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder/Copy%20of%20pranav%20sir%20.jpeg",
            desc: "Driving the next wave of innovation at INSD. Pranav focuses on integrating emerging technologies and international alliances into the core curriculum for 21st-century designers.",
            impact: "Future Tech & Strategy"
        }
    ];

    const mentorData = [
        {
            name: "Chander Shekhar",
            title: "TEDizen & Design Consultant",
            tags: ["NID Alumnus", "Ex-UNICEF", "TEDizen"],
            img: "https://ik.imagekit.io/fmldynl4j4/IMG_4565.JPG.jpeg",
            desc: "A veteran in the global design landscape, Chander brings insights from his tenure at UNICEF and his experience as a TEDizen to guide the next generation of social innovators.",
            impact: "Social Impact Design"
        },
        {
            name: "Shivam Takulia",
            title: "Architect & Product Designer",
            tags: ["Co-founder EBB&FLO", "Associate - Inspatia"],
            img: "https://ik.imagekit.io/fmldynl4j4/WhatsApp%20Image%202026-04-07%20at%206.04.09%20PM.jpeg",
            desc: "Bridging the gap between architecture and product engineering. Shivam focuses on spatial fluidity and sustainable manufacturing through his ventures like EBB&FLO.",
            impact: "Sustainable Architecture"
        },
        {
            name: "Harsh Mann",
            title: "Founder & CEO, HMLC",
            tags: ["Luxury Consultant", "CEO - Harsh Mann Consultancy"],
            img: "https://media.licdn.com/dms/image/v2/D5605AQH3VHDbxoEw8w/videocover-high/B56ZZiR90cGUCU-/0/1745405603228?e=2147483647&v=beta&t=tQ-kgpgTCWJ5lrLA1LEM1zeeuVb5G2j-9R7dGJy494o",
            desc: "The authority on luxury branding and heritage ecosystems. Harsh consults for global ultra-premium brands, bringing the 'HMLC' perspective to INSD students.",
            impact: "Luxury Branding"
        },
        {
            name: "Gautam Gupta",
            title: "Co-owner, Asha Gautam",
            tags: ["Founder, Label GG", "Fashion Visionary"],
            img: "https://ik.imagekit.io/fmldynl4j4/1767808884551.jfif.jpeg?updatedAt=1776012986888",
            desc: "Redefining contemporary Indian couture. As the creative force behind Asha Gautam and Label GG, Gautam mentors students on the intersection of heritage textiles and global retail.",
            impact: "Contemporary Couture"
        },
        {
            name: "Shalini Passi",
            title: "Founder & Director, Art Foundation & MASH",
            tags: ["Art Patron", "Cultural Icon", "Art Curation"],
            img: "https://bharatflux.com/wp-content/uploads/2024/11/Shalini-passi-gorgeous-273723622-e1732275691404.jpg",
            desc: "A renowned art patron and collector, Shalini guides our students in understanding the synergy between contemporary art and modern design aesthetics.",
            impact: "Art & Design Curation"
        },
        {
            name: "Bhavana Jasra",
            title: "Principal Artist, First Impression",
            tags: ["Celebrity Artist", "Lifestyle Innovator"],
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2NSZK5f6xwgLUNi60u3KJYouxV50WkqOwvA&s",
            desc: "An artist to celebrities like the Bachchans and cricketers, Bhavana teaches the value of unique artistic entrepreneurship and emotional design branding.",
            impact: "Lifestyle Artistry"
        },
        {
            name: "Rishab Suresh",
            title: "Ex-Country Manager, Vacheron Constantin",
            tags: ["Luxury Veteran", "Brand Strategist"],
            img: "https://images.yourstory.com/cs/images/people/031-1601553383456.jpg?format=auto&w=1920&q=75",
            desc: "With a legacy at one of the world's most prestigious horology brands, Rishab offers a deep dive into the world of ultra-luxury retail and strategic brand management.",
            impact: "Luxury Management"
        },
        {
            name: "Sneha Manant",
            title: "Advertising Director, Media Sales Corp",
            tags: ["Media Strategist", "Brand Integration"],
            img: "https://media.licdn.com/dms/image/v2/D4D03AQHSTlyDPQ082Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1685450598024?e=2147483647&v=beta&t=m0tmQmyjFIrAdtUAsgYFKwNFu3Kc_yw9ACGKF05V13I",
            desc: "A powerhouse in media sales and corporate advertising, Sneha mentors on high-impact brand visibility and the mechanics of large-scale media operations.",
            impact: "Media Advertising"
        },
        {
            name: "Raahul Kapoor",
            title: "Founder, Only Luxury Consultancy",
            tags: ["Monaco Strategy", "Luxury Consultant"],
            img: "https://ik.imagekit.io/fmldynl4j4/717f361f-1c90-4a92-8596-54c1c3aeebae.jfif",
            desc: "Based between Monaco and India, Raahul provides a global perspective on luxury consulting, identifying trends for ultra-high-net-worth audiences.",
            impact: "Global Luxury Strategy"
        },
        {
            name: "Neha Lulla",
            title: "Couture Jewellery Designer",
            tags: ["Jewellery Icon", "Craftsmanship Expert"],
            img: "https://media.licdn.com/dms/image/v2/D4D03AQF2OuzGNLanNQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1707443828473?e=2147483647&v=beta&t=vCj6oKWYpBt-NW0XhGWdLS_YuOJlbKyoVJ0Um9Nup8o",
            desc: "Consistently dressing Bollywood icons, Neha mentors students on the intersection of heritage craftsmanship and the modern global jewellery market.",
            impact: "Jewellery Design"
        },
        {
            name: "Yogesh Chaudhary",
            title: "Director, Jaipur Rugs",
            tags: ["Design for Good", "Global Retail"],
            img: "https://static.fibre2fashion.com/InterviewResources/UserImages/4294/headshot.jpg",
            desc: "Exporting handmade luxury to over 60 countries, Yogesh shares his expertise on social entrepreneurship and the scaling of traditional craft for global home decor.",
            impact: "Sustainable Retail"
        },
        {
            name: "Biren Vaidya",
            title: "MD, Rose Group",
            tags: ["Horology Icon", "Retail Visionary"],
            img: "https://coralesque.com/wp-content/uploads/2011/12/biren-vaidya-1-1-2093531493-e1713174511656.jpg",
            desc: "A leader in India's luxury landscape, Biren guides students on the business of prestige, focusing on the retail operations of high-end watches and jewelry.",
            impact: "Retail Excellence"
        }
    ];



    const handleVisitingNext = () => setVisitingIndex((prev) => (prev + 1) % visitingLegends.length);
    const handleVisitingPrev = () => setVisitingIndex((prev) => (prev - 1 + visitingLegends.length) % visitingLegends.length);

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-slate-900 selection:text-white overflow-x-hidden">
            <SEO
                title="Industry Mentors | The Visionaries of INSD"
                description="Learn from the legends. INSD's mentor network includes NID alumni, luxury consultants, and award-winning architects who guide our students."
            />

            {/* --- HERO SECTION --- */}
            <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24 flex flex-col items-center">
                <div className="max-w-7xl w-full">
                    <div className="text-center space-y-8 mb-24">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-50 border border-slate-200 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-primary"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Masterclass Series 2026
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.8] text-slate-900"
                        >
                            THE <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">MENTORS.</span>
                        </motion.h1>

                        <p className="text-slate-500 max-w-xl mx-auto text-lg font-medium tracking-tight">
                            Guided by the most influential voices in architecture, luxury, and social design. Your creative journey starts with their experience.
                        </p>
                    </div>

                    {/* --- OUR FOUNDERS SLIDER --- */}
                    <div className="mt-8 space-y-16">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tightest">Our <span className="text-primary italic">Founders.</span></h2>
                            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">INSD Leadership & Visionary Pioneers</p>
                        </div>

                        <div className="relative max-w-6xl mx-auto">
                            <div className="relative h-auto min-h-[600px] md:h-[650px] w-full rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] bg-slate-950 flex flex-col lg:flex-row group/visiting">

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={visitingIndex}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        className="flex flex-col lg:flex-row w-full h-full"
                                    >
                                        {/* Right: Legend Image (Flipped layout for variety) */}
                                        <div className="w-full lg:w-1/2 h-[400px] lg:h-full relative order-1 lg:order-2">
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950 z-10" />
                                            <img
                                                src={visitingLegends[visitingIndex].img}
                                                alt={visitingLegends[visitingIndex].name}
                                                className="w-full h-full object-cover transition-all duration-700"
                                            />

                                            <div className="absolute top-10 right-10 z-20 flex gap-4">
                                                <button
                                                    onClick={handleVisitingPrev}
                                                    className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all border border-white/20"
                                                >
                                                    <ChevronLeft size={24} />
                                                </button>
                                                <button
                                                    onClick={handleVisitingNext}
                                                    className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all shadow-xl"
                                                >
                                                    <ChevronRight size={24} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Left: Legend Content */}
                                        <div className="w-full lg:w-1/2 p-10 md:p-16 lg:p-20 flex flex-col justify-center order-2 lg:order-1 text-white">
                                            <div className="space-y-8">
                                                <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                                                    International Faculty
                                                </div>

                                                <div className="space-y-2">
                                                    <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                                                        {visitingLegends[visitingIndex].name}
                                                    </h3>
                                                    <p className="text-white/40 font-bold uppercase text-xs tracking-widest">{visitingLegends[visitingIndex].title}</p>
                                                </div>

                                                <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed border-l-2 border-primary/40 pl-8">
                                                    {visitingLegends[visitingIndex].desc}
                                                </p>

                                                <div className="flex flex-wrap gap-2">
                                                    {visitingLegends[visitingIndex].tags.map((tag, i) => (
                                                        <span key={i} className="text-[9px] font-black uppercase tracking-widest text-primary/80 bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Legend Progress */}
                                <div className="absolute bottom-10 left-1/2 lg:left-[25%] -translate-x-1/2 flex items-center gap-1.5 z-40 bg-white/5 backdrop-blur-md p-2 rounded-full border border-white/10">
                                    {visitingLegends.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setVisitingIndex(i)}
                                            className={`h-1.5 rounded-full transition-all duration-500 ${visitingIndex === i ? 'w-8 bg-primary' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- INDUSTRY MENTOR GRID --- */}
                    <div className="mt-48 space-y-16">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tightest">Industry <span className="text-primary italic"> Mentors.</span></h2>
                            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Corporate Leaders & Design Consultants</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {mentorData.map((mentor, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-primary/20 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] flex flex-col h-full"
                                >
                                    {/* Image Section */}
                                    <div className="relative aspect-[4/5] overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 z-10" />
                                        <img
                                            src={mentor.img}
                                            alt={mentor.name}
                                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                                        />
                                        <div className="absolute bottom-6 left-6 z-20">
                                            <h3 className="text-white font-black text-2xl uppercase tracking-tighter leading-none">
                                                {mentor.name}
                                            </h3>
                                            <p className="text-primary font-black text-[10px] uppercase tracking-widest mt-1">{mentor.impact}</p>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {mentor.tags.map((tag, tIdx) => (
                                                <span key={tIdx} className="px-3 py-1 border border-slate-100 rounded-full text-[8px] font-black uppercase tracking-widest text-slate-400">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <h4 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-4 leading-tight">
                                            {mentor.title}
                                        </h4>

                                        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 flex-1">
                                            {mentor.desc}
                                        </p>

                                        <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Industry Leader</span>
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all">
                                                <ArrowUpRight size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* --- GLOBAL STANDARDS STRIP --- */}
                    <div className="mt-32 py-20 border-y border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                        <div className="space-y-4 text-center md:text-left">
                            <span className="text-primary font-black text-4xl italic">01.</span>
                            <h4 className="text-2xl font-black uppercase tracking-tightest text-slate-900">Industry <br /> Learning</h4>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-loose">Curriculum engineered by the masters of the craft.</p>
                        </div>
                        <div className="space-y-4 text-center md:text-left">
                            <span className="text-primary font-black text-4xl italic">02.</span>
                            <h4 className="text-2xl font-black uppercase tracking-tightest text-slate-900">Industry <br /> Practices</h4>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-loose">Real-world protocols from luxury houses & design firms.</p>
                        </div>
                        <div className="space-y-4 text-center md:text-left">
                            <span className="text-primary font-black text-4xl italic">03.</span>
                            <h4 className="text-2xl font-black uppercase tracking-tightest text-slate-900">Global <br /> Placement</h4>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-loose">Direct pathways to international design conglomerates.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CO-FOUNDER TRIBUTE SECTION --- */}
            <CoFoundingVisionary />

            {/* --- BOTTOM COLLABORATION STRIP --- */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-white flex flex-col items-center">
                <div className="max-w-7xl w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                        <div className="space-y-4">
                            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-slate-300">Industry Connection</h4>
                            <p className="text-slate-900 text-lg leading-tight font-black uppercase tracking-tighter">
                                Interact with the architects of the industry daily.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-slate-300">Join the Protocol</h4>
                            <p className="text-slate-900 text-lg leading-tight font-black uppercase tracking-tighter">
                                Learn from the visionaries of tomorrow.
                            </p>
                        </div>
                        <div className="flex md:justify-end gap-6">
                            <Link to="/course-apply-now" className="px-12 py-5 bg-primary text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-slate-900 transition-all shadow-2xl active:scale-95">
                                APPLY FOR 2026
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Mentors;
