import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const AdvanceExcel = () => {
    const curriculum = {
        "Excel Syllabus": {
            "Module 1: Core Formulas & References": [
                "Cell referencing (Relative, Absolute, Mixed)",
                "Logical Functions (IF, AND, OR, IFS)",
                "Text & Date Functions (CONCAT, LEFT, MID, TEXT)"
            ],
            "Module 2: Lookup & Match Functions": [
                "VLOOKUP & HLOOKUP master class",
                "Advanced XLOOKUP and INDEX-MATCH combinations",
                "Dynamic arrays and filter functions"
            ],
            "Module 3: Data Tools & Pivot Tables": [
                "Data Sorting, Filtering, and Conditional Formatting",
                "Data Validation rules and drop-down lists",
                "Pivot Tables creation, formatting, and analysis",
                "What-If Analysis (Goal Seek, Scenario Manager)"
            ]
        }
    };

    const careerPaths = [
        { title: "Reporting Specialist", desc: "Build weekly business reports, clean database inputs, and audit spreadsheets." },
        { title: "Operations Analyst Assistant", desc: "Track shipping metrics, monitor stock levels, and organize operations data." },
        { title: "Excel Coordinator", desc: "Manage billing sheets, calculate staff incentives, and compile inventory data." }
    ];

    return (
        <CourseTemplate 
            title="Advance Excel"
            subtitle="Master advanced formulas, lookup functions, data sorting, and pivot tables."
            description="Our specialized Excel program covers advanced spreadsheet formatting, calculations, and reporting, essential for office roles."
            image="https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=1200"
            curriculum={curriculum}
            careerPaths={careerPaths}
            seoTitle="Advanced MS Excel Course | ICCVS Delhi"
            seoDesc="Master Microsoft Excel. Learn VLOOKUP, XLOOKUP, Pivot Tables, dynamic formulas, and data analysis."
        />
    );
};

export default AdvanceExcel;
