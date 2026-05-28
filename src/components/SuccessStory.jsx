import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Star } from 'lucide-react';
import { useAdmissionModal } from '../context/AdmissionModalContext';
import Text from './text.jsx';

const SuccessStory = ({ heading, subheading, customStories }) => {
    const { openAdmissionModal } = useAdmissionModal();
    const defaultStories = [
        {
            name: "Ankit Khera",
            placedAt: "Lifestyle",
            title: "Fashion Designer",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder/Untitled%20folder/Copy%20of%20Ankit%20Khera.jpeg",
            quote: "INSD helped me move from basic sketches to a strong portfolio and a full-time job as a Fashion Designer. The shows, juries and software training made interviews feel easy."
        },
        {
            name: "Sanchita Pal",
            placedAt: "Lenskart",
            title: "Graphic Designer",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder/Untitled%20folder/Copy%20of%20Sanchita%20Pal.jfif",
            quote: "I started taking small freelance graphic design projects in my second year. The feedback on my portfolio and support from faculty gave me the confidence to charge for my skills."
        },
        {
            name: "Sameer Siddiqui",
            placedAt: "Gold Mark",
            title: "Jewellery Designer",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder/Untitled%20folder/Copy%20of%20Sameer%20Siddiqui.jpeg",
            quote: "The hands-on training in jewellery design and the exposure to industry techniques helped me build strong technical skills. The mentor guidance played a key role in helping me secure a position."
        },
        {
            name: "Nitika Gautam",
            placedAt: "Virgo Clothing",
            title: "Interior Designer",
            img: "https://ik.imagekit.io/fmldynl4j4/Untitled%20folder/Untitled%20folder/Copy%20of%20Nitika%20Gautam%20.jpeg",
            quote: "The placement cell connected me with a top interior design firm in Gurgaon. My 3D visualisation skills and studio projects made me job-ready from day one."
        }
    ];

    const stories = customStories || defaultStories;

    return (
        <section className="section-py pb-24 md:pb-32 bg-slate-50 overflow-hidden relative">
            <div className="container mx-auto container-px relative z-10">
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="w-12 h-[2px] bg-primary"></div>
                        <span className="text-primary font-black uppercase tracking-[0.4em] text-clamp-sm">Industry Placements</span>
                    </motion.div>

                    <Text heading={heading} subheading={subheading} />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-clamp-lg font-bold text-slate-500 tracking-tight mb-12"
                    >
                        Be a part of the INSD success story!
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stories.map((story, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group flex flex-col h-full"
                        >
                            {/* Card Image Part */}
                            <Link to="/industry-potential" className="relative aspect-[4/5] rounded-t-4xl overflow-hidden shadow-2xl block cursor-pointer">
                                <img
                                    src={story.img}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                                    alt={story.name}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />

                                {/* Top Badge */}
                                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-clamp-sm font-black text-white uppercase tracking-widest">{story.placedAt}</span>
                                </div>

                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-white font-black text-clamp-xl uppercase tracking-tighter leading-none mb-1">
                                        {story.name}
                                    </h3>
                                    <p className="text-primary font-black text-clamp-sm uppercase tracking-widest">
                                        {story.title}
                                    </p>
                                </div>
                            </Link>

                            {/* Card Content Part */}
                            <div className="bg-white p-8 rounded-b-4xl shadow-xl border-x border-b border-slate-100 flex-1 flex flex-col">
                                <p className="text-slate-500 text-clamp-sm font-semibold leading-relaxed mb-6 flex-1">
                                    "{story.quote}"
                                </p>
                                <div className="pt-6 border-t border-slate-50 flex items-center justify-end">
                                    <div className="p-2 bg-slate-50 rounded-full group-hover:bg-primary/10 transition-colors">
                                        <ArrowUpRight size={14} className="text-slate-300 group-hover:text-primary transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default SuccessStory;
