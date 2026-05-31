import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { ArrowRight, User, Briefcase, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const TransformationCard = ({ student, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: index * 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-[0_4px_24px_-1px_rgba(0,0,0,0.02)] hover:shadow-[0_80px_100px_-20px_rgba(0,0,0,0.12)] transition-all duration-1000"
        >
            {/* Single Image View */}
            <div className="relative h-[180px] md:h-[200px] overflow-hidden group">
                <img
                    src={student.img}
                    alt={student.name}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-8 right-8 z-10">
                    <span className="px-4 py-2 rounded-full bg-primary backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white border border-primary/20">
                        INSD Graduate
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 md:p-5 relative">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="text-[7px] font-black uppercase tracking-widest text-primary bg-primary/5 px-1.5 py-0.5 rounded">INSD Alumni</span>
                            <span className="text-[7px] font-bold text-slate-400">Class of 2024</span>
                        </div>
                        <h4 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">
                            {student.name}
                        </h4>
                        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                            {student.discipline} • {student.program}
                        </p>
                    </div>
                </div>

                <div className="space-y-3 mb-4">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:border-primary/20 transition-colors duration-500">
                        <p className="text-slate-600 text-[10px] md:text-xs font-medium leading-snug italic relative">
                            <span className="text-primary text-xl font-serif absolute -top-1 -left-1 opacity-20">"</span>
                            {student.quote}
                            <span className="text-primary text-xl font-serif absolute -bottom-4 right-0 opacity-20">"</span>
                        </p>
                    </div>
                </div>

                {/* Placement Branding */}
                <div className="pt-4 border-t border-slate-100 flex flex-col xl:flex-row items-start xl:items-center gap-3 justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${index + i + 10}`} alt="avatar" />
                                </div>
                            ))}
                        </div>
                        <div>
                            <p className="text-[6px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Hired By Giant</p>
                            <p className="font-black text-sm md:text-base text-slate-900 tracking-tighter uppercase leading-none">{student.placement}</p>
                        </div>
                    </div>

                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-md group/btn hover:bg-primary transition-all duration-500">
                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-900 group-hover/btn:text-white">Portfolio</span>
                        <ArrowRight size={10} className="text-slate-400 group-hover/btn:text-white transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const MetricCounter = ({ value, suffix, label, delay }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView && typeof value === 'number') {
            const controls = animate(0, value, {
                duration: 2,
                delay: delay,
                ease: "easeOut",
                onUpdate: (value) => setCount(Math.floor(value))
            });
            return () => controls.stop();
        }
    }, [isInView, value, delay]);

    return (
        <div ref={ref} className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2 leading-none">
                {typeof value === 'number' ? `${count}${suffix}` : value}
            </div>
            <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{label}</div>
        </div>
    );
};

