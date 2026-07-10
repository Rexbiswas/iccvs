import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Loader from './components/Loader.jsx';
import './components/loader.css';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import CookieConsent from './components/CookieConsent';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Courses = lazy(() => import('./pages/Courses'));
const Scholarship = lazy(() => import('./pages/Scholarship'));
const DiplomaAndCertificate = lazy(() => import('./pages/DiplomaAndCertificate'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const Mentors = lazy(() => import('./pages/Mentors'));
const Location = lazy(() => import('./pages/location'));
const ProfileDashboard = lazy(() => import('./pages/ProfileDashboard'));
const Aviation = lazy(() => import('./pages/Aviation'));
const Gallery = lazy(() => import('./pages/Gallery'));
const IccvsLuxe = lazy(() => import('./pages/IccvsLuxe'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const FAQ = lazy(() => import('./pages/FAQ'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const NotFound = lazy(() => import('./pages/NotFound'));

// New Course Pages
const BasicComputerCourse = lazy(() => import('./pages/BasicComputerCourse'));
const DTP = lazy(() => import('./pages/DTP'));
const Diploma = lazy(() => import('./pages/Diploma'));
const Tally = lazy(() => import('./pages/Tally'));
const DFA = lazy(() => import('./pages/DFA'));
const ADFA = lazy(() => import('./pages/ADFA'));
const PDFA = lazy(() => import('./pages/PDFA'));
const Taxation = lazy(() => import('./pages/Taxation'));
const ADCA = lazy(() => import('./pages/ADCA'));
const NIIT = lazy(() => import('./pages/NIIT'));
const DIT = lazy(() => import('./pages/DIT'));
const ADIT = lazy(() => import('./pages/ADIT'));
const DataAnalyst = lazy(() => import('./pages/DataAnalyst'));
const AdvanceExcel = lazy(() => import('./pages/AdvanceExcel'));
const AdvanceExcelMIS = lazy(() => import('./pages/AdvanceExcelMIS'));
const AdvanceExcelMacro = lazy(() => import('./pages/AdvanceExcelMacro'));
const AdvanceExcelDashboard = lazy(() => import('./pages/AdvanceExcelDashboard'));


// Components
import RegistrationModal from './components/RegistrationModal';
import AdmissionModal from './components/AdmissionModal';
import AIChatbot from './components/AIChatbot';
import FloatingActionPanel from './components/FloatingActionPanel';
import { RegisterModalProvider } from './context/RegisterModalContext';
import { AdmissionModalProvider } from './context/AdmissionModalContext';
import { AuthProvider } from './context/AuthContext';


const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

function App() {
    const [isLoaderActive, setIsLoaderActive] = useState(true);

    return (
        <AuthProvider>
            <AdmissionModalProvider>
                <RegisterModalProvider>
                    <Router>
                        {isLoaderActive && <Loader onComplete={() => setIsLoaderActive(false)} />}
                        <ScrollTriggerRefresher />
                        <Navbar />
                        <div className={`transition-all duration-1000 ease-out ${isLoaderActive ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100'}`}>
                            <RegistrationModal />
                            <AdmissionModal />
                            <CookieConsent />

                            <ScrollToTop />
                            <div className="relative z-0 bg-white min-h-screen app-content-wrapper overflow-x-hidden">
                                <Suspense fallback={null}>
                                    <Routes>
                                        <Route path="/" element={<Home />} />

                                        <Route path="/courses" element={<Courses />} />
                                        <Route path="/scholarship" element={<Scholarship />} />
                                        <Route path="/courses/basic-computer-course" element={<BasicComputerCourse />} />
                                        <Route path="/courses/dtp" element={<DTP />} />
                                        <Route path="/courses/diploma" element={<Diploma />} />
                                        <Route path="/courses/tally" element={<Tally />} />
                                        <Route path="/courses/dfa" element={<DFA />} />
                                        <Route path="/courses/adfa" element={<ADFA />} />
                                        <Route path="/courses/pdfa" element={<PDFA />} />
                                        <Route path="/courses/taxation" element={<Taxation />} />
                                        <Route path="/courses/adca" element={<ADCA />} />
                                        <Route path="/courses/niit" element={<NIIT />} />
                                        <Route path="/courses/dit" element={<DIT />} />
                                        <Route path="/courses/adit" element={<ADIT />} />
                                        <Route path="/courses/data-analyst" element={<DataAnalyst />} />
                                        <Route path="/courses/advance-excel" element={<AdvanceExcel />} />
                                        <Route path="/courses/advance-excel-mis" element={<AdvanceExcelMIS />} />
                                        <Route path="/courses/advance-excel-macro" element={<AdvanceExcelMacro />} />
                                        <Route path="/courses/advance-excel-dashboard" element={<AdvanceExcelDashboard />} />
                                        <Route path="/courses/diploma-and-certificates" element={<DiplomaAndCertificate />} />
                                        <Route path="/iccvs-luxe" element={<IccvsLuxe />} />
                                        <Route path="/courses/aviation" element={<Aviation />} />
                                        <Route path="/contact-us" element={<Contact />} />
                                        <Route path="/course-apply-now" element={<Navigate to="/contact-us" replace />} />
                                        <Route path="/apply" element={<Navigate to="/contact-us" replace />} />
                                        <Route path="/admissions" element={<Navigate to="/contact-us" replace />} />
                                        <Route path="/insd-360/blog" element={<Blog />} />
                                        <Route path="/mentors" element={<Mentors />} />
                                        <Route path="/locations" element={<Location />} />
                                        <Route path="/centers-across-india" element={<Navigate to="/locations" replace />} />
                                        <Route path="/profile" element={<ProfileDashboard />} />
                                        <Route path="/gallery" element={<Gallery />} />
                                        <Route path="/thank-you" element={<ThankYou />} />
                                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                        <Route path="/faq" element={<FAQ />} />
                                        <Route path="/cookie-policy" element={<CookiePolicy />} />
                                        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

                                        <Route path="/test-404" element={<NotFound />} />
                                        <Route path="*" element={<NotFound />} />
                                    </Routes>
                                </Suspense>
                            </div>
                            <FloatingActionPanel />
                            <Analytics />

                            <SpeedInsights />
                        </div>
                    </Router>
                </RegisterModalProvider>
            </AdmissionModalProvider>
        </AuthProvider>
    );
}

const ScrollTriggerRefresher = () => {
    const location = useLocation();
    React.useEffect(() => {
        const timer = setTimeout(() => {
            import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
                ScrollTrigger.refresh();
            });
        }, 500);
        return () => clearTimeout(timer);
    }, [location.pathname]);
    return null;
};

export default App;