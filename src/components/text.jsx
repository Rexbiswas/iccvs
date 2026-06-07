import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Word = ({ children, progress, range }) => {
    const color = useTransform(progress, range, ["#cbd5e1", "#0f172b"]);
    return (
        <motion.span style={{ color }} className="inline-block">
            {children}
        </motion.span>
    );
};

const Text = ({ heading = "At INSD, we don’t just graduate to look for jobs; we graduate to create them.", subheading = "Build your own label." }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.85", "start 0.35"]
    });

    const headingWords = heading.split(" ");
    const subheadingWords = subheading.split(" ");
    const totalWords = headingWords.length + subheadingWords.length;

    return (
        <h2
            ref={containerRef}
            className="text-clamp-4xl font-black leading-none tracking-tighter uppercase mb-8 select-none"
        >
            <span className="text-[#cbd5e1]">
                {headingWords.map((word, i) => {
                    const start = i / totalWords;
                    const end = Math.min(1, start + 0.15);
                    return (
                        <React.Fragment key={`h-${i}`}>
                            <Word progress={scrollYProgress} range={[start, end]}>
                                {word}
                            </Word>
                            {i < headingWords.length - 1 && " "}
                        </React.Fragment>
                    );
                })}
            </span>
            <br />
            <span className="italic text-[#cbd5e1] mt-2 inline-block">
                {subheadingWords.map((word, i) => {
                    const globalIdx = headingWords.length + i;
                    const start = globalIdx / totalWords;
                    const end = Math.min(1, start + 0.15);
                    return (
                        <React.Fragment key={`s-${i}`}>
                            <Word progress={scrollYProgress} range={[start, end]}>
                                {word}
                            </Word>
                            {i < subheadingWords.length - 1 && " "}
                        </React.Fragment>
                    );
                })}
            </span>
        </h2>
    );
};

export default Text;

