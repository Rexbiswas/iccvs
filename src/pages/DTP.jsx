import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const DTP = () => {
    const curriculum = {
        "Design Modules": {
            "Module 1: Typography & Page Layouts": [
                "Principles of Desktop Publishing",
                "Working with PageMaker/InDesign",
                "Typography rules and font selection",
                "Book & Magazine layout design"
            ],
            "Module 2: Graphic Designing Tools": [
                "CorelDraw (Vector graphics, illustrations, brochure designs)",
                "Adobe Photoshop (Image editing, color correction, effects)",
                "Creating logos, banner designs, and business cards"
            ],
            "Module 3: Pre-Press & Printing": [
                "Understanding color profiles (RGB vs CMYK)",
                "File formats and output settings for print media",
                "Offset and digital printing setup"
            ]
        }
    };

    const careerPaths = [
        { title: "DTP Operator", desc: "Design page layouts, edit assets, and format documents for printing houses." },
        { title: "Graphic Designer", desc: "Create high-impact branding materials, flyers, brochures, and digital banners." },
        { title: "Print Production Specialist", desc: "Coordinate pre-press layout setup and manage commercial printer machines." }
    ];

    return (
        <CourseTemplate 
            title="DTP (Desktop Publishing)"
            subtitle="Master graphic design and print publishing using standard tools."
            description="Acquire specialized printing and layout publishing skills to start a career in design studios and printing houses."
            image="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200"
            curriculum={curriculum}
            careerPaths={careerPaths}
            seoTitle="Desktop Publishing (DTP) Course | ICCVS Delhi"
            seoDesc="Learn CorelDraw, Photoshop, and page layout layout design in our DTP publishing course."
        />
    );
};

export default DTP;
