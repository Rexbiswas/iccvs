import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const AdvanceExcelMacro = () => {
    const curriculum = {
        "VBA Macro Syllabus": {
            "Module 1: Macro Recording & Editor Basics": [
                "Developer tab setups and security rules",
                "Recording basic macros and assigning custom buttons",
                "Introduction to Visual Basic Editor (VBE) panels"
            ],
            "Module 2: VBA Programming Structures": [
                "Variables, data types, and scope in VBA",
                "Writing conditional statements (If-Then-Else, Select Case)",
                "Loop structures (For Next, Do While, For Each)",
                "Working with Range, Workbook, and Sheet objects"
            ],
            "Module 3: Advanced Automation": [
                "Creating User Forms, input fields, and validation",
                "Writing custom user-defined formulas (UDF)",
                "Automating cross-file data processing tasks"
            ]
        }
    };

    const careerPaths = [
        { title: "VBA Developer", desc: "Write VBA automation logic, create dashboard controls, and integrate systems." },
        { title: "Process Automation Analyst", desc: "Redesign repetitive office tasks into single-button automated macro scripts." },
        { title: "Excel Automation Consultant", desc: "Advise business units on spreadsheet performance optimization and script debugging." }
    ];

    return (
        <CourseTemplate 
            title="Advance Excel (Macro)"
            subtitle="Automate repetitive calculations and reports using VBA macros."
            description="Our specialized automation program teaches you Visual Basic programming inside Excel to design automated systems."
            image="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200"
            curriculum={curriculum}
            careerPaths={careerPaths}
            seoTitle="VBA Macro & Excel Automation Course | ICCVS Delhi"
            seoDesc="Learn Excel VBA macro programming, script formatting, process automation, and custom form building."
        />
    );
};

export default AdvanceExcelMacro;
