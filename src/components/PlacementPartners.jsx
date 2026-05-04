import React from 'react';
import { Briefcase } from 'lucide-react';

const hospitalityLogos = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAX7Ow-fSUhmokgxv7oaSro64M9jvc8HUF0Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjUH1hztAFRWTyksVVs_CFrBzHf2owI8W2LQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3TxPlGqVOdOL002MJD9c7BL8DGLa4uKKOOQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_nWesvifBQzPWizRVQabKLRaSdk98t9wt7A&s",
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
];

const PlacementPartners = () => {
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
        <div className="pt-8 md:pt-20 space-y-8 md:space-y-12 w-full overflow-hidden">
            <div className="space-y-4 md:space-y-6">
                <div className="flex items-center justify-start gap-2 px-4 mb-12 md:mb-16">
                    <span className="text-clamp-xl font-bold text-slate-800 tracking-tight">Placement & Training Partners</span>
                </div>
                <div className="relative flex overflow-hidden scroller group">
                    <div className="flex animate-marquee scroller whitespace-nowrap gap-3 md:gap-4 py-2 md:py-4 pr-2 md:pr-2 pointer-events-auto">
                        {hospitalityLogos.map((logo, i) => (
                            <LogoCard key={`h1-${i}`} logo={logo} />
                        ))}
                    </div>
                    <div className="flex animate-marquee scroller whitespace-nowrap gap-3 md:gap-4 py-2 md:py-4 pr-2 md:pr-2 pointer-events-auto">
                        {hospitalityLogos.map((logo, i) => (
                            <LogoCard key={`h2-${i}`} logo={logo} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlacementPartners;