const StudentTransformation = () => {
    const sectionRef = useRef(null);

    const students = [
        {
            name: "Ankit Khera",
            discipline: "Fashion Design",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260526T180408Z-3-001/Untitled%20folder/Copy%20of%20Ankit%20Khera.jpeg",
            quote: "INSD helped me move from basic sketches to a strong portfolio and a full-time job as a Fashion Designer. The shows, juries and software training made interviews feel easy.",
            placement: "Jigar Mali, Chhatarpur"
        },
        {
            name: "Sanchita Pal",
            discipline: "Graphic Design",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260526T180408Z-3-001/Untitled%20folder/Copy%20of%20Sanchita%20Pal.jfif",
            quote: "I started taking small freelance graphic design projects in my second year. The feedback on my portfolio and support from faculty gave me the confidence to charge for my skills.",
            placement: "Freelance Designer"
        },
        {
            name: "Sameer Siddiqui",
            discipline: "Jewellery Design",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260526T180408Z-3-001/Untitled%20folder/Copy%20of%20Sameer%20Siddiqui.jpeg",
            quote: "The hands-on training in jewellery design and the exposure to industry techniques helped me build strong technical skills. The portfolio development sessions played a key role.",
            placement: "Gold Mark"
        },
        {
            name: "Nitika Gautam",
            discipline: "Interior Design",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260526T180408Z-3-001/Untitled%20folder/Copy%20of%20Nitika%20Gautam%20.jpeg",
            quote: "The placement cell connected me with a top interior design firm in Gurgaon. My 3D visualisation skills and studio projects made me job-ready from day one.",
            placement: "Virgo Clothing Culture Private"
        },
        {
            name: "Sanskriti Jha",
            discipline: "Graphic Design",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260526T180408Z-3-001/Untitled%20folder/Copy%20of%20Sanskriti%20Jha%20-%20Testimonial%205%20.jpg",
            quote: "Learning design software alongside creative concepts made a big difference for me. I was able to confidently apply for jobs because I had practical skills.",
            placement: "Government of India"
        },
        {
            name: "Preeti Jangra",
            discipline: "Fashion Design",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260526T180408Z-3-001/Untitled%20folder/Copy%20of%20Preeti%20Jangra.png",
            quote: "The exposure through workshops, industry visits, and live projects helped me understand how the design industry really works.",
            placement: "Shiva Arjun Entertainment House (Mumbai)"
        },
        {
            name: "Kajalpriya",
            discipline: "Interior Design",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260526T180408Z-3-001/Untitled%20folder/Copy%20of%20Kajalpriya.jpeg",
            quote: "The faculty at INSD constantly pushed us to think creatively and present our ideas professionally. The portfolio reviews prepared me well.",
            placement: "Aman Export International"
        },
        {
            name: "Muskan Singh",
            discipline: "Fashion Design",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260526T180408Z-3-001/Untitled%20folder/Copy%20of%20Muskan%20Singh%20.jpeg",
            quote: "My time at INSD helped me discover my unique design style. The guidance from mentors and showcasing my work boosted my confidence.",
            placement: "Pluch Designs, Gurugram"
        },
        {
            name: "Anshuman Deb",
            discipline: "Interior Design",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260526T180408Z-3-001/Untitled%20folder/Copy%20of%20Anshuman%20deb.jpeg",
            quote: "The course structure balanced creativity with business understanding. I learned how to design, present, and market my work.",
            placement: "The Design Atelier"
        },
        {
            name: "Rahul Yadav",
            discipline: "Interior Design",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260526T180408Z-3-001/Untitled%20folder/Copy%20of%20Rahul%20Yadav.jpeg",
            quote: "The studio-based learning and practical assignments helped me build a strong design foundation. I felt prepared for real client requirements.",
            placement: "Wriver"
        },
        {
            name: "Himani",
            discipline: "Fashion Design",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260526T180408Z-3-001/Untitled%20folder/Copy%20of%20Himani.jpeg",
            quote: "From mood boards to final collections, every project helped me improve my design thinking. The constant mentoring helped me refine my portfolio.",
            placement: "Virgo Clothing Culture Private"
        },
        {
            name: "Shreya Sinha",
            discipline: "Graphic Design",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260526T180408Z-3-001/Untitled%20folder/Copy%20of%20Shreya%20Sinha.jfif",
            quote: "INSD gave me the platform to experiment with different styles and techniques. The guidance helped me turn my passion into a career.",
            placement: "TO THE NEW Pvt Ltd"
        },
        {
            name: "Chitra",
            discipline: "Interior Design",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260526T180408Z-3-001/Untitled%20folder/Copy%20of%20Chitra%20.jpeg",
            quote: "The practical approach to learning at INSD helped me understand design beyond theory. Working on live projects gave me real industry exposure.",
            placement: "Casamink"
        },
        {
            name: "Abhinav Rajput",
            discipline: "Graphic Design",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260526T180408Z-3-001/Untitled%20folder/Copy%20of%20Abhinav%20Rajput.jfif",
            quote: "INSD gave me the right platform to explore my creativity. The continuous feedback from faculty helped me improve my work.",
            placement: "Magiccircle Communication Pvt Ltd"
        },
        {
            name: "Tamanna Das",
            discipline: "Fashion Design",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260526T180408Z-3-001/Untitled%20folder/Copy%20of%20Tamanna%20Das.jpeg",
            quote: "The fashion shows and jury evaluations pushed me to perform better with every project. It really prepared me for the competitive industry outside.",
            placement: "Sahil Kocchar, Noida"
        },
        {
            name: "Sarabjeet",
            discipline: "Interior Design",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260526T180408Z-3-001/Untitled%20folder/Copy%20of%20Sarabjeet.jpeg",
            quote: "I learned how to convert ideas into practical designs through hands-on training. The software skills I gained helped me secure my first job quickly.",
            placement: "Height Buildcon South"
        },
        {
            name: "Nimit Lakhanpal",
            discipline: "Graphic Design",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260526T180408Z-3-001/Untitled%20folder/Copy%20of%20Nimit%20Lakhanpal.jfif",
            quote: "The faculty support at INSD was incredible. They guided me at every step, from concept development to final portfolio presentation.",
            placement: "GMS Group"
        },
        {
            name: "Nausheena Naaz",
            discipline: "Fashion Design",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260526T180408Z-3-001/Untitled%20folder/Copy%20of%20Nausheena%20Naaz.jpeg",
            quote: "The exposure to different design fields helped me discover my strengths. By the end of the course, I had clarity on my career path.",
            placement: "Freelance Stylist"
        },
        {
            name: "Tamanna Dua",
            discipline: "Interior Design",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260526T180408Z-3-001/Untitled%20folder/Copy%20of%20Tamanna%20Dua%20.jpeg",
            quote: "INSD helped me build both creative and professional skills. The portfolio preparation and mock interviews made a huge difference during placements.",
            placement: "Portray Interior & Decors LLC, Abu Dhabi"
        },
        {
            name: "Vandana",
            discipline: "Interior Design",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder-20260526T180408Z-3-001/Untitled%20folder/Copy%20of%20Vandana%20.jpeg",
            quote: "Workshops and industry interactions gave me insights into real-world design practices. It helped me stay ahead and be job-ready.",
            placement: "Dazor Constructions"
        }
    ];

    return (
        <section ref={sectionRef} className="relative py-24 md:py-40 bg-[#f3f3f3] overflow-hidden selection:bg-primary selection:text-white z-20">
            {/* Background Narrative */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-slate-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-30 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <div className="h-px w-12 bg-primary"></div>
                        <span className="text-primary font-black uppercase tracking-[0.4em] text-xs">Transformation Journal</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 100, rotateX: -20 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-slate-900 leading-none mb-12"
                    >
                        From Classroom <br />
                        <span className="text-slate-800 italic font-serif">to</span> Career: <br />
                        <span className="text-primary">Voices of INSDians</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-3xl"
                    >
                        <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-slate-900 mb-6 leading-tight">
                            Every story is different. <br />
                            The common link is simple – <span className="text-primary">skills, portfolios and confidence.</span>
                        </h3>
                    </motion.div>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-12 px-4 -mx-4 md:px-0 md:mx-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {students.map((student, index) => (
                        <div key={index} className="w-[240px] md:w-[260px] snap-center shrink-0">
                            <TransformationCard student={student} index={index} />
                        </div>
                    ))}
                </div>



                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-20 text-center"
                >
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">success record</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mb-20 bg-white/50 backdrop-blur-sm p-10 md:p-16 rounded-[4rem] border border-white/50 shadow-sm">
                        {[
                            { value: 98, suffix: "%", label: "Placement Track Record" },
                            { value: 500, suffix: "+", label: "Hiring Partners" },
                            { value: "1,50,000", suffix: "/ PM", label: "Highest Package 2025" },
                            { value: "Global", suffix: "", label: "Alumni Network" }
                        ].map((metric, i) => (
                            <MetricCounter key={i} {...metric} delay={i * 0.1} />
                        ))}
                    </div>

                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Ready to write your own story?</p>
                    <Link to="/course-apply-now" className="h-16 md:h-20 px-12 bg-slate-900 text-white rounded-full font-black uppercase tracking-widest hover:bg-primary transition-all duration-500 shadow-xl inline-flex items-center justify-center mx-auto w-max">
                        Start Your Evolution
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default StudentTransformation;
