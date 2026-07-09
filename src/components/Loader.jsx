import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
    const [percentage, setPercentage] = useState(0);
    const containerRef = useRef(null);
    const sloganRef = useRef(null);
    const welcomeRef = useRef(null);
    const bottomRef = useRef(null);
    const percentageRef = useRef(null);
    const wordsRef = useRef(null);
    const panelsRef = useRef([]);

    const numPanels = 6;
    const panels = Array.from({ length: numPanels });

    const words = [
        "Computer Science",
        "Financial Accounting",
        "Creative Design"
    ];

    useEffect(() => {
        // Prevent body scrolling while loader is active
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    // Restore body scroll behavior
                    document.body.style.overflow = '';
                    document.body.style.height = '';
                    // Notify parent to unmount
                    if (onComplete) onComplete();
                }
            });

            // 1. Initial State
            gsap.set(sloganRef.current, { opacity: 0, y: -20 });
            gsap.set(welcomeRef.current, { opacity: 0, y: 20 });
            gsap.set(bottomRef.current, { opacity: 0, y: 20 });
            gsap.set(panelsRef.current, { yPercent: 0 });

            // 2. Element Intro Animations
            tl.to([sloganRef.current, welcomeRef.current, bottomRef.current], {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            });

            // 3. Dynamic Words Animation (Cycles one by one)
            const wordEls = gsap.utils.toArray('.loader-dynamic-word');
            wordEls.forEach((el) => {
                tl.to(el, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                })
                .to(el, {
                    opacity: 0,
                    y: -15,
                    duration: 0.4,
                    ease: 'power2.in'
                }, '+=0.4'); // Pause for 0.4 seconds before fading out
            });

            // 4. Progress Animation (Count up to 100 synchronized with the text length)
            const countObj = { value: 0 };
            tl.to(countObj, {
                value: 100,
                duration: 3.0,
                ease: 'power1.inOut',
                onUpdate: () => {
                    setPercentage(Math.floor(countObj.value));
                }
            }, '0.8'); // Starts right after intro elements enter

            // 5. Content Fade Out (prepare for staircase reveal)
            tl.to([sloganRef.current, wordsRef.current, welcomeRef.current, bottomRef.current], {
                opacity: 0,
                y: -30,
                duration: 0.5,
                stagger: 0.05,
                ease: 'power3.in'
            }, '+=0.2');

            // 6. Staircase Transition: Slide the panels up sequentially
            tl.to(panelsRef.current, {
                yPercent: -100,
                duration: 1.0,
                ease: 'power4.inOut',
                stagger: {
                    each: 0.1,
                    from: 'start'
                }
            }, '-=0.3');

        }, containerRef);

        return () => {
            ctx.revert();
            document.body.style.overflow = '';
            document.body.style.height = '';
        };
    }, [onComplete]);

    return (
        <div ref={containerRef} className="staircase-loader-container">
            {/* Staircase Background Panels */}
            <div className="staircase-panels-wrapper">
                {panels.map((_, index) => (
                    <div
                        key={index}
                        ref={(el) => (panelsRef.current[index] = el)}
                        className="staircase-panel"
                    />
                ))}
            </div>

            {/* Top: Slogan */}
            <div ref={sloganRef} className="loader-slogan-wrapper">
                <span className="loader-slogan-text">Our Target Your Success</span>
            </div>

            {/* Middle: Dynamic Word Cycle */}
            <div ref={wordsRef} className="loader-dynamic-words-container">
                {words.map((word, idx) => (
                    <span key={idx} className="loader-dynamic-word opacity-0 absolute">
                        {word}
                    </span>
                ))}
            </div>

            {/* Middle: Welcome Text */}
            <div ref={welcomeRef} className="loader-welcome-wrapper">
                <h1 className="loader-welcome-text">Welcome to ICCVS Website</h1>
                <span className="loader-welcome-subtext">Vocational &amp; Computer Studies</span>
            </div>

            {/* Bottom Right: Percentage */}
            <div ref={bottomRef} className="loader-bottom-wrapper">
                <div ref={percentageRef} className="loader-percentage">
                    {percentage}%
                </div>
            </div>
        </div>
    );
};

export default Loader;
