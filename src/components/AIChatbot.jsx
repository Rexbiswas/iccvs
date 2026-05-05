import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Bot, Minus, SendHorizonal, User, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AIChatbot = ({ isFloatingPanel = false }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
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

    // Visibility logic on scroll
    useEffect(() => {
        if (isFloatingPanel) return;
        const handleScroll = () => {
            const show = window.scrollY > 200;
            if (show !== isVisible) {
                setIsVisible(show);
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisible, isFloatingPanel]);

    const handleSend = async (e) => {
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
        
        const msg = typeof e === 'string' ? e : message;
        if (!msg.trim()) return;

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

    const getMockResponse = (input) => {
        const lowerInput = input.toLowerCase();

        // Personalized Responses
        if (user) {
            if (lowerInput.includes('profile') || lowerInput.includes('dashboard') || lowerInput.includes('my info')) {
                return `You can view and manage your profile in your dashboard. You are currently enrolled in ${user.courseName}. Shall I take you there?`;
            }
            if (lowerInput.includes('application') || lowerInput.includes('status')) {
                return `Your application status is currently being processed. You can check for updates in your student portal or dashboard.`;
            }
            if (lowerInput.includes('logout') || lowerInput.includes('sign out')) {
                return "I can help you with that. Just click the Logout button in your profile settings, or I can initiate it for you.";
            }
        }

        // General Responses
        if (lowerInput.includes('course') || lowerInput.includes('admission')) {
            return "We offer premium courses in Fashion, Interior, Graphic, and Jewelry Design. I'm taking you to our courses overview page now!";
        }
        if (lowerInput.includes('campus') || lowerInput.includes('location')) {
            return "INSD has a global presence. I'll take you to our campuses page so you can find the nearest one!";
        }
        if (lowerInput.includes('apply') || lowerInput.includes('process')) {
            return "The admission process is simple. I'm opening the application page for you right now.";
        }
        if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
            return user ? `Hello again, ${user.name}! How's your day going?` : "Hello! I'm here to assist you with any questions about INSD. What's on your mind?";
        }
        
        return "That's an interesting question! I recommend speaking with one of our expert career counselors for detailed information. I'll take you to the contact page.";
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

    const content = (
        <motion.div
            initial={isFloatingPanel ? {} : { opacity: 0, scale: 0.5, y: 50 }}
            animate={isFloatingPanel ? {} : { opacity: 1, scale: 1, y: 0 }}
            exit={isFloatingPanel ? {} : { opacity: 0, scale: 0.5, y: 50 }}
            className={`${isFloatingPanel ? 'relative' : 'fixed bottom-28 md:bottom-10 right-6 md:right-10'} z-1000 font-sans group flex flex-col items-end`}
        >
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, x: 100, y: 100, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, x: 100, y: 100 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="mb-6 w-[90vw] md:w-[400px] h-[600px] max-h-[70vh] apple-glass border-white/20 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 bg-linear-to-r from-primary to-secondary text-white flex items-center justify-between">
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
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50/30"
                        >
                            {chatHistory.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${item.role === 'user'
                                        ? 'bg-primary text-white rounded-tr-none'
                                        : 'bg-white/80 backdrop-blur-md text-slate-800 border border-slate-100 rounded-tl-none'
                                        }`}>
                                        <p className="text-sm leading-relaxed">{item.content}</p>
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
                        <div className="p-4 bg-white/50 backdrop-blur-xl border-t border-slate-100">
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
                )}
            </AnimatePresence>

            {/* Trigger Button & Tooltip Container */}
            <div className="relative">
                {/* Tooltip */}
                {!isOpen && (
                    <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-4 group-hover:translate-x-0 whitespace-nowrap shadow-2xl">
                        {user ? `Helping ${user.name.split(' ')[0]}` : "Design Assistant"}
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
