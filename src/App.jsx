import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Courses = lazy(() => import('./pages/Courses'));
const About = lazy(() => import('./pages/About'));
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
import Mentors from './pages/Mentors';
import Legacy from './pages/Legacy';
import Centers from './pages/Centers';
import FutureOfDesign from './pages/FutureOfDesign';
const ProfileDashboard = lazy(() => import('./pages/ProfileDashboard'));
const FashionDesigning = lazy(() => import('./pages/FashionDesigning'));
import InteriorDesigning from './pages/InteriorDesigning';
import GraphicDesigning from './pages/GraphicDesigning';
import AnimationAndVFX from './pages/AnimationAndVFX';
import JewelleryDesigning from './pages/JewelleryDesigning';
import UIUXDesigning from './pages/UIUXDesigning';
import BeautyAndMakeup from './pages/BeautyAndMakeup';
import Photography from './pages/Photography';
import TextileDesigning from './pages/TextileDesigning';
const SuccessStory = lazy(() => import('./pages/SuccessStory'));
const Gallery = lazy(() => import('./pages/Gallery'));
const InsdLuxe = lazy(() => import('./pages/InsdLuxe'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Components
import BackToTop from './components/BackToTop';
import WhatsappCTA from './components/WhatsappCTA';
import StepLeadCTA from './components/StepLeadCTA';
import RegistrationModal from './components/RegistrationModal';
import AdmissionModal from './components/AdmissionModal';
import AIChatbot from './components/AIChatbot';
import FloatingActionPanel from './components/FloatingActionPanel';
import FloatingSocialBar from './components/FloatingSocialBar';
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
                        <Suspense fallback={<div className="min-h-screen bg-white" />}>
                            <ScrollTriggerRefresher />
                            <Navbar />
                            <div className="transition-opacity duration-1000 opacity-100">
                                <RegistrationModal />
                                <AdmissionModal />

                                 <ScrollToTop />
                                 <div className="relative z-0 bg-white min-h-screen pb-20 md:pb-0 overflow-x-hidden">
                                     <Routes>
                                         <Route path="/" element={<Home />} />
                                         <Route path="/about-us" element={<About />} />
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
                                         <Route path="/courses" element={<Courses />} />
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
                                         <Route path="/apply" element={<Admission />} />
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

                                         <Route path="/test-404" element={<NotFound />} />
                                         <Route path="*" element={<NotFound />} />
                                     </Routes>
                                 </div>
                                 <FloatingActionPanel />
                                 <FloatingSocialBar />
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