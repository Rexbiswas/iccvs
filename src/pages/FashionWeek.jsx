import React, { useRef, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const FashionWeek = () => {
  const containerRef = useRef(null);
  const galleryRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
        // Parallax horizontal gallery
        const pinWrap = galleryRef.current;
        if (pinWrap) {
          let pinWrapWidth = pinWrap.scrollWidth;
          let horizontalScrollLength = pinWrapWidth - window.innerWidth;

          gsap.to(pinWrap, {
            scrollTrigger: {
              scrub: 1,
              trigger: "#gallery-trigger",
              pin: true,
              start: "center center",
              end: () => "+=" + horizontalScrollLength,
              invalidateOnRefresh: true
            },
            x: () => -horizontalScrollLength,
            ease: "none"
          });
        }

        // Text Reveal
        gsap.fromTo('.reveal-text', 
          { opacity: 0, y: 50 },
          { scrollTrigger: {
              trigger: ".manifesto-section",
              start: "top 70%"
            },
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            stagger: 0.2, 
            ease: "power3.out" 
          }
        );
    }, containerRef); // Scope to containerRef

    return () => ctx.revert(); // Revert completely on unmount
  }, []);

  return (
    <div ref={containerRef} className="bg-[#f3f3f3] min-h-screen text-slate-900 overflow-hidden relative font-sans">
      <SEO 
          title="INSD Fashion Week - Haute Couture & Avant Garde Runway"
          description="Experience the pinnacle of fashion at INSD Fashion Week. Explore avant-garde collections, street luxury, and sustainable couture from the next generation of global designers."
          keywords="INSD fashion week, runway show India, fashion design collection, haute couture runway, sustainable fashion show"
      />
      {/* Noise overlay for premium raw vibe */}
      <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2000&auto=format&fit=crop" alt="Fashion Show Background" className="w-full h-full object-cover opacity-30 scale-105 origin-center animate-[pulse_10s_ease-in-out_infinite]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f3f3f3]/80 to-[#f3f3f3] opacity-100"></div>
        </div>

        <div className="relative z-10 text-center flex flex-col items-center">
            <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className="mb-6"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border border-slate-300 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-slate-500 text-xs md:text-sm tracking-widest uppercase font-bold">Est 2026</span>
              </div>
            </motion.div>
            <motion.h1 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
                className="text-[14vw] md:text-[10vw] leading-[0.85] font-black tracking-tighter uppercase font-serif text-slate-900"
            >
              INSD
            </motion.h1>
            <motion.h2 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
                className="text-[6vw] md:text-[3vw] leading-none font-light tracking-[0.4em] uppercase text-slate-500 mt-4 md:mt-2"
            >
              Fashion Week
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-12 text-xs md:text-sm uppercase tracking-[0.3em] font-bold border border-slate-300 text-slate-700 px-8 py-3 hover:bg-slate-900 hover:text-[#f3f3f3] hover:border-slate-900 transition-all duration-500 cursor-pointer"
            >
              Discover the Collection
            </motion.p>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="manifesto-section py-32 md:py-48 px-6 md:px-20 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32">
        <div className="w-full md:w-1/4 pt-4">
          <h3 className="text-slate-400 text-sm uppercase tracking-[0.2em] font-bold mb-4 reveal-text">The Manifesto</h3>
          <div className="w-full h-[1px] bg-slate-200 reveal-text"></div>
        </div>
        <div className="w-full md:w-3/4">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-light leading-[1.15] tracking-tight text-slate-900 reveal-text font-serif">
            Fashion isn't just clothing.<br /> <span className="text-slate-400 italic">It's a statement, an attitude, and a vision of what's happening now.</span>
          </h2>
          <p className="mt-12 md:max-w-2xl text-slate-500 text-lg md:text-xl font-light leading-relaxed reveal-text">
            INSD presents the avant-garde pioneers of the global fashion industry. Breaking boundaries, setting unprecedented trends, and completely reimagining the landscape of modern luxury design.
          </p>
        </div>
      </section>

      {/* Horizontal Runway Scroll */}
      <section id="gallery-trigger" className="h-[150dvh] md:h-[150vh] w-full bg-[#f3f3f3] relative">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
            <div className="pl-6 md:pl-20 mb-10 w-full relative z-20 pointer-events-none">
                 <h2 className="text-5xl md:text-8xl font-serif text-slate-900/5 uppercase tracking-tighter">The Runway</h2>
            </div>
            <div ref={galleryRef} className="flex gap-10 px-6 md:px-20 h-[50vh] md:h-[65vh] items-center w-[max-content] pb-10">
                {[
                    { id: 1, img: "https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=1000", title: "Avant Garde", desc: "Abstract shapes and futuristic materials." },
                    { id: 2, img: "https://images.unsplash.com/photo-1509631179647-0c114ee3c235?q=80&w=1000", title: "Street Luxury", desc: "Where urban meets high-end tailoring." },
                    { id: 3, img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000", title: "Minimalist", desc: "Elegance defined by absence." },
                    { id: 4, img: "https://images.unsplash.com/photo-1550614000-4b95d4ebf0b8?q=80&w=1000", title: "Haute Couture", desc: "Bespoke craftsmanship at its peak." },
                    { id: 5, img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000", title: "Sustainable", desc: "Eco-friendly fabrics, timeless designs." },
                ].map((item) => (
                    <div key={item.id} className="relative h-full w-[80vw] md:w-[30vw] shrink-0 group overflow-hidden bg-slate-100 border border-slate-200">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-8 left-8 right-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                            <span className="inline-block py-1 px-3 border border-white/20 text-white/70 text-[10px] uppercase tracking-widest font-bold mb-4 backdrop-blur-md">Collection '26</span>
                            <h4 className="text-3xl md:text-4xl text-white font-serif">{item.title}</h4>
                            <p className="text-xs md:text-sm text-zinc-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Footer Teaser */}
      {/* --- INDUSTRY STANDARDS --- */}
      <section className="py-24 md:py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">The Showcase Protocol</span>
              <h2 className="text-5xl md:text-8xl font-black text-slate-900 uppercase tracking-tighter leading-none">Global <br /> <span className="text-slate-300">Standards</span></h2>
            </div>
            <p className="max-w-xs text-slate-500 text-sm leading-relaxed mb-2 font-light italic">
              Production excellence that rivals the elite runways of Paris and Milan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Curation", desc: "Rigorous designer selection process ensuring only the most innovative and technical collections hit the runway." },
              { title: "Production", desc: "Cinematic lighting, immersive soundscapes, and state-of-the-art stage engineering for maximum impact." },
              { title: "Press & Media", desc: "Direct exposure to global fashion editors, influencers, and industry buyers from around the world." },
            ].map((std, i) => (
              <div key={i} className="space-y-6">
                <div className="w-12 h-[1px] bg-primary" />
                <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{std.title}</h4>
                <p className="text-slate-500 font-light leading-relaxed text-sm">{std.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PARTICIPATION PATHS (Image UI Style) --- */}
      <section className="py-24 md:py-40 bg-[#f9f9f9] border-y border-slate-200">
        <div className="container mx-auto px-6 flex flex-col md:flex-row gap-20">
          <div className="md:w-1/2">
            <h2 className="text-5xl md:text-7xl font-black text-slate-950 uppercase tracking-tighter leading-none mb-10">Participation <br /> <span className="text-primary italic">Paths</span></h2>
            <p className="text-slate-500 max-w-sm font-light">Whether you are a creator, a performer, or a strategist, there is a place for your vision on our stage.</p>
          </div>
          <div className="md:w-1/2 space-y-6">
            {[
              { label: "Designer Showcase", active: true },
              { label: "Modeling Cohort", active: false },
              { label: "Backstage Production", active: false },
              { label: "Styling & Makeup Crew", active: false },
              { label: "Fashion Journalism", active: false },
            ].map((path, i) => (
              <div key={i} className="flex items-center group cursor-pointer">
                <div className={`h-[2px] transition-all duration-500 ${path.active ? 'w-24 bg-primary' : 'w-0 bg-slate-300 group-hover:w-12'}`} />
                <span className={`text-2xl md:text-4xl font-bold uppercase tracking-tighter transition-all duration-300 ml-4 ${path.active ? 'text-primary' : 'text-slate-400 group-hover:text-slate-900'}`}>{path.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GLOBAL OPPORTUNITIES --- */}
      <section className="py-24 md:py-40 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 blur-3xl bg-primary/20 -translate-y-1/2 rounded-full" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">Career <br /> <span className="text-transparent stroke-text-white">Impact</span></h2>
              <p className="text-white/40 text-lg font-light leading-relaxed max-w-lg mb-12">Participating in INSD Fashion Week isn't just a highlight on your resume; it's a launchpad for your global career.</p>
              <div className="flex flex-wrap gap-8">
                <div>
                  <span className="block text-4xl font-black">500+</span>
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Industry Guests</span>
                </div>
                <div>
                  <span className="block text-4xl font-black">10M+</span>
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Digital Reach</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { role: "Brand Founder", impact: "Direct Launch" },
                { role: "Creative Director", impact: "Portfolio Boost" },
                { role: "Show Strategist", impact: "Technical Exp" },
                { role: "Social Influencer", impact: "Max Exposure" },
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  <h4 className="text-xl font-bold uppercase tracking-tighter mb-2">{item.role}</h4>
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">{item.impact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- EXTRA DISCOVERY MODULE --- */}
      <section className="pb-40 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                step: "01", 
                title: "Inspiration", 
                desc: "Where global trends meet personal vision. Students research and conceptualize their avant-garde themes.",
                img: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800"
              },
              { 
                step: "02", 
                title: "Fabrication", 
                desc: "The technical translation. From pattern making to manual draping and specialized textile engineering.",
                img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800"
              },
              { 
                step: "03", 
                title: "Fittings", 
                desc: "Precision adjustments with global models to ensure every silhouette matches the original editorial vision.",
                img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800"
              },
              { 
                step: "04", 
                title: "Showcase", 
                desc: "The final walk. Professional production, global PR exposure, and industrial recognition.",
                img: "https://images.unsplash.com/photo-1509631179647-0c114ee3c235?q=80&w=800"
              }
            ].map((box, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl aspect-[4/5] bg-slate-100"
              >
                <img src={box.img} alt={box.title} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-all duration-[1s]" />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <span className="text-4xl font-black text-white/20 select-none">{box.step}</span>
                  <div>
                    <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">{box.title}</h4>
                    <p className="text-white/60 text-xs font-medium leading-relaxed uppercase tracking-widest">{box.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FashionWeek;
