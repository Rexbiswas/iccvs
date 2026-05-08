import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, Lock, Eye, FileText, ChevronRight } from 'lucide-react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: "intro",
      title: "Introduction",
      icon: Shield,
      content: "International School of Design (“INSD”, “we”, “us”, “our”) is a national award‑winning design school offering undergraduate, postgraduate, diploma and short‑term programs in fashion, interior, graphic, textile, jewellery and related disciplines across India. We are committed to protecting the privacy of all visitors to our websites, including insd.edu.in, its subdomains, and any related online platforms or applications (collectively, the “Website”), in accordance with applicable data protection laws, including the Digital Personal Data Protection Act, 2023 (“DPDPA”) and, where applicable, the General Data Protection Regulation (“GDPR”). This Privacy Policy explains how we collect, use, disclose and protect your personal information when you interact with us online and offline."
    },
    {
      id: "scope",
      title: "Scope",
      icon: Eye,
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Visitors and users of our Website.</li>
          <li>Prospective and current students, alumni, parents/guardians, and applicants.</li>
          <li>Franchise partners and their authorised representatives.</li>
          <li>Vendors, recruiters, and other business partners who interact with us through the Website.</li>
          <li>It does not apply to third‑party websites or services that may be linked from our Website, which have their own privacy policies.</li>
        </ul>
      )
    },
    {
      id: "collection",
      title: "Information We Collect",
      icon: FileText,
      subsections: [
        {
          subtitle: "Information you provide directly",
          text: "Name, email address, mobile number, city, state, country. Academic details (class completed, stream, year of passing, current institution, portfolio links). Course interests (e.g., fashion design, interior design, graphic design). Application form data, supporting documents and identity proofs. Communication details (messages submitted via enquiry forms, chat, WhatsApp, email, event registrations, webinar sign‑ups)."
        },
        {
          subtitle: "Information collected automatically",
          text: "IP address, browser type, device information, operating system. Date and time of visit, pages viewed, referring URLs. Approximate location derived from IP (city/country level). Usage patterns, scrolls, clicks, time spent on pages, via cookies and similar technologies."
        },
        {
          subtitle: "Information from third parties",
          text: "Lead information shared by authorised education portals, counselors or franchise centres. Social media profile information when you interact with our official handles (subject to your platform settings)."
        }
      ]
    },
    {
      id: "basis",
      title: "Legal Basis and Purpose",
      icon: Lock,
      content: "We process your personal information on the basis of your consent, performance of a contract, compliance with legal obligations, and legitimate interests. We use your information to respond to enquiries, manage admissions, deliver academic programs, administer student records, send important updates, marketing communications, and perform analytics for improvement."
    },
    {
      id: "cookies",
      title: "Cookies",
      icon: Shield,
      content: "We use cookies to enable core site functionality, understand how visitors use the Website, and personalise content. You may manage your preferences via your browser settings or our cookie banner."
    },
    {
      id: "sharing",
      title: "Sharing of Information",
      icon: ChevronRight,
      content: "We may share your personal information only as necessary with INSD group entities, service providers, recruiters (with consent), professional advisors, and government bodies when required by law. We do not sell your personal data."
    },
    {
      id: "security",
      title: "Data Security",
      icon: Lock,
      content: "We implement reasonable technical and organisational measures to protect personal information from unauthorised access, alteration, disclosure or destruction. However, no system is completely secure, and we cannot guarantee absolute security."
    },
    {
      id: "rights",
      title: "Your Rights",
      icon: ChevronRight,
      content: "Subject to applicable law, you may have the right to access, correct, obtain a copy of, or request erasure of your data. You also have the right to withdraw consent at any time."
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-primary/10 selection:text-primary">
      <SEO 
        title="Privacy Policy | International School of Design"
        description="Read our privacy policy to understand how INSD handles and protects your personal data."
      />
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <div className="inline-block px-4 py-1.5 bg-slate-100 rounded-full mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Legal Documents</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 leading-[0.9]">
              Privacy <span className="text-primary">Policy.</span>
            </h1>
            <p className="mt-8 text-slate-500 font-medium max-w-2xl mx-auto">
              Effective Date: May 2026. This policy outlines our commitment to your privacy and the security of your data.
            </p>
          </motion.div>

          {/* Table of Contents for Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-12 space-y-20">
              {sections.map((section, idx) => (
                <motion.section 
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-start gap-6 group">
                    <div className="hidden md:flex w-12 h-12 rounded-2xl bg-slate-50 items-center justify-center border border-slate-100 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                      <section.icon size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 mb-6">
                        {section.title}
                      </h2>
                      <div className="text-slate-600 leading-relaxed font-medium text-lg">
                        {section.content}
                        {section.subsections && (
                          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {section.subsections.map((sub, i) => (
                              <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                <h3 className="font-black uppercase tracking-wider text-xs text-primary mb-3">
                                  {sub.subtitle}
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                  {sub.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.section>
              ))}

              {/* Contact Section */}
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-12 bg-slate-900 rounded-[3rem] text-white text-center"
              >
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Questions?</h2>
                <p className="text-slate-400 mb-8 max-w-md mx-auto font-medium">
                  If you have any questions about this Privacy Policy or wish to exercise your rights, please reach out to us.
                </p>
                <a 
                  href="mailto:office@insd.edu.in" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform"
                >
                  <Lock size={16} />
                  office@insd.edu.in
                </a>
              </motion.section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
