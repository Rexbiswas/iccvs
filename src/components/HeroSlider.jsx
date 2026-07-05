import React from 'react';

const HeroSlider = () => {
    return (
        <div className="relative w-full h-full overflow-hidden group select-none rounded-none">
            {/* Main Hero Image */}
            <div className="relative w-full h-full overflow-hidden">
                <img
                    src="https://ik.imagekit.io/fmldynl4j4/file_000000003d4c71fa93dea6ae0642f264-removebg-preview.png"
                    alt="Student with Vision"
                    className="w-full h-full object-contain object-center lg:object-left"
                    fetchpriority="high"
                />
            </div>
        </div>
    );
};

export default HeroSlider;
