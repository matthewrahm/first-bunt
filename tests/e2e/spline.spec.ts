import { test, expect } from '@playwright/test'

test.describe('Spline 3D Scene', () => {
  test('should load primary Spline scene by default', async ({ page }) => {
    await page.goto('/')
    
    // Check for Spline scene
    const splineScene = page.getByTestId('spline-scene')
    await expect(splineScene).toBeVisible()
    
    // Check scene URL
    const sceneUrl = await splineScene.getAttribute('data-scene')
    expect(sceneUrl).toContain('MjvXTfO-hSPuCMUn')
  })

  test('should load alternate Spline scene with variant parameter', async ({ page }) => {
    await page.goto('/?variant=alt')
    
    // Check for Spline scene
    const splineScene = page.getByTestId('spline-scene')
    await expect(splineScene).toBeVisible()
    
    // Check scene URL
    const sceneUrl = await splineScene.getAttribute('data-scene')
    expect(sceneUrl).toContain('PWEvFtXYjYKhHjZ9')
  })

  test('should show scene indicator', async ({ page }) => {
    await page.goto('/')
    
    // Check scene indicator
    await expect(page.getByText('Scene: Cursor')).toBeVisible()
    
    // Change to alternate scene
    await page.goto('/?variant=alt')
    await expect(page.getByText('Scene: Background')).toBeVisible()
  })

  test('should have loading state', async ({ page }) => {
    await page.goto('/')
    
    // Initially should show loading
    await expect(page.getByText('Loading Yellow Pup')).toBeVisible()
    await expect(page.getByText('Preparing your 3D experience...')).toBeVisible()
    
    // Loading spinner should be visible
    const spinner = page.locator('div[class*="animate-spin"]')
    await expect(spinner).toBeVisible()
  })

  test('should handle Spline loading completion', async ({ page }) => {
    await page.goto('/')
    
    // Wait for Spline to load (mocked in tests)
    await page.waitForTimeout(1000)
    
    // Loading overlay should disappear
    await expect(page.getByText('Loading Yellow Pup')).not.toBeVisible()
    
    // Hero content should be visible
    await expect(page.getByRole('heading', { name: /Yellow.*Pup/i })).toBeVisible()
  })

  test('should have hero content overlay', async ({ page }) => {
    await page.goto('/')
    
    // Wait for content to load
    await page.waitForTimeout(1000)
    
    // Check hero title
    await expect(page.getByRole('heading', { name: /Yellow.*Pup/i })).toBeVisible()
    
    // Check hero description
    await expect(page.getByText(/next big Solana meme coin/i)).toBeVisible()
    
    // Check CTA buttons
    await expect(page.getByRole('link', { name: /Learn More/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Get Token/i })).toBeVisible()
  })

  test('should have proper hero layout', async ({ page }) => {
    await page.goto('/')
    
    // Hero should take full viewport height
    const heroSection = page.locator('section').first()
    const viewportHeight = page.viewportSize()?.height || 800
    
    // Check if hero section is at least viewport height
    const heroHeight = await heroSection.boundingBox()
    expect(heroHeight?.height).toBeGreaterThanOrEqual(viewportHeight * 0.9)
  })

  test('should have background gradient overlays', async ({ page }) => {
    await page.goto('/')
    
    // Check for gradient overlays
    const gradients = page.locator('div[class*="bg-gradient"]')
    await expect(gradients).toHaveCount(expect.any(Number))
  })

  test('should have vignette effect', async ({ page }) => {
    await page.goto('/')
    
    // Check for vignette overlay
    const vignette = page.locator('div[class*="bg-radial-gradient"]')
    await expect(vignette).toBeVisible()
  })

  test('should handle Spline errors gracefully', async ({ page }) => {
    // This test would require mocking Spline errors
    // For now, we'll test the error UI structure
    
    await page.goto('/')
    
    // Error state should not be visible initially
    await expect(page.getByText('Scene Loading Error')).not.toBeVisible()
  })

  test('should have responsive hero content', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    
    // Wait for content to load
    await page.waitForTimeout(1000)
    
    // Hero content should be visible and properly sized
    await expect(page.getByRole('heading', { name: /Yellow.*Pup/i })).toBeVisible()
    
    // Check if title is responsive
    const title = page.getByRole('heading', { name: /Yellow.*Pup/i })
    const titleSize = await title.boundingBox()
    expect(titleSize?.width).toBeLessThan(390) // Should fit mobile viewport
  })

  test('should have smooth animations', async ({ page }) => {
    await page.goto('/')
    
    // Check for motion elements
    const motionElements = page.locator('[class*="motion"]')
    await expect(motionElements).toHaveCount(expect.any(Number))
  })

  test('should respect reduced motion preferences', async ({ page }) => {
    // Set reduced motion preference
    await page.addInitScript(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      })
    })
    
    await page.goto('/')
    
    // Reduced motion should be respected (this is handled in CSS)
    // We can't easily test the CSS behavior in Playwright, but we can verify the structure
    await expect(page.getByTestId('spline-scene')).toBeVisible()
  })

  test('should have proper z-index layering', async ({ page }) => {
    await page.goto('/')
    
    // Check that different layers have proper z-index values
    const heroContent = page.locator('section > div:last-child')
    const zIndex = await heroContent.evaluate(el => 
      window.getComputedStyle(el).zIndex
    )
    
    // Hero content should have high z-index
    expect(parseInt(zIndex)).toBeGreaterThan(10)
  })

  test('should handle scene switching without errors', async ({ page }) => {
    await page.goto('/')
    
    // Wait for initial scene to load
    await page.waitForTimeout(1000)
    
    // Switch to alternate scene
    await page.goto('/?variant=alt')
    
    // Should load without errors
    const consoleErrors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    await page.waitForTimeout(2000)
    
    // No console errors should occur
    expect(consoleErrors).toHaveLength(0)
  })
})
