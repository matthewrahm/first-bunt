# QA Checklist - Yellow Pup Website

## 🚀 Page Loading & Performance

- [ ] Page loads without console errors
- [ ] Spline 3D scene renders correctly
- [ ] Initial load time < 3 seconds on 3G
- [ ] Lighthouse scores ≥ 90 across all categories
- [ ] No layout shift during loading

## 🎨 Visual & UI

- [ ] Gold/black theme applied consistently
- [ ] All text is readable with sufficient contrast (WCAG AA)
- [ ] Responsive design works on mobile (390px) and desktop (1280px)
- [ ] Animations are smooth and respect reduced motion preferences
- [ ] No broken images or missing assets

## 🎭 Spline 3D Scene

- [ ] Primary scene loads by default
- [ ] Alternate scene loads with `?variant=alt`
- [ ] Scene switching works without errors
- [ ] Loading states display correctly
- [ ] Error handling works gracefully
- [ ] Scene takes full viewport height

## 📊 Live Market Stats

- [ ] Market data appears within 2 seconds
- [ ] Data updates every 15 seconds (configurable)
- [ ] All stat cards display correctly
- [ ] Error states show non-blocking banners
- [ ] "View Chart" button links to correct Dexscreener URL
- [ ] Loading shimmer effects work

## 🔗 Contract Address Section

- [ ] Contract address displays correctly
- [ ] Copy-to-clipboard functionality works
- [ ] Success toast appears after copying
- [ ] QR code generation works
- [ ] Explorer button links to correct blockchain explorer
- [ ] How-to steps are clear and helpful

## 🧭 Navigation & UX

- [ ] Sticky navigation works correctly
- [ ] Smooth scrolling to sections
- [ ] Mobile menu opens/closes properly
- [ ] All navigation links work
- [ ] Scroll progress indicator visible
- [ ] Logo scrolls to top when clicked

## 📱 Responsiveness

- [ ] Mobile-first design works on all screen sizes
- [ ] Touch targets are appropriately sized (44px+)
- [ ] Text remains readable on small screens
- [ ] Navigation adapts to mobile viewport
- [ ] CTA buttons stack properly on mobile

## ♿ Accessibility

- [ ] Skip-to-content link works
- [ ] All images have alt text
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] Focus states visible on all interactive elements
- [ ] Color contrast meets WCAG AA standards
- [ ] Screen reader friendly navigation

## 🔍 SEO & Meta

- [ ] Page title and description are correct
- [ ] OpenGraph tags work
- [ ] Twitter Card displays properly
- [ ] Structured data (JSON-LD) is valid
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Robots.txt configured correctly

## 🧪 Functionality Testing

- [ ] All buttons and links work
- [ ] Forms submit correctly (if any)
- [ ] External links open in new tabs
- [ ] Browser back/forward navigation works
- [ ] Page refresh maintains state where appropriate

## 🌐 Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 Performance Testing

- [ ] Core Web Vitals meet targets
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] First Input Delay < 100ms

## 🔒 Security & Privacy

- [ ] No sensitive data exposed in client-side code
- [ ] HTTPS enforced (in production)
- [ ] Security headers configured
- [ ] No console.log statements in production
- [ ] API keys not exposed in client

## 🚀 Deployment Testing

- [ ] Build succeeds without errors
- [ ] Netlify deployment works
- [ ] Environment variables configured correctly
- [ ] Custom domain resolves properly
- [ ] SSL certificate valid

## 📝 Documentation

- [ ] README is comprehensive and accurate
- [ ] Environment variables documented
- [ ] Deployment instructions clear
- [ ] Troubleshooting section helpful
- [ ] Contributing guidelines provided

## 🧪 Testing Coverage

- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Test coverage > 80%
- [ ] All critical paths tested
- [ ] Error scenarios covered

---

## 🎯 Acceptance Criteria

- [ ] **Single page**: All content on one page with smooth scrolling
- [ ] **Centered layout**: All sections properly centered with max-width containers
- [ ] **Spline hero**: 3D scene dominates above the fold
- [ ] **Live updates**: Market cap and stats update automatically
- [ ] **CA functionality**: Copy-to-clipboard works with confirmation
- [ ] **Theme compliance**: Yellow/gold on black with AA contrast
- [ ] **Performance**: Lighthouse ≥ 90 on mobile
- [ ] **Build success**: Clean npm ci && npm run build works
- [ ] **Netlify deploy**: Site deploys successfully

## 🚨 Critical Issues (Must Fix)

- [ ] Page doesn't load
- [ ] Spline scene fails to render
- [ ] Market data not updating
- [ ] Copy functionality broken
- [ ] Mobile layout broken
- [ ] Build failures
- [ ] Security vulnerabilities

## ⚠️ Minor Issues (Should Fix)

- [ ] Visual glitches
- [ ] Performance below targets
- [ ] Accessibility improvements
- [ ] SEO optimizations
- [ ] Code quality issues

---

**QA Tester**: _________________  
**Date**: _________________  
**Status**: 🟢 Pass / �� Partial / 🔴 Fail
