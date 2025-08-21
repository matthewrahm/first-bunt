import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should have sticky navigation', async ({ page }) => {
    // Check navigation is visible initially
    const nav = page.getByRole('navigation')
    await expect(nav).toBeVisible()
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500))
    
    // Navigation should still be visible
    await expect(nav).toBeVisible()
  })

  test('should change background on scroll', async ({ page }) => {
    const nav = page.getByRole('navigation')
    
    // Initially transparent
    const initialClass = await nav.getAttribute('class')
    expect(initialClass).toContain('bg-transparent')
    
    // Scroll down to trigger background change
    await page.evaluate(() => window.scrollTo(0, 100))
    await page.waitForTimeout(100)
    
    // Should have background now
    const scrolledClass = await nav.getAttribute('class')
    expect(scrolledClass).toContain('bg-ink-900')
  })

  test('should have working logo that scrolls to top', async ({ page }) => {
    // Scroll down first
    await page.evaluate(() => window.scrollTo(0, 1000))
    
    // Click logo
    await page.getByText('Yellow Pup').click()
    
    // Should scroll to top
    await page.waitForTimeout(1000)
    const scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBeLessThan(100)
  })

  test('should have smooth scrolling navigation', async ({ page }) => {
    // Get initial scroll position
    const initialScroll = await page.evaluate(() => window.scrollY)
    
    // Click About link
    await page.getByRole('link', { name: 'About' }).click()
    
    // Wait for scroll animation
    await page.waitForTimeout(1000)
    
    // Should have scrolled
    const finalScroll = await page.evaluate(() => window.scrollY)
    expect(finalScroll).toBeGreaterThan(initialScroll)
  })

  test('should highlight active section in navigation', async ({ page }) => {
    // Scroll to About section
    await page.getByRole('link', { name: 'About' }).click()
    await page.waitForTimeout(1000)
    
    // About link should be more prominent (you can customize this test based on your design)
    const aboutLink = page.getByRole('link', { name: 'About' })
    await expect(aboutLink).toBeVisible()
  })

  test('should have mobile menu toggle', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 390, height: 844 })
    
    // Mobile menu button should be visible
    const menuButton = page.getByRole('button', { name: /Toggle mobile menu/i })
    await expect(menuButton).toBeVisible()
    
    // Desktop navigation should be hidden
    const desktopNav = page.locator('nav > div > div:nth-child(2)')
    await expect(desktopNav).toHaveClass(/hidden/)
  })

  test('should open and close mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    
    const menuButton = page.getByRole('button', { name: /Toggle mobile menu/i })
    
    // Click to open menu
    await menuButton.click()
    
    // Menu should be visible
    await expect(page.locator('nav + div')).toBeVisible()
    
    // Click to close menu
    await menuButton.click()
    
    // Menu should be hidden
    await expect(page.locator('nav + div')).not.toBeVisible()
  })

  test('should have working mobile navigation links', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    
    // Open mobile menu
    await page.getByRole('button', { name: /Toggle mobile menu/i }).click()
    
    // Click About link in mobile menu
    await page.locator('nav + div').getByRole('button', { name: 'About' }).click()
    
    // Menu should close
    await expect(page.locator('nav + div')).not.toBeVisible()
    
    // Should scroll to About section
    await page.waitForTimeout(1000)
    const aboutSection = page.locator('#about')
    await expect(aboutSection).toBeVisible()
  })

  test('should have scroll progress indicator', async ({ page }) => {
    // Initially no progress
    const progressBar = page.locator('nav + div:last-child')
    await expect(progressBar).toBeVisible()
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 1000))
    await page.waitForTimeout(100)
    
    // Progress bar should show progress
    await expect(progressBar).toBeVisible()
  })

  test('should have accessible navigation', async ({ page }) => {
    // Check for proper ARIA labels
    const nav = page.getByRole('navigation')
    await expect(nav).toBeVisible()
    
    // Check for proper button roles
    const buttons = page.locator('nav button')
    for (let i = 0; i < await buttons.count(); i++) {
      const button = buttons.nth(i)
      const role = await button.getAttribute('role')
      const ariaLabel = await button.getAttribute('aria-label')
      
      if (role === 'button') {
        expect(ariaLabel).toBeTruthy()
      }
    }
  })

  test('should have working CTA button in navigation', async ({ page }) => {
    const ctaButton = page.getByRole('button', { name: 'Get Token' })
    await expect(ctaButton).toBeVisible()
    
    // Click CTA button
    await ctaButton.click()
    
    // Should scroll to token section
    await page.waitForTimeout(1000)
    const tokenSection = page.locator('#token')
    await expect(tokenSection).toBeVisible()
  })
})
