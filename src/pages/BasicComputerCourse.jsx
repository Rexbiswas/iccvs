import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const BasicComputerCourse = () => {
    const curriculum = {
        "Course Modules": {
            "Module 1: Computer Fundamentals": [
                "Introduction to Hardware & Software",
                "Operating System (Windows OS Overview)",
                "Working with Notepad, Wordpad, & MS Paint",
                "File Management & Folder Structures"
            ],
            "Module 2: Microsoft Office": [
                "MS Word (Document creation, formatting, page layouts)",
                "MS Excel (Spreadsheet basics, rows/columns, basic formulas)",
                "MS PowerPoint (Slide presentations, transitions, animations)"
            ],
            "Module 3: Internet & Communication": [
                "Web Browsing & Search Engine Optimization",
                "E-mail Management (Sending, receiving, attachments)",
                "Cyber Security Basics & Safe Browsing Practices"
            ]
        }
    };

    const careerPaths = [
        { title: "Office Assistant", desc: "Manage day-to-day documentation, spreadsheets, and office admin tasks." },
        { title: "Computer Operator", desc: "Perform data processing, spreadsheet operations, and email communication." },
        { title: "Front Desk Executive", desc: "Handle guest registrations, inquiries, and customer-facing computer tasks." }
    ];

    return (
        <CourseTemplate 
            title="Basic Computer Course"
            subtitle="Learn computer fundamentals, operating systems, and essential office tools."
            description="Perfect for beginners, this course prepares you for entry-level office roles by establishing core digital skills."
            image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200"
            curriculum={curriculum}
            careerPaths={careerPaths}
            seoTitle="Basic Computer Course | ICCVS Delhi"
            seoDesc="Learn Windows OS, MS Word, Excel, PowerPoint, and basic internet skills at ICCVS Computer Education."
        />
    );
};

export default BasicComputerCourse;
