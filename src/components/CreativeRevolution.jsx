import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap } from 'lucide-react';
import { useAdmissionModal } from '../context/AdmissionModalContext';

const CreativeRevolution = () => {
    const { openAdmissionModal } = useAdmissionModal();

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-[3rem] md:rounded-[4.5rem] overflow-hidden bg-[#0a0c10] group/cta"
            >
                {/* Ambient Glow */}
                <div className="absolute top-0 left-0 w-1/2 h-full bg-[#db3436] opacity-10 blur-[120px] -translate-x-1/4 pointer-events-none" />
                
                <div className="relative z-10 px-6 py-10 md:p-16 text-center flex flex-col items-center">
                    <div className="max-w-4xl mx-auto space-y-5 md:space-y-8">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
                            READY TO LEAD THE <br /> 
                            <span className="text-[#db3436] italic block mt-1">CREATIVE REVOLUTION?</span>
                        </h2>
                        
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => openAdmissionModal({ 
                                formType: 'admission'
                            })}
                            className="inline-flex items-center justify-center gap-2.5 bg-white text-slate-950 px-7 py-3.5 md:px-12 md:py-5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.15em] shadow-2xl transition-all duration-500 hover:shadow-[#db3436]/30 w-fit group/btn"
                        >
                            <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current shrink-0" />
                            <span className="whitespace-nowrap">Start Your Career</span>
                            <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CreativeRevolution;
