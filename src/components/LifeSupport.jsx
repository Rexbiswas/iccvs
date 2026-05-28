import React from 'react';
import { motion } from 'framer-motion';

const LifeSupport = () => {
    return (
        <section className="py-16 md:py-24 bg-white flex flex-col items-center justify-center text-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto space-y-10"
            >
                {/* Heading */}
                <h2 className="font-black uppercase text-3xl md:text-5xl leading-tight tracking-tighter">
                    <div className="text-[#db3436]">100% LIFETIME</div>
                    <div className="text-[#db3436]">PLACEMENT</div>
                    <div className="text-[#134a84]">SUPPORT</div>
                </h2>

                {/* Average Salary Pill */}
                <div className="inline-block bg-[#db3436]/10 px-8 py-4 rounded-full">
                    <p className="text-[#db3436] font-black text-sm md:text-lg tracking-[0.15em] uppercase">
                        AVERAGE SALARY: RS. 20,000 - RS. 1,50,000 PER MONTH
                    </p>
                </div>

                {/* Highest Package */}
                <h3 className="text-xl md:text-3xl font-black uppercase text-[#1a1a1a]">
                    HIGHEST PACKAGE 2025: <span className="text-[#db3436]">RS. 1,50,000</span> PER MONTH
                </h3>
            </motion.div>
        </section>
    );
};

export default LifeSupport;
