import { test, expect } from '@playwright/test';

test.describe('Subscription Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('current_user', JSON.stringify({
        id: 'test-user',
        email: 'test@example.com'
      }));
    });
    await page.goto('/');
  });

  test('should display subscription plans correctly', async ({ page }) => {
    await page.click('text=Restaurant / Cafe');
    await page.setInputFiles('input[type="file"]', 'e2e/fixtures/test-image.jpg');
    await page.fill('[data-testid="product-name"]', 'Test Product');
    await page.click('text=Generate with AI');
    
    await expect(page.getByText('Basic Plan')).toBeVisible();
    await expect(page.getByText('25,000 IQD')).toBeVisible();
    await expect(page.getByText('50 images/month')).toBeVisible();
    
    await expect(page.getByText('Premium Plan')).toBeVisible();
    await expect(page.getByText('45,000 IQD')).toBeVisible();
    await expect(page.getByText('100 images/month')).toBeVisible();
    
    await expect(page.getByText('Pro Plan')).toBeVisible();
    await expect(page.getByText('75,000 IQD')).toBeVisible();
    await expect(page.getByText('200 images/month')).toBeVisible();
  });

  test('should upgrade subscription plan', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('user_subscription', JSON.stringify({
        planId: 'basic',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        imagesUsed: 25,
        status: 'active'
      }));
    });
    await page.reload();
    
    await page.click('text=Upgrade Plan');
    await expect(page.getByText('Upgrade Your Plan')).toBeVisible();
    
    await page.click('text=Choose Premium');
    await expect(page.getByText('Upgrade to Premium')).toBeVisible();
    await expect(page.getByText('45,000 IQD')).toBeVisible();
  });

  test('should show current subscription status', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('user_subscription', JSON.stringify({
        planId: 'premium',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        imagesUsed: 30,
        status: 'active'
      }));
    });
    await page.reload();
    
    await expect(page.getByText('Premium Plan')).toBeVisible();
    await expect(page.getByText('70 images remaining')).toBeVisible();
    await expect(page.getByText('15 days remaining')).toBeVisible();
  });

  test('should handle subscription renewal', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('user_subscription', JSON.stringify({
        planId: 'basic',
        startDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        imagesUsed: 45,
        status: 'active'
      }));
    });
    await page.reload();
    
    await expect(page.getByText('Your subscription expires in 5 days')).toBeVisible();
    await page.click('text=Renew Now');
    
    await expect(page.getByText('Renew Basic Plan')).toBeVisible();
    await expect(page.getByText('25,000 IQD')).toBeVisible();
  });

  test('should cancel subscription', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('user_subscription', JSON.stringify({
        planId: 'premium',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
        imagesUsed: 10,
        status: 'active'
      }));
    });
    await page.reload();
    
    await page.click('text=Manage Subscription');
    await page.click('text=Cancel Subscription');
    
    await expect(page.getByText('Are you sure you want to cancel?')).toBeVisible();
    await page.click('text=Yes, Cancel');
    
    await expect(page.getByText('Subscription cancelled')).toBeVisible();
  });

  test('should show subscription benefits', async ({ page }) => {
    await page.click('text=Restaurant / Cafe');
    await page.setInputFiles('input[type="file"]', 'e2e/fixtures/test-image.jpg');
    await page.fill('[data-testid="product-name"]', 'Test Product');
    await page.click('text=Generate with AI');
    
    await page.click('text=View Details', { first: true });
    
    await expect(page.getByText('High-quality AI generation')).toBeVisible();
    await expect(page.getByText('Priority processing')).toBeVisible();
    await expect(page.getByText('24/7 support')).toBeVisible();
  });

  test('should handle downgrade restrictions', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('user_subscription', JSON.stringify({
        planId: 'pro',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
        imagesUsed: 150,
        status: 'active'
      }));
    });
    await page.reload();
    
    await page.click('text=Manage Subscription');
    await page.click('text=Change Plan');
    await page.click('text=Choose Basic');
    
    await expect(page.getByText('Cannot downgrade: You have used 150 images')).toBeVisible();
    await expect(page.getByText('Basic plan allows only 50 images')).toBeVisible();
  });
});