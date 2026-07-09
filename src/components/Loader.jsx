import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
    const [percentage, setPercentage] = useState(0);
    const containerRef = useRef(null);
    const sloganRef = useRef(null);
    const welcomeRef = useRef(null);
    const bottomRef = useRef(null);
    const progressContainerRef = useRef(null);
    const progressBarRef = useRef(null);
    const percentageRef = useRef(null);

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

            // 2. Element Intro Animations
            tl.to([sloganRef.current, welcomeRef.current, bottomRef.current], {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            });

            // 3. Progress Animation (Percentage and bar width)
            const countObj = { value: 0 };
            tl.to(countObj, {
                value: 100,
                duration: 1.6,
                ease: 'power2.out',
                onUpdate: () => {
                    setPercentage(Math.floor(countObj.value));
                }
            }, '-=0.2');

            tl.to(progressBarRef.current, {
                width: '100%',
                duration: 1.6,
                ease: 'power2.out'
            }, '<');

            // 4. Outro Slide Up Animation (Cinematic reveal of underlying page)
            tl.to(containerRef.current, {
                yPercent: -100,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.inOut'
            }, '+=0.2');

        }, containerRef);

        return () => {
            ctx.revert();
            document.body.style.overflow = '';
            document.body.style.height = '';
        };
    }, [onComplete]);

    return (
        <div ref={containerRef} className="staircase-loader-container">
            {/* Top: Slogan */}
            <div ref={sloganRef} className="loader-slogan-wrapper">
                <span className="loader-slogan-text">Our Target Your Success</span>
            </div>

            {/* Middle: Welcome Text */}
            <div ref={welcomeRef} className="loader-welcome-wrapper">
                <h1 className="loader-welcome-text">Welcome to ICCVS Website</h1>
                <span className="loader-welcome-subtext">Vocational &amp; Computer Studies</span>
            </div>

            {/* Bottom: Progress bar and percentage */}
            <div ref={bottomRef} className="loader-bottom-wrapper">
                <div ref={progressContainerRef} className="loader-progress-container">
                    <div ref={progressBarRef} className="loader-progress-bar" />
                </div>
                <div ref={percentageRef} className="loader-percentage">
                    {percentage}%
                </div>
            </div>
        </div>
    );
};

export default Loader;
