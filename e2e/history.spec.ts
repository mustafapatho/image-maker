import { test, expect } from '@playwright/test';

test.describe('History Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('current_user', JSON.stringify({
        id: 'test-user',
        email: 'test@example.com'
      }));
      localStorage.setItem('user_subscription', JSON.stringify({
        planId: 'basic',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        imagesUsed: 5,
        status: 'active'
      }));
      localStorage.setItem('generation_history', JSON.stringify([
        {
          id: '1',
          timestamp: new Date().toISOString(),
          category: 'Restaurant / Cafe',
          productName: 'Burger',
          originalImage: 'data:image/jpeg;base64,test1',
          generatedImage: 'data:image/jpeg;base64,generated1'
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          category: 'Fashion / Lookbook',
          productName: 'Dress',
          originalImage: 'data:image/jpeg;base64,test2',
          generatedImage: 'data:image/jpeg;base64,generated2'
        }
      ]));
    });
    await page.goto('/');
  });

  test('should display history page with generated images', async ({ page }) => {
    await page.click('text=View History');
    
    await expect(page.getByText('History')).toBeVisible();
    await expect(page.getByText('Burger')).toBeVisible();
    await expect(page.getByText('Dress')).toBeVisible();
    await expect(page.getByText('Restaurant / Cafe')).toBeVisible();
    await expect(page.getByText('Fashion / Lookbook')).toBeVisible();
  });

  test('should show empty state when no history', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem('generation_history');
    });
    await page.reload();
    
    await page.click('text=View History');
    await expect(page.getByText('No images generated yet')).toBeVisible();
    await expect(page.getByText('Start creating amazing images!')).toBeVisible();
  });

  test('should download images from history', async ({ page }) => {
    await page.click('text=View History');
    
    const downloadPromise = page.waitForEvent('download');
    await page.click('text=Download', { first: true });
    const download = await downloadPromise;
    
    expect(download.suggestedFilename()).toContain('generated-image');
  });

  test('should delete images from history', async ({ page }) => {
    await page.click('text=View History');
    
    await page.click('[data-testid="delete-image-1"]');
    await page.click('text=Confirm');
    
    await expect(page.getByText('Burger')).not.toBeVisible();
    await expect(page.getByText('Dress')).toBeVisible();
  });

  test('should filter history by category', async ({ page }) => {
    await page.click('text=View History');
    
    await page.selectOption('[data-testid="category-filter"]', 'Restaurant / Cafe');
    await expect(page.getByText('Burger')).toBeVisible();
    await expect(page.getByText('Dress')).not.toBeVisible();
    
    await page.selectOption('[data-testid="category-filter"]', 'Fashion / Lookbook');
    await expect(page.getByText('Dress')).toBeVisible();
    await expect(page.getByText('Burger')).not.toBeVisible();
  });

  test('should sort history by date', async ({ page }) => {
    await page.click('text=View History');
    
    const items = page.locator('[data-testid^="history-item-"]');
    await expect(items.first()).toContainText('Burger'); // Most recent first
    
    await page.click('[data-testid="sort-oldest"]');
    await expect(items.first()).toContainText('Dress'); // Oldest first
  });

  test('should navigate back to generator from history', async ({ page }) => {
    await page.click('text=View History');
    await page.click('text=Generate New Image');
    
    await expect(page.getByText('What kind of photo do you need?')).toBeVisible();
  });
});