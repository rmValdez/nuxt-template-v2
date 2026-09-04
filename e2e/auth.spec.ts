import { test, expect } from '@playwright/test';

test.describe('Nuxt Authentication Flow', () => {
  test('redirects unauthenticated users from protected dashboard to login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('successfully logs in with test credentials', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'Password123!');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*\/dashboard/);
  });
});
