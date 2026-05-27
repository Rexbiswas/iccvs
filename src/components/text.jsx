import React from 'react';
import { motion } from 'framer-motion';

const Text = ({ heading = "At INSD, we don’t just graduate to look for jobs; we graduate to create them.", subheading = "Build your own label." }) => {
    return (
        <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-clamp-4xl font-black text-slate-950 leading-none tracking-tighter uppercase mb-8"
        >
            {heading}<br />
            <span className="text-primary italic">{subheading}</span>
        </motion.h2>
    );
};

export default Text;
