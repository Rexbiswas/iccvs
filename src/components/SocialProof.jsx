import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, FileCheck, Landmark, Star, Medal, Globe } from 'lucide-react';

const SocialProof = () => {
    const sectionRef = useRef(null);

    const proofItems = [
        {
            title: "National Awards",
            icon: <Medal className="w-8 h-8 text-primary" />,
            desc: "Multiple winner of 'Best Design Institute' at national summits.",
            image: "https://ik.imagekit.io/fmldynl4j4/insd-awards/Gemini_Generated_Image_ejp2fiejp2fiejp2.png"
        },
        {
            title: "Official Certificates",
            icon: <FileCheck className="w-8 h-8 text-primary" />,
            desc: "UGC recognised and globally validated design curriculum.",
            image: "https://ik.imagekit.io/fmldynl4j4/insd-awards/Award%20-%20International%20College%20of%20the%20Year%202021_page-0001.jpg?updatedAt=1772091967595"
        },
        {
            title: "Global Affiliations",
            icon: <Landmark className="w-8 h-8 text-primary" />,
            desc: "Partnerships with premium international design bodies and universities.",
            image: "https://ik.imagekit.io/fmldynl4j4/insd-awards/Gemini_Generated_Image_tr3y8tr3y8tr3y8t.png"
        },
        {
            title: "Industry Recognition",
            icon: <Star className="w-8 h-8 text-primary" />,
            desc: "Featured in leading fashion and design publications worldwide.",
            image: "https://images.pexels.com/photos/8205467/pexels-photo-8205467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
    ];

    return (
        <section ref={sectionRef} className="relative z-20 py-24 md:py-40 bg-[#f3f3f3] text-slate-900 overflow-hidden">
            {/* Soft Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Decorative Vector Lines (Subtle) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                    <div className="max-w-3xl">
                        <span className="inline-block text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4">Verification & Authority</span>
                        <motion.h2
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                visible: { transition: { staggerChildren: 0.1 } }
                            }}
                            className="text-[8vw] md:text-[5.5vw] font-black uppercase leading-[0.85] tracking-tighter mb-8 flex flex-wrap gap-x-5"
                        >
                            {"Trusted. Recognised. Proven.".split(" ").map((word, i) => (
                                <motion.span
                                    key={i}
                                    className="inline-block"
                                    variants={{
                                        hidden: { y: 50, opacity: 0, rotateX: -90 },
                                        visible: { y: 0, opacity: 1, rotateX: 0 }
                                    }}
                                    transition={{ duration: 1, ease: [0.175, 0.885, 0.32, 1.275] }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.h2>
                        <div className="h-1.5 w-32 bg-primary rounded-full"></div>
                    </div>


                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {proofItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                            className="group relative h-[500px] rounded-[2.5rem] overflow-hidden bg-white border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-shadow duration-700"
                        >
                            {/* Card Image with Refined Overlay */}
                            <div className="absolute inset-0 z-0 h-full w-full">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover brightness-110 opacity-20 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                                />
                                {/* Bottom Content Gradient */}
                                <div className="absolute inset-0 bg-linear-to-t from-white via-white/80 to-transparent group-hover:from-black/80 group-hover:via-black/40 group-hover:to-transparent transition-all duration-700" />
                            </div>

                            {/* Card Content */}
                            <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end">
                                <div className="mb-8 w-16 h-16 rounded-[1.25rem] bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-sm">
                                    <div className="group-hover:text-white group-hover:scale-110 transition-all duration-500">
                                        {React.cloneElement(item.icon, { className: "w-8 h-8" })}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black mb-4 tracking-tight text-slate-900 group-hover:text-white transition-colors duration-500">
                                    {item.title}
                                </h3>

                                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 group-hover:text-white/80 transition-all duration-500 delay-100">
                                    {item.desc}
                                </p>

                                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-primary group-hover:text-white transition-colors duration-500">
                                    <div className="w-8 h-[2px] bg-current"></div>
                                    <span>Verified</span>
                                </div>
                            </div>

                            {/* Corner Accent Decor */}
                            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <Globe className="w-6 h-6 text-white/40" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Legacy & Vision Highlight (New Section) */}
                <div className="mt-28 p-12 md:p-20 rounded-[3rem] bg-linear-to-br from-slate-50 to-white border border-slate-100 relative overflow-hidden group">
                    {/* Background Decorative Element */}
                    <div className="absolute top-0 right-0 p-12 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-1000 rotate-12">
                        <Award className="w-64 h-64 text-slate-900" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="w-12 h-px bg-primary"></span>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Founding Heritage</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8">
                                A Legacy Engineered by <br />
                                <span className="text-slate-800 italic font-serif">Visionary Leadership</span>
                            </h3>
                            <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                                Co-founded by the <span className="text-slate-900 font-bold">IAS Officer & 1st Director General of NIFT</span>, ICCVS has pioneered design education in India for over 15 years, building a community of world-class artists and entrepreneurs.
                            </p>
                        </div>

                        <div className="flex flex-col gap-8 md:flex-row md:items-center">
                            <div className="p-8 rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-slate-50 flex-1">
                                <div className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">National</div>
                                <div className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-4">Award Winner</div>
                                <p className="text-slate-500 text-sm font-medium">Recognized as India's premier design school at the National Education Summits.</p>
                            </div>

                            <div className="p-8 rounded-3xl bg-slate-900 flex-1 text-white">
                                <div className="text-4xl font-black mb-2 tracking-tighter">Global</div>
                                <div className="text-xs font-black uppercase tracking-[0.3em] text-secondary-foreground mb-4 opacity-70">Outlook</div>
                                <p className="text-slate-300 text-sm font-medium leading-relaxed">Collaborating with international design powerhouses to redefine creative standards.</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
};

export default SocialProof;
