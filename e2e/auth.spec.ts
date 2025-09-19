import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display auth form on initial load', async ({ page }) => {
    await expect(page.getByText('Sign In')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
  });

  test('should switch between sign in and sign up', async ({ page }) => {
    await expect(page.getByText('Sign In')).toBeVisible();
    
    await page.click('text=Need an account? Sign up');
    await expect(page.getByText('Sign Up')).toBeVisible();
    
    await page.click('text=Already have an account? Sign in');
    await expect(page.getByText('Sign In')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.fill('[data-testid="email-input"]', 'invalid-email');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Browser validation should prevent submission
    const emailInput = page.getByLabel('Email');
    await expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('should change language', async ({ page }) => {
    await expect(page.getByText('Sign In')).toBeVisible();
    
    await page.click('text=AR');
    await expect(page.getByText('تسجيل الدخول')).toBeVisible();
    
    await page.click('text=EN');
    await expect(page.getByText('Sign In')).toBeVisible();
  });

  test('should persist language selection', async ({ page }) => {
    await page.click('text=AR');
    await expect(page.getByText('تسجيل الدخول')).toBeVisible();
    
    await page.reload();
    await expect(page.getByText('تسجيل الدخول')).toBeVisible();
  });
});