/**
 * Route-based code splitting optimization
 * Only loads code needed for the current route
 */

import { lazy } from 'react';

/**
 * Define route chunks for optimal code splitting
 * Each route gets its own chunk to minimize initial bundle
 */
export const routeChunks = {
  // Public routes
  home: () => import('../pages/Home'),
  admission: () => import('../pages/Admission'),
  campus: () => import('../pages/Campus'),
  contact: () => import('../pages/Contact'),
  
  // Program routes
  fashion: () => import('../pages/FashionDesigning'),
  interior: () => import('../pages/InteriorDesigning'),
  graphic: () => import('../pages/GraphicDesigning'),
  animation: () => import('../pages/AnimationAndVFX'),
  jewellery: () => import('../pages/JewelleryDesigning'),
  uiux: () => import('../pages/UIUXDesigning'),
  beauty: () => import('../pages/BeautyAndMakeup'),
  photography: () => import('../pages/Photography'),
  textile: () => import('../pages/TextileDesigning'),
  
  // Academic routes
  undergraduate: () => import('../pages/Undergraduate'),
  postgraduate: () => import('../pages/Postgraduate'),
  diploma: () => import('../pages/DiplomaAndCertificate'),
  shortterm: () => import('../pages/ShortTermCourse'),
  mscLuxury: () => import('../pages/MscLuxury'),
  onlineCourse: () => import('../pages/OnlineCourse'),
  
  // Information routes
  placement: () => import('../pages/Placement'),
  placements: () => import('../pages/PlacementAndTraining'),
  awards: () => import('../pages/AwardsRecognition'),
  events: () => import('../pages/Events'),
  blog: () => import('../pages/Blog'),
  gallery: () => import('../pages/Gallery'),
  legacy: () => import('../pages/Legacy'),
  
  // Special routes
  paris: () => import('../pages/Paris(CDP)'),
  franchise: () => import('../pages/Franchise'),
  aviation: () => import('../pages/Aviation'),
  successStory: () => import('../pages/SuccessStory'),
  
  // Policy routes (load on demand)
  privacy: () => import('../pages/PrivacyPolicy'),
  terms: () => import('../pages/TermsAndConditions'),
  cookies: () => import('../pages/CookiePolicy'),
  faq: () => import('../pages/FAQ'),
  
  // Error route
  notFound: () => import('../pages/NotFound'),
};

/**
 * Prefetch route chunks when user hovers over links
 */
export const prefetchRoute = (routeKey) => {
  if (routeChunks[routeKey]) {
    routeChunks[routeKey]();
  }
};

/**
 * Prefetch multiple routes for better UX
 */
export const prefetchRoutes = (routeKeys) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      routeKeys.forEach(key => prefetchRoute(key));
    });
  } else {
    setTimeout(() => {
      routeKeys.forEach(key => prefetchRoute(key));
    }, 3000);
  }
};

/**
 * Create lazy component with fallback
 */
export const createLazyRoute = (importFunc, fallback = null) => {
  return lazy(importFunc);
};
