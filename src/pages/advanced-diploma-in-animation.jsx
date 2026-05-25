import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Home, Rocket, Sparkles, Clock, Film, Star } from 'lucide-react';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

const AdvancedDiplomaInAnimation = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-primary selection:text-white">
            <SEO
                title="Advanced Diploma in Animation | Coming Soon | INSD"
                description="Advanced Diploma in Animation launching soon at INSD. Join the future of character animation, motion design, and cinematic storytelling."
                keywords="advanced diploma animation, animation course coming soon, INSD animation diploma, animation school"
            />

            <main className="relative overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/4 h-96 w-96 rounded-full bg-linear-to-br from-primary/30 to-violet-500/0 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-linear-to-tl from-secondary/20 to-transparent blur-3xl" />

                <section className="relative z-10 pt-28 pb-16 px-6 sm:px-8 lg:px-12">
                    <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-[1.1fr_.9fr] items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-primary shadow-sm shadow-primary/10">
                                <Sparkles size={16} /> Coming Soon
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-tight">
                                Advanced Diploma <span className="text-primary">in Animation</span>
                            </h1>

                            <p className="max-w-2xl text-lg text-slate-300 leading-relaxed">
                                A future-ready animation programme for storytellers, motion artists, and CG creators. Launching soon with immersive studio labs, character-driven pipelines, and industry mentorship.
                            </p>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <button
                                    onClick={() => navigate('/')}
                                    className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-7 py-4 text-sm font-black uppercase tracking-[0.25em] text-slate-950 transition hover:bg-primary/90 shadow-2xl shadow-primary/25"
                                >
                                    <Home size={16} /> Back to Home
                                </button>

                                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <Clock size={18} />
                                        <span className="text-sm uppercase tracking-[0.25em]">Launching Q4 2026</span>
                                    </div>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                                        Find the complete course launch details on the home page while we prepare the full programme.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-4xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
                            <div className="flex items-center justify-between gap-4 mb-8">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Program Snapshot</p>
                                    <h2 className="mt-4 text-3xl font-black text-white">Premium Animation Journey</h2>
                                </div>
                                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                                    <Rocket size={28} />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="rounded-3xl bg-slate-950/80 p-6 border border-white/10">
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">What to expect</p>
                                    <ul className="mt-5 space-y-3 text-sm text-slate-300">
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" />
                                            Character Animation & Acting
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" />
                                            3D Pipeline, Lighting & Visual Effects
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-primary" />
                                            Motion Design, FX, and Storyboarding
                                        </li>
                                    </ul>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-3xl bg-white/5 p-5 border border-white/10">
                                        <div className="flex items-center gap-3 text-primary">
                                            <Film size={18} />
                                            <span className="text-xs uppercase tracking-[0.35em] font-bold">Studio Sessions</span>
                                        </div>
                                        <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                                            Hands-on labs with industry workflows and cinematic production briefs.
                                        </p>
                                    </div>
                                    <div className="rounded-3xl bg-white/5 p-5 border border-white/10">
                                        <div className="flex items-center gap-3 text-primary">
                                            <Star size={18} />
                                            <span className="text-xs uppercase tracking-[0.35em] font-bold">Creative Outcomes</span>
                                        </div>
                                        <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                                            Build showreels, portfolio films, and motion pieces that stand out.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 rounded-3xl bg-slate-950/90 p-6 border border-white/10">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Ready for launch</p>
                                        <p className="mt-2 text-xl font-black text-white">See updates on Home</p>
                                    </div>
                                    <button
                                        onClick={() => navigate('/')}
                                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-slate-950 transition hover:bg-primary/90"
                                    >
                                        <span>Back Home</span>
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AdvancedDiplomaInAnimation;
