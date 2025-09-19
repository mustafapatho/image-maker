import { test, expect } from '@playwright/test';

test.describe('Main App Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Mock successful authentication
    await page.addInitScript(() => {
      localStorage.setItem('current_user', JSON.stringify({
        id: 'test-user',
        email: 'test@example.com'
      }));
    });
    
    await page.goto('/');
  });

  test('should display category selector after auth', async ({ page }) => {
    await expect(page.getByText('What kind of photo do you need?')).toBeVisible();
    await expect(page.getByText('Viral Content & Memes')).toBeVisible();
  });

  test('should navigate to image generator', async ({ page }) => {
    await page.click('text=Restaurant / Cafe');
    await expect(page.getByText('Photo Generation')).toBeVisible();
    await expect(page.getByLabel('Product Name')).toBeVisible();
  });

  test('should show subscription modal when generating', async ({ page }) => {
    await page.click('text=Restaurant / Cafe');
    
    // Fill required fields
    await page.setInputFiles('input[type="file"]', 'e2e/fixtures/test-image.jpg');
    await page.fill('[data-testid="product-name"]', 'Test Product');
    
    await page.click('text=Generate with AI');
    await expect(page.getByText('Choose Your Plan')).toBeVisible();
  });

  test('should navigate to history page', async ({ page }) => {
    await page.click('text=View History');
    await expect(page.getByText('History')).toBeVisible();
  });

  test('should handle responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByText('What kind of photo do you need?')).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByText('What kind of photo do you need?')).toBeVisible();
  });

  test('should sign out successfully', async ({ page }) => {
    await page.click('text=Sign Out');
    await expect(page.getByText('Sign In')).toBeVisible();
  });
});