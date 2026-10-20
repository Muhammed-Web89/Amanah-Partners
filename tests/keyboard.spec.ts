import { expect, test } from '@playwright/test';

test('atla bağlantısı ilk sekme durağı ve içeriğe gider', async ({ page }) => {
  await page.goto('/uz');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Asosiy mazmunga oʻtish' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

test('Programlar açılır menüsü klavyeyle açılır, Escape ile kapanır', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/uz');
  const summary = page.locator('header details summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('link', { name: 'IGCSE va A-Level' }).first()).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('header details')).not.toHaveAttribute('open', '');
  await expect(summary).toBeFocused();
});

test('mobil menü: açılır, Escape ile kapanır, odak düğmeye döner', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/ru');
  const button = page.getByRole('button', { name: 'Открыть меню' });
  await button.click();
  await expect(page.locator('#mobile-menu')).toBeVisible();
  await expect(page.locator('#mobile-menu').getByRole('link', { name: 'Русский' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#mobile-menu')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Открыть меню' })).toBeFocused();
});

test('SSS araması: Özbekçe kesme işareti varyantları aynı sonucu verir', async ({ page }) => {
  await page.goto('/uz/savollar');
  const search = page.getByRole('searchbox', { name: 'Savollar boʻyicha qidirish' });
  await search.fill("bo'ladimi");
  const a = await page.locator('details').count();
  await search.fill('boʻladimi');
  expect(await page.locator('details').count()).toBe(a);
  expect(a).toBeGreaterThan(0);
});

test('tema düğmesi koyu temaya geçirir ve seçimi hatırlar', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/en', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Turn dark mode on or off' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/dark/);
});
