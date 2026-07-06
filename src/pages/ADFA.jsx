import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const ADFA = () => {
    const curriculum = {
        "Accounting Curriculum": {
            "Module 1: Advanced Financial Accounting": [
                "Advanced bookkeeping and auditing techniques",
                "Partnership accounts, shares, and debentures",
                "Ratio analysis and Cash flow statements"
            ],
            "Module 2: Enterprise Tally Prime": [
                "Multi-currency management and cost centers",
                "Inventory tracking across godowns & batch numbers",
                "Payroll management and salary slip generation"
            ],
            "Module 3: Direct & Indirect Taxes": [
                "GST e-way bills and GSTR return computation",
                "Income tax adjustments and TDS filings",
                "Advanced financial modeling in MS Excel"
            ]
        }
    };

    const careerPaths = [
        { title: "Senior Accountant", desc: "Supervise multi-tier corporate bookkeeping, manage tax filings, and draft budget forecasts." },
        { title: "MIS & Financial Executive", desc: "Build advanced financial spreadsheets, extract ERP records, and compile reports for board reviews." },
        { title: "Tax Consultant Support", desc: "Audit tax credit adjustments, resolve GST issues, and prepare documents for filings." }
    ];

    return (
        <CourseTemplate 
            title="ADFA (Adv. Diploma in Financial Accounting)"
            subtitle="Acquire advanced financial accounting, taxation, auditing, and corporate billing skills."
            description="Our advanced professional-track accounting diploma prepares you to manage financial records of mid-to-large scale business houses."
            image="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=1200"
            curriculum={curriculum}
            careerPaths={careerPaths}
            seoTitle="Advanced Diploma in Financial Accounting (ADFA) | ICCVS Delhi"
            seoDesc="Become a professional senior accountant. Master Tally Prime, advanced GST, TDS, and corporate auditing."
        />
    );
};

export default ADFA;
