import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Custom hook for Lenis smooth scroll with Safari optimization
 * Disables Lenis on Safari/mobile Safari due to performance issues
 * Falls back to native smooth scroll behavior instead
 */
export const useLenisSmoothScroll = (options = {}) => {
  useEffect(() => {
    // Detect Safari/WebKit browsers
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // Skip Lenis on Safari and iOS for better performance
    if (isSafari || isIOS) {
      // Use native smooth scroll instead
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08, // Reduced from 0.1 for smoother animation
      smoothWheel: true,
      duration: 1.2, // Slightly longer duration for smoother feel
      ...options,
    });

    // Synchronize GSAP ScrollTrigger with Lenis smooth scrolling
    lenis.on('scroll', ScrollTrigger.update);

    // Synchronize Lenis RAF with GSAP Ticker to eliminate any scroll/pin jitter
    const tickLenis = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickLenis);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
};

export default useLenisSmoothScroll;
