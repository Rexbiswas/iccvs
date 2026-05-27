import React from 'react';

const CoFoundingVisionary = () => {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-slate-950 text-white relative overflow-hidden border-t border-white/10">
            {/* Atmospheric Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-35 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/15 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-7 space-y-8">
                        <span className="inline-block px-5 py-2 rounded-full border border-white/10 text-white/50 font-black uppercase tracking-[0.4em] text-[10px] bg-white/5">
                            Co-Founding Visionary
                        </span>
                        
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight text-white">
                            L V Saptharishi
                        </h2>

                        <div className="inline-flex flex-col border-l-2 border-primary pl-6 py-1">
                            <span className="text-primary font-black uppercase text-sm tracking-wider">
                                Co-Founder, INSD
                            </span>
                            <span className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1.5 leading-relaxed">
                                Retd. IAS Officer & Former Director General NIFT, India
                            </span>
                        </div>

                        <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed italic font-serif max-w-2xl">
                            "Retd. IAS Officer, Former-Director General NIFT, India, The visionary who conceived the idea that design education should be accessible in every town and city of India"
                        </p>
                    </div>

                    <div className="lg:col-span-5 relative flex justify-center">
                        <div className="w-full max-w-sm aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-900 border border-white/10 p-8 flex flex-col justify-between shadow-2xl relative group">
                            <img 
                                src="https://static.toiimg.com/thumb/msid-50880462,imgsize-11984,width-400,resizemode-4/50880462.jpg"
                                alt="L V Saptharishi"
                                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-[2s] pointer-events-none"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90 z-10" />
                            
                            <div className="relative z-20">
                                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                    </svg>
                                </div>
                            </div>

                            <div className="relative z-20 text-right space-y-2">
                                <span className="block text-[10px] font-black uppercase tracking-widest text-primary">National Impact</span>
                                <span className="block text-2xl font-black text-white uppercase tracking-tight">Democratizing Design</span>
                                <span className="block text-xs font-bold text-white/50 uppercase tracking-widest leading-relaxed">Accessible Education Across India</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoFoundingVisionary;
