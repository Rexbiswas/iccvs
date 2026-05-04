import React from 'react';
import { Palette } from 'lucide-react';
import { motion } from 'framer-motion';

const fashionLogos = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaD24vay_jTexDQFlC7WcCwUKLfABsLq7Mxg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOZ9NYd0ET0u7rmr-IYI0j4dkTbDYwQnEL0w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOUScvNv7C9KjvolThJ-fcj4IfvxSP8-m1Ig&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfp9UQE8vWcX8g8W1ik-1S5PhWyrwTt3Jj0Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAVXoy4-M6CZEADkAg3EKtGTrBZh8Xn5ZeDg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi4adrv8AqJDPhunb3_km2idzotwLuroAWHw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkD7P83txvJ2sKJ9R5N_-qmQw94coPUq8J5A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAX7Ow-fSUhmokgxv7oaSro64M9jvc8HUF0Q&s"
];

const TrainingPartners = () => {
    const LogoCard = ({ logo }) => (
        <div className="flex items-center justify-center min-w-[140px] md:min-w-[200px] h-16 md:h-24 transition-all group">
            <img
                src={logo}
                alt="Partner Logo"
                className="h-full w-auto max-w-[100px] md:max-w-[160px] object-contain opacity-70 group-hover:opacity-100 transition-all duration-300"
            />
        </div>
    );

    return (
        <section className="w-full bg-white py-8 md:py-12 overflow-hidden border-b border-slate-100">
            <div className="container mx-auto">
                <div className="space-y-4 md:space-y-6">
                    <div className="flex items-center justify-center gap-2 opacity-50 px-4">
                        <Palette size={10} className="text-slate-400 md:w-3 md:h-3" />
                        <span className="text-[14px] md:text-[20px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">Placement & Training Partners</span>
                    </div>
                    <div className="relative flex overflow-hidden scroller group">
                        <div className="flex animate-marquee-reverse scroller whitespace-nowrap gap-3 md:gap-4 py-2 md:py-4 pr-3 md:pr-4 pointer-events-auto">
                            {fashionLogos.map((logo, i) => (
                                <LogoCard key={`f1-${i}`} logo={logo} />
                            ))}
                        </div>
                        <div className="flex animate-marquee-reverse scroller whitespace-nowrap gap-3 md:gap-4 py-2 md:py-4 pr-3 md:pr-4 pointer-events-auto">
                            {fashionLogos.map((logo, i) => (
                                <LogoCard key={`f2-${i}`} logo={logo} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrainingPartners;
