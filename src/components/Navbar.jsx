import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import SocialIcons from './SocialIcons';
import {
    Menu as MenuIcon, X, ArrowRight, Home, Sparkles, GraduationCap, LayoutGrid, User,
    Search, Folder, Users, CreditCard, Box, HelpCircle, LogOut, ChevronLeft, ChevronsLeft, Store,
    Phone, Calendar, UserPlus, FileDown, Instagram, Linkedin, Facebook, MapPin, Mail, MessageSquare, Globe, BookOpen, Youtube
} from 'lucide-react';
import gsap from 'gsap';
import { Sidebar, Menu, MenuItem, Submenu, Logo } from "react-mui-sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BusinessIcon from "@mui/icons-material/Business";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const RollerLink = ({ to, children, colorClass = "text-primary", baseTextClass = "text-slate-800" }) => {
    return (
        <Link to={to} className="relative block h-[24px] group overflow-hidden">
            <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
                <span className={`flex items-center justify-center h-[24px] text-[10px] lg:text-[11px] xl:text-xs 2xl:text-[13px] font-bold ${baseTextClass} uppercase tracking-wider whitespace-nowrap transition-all duration-300 leading-none px-1`}>
                    {children}
                </span>
                <span className={`flex items-center justify-center h-[24px] text-[10px] lg:text-[11px] xl:text-xs 2xl:text-[13px] font-bold uppercase tracking-wider whitespace-nowrap ${colorClass} transition-all duration-300 leading-none px-1`}>
                    {children}
                </span>
            </div>
        </Link>
    );
};

import { useRegisterModal } from '../context/RegisterModalContext';
import { useAdmissionModal } from '../context/AdmissionModalContext';
import { useAuth } from '../context/AuthContext';

const RegisterButton = ({ className = "", isDarkTheme = false, isScrolled = false, theme = null }) => {
    const { openAdmissionModal } = useAdmissionModal();
    const [isHovered, setIsHovered] = useState(false);
    // If theme is 'dark', it's forced dark. If 'light', forced light. Otherwise dynamic.
    const isLightMode = theme === 'dark' ? false : theme === 'light' ? true : (!isDarkTheme || isScrolled);

    return (
        <button
            onClick={() => openAdmissionModal()}
            className={`group relative overflow-hidden shadow-lg transition-all duration-300 rounded-full ${isLightMode ? 'bg-slate-900/5 border-slate-900/10' : 'bg-white/10 hover:bg-white/20 border-white/20'} backdrop-blur-xl border ${className} flex items-center justify-center`}
        >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

            {/* Shimmer Effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover:animate-shimmer" />
            </div>

            {/* Glowing Border Animation */}
            <div className="absolute inset-0 border border-white/20 group-hover:border-primary/50 rounded-full transition-colors duration-500" />

            {/* Outer Glow Halo */}
            <div className="absolute -inset-[2px] bg-linear-to-r from-primary to-secondary rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
        </button>
    );
};

