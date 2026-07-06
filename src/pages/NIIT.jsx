import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const NIIT = () => {
    const curriculum = {
        "Authorized Curriculum": {
            "Module 1: Programming Foundations": [
                "Logic structures, flowcharts, and pseudo-code",
                "Procedural Programming in C",
                "Object-Oriented Programming principles in C++",
                "Memory allocation, pointers, and structures"
            ],
            "Module 2: Enterprise Software Development": [
                "Java Programming fundamentals (Classes, Inheritance)",
                "Exception handling & File input/output streams",
                "Relational Database Management (RDBMS & SQL queries)"
            ],
            "Module 3: Python & Web Tech": [
                "Python Scripting basics & data collections",
                "Front-end interfaces (HTML, CSS, JavaScript)"
            ]
        }
    };

    const careerPaths = [
        { title: "Junior Software Associate", desc: "Write clean module code, execute debugging checks, and support code deployments." },
        { title: "Software Programmer", desc: "Develop backend algorithms, configure API services, and audit code quality." },
        { title: "Database Administrator Assistant", desc: "Build database queries, index transaction tables, and audit logs." }
    ];

    return (
        <CourseTemplate 
            title="NIIT Authorized Courses"
            subtitle="Industry-aligned tech curriculums design for professional programming careers."
            description="Our NIIT-standard training program builds structured software engineering logic using standard C++, Java, and SQL structures."
            image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200"
            curriculum={curriculum}
            careerPaths={careerPaths}
            seoTitle="NIIT Authorized Computer Programming | ICCVS Delhi"
            seoDesc="Master Java, C++, SQL, and logic structure. Get professional software engineering training."
        />
    );
};

export default NIIT;
