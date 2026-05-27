import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Award, 
    Briefcase, 
    Users, 
    TrendingUp, 
    BadgeCheck, 
    Globe, 
    ArrowRight,
    Star,
    CheckCircle2,
    Building2,
    GraduationCap,
    MessageSquare,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';
import { useAdmissionModal } from '../context/AdmissionModalContext';

const recentHiresData = [
    {
        name: "Ankit Khera",
        course: "Fashion Design",
        brand: "Jigar Mali",
        loc: "Chhatarpur",
        quote: "INSD helped me move from basic sketches to a strong portfolio and a full-time job as a Fashion Designer. The shows, juries and software training made interviews feel easy.",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260527T072542Z-3-001/Untitled%20folder/Copy%20of%20Ankit%20Khera.jpeg"
    },
    {
        name: "Sanchita Pal",
        course: "Graphic Design",
        brand: "Freelance Designer",
        loc: "",
        quote: "I started taking small freelance graphic design projects in my second year. The feedback on my portfolio and support from faculty gave me the confidence to charge for my skills.",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260527T072542Z-3-001/Untitled%20folder/Copy%20of%20Sanchita%20Pal.jfif"
    },
    {
        name: "Sameer Siddiqui",
        course: "Jewellery Design",
        brand: "Gold mark",
        loc: "",
        quote: "The hands-on training in jewellery design and the exposure to industry techniques helped me build strong technical skills. The portfolio development sessions and mentor guidance played a key role in helping me secure a position with a reputed jewellery brand.",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260527T072542Z-3-001/Untitled%20folder/Copy%20of%20Sameer%20Siddiqui.jpeg"
    },
    {
        name: "Nitika Gautam",
        course: "Interior Design",
        brand: "Virgo Clothing Culture",
        loc: "Gurgaon",
        quote: "The placement cell connected me with a top interior design firm in Gurgaon. My 3D visualisation skills and studio projects made me job-ready from day one.",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260527T072542Z-3-001/Untitled%20folder/Copy%20of%20Nitika%20Gautam%20.jpeg"
    },
    {
        name: "Sanskriti Jha",
        course: "Graphic Design",
        brand: "Government of India",
        loc: "",
        quote: "Learning design software alongside creative concepts made a big difference for me. I was able to confidently apply for jobs because I had practical skills that companies were looking for.",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260527T072542Z-3-001/Untitled%20folder/Copy%20of%20Sanskriti%20Jha%20-%20Testimonial%205%20.jpg"
    },
    {
        name: "Preeti Jangra",
        course: "Fashion Design",
        brand: "Shiva Arjun Ent.",
        loc: "Mumbai",
        quote: "The exposure through workshops, industry visits, and live projects helped me understand how the design industry really works. By the time I graduated, I already had a strong portfolio and internship experience.",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260527T072542Z-3-001/Untitled%20folder/Copy%20of%20Preeti%20Jangra.png"
    },
    {
        name: "Kajalpriya",
        course: "Interior Design",
        brand: "Aman Export Int.",
        loc: "",
        quote: "The faculty at INSD constantly pushed us to think creatively and present our ideas professionally. The portfolio reviews and jury feedback prepared me extremely well for client presentations.",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260527T072542Z-3-001/Untitled%20folder/Copy%20of%20Kajalpriya.jpeg"
    },
    {
        name: "Muskan Singh",
        course: "Fashion Design",
        brand: "Pluch Designs",
        loc: "Gurugram",
        quote: "My time at INSD helped me discover my unique design style. The guidance from mentors and the opportunity to showcase my work in exhibitions boosted my confidence as a designer.",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260527T072542Z-3-001/Untitled%20folder/Copy%20of%20Muskan%20Singh%20.jpeg"
    },
    {
        name: "Anshuman Deb",
        course: "Interiors Design",
        brand: "The Design Atelier",
        loc: "",
        quote: "The course structure balanced creativity with business understanding. I learned how to design, present, and market my work, which helped me start taking independent projects.",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260527T072542Z-3-001/Untitled%20folder/Copy%20of%20Anshuman%20deb.jpeg"
    },
    {
        name: "Rahul Yadav",
        course: "Interior Design",
        brand: "Wriver",
        loc: "",
        quote: "The studio-based learning and practical assignments helped me build a strong design foundation. I felt prepared to handle real client requirements right after completing my course.",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260527T072542Z-3-001/Untitled%20folder/Copy%20of%20Rahul%20Yadav.jpeg"
    },
    {
        name: "Himani",
        course: "Fashion Design",
        brand: "Virgo Clothing Culture",
        loc: "",
        quote: "From mood boards to final collections, every project helped me improve my design thinking. The constant mentoring helped me refine my portfolio for placements.",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260527T072542Z-3-001/Untitled%20folder/Copy%20of%20Himani.jpeg"
    },
    {
        name: "Shreya Sinha",
        course: "Graphic Design",
        brand: "TO THE NEW Pvt Ltd",
        loc: "",
        quote: "INSD gave me the platform to experiment with different styles and techniques. The guidance from experienced faculty helped me turn my passion for design into a professional career.",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260527T072542Z-3-001/Untitled%20folder/Copy%20of%20Shreya%20Sinha.jfif"
    },
    {
        name: "Chitra",
        course: "Interior Design",
        brand: "Casamink",
        loc: "",
        quote: "The practical approach to learning at INSD helped me understand design beyond theory. Working on live projects gave me real industry exposure and confidence.",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260527T072542Z-3-001/Untitled%20folder/Copy%20of%20Chitra%20.jpeg"
    },
    {
        name: "Abhinav Rajput",
        course: "Graphic Design",
        brand: "Magiccircle Comm.",
        loc: "",
        quote: "INSD gave me the right platform to explore my creativity. The continuous feedback from faculty helped me improve my work and build a strong portfolio.",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260527T072542Z-3-001/Untitled%20folder/Copy%20of%20Abhinav%20Rajput.jfif"
    },
    {
        name: "Tamanna Das",
        course: "Fashion Design",
        brand: "Sahil Kocchar",
        loc: "Noida",
        quote: "The fashion shows and jury evaluations pushed me to perform better with every project. It really prepared me for the competitive industry outside.",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260527T072542Z-3-001/Untitled%20folder/Copy%20of%20Tamanna%20Das.jpeg"
    },
    {
        name: "Sarabjeet",
        course: "Interior Design",
        brand: "Height Buildcon South",
        loc: "",
        quote: "I learned how to convert ideas into practical designs through hands-on training. The software skills I gained helped me secure my first job quickly.",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260527T072542Z-3-001/Untitled%20folder/Copy%20of%20Sarabjeet.jpeg"
    },
    {
        name: "Nimit Lakhanpal",
        course: "Graphic Design",
        brand: "GMS Group",
        loc: "",
        quote: "The faculty support at INSD was incredible. They guided me at every step, from concept development to final portfolio presentation.",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260527T072542Z-3-001/Untitled%20folder/Copy%20of%20Nimit%20Lakhanpal.jfif"
    },
    {
        name: "Nausheena Naaz",
        course: "Fashion Design",
        brand: "Freelance Stylist",
        loc: "",
        quote: "The exposure to different design fields helped me discover my strengths. By the end of the course, I had clarity on my career path.",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260527T072542Z-3-001/Untitled%20folder/Copy%20of%20Nausheena%20Naaz.jpeg"
    },
    {
        name: "Tamanna Dua",
        course: "Interior Design",
        brand: "Portray Interior",
        loc: "Abu Dhabi",
        quote: "INSD helped me build both creative and professional skills. The portfolio preparation and mock interviews made a huge difference during placements.",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260527T072542Z-3-001/Untitled%20folder/Copy%20of%20Tamanna%20Dua%20.jpeg"
    },
    {
        name: "Vandana",
        course: "Interior Design",
        brand: "Dazor Constructions",
        loc: "",
        quote: "Workshops and industry interactions gave me insights into real-world design practices. It helped me stay ahead and be job-ready.",
        img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260527T072542Z-3-001/Untitled%20folder/Copy%20of%20Vandana%20.jpeg"
    }
];


