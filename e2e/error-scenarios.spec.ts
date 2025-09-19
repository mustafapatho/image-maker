import { test, expect } from '@playwright/test';

test.describe('Error Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should handle network errors gracefully', async ({ page }) => {
    await page.route('**/api/**', route => route.abort());
    
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('button[type="submit"]');
    
    await expect(page.getByText('Network error. Please try again.')).toBeVisible();
  });

  test('should handle invalid file uploads', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('current_user', JSON.stringify({
        id: 'test-user',
        email: 'test@example.com'
      }));
      localStorage.setItem('user_subscription', JSON.stringify({
        planId: 'basic',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        imagesUsed: 0,
        status: 'active'
      }));
    });
    await page.reload();
    
    await page.click('text=Restaurant / Cafe');
    
    // Try to upload a text file instead of image
    await page.setInputFiles('input[type="file"]', {
      name: 'test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('This is not an image')
    });
    
    await expect(page.getByText('Please upload a valid image file')).toBeVisible();
  });

  test('should handle expired subscription', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('current_user', JSON.stringify({
        id: 'test-user',
        email: 'test@example.com'
      }));
      localStorage.setItem('user_subscription', JSON.stringify({
        planId: 'basic',
        startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        imagesUsed: 10,
        status: 'expired'
      }));
    });
    await page.reload();
    
    await page.click('text=Restaurant / Cafe');
    await page.setInputFiles('input[type="file"]', 'e2e/fixtures/test-image.jpg');
    await page.fill('[data-testid="product-name"]', 'Test Product');
    await page.click('text=Generate with AI');
    
    await expect(page.getByText('Your subscription has expired')).toBeVisible();
    await expect(page.getByText('Choose Your Plan')).toBeVisible();
  });

  test('should handle quota exceeded', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('current_user', JSON.stringify({
        id: 'test-user',
        email: 'test@example.com'
      }));
      localStorage.setItem('user_subscription', JSON.stringify({
        planId: 'basic',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        imagesUsed: 50,
        status: 'active'
      }));
    });
    await page.reload();
    
    await page.click('text=Restaurant / Cafe');
    await page.setInputFiles('input[type="file"]', 'e2e/fixtures/test-image.jpg');
    await page.fill('[data-testid="product-name"]', 'Test Product');
    await page.click('text=Generate with AI');
    
    await expect(page.getByText('You have reached your monthly limit')).toBeVisible();
    await expect(page.getByText('Upgrade your plan')).toBeVisible();
  });

  test('should handle authentication errors', async ({ page }) => {
    await page.route('**/auth/**', route => {
      route.fulfill({
        status: 401,
        body: JSON.stringify({ error: { message: 'Invalid credentials' } })
      });
    });
    
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('should handle session timeout', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('current_user', JSON.stringify({
        id: 'test-user',
        email: 'test@example.com'
      }));
    });
    await page.reload();
    
    // Simulate session timeout
    await page.addInitScript(() => {
      localStorage.removeItem('current_user');
    });
    
    await page.click('text=Restaurant / Cafe');
    await expect(page.getByText('Session expired. Please sign in again.')).toBeVisible();
    await expect(page.getByText('Sign In')).toBeVisible();
  });

  test('should handle payment failures', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('current_user', JSON.stringify({
        id: 'test-user',
        email: 'test@example.com'
      }));
    });
    await page.reload();
    
    await page.click('text=Restaurant / Cafe');
    await page.setInputFiles('input[type="file"]', 'e2e/fixtures/test-image.jpg');
    await page.fill('[data-testid="product-name"]', 'Test Product');
    await page.click('text=Generate with AI');
    await page.click('text=Choose Basic');
    
    // Mock payment failure
    await page.route('**/payment/**', route => {
      route.fulfill({
        status: 400,
        body: JSON.stringify({ error: 'Payment failed' })
      });
    });
    
    await page.click('text=Pay Now');
    await expect(page.getByText('Payment failed. Please try again.')).toBeVisible();
  });
});