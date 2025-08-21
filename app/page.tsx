import Navigation from '@/components/Navigation';
import HeroSpline from '@/components/HeroSpline';
import AboutSection from '@/components/AboutSection';
import CASection from '@/components/CASection';
import StatsTicker from '@/components/StatsTicker';
import Footer from '@/components/Footer';

// [ASSUMED] Configuration - Replace with your actual values
const CONFIG = {
  // Token details
  TOKEN_NAME: 'Bunt Coin',
  TOKEN_SYMBOL: 'BUNT',
  CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID || 'solana',
  TOKEN_ADDRESS:
    process.env.NEXT_PUBLIC_TOKEN_ADDRESS ||
    'So11111111111111111111111111111111111111112', // [ASSUMED placeholder]
  PAIR_ID:
    process.env.NEXT_PUBLIC_PAIR_ID || 'REPLACE_WITH_DEXSCREENER_PAIR_ID', // [ASSUMED placeholder]

  // Polling interval
  DEXSCREENER_POLL_MS: parseInt(
    process.env.NEXT_PUBLIC_DEXSCREENER_POLL_MS || '15000'
  ),
};

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-ink-900">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section with 3D Background */}
      <HeroSpline />

      {/* About Section */}
      <AboutSection />

      {/* Token/Contract Address Section */}
      <CASection
        tokenName={CONFIG.TOKEN_NAME}
        tokenSymbol={CONFIG.TOKEN_SYMBOL}
        contractAddress={CONFIG.TOKEN_ADDRESS}
        chainId={CONFIG.CHAIN_ID}
      />

      {/* Live Market Stats */}
      <StatsTicker
        chainId={CONFIG.CHAIN_ID}
        pairId={CONFIG.PAIR_ID}
        pollInterval={CONFIG.DEXSCREENER_POLL_MS}
      />

      {/* Footer */}
      <Footer />
    </main>
  );
}
