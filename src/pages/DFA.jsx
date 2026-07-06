import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const DFA = () => {
    const curriculum = {
        "Accounting Curriculum": {
            "Module 1: Basic Accounting Principles": [
                "Ledger posting, Trial balance, and adjustments",
                "Final accounts formulation (Trading & P&L)",
                "Concepts of depreciation, assets, and liabilities"
            ],
            "Module 2: ERP Bookkeeping": [
                "Company configuration in Tally Prime",
                "Processing payment, receipt, journal, and contra vouchers",
                "Inventory tracking and stock ledger management"
            ],
            "Module 3: Taxation & Return Filing": [
                "GST fundamentals and invoice compliance",
                "TDS computation & basic return formats"
            ]
        }
    };

    const careerPaths = [
        { title: "Financial Accountant", desc: "Supervise financial statement auditing, balance ledger accounts, and audit reports." },
        { title: "Tax Accountant Assistant", desc: "Assist in computing GST dues, generating e-way bills, and checking taxation records." },
        { title: "Audit Assistant", desc: "Verify accounts documentation, bank vouchers, and transaction records." }
    ];

    return (
        <CourseTemplate 
            title="DFA (Diploma in Financial Accounting)"
            subtitle="Build a strong career in commercial accounting, finance operations, and tax processing."
            description="Our structured accounting diploma bridges standard business finance theory with hands-on computer bookkeeping software skills."
            image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200"
            curriculum={curriculum}
            careerPaths={careerPaths}
            seoTitle="Diploma in Financial Accounting (DFA) | ICCVS Delhi"
            seoDesc="Learn commercial business accounting, Tally Prime, and basic taxation in our 6-month DFA course."
        />
    );
};

export default DFA;
