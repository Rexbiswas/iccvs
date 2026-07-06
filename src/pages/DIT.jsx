import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const DIT = () => {
    const curriculum = {
        "DIT Syllabus": {
            "Module 1: Computer Hardware & Networking": [
                "PC Hardware assembly, parts, and configuration",
                "Operating System installation & troubleshooting",
                "IP Addressing, subnetting, and LAN setups",
                "Network routers, switches, and cabling"
            ],
            "Module 2: Web Technologies": [
                "HTML5 tags, text formats, and forms",
                "CSS3 layout design and style setups",
                "Introduction to JavaScript for interactions",
                "Web hosting controls and server configurations"
            ],
            "Module 3: Database & Logic": [
                "SQL database basics and tables setup",
                "Programming concepts using Python basics"
            ]
        }
    };

    const careerPaths = [
        { title: "IT Support Technician", desc: "Maintain local network health, configure workstations, and fix hardware failures." },
        { title: "Network Support Associate", desc: "Install network cabling, configure routers, and maintain office network systems." },
        { title: "Web Designer Associate", desc: "Build responsive landing pages, edit web styles, and configure hosting." }
    ];

    return (
        <CourseTemplate 
            title="DIT (Diploma in Information Technology)"
            subtitle="Acquire fundamental network engineering, hardware assembly, and web programming skills."
            description="Our IT Diploma covers both computer infrastructure (hardware, networking) and web interfaces, preparing you for IT support environments."
            image="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?auto=format&fit=crop&q=80&w=1200"
            curriculum={curriculum}
            careerPaths={careerPaths}
            seoTitle="Diploma in Information Technology (DIT) | ICCVS Delhi"
            seoDesc="Learn computer networking, hardware configuration, and web design in our DIT course."
        />
    );
};

export default DIT;
