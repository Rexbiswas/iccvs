import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const allLogos = [
    { name: "Levi’s", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Levi%27s_logo.svg/960px-Levi%27s_logo.svg.png" },
    { name: "PC Jewellers", logo: "https://corporate.pcjeweller.com/wp-content/uploads/2021/10/pcj-logo-corporate.png" },
    { name: "Malabar gold", logo: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/a1e1b59b-cc30-468e-a1aa-df6f0a96faba.__CR0,145,1280,384_PT0_SX600_V1___.jpg" },
    { name: "Tissot", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Tissot_Logo.svg/1280px-Tissot_Logo.svg.png" },
    { name: "Porche", logo: "https://di-uploads-pod3.dealerinspire.com/porscheoffremont/uploads/2018/09/porsche-logo.jpg" },
    { name: "Shalini passi foundation", logo: "https://s3.ap-south-1.amazonaws.com/assets.ynos.in/startup-logos/YNOS374272.jpg" },
    { name: "Marshall", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCyZt12d36rn33kYYB_X6JzUvw_d4I2MmNxQ&s" },
    { name: "Accenture", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" },
    { name: "Pantaloons", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPJeGVKm5t4Xrrwdp0zu7BylTA1YXoxB-xmQ&s" },
    { name: "Liv space", logo: "https://assets.nextleap.app/image/eyJidWNrZXQiOiJuZXh0bGVhcC1zdGF0aWMtYXNzZXRzIiwia2V5IjoiaW1hZ2VzL0xvZ29mcmFtZS0xNS02NGZjNWQ2Yi1kZjJlLTQ3NmMtOGM0Ny02ODNlNWRhODdkZTIucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4MDUuODc1LCJoZWlnaHQiOjI0MS41LCJmaXQiOiJjb3ZlciIsIndpdGhvdXRFbmxhcmdlbWVudCI6dHJ1ZX0sInJvdGF0ZSI6bnVsbH19" },
    { name: "Asian paints", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiR4q6kmKdlVomkc9-ZOjg1MKSSWUUFv_w_Q&s" },
    { name: "Lakmé", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWp4CjoFuZnl3T2gU2K8C-rtsufkBg4hfZcw&s" },
    { name: "Jaipur rugs", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTosBGBX15jP5DFLqy-z3S5BWnTCNyPjYhfSg&s" },
    { name: "Gaurav Gupta", logo: "https://gauravguptastudio.com/cdn/shop/files/GG-Logo_-_black.webp?v=1750926479" },
    { name: "Jigar mali", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKrUgdAxbX3Z6O8SCTpbu4hWyHNn2ZsnU60g&s" },
    { name: "IKEA", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Ikea_logo.svg" },
    { name: "RADO", logo: "https://cdn.freebiesupply.com/logos/thumbs/2x/rado-logo.png" },
    { name: "Study by Janak", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb_azHJMLSOR5apAGNVjca3nRQXZmUd7pRtw&s" },
    { name: "La polo", logo: "https://media.licdn.com/dms/image/v2/C511BAQE8GMc43jhrtA/company-background_10000/company-background_10000/0/1584026514880/lapolo_india_cover?e=2147483647&v=beta&t=gnwe5vne0jK1uNxVosHrvp2xb2wN82cslLSB64p2PDg" },
    { name: "Mufti", logo: "https://www.credobrands.in/wp-content/uploads/2025/09/new_logo_footer.png" },
    { name: "Kawasaki", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWeHnexG4VWoavFqghQMgvDNQ0O4_07Y57PA&s" }
];

const PlacementPartners = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [initialCount, setInitialCount] = useState(15);
    const [imageErrors, setImageErrors] = useState({});

    const handleImageError = (name) => {
        setImageErrors(prev => ({ ...prev, [name]: true }));
    };

    useEffect(() => {
        const updateCount = () => {
            setInitialCount(window.innerWidth < 768 ? 10 : 15);
        };
        updateCount();
        window.addEventListener('resize', updateCount);
        return () => window.removeEventListener('resize', updateCount);
    }, []);

    const visibleLogos = isExpanded ? allLogos : allLogos.slice(0, initialCount);

    return (
        <section className="bg-[#f6f5f1] py-12 md:py-24 px-6 md:px-12 overflow-hidden rounded-[3rem] md:rounded-[5rem]">
            <div className="max-w-[1400px] mx-auto">

                {/* Simple Header Above Grid - Centered */}
                <div className="flex flex-col items-center justify-center gap-3 mb-10 md:mb-16 text-center">
                    <div className="w-10 h-1 bg-primary rounded-full" />
                    <h2 className="text-lg md:text-2xl font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-slate-900 leading-tight">
                        Training and Placement Partners
                    </h2>
                </div>

                {/* Card Grid */}
                <motion.div layout className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
                    <AnimatePresence>
                        {visibleLogos.map((item, idx) => {
                            const isError = imageErrors[item.name] || !item.logo;
                            return (
                                <motion.div
                                    key={item.name + idx}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: isExpanded ? Math.max(0, (idx - initialCount) * 0.05) : idx * 0.05,
                                        ease: "easeOut"
                                    }}
                                    className="bg-white rounded-xl md:rounded-3xl p-3 sm:p-4 md:p-6 aspect-[1.8/1] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 group border border-slate-50"
                                >
                                    {isError ? (
                                        <span className="text-center font-black text-slate-800 tracking-tight text-[11px] sm:text-xs md:text-sm uppercase select-none line-clamp-2 px-1">
                                            {item.name}
                                        </span>
                                    ) : (
                                        <img
                                            src={item.logo}
                                            alt={`${item.name} Logo`}
                                            loading="lazy"
                                            onError={() => handleImageError(item.name)}
                                            className="max-h-full max-w-full object-contain transition-all duration-700 scale-90 group-hover:scale-100"
                                        />
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Show More Action */}
                {allLogos.length > initialCount && (
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
