import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const ADIT = () => {
    const curriculum = {
        "ADIT Curriculum": {
            "Semester 1: Software Development & Database": {
                "Programming Logic": ["Variables, Loops, and Functions in Python", "Object-Oriented Programming (OOP)", "File management and data scripts"],
                "Database Systems": ["SQL Server & MySQL Architecture", "Writing Joins, Subqueries & Indexes", "Database backup and user permissions"]
            },
            "Semester 2: Advanced Web Technologies & Security": {
                "Web Engineering": ["Advanced JavaScript (ES6+)", "Working with API endpoints & JSON", "Responsive grids & Tailwind layout design"],
                "Network Security": ["Network protocols & security layers", "Firewall configurations & server hardening", "Auditing network traffic logs"]
            }
        }
    };

    const careerPaths = [
        { title: "Junior Software Developer", desc: "Build application modules, implement features, and audit database queries." },
        { title: "Database Administrator", desc: "Manage server databases, audit connection strings, and configure automated backups." },
        { title: "Web Developer", desc: "Design and implement modern responsive front-end layouts and integrate APIs." }
    ];

    return (
        <CourseTemplate 
            title="ADIT / A Level (Adv. Diploma in IT)"
            subtitle="Become a software engineer with advanced programming, database administration, and security capabilities."
            description="Our advanced professional-track IT diploma prepares you to code backend software databases, secure local servers, and compile applications."
            image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200"
            curriculum={curriculum}
            careerPaths={careerPaths}
            seoTitle="Advanced Diploma in IT (ADIT / A Level) | ICCVS Delhi"
            seoDesc="Master Python, database administration, SQL Server, advanced web development, and network security."
        />
    );
};

export default ADIT;
