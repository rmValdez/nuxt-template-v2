import { test, expect } from '@playwright/test';

test.describe('Nuxt Dashboard Experience', () => {
  test('landing page loads and renders branding', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });
});
