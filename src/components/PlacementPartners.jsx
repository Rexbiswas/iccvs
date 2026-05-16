import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const allLogos = [
    "https://www.logo-designer.co/storage/2019/08/2019_Polaris_Industries_new_logo_design.png", // Malabar
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoF5FDjbpIXD6u14iWgdBs3htPX3iQCHo0zw&s",
    "https://mir-s3-cdn-cf.behance.net/projects/404/84896a70394243.Y3JvcCw4MDgsNjMyLDAsMA.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI-sWRVYp-6IORU4YcwU-PWt3lSAxLz11SvQ&s", 
    "https://media.licdn.com/dms/image/v2/C4E0BAQEfYJrjIofy-w/company-logo_200_200/company-logo_200_200/0/1631327997212?e=2147483647&v=beta&t=eYvO98nambfGEl2UKZd7wdyYH0nD1xE2TITXNx2nDJE",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWrrfA5qZ2qwR2m0rRfehbsXFwFQOVQfvFwg&s",
    "data:image/png;base64,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",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Tissot_Logo.svg/1280px-Tissot_Logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKrUgdAxbX3Z6O8SCTpbu4hWyHNn2ZsnU60g&s",
    "https://mir-s3-cdn-cf.behance.net/projects/404/38be29225567535.Y3JvcCwxOTU3LDE1MzEsNDk5LDE5Mw.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRHK9PYZ7IRjEbPv43wEHt7TllI-NP6t9NcA&s",//
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnypUeE3Su_Xx5EHci4fOrEVGEzQXW5XjNqA&s",//
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1280px-H%26M-Logo.svg.png",
    "https://static.vecteezy.com/system/resources/previews/023/871/238/non_2x/polo-ralph-lauren-brand-logo-black-symbol-clothes-design-icon-abstract-illustration-free-vector.jpg",
    "https://corporate.pcjeweller.com/wp-content/uploads/2021/10/pcj-logo-corporate.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSkRhlWKugEVuHUY0EPcTlrCEHaI_6s0X2sA&s",
    "https://gauravguptastudio.com/cdn/shop/files/GG-Logo_-_black.webp?v=1750926479",
    "https://img-cdn.publive.online/fit-in/1200x675/filters:format(webp)/afaqs/media/post_attachments/fb6d2faa5e6b89ada6da0d728643bd94090276adf29cf8a0da98ded9f58e5a7c.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPJeGVKm5t4Xrrwdp0zu7BylTA1YXoxB-xmQ&s",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Levi%27s_logo.svg/960px-Levi%27s_logo.svg.png",
    "https://thumbs.dreamstime.com/b/vector-logos-collection-most-famous-fashion-brands-world-format-available-illustrator-ai-nike-logo-119869268.jpg",
    "https://dimension-six.perniaspopupshop.com/media/wysiwyg/DESIGNER_PROFILES/LOGO-RRK-27032023-min.jpg",
    "https://assets.nextleap.app/image/eyJidWNrZXQiOiJuZXh0bGVhcC1zdGF0aWMtYXNzZXRzIiwia2V5IjoiaW1hZ2VzL0xvZ29mcmFtZS0xNS02NGZjNWQ2Yi1kZjJlLTQ3NmMtOGM0Ny02ODNlNWRhODdkZTIucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4MDUuODc1LCJoZWlnaHQiOjI0MS41LCJmaXQiOiJjb3ZlciIsIndpdGhvdXRFbmxhcmdlbWVudCI6dHJ1ZX0sInJvdGF0ZSI6bnVsbH19",    
];



const PlacementPartners = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [initialCount, setInitialCount] = useState(15);
    
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
                                    delay: isExpanded ? Math.max(0, (idx - initialCount) * 0.05) : idx * 0.05,
                                    ease: "easeOut"
                                }}
                                className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 aspect-[1.8/1] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 group"
                            >
                                <img 
                                    src={logo} 
                                    alt="Partner Logo" 
                                    loading="lazy"
                                    className="max-h-full max-w-full object-contain transition-all duration-700 scale-90 group-hover:scale-100" 
                                />
                            </motion.div>
                        ))}
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
