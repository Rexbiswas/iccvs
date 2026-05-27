import React from 'react';
import { motion } from 'framer-motion';
import { Quote, TrendingUp, Star } from 'lucide-react';

const testimonials = [
    {
        name: "Chhaya Gupta",
        company: "CASTLEDECOR",
        image: "https://ik.imagekit.io/fmldynl4j4/drive-download-20260527T033750Z-3-001/Chhaya%20gupta,%20CASTLEDECOR.png",
        quote: "INSD gave me the vision to transform spaces and the business acumen to scale my studio. The journey from student to founder was seamless.",
        revenue: "Industry Leader"
    },
    {
        name: "Kajal Singhvi",
        company: "BLOSUME BOUTIQUE",
        image: "https://ik.imagekit.io/fmldynl4j4/drive-download-20260527T033750Z-3-001/Kajal%20singhvi,%20BLOSUME%20BOUTIQUE.png",
        quote: "The incubation cell at INSD helped me refine my brand identity and connect with a global network, launching my boutique into the spotlight.",
        revenue: "Award Winning"
    },
    {
        name: "Ms. Bhavyashree",
        company: "Vanya Fashion Studio",
        image: "https://ik.imagekit.io/fmldynl4j4/drive-download-20260527T033750Z-3-001/Ms.%20Bhavyashree%20,%20Vanya%20Fashion%20Studio_.jpg",
        quote: "My fashion startup was born in the EIDC lab at INSD. The mentorship and practical business modules were absolute game-changers.",
        revenue: "Global Reach"
    },
    {
        name: "Naitri Mehta",
        company: "NAMO DÉCOR",
        image: "https://ik.imagekit.io/fmldynl4j4/drive-download-20260527T033750Z-3-001/Naitri%20mehta,%20NAMO%20D%C3%89COR.png",
        quote: "INSD didn't just teach me design; they taught me how to sell it and build a legacy in the decor industry.",
        revenue: "Fastest Growing"
    },
    {
        name: "Nivedita Sahbani",
        company: "NIVEDDITA SAHBANI ASSOCIATES",
        image: "https://ik.imagekit.io/fmldynl4j4/drive-download-20260527T033750Z-3-001/NIVEDITA%20SAHBANI,%20NIVEDDITA%20SAHBANI%20ASSOCIATES%20.jpeg",
        quote: "Transitioning to a leading associate firm was possible because of the capital infusion insights and global scaling strategies provided by INSD.",
        revenue: "Market Dominant"
    },
    {
        name: "Prerna Jain",
        company: "PRE INTEROIR",
        image: "https://ik.imagekit.io/fmldynl4j4/drive-download-20260527T033750Z-3-001/Prerna%20jain,%20PRE%20INTEROIR.png",
        quote: "The architectural foundation and rigorous engineering concepts at INSD helped me build a highly successful interior firm.",
        revenue: "Premium Studio"
    },
    {
        name: "Saurabh Kumavat",
        company: "KUMAWAT DESIGN",
        image: "https://ik.imagekit.io/fmldynl4j4/drive-download-20260527T033750Z-3-001/Saurabh%20kumavat,%20KUMAWAT%20DESIGN.png",
        quote: "From learning alpha mentorship to executing market-dominant designs, INSD has been the core of my success story.",
        revenue: "Top Tier Agency"
    },
    {
        name: "Sejal Golchha Jain",
        company: "CREAZIONE INTERIORS",
        image: "https://ik.imagekit.io/fmldynl4j4/drive-download-20260527T033750Z-3-001/SEJAL%20GOLCHHA%20JAIN,%20CREAZIONE%20INTERIORS%20.jpeg",
        quote: "INSD equipped me with the creative and entrepreneurial skills needed to establish a recognized interior design brand.",
        revenue: "Luxury Interiors"
    },
    {
        name: "Somesh Patni",
        company: "INCHIFY INTERIORS",
        image: "https://ik.imagekit.io/fmldynl4j4/drive-download-20260527T033750Z-3-001/SOMESH%20PATNI,%20INCHIFY%20INTERIORS%20.jpeg",
        quote: "The global network and business modules at INSD accelerated my agency's growth to unprecedented heights in a short time.",
        revenue: "High Growth"
    },
    {
        name: "Yunus Shaikh",
        company: "YUNA INTERIOR",
        image: "https://ik.imagekit.io/fmldynl4j4/drive-download-20260527T033750Z-3-001/Yunus%20shaikh,%20YUNA%20INTERIOR.png",
        quote: "Thanks to INSD's incredible faculty and startup ecosystem, I was able to turn my passion for design into a lucrative business.",
        revenue: "Leading Firm"
    }
];

const EntrepreneurTestimonials = () => {
    return (
        <section className="py-32 bg-slate-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 cyber-grid opacity-[0.03]" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24 space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-4 mb-6"
                    >
                        <div className="w-12 h-px bg-primary" />
                        <span className="text-primary font-black uppercase text-[10px] tracking-[0.8em]">Incubation Success</span>
                        <div className="w-12 h-px bg-primary" />
                    </motion.div>

                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-clamp-4xl font-black text-white uppercase tracking-tighter leading-none"
                    >
                        FROM <span className="text-primary italic">VISION</span> <br /> TO ENTERPRISE
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 font-medium text-lg md:text-xl max-w-2xl mx-auto"
                    >
                        Hear directly from our alumni who leveraged INSD's ecosystem to build market-dominating brands.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="group relative p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 flex flex-col justify-between min-h-[400px]"
                        >
                            <div className="absolute top-8 right-8 text-white/10 group-hover:text-primary/20 transition-colors duration-500">
                                <Quote size={64} />
                            </div>

                            <div className="relative z-10 space-y-8">
                                <div className="flex gap-1 text-primary">
                                    {[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-lg text-slate-300 italic font-light leading-relaxed">
                                    "{t.quote}"
                                </p>
                            </div>

                            <div className="relative z-10 flex items-center gap-4 mt-8 pt-8 border-t border-white/10">
                                <img 
                                    src={t.image} 
                                    alt={t.name}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/50"
                                />
                                <div>
                                    <h4 className="text-white font-bold uppercase tracking-wide text-sm">{t.name}</h4>
                                    <p className="text-primary text-[10px] font-bold uppercase tracking-widest">{t.company}</p>
                                </div>
                                <div className="ml-auto flex flex-col items-end">
                                    <TrendingUp size={16} className="text-emerald-400 mb-1" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-end text-right">{t.revenue}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EntrepreneurTestimonials;
