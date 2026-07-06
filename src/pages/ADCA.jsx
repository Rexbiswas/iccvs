import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const ADCA = () => {
    const curriculum = {
        "ADCA Curriculum": {
            "Semester 1: Office Automation & Accounting": {
                "Computer Basics & OS": ["Introduction to PC Hardware", "Windows Setup & Control Panel Settings", "File System Management"],
                "Microsoft Office Suite": ["MS Word Advanced Formatting", "MS Excel Pivot Tables & Formulas", "MS PowerPoint Animations"],
                "Accounting in Tally Prime": ["Journal voucher entries", "Inventory ledger setups", "GST billing entries"]
            },
            "Semester 2: Graphic Design & Web Development": {
                "Graphic Designing Tools": ["CorelDraw vector designing", "Adobe Photoshop image compositions", "Creating publications in PageMaker"],
                "Web Page Development": ["HTML5 tag structures", "CSS3 visual formatting rules", "Uploading pages and domain configs"]
            }
        }
    };

    const careerPaths = [
        { title: "Computer Instructor", desc: "Teach core IT skills, office applications, and basic graphic design at academic institutes." },
        { title: "IT Support Executive", desc: "Troubleshoot software installations, manage databases, and supervise network health." },
        { title: "Web & Graphic Designer", desc: "Design graphics, edit marketing photos, and structure basic web templates." }
    ];

    return (
        <CourseTemplate 
            title="ADCA (Adv. Diploma in Computer Application)"
            subtitle="Our most comprehensive 1-year computer applications diploma covering office, design, and web."
            description="Our advanced diploma equips you with multiple domains—office automation, business bookkeeping, graphic design, and web programming."
            image="https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=1200"
            curriculum={curriculum}
            careerPaths={careerPaths}
            seoTitle="Advanced Diploma in Computer Applications (ADCA) | ICCVS Delhi"
            seoDesc="Get ISO certified 1-Year ADCA Diploma. Master MS Office, Graphic Design, Web Development, and Tally."
        />
    );
};

export default ADCA;
