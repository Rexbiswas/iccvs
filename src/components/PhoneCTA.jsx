import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

const PhoneCTA = ({ isFloatingPanel = false }) => {
    const phoneNumber = "+919804443300";
    const displayPhone = "+91 98044 43300";

    const content = (
        <motion.a
            href={`tel:${phoneNumber}`}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className={`${isFloatingPanel ? 'relative' : 'fixed bottom-[260px] md:bottom-[180px] right-6 md:right-10'} z-[1000] group flex items-center justify-center`}
        >
            {/* Tooltip */}
            <div className="absolute right-full mr-4 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-4 group-hover:translate-x-0 whitespace-nowrap shadow-2xl">
                Call Admissions
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45" />
            </div>

            {/* Glowing Ring */}
            <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-20 group-hover:opacity-40 animate-pulse transition-opacity duration-500" />

            {/* Main Button */}
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary shadow-[0_10px_30px_rgba(219,52,54,0.4)] flex items-center justify-center overflow-hidden border border-white/20">
                {/* Shine Animation */}
                <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <Phone
                    size={24}
                    className="text-white relative z-10 group-hover:rotate-12 transition-transform duration-500"
                />
            </div>

            {/* Pulsing Ripple */}
            <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-ping pointer-events-none" />
        </motion.a>
    );

    return content;
};

export default PhoneCTA;
