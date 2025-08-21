import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://buntcoin.com'),
  title: '$BLUNT - Solana Meme Coin',
  description:
    '$BLUNT is the first certified runner on bunt.fun. We took the bunt ecosystem, rolled it up, and are smoking on all the rewards. Come roll up with a $BLUNT!',
  keywords: ['meme coin', 'solana', 'cryptocurrency', '$BLUNT', 'defi'],
  authors: [{ name: '$BLUNT Team' }],
  creator: '$BLUNT Team',
  publisher: '$BLUNT',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buntcoin.com',
    title: '$BLUNT - Solana Meme Coin',
    description:
      '$BLUNT is the first certified runner on bunt.fun. We took the bunt ecosystem, rolled it up, and are smoking on all the rewards. Come roll up with a $BLUNT!',
    siteName: '$BLUNT',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '$BLUNT - Solana Meme Coin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '$BLUNT - Solana Meme Coin',
    description:
      '$BLUNT is the first certified runner on bunt.fun. We took the bunt ecosystem, rolled it up, and are smoking on all the rewards. Come roll up with a $BLUNT!',
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
              name: '$BLUNT',
              url: 'https://buntcoin.com',
              logo: 'https://buntcoin.com/logo.png',
              description: 'The first certified runner on bunt.fun',
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
              name: '$BLUNT',
              url: 'https://buntcoin.com',
              description:
                'Official website for $BLUNT - the first certified runner on bunt.fun',
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
