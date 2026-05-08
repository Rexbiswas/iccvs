import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const allLogos = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAX7Ow-fSUhmokgxv7oaSro64M9jvc8HUF0Q&s", // Malabar
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjUH1hztAFRWTyksVVs_CFrBzHf2owI8W2LQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3TxPlGqVOdOL002MJD9c7BL8DGLa4uKKOOQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_nWesvifBQzPWizRVQabKLRaSdk98t9wt7A&s", // Kawasaki
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnBhZeRMEcuKa9pfe6vMODd8cyxeS5lbFDlg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTosBGBX15jP5DFLqy-z3S5BWnTCNyPjYhfSg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNn1CeKnWAOdMXic4hVixrJti9XGLJjG7sZQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ0xwGpGx9-ZOaG-G5EEsnM934P33IHZ9Gtw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMX1dSteJBMGZtgbmVueO52rLrM_21X2HOjg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjWr7AENPyRZT_lWjK-RPTMwHl_G1qO4BocQ&s",
    "https://www.mashindia.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-26-at-5.38.30-PM-1024x854.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJCQtJsrDPSL1bBcwu87sAPersb4O1kfsWlw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR_TGRkzchBtE2vvsghf-TABLqYoUH8H93Cw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdC0yyubPq9NglroYHQYvQ5ZF5A2gXitn4Hg&s",
    "https://media.licdn.com/dms/image/v2/D5616AQGY5IeeFTxLeQ/profile-displaybackgroundimage-shrink_200_800/B56ZZiVEeFHgAU-/0/1745406413688?e=2147483647&v=beta&t=Psuz6KyMsv8hltv-EVA0cgYn-k9ahW_rnj7Ls9jRtdE",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsFSSkPbiZwbb2ueDZJ9RBCN-aCRDSDTWwtg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHyp-d8_EkzJv73QFrv1TOzj0PA4Y-bbcpTQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqce7Ghqzw5SxkMSgGgUeyLaR-WFh9_z6Dlg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlZS1HcjW6FFZ0AlYkM5ZGW9M71ct644dT4g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEX5YINtWxsviGMT9UZbFXI3Cc1l90ToMOjQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMe_u4laXO5nzXxvsslQoaAH3x3SGGiNUccQ&s",
    "https://m.media-amazon.com/images/I/21sBau88cJL._SY200_.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7KAWvB-JAznFLt8jUQNtQ_SMyuZN-ydxuhQ&s",
    "https://biz.prlog.org/angaros/logo.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdxjFkuOczovGMCtMCKiZNK8Nl8-HHi4B5Mw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdzZBq5P4rgeDcDoDMF0ALweH4EHyEE_dmHg&s",
    // From TrainingPartners
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaD24vay_jTexDQFlC7WcCwUKLfABsLq7Mxg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOZ9NYd0ET0u7rmr-IYI0j4dkTbDYwQnEL0w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOUScvNv7C9KjvolThJ-fcj4IfvxSP8-m1Ig&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfp9UQE8vWcX8g8W1ik-1S5PhWyrwTt3Jj0Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAVXoy4-M6CZEADkAg3EKtGTrBZh8Xn5ZeDg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi4adrv8AqJDPhunb3_km2idzotwLuroAWHw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkD7P83txvJ2sKJ9R5N_-qmQw94coPUq8J5A&s"
];

const INITIAL_VISIBLE_COUNT = 15;

const PlacementPartners = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const visibleLogos = isExpanded ? allLogos : allLogos.slice(0, INITIAL_VISIBLE_COUNT);

    return (
        <section className="bg-[#f6f5f1] py-16 md:py-24 px-6 md:px-12 overflow-hidden rounded-[3rem] md:rounded-[5rem]">
            <div className="max-w-[1400px] mx-auto">
                
                {/* Simple Header Above Grid - Centered */}
                <div className="flex flex-col items-center justify-center gap-4 mb-12 md:mb-16 text-center">
                    <div className="w-12 h-1.5 bg-primary rounded-full" />
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] text-slate-900">
                        Training and Placement Partners
                    </h2>
                </div>

                {/* Card Grid */}
                <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-5">
                    <AnimatePresence>
                        {visibleLogos.map((logo, idx) => (
                            <motion.div
                                key={logo + idx} // Combining logo and idx ensures unique keys if duplicates exist
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ 
                                    duration: 0.5, 
                                    delay: isExpanded ? (idx - INITIAL_VISIBLE_COUNT) * 0.05 : idx * 0.05,
                                    ease: "easeOut"
                                }}
                                className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 aspect-[1.8/1] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 group"
                            >
                                <img 
                                    src={logo} 
                                    alt="Partner Logo" 
                                    loading="lazy"
                                    className="max-h-full max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-90 group-hover:scale-100" 
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Show More Action */}
                {allLogos.length > INITIAL_VISIBLE_COUNT && (
                    <motion.div layout className="mt-12 flex justify-center">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="group flex items-center gap-3 px-8 py-4 bg-white hover:bg-slate-900 text-slate-900 hover:text-white rounded-full font-bold uppercase tracking-[0.15em] text-xs transition-all duration-300 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 border border-slate-100"
                        >
                            <span>{isExpanded ? 'Show Less' : 'Explore All Partners'}</span>
                            {isExpanded ? (
                                <ChevronUp size={16} className="transition-transform group-hover:-translate-y-1" />
                            ) : (
                                <ChevronDown size={16} className="transition-transform group-hover:translate-y-1" />
                            )}
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default PlacementPartners;
