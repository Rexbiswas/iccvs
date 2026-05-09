import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Bot, Minus, SendHorizonal, User, LayoutDashboard, LogOut, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AIChatbot = ({ isFloatingPanel = false, hideWindow = false, showTrigger = true }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isCentered, setIsCentered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const scrollRef = useRef(null);

    // Initialize chat history with personalized greeting
    useEffect(() => {
        const greeting = user 
            ? `Hi ${user.name}! Welcome back. How can I help you with your ${user.courseName || 'design'} journey today?`
            : "Hi there! I'm your INSD Design Assistant. How can I help you shape your creative future today?";
        
        setChatHistory([{ role: 'bot', content: greeting }]);
    }, [user]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory, isTyping]);

    useEffect(() => {
        window.dispatchEvent(new CustomEvent('chatbot-state', { 
            detail: { isOpen } 
        }));

        if (isOpen) {
            document.body.classList.add('chatbot-open');
        } else {
            document.body.classList.remove('chatbot-open');
        }
        return () => document.body.classList.remove('chatbot-open');
    }, [isOpen]);

    // Visibility logic on scroll
    useEffect(() => {
        if (isFloatingPanel) return;
        const handleScroll = () => {
            // Don't hide if already open
            if (isOpen) {
                if (!isVisible) setIsVisible(true);
                return;
            }
            const show = window.scrollY > 100;
            if (show !== isVisible) {
                setIsVisible(show);
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisible, isFloatingPanel, isOpen]);

    // Handle external trigger
    useEffect(() => {
        const handleExternalOpen = (e) => {
            // Only the instance that is allowed to show the window should respond
            if (hideWindow) return;
            
            setIsOpen(true);
            if (e.detail?.centered) {
                setIsCentered(true);
            } else {
                setIsCentered(false);
            }
            if (!isFloatingPanel) setIsVisible(true);
        };
        window.addEventListener('open-ai-chatbot', handleExternalOpen);
        return () => window.removeEventListener('open-ai-chatbot', handleExternalOpen);
    }, [isFloatingPanel, hideWindow]);

    const handleSend = async (e) => {
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
        
        const msg = typeof e === 'string' ? e : message;
        if (!msg.trim()) return;

        // Handle Clear Command
        if (msg.toLowerCase() === 'clear' || msg.toLowerCase() === '/clear') {
            clearChat();
            setMessage('');
            return;
        }

        const userMessage = { role: 'user', content: msg };
        setChatHistory(prev => [...prev, userMessage]);
        if (typeof e !== 'string') setMessage('');
        setIsTyping(true);

        setTimeout(() => {
            const botResponse = {
                role: 'bot',
                content: getMockResponse(msg)
            };
            setChatHistory(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const clearChat = () => {
        const greeting = user 
            ? `Hi ${user.name}! Chat cleared. How else can I help you?`
            : "Chat cleared! I'm here if you have more questions about INSD.";
        setChatHistory([{ role: 'bot', content: greeting }]);
    };

    const getMockResponse = (input) => {
        const lowerInput = input.toLowerCase();

        // Course Knowledge Base
        const coursesInfo = {
            fashion: "Our Fashion Design programs range from 1-year Diplomas to 3-year Bachelors and 2-year Masters. They cover everything from pattern making to haute couture.",
            interior: "Interior Design at INSD focuses on spatial planning, 3D modeling, and luxury residential/commercial projects. Available in Diploma, UG, and PG levels.",
            graphic: "Graphic Design & UI/UX courses focus on visual communication, brand identity, and digital product design using industry-standard tools like Adobe Suite and Figma.",
            timing: "Standard class timings are Monday to Friday. We have two main batches: Morning (10:00 AM - 1:00 PM) and Afternoon (2:00 PM - 5:00 PM). Some professional workshops also happen on Saturdays."
        };

        if (user) {
            if (lowerInput.includes('profile') || lowerInput.includes('dashboard') || lowerInput.includes('my info')) {
                return `You can view and manage your profile in your dashboard. You are currently enrolled in ${user.courseName}. Shall I take you there?`;
            }
            if (lowerInput.includes('application') || lowerInput.includes('status')) {
                return `Your application status for ${user.courseName} is currently being processed. You can check for updates in your student portal.`;
            }
        }

        // Timing Queries
        if (lowerInput.includes('timing') || lowerInput.includes('time') || lowerInput.includes('schedule') || lowerInput.includes('batch')) {
            return coursesInfo.timing;
        }

        // Specific Course Queries
        if (lowerInput.includes('fashion')) return coursesInfo.fashion;
        if (lowerInput.includes('interior')) return coursesInfo.interior;
        if (lowerInput.includes('graphic') || lowerInput.includes('ui/ux')) return coursesInfo.graphic;

        // General Responses
        if (lowerInput.includes('course') || lowerInput.includes('program') || lowerInput.includes('study')) {
            return "We offer premium courses in Fashion, Interior, Graphic, Animation, and Jewelry Design. Which field are you most interested in?";
        }
        if (lowerInput.includes('admission') || lowerInput.includes('apply') || lowerInput.includes('join')) {
            return "The admission process for the 2026 session is open! You can apply online or visit our campus for a counseling session. Would you like the application link?";
        }
        if (lowerInput.includes('campus') || lowerInput.includes('location')) {
            return "INSD has 75+ centers across India, including major hubs in Delhi, Mumbai, and Kolkata. I can help you find the one closest to you!";
        }
        if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
            return user ? `Hello again, ${user.name}! How can I help you with your ${user.courseName} studies today?` : "Hello! I'm your INSD Assistant. I can help you with course details, timings, and admissions. What can I do for you?";
        }
        
        return "I'm not sure about that specifically, but I can tell you about our Design courses, batch timings, or help you connect with a counselor. What would you prefer?";
    };

    const quickActions = user ? [
        { label: "Check Dashboard", icon: LayoutDashboard, action: () => navigate('/profile') },
        { label: "Application Status", icon: User, action: () => handleSend("What is my application status?") },
        { label: "Course Info", icon: Bot, action: () => handleSend("Tell me about my course") },
        { label: "Logout", icon: LogOut, action: () => logout() }
    ] : [
        { label: "View Courses", icon: Bot, action: () => { navigate('/courses'); setIsOpen(false); } },
        { label: "Admission Process", icon: User, action: () => { navigate('/apply'); setIsOpen(false); } },
        { label: "Campus Locations", icon: Bot, action: () => { navigate('/campuses'); setIsOpen(false); } },
        { label: "Contact Counselor", icon: MessageCircle, action: () => { navigate('/contact-us'); setIsOpen(false); } }
    ];

    const ChatWindow = ({ centered }) => (
        <motion.div
            initial={centered 
                ? { opacity: 0, scale: 0.9, y: 20 }
                : { opacity: 0, scale: 0.5, x: 100, y: 100, transformOrigin: 'bottom right' }
            }
            animate={centered
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 1, scale: 1, x: 0, y: 0 }
            }
            exit={centered
                ? { opacity: 0, scale: 0.9, y: 20 }
                : { opacity: 0, scale: 0.5, x: 100, y: 100 }
            }
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`${centered 
                ? 'relative w-full max-w-[400px] h-[600px] max-h-[80vh]' 
                : 'absolute bottom-full right-0 md:bottom-0 md:right-full mb-4 md:mb-0 md:mr-6 w-[90vw] md:w-[400px] h-[600px] max-h-[70vh]'
            } bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col`}
        >
            {/* Header */}
            <div className="p-6 bg-linear-to-r from-primary to-secondary text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        {user ? <User size={20} /> : <Bot size={24} />}
                    </div>
                    <div>
                        <h3 className="font-bold text-sm tracking-tight text-white leading-none">
                            {user ? `Hi, ${user.name.split(' ')[0]}` : "INSD Assistant"}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-[10px] text-white/80 font-medium uppercase tracking-widest">
                                {user ? user.courseName : "AI Online"}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={clearChat}
                        title="Clear Chat"
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10"
                    >
                        <Trash2 size={16} />
                    </button>
                    <button
                        onClick={() => { setIsOpen(false); setIsCentered(false); }}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            {/* Chat Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50"
            >
                {chatHistory.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${item.role === 'user'
                            ? 'bg-primary text-white rounded-tr-none shadow-md shadow-primary/10'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                            }`}>
                            <p className="text-sm font-medium leading-relaxed">{item.content}</p>
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                    >
                        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1">
                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </motion.div>
                )}

                {/* Quick Actions */}
                {!isTyping && chatHistory.length === 1 && (
                    <div className="pt-4 flex flex-wrap gap-2">
                        {quickActions.map((action, i) => (
                            <motion.button
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i }}
                                onClick={action.action}
                                className="px-4 py-2 bg-white/50 hover:bg-white text-primary border border-primary/20 rounded-full text-xs font-bold transition-all hover:shadow-md active:scale-95 flex items-center gap-2"
                            >
                                <action.icon size={12} />
                                {action.label}
                            </motion.button>
                        ))}
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                <form
                    onSubmit={handleSend}
                    className="relative flex items-center"
                >
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={user ? `Ask me about ${user.courseName}...` : "Ask anything..."}
                        className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl py-3.5 pl-5 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all font-medium"
                    />
                    <button
                        type="submit"
                        disabled={!message.trim()}
                        className="absolute right-2 p-2 bg-primary text-white rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 shadow-lg shadow-primary/20"
                    >
                        <SendHorizonal size={20} />
                    </button>
                </form>
                <p className="text-[10px] text-center text-slate-400 mt-3 font-medium tracking-tight uppercase">
                    Powered by INSD Intelligence
                </p>
            </div>
        </motion.div>
    );

    const content = (
        <motion.div
            initial={isFloatingPanel ? {} : { opacity: 0, scale: 0.5, y: 50 }}
            animate={isFloatingPanel ? {} : { opacity: 1, scale: 1, y: 0 }}
            exit={isFloatingPanel ? {} : { opacity: 0, scale: 0.5, y: 50 }}
            className={`${isFloatingPanel ? 'relative flex flex-col items-end' : 'fixed bottom-28 md:bottom-10 right-6 md:right-10 flex flex-col items-end'} z-1000 font-sans group`}
        >
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && !hideWindow && (
                    <>
                        {/* Mobile Backdrop - Global when open on mobile */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { setIsOpen(false); setIsCentered(false); }}
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[4999] lg:hidden"
                        />
                        
                        {/* Mobile Centered Layout - Forced on Mobile */}
                        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 lg:hidden">
                            <ChatWindow centered={true} />
                        </div>
                        
                        {/* Desktop Side Layout - Hidden on Mobile */}
                        <div className="hidden lg:block relative z-[5000]">
                            <ChatWindow centered={isCentered} />
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Trigger Button & Tooltip Container */}
            {showTrigger && (
                <div className="relative">
                    {/* Tooltip */}
                    {!isOpen && (
                        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-4 group-hover:translate-x-0 whitespace-nowrap shadow-2xl">
                            {user ? `Helping ${user.name.split(' ')[0]}` : "INSD Assistance"}
                            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                        </div>
                    )}

                    {/* Trigger Button */}
                    <motion.button
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className={`relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl transition-all duration-500 overflow-hidden ${isOpen
                            ? 'bg-slate-900 border-slate-800 rotate-90'
                            : 'bg-white/90 backdrop-blur-xl border-slate-100 hover:border-primary/30'
                            } border shadow-[0_10px_30px_rgba(0,0,0,0.1)]`}
                    >
                        <div className={`absolute inset-0 bg-linear-to-tr from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isOpen ? 'opacity-100' : ''}`} />

                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                >
                                    <X className="relative z-10 text-white" size={24} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="open"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    className="relative w-full h-full flex items-center justify-center p-2"
                                >
                                    {/* Futuristic AI Avatar Icon */}
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <svg viewBox="0 0 24 24" className="w-7 h-7 text-slate-800 group-hover:text-white transition-all duration-300 fill-none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" strokeOpacity="0.2" />
                                            <path d="M7 12h2m6 0h2m-5-5v2m0 6v2" strokeLinecap="round" />
                                            <rect x="6" y="9" width="12" height="6" rx="3" className="group-hover:stroke-white transition-colors" />
                                            <motion.circle
                                                cx="9" cy="12" r="1.5"
                                                animate={{ scaleY: [1, 0.1, 1] }}
                                                transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 0.2] }}
                                                className="fill-primary group-hover:fill-white"
                                            />
                                            <motion.circle
                                                cx="15" cy="12" r="1.5"
                                                animate={{ scaleY: [1, 0.1, 1] }}
                                                transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 0.2] }}
                                                className="fill-primary group-hover:fill-white"
                                            />
                                            <motion.path
                                                d="M7 12h10"
                                                animate={{ opacity: [0, 1, 0], y: [-2, 2, -2] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                strokeWidth="0.5"
                                                className="stroke-primary/50 group-hover:stroke-white/50"
                                            />
                                        </svg>
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary border-2 border-white rounded-full z-20 group-hover:border-primary transition-colors shadow-sm" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Pulse Ring */}
                        {!isOpen && (
                        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping opacity-0 group-hover:opacity-100" />
                        )}
                    </motion.button>
                </div>
            )}
        </motion.div>
    );

    if (isFloatingPanel) return content;

    return (
        <AnimatePresence>
            {isVisible && content}
        </AnimatePresence>
    );
};

export default AIChatbot;
