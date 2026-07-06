import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const AdvanceExcelDashboard = () => {
    const curriculum = {
        "Dashboard Syllabus": {
            "Module 1: Visual Principles & KPI Selection": [
                "Dashboard design logic (F-Shape, Grid structures)",
                "Selecting critical KPIs for executive review",
                "Color psychology and typography rules in reports"
            ],
            "Module 2: Advanced Charts & Dynamic Elements": [
                "Dynamic chart structures (Scroll-dependent charts, thermocharts)",
                "Using Form Controls (Scroll bars, checkboxes, radio buttons)",
                "Working with Slicers, timelines, and Pivot charts"
            ],
            "Module 3: Interactive Dashboard Project": [
                "Structuring clean data backends and summary metrics",
                "Building dynamic KPI tracking dashboard interfaces",
                "Protecting sheets, sharing controls, and printing setups"
            ]
        }
    };

    const careerPaths = [
        { title: "Reporting Analyst", desc: "Build visual business performance reports, track KPIs, and compile summaries." },
        { title: "Data Visualizer Specialist", desc: "Redesign complex spreadsheet tables into visual interfaces." },
        { title: "Business Intelligence Associate", desc: "Create interactive models and dashboard trackers for leadership reviews." }
    ];

    return (
        <CourseTemplate 
            title="Advance Excel (Dash Board)"
            subtitle="Build interactive dashboards and tracking tools for business performance."
            description="Our dashboard-focused program teaches you to turn spreadsheets into visual interfaces for management reporting."
            image="https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=1200"
            curriculum={curriculum}
            careerPaths={careerPaths}
            seoTitle="Excel Dashboard Design Course | ICCVS Delhi"
            seoDesc="Master interactive Excel dashboards. Learn dynamic charts, form controls, slices, and KPI designs."
        />
    );
};

export default AdvanceExcelDashboard;
