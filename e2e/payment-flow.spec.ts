import { test, expect } from '@playwright/test';

test.describe('Payment Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('current_user', JSON.stringify({
        id: 'test-user',
        email: 'test@example.com'
      }));
    });
    await page.goto('/');
  });

  test('should show subscription modal when generating without subscription', async ({ page }) => {
    await page.click('text=Restaurant / Cafe');
    await page.setInputFiles('input[type="file"]', 'e2e/fixtures/test-image.jpg');
    await page.fill('[data-testid="product-name"]', 'Test Product');
    
    await page.click('text=Generate with AI');
    await expect(page.getByText('Choose Your Plan')).toBeVisible();
    await expect(page.getByText('Basic Plan')).toBeVisible();
    await expect(page.getByText('Premium Plan')).toBeVisible();
    await expect(page.getByText('Pro Plan')).toBeVisible();
  });

  test('should display payment modal when selecting plan', async ({ page }) => {
    await page.click('text=Restaurant / Cafe');
    await page.setInputFiles('input[type="file"]', 'e2e/fixtures/test-image.jpg');
    await page.fill('[data-testid="product-name"]', 'Test Product');
    await page.click('text=Generate with AI');
    
    await page.click('text=Choose Basic');
    await expect(page.getByText('Payment')).toBeVisible();
    await expect(page.getByText('25,000 IQD')).toBeVisible();
  });

  test('should handle payment cancellation', async ({ page }) => {
    await page.click('text=Restaurant / Cafe');
    await page.setInputFiles('input[type="file"]', 'e2e/fixtures/test-image.jpg');
    await page.fill('[data-testid="product-name"]', 'Test Product');
    await page.click('text=Generate with AI');
    await page.click('text=Choose Basic');
    
    await page.click('text=Cancel');
    await expect(page.getByText('Choose Your Plan')).toBeVisible();
  });

  test('should proceed with generation after successful payment', async ({ page }) => {
    await page.addInitScript(() => {
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
    await page.setInputFiles('input[type="file"]', 'e2e/fixtures/test-image.jpg');
    await page.fill('[data-testid="product-name"]', 'Test Product');
    
    await page.click('text=Generate with AI');
    await expect(page.getByText('Generating your image...')).toBeVisible();
  });
});