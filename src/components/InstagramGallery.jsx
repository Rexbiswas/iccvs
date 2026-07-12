import React, { useRef, useLayoutEffect } from 'react';
import { Instagram, ArrowUpRight, Heart, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const instaPosts = [
    {
        id: 1,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdy7wo3bQ63AsnxuZlamIumVTLn8gqw__Q3Q&s",
        likes: "1.2k",
        comments: "45",
        caption: "Republic Day Celebrations at ICCVS Campus! 🇮🇳 #ICCVS #Design"
    },
    {
        id: 2,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSrr7CohqMKyqJ2cBsvXBrS6s2jhHf9Mx_A&s",
        likes: "856",
        comments: "22",
        caption: "Top 5 Interior Design Trends for 2026. #InteriorDesign"
    },
    {
        id: 3,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGlaUJeum3Eh9-B4crMnq7dVLW63RBMLSrcQ&s",
        likes: "2.5k",
        comments: "108",
        caption: "Fashion Week Highlights. Our students rocked the runway! 💃",
        featured: true // Big card
    },
    {
        id: 4,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJFKi_ffsGneKKQ7-cR9Vns_FecPer3h55Yw&s",
        likes: "943",
        comments: "34",
        caption: "Artistry in motion. Graphic Design workshop results."
    },
    {
        id: 5,
        img: "https://insdnanded.com/wp-content/uploads/2024/05/IMG_2380-1-scaled.webp",
        likes: "1.5k",
        comments: "56",
        caption: "Student Spotlight: Aravind's sustainable collection."
    },
    {
        id: 6,
        img: "https://iccvs.edu.in/wp-content/uploads/sb-instagram-feed-images/326394436_5758005604315310_2132658014813759388_nfull.jpg",
        likes: "3.1k",
        comments: "210",
        caption: "ICCVS x ESG Luxe Partnership Announcement! 🚀",
        featured: true // Wide card
    },
    {
        id: 7,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH0llxOq8Sv6hRvOjP1A2SJdcZNvnq_3B__A&s",
        likes: "720",
        comments: "18",
        caption: "Campus Life: Creativity has no boundaries."
    },
    {
        id: 8,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_IS8eemcMtrXlQrT5OgSebH-Ef7guy9P-2g&s",
        likes: "1.1k",
        comments: "42",
        caption: "Admissions Open for 2026 Batch. Apply Now!"
    }
];

const InstagramGallery = () => {
    const containerRef = useRef(null);
    const cursorRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            // 1. Entrance Animation - Scattered to Grid
            const cards = gsap.utils.toArray('.insta-card');
            gsap.from(cards, {
                y: 200,
                opacity: 0,
                rotate: () => gsap.utils.random(-15, 15),
                scale: 0.8,
                stagger: 0.1,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    end: "bottom 90%",
                    toggleActions: "play none none reverse"
                }
            });

            // 2. Parallax Hover Effect via MouseMove
            const handleMouseMove = (e) => {
                const { clientX, clientY } = e;
                const x = (clientX / window.innerWidth - 0.5) * 20;
                const y = (clientY / window.innerHeight - 0.5) * 20;

                // Move cards slightly for parallax
                gsap.to(cards, {
                    x: (i) => x * (i % 2 === 0 ? 1 : -1), // Alternate direction
                    y: (i) => y * (i % 3 === 0 ? 1 : -1),
                    duration: 1,
                    ease: "power2.out"
                });

                // Custom Cursor Follow
                if (cursorRef.current) {
                    gsap.to(cursorRef.current, {
                        x: e.clientX,
                        y: e.clientY,
                        duration: 0.2,
                        ease: "power2.out"
                    });
                }
            };

            window.addEventListener('mousemove', handleMouseMove);

            return () => window.removeEventListener('mousemove', handleMouseMove);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative bg-[#f3f3f3] text-slate-900 min-h-screen py-32 overflow-hidden border-y border-slate-300">

            {/* Custom Cursor */}
            <div ref={cursorRef} className="fixed top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-[20px] pointer-events-none z-50 mix-blend-multiply -translate-x-1/2 -translate-y-1/2 border border-primary/20 flex items-center justify-center opacity-0 md:opacity-100 transition-opacity">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-multiply pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] mix-blend-multiply rounded-full pointer-events-none"></div>

            {/* Header */}
            <div className="container mx-auto px-6 mb-24 relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div>
                    <h4 className="flex items-center gap-3 text-primary font-mono tracking-widest uppercase text-sm mb-4">
                        <Instagram className="w-5 h-5" />
                        @INSD_OFFICIAL
                    </h4>
                    <h2 className="text-clamp-3xl font-black uppercase tracking-tighter leading-[0.9] text-slate-900">
                        Life On <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">The Feed</span>
                    </h2>
                </div>
                <a 
                    href="https://www.instagram.com/insd_official" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Follow us on Instagram"
                    className="group flex items-center gap-4 px-8 py-4 bg-white border border-slate-300 rounded-full hover:shadow-xl hover:border-primary/30 hover:text-primary transition-all duration-300"
                >
                    <span className="font-bold tracking-widest uppercase text-sm">Follow Us</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </a>
            </div>

            {/* Bento Grid Gallery */}
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 auto-rows-[200px] md:auto-rows-[300px]">

                    {instaPosts.map((post) => (
                        <div
                            key={post.id}
                            className={`insta-card group relative bg-white rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer border border-slate-200 shadow-sm hover:shadow-2xl transition-shadow duration-500
                                ${post.featured ? 'col-span-2 row-span-2 md:col-span-2 md:row-span-2' : 'col-span-1 row-span-1 md:col-span-1 md:row-span-1'}
                            `}
                        >
                            {/* Image */}
                             <img
                                src={post.img}
                                alt={post.caption}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                                decoding="async"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-6 backdrop-blur-sm">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <Heart className="w-6 h-6 fill-white text-white" />
                                        <span className="font-bold">{post.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MessageCircle className="w-6 h-6 fill-white text-white" />
                                        <span className="font-bold">{post.comments}</span>
                                    </div>
                                </div>
                                <p className="text-center px-8 text-sm font-medium opacity-90 line-clamp-2 max-w-xs text-white">{post.caption}</p>
                                <a 
                                    href="https://www.instagram.com/insd_official" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    aria-label={`View Instagram post: ${post.caption}`}
                                    className="px-6 py-2 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full hover:scale-105 hover:shadow-lg transition-transform"
                                >
                                    View Post
                                </a>
                            </div>

                            {/* Instagram Icon Watermark */}
                            <Instagram className="absolute top-4 right-4 text-white/80 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-sm" />
                        </div>
                    ))}

                </div>
            </div>

            {/* Floating 'Stories' Ring Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] border border-slate-300/50 rounded-full pointer-events-none animate-[spin_60s_linear_infinite]"></div>

        </div>
    );
};

export default InstagramGallery;
