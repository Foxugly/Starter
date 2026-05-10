import {expect, test} from '@playwright/test';

test('home page loads without an unhandled error', async ({page}) => {
  const consoleErrors: string[] = [];
  page.on('pageerror', (err) => consoleErrors.push(err.message));

  const response = await page.goto('/');
  expect(response, 'navigation response').not.toBeNull();
  expect(response!.status(), `status for ${response!.url()}`).toBeLessThan(500);

  await page.waitForLoadState('networkidle');

  await expect(page).toHaveTitle(/.+/);
  expect(consoleErrors, 'unhandled page errors').toEqual([]);
});