const Navbar = () => {
    const { openModal } = useRegisterModal();
    const { openAdmissionModal } = useAdmissionModal();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [expandedItem, setExpandedItem] = useState(null);
    const [expandedSubItem, setExpandedSubItem] = useState(null);
    const { scrollY } = useScroll();
    const location = useLocation();

    const navigate = useNavigate();
    // Pages that have a dark background/theme or high-impact gradient hero sections
    // Updated detection: Pages with permanent dark themes or sections
    const darkPages = [
        '/apply', 
        '/insd-360/blog',
        '/entrepreneur',
        '/courses/fashion-designing',
        '/courses/interior-designing',
        '/courses/graphic-designing',
        '/courses/animation-and-vfx',
        '/courses/jewellery-designing',
        '/courses/uiux-designing',
        '/courses/beauty-and-makeup',
        '/courses/photography',
        '/courses/textile-designing'
    ];
    const [isHeaderDark, setIsHeaderDark] = useState(darkPages.includes(location.pathname));

    // GSAP SVG Animation REfs
    const svgRef = useRef(null);
    const pathRef = useRef(null);

    // Scroll values
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const checkColor = () => {
            const currentScroll = window.scrollY;
            setIsScrolled(currentScroll > 20);

            const is404 = document.body.classList.contains('is-404-page');

            if (location.pathname === '/') {
                setIsHeaderDark(currentScroll > 1200 && currentScroll < 4000);
            } else if (is404) {
                setIsHeaderDark(true);
            } else if (darkPages.includes(location.pathname)) {
                setIsHeaderDark(currentScroll < 500);
            } else {
                setIsHeaderDark(false);
            }
        };

        // Reset state on route change before attaching listener
        setIsScrolled(window.scrollY > 20);
        checkColor();

        window.addEventListener('scroll', checkColor);
        return () => window.removeEventListener('scroll', checkColor);
    }, [location.pathname]);
    // Responsive check
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        return scrollY.on("change", (latest) => {
            setIsScrolled(latest > 50);
        });
    }, [scrollY]);

    // Scroll animations - using direct scrollY for instant responsiveness
    const scrollProgress = scrollY;
    const transitionRange = [0, 50]; // Quicker transition range

    const navWidth = useTransform(scrollProgress, transitionRange, ["100%", "100%"]);
    const navTop = useTransform(scrollProgress, transitionRange, ["0px", "0px"]);
    const navRadius = useTransform(scrollProgress, transitionRange, ["0px", "0px"]);

    // Frosted Glass Effect Transformations
    const navBackground = useTransform(scrollProgress, transitionRange, ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.75)"]);
    const navBackdrop = useTransform(scrollProgress, transitionRange, ["blur(0px) saturate(100%)", "blur(25px) saturate(180%)"]);
    const navBorderColor = useTransform(scrollProgress, transitionRange, ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.4)"]);
    const navShadow = useTransform(scrollProgress, transitionRange, ["none", "0 10px 40px -10px rgba(0, 0, 0, 0.1)"]);

    // Mobile Dynamic Island Animations
    const mobileWidth = useTransform(scrollProgress, transitionRange, ["100%", "100%"]);
    const mobileHeight = useTransform(scrollProgress, transitionRange, ["72px", "72px"]);
    const mobileTop = useTransform(scrollProgress, transitionRange, ["0px", "0px"]);
    const mobileRadius = useTransform(scrollProgress, transitionRange, ["0px", "0px"]);
    const mobileBackground = useTransform(scrollProgress, transitionRange, ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.4)"]);
    const mobileBackdrop = useTransform(scrollProgress, transitionRange, ["blur(0px) saturate(100%)", "blur(20px) saturate(180%)"]);
    const mobileShadow = useTransform(scrollProgress, transitionRange, ["none", "0 10px 25px -5px rgba(0, 0, 0, 0.1)"]);
    const mobileBorder = useTransform(scrollProgress, transitionRange, ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.4)"]);

    const navRef = useRef(null);
    const mobileNavRef = useRef(null);



    const menuItems = [
        { title: 'Dashboard', path: '/', icon: LayoutGrid, section: 'OVERVIEW' },
        {
            title: 'About INSD',
            path: '/about-us',
            icon: Folder,
            section: 'OVERVIEW',
            subItems: [
                { title: 'About Us Overview', path: '/about-us', icon: 'info', desc: 'Discover our mission & values' },
                { title: '15 Years Legacy', path: '/15-years-legacy', icon: 'zap', desc: 'Our national award-winning history' },
                { title: 'Mentors', path: '/mentors', icon: 'users', desc: 'Expert creative leadership' },
                { title: 'Center Across India', path: '/centers-across-india', icon: 'trending-up', desc: 'Our regional network' },
                { title: 'Paris Project', path: '/insd-360/paris-project', icon: 'globe', desc: 'International design showcase', badge: 'Featured' }
            ]
        },
        {
            title: 'Our Courses',
            path: '/courses',
            icon: GraduationCap,
            section: 'OVERVIEW',
            subItems: [
                { title: 'Fashion Designing', path: '/courses/fashion-designing', icon: 'fashion', desc: 'Couture & Apparel Design' },
                { title: 'Interior Designing', path: '/courses/interior-designing', icon: 'interior', desc: 'Spatial & Interior Styling' },
                { title: 'Graphic Designing', path: '/courses/graphic-designing', icon: 'graphic', desc: 'Visual Branding & Media' },
                { title: 'Animation & VFX', path: '/courses/animation-and-vfx', icon: 'animation', desc: '3D Motion & Visual Effects' },
                { title: 'Jewellery Designing', path: '/courses/jewellery-designing', icon: 'jewellery', desc: 'Gems & Jewelry Craft' },
                { title: 'UI/UX Design', path: '/courses/uiux-designing', icon: 'uiux', desc: 'User Experience & Interface' },
                { title: 'Beauty & Makeup', path: '/courses/beauty-and-makeup', icon: 'beauty', desc: 'Professional Esthetics' },
                { title: 'Photography', path: '/courses/photography', icon: 'photography', desc: 'Visual Storytelling Art' },
                { title: 'Textile Design', path: '/courses/textile-designing', icon: 'textile', desc: 'Material Science Arts' },
                { title: 'INSD Luxe', path: '/courses/msc-luxury-brand-management', icon: 'sparkles', desc: 'Premium Luxury Arts', badge: 'New' }
            ]
        },
        { title: 'Admissions', path: '/apply', icon: CreditCard, section: 'OVERVIEW' },
        { title: 'Franchise', path: '/franchise', icon: Store, section: 'OVERVIEW' },
        {
            title: 'Careers & Exposure',
            path: '/placement',
            icon: Sparkles,
            section: 'OVERVIEW',
            subItems: [
                { title: 'Life at INSD', path: '/student', icon: 'users', desc: 'Campus life & community' },
                { title: 'Placements', path: '/placement', icon: 'briefcase', desc: 'Career opportunities' },
                { title: 'Entrepreneurs', path: '/entrepreneur', icon: 'zap', desc: 'Startup incubation' },
                { title: 'Industry Visits', path: '/industry-potential', icon: 'map-pin', desc: 'Real-world exposure' },
                { title: 'Industry Interaction', path: '/industry-interaction', icon: 'users', desc: 'Expert sessions' },
                { title: 'Placement & Training Partners', path: '/placementandtraining', icon: 'award', desc: 'Our corporate network' },
                { title: 'Future of Design', path: '/future-of-design', icon: 'sparkles', desc: 'Trends & innovations' },
            ]
        },

        { title: 'Events', path: '/events', icon: Calendar, section: 'OVERVIEW' },
        { title: 'Mentors', path: '/mentors', icon: User, section: 'OVERVIEW' },
        { title: 'Blogs', path: '/insd-360/blog', icon: BookOpen, section: 'OVERVIEW' },
        {
            title: 'Contact Us',
            path: '/contact-us',
            icon: Phone,
            section: 'OVERVIEW',
            subItems: [
                { title: 'Call Us Now', path: 'tel:+917701933935', icon: Phone, desc: 'Direct support line' },
                { title: 'Apply Now', path: '/apply', icon: UserPlus, desc: 'Start your application' },
                { title: 'Career Counselling', path: '/apply', icon: Calendar, desc: 'Book a session' },
                { title: 'Download Brochure', path: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', icon: FileDown, desc: 'Course catalogues', isDownload: true }
            ]
        },
    ];

    // Logic to lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setExpandedItem(null); // Reset expanded item when closing menu
        }
    }, [isOpen]);

    // Higher-end variants for the curtain reveal
    const menuVariants = {
        closed: {
            clipPath: "circle(0% at 90% 40px)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            clipPath: "circle(150% at 90% 40px)",
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, y: 30, filter: "blur(10px)" },
        open: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <>

            <motion.nav
                style={{
                    width: navWidth,
                    top: navTop,
                    borderRadius: navRadius,
                    backgroundColor: navBackground,
                    backdropFilter: navBackdrop,
                    WebkitBackdropFilter: navBackdrop,
                    borderColor: navBorderColor,
                    boxShadow: navShadow,
                    borderWidth: "1px",
                    borderStyle: "solid",
                }}
                ref={navRef}
                className="hidden lg:flex fixed top-0 left-0 right-0 z-1000 px-6 lg:px-8 xl:px-10 py-4 items-center justify-between pointer-events-auto w-full"
            >
                {/* Left: Logo */}
                <Link to="/" className="nav-logo relative z-50 shrink-0 block h-16 overflow-hidden" onClick={() => setIsOpen(false)}>
                    <motion.img
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className={`h-16 w-auto object-contain transition-all duration-500 ${isHeaderDark && !isScrolled ? 'brightness-0 invert' : 'drop-shadow-sm'}`}
                        src="https://insd.edu.in/wp-content/uploads/2022/02/Final-Logo.png"
                        alt="INSD Logo"
                    />
                </Link>
                {/* Right: Actions */}
                <div className="flex items-center gap-2 md:gap-3 lg:gap-4 2xl:gap-6">
                    {/* Quick Links - Visible on Desktop */}
                    <AnimatePresence>
                        {!isOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="hidden md:flex items-center gap-1 lg:gap-2 xl:gap-3 2xl:gap-4"
                            >
                                <div className="relative group/dropdown">
                                    <div className="flex items-center gap-1 cursor-pointer py-4">
                                        <RollerLink
                                            to="/about-us"
                                            colorClass="nav-hover-gradient"
                                            baseTextClass={isHeaderDark && !isScrolled ? "text-white" : "text-slate-800"}
                                        >
                                            About
                                        </RollerLink>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 group-hover/dropdown:rotate-180 ${isHeaderDark && !isScrolled ? 'text-white/70' : 'text-slate-500'}`}><path d="m6 9 6 6 6-6" /></svg>
                                    </div>

                                    {/* Dropdown Menu */}
                                    <div className="absolute top-12 left-1/2 -translate-x-1/2 pt-6 w-64 opacity-0 invisible translate-y-4 group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] z-50">
                                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/10 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden p-2 relative before:content-[''] before:absolute before:inset-0 before:bg-linear-to-b before:from-white/40 before:to-transparent before:pointer-events-none after:content-[''] after:absolute after:-top-px after:left-10 after:right-10 after:h-px after:bg-linear-to-r after:from-transparent after:via-primary/30 after:to-transparent">
                                            <div className="max-h-[400px] overflow-y-auto dropdown-scrollbar pr-1 overscroll-contain">
                                                {[
                                                    { title: '15 Years Legacy', path: '/15-years-legacy', icon: 'zap', desc: 'Explore industry trends' },
                                                    { title: 'Mentors', path: '/mentors', icon: 'users', desc: 'Meet our community' },
                                                    { title: 'Awards & Recognition', path: '/awards-recognition', icon: 'map-pin', desc: 'Our locations' },
                                                    { title: 'Center Across India', path: '/centers-across-india', icon: 'trending-up', desc: 'Our national presence' },
                                                    { title: 'Paris Project', path: '/insd-360/paris-project', icon: 'globe', desc: 'International design showcase', badge: 'Featured' }

                                                ].map((item, i) => (
                                                    <Link
                                                        key={i}
                                                        to={item.path}
                                                        className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 group/item transition-all duration-300 relative overflow-hidden"
                                                    >
                                                        <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                                                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover/item:bg-primary group-hover/item:text-white group-hover/item:scale-110 transition-all duration-400 shadow-sm relative z-10">
                                                            {item.icon === 'info' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>}
                                                            {item.icon === 'zap' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>}
                                                            {item.icon === 'award' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>}
                                                            {item.icon === 'users' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
                                                            {item.icon === 'briefcase' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>}
                                                            {item.icon === 'map-pin' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>}
                                                            {item.icon === 'trending-up' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>}
                                                            {item.icon === 'globe' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>}
                                                        </div>
                                                        <div className="flex flex-col relative z-10">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-sm text-slate-800 dark:text-slate-200 group-hover/item:text-primary dark:group-hover/item:text-white transition-colors">{item.title}</span>
                                                                {item.badge && (
                                                                    <span className="px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest animate-pulse border border-primary/20">
                                                                        {item.badge}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="text-[11px] font-medium text-slate-400 group-hover/item:text-slate-500 transition-colors uppercase tracking-wider">{item.desc}</span>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative group/dropdown">
                                    <div className="flex items-center gap-1 cursor-pointer py-4">
                                        <RollerLink
                                            to="/courses"
                                            colorClass="nav-hover-gradient"
                                            baseTextClass={isHeaderDark && !isScrolled ? "text-white" : "text-slate-800"}
                                        >
                                            Courses
                                        </RollerLink>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 group-hover/dropdown:rotate-180 ${isHeaderDark && !isScrolled ? 'text-white/70' : 'text-slate-500'}`}><path d="m6 9 6 6 6-6" /></svg>
                                    </div>

                                    <div className="absolute top-12 left-1/2 -translate-x-1/2 pt-6 w-80 opacity-0 invisible translate-y-4 group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] z-50">
                                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/10 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden p-2 relative before:content-[''] before:absolute before:inset-0 before:bg-linear-to-b before:from-white/40 before:to-transparent before:pointer-events-none">
                                            <div className="max-h-[400px] overflow-y-auto dropdown-scrollbar pr-1 overscroll-contain">
                                                {[
                                                    { title: 'Fashion Designing', path: '/courses/fashion-designing', icon: 'fashion', desc: 'Couture & Apparel Design' },
                                                    { title: 'Interior Designing', path: '/courses/interior-designing', icon: 'interior', desc: 'Spatial & Interior Styling' },
                                                    { title: 'Graphic Designing', path: '/courses/graphic-designing', icon: 'graphic', desc: 'Visual Branding & Media' },
                                                    { title: 'Animation & VFX', path: '/courses/animation-and-vfx', icon: 'animation', desc: '3D Motion & Visual Effects' },
                                                    { title: 'Jewellery Designing', path: '/courses/jewellery-designing', icon: 'jewellery', desc: 'Gems & Jewelry Craft' },
                                                    { title: 'UI/UX Design', path: '/courses/uiux-designing', icon: 'uiux', desc: 'User Experience & Interface' },
                                                    { title: 'Beauty & Makeup', path: '/courses/beauty-and-makeup', icon: 'beauty', desc: 'Professional Esthetics' },
                                                    { title: 'Photography', path: '/courses/photography', icon: 'photography', desc: 'Visual Storytelling Art' },
                                                    { title: 'Textile Design', path: '/courses/textile-designing', icon: 'textile', desc: 'Material Science Arts' },
                                                    { title: 'INSD Luxe', path: '/insd-luxe', icon: 'textile', desc: 'Premium Luxury Arts' },
                                                ].map((item, i) => (
                                                    <Link
                                                        key={i}
                                                        to={item.path}
                                                        className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 group/item transition-all duration-300 relative overflow-hidden"
                                                    >
                                                        <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                                                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover/item:bg-primary group-hover/item:text-white group-hover/item:scale-110 transition-all duration-400 shadow-sm relative z-10">
                                                            {item.icon === 'fashion' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2z" /><path d="M6 8a2 2 0 0 0 2 2h7a3 3 0 0 1 3 3v5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1" /><path d="M12 22v-4" /><path d="M9 18v-2" /><path d="M15 18v-2" /></svg>}
                                                            {item.icon === 'interior' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>}
                                                            {item.icon === 'graphic' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.72 1.7-1.61 0-.43-.17-.83-.44-1.13-.29-.3-.47-.7-.47-1.13 0-.88.72-1.59 1.61-1.59h1.91c2.51 0 4.69-2.03 4.69-4.55 0-4.41-4.03-8-9-8z" /></svg>}
                                                            {item.icon === 'animation' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="17" x2="22" y2="17" /><line x1="17" y1="7" x2="22" y2="7" /></svg>}
                                                            {item.icon === 'jewellery' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 13L2 9z" /><path d="M11 3 8 9l4 13 4-13-3-6" /><path d="M2 9h20" /></svg>}
                                                            {item.icon === 'uiux' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="M7 14l5-5 5 5" /></svg>}
                                                            {item.icon === 'beauty' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M3 5h4" /><path d="M21 17v4" /><path d="M19 19h4" /></svg>}
                                                            {item.icon === 'photography' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>}
                                                            {item.icon === 'textile' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20.22 8.66 14a2 2 0 0 1 2.68 0L18 20.22" /><path d="m2 15.22 6.66-6.22a2 2 0 0 1 2.68 0L18 15.22" /><path d="m2 10.22 6.66-6.22a2 2 0 0 1 2.68 0L18 10.22" /></svg>}
                                                        </div>
                                                        <div className="flex flex-col relative z-10">
                                                            <span className="font-bold text-sm text-slate-800 dark:text-slate-200 group-hover/item:text-primary dark:group-hover/item:text-white transition-colors">{item.title}</span>
                                                            <span className="text-[11px] font-medium text-slate-400 group-hover/item:text-slate-500 transition-colors uppercase tracking-wider">{item.desc}</span>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative group/dropdown">
                                    <div className="flex items-center gap-1 cursor-pointer py-4">
                                        <RollerLink
                                            to="#"
                                            colorClass="nav-hover-gradient"
                                            baseTextClass={isHeaderDark && !isScrolled ? "text-white" : "text-slate-800"}
                                        >
                                            Careers & Exposure
                                        </RollerLink>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 group-hover/dropdown:rotate-180 ${isHeaderDark && !isScrolled ? 'text-white/70' : 'text-slate-500'}`}><path d="m6 9 6 6 6-6" /></svg>
                                    </div>

                                    <div className="absolute top-12 left-1/2 -translate-x-1/2 pt-6 w-80 opacity-0 invisible translate-y-4 group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] z-50">
                                        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/10 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden p-2 relative before:content-[''] before:absolute before:inset-0 before:bg-linear-to-b before:from-white/40 before:to-transparent before:pointer-events-none after:content-[''] after:absolute after:-top-px after:left-10 after:right-10 after:h-px after:bg-linear-to-r after:from-transparent after:via-primary/30 after:to-transparent">
                                            <div className="max-h-[400px] overflow-y-auto dropdown-scrollbar pr-1 overscroll-contain">
                                                {[
                                                    { title: 'Life at INSD', path: '/student', icon: 'users', desc: 'Campus life & community' },
                                                    { title: 'Placements', path: '/placement', icon: 'briefcase', desc: 'Career opportunities' },
                                                    { title: 'Entrepreneurs', path: '/entrepreneur', icon: 'zap', desc: 'Startup incubation' },
                                                    { title: 'Industry Visits', path: '/industry-potential', icon: 'map-pin', desc: 'Real-world exposure' },
                                                    { title: 'Industry Interaction', path: '/industry-interaction', icon: 'users', desc: 'Expert sessions' },
                                                    { title: 'Placement & Training Partners', path: '/placementandtraining', icon: 'award', desc: 'Our corporate network' },
                                                    { title: 'Future of Design', path: '/future-of-design', icon: 'sparkles', desc: 'Trends & innovations' },
                                                ].map((item, i) => (
                                                    <Link
                                                        key={i}
                                                        to={item.path}
                                                        className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 group/item transition-all duration-300 relative overflow-hidden"
                                                    >
                                                        <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                                                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover/item:bg-primary group-hover/item:text-white group-hover/item:scale-110 transition-all duration-400 shadow-sm relative z-10">
                                                            {item.icon === 'users' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
                                                            {item.icon === 'briefcase' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>}
                                                            {item.icon === 'zap' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>}
                                                            {item.icon === 'map-pin' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>}
                                                            {item.icon === 'award' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>}
                                                            {item.icon === 'sparkles' && <Sparkles size={18} />}
                                                        </div>
                                                        <div className="flex flex-col relative z-10">
                                                            <span className="font-bold text-sm text-slate-800 dark:text-slate-200 group-hover/item:text-primary dark:group-hover/item:text-white transition-colors">{item.title}</span>
                                                            <span className="text-[11px] font-medium text-slate-400 group-hover/item:text-slate-500 transition-colors uppercase tracking-wider">{item.desc}</span>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <RollerLink
                                    to="/events"
                                    colorClass="nav-hover-gradient"
                                    baseTextClass={isHeaderDark && !isScrolled ? "text-white" : "text-slate-800"}
                                >
                                    Events
                                </RollerLink>

                                <RollerLink
                                    to="/insd-360/blog"
                                    colorClass="nav-hover-gradient"
                                    baseTextClass={isHeaderDark && !isScrolled ? "text-white" : "text-slate-800"}
                                >
                                    Blogs
                                </RollerLink>
                                <RollerLink
                                    to="/apply"
                                    colorClass="nav-hover-gradient"
                                    baseTextClass={isHeaderDark && !isScrolled ? "text-white" : "text-slate-800"}
                                >
                                    Admission
                                </RollerLink>
                                <RollerLink
                                    to="/franchise"
                                    colorClass="nav-hover-gradient"
                                    baseTextClass={isHeaderDark && !isScrolled ? "text-white" : "text-slate-800"}
                                >
                                    Franchise
                                </RollerLink>
                            </motion.div>
                        )}
                    </AnimatePresence>




                    {/* Menu Toggle - Desktop Only */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className={`group relative hidden lg:flex items-center gap-3 px-5 py-2.5 rounded-full overflow-hidden shadow-lg transition-all duration-300 ${isHeaderDark && !isScrolled ? 'bg-white text-slate-900 shadow-white/10' : 'bg-slate-900 text-white shadow-slate-900/20'}`}
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className={`relative z-10 font-bold text-[10px] md:text-xs hidden sm:inline-block tracking-widest transition-colors duration-300 ${isHeaderDark && !isScrolled ? 'group-hover:text-white' : ''}`}>
                            {isOpen ? "CLOSE" : "CONTACT"}
                        </span>
                    </motion.button>

                    {/* Profile Component - Commented Out */}
                    {/* 
                    {user ? (
                        <Link
                            to="/profile"
                            className={`hidden lg:flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 font-black text-sm ${isDarkTheme && !isScrolled ? 'border-primary bg-primary text-white hover:scale-105' : 'border-primary bg-primary text-white hover:scale-105'} shadow-xl`}
                            title="Profile Dashboard"
                        >
                            {user.username.charAt(0).toUpperCase()}
                        </Link>
                    ) : (
                        <button
                            onClick={openModal}
                            className={`hidden lg:flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 ${isHeaderDark && !isScrolled ? 'border-white/20 text-white hover:bg-white hover:text-slate-900' : 'border-slate-200 text-slate-800 bg-white hover:bg-slate-900 hover:border-slate-900 hover:text-white'} shadow-sm`}
                        >
                            <User size={18} strokeWidth={2.5} />
                        </button>
                    )} 
                    */}
                </div>
            </motion.nav>

            {/* Mobile Top Bar - Dynamic Island Style */}
            <motion.div
                style={{
                    width: mobileWidth,
                    height: mobileHeight,
                    top: mobileTop,
                    borderRadius: mobileRadius,
                    backgroundColor: isOpen ? "transparent" : mobileBackground,
                    backdropFilter: isOpen ? "none" : mobileBackdrop,
                    WebkitBackdropFilter: isOpen ? "none" : mobileBackdrop,
                    boxShadow: isOpen ? "none" : mobileShadow,
                    borderColor: isOpen ? "transparent" : mobileBorder,
                    borderWidth: "1px",
                    borderStyle: "solid",
                }}
                ref={mobileNavRef}
                className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center pointer-events-none"
            >
                <div className="relative w-full h-full flex items-center justify-center px-4 pointer-events-auto">
                    <Link to="/" onClick={() => setIsOpen(false)} className="h-full flex items-center justify-center">
                        <img
                            className={`h-14 w-auto object-contain transition-all duration-500 ${isHeaderDark && !isScrolled ? 'brightness-0 invert' : 'drop-shadow-sm'}`}
                            src="https://insd.edu.in/wp-content/uploads/2022/02/Final-Logo.png"
                            alt="INSD Logo"
                        />
                    </Link>
                </div>
            </motion.div >

            {/* Mobile Bottom Navigation Bar - Pill Glass Style */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] h-16 z-50 lg:hidden">
                <div className={`w-full h-full flex items-center justify-around px-6 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 border ${isOpen || (isHeaderDark && !isScrolled) ? 'bg-slate-900/40 backdrop-blur-2xl border-white/10' : 'bg-white/40 backdrop-blur-2xl border-white/30'}`}>

                    {/* HOME */}
                    <NavLink
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                            `relative flex flex-col items-center justify-center w-16 h-16 transition-all duration-500 scale-90 active:scale-75 ${isActive ? 'text-primary' : (isHeaderDark && !isScrolled) || isOpen ? 'text-white/40' : 'text-slate-900/40'}`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeBubble"
                                        className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20 shadow-[0_0_20px_rgba(219,52,54,0.1)]"
                                        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                                    />
                                )}
                                <Home size={22} strokeWidth={isActive ? 2.5 : 2} className="relative z-10" />
                                <span className={`text-[9px] font-bold mt-1.5 uppercase tracking-widest relative z-10 ${isActive ? 'opacity-100' : 'opacity-60'}`}>Home</span>
                            </>
                        )}
                    </NavLink>

                    {/* APPLY */}
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            openAdmissionModal();
                        }}
                        className={`relative flex flex-col items-center justify-center w-16 h-16 transition-all duration-500 scale-90 active:scale-75 ${(isHeaderDark && !isScrolled) || isOpen ? 'text-white/40 hover:text-white' : 'text-slate-900/40 hover:text-slate-900'}`}
                    >
                        <GraduationCap size={22} strokeWidth={2} />
                        <span className="text-[9px] font-bold mt-1.5 uppercase tracking-widest opacity-60">Apply</span>
                    </button>

                    {/* MENU */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`relative flex flex-col items-center justify-center w-16 h-16 transition-all duration-500 scale-90 active:scale-75 ${isOpen ? 'text-primary' : (isHeaderDark && !isScrolled) ? 'text-white/40 hover:text-white' : 'text-slate-900/40 hover:text-slate-900'}`}
                    >
                        {isOpen && (
                            <motion.div
                                layoutId="activeBubble"
                                className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20 shadow-[0_0_20px_rgba(219,52,54,0.1)]"
                                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                            />
                        )}
                        <div className="relative z-10">
                            {isOpen ? <X size={24} strokeWidth={2.5} /> : <LayoutGrid size={22} strokeWidth={2} />}
                        </div>
                        <span className={`text-[9px] font-bold mt-1.5 uppercase tracking-widest relative z-10 ${isOpen ? 'opacity-100' : 'opacity-60'}`}>{isOpen ? 'Close' : 'Menu'}</span>
                    </button>
                </div>
            </div >

            <AnimatePresence mode="wait">
                {isOpen && (
                    isMobile ? (
                        <>
                            {/* Backdrop */}

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-1000"
                            />

                            {/* Sidebar Panel */}

                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-white z-1001 shadow-[20px_0_60px_-15px_rgba(0,0,0,0.2)] flex flex-col"
                            >
                                {/* Header */}

                                <div className="p-5 flex items-center justify-between bg-gradient-to-r from-primary to-secondary text-white">
                                    {/* User Profile Section - Commented Out */}
                                    {/* 
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            if (user) {
                                                navigate('/profile');
                                            } else {
                                                openModal();
                                            }
                                        }}
                                        className="flex items-center gap-3 group/user cursor-pointer"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-md group-hover/user:scale-110 transition-transform">
                                            <User size={20} />
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <span className="text-xs font-black uppercase tracking-widest group-hover/user:text-white transition-colors">
                                                {user ? user.username : 'Signin / Signup'}
                                            </span>
                                            <span className="text-[8px] font-bold text-white/60 tracking-widest uppercase">
                                                {user ? 'View Profile' : 'INSD Student Protocol'}
                                            </span>
                                        </div>
                                    </button>
                                    */}
                                    <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Menu Items */}
                                <div className="flex-1 overflow-y-auto py-6 px-4 dropdown-scrollbar">
                                    <div className="space-y-2">
                                        {menuItems.map((item, idx) => {
                                            const hasSubItems = item.subItems && item.subItems.length > 0;
                                            const isExpanded = expandedItem === idx;

                                            return (
                                                <div key={idx} className="space-y-1">
                                                    {hasSubItems ? (
                                                        <>
                                                            <button
                                                                onClick={() => setExpandedItem(isExpanded ? null : idx)}
                                                                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${isExpanded ? 'bg-slate-50 text-primary' : 'text-slate-600 active:bg-slate-50 hover:bg-slate-50/50'}`}
                                                            >
                                                                <div className="flex items-center gap-4">
                                                                    <div className={`p-2 rounded-xl border ${isExpanded ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                                                                        <item.icon size={18} />
                                                                    </div>
                                                                    <span className="text-sm font-black uppercase tracking-tight">{item.title}</span>
                                                                </div>
                                                                <motion.div
                                                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                                                    transition={{ duration: 0.3 }}
                                                                >
                                                                    <ExpandMoreIcon fontSize="small" />
                                                                </motion.div>
                                                            </button>

                                                            <AnimatePresence>
                                                                {isExpanded && (
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: "auto", opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        className="overflow-hidden pl-12 space-y-1"
                                                                    >
                                                                        {item.subItems.map((sub, sIdx) => {
                                                                            const isExternal = sub.path.startsWith('http') || sub.path.startsWith('tel:');
                                                                            return isExternal ? (
                                                                                <a
                                                                                    key={sIdx}
                                                                                    href={sub.path}
                                                                                    className="block p-3 text-xs font-bold text-slate-500 hover:text-primary transition-colors"
                                                                                >
                                                                                    {sub.title}
                                                                                </a>
                                                                            ) : (
                                                                                <Link
                                                                                    key={sIdx}
                                                                                    to={sub.path}
                                                                                    onClick={() => setIsOpen(false)}
                                                                                    className="block p-3 text-xs font-bold text-slate-500 hover:text-primary transition-colors border-l border-slate-100 ml-2"
                                                                                >
                                                                                    {sub.title}
                                                                                </Link>
                                                                            );
                                                                        })}
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </>
                                                    ) : (
                                                        <Link
                                                            to={item.path}
                                                            onClick={() => setIsOpen(false)}
                                                            className="flex items-center gap-4 p-4 rounded-2xl text-slate-600 active:bg-slate-50 hover:bg-slate-50/50 transition-all"
                                                        >
                                                            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-400">
                                                                <item.icon size={18} />
                                                            </div>
                                                            <span className="text-sm font-black uppercase tracking-tight">{item.title}</span>
                                                        </Link>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Footer Section */}
                                    <div className="mt-12 p-6 rounded-3xl bg-slate-50 border border-slate-100 space-y-6">
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Emergency Help</h4>
                                            <a href="tel:+917701933935" className="flex items-center gap-4 text-xs font-bold text-slate-800 hover:text-primary transition-colors">
                                                <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-primary shadow-sm">
                                                    <Phone size={14} />
                                                </div>
                                                +91 7701933935
                                            </a>
                                        </div>

                                        {/* SOCIAL ICONS SECTION */}
                                        <div className="space-y-4 pt-4 border-t border-slate-200/50">
                                            <h4 className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Connect With Us</h4>
                                            <SocialIcons dark={true} className="!gap-4 md:!gap-6" />
                                        </div>

                                        <div className="w-full">
                                            <a
                                                href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                                                download="INSD-Prospectus-2026.pdf"
                                                className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                                            >
                                                <FileDown size={18} />
                                                Download Prospectus
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    ) : (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                            className="fixed inset-0 z-1001 bg-linear-to-br from-primary to-secondary text-white overflow-hidden flex flex-col"
                        >
                            {/* 0. PREMIUM TEXTURE OVERLAY */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

                            {/* 1. PREMIUM HEADER */}
                            <motion.div
                                variants={itemVariants}
                                className="flex items-center justify-between px-6 md:px-12 py-8 relative z-10"
                            >
                                <Link to="/" onClick={() => setIsOpen(false)} className="h-10">
                                    <img
                                        src="https://insd.edu.in/wp-content/uploads/2022/02/Final-Logo.png"
                                        alt="INSD"
                                        className="h-full w-auto brightness-0 invert"
                                    />
                                </Link>

                                <div className="flex items-center gap-4 md:gap-6">

                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-slate-900 border border-white/20 hover:bg-white hover:text-slate-950 transition-all shadow-xl group"
                                    >
                                        <span className="font-bold text-[10px] md:text-xs tracking-widest uppercase">CLOSE</span>
                                    </button>
                                </div>
                            </motion.div>

                            {/* 2. MAIN CONTENT AREA */}
                            <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden">
                                {/* Abstract Background Decoration */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none">
                                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3 animate-pulse" />
                                    <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-secondary/20 blur-[150px] rounded-full -translate-x-1/3 translate-y-1/3" />
                                </div>

                                {/* LEFT COLUMN: NAVIGATION CTAs */}
                                <div className="hidden md:flex w-full md:w-[65%] p-6 md:p-8 lg:p-12 md:flex-col justify-center relative z-10 overflow-y-auto dropdown-scrollbar">
                                    <div className="space-y-4 md:space-y-6">
                                        {[
                                            { title: 'Call Us Now', sub: '+91 7701933935', icon: Phone, href: 'tel:+917701933935' },
                                            { title: 'Apply Now', sub: 'Admission Cycle 2026', icon: UserPlus, href: '/apply' },
                                            { title: 'Book Counselling', sub: 'Free Expert Session', icon: Calendar, action: 'modal' },
                                            { title: 'Download Brochure', sub: 'Detailed Course Guide', icon: FileDown, href: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', isDownload: true },
                                        ].map((cta, i) => (
                                            <motion.div
                                                key={i}
                                                variants={itemVariants}
                                                className="group relative"
                                            >
                                                {cta.action === 'modal' ? (
                                                    <button
                                                        onClick={() => { setIsOpen(false); openAdmissionModal(); }}
                                                        className="flex items-center gap-6 md:gap-8 text-left w-full"
                                                    >
                                                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-primary group-hover:scale-110 group-hover:rotate-6 group-hover:border-primary shadow-2xl overflow-hidden relative">
                                                            <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            <cta.icon className="w-5 h-5 md:w-7 md:h-7 text-white relative z-10" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-none group-hover:text-primary transition-all duration-500 group-hover:translate-x-4">
                                                                {cta.title}
                                                            </h3>
                                                            <p className="text-[8px] md:text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase mt-1.5 group-hover:text-white/60 transition-all duration-500 group-hover:translate-x-2">
                                                                {cta.sub}
                                                            </p>
                                                        </div>
                                                    </button>
                                                ) : cta.title === 'Apply Now' ? (
                                                    <button
                                                        onClick={() => { setIsOpen(false); openAdmissionModal(); }}
                                                        className="flex items-center gap-6 md:gap-8 text-left w-full"
                                                    >
                                                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-primary group-hover:scale-110 group-hover:rotate-6 group-hover:border-primary shadow-2xl overflow-hidden relative">
                                                            <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            <cta.icon className="w-5 h-5 md:w-7 md:h-7 text-white relative z-10" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-none group-hover:text-primary transition-all duration-500 group-hover:translate-x-4">
                                                                {cta.title}
                                                            </h3>
                                                            <p className="text-[8px] md:text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase mt-1.5 group-hover:text-white/60 transition-all duration-500 group-hover:translate-x-2">
                                                                {cta.sub}
                                                            </p>
                                                        </div>
                                                    </button>
                                                ) : (
                                                    <a
                                                        href={cta.href}
                                                        download={cta.isDownload ? "INSD-Prospectus-2026.pdf" : undefined}
                                                        onClick={() => { if (!cta.isDownload) setIsOpen(false); }}
                                                        className="flex items-center gap-6 md:gap-8 text-left"
                                                    >
                                                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-primary group-hover:scale-110 group-hover:rotate-6 group-hover:border-primary shadow-2xl overflow-hidden relative">
                                                            <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            <cta.icon className="w-5 h-5 md:w-7 md:h-7 text-white relative z-10" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-none group-hover:text-primary transition-all duration-500 group-hover:translate-x-4">
                                                                {cta.title}
                                                            </h3>
                                                            <p className="text-[8px] md:text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase mt-1.5 group-hover:text-white/60 transition-all duration-500 group-hover:translate-x-2">
                                                                {cta.sub}
                                                            </p>
                                                        </div>
                                                    </a>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* VERTICAL DIVIDER */}
                                <motion.div
                                    initial={{ scaleY: 0 }}
                                    animate={{ scaleY: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="hidden md:block w-px bg-white/10 h-[60%] my-auto"
                                />

                                {/* RIGHT COLUMN: CONTACT DETAILS */}
                                <div className="w-full md:w-[35%] p-6 md:p-8 lg:p-12 flex flex-col justify-center space-y-6 md:space-y-8 relative z-10 overflow-y-auto dropdown-scrollbar">
                                    <motion.div variants={itemVariants}>
                                        <h4 className="text-[9px] md:text-[10px] font-black tracking-[0.4em] text-primary uppercase mb-4 md:mb-6">Direct Lines</h4>
                                        <div className="space-y-3">
                                            <a href="tel:+917701933935" className="block text-lg md:text-xl lg:text-2xl font-bold hover:text-primary transition-all group">
                                                <span className="inline-block group-hover:translate-x-2 transition-transform">+91 7701933935</span>
                                            </a>
                                            <a href="tel:+917827066618" className="block text-lg md:text-xl lg:text-2xl font-bold hover:text-primary transition-all group">
                                                <span className="inline-block group-hover:translate-x-2 transition-transform">+91 7827066618</span>
                                            </a>
                                        </div>
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <h4 className="text-[9px] md:text-[10px] font-black tracking-[0.4em] text-secondary uppercase mb-4 md:mb-6">Location</h4>
                                        <div className="space-y-3 max-w-xs">
                                            <h5 className="font-black text-[10px] md:text-xs uppercase tracking-wider text-white/80">INSD Corporate Centres</h5>
                                            <button className="flex items-center gap-3 text-[10px] md:text-xs font-bold text-primary group">
                                                VIEW ON MAPS
                                                <div className="w-5 h-5 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                                    <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                                                </div>
                                            </button>
                                        </div>
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <h4 className="text-[9px] md:text-[10px] font-black tracking-[0.4em] text-white/20 uppercase mb-4 md:mb-6">Connect</h4>
                                        <SocialIcons />
                                    </motion.div>
                                </div>
                            </div>


                        </motion.div>
                    )
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
