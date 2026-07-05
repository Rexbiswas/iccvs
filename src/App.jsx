import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import CookieConsent from './components/CookieConsent';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Courses = lazy(() => import('./pages/Courses'));
const AwardsRecognition = lazy(() => import('./pages/AwardsRecognition'));
const Campus = lazy(() => import('./pages/Campus'));
const Admission = lazy(() => import('./pages/Admission'));
const DiplomaAndCertificate = lazy(() => import('./pages/DiplomaAndCertificate'));
const BachelorsInGraphicDesign = lazy(() => import('./pages/bachelors-in-graphic-design'));
const MastersInAnimation = lazy(() => import('./pages/masters-in-animation'));
const AdvancedDiplomaInAnimation = lazy(() => import('./pages/advanced-diploma-in-animation'));
const Contact = lazy(() => import('./pages/Contact'));
const OnlineCourse = lazy(() => import('./pages/OnlineCourse'));
const Blog = lazy(() => import('./pages/Blog'));
const Mentors = lazy(() => import('./pages/Mentors'));
const Location = lazy(() => import('./pages/location'));
const ProfileDashboard = lazy(() => import('./pages/ProfileDashboard'));
const Aviation = lazy(() => import('./pages/Aviation'));
const AnimationAndVFX = lazy(() => import('./pages/AnimationAndVFX'));
const BeautyAndMakeup = lazy(() => import('./pages/BeautyAndMakeup'));
const Gallery = lazy(() => import('./pages/Gallery'));
const IccvsLuxe = lazy(() => import('./pages/IccvsLuxe'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const AviationThankYou = lazy(() => import('./pages/AviationThankYou'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const FAQ = lazy(() => import('./pages/FAQ'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const NotFound = lazy(() => import('./pages/NotFound'));
const MockTest = lazy(() => import('./pages/MockTest'));

// Components
import RegistrationModal from './components/RegistrationModal';
import AdmissionModal from './components/AdmissionModal';
// import AIChatbot from './components/AIChatbot';
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
    return (
        <AuthProvider>
            <AdmissionModalProvider>
                <RegisterModalProvider>
                    <Router>
                        <Suspense fallback={
                            <div className="min-h-screen bg-white">
                                <div className="h-20 w-full border-b border-slate-100" /> {/* Navbar Placeholder */}
                                <div className="max-w-7xl mx-auto px-6 py-20 animate-pulse">
                                    <div className="h-12 w-2/3 bg-slate-50 rounded-lg mb-6" />
                                    <div className="h-6 w-1/2 bg-slate-50 rounded-lg" />
                                </div>
                            </div>
                        }>
                            <ScrollTriggerRefresher />
                            <Navbar />
                            <div className="transition-opacity duration-1000 opacity-100">
                                <RegistrationModal />
                                <AdmissionModal />
                                <CookieConsent />

                                <ScrollToTop />
                                <div className="relative z-0 bg-white min-h-screen app-content-wrapper overflow-x-hidden">
                                    <Routes>
                                        <Route path="/" element={<Home />} />

                                        <Route path="/awards-recognition" element={<AwardsRecognition />} />
                                        <Route path="/campuses" element={<Campus />} />
                                        <Route path="/campuses/:campusId" element={<Campus />} />

                                        <Route path="/courses" element={<Courses />} />
                                        <Route path="/courses/diploma-and-certificates" element={<DiplomaAndCertificate />} />
                                        <Route path="/courses/bachelors-in-graphic-design" element={<BachelorsInGraphicDesign />} />
                                        <Route path="/courses/masters-in-animation" element={<MastersInAnimation />} />
                                        <Route path="/courses/advanced-diploma-in-animation" element={<AdvancedDiplomaInAnimation />} />
                                        <Route path="/courses/animation-and-vfx" element={<AnimationAndVFX />} />
                                        <Route path="/courses/beauty-and-makeup" element={<BeautyAndMakeup />} />
                                        <Route path="/iccvs-luxe" element={<IccvsLuxe />} />
                                        <Route path="/courses/aviation" element={<Aviation />} />
                                        <Route path="/contact-us" element={<Contact />} />
                                        <Route path="/course-apply-now" element={<Admission />} />
                                        <Route path="/apply" element={<Navigate to="/course-apply-now" replace />} />
                                        <Route path="/admissions" element={<Navigate to="/course-apply-now" replace />} />
                                        <Route path="/courses/online-courses" element={<OnlineCourse />} />
                                        <Route path="/insd-360/blog" element={<Blog />} />
                                        <Route path="/mentors" element={<Mentors />} />
                                        <Route path="/locations" element={<Location />} />
                                        <Route path="/centers-across-india" element={<Navigate to="/locations" replace />} />
                                        <Route path="/profile" element={<ProfileDashboard />} />
                                        <Route path="/gallery" element={<Gallery />} />
                                        <Route path="/thank-you" element={<ThankYou />} />
                                        <Route path="/aviation-thankyou" element={<AviationThankYou />} />
                                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                        <Route path="/faq" element={<FAQ />} />
                                        <Route path="/cookie-policy" element={<CookiePolicy />} />
                                        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                                        <Route path="/mock-test" element={<MockTest />} />
                                        <Route path="/test-404" element={<NotFound />} />
                                        <Route path="*" element={<NotFound />} />
                                    </Routes>
                                </div>
                                <FloatingActionPanel />
                                <Analytics />

                                <SpeedInsights />
                            </div>
                        </Suspense>
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