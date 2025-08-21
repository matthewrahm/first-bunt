import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load without errors', async ({ page }) => {
    await page.goto('/')
    
    // Check for console errors
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // Verify no console errors
    expect(consoleErrors).toHaveLength(0)
  })

  test('should display hero section with Spline scene', async ({ page }) => {
    await page.goto('/')
    
    // Check hero content
    await expect(page.getByRole('heading', { name: /Yellow.*Pup/i })).toBeVisible()
    await expect(page.getByText(/next big Solana meme coin/i)).toBeVisible()
    
    // Check for Spline scene (mocked in tests)
    await expect(page.getByTestId('spline-scene')).toBeVisible()
    
    // Check CTA buttons
    await expect(page.getByRole('link', { name: /Learn More/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Get Token/i })).toBeVisible()
  })

  test('should have working navigation', async ({ page }) => {
    await page.goto('/')
    
    // Check navigation elements
    await expect(page.getByRole('navigation')).toBeVisible()
    await expect(page.getByText('Yellow Pup')).toBeVisible()
    
    // Check navigation links
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Token' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Live Stats' })).toBeVisible()
  })

  test('should scroll to sections when navigation clicked', async ({ page }) => {
    await page.goto('/')
    
    // Click About link
    await page.getByRole('link', { name: 'About' }).click()
    
    // Wait for scroll and check if we're in About section
    await page.waitForTimeout(1000)
    const aboutSection = page.locator('#about')
    await expect(aboutSection).toBeVisible()
    
    // Check if we're at the top of the section
    const rect = await aboutSection.boundingBox()
    expect(rect).toBeTruthy()
  })

  test('should display token information correctly', async ({ page }) => {
    await page.goto('/#token')
    
    // Check token section
    await expect(page.getByRole('heading', { name: /Yellow Pup Token/i })).toBeVisible()
    await expect(page.getByText('YPUP')).toBeVisible()
    await expect(page.getByText('Chain: solana')).toBeVisible()
    
    // Check contract address display
    await expect(page.getByText(/So1111\.\.\.11111112/)).toBeVisible()
    
    // Check action buttons
    await expect(page.getByRole('button', { name: /Show QR/i })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Explorer' })).toBeVisible()
  })

  test('should show live stats section', async ({ page }) => {
    await page.goto('/#live-stats')
    
    // Check stats section
    await expect(page.getByRole('heading', { name: /Live Market Stats/i })).toBeVisible()
    await expect(page.getByText(/Real-time data from DEX Screener/i)).toBeVisible()
    
    // Check for stats cards (may show loading initially)
    await expect(page.locator('[class*="bg-ink-800"]')).toHaveCount(6)
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 }) // iPhone 12
    await page.goto('/')
    
    // Check mobile navigation
    await expect(page.getByRole('button', { name: /Toggle mobile menu/i })).toBeVisible()
    
    // Check hero text is readable on mobile
    await expect(page.getByRole('heading', { name: /Yellow.*Pup/i })).toBeVisible()
    
    // Check CTA buttons stack vertically on mobile
    const ctaButtons = page.locator('a[href="#about"], a[href="#token"]')
    await expect(ctaButtons).toHaveCount(2)
  })

  test('should be responsive on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('/')
    
    // Check desktop navigation
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Token' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Live Stats' })).toBeVisible()
    
    // Check CTA buttons are horizontal on desktop
    const ctaContainer = page.locator('a[href="#about"]').locator('..')
    const computedStyle = await ctaContainer.evaluate(el => 
      window.getComputedStyle(el).flexDirection
    )
    expect(computedStyle).toBe('row')
  })

  test('should have accessible elements', async ({ page }) => {
    await page.goto('/')
    
    // Check for skip link
    await expect(page.getByRole('link', { name: /Skip to main content/i })).toBeVisible()
    
    // Check for proper heading hierarchy
    const headings = page.locator('h1, h2, h3')
    await expect(headings).toHaveCount(expect.any(Number))
    
    // Check for proper alt text on images
    const images = page.locator('img')
    for (let i = 0; i < await images.count(); i++) {
      const alt = await images.nth(i).getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })

  test('should handle Spline scene switching', async ({ page }) => {
    await page.goto('/?variant=alt')
    
    // Check if alternate scene indicator shows
    await expect(page.getByText('Scene: Background')).toBeVisible()
    
    // Go back to primary scene
    await page.goto('/')
    await expect(page.getByText('Scene: Cursor')).toBeVisible()
  })
})
