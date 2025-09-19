import { test, expect } from '@playwright/test';

test.describe('Image Generation Workflow', () => {
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
        imagesUsed: 0,
        status: 'active'
      }));
    });
    await page.goto('/');
  });

  test('should complete full image generation flow', async ({ page }) => {
    await page.click('text=Restaurant / Cafe');
    
    await page.setInputFiles('input[type="file"]', 'e2e/fixtures/test-image.jpg');
    await page.fill('[data-testid="product-name"]', 'Delicious Burger');
    await page.fill('[data-testid="description"]', 'A juicy beef burger with fresh vegetables');
    
    await page.click('text=Generate with AI');
    await expect(page.getByText('Generating your image...')).toBeVisible();
    
    // Mock successful generation
    await page.addInitScript(() => {
      window.mockGeneratedImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
    });
    
    await page.waitForTimeout(2000);
    await expect(page.getByText('Image generated successfully!')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Download' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Generate Another' })).toBeVisible();
  });

  test('should handle generation errors', async ({ page }) => {
    await page.addInitScript(() => {
      window.mockGenerationError = true;
    });
    
    await page.click('text=Fashion / Lookbook');
    await page.setInputFiles('input[type="file"]', 'e2e/fixtures/test-image.jpg');
    await page.fill('[data-testid="product-name"]', 'Fashion Item');
    
    await page.click('text=Generate with AI');
    await expect(page.getByText('Failed to generate image')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Try Again' })).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.click('text=Restaurant / Cafe');
    await page.click('text=Generate with AI');
    
    // Should not proceed without required fields
    await expect(page.getByText('Please fill in all required fields')).toBeVisible();
  });

  test('should show loading indicator during generation', async ({ page }) => {
    await page.click('text=Viral Content & Memes');
    await page.setInputFiles('input[type="file"]', 'e2e/fixtures/test-image.jpg');
    await page.fill('[data-testid="product-name"]', 'Meme Content');
    
    await page.click('text=Generate with AI');
    await expect(page.locator('.loading-spinner')).toBeVisible();
    await expect(page.getByText('Generating your image...')).toBeVisible();
  });

  test('should update subscription usage after generation', async ({ page }) => {
    await page.click('text=Restaurant / Cafe');
    await page.setInputFiles('input[type="file"]', 'e2e/fixtures/test-image.jpg');
    await page.fill('[data-testid="product-name"]', 'Test Product');
    
    await page.click('text=Generate with AI');
    await page.waitForTimeout(2000);
    
    // Check that remaining images count decreased
    await expect(page.getByText('49 images remaining')).toBeVisible();
  });
});