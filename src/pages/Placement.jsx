import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import StudentTransformation from '../components/StudentTransformation';
import HiringPartnersLogoCloud from '../components/HiringPartnersLogoCloud';
import GlobalIndustryNetwork from '../components/GlobalIndustryNetwork';
import LifeSupport from '../components/LifeSupport';
import SuccessStory from '../components/SuccessStory';
import Footer from '../components/Footer';

import SEO from '../components/SEO';

const Placement = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen bg-[#fafafa]">
            <SEO
                title="Design Courses with 100% Placement in Delhi | INSD Career Success"
                description="Explore INSD's record of 100% placement assistance for fashion, interior, and graphic design courses in Delhi. From classroom to career with top industry partners."
                keywords="design courses with 100% placement in Delhi, job oriented design courses in Delhi, placement assistance for fashion design, interior design placement support, graphic design job guarantee"
            />
            {/* Minimal Hero Section to introduce Placements */}
            <section className="relative pt-32 pb-12 md:pt-48 md:pb-24 overflow-hidden border-b border-slate-200/50">
                {/* Background Details */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-primary/5 to-transparent blur-3xl opacity-60 mix-blend-multiply" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-linear-to-tr from-slate-200/60 to-transparent blur-2xl opacity-50" />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-8 shadow-sm">
                            Career Outcomes
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black uppercase leading-[0.85] tracking-tighter text-slate-900 mb-8">
                            From <span className="text-primary">Classroom</span> <br /> to <span className="text-secondary">Career</span>
                        </h1>
                        <p className="max-w-3xl mx-auto text-lg md:text-2xl text-slate-600 font-medium leading-relaxed">
                            Job-oriented design courses in Delhi with 100% placement assistance. We don't just teach; we launch careers in Fashion, Interior, Graphic, and Animation & VFX.
                        </p>
                    </motion.div>
                </div>
            </section>



            {/* Hiring Partners Logo Cloud */}
            <HiringPartnersLogoCloud />

            {/* Placement Support Info */}
            <LifeSupport />



            {/* Global Ecosystem / Network */}
            <GlobalIndustryNetwork />



            {/* StudentTransformation Component */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <StudentTransformation />
            </motion.div>

            {/* <SuccessStory /> */}

            <Footer />
        </main>
    );
};

export default Placement;
