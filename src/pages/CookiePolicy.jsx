import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, Eye, Settings, Info, Lock } from 'lucide-react';

const CookiePolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "What Are Cookies?",
      icon: Info,
      content: "Cookies are small text files that are stored on your device (computer, tablet, smartphone) when you visit a website. They help websites function properly, remember your preferences and understand how visitors use the site."
    },
    {
      title: "Why We Use Cookies",
      icon: Eye,
      content: (
        <ul className="list-disc pl-5 space-y-3">
          <li>Enable core functionality such as navigation, session management and secure access to forms.</li>
          <li>Understand how visitors interact with the Website so we can improve content, design and user experience.</li>
          <li>Personalise certain content, and where relevant, measure and optimise campaigns.</li>
        </ul>
      )
    },
    {
      title: "Types of Cookies We Use",
      icon: Settings,
      content: (
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">Strictly Necessary Cookies</h4>
            <p className="text-slate-500 text-sm leading-relaxed">Required for the Website to function correctly. These cannot be disabled through our cookie banner as they are essential for site security and navigation.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">Performance / Analytics Cookies</h4>
            <p className="text-slate-500 text-sm leading-relaxed">Help us understand how visitors use the Website. Data is generally aggregated and used for statistical purposes to improve navigation.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">Advertising / Marketing Cookies</h4>
            <p className="text-slate-500 text-sm leading-relaxed">Used to deliver relevant ads and track campaign performance. These are set only with your explicit consent.</p>
          </div>
        </div>
      )
    },
    {
      title: "Managing Cookies",
      icon: Shield,
      content: "You can manage or disable cookies via your browser settings or our cookie preferences panel. Most browsers allow you to refuse or delete cookies. Please note that blocking certain cookies may impact the functionality and performance of the Website."
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      <SEO 
        title="Cookie Policy | International School of Design"
        description="Understand how and why we use cookies to improve your experience on the INSD website."
      />
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 text-center"
          >
            <div className="inline-block px-4 py-1.5 bg-slate-100 rounded-full mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Legal Protocol</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 leading-[0.9]">
              Cookie <span className="text-primary">Policy.</span>
            </h1>
            <p className="mt-8 text-slate-500 font-medium max-w-2xl mx-auto">
              Our website uses cookies to provide you with the best experience and to analyze our traffic. Learn more about how we use them.
            </p>
          </motion.div>

          {/* Content */}
          <div className="space-y-16">
            {sections.map((section, idx) => (
              <motion.section 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="grid md:grid-cols-3 gap-8"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400">
                    <section.icon size={20} />
                  </div>
                  <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">{section.title}</h2>
                </div>
                <div className="md:col-span-2 text-slate-600 leading-relaxed font-medium">
                  {section.content}
                </div>
              </motion.section>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-24 p-12 bg-slate-900 rounded-[3rem] text-center text-white"
          >
            <Lock className="mx-auto mb-6 text-primary" size={40} />
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4">Privacy First</h2>
            <p className="text-slate-400 max-w-md mx-auto mb-8 font-medium">We respect your data. For more information, please read our full Privacy Policy.</p>
            <a href="mailto:office@insd.edu.in" className="text-sm font-bold uppercase tracking-widest text-primary hover:text-white transition-colors">
              office@insd.edu.in
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