const PlacementAndTraining = () => {
    const { openAdmissionModal } = useAdmissionModal();
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerPage(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(3);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = Math.ceil(recentHiresData.length / itemsPerPage);

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const currentHires = recentHiresData.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );
    return (
        <div className="bg-white min-h-screen font-sans selection:bg-primary selection:text-white">
            <SEO 
                title="Placement & Training Partners | INSD"
                description="Explore INSD's vast corporate network and placement records. We provide comprehensive training to ensure our students are industry-ready for top design houses and global brands."
            />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-48 px-6 md:px-12 lg:px-24 overflow-hidden bg-slate-50">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="w-full lg:w-2/3 space-y-8 text-center lg:text-left mx-auto lg:mx-0">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="space-y-4"
                            >
                                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-primary/10">
                                    Placement & Training
                                </span>
                                <h1 className="text-5xl md:text-[6.5rem] font-black text-slate-900 uppercase tracking-tighter leading-[0.85]">
                                    Crafting <br />
                                    <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Careers</span>
                                </h1>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-xl text-slate-600 font-bold max-w-2xl leading-relaxed uppercase tracking-tight"
                            >
                                More than just a portfolio. We build professional identities. Connecting INSD talent with the world's most prestigious design houses.
                            </motion.p>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-4"
                            >
                                <button 
                                    onClick={() => openAdmissionModal({ 
                                        title: 'Download Placement Report', 
                                        subtitle: 'Please fill in your details to receive our latest placement audit and report.',
                                        successMsg: 'Your request has been received! The placement report will be sent to your email shortly.'
                                    })}
                                    className="h-16 md:h-20 px-12 bg-slate-900 text-white rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-primary transition-all transform hover:scale-105 shadow-2xl shadow-slate-900/10 flex items-center justify-center"
                                >
                                    Download Placement Report
                                </button>
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-4">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-slate-200">
                                                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Student" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-slate-900 font-black text-xs leading-none">10K+ PLACEMENTS</p>
                                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Global Network</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="w-full lg:w-1/3">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                className="relative p-12 bg-white rounded-[3.5rem] border border-slate-100 shadow-3xl text-center space-y-8 overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-primary mb-2">
                                        <Building2 size={40} />
                                    </div>
                                    <h4 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">300+</h4>
                                    <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em]">Hiring Partners</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 bg-slate-50 rounded-3xl">
                                        <p className="text-2xl font-black text-slate-900 tracking-tight">18 LPA</p>
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Highest Package 2025</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-3xl">
                                        <p className="text-2xl font-black text-slate-900 tracking-tight">98%</p>
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Placement Record</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- TRAINING ECOSYSTEM --- */}
            <section className="py-32 px-6 md:px-12 lg:px-24 bg-white">
                <div className="max-w-7xl mx-auto space-y-24">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                        <div className="space-y-6 max-w-2xl text-center md:text-left mx-auto md:mx-0">
                            <span className="text-primary font-black uppercase text-[10px] tracking-[0.4em]">The INSD Advantage</span>
                            <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                                Career <span className="text-slate-300 text-[10px]">Readiness</span> <br /> Blueprint
                            </h2>
                        </div>
                        <p className="text-slate-500 font-bold text-sm uppercase tracking-tight max-w-md text-center md:text-right">
                            We don't just provide job leads. We train you through every stage—from portfolio building to professional industry preparation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { 
                                title: "Build Your Portfolio", 
                                icon: BadgeCheck, 
                                desc: "Rigorous auditing of your academic body of work to align with global creative agency standards." 
                            },
                            { 
                                title: "Get Industry Ready", 
                                icon: Users, 
                                desc: "Personal branding, soft skills, and leadership communication training for high-value client interaction." 
                            },
                            { 
                                title: "Prepare for Interviews", 
                                icon: MessageSquare, 
                                desc: "Realistic mock interview panels with industry experts to refine your storytelling and expertise." 
                            }
                        ].map((item, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 hover:bg-slate-900 group transition-all duration-500"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm border border-slate-100 mb-8">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 group-hover:text-white uppercase tracking-tighter mb-4 transition-colors">{item.title}</h3>
                                <p className="text-slate-500 group-hover:text-slate-400 font-bold text-xs uppercase tracking-widest leading-relaxed transition-colors">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* --- PLACEMENT SPOTLIGHT --- */}
            <section className="py-32 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="space-y-4 text-center md:text-left">
                            <span className="text-primary font-black uppercase text-[10px] tracking-[0.4em]">success spotlight</span>
                            <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                                Recent <span className="text-slate-300">Hires</span>
                            </h2>
                            <p className="text-slate-500 font-bold text-sm uppercase tracking-tight max-w-md mt-4">
                                Every story is different. The common link is simple – skills, portfolios and the confidence to enter the industry.
                            </p>
                        </div>
                        <button 
                            onClick={() => openAdmissionModal({
                                title: 'View All success stories',
                                subtitle: 'Get inspired by the journeys of our top achievers.',
                                ctaText: 'View Stories'
                            })}
                            className="h-16 md:h-20 px-10 border border-slate-200 text-slate-900 rounded-full font-black uppercase text-xs tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center"
                        >
                            Browse All success stories
                        </button>
                    </div>

                    <div className="relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            <AnimatePresence mode="popLayout">
                                {currentHires.map((hire, idx) => (
                                    <motion.div 
                                        key={`${currentPage}-${idx}`}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.1 }}
                                        className="group relative flex flex-col bg-slate-50 rounded-[3rem] p-4 md:p-6 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500"
                                    >
                                        <div className="relative aspect-square w-full rounded-[2.5rem] overflow-hidden mb-6">
                                            <img src={hire.img} alt={hire.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                                            <div className="absolute bottom-6 left-6 p-2 space-y-1">
                                                <p className="text-primary font-black text-[10px] tracking-widest uppercase">{hire.brand}</p>
                                                <p className="text-white text-3xl font-black tracking-tighter uppercase leading-none">{hire.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between px-2">
                                            <div className="relative mb-8">
                                                <span className="text-5xl text-slate-200 absolute -top-4 -left-2 font-serif">"</span>
                                                <p className="text-slate-600 font-medium text-sm leading-relaxed relative z-10 pl-4 italic">
                                                    {hire.quote}
                                                </p>
                                            </div>
                                            <div className="border-t border-slate-200 pt-4 flex items-center justify-between mt-auto">
                                                <div>
                                                    <p className="text-slate-900 font-black text-sm uppercase tracking-tighter leading-tight">{hire.course}</p>
                                                    {hire.loc && <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">{hire.loc}</p>}
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                                    <ArrowRight size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        
                        {/* Pagination Controls */}
                        <div className="flex justify-center items-center gap-6 mt-16">
                            <button 
                                onClick={prevPage}
                                className="w-14 h-14 rounded-full border border-slate-200 text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 flex items-center justify-center transition-all"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <div className="flex items-center gap-3">
                                {[...Array(totalPages)].map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentPage(idx)}
                                        className={`h-2 rounded-full transition-all duration-300 ${currentPage === idx ? 'w-8 bg-primary' : 'w-2 bg-slate-200 hover:bg-slate-300'}`}
                                    />
                                ))}
                            </div>
                            <button 
                                onClick={nextPage}
                                className="w-14 h-14 rounded-full border border-slate-200 text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 flex items-center justify-center transition-all"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="py-32 px-6 md:px-12 lg:px-24 bg-slate-900 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[200px] rounded-full" />
                 
                 <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
                     <div className="inline-block p-4 rounded-full bg-white/5 border border-white/10 mb-4 animate-bounce">
                         <Star size={40} className="text-primary fill-primary" />
                     </div>
                     <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]">
                         Your Career <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Begins Here</span>
                     </h2>
                     <p className="text-slate-400 font-bold text-lg md:text-2xl max-w-3xl mx-auto uppercase tracking-tight leading-relaxed">
                         Don't just dream about the industry. Become part of it. Join the INSD talent pool and let your professional journey take flight.
                     </p>
                     <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
                         <button 
                            onClick={() => openAdmissionModal({
                                title: 'Connect with Placement Head',
                                subtitle: 'Get personalized career guidance from our industry experts.',
                                ctaText: 'Request Meeting'
                            })}
                            className="h-16 md:h-20 px-12 bg-primary text-white rounded-full font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-secondary transition-all transform hover:scale-105 flex items-center justify-center"
                         >
                             Connect with Placement Head
                         </button>
                         <button 
                            onClick={() => openAdmissionModal({
                                title: 'View Career Guide',
                                subtitle: 'Download our comprehensive 2026 design career roadmap.',
                                ctaText: 'Download Guide'
                            })}
                            className="h-16 md:h-20 px-12 border border-white/20 text-white rounded-full font-black uppercase text-xs tracking-widest hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center"
                         >
                             View Career Guide
                         </button>
                     </div>
                 </div>
            </section>

            <Footer />
        </div>
    );
};

export default PlacementAndTraining;
