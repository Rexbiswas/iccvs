import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Timer, Award, CheckCircle2, XCircle, ChevronRight, ChevronLeft,
    RefreshCw, Play, Info, AlertTriangle, ArrowRight, BookMarked, HelpCircle,
    UserCheck, Clock
} from 'lucide-react';
import useLenisSmoothScroll from '../hooks/useLenisSmoothScroll';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

const testSubjects = [
    {
        id: 'coding',
        title: 'Coding & Software Development',
        desc: 'Test your programming logic, data structures, and core coding concepts in Python, JS, and HTML/CSS.',
        duration: 300, // 5 mins in seconds
        questions: [
            {
                q: "What is the output of type(type(int)) in Python?",
                options: ["<class 'type'>", "<class 'int'>", "int", "Error"],
                correct: 0,
                ex: "In Python, 'int' is a class object, and its type is the metaclass 'type'. Therefore, type(int) returns <class 'type'>, and type(<class 'type'>) also returns <class 'type'>"
            },
            {
                q: "Which HTML5 tag is used to embed independent, self-contained content?",
                options: ["<section>", "<article>", "<aside>", "<div>"],
                correct: 1,
                ex: "The <article> tag is semantic HTML5 designed specifically for independent, self-contained content that can be distributed or reused independently (e.g. blog posts, forum posts)."
            },
            {
                q: "In JavaScript, what is the value of [] == ![]?",
                options: ["true", "false", "undefined", "TypeError"],
                correct: 0,
                ex: "In JavaScript, [] is truthy, so ![] becomes false. The comparison [] == false then converts both to numbers: [] becomes 0 and false becomes 0, resulting in 0 == 0 which is true."
            },
            {
                q: "Which CSS property controls the spacing between grid items?",
                options: ["grid-margin", "gap", "grid-spacing", "gutter"],
                correct: 1,
                ex: "The 'gap' CSS property (formerly grid-gap) sets the size of the gaps (gutters) between grid rows and columns."
            },
            {
                q: "What is the time complexity of searching in a balanced Binary Search Tree (BST)?",
                options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
                correct: 2,
                ex: "A balanced BST halves the search space at each step, making search operations run in logarithmic time, represented as O(log n)."
            }
        ]
    },
    {
        id: 'webtech',
        title: 'Web Technologies & Databases',
        desc: 'Assess your skills in server protocols, network basics, databases, hooks, and standard API development.',
        duration: 300,
        questions: [
            {
                q: "What does HTTP status code 403 represent?",
                options: ["Unauthorized", "Forbidden", "Not Found", "Internal Server Error"],
                correct: 1,
                ex: "HTTP status code 403 Forbidden means that the server understands the request but refuses to authorize it."
            },
            {
                q: "Which protocol is primarily used for securely transferring data over the web?",
                options: ["FTP", "SMTP", "HTTPS", "SSH"],
                correct: 2,
                ex: "HTTPS (Hypertext Transfer Protocol Secure) encrypts communication using TLS/SSL to transfer web data securely."
            },
            {
                q: "What is the primary purpose of a DNS (Domain Name System)?",
                options: ["To host website files", "To translate domain names to IP addresses", "To route traffic securely", "To design layouts"],
                correct: 1,
                ex: "DNS acts as the phonebook of the internet, converting human-readable domain names (like iccvs.com) into machine-readable IP addresses."
            },
            {
                q: "Which SQL clause is used to filter records in a group?",
                options: ["WHERE", "GROUP BY", "HAVING", "FILTER"],
                correct: 2,
                ex: "The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions; it filters groups."
            },
            {
                q: "In React, which hook is used to perform side effects?",
                options: ["useState", "useEffect", "useContext", "useReducer"],
                correct: 1,
                ex: "The useEffect hook allows you to perform side effects (such as fetching data, direct DOM updates, or setting up subscriptions) in function components."
            }
        ]
    },
    {
        id: 'uiux',
        title: 'UI/UX Design Fundamentals',
        desc: 'Test your understanding of layout hierarchies, wireframing guidelines, accessibility, and UX laws.',
        duration: 300,
        questions: [
            {
                q: "What does the term 'UX' stand for?",
                options: ["User Experience", "User Extension", "Utility Exchange", "Unique X-factor"],
                correct: 0,
                ex: "UX stands for User Experience, which encompasses all aspects of the end-user's interaction with the company, its services, and its products."
            },
            {
                q: "What is the primary purpose of wireframing in UI/UX?",
                options: ["Finalizing visual colors and branding", "Designing the layout and structure of a page without visual design", "Writing code for the website", "Developing database schemas"],
                correct: 1,
                ex: "Wireframes are simple line drawings used to define the layout structure, information hierarchy, and content placement of a page before visual styles are applied."
            },
            {
                q: "Which design principle refers to the arrangement of elements to show their order of importance?",
                options: ["Contrast", "Proximity", "Hierarchy", "Balance"],
                correct: 2,
                ex: "Visual hierarchy is the principle of arranging elements to show their order of importance, guiding the user's eye naturally through the layout."
            },
            {
                q: "What does Fitts's Law state in UX design?",
                options: ["The time to acquire a target is a function of the distance to and size of the target", "User attention naturally follows an F-shaped pattern", "A system should always keep users informed about what is going on", "More options lead to decision fatigue"],
                correct: 0,
                ex: "Fitts's Law is a predictive model of human movement that states the time required to rapidly move to a target is a function of the ratio between the distance to the target and its width."
            },
            {
                q: "What is the main characteristic of a responsive design?",
                options: ["It loads in under 1 second", "It responds to user voice commands", "It adapts to different screen sizes and devices automatically", "It uses animations for all elements"],
                correct: 2,
                ex: "Responsive design refers to a design approach where layouts adjust dynamically to provide optimal viewing experiences across mobile, tablet, and desktop screens."
            }
        ]
    },
    {
        id: 'graphic',
        title: 'Graphic Design & Digital Media',
        desc: 'Assess your knowledge on color schemes, typography terminology, vector formats, and digital marketing.',
        duration: 300,
        questions: [
            {
                q: "What does RGB stand for?",
                options: ["Red, Green, Blue", "Red, Gray, Black", "Retro, Gradient, Blend", "Radial, Grid, Border"],
                correct: 0,
                ex: "RGB stands for Red, Green, and Blue, which are the primary colors of light used in digital screens and monitors."
            },
            {
                q: "Which file format is vector-based and scalable without losing quality?",
                options: ["PNG", "JPEG", "SVG", "GIF"],
                correct: 2,
                ex: "SVG (Scalable Vector Graphics) is an XML-based vector image format that can be scaled to any size without pixelation or loss of quality."
            },
            {
                q: "In typography, what is 'kerning'?",
                options: ["The spacing between lines of text", "The adjustment of space between two specific characters", "The height of the capital letters", "The thickness of letter strokes"],
                correct: 1,
                ex: "Kerning is the process of adjusting the spacing between two specific characters to improve readability and visual balance."
            },
            {
                q: "What is the primary goal of SEO (Search Engine Optimization)?",
                options: ["To design beautiful advertisements", "To increase the visibility and organic traffic of a website on search engines", "To run paid campaigns on social media", "To host files on cloud servers"],
                correct: 1,
                ex: "SEO focuses on optimizing a website's structure and content so it ranks higher in organic search engine results pages, driving unpaid traffic."
            },
            {
                q: "Which color scheme uses colors that are opposite each other on the color wheel?",
                options: ["Analogous", "Monochromatic", "Complementary", "Triadic"],
                correct: 2,
                ex: "Complementary color schemes use two colors that are directly opposite each other on the color wheel (e.g. red and green, blue and orange), creating high contrast."
            }
        ]
    }
];

