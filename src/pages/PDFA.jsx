import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const PDFA = () => {
    const curriculum = {
        "Accounting Curriculum": {
            "Module 1: Corporate Finance & Analysis": [
                "Corporate accounting protocols and financial statement formulation",
                "Advanced financial statement analysis & performance reviews",
                "Banking operations, loans, and treasury management"
            ],
            "Module 2: Direct & Indirect Tax Compliance": [
                "E-filing of Income Tax Returns (ITR-1 to ITR-4)",
                "GST returns e-filing (GSTR-1, GSTR-3B, GSTR-9)",
                "TDS e-filing (Forms 24Q, 26Q) & e-tax payments"
            ],
            "Module 3: Advanced Business Tools": [
                "Advanced Excel (macros, dynamic charts, arrays)",
                "Business Analytics & reporting templates",
                "Auditing procedures & compliance checks"
            ]
        }
    };

    const careerPaths = [
        { title: "Accounts Manager", desc: "Lead the corporate accounts division, control tax schedules, and monitor accounting audits." },
        { title: "Senior Tax Consultant", desc: "Offer strategic tax advisory services, draft corporate audits, and file compliance filings." },
        { title: "Senior Business Analyst", desc: "Build advanced spreadsheet models, review budgets, and provide recommendations." }
    ];

    return (
        <CourseTemplate 
            title="PDFA (Professional Diploma in Financial Accounting)"
            subtitle="Become a corporate financial accountant with advanced tax filing and banking capabilities."
            description="Our flagship professional diploma equips you to handle corporate financial portfolios, direct tax returns, and auditing."
            image="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1200"
            curriculum={curriculum}
            careerPaths={careerPaths}
            seoTitle="Professional Diploma in Financial Accounting (PDFA) | ICCVS Delhi"
            seoDesc="Master corporate auditing, banking operations, e-filing of tax returns, and advanced ERP configurations."
        />
    );
};

export default PDFA;
