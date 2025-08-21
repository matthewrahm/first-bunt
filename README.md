# Yellow Pup - Solana Meme Coin Website

A production-ready, single-page marketing website for the Yellow Pup Solana meme coin. Features a stunning 3D Spline hero scene, live market data from DEX Screener, and a modern gold/black theme.

## 🚀 Features

- **3D Hero Scene**: Full-viewport Spline 3D scene with scene switching capability
- **Live Market Stats**: Real-time data from DEX Screener API with auto-refresh
- **Contract Address Section**: Copy-to-clipboard functionality with QR code generation
- **Responsive Design**: Mobile-first, centered layout that works on all devices
- **Modern UI**: Gold/black theme with Framer Motion animations
- **SEO Optimized**: Full metadata, OpenGraph, and structured data
- **Accessibility**: WCAG 2.1 AA compliant with skip links and semantic markup
- **Performance**: Optimized for Lighthouse scores ≥ 90

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS with custom gold/black theme
- **3D Graphics**: @splinetool/react-spline/next
- **Animations**: Framer Motion
- **Data Fetching**: SWR for live market data
- **Testing**: Vitest + Testing Library, Playwright E2E
- **Deployment**: Netlify with @netlify/plugin-nextjs

## 📋 Prerequisites

- Node.js 18+
- npm 9+ or yarn
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd yellow-pup-memecoin
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the environment example file and configure your settings:

```bash
cp env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# DEX Screener Configuration
NEXT_PUBLIC_CHAIN_ID=solana
NEXT_PUBLIC_TOKEN_ADDRESS=YOUR_ACTUAL_TOKEN_ADDRESS
NEXT_PUBLIC_PAIR_ID=YOUR_DEXSCREENER_PAIR_ID

# Polling Configuration
NEXT_PUBLIC_DEXSCREENER_POLL_MS=15000

# Brand Configuration
NEXT_PUBLIC_TOKEN_NAME=Yellow Pup
NEXT_PUBLIC_TOKEN_SYMBOL=YPUP
```

### 4. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Customization

### Changing the Brand

Update the brand name and symbol in `app/page.tsx`:

```typescript
const CONFIG = {
  TOKEN_NAME: 'Your Token Name',
  TOKEN_SYMBOL: 'SYMBOL',
  // ... other config
};
```

### Modifying the Theme

Customize colors in `tailwind.config.js`:

```javascript
colors: {
  gold: {
    50: '#FFF9E6',
    100: '#FFF2CC',
    // ... customize your gold palette
  },
  ink: {
    900: '#0B0B0B',
    // ... customize your black palette
  }
}
```

### Switching Spline Scenes

- **Primary Scene**: `/?variant=primary` (default)
- **Alternate Scene**: `/?variant=alt`

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
npm run test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage
```

### End-to-End Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui
```

### Test Coverage

- **Unit Tests**: DEX Screener client, utility functions, components
- **E2E Tests**: Page loading, navigation, responsiveness, Spline functionality
- **Coverage Target**: >80% for critical business logic

## 🏗️ Building

### Development Build

```bash
npm run build
npm run start
```

### Production Build

```bash
npm run build
```

The build output will be in the `.next` directory.

## 🚀 Deployment

### Netlify (Recommended)

1. **Connect Repository**: Connect your Git repository to Netlify
2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. **Environment Variables**: Set all required env vars in Netlify dashboard
4. **Deploy**: Netlify will automatically deploy on every push

### Manual Netlify Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=.next
```

### Other Platforms

The site can be deployed to any platform that supports Next.js:

- Vercel
- AWS Amplify
- Railway
- Render

## 📱 Performance & SEO

### Lighthouse Scores

Target scores for all categories:

- **Performance**: ≥ 90
- **Accessibility**: ≥ 90
- **Best Practices**: ≥ 90
- **SEO**: ≥ 90

### SEO Features

- OpenGraph and Twitter meta tags
- Structured data (JSON-LD)
- Sitemap and robots.txt
- Canonical URLs
- Semantic HTML markup

### Performance Optimizations

- Dynamic imports for Spline
- Image optimization
- CSS and JS minification
- Efficient caching strategies

## 🔧 Configuration

### DEX Screener API

The site uses the DEX Screener API for live market data:

- **Endpoint**: `/latest/dex/pairs/{chainId}/{pairId}`
- **Polling**: Configurable interval (default: 15 seconds)
- **Error Handling**: Exponential backoff with retry logic
- **Data**: Price, market cap, volume, liquidity, FDV

### Spline Scenes

Two Spline scenes are configured:

1. **Primary (Cursor)**: `https://prod.spline.design/MjvXTfO-hSPuCMUn/scene.splinecode`
2. **Alternate (Background)**: `https://prod.spline.design/PWEvFtXYjYKhHjZ9/scene.splinecode`

Switch between scenes using the `?variant=alt` query parameter.

## 🎯 Project Structure

```
yellow-pup-memecoin/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Tailwind
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main page component
├── components/             # React components
│   ├── HeroSpline.tsx     # 3D Spline hero section
│   ├── Navigation.tsx     # Sticky navigation
│   ├── AboutSection.tsx   # About section
│   ├── CASection.tsx      # Contract address section
│   ├── StatsTicker.tsx    # Live market stats
│   └── Footer.tsx         # Footer component
├── lib/                    # Utility libraries
│   └── dexscreener.ts     # DEX Screener API client
├── tests/                  # Test files
│   ├── setup.ts           # Test configuration
│   ├── lib/               # Unit tests
│   └── e2e/               # End-to-end tests
├── public/                 # Static assets
├── netlify.toml           # Netlify configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── vitest.config.ts       # Vitest configuration
├── playwright.config.ts   # Playwright configuration
└── package.json           # Dependencies and scripts
```

## 🐛 Troubleshooting

### Common Issues

1. **Spline Not Loading**: Check browser console for errors, ensure stable internet connection
2. **Market Data Not Updating**: Verify DEX Screener API keys and pair ID
3. **Build Failures**: Ensure Node.js 18+ and all dependencies are installed
4. **Styling Issues**: Clear browser cache and restart dev server

### Debug Mode

Enable debug logging:

```bash
DEBUG=* npm run dev
```

### Performance Issues

- Use browser dev tools to identify bottlenecks
- Check Network tab for slow API calls
- Monitor memory usage in Performance tab

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Ensure accessibility compliance
- Maintain performance standards
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Spline](https://spline.design) for 3D graphics
- [DEX Screener](https://dexscreener.com) for market data API
- [Next.js](https://nextjs.org) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com) for utility-first CSS

## 📞 Support

- **Documentation**: [Project Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)
- **Community**: [Telegram Group](https://t.me/yellowpup)
- **Email**: support@yellowpup.com

---

**Built with ❤️ by the Yellow Pup community**

_To the moon and beyond! 🚀_
