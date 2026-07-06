import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const DataAnalyst = () => {
    const curriculum = {
        "Data Curriculum": {
            "Module 1: Excel & SQL Foundations": [
                "Advanced spreadsheet functions (XLOOKUP, Nested IFs)",
                "Pivot Tables, charts, and data cleaning in Excel",
                "Relational Database Concepts & SQL Server Basics",
                "Writing complex SQL Joins, Group By, and subqueries"
            ],
            "Module 2: Python Programming for Analytics": [
                "Python syntax, loops, and data structures (lists, dicts)",
                "Jupyter Notebook environment and script setups",
                "Data Analysis using Pandas & NumPy libraries",
                "Data Visualization using Matplotlib & Seaborn"
            ],
            "Module 3: Business Intelligence & Dashboards": [
                "Power BI / Tableau (Importing data, modeling relationship)",
                "Creating interactive dashboards & KPI trackers",
                "Publishing and presenting insights to management"
            ]
        }
    };

    const careerPaths = [
        { title: "Data Analyst", desc: "Extract business data, run analytical scripts, and generate performance dashboards." },
        { title: "Business Intelligence Analyst", desc: "Build automated KPI dashboards in Power BI and guide strategy." },
        { title: "Data Reporter", desc: "Clean corporate operational records, audit databases, and present reports." }
    ];

    return (
        <CourseTemplate 
            title="Data Analyst"
            subtitle="Build dashboards and extract commercial data insights using SQL, Python, and Power BI."
            description="Our specialized analytics program transforms you into a professional data analyst prepared for high-paying corporate roles."
            image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200"
            curriculum={curriculum}
            careerPaths={careerPaths}
            seoTitle="Data Analyst Course (Python, SQL, Power BI) | ICCVS Delhi"
            seoDesc="Master data analytics. Learn Python data science libraries, SQL databases, Power BI, and advanced Excel."
        />
    );
};

export default DataAnalyst;
