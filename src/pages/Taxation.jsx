import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const Taxation = () => {
    const curriculum = {
        "Taxation Modules": {
            "Module 1: Goods & Services Tax (GST)": [
                "GST Concepts, registration thresholds, and rules",
                "Filing GSTR-1 (Outward supplies) & GSTR-3B (Summary returns)",
                "Input Tax Credit (ITC) audits & reconciliation",
                "E-way bills generation and GST portal updates"
            ],
            "Module 2: Income Tax Fundamentals": [
                "Income heads (Salaries, House Property, Capital Gains)",
                "Deductions under Chapter VI-A",
                "E-filing of Income Tax Returns (ITR-1, 2, 3, 4)",
                "Advance Tax calculations and pan card setups"
            ],
            "Module 3: TDS & TCS Rules": [
                "TDS provisions, thresholds, and rate structures",
                "Generating TDS certificates (Form 16/16A)",
                "Filing quarterly TDS returns (Form 24Q, 26Q)"
            ]
        }
    };

    const careerPaths = [
        { title: "Tax Accountant", desc: "Supervise tax auditing, compute monthly liabilities, and file compliance filings." },
        { title: "GST Practitioner", desc: "Manage independent tax advisory services, register entities, and file returns." },
        { title: "Tax Auditor Support", desc: "Verify billing records for input tax credit compliance and audit anomalies." }
    ];

    return (
        <CourseTemplate 
            title="Taxation Course"
            subtitle="Develop specialized expertise in GST, Income Tax return e-filing, and TDS compliance."
            description="Our specialized taxation program focuses strictly on Indian direct/indirect tax computation rules and portal filings."
            image="https://images.unsplash.com/photo-1554224155-1696413575b3?auto=format&fit=crop&q=80&w=1200"
            curriculum={curriculum}
            careerPaths={careerPaths}
            seoTitle="Taxation & E-Filing Course | ICCVS Delhi"
            seoDesc="Learn live GST e-filing, Income Tax return filings, TDS, and TCS compliance at ICCVS."
        />
    );
};

export default Taxation;
