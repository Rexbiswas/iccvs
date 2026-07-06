import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const Diploma = () => {
    const curriculum = {
        "Diploma Structure": {
            "Module 1: IT Fundamentals": [
                "Computer Architecture basics",
                "Operating Systems installation and settings",
                "Working with files, formatting drives, and setup"
            ],
            "Module 2: Office Automation": [
                "Advanced Document formatting (MS Word)",
                "Spreadsheet management, charts and sorting (MS Excel)",
                "Making corporate presentations (MS PowerPoint)",
                "Database basics (MS Access)"
            ],
            "Module 3: Accounting & Web": [
                "Introduction to Tally Prime accounting entries",
                "Internet searching, email management, and web utilities"
            ]
        }
    };

    const careerPaths = [
        { title: "Office Administrator", desc: "Supervise administrative documentation, spreadsheets, and reporting structures." },
        { title: "Data Entry Specialist", desc: "Maintain high speed and high accuracy data processing operations." },
        { title: "Administrative Assistant", desc: "Organize office schedules, handle email flows, and run documentation operations." }
    ];

    return (
        <CourseTemplate 
            title="Diploma (Computer Applications)"
            subtitle="Build a strong foundation in office automation, data management, and basic accounting."
            description="Our popular diploma course guarantees you are comfortable with everyday business operations and database management."
            image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200"
            curriculum={curriculum}
            careerPaths={careerPaths}
            seoTitle="Diploma in Computer Applications | ICCVS Delhi"
            seoDesc="Get ISO certified Diploma in Computer Applications. Learn Office Automation and computer operations."
        />
    );
};

export default Diploma;