const MockTest = () => {
    useLenisSmoothScroll({ lerp: 0.1 });

    const [selectedSubject, setSelectedSubject] = useState(null);
    const [testState, setTestState] = useState('idle'); // idle, testing, finished
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [userAnswers, setUserAnswers] = useState({}); // questionIdx: selectedOptionIdx
    const [timeLeft, setTimeLeft] = useState(0);
    const [score, setScore] = useState(0);
    const [showResultsReview, setShowResultsReview] = useState(false);
    
    const timerRef = useRef(null);

    // Start Test
    const startTest = (subject) => {
        setSelectedSubject(subject);
        setTestState('testing');
        setCurrentQuestionIdx(0);
        setUserAnswers({});
        setTimeLeft(subject.duration);
        setShowResultsReview(false);
    };

    // Timer logic
    useEffect(() => {
        if (testState === 'testing' && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        submitTest(true); // Auto submit on timeout
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [testState, timeLeft]);

    // Handle Option Select
    const handleSelectOption = (optionIdx) => {
        setUserAnswers({
            ...userAnswers,
            [currentQuestionIdx]: optionIdx
        });
    };

    // Navigation
    const nextQuestion = () => {
        if (currentQuestionIdx < selectedSubject.questions.length - 1) {
            setCurrentQuestionIdx(currentQuestionIdx + 1);
        }
    };

    // Previous Question
    const prevQuestion = () => {
        if (currentQuestionIdx > 0) {
            setCurrentQuestionIdx(currentQuestionIdx - 1);
        }
    };

    // Submit Test
    const submitTest = (isTimeout = false) => {
        if (timerRef.current) clearInterval(timerRef.current);
        
        // Calculate Score
        let correctCount = 0;
        selectedSubject.questions.forEach((q, idx) => {
            if (userAnswers[idx] === q.correct) {
                correctCount++;
            }
        });
        
        setScore(correctCount);
        setTestState('finished');
    };

    // Reset/Quit Test
    const resetTest = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setSelectedSubject(null);
        setTestState('idle');
        setUserAnswers({});
        setCurrentQuestionIdx(0);
        setTimeLeft(0);
    };

    // Format time
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col pt-28">
            <SEO
                title="Interactive Mock Test Portal | ICCVS Computer Education"
                description="Practice and assess your skills in Coding, Web Technologies, UI/UX Design, and Graphic Design. Get instant feedback and detailed explanations."
                keywords="iccvs mock test, computer coding test, web development quiz, UI UX test, digital media exam, IT skills assessment"
            />

            <main className="flex-1 max-w-6xl w-full mx-auto px-6 pb-20">
                {/* 1. IDLE STATE: Subject Selection */}
                {testState === 'idle' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-12"
                    >
                        <div className="text-center space-y-4 max-w-3xl mx-auto">
                            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest border border-primary/20">
                                Assessment Portal
                            </span>
                            <h1 className="text-clamp-3xl font-black text-slate-900 tracking-tight leading-none uppercase mt-2">
                                Free Mock Practice Tests
                            </h1>
                            <p className="text-clamp-md text-slate-500 font-medium max-w-xl mx-auto">
                                Assess your skills, prepare for job interviews, and evaluate your knowledge in core digital domains. Pick a subject below to begin.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {testSubjects.map((sub) => (
                                <motion.div
                                    key={sub.id}
                                    whileHover={{ y: -8, scale: 1.01 }}
                                    className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-xl flex flex-col justify-between group transition-all duration-300 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-all duration-500" />
                                    
                                    <div className="space-y-4 relative z-10">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                            <BookOpen size={24} />
                                        </div>
                                        <h3 className="text-2xl font-black tracking-tight text-slate-800 uppercase">
                                            {sub.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                            {sub.desc}
                                        </p>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between relative z-10">
                                        <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase">
                                            <span className="flex items-center gap-1">
                                                <Clock size={14} className="text-primary" />
                                                {sub.duration / 60} Mins
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <HelpCircle size={14} className="text-secondary" />
                                                {sub.questions.length} Questions
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => startTest(sub)}
                                            className="px-6 py-3 bg-slate-900 hover:bg-primary text-white rounded-full text-xs font-black uppercase tracking-widest shadow-md flex items-center gap-2 group-hover:shadow-lg transition-all"
                                        >
                                            Start Test
                                            <Play size={12} fill="currentColor" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Informational Guidelines Card */}
                        <div className="bg-slate-900 text-white rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/15 pointer-events-none" />
                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Info className="text-secondary animate-pulse" size={24} />
                                    <h3 className="text-lg font-black tracking-widest uppercase">Instructions & Guidelines</h3>
                                </div>
                                <ul className="space-y-3 text-sm text-slate-300 font-medium">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                        Each test has a 5-minute limit and will automatically submit on timeout.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                        Questions are multiple-choice. Ensure you select an option before proceeding.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                        Submit whenever you are ready. Results will detail your strengths and offer explanations.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 2. ACTIVE TEST STATE */}
                {testState === 'testing' && selectedSubject && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-w-4xl mx-auto space-y-8"
                    >
                        {/* Test Header bar */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Active Assessment</span>
                                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">{selectedSubject.title}</h2>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2 text-slate-700 font-bold">
                                    <Timer size={18} className="text-primary animate-pulse" />
                                    <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                                </div>
                                <button
                                    onClick={resetTest}
                                    className="px-4 py-2 border border-slate-200 rounded-full hover:bg-slate-50 text-slate-500 font-black text-[10px] tracking-widest uppercase transition-all"
                                >
                                    Quit Test
                                </button>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                                <span>Question {currentQuestionIdx + 1} of {selectedSubject.questions.length}</span>
                                <span>{Math.round(((currentQuestionIdx + 1) / selectedSubject.questions.length) * 100)}% Complete</span>
                            </div>
                            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-linear-to-r from-primary to-secondary"
                                    initial={{ width: '0%' }}
                                    animate={{ width: `${((currentQuestionIdx + 1) / selectedSubject.questions.length) * 100}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </div>

                        {/* Question Card */}
                        <div className="bg-white rounded-[2rem] border border-slate-100 p-8 md:p-12 shadow-2xl space-y-8">
                            <h3 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">
                                {selectedSubject.questions[currentQuestionIdx].q}
                            </h3>

                            <div className="grid grid-cols-1 gap-4">
                                {selectedSubject.questions[currentQuestionIdx].options.map((option, idx) => {
                                    const isSelected = userAnswers[currentQuestionIdx] === idx;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleSelectOption(idx)}
                                            className={`w-full text-left p-5 rounded-2xl border text-sm font-bold transition-all flex items-center justify-between ${
                                                isSelected
                                                    ? 'bg-primary/5 border-primary text-primary shadow-md scale-[1.01]'
                                                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                                            }`}
                                        >
                                            <span>{option}</span>
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-4 ${
                                                isSelected ? 'border-primary bg-primary' : 'border-slate-300'
                                            }`}>
                                                {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={prevQuestion}
                                disabled={currentQuestionIdx === 0}
                                className={`px-6 py-3 border border-slate-200 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 bg-white hover:bg-slate-50 transition-all ${
                                    currentQuestionIdx === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                                }`}
                            >
                                <ChevronLeft size={14} />
                                Previous
                            </button>

                            {currentQuestionIdx < selectedSubject.questions.length - 1 ? (
                                <button
                                    onClick={nextQuestion}
                                    className="px-6 py-3 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-primary hover:shadow-lg transition-all"
                                >
                                    Next Question
                                    <ChevronRight size={14} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => submitTest(false)}
                                    className="px-8 py-3.5 bg-secondary text-slate-950 font-black text-xs uppercase tracking-widest rounded-full shadow-lg hover:shadow-secondary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                >
                                    Submit Test
                                    <CheckCircle2 size={14} />
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* 3. FINISHED STATE: Score & Explanations */}
                {testState === 'finished' && selectedSubject && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto space-y-8"
                    >
                        {/* Score Display Card */}
                        <div className="bg-white rounded-[2rem] border border-slate-100 p-8 md:p-12 shadow-2xl text-center relative overflow-hidden">
                            {/* Decorative element */}
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

                            <div className="space-y-6 relative z-10">
                                <Award size={64} className="text-secondary mx-auto drop-shadow-md" />
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Result Card</span>
                                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-800">
                                        Test Completed!
                                    </h2>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        Subject: {selectedSubject.title}
                                    </p>
                                </div>

                                <div className="flex justify-center items-baseline gap-1 my-8">
                                    <span className="text-6xl md:text-7xl font-black text-slate-900 font-mono">{score}</span>
                                    <span className="text-2xl text-slate-400 font-bold">/ {selectedSubject.questions.length}</span>
                                </div>

                                <div className="grid grid-cols-3 max-w-md mx-auto gap-4 border border-slate-100 bg-slate-50/50 p-4 rounded-2xl shadow-sm text-center">
                                    <div>
                                        <div className="text-lg font-black text-secondary">{score}</div>
                                        <div className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Correct</div>
                                    </div>
                                    <div className="border-x border-slate-200">
                                        <div className="text-lg font-black text-primary">
                                            {selectedSubject.questions.length - score}
                                        </div>
                                        <div className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Wrong</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-black text-slate-800">
                                            {Math.round((score / selectedSubject.questions.length) * 100)}%
                                        </div>
                                        <div className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Percentage</div>
                                    </div>
                                </div>

                                <div className="max-w-md mx-auto pt-4 leading-relaxed font-medium text-slate-500 text-sm">
                                    {score >= 4 ? (
                                        <span className="text-secondary font-bold">Excellent Job! You have outstanding knowledge of this domain. Keep building and refining your skills!</span>
                                    ) : score >= 3 ? (
                                        <span className="text-slate-800 font-bold">Good effort! You have a solid basic understanding. Review the explanations below to target areas of improvement.</span>
                                    ) : (
                                        <span className="text-primary font-bold">Practice makes perfect. Review the explanations below and try the test again to boost your score!</span>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                                    <button
                                        onClick={() => setShowResultsReview(!showResultsReview)}
                                        className="w-full sm:w-auto px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-black text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2"
                                    >
                                        <BookMarked size={14} />
                                        {showResultsReview ? "Hide Details" : "Review Questions"}
                                    </button>
                                    
                                    <button
                                        onClick={() => startTest(selectedSubject)}
                                        className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-primary text-white font-black text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2"
                                    >
                                        <RefreshCw size={14} />
                                        Retake Test
                                    </button>

                                    <button
                                        onClick={resetTest}
                                        className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2"
                                    >
                                        All Subjects
                                        <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Review Section */}
                        <AnimatePresence>
                            {showResultsReview && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-6 pt-4 overflow-hidden"
                                >
                                    <div className="flex items-center gap-2 text-slate-800">
                                        <UserCheck size={20} className="text-secondary" />
                                        <h3 className="text-lg font-black uppercase tracking-wider">Detailed Review</h3>
                                    </div>

                                    {selectedSubject.questions.map((q, idx) => {
                                        const userAns = userAnswers[idx];
                                        const isCorrect = userAns === q.correct;

                                        return (
                                            <div
                                                key={idx}
                                                className={`bg-white rounded-3xl border p-6 md:p-8 space-y-4 shadow-md ${
                                                    isCorrect ? 'border-secondary/20 bg-secondary/[0.01]' : 'border-primary/20 bg-primary/[0.01]'
                                                }`}
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="mt-1 shrink-0">
                                                        {isCorrect ? (
                                                            <CheckCircle2 className="text-secondary" size={20} />
                                                        ) : (
                                                            <XCircle className="text-primary" size={20} />
                                                        )}
                                                    </div>
                                                    <div className="space-y-2 flex-1">
                                                        <h4 className="font-bold text-slate-800 leading-snug">
                                                            Q{idx + 1}: {q.q}
                                                        </h4>
                                                        
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pt-2">
                                                            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                                                                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Your Answer</span>
                                                                <span className={`font-bold ${isCorrect ? 'text-secondary' : 'text-primary'}`}>
                                                                    {userAns !== undefined ? q.options[userAns] : 'No Answer Selected'}
                                                                </span>
                                                            </div>
                                                            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                                                                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Correct Answer</span>
                                                                <span className="font-bold text-secondary">{q.options[q.correct]}</span>
                                                            </div>
                                                        </div>

                                                        {/* Explanation */}
                                                        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs leading-relaxed text-slate-500 font-medium flex gap-2">
                                                            <Info size={14} className="text-primary shrink-0 mt-0.5" />
                                                            <div>
                                                                <strong className="text-slate-700 block mb-0.5">Explanation:</strong>
                                                                {q.ex}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default MockTest;
