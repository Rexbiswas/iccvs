import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import CookieConsent from './components/CookieConsent';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const AwardsRecognition = lazy(() => import('./pages/AwardsRecognition'));
const Student = lazy(() => import('./pages/Student'));
const Entrepreneur = lazy(() => import('./pages/Entrepreneur'));
const IndustryInteraction = lazy(() => import('./pages/IndustryInteraction'));
const IndustryPotential = lazy(() => import('./pages/IndustryPotential'));
const PlacementAndTraining = lazy(() => import('./pages/PlacementAndTraining'));
const Placement = lazy(() => import('./pages/Placement'));
const Campus = lazy(() => import('./pages/Campus'));
const Franchise = lazy(() => import('./pages/Franchise'));
const Admission = lazy(() => import('./pages/Admission'));
const InternationalPartner = lazy(() => import('./pages/InternationalPartner'));
const ParisCDP = lazy(() => import('./pages/Paris(CDP)'));
const Undergraduate = lazy(() => import('./pages/Undergraduate'));
const Postgraduate = lazy(() => import('./pages/Postgraduate'));
const DiplomaAndCertificate = lazy(() => import('./pages/DiplomaAndCertificate'));
const ShortTermCourse = lazy(() => import('./pages/ShortTermCourse'));
const Contact = lazy(() => import('./pages/Contact'));
const MscLuxury = lazy(() => import('./pages/MscLuxury'));
const StudentCareers = lazy(() => import('./pages/StudentCareers'));
const OnlineCourse = lazy(() => import('./pages/OnlineCourse'));
const Blog = lazy(() => import('./pages/Blog'));
const FashionWeek = lazy(() => import('./pages/FashionWeek'));
const ParisProject = lazy(() => import('./pages/ParisProject'));
const Events = lazy(() => import('./pages/Events'));
const Mentors = lazy(() => import('./pages/Mentors'));
const Legacy = lazy(() => import('./pages/Legacy'));
const Centers = lazy(() => import('./pages/Centers'));
const FutureOfDesign = lazy(() => import('./pages/FutureOfDesign'));
const ProfileDashboard = lazy(() => import('./pages/ProfileDashboard'));
const FashionDesigning = lazy(() => import('./pages/FashionDesigning'));
const InteriorDesigning = lazy(() => import('./pages/InteriorDesigning'));
const GraphicDesigning = lazy(() => import('./pages/GraphicDesigning'));
const AnimationAndVFX = lazy(() => import('./pages/AnimationAndVFX'));
const JewelleryDesigning = lazy(() => import('./pages/JewelleryDesigning'));
const UIUXDesigning = lazy(() => import('./pages/UIUXDesigning'));
const BeautyAndMakeup = lazy(() => import('./pages/BeautyAndMakeup'));
const Photography = lazy(() => import('./pages/Photography'));
const TextileDesigning = lazy(() => import('./pages/TextileDesigning'));
const SuccessStory = lazy(() => import('./pages/SuccessStory'));
const Gallery = lazy(() => import('./pages/Gallery'));
const InsdLuxe = lazy(() => import('./pages/InsdLuxe'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const FAQ = lazy(() => import('./pages/FAQ'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
                                        <Route path="/student" element={<Student />} />
                                        <Route path="/entrepreneur" element={<Entrepreneur />} />
                                        <Route path="/industry-interaction" element={<IndustryInteraction />} />
                                        <Route path="/industry-potential" element={<IndustryPotential />} />
                                        <Route path="/placementandtraining" element={<PlacementAndTraining />} />
                                        <Route path="/placement" element={<Placement />} />
                                        <Route path="/future-of-design" element={<FutureOfDesign />} />
                                        <Route path="/campuses" element={<Campus />} />
                                        <Route path="/campuses/:campusId" element={<Campus />} />
                                        <Route path="/campuses/paris-cdp" element={<ParisCDP />} />

                                        <Route path="/courses/undergraduate" element={<Undergraduate />} />
                                        <Route path="/courses/postgraduate" element={<Postgraduate />} />
                                        <Route path="/courses/diploma-and-certificates" element={<DiplomaAndCertificate />} />
                                        <Route path="/courses/short-term-courses" element={<ShortTermCourse />} />
                                        <Route path="/courses/msc-luxury-brand-management" element={<MscLuxury />} />
                                        <Route path="/courses/fashion-designing" element={<FashionDesigning />} />
                                        <Route path="/courses/interior-designing" element={<InteriorDesigning />} />
                                        <Route path="/courses/graphic-designing" element={<GraphicDesigning />} />
                                        <Route path="/courses/animation-and-vfx" element={<AnimationAndVFX />} />
                                        <Route path="/courses/jewellery-designing" element={<JewelleryDesigning />} />
                                        <Route path="/courses/uiux-designing" element={<UIUXDesigning />} />
                                        <Route path="/courses/beauty-and-makeup" element={<BeautyAndMakeup />} />
                                        <Route path="/courses/photography" element={<Photography />} />
                                        <Route path="/courses/textile-designing" element={<TextileDesigning />} />
                                        <Route path="/insd-luxe" element={<InsdLuxe />} />
                                        <Route path="/student-careers" element={<StudentCareers />} />
                                        <Route path="/franchise" element={<Franchise />} />
                                        <Route path="/contact-us" element={<Contact />} />
                                        <Route path="/international-partners" element={<InternationalPartner />} />
                                        <Route path="/course-apply-now" element={<Admission />} />
                                        <Route path="/course-apply-now/" element={<Navigate to="/course-apply-now" replace />} />
                                        <Route path="/apply" element={<Navigate to="/course-apply-now" replace />} />
                                        <Route path="/courses/online-courses" element={<OnlineCourse />} />
                                        <Route path="/insd-360/blog" element={<Blog />} />
                                        <Route path="/insd-360/fashion-week" element={<FashionWeek />} />
                                        <Route path="/insd-360/paris-project" element={<ParisProject />} />
                                        <Route path="/events" element={<Events />} />
                                        <Route path="/mentors" element={<Mentors />} />
                                        <Route path="/15-years-legacy" element={<Legacy />} />
                                        <Route path="/centers-across-india" element={<Centers />} />
                                        <Route path="/profile" element={<ProfileDashboard />} />
                                        <Route path="/success-stories" element={<SuccessStory />} />
                                        <Route path="/gallery" element={<Gallery />} />
                                        <Route path="/thank-you" element={<ThankYou />} />
                                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                        <Route path="/faq" element={<FAQ />} />
                                        <Route path="/cookie-policy" element={<CookiePolicy />} />
                                        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
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