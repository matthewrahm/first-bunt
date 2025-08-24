'use client';

import { useEffect, useState } from 'react';

// TypeScript declaration for custom spline-viewer element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': {
        url: string;
        className?: string;
        style?: React.CSSProperties;
      };
    }
  }
}

export default function HeroSpline() {
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll events for fade-in effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load Spline viewer script once - optimized loading
  useEffect(() => {
    if (!document.querySelector('script[src*="spline-viewer"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src =
        'https://unpkg.com/@splinetool/viewer@1.10.48/build/spline-viewer.js';
      script.async = true;
      script.defer = true;

      // Performance monitoring
      script.onload = () => {
        console.log('Spline script loaded successfully');
        // Force a repaint for better performance
        requestAnimationFrame(() => {
          document.body.style.transform = 'translateZ(0)';
        });
      };

      script.onerror = () => {
        console.error('Failed to load Spline script');
      };

      document.head.appendChild(script);
    }
  }, []);

  // Simple Spline branding removal
  useEffect(() => {
    const removeSplineBranding = () => {
      // Only target the specific Spline branding element
      const splineLogo = document.querySelector(
        'a[id="logo"][href*="spline.design"]'
      );
      if (splineLogo) {
        splineLogo.remove();
        console.log('Removed Spline logo');
      }
    };

    // Remove immediately
    removeSplineBranding();

    // Check every 100ms
    const interval = setInterval(removeSplineBranding, 100);

    // Also check after delays
    const timers = [500, 1000, 2000].map(delay =>
      setTimeout(removeSplineBranding, delay)
    );

    return () => {
      clearInterval(interval);
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Direct Spline Viewer - Using external URL without branding */}
      <spline-viewer
        url="https://prod.spline.design/de0sjz54PTNiLHaD/scene.splinecode"
        className="w-full h-full"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          willChange: 'transform',
          transform: 'translateZ(0) scale(1.4)',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
          zIndex: 5,
        }}
      />

      {/* Hero content overlay */}
      <div className="absolute inset-0 flex flex-col justify-between z-40 pointer-events-none">
        {/* Top section - Logo */}
        <div
          className="flex justify-center items-center pt-32 transition-all duration-600 ease-out"
          style={{
            opacity: Math.min(scrollY / 30, 1),
            transform: `translateY(${Math.max(0, 20 - scrollY / 2)}px)`,
            filter: `blur(${Math.max(0, 2 - scrollY / 20)}px)`,
          }}
        >
          <img
            src="/blunttext.png"
            alt="$BLUNT Logo"
            className="h-40 w-auto drop-shadow-2xl"
          />
        </div>

        {/* Bottom section - Subtext and buttons */}
        <div
          className="flex flex-col justify-center items-center text-center text-white pb-20 transition-all duration-600 ease-out"
          style={{
            opacity: Math.min(scrollY / 60, 1),
            transform: `translateY(${Math.max(0, 15 - scrollY / 4)}px)`,
            filter: `blur(${Math.max(0, 1.5 - scrollY / 30)}px)`,
          }}
        >
          {/* Subtext */}
          <p className="text-xl md:text-2xl text-silver-200 mb-8 max-w-2xl mx-auto text-center">
            $BLUNT is the first certified runner on bunt.fun. Come roll up with
            a $BLUNT!
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#about"
              className="bg-silver-300 hover:bg-silver-200 text-ink-900 px-8 py-4 rounded-full font-bold text-lg pointer-events-auto"
            >
              Learn More
            </a>
            <a
              href="#token"
              className="border-2 border-silver-300 text-silver-300 hover:bg-silver-300 hover:text-ink-900 px-8 py-4 rounded-full font-bold text-lg pointer-events-auto"
            >
              Get Token
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
