import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const DirectorProfile = () => {
    return (
        <section className="relative w-full py-24 md:py-32 bg-[#f3f3f3] text-slate-900 border-y border-slate-300 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full mix-blend-multiply pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full mix-blend-multiply pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Section Header */}
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-300 pb-8">
                    <div>
                        <span className="block text-primary font-mono text-[10px] md:text-xs tracking-widest uppercase mb-4">Leadership</span>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                            The Vision <br />
                            <span className="text-slate-400 italic font-serif font-light">Behind ICCVS</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                    
                    {/* Image Column */}
                    <div className="lg:col-span-5 relative group">
                        {/* Decorative Frame */}
                        <div className="absolute -inset-4 md:-inset-6 border border-slate-300 rounded-[2rem] md:rounded-[3rem] -z-10 bg-white shadow-sm transform rotate-3 group-hover:rotate-1 transition-transform duration-700"></div>
                        
                        <div className="relative aspect-[3/4] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl">
                            {/* Replace src with actual image path or URL later */}
                            <img 
                                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800" 
                                alt="Director Profile" 
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                            />
                            {/* Inner Shadow overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                            
                            {/* Overlay Text */}
                            <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-1 drop-shadow-md">Mr. Sunjey Aggarwal</h3>
                                <p className="text-primary font-mono text-sm uppercase tracking-widest font-bold">Founder & CEO</p>
                            </div>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <div className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-sm border border-slate-200 relative">
                            {/* Quote Icon Background */}
                            <div className="absolute top-8 right-8 text-8xl leading-none font-serif text-slate-100 font-black opacity-50 select-none pointer-events-none">"</div>
                            
                            <h4 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-tight max-w-2xl relative z-10 italic">
                                "Design is not just what it looks like and feels like. Design is how it works and impacts the world."
                            </h4>
                            
                            <div className="space-y-6 text-slate-600 font-light text-lg md:text-xl leading-relaxed relative z-10">
                                <p>
                                    As the driving force behind ICCVS, Mr. Aggarwal envisioned an ecosystem where raw creative talent could be nurtured into global professional excellence. His leadership has transformed ICCVS into a premier institution recognized across the design industry.
                                </p>
                                <p>
                                    With decades of experience bridging the gap between academia and industry requirements, he has established a curriculum that doesn't just teach design, but engineers future industry leaders.
                                </p>
                            </div>

                            {/* Signature / Decorative line */}
                            <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between">
                                <div className="text-xl font-serif italic text-slate-400">
                                    Sunjey Aggarwal
                                </div>
                                <button className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary hover:text-[#a61517] transition-colors group">
                                    Read Full Profile <ArrowUpRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default DirectorProfile;
