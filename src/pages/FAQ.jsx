import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Plus, Minus, HelpCircle, MessageSquare, BookOpen, GraduationCap, MapPin, Award } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between gap-4 text-left group"
      >
        <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-slate-800 group-hover:text-primary'}`}>
          {question}
        </span>
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-slate-500 leading-relaxed font-medium">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('About INSD');
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqData = {
    "About INSD": [
      { q: "What is INSD?", a: "INSD (International School of Design) is a private design institution offering industry‑oriented programs in fashion design, interior design, graphic design, textile design, jewellery design, animation and related disciplines." },
      { q: "Where is INSD located?", a: "INSD has its main presence in Delhi NCR and operates a growing network of authorised campuses and centres across multiple cities in India through a franchise model. Please check our “Locations” section for the latest list." },
      { q: "Who founded INSD?", a: "INSD was co‑founded by the Former-Director General of NIFT, along with Mr. Sunjey Aggarwal and Mr. Pranav Raaj Aggarwall, with the vision to provide globally relevant design education in India." },
      { q: "What makes INSD different from other design schools?", a: "INSD focuses on practical, industry‑oriented learning, collaborations with brands, live projects, and exposure through events such as fashion weeks, luxury projects and international initiatives. Students learn from experienced faculty and industry experts via workshops, masterclasses and portfolio‑driven assignments." }
    ],
    "Courses": [
      { q: "What courses does INSD offer?", a: "INSD offers undergraduate, postgraduate, diploma, advanced diploma and certificate programs in Fashion Design, Interior Design, Graphic Design, UI/UX, Textile Design, Jewellery Design, Animation, Photography, Beauty & Make-up, and Luxury Brand Management." },
      { q: "What is the duration of the programs?", a: "Program duration varies by level: Undergraduate (3-4 years), Postgraduate (2 years), Diplomas (1-2 years), and Certificate courses (few months to 1 year)." },
      { q: "Do I need a design background to apply?", a: "No. Many students join from science, commerce, arts and other non-design backgrounds. INSD focuses on building fundamentals and creative thinking from the ground up." }
    ],
    "Admissions": [
      { q: "What is the basic eligibility for undergraduate courses?", a: "Most undergraduate programs require successful completion of Class 12 from a recognised board in any stream." },
      { q: "Is there an entrance exam?", a: "Admissions may be based on a combination of portfolio review, aptitude evaluation, interviews and, where applicable, written tests. We also consider scores from recognised design entrance exams." },
      { q: "How do I apply to INSD?", a: "You can apply via our website form, contact our admissions team via phone/WhatsApp, or visit any INSD campus for in-person counseling." }
    ],
    "Experience": [
      { q: "What is the teaching approach?", a: "The focus is on practical, studio-based learning with a strong emphasis on hands-on projects, software training, workshops, and portfolio development." },
      { q: "Does INSD provide internships?", a: "Yes, students are encouraged to participate in internships, live projects, and exhibitions with brands and agencies to gain real-world exposure." },
      { q: "What placement support is available?", a: "We provide career support through industry partners, portfolio guidance, interview preparation, and dedicated placement cells." }
    ]
  };

  const categories = [
    { name: "About INSD", icon: HelpCircle },
    { name: "Courses", icon: BookOpen },
    { name: "Admissions", icon: GraduationCap },
    { name: "Experience", icon: Award }
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-primary/10 selection:text-primary">
      <SEO 
        title="FAQs | International School of Design"
        description="Find answers to frequently asked questions about INSD, our courses, admissions, and design career opportunities."
      />
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 leading-[0.9] mb-8">
                Common <span className="text-primary">Questions.</span>
              </h1>
              <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">
                Everything you need to know about starting your design journey at INSD. Can't find what you're looking for? Reach out to us.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar Categories */}
            <aside className="lg:col-span-4 space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => {
                    setActiveCategory(cat.name);
                    setOpenIndex(0);
                  }}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${activeCategory === cat.name ? 'bg-slate-900 text-white shadow-xl' : 'hover:bg-slate-50 text-slate-600'}`}
                >
                  <cat.icon size={20} className={activeCategory === cat.name ? 'text-primary' : 'text-slate-400 group-hover:text-primary transition-colors'} />
                  <span className="font-bold uppercase tracking-wider text-sm">{cat.name}</span>
                </button>
              ))}

              <div className="mt-12 p-8 bg-primary/5 border border-primary/10 rounded-[2.5rem] relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="text-xl font-black text-slate-900 mb-2">Still confused?</h4>
                  <p className="text-slate-500 text-sm mb-6 font-medium">Get a personalized counseling session from our experts.</p>
                  <button className="w-full py-3 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                    Connect Now
                  </button>
                </div>
                <MessageSquare className="absolute -bottom-4 -right-4 text-primary/10 w-24 h-24 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
              </div>
            </aside>

            {/* FAQ List */}
            <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[3rem] p-8 md:p-12 shadow-sm">
              <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-8 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-primary rounded-full" />
                {activeCategory}
              </h3>
              
              <div className="divide-y divide-slate-50">
                {faqData[activeCategory].map((item, idx) => (
                  <FAQItem
                    key={idx}
                    question={item.q}
                    answer={item.a}
                    isOpen={openIndex === idx}
                    onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
