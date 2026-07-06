import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const Tally = () => {
    const curriculum = {
        "Accounting Syllabus": {
            "Module 1: Tally Prime Basics": [
                "Double Entry Bookkeeping concepts",
                "Company Creation & Group Configurations",
                "Ledger & Voucher Entries",
                "Bank Reconciliation Statements"
            ],
            "Module 2: Inventory & Billing": [
                "Stock Item Groups & Units of Measure",
                "Purchase & Sales Orders processing",
                "Invoicing, discounts and tracking numbers"
            ],
            "Module 3: Taxation & Reporting": [
                "GST Computation (CGST, SGST, IGST)",
                "Generating Financial Reports (Trial Balance, P&L, Balance Sheet)",
                "TDS Entries & tax deduction processing"
            ]
        }
    };

    const careerPaths = [
        { title: "Tally Operator", desc: "Perform day-to-day voucher entries, billing operations, and ledger setup." },
        { title: "Accounts Executive", desc: "Manage company banking reconciliations, tax calculations, and asset entries." },
        { title: "Billing Administrator", desc: "Control sales/purchase order flows and audit inventory billing transactions." }
    ];

    return (
        <CourseTemplate 
            title="Tally Prime / ERP 9"
            subtitle="Master commercial accounting, invoicing, inventory management, and taxation."
            description="Acquire specialized corporate financial bookkeeping capabilities using Tally Prime, the industry-standard ERP software."
            image="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200"
            curriculum={curriculum}
            careerPaths={careerPaths}
            seoTitle="Tally Prime & ERP 9 Course | ICCVS Delhi"
            seoDesc="Learn commercial bookkeeping, GST, inventory management, and e-billing on Tally Prime."
        />
    );
};

export default Tally;
