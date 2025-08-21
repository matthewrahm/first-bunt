import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://buntcoin.com'),
  title: 'Bunt Coin - Solana Meme Coin',
  description:
    'The next big Solana meme coin. Join the Bunt Coin community and ride the wave to the moon!',
  keywords: ['meme coin', 'solana', 'cryptocurrency', 'bunt coin', 'defi'],
  authors: [{ name: 'Bunt Coin Team' }],
  creator: 'Bunt Coin Team',
  publisher: 'Bunt Coin',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buntcoin.com',
    title: 'Bunt Coin - Solana Meme Coin',
    description:
      'The next big Solana meme coin. Join the Bunt Coin community and ride the wave to the moon!',
    siteName: 'Bunt Coin',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bunt Coin - Solana Meme Coin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bunt Coin - Solana Meme Coin',
    description:
      'The next big Solana meme coin. Join the Bunt Coin community and ride the wave to the moon!',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://buntcoin.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Bunt Coin',
              url: 'https://buntcoin.com',
              logo: 'https://buntcoin.com/logo.png',
              description: 'Solana meme coin community',
              sameAs: ['https://twitter.com/buntcoin', 'https://t.me/buntcoin'],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Bunt Coin',
              url: 'https://buntcoin.com',
              description: 'Official website for Bunt Coin Solana meme coin',
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#111111',
              color: '#F5D76E',
              border: '1px solid #F5D76E',
            },
          }}
        />
      </body>
    </html>
  );
}
