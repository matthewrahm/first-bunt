'use client';

import { useEffect } from 'react';

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

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Simplified background overlay */}
      <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />

      {/* Direct Spline Viewer - Using local file with performance optimizations */}
      <spline-viewer
        url="/scene.splinecode"
        className="w-full h-full"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
        }}
      />

      {/* Hero content overlay */}
      <div className="absolute inset-0 flex flex-col justify-between z-40 pointer-events-none">
        {/* Top section - BuntCoin title on green line */}
        <div className="flex flex-col justify-center items-center text-center text-white pt-32">
          <h1 className="text-6xl md:text-8xl font-bold text-center">
            <span className="text-gold-300">Bunt</span>
            <span className="text-white">Coin</span>
          </h1>
        </div>

        {/* Bottom section - Subtext and buttons on red line */}
        <div className="flex flex-col justify-center items-center text-center text-white pb-20">
          {/* Subtext */}
          <p className="text-xl md:text-2xl text-gold-200 mb-8 max-w-2xl mx-auto text-center">
            The next big Solana meme coin. Join the community and ride the wave
            to the moon!
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#about"
              className="bg-gold-300 hover:bg-gold-200 text-ink-900 px-8 py-4 rounded-full font-bold text-lg pointer-events-auto"
            >
              Learn More
            </a>
            <a
              href="#token"
              className="border-2 border-gold-300 text-gold-300 hover:bg-gold-300 hover:text-ink-900 px-8 py-4 rounded-full font-bold text-lg pointer-events-auto"
            >
              Get Token
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
