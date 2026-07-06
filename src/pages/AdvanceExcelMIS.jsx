import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const AdvanceExcelMIS = () => {
    const curriculum = {
        "MIS Modules": {
            "Module 1: MIS Foundations & Reporting": [
                "Role of MIS in business decision making",
                "Designing structural data pipelines",
                "Advanced data cleaning & duplication removal"
            ],
            "Module 2: Advanced Pivot & Summary Systems": [
                "Using Pivot Tables with multiple connections",
                "Creating calculated fields & items in Pivots",
                "Conditional formats for management review reports"
            ],
            "Module 3: MIS Dashboard Design": [
                "Creating summary templates for executive dashboards",
                "Linking Excel charts dynamically to databases",
                "Automating monthly reports generation"
            ]
        }
    };

    const careerPaths = [
        { title: "MIS Executive", desc: "Process monthly corporate records, build tracking dashboards, and report findings." },
        { title: "Operations Analyst", desc: "Maintain departmental data pipelines and verify inventory logs." },
        { title: "Business Data Coordinator", desc: "Compile multi-tier performance files, clean records, and support audits." }
    ];

    return (
        <CourseTemplate 
            title="Advance Excel (MIS)"
            subtitle="Master Management Information System (MIS) setups and executive dashboards."
            description="Our specialized MIS program focuses on configuring automated data summary systems for executive reviews and corporate operations."
            image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
            curriculum={curriculum}
            careerPaths={careerPaths}
            seoTitle="Advanced Excel MIS Course | ICCVS Delhi"
            seoDesc="Become an MIS Executive. Learn business summary systems, automated reporting, and advanced corporate data pipeline configurations."
        />
    );
};

export default AdvanceExcelMIS;
