import { expect, test } from '@playwright/test';
import { all } from './pages';

// 360 px'te yatay kaydırma yok (prompt §12) + test matrisindeki diğer genişlikler.
const widths = [360, 375, 390, 430, 768, 1280, 1440];

for (const width of widths) {
  test(`yatay kaydırma yok · ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const failures: string[] = [];
    for (const path of width === 360 ? all : all.filter((_, i) => i % 3 === 0)) {
      await page.goto(path);
      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      if (sw > width) failures.push(`${path}: ${sw}px`);
    }
    expect(failures).toEqual([]);
  });
}

test('mobilde "Bepul konsultatsiya" ve Telegram her sayfada görünür', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  for (const path of ['/uz', '/uz/narxlar', '/ru/faq', '/en/destinations/uk']) {
    await page.goto(path);
    const bar = page.locator('div.fixed.bottom-0');
    await expect(bar).toBeVisible();
    await expect(bar.getByText(/Bepul konsultatsiya|Бесплатная консультация|Free consultation/)).toBeVisible();
    await expect(bar.getByText('Telegram')).toBeVisible();
  }
});

test('masaüstünde mobil bar gizli, üst menü 7 bağlantı', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/uz');
  await expect(page.locator('div.fixed.bottom-0')).toBeHidden();
  const nav = page.getByRole('navigation', { name: 'Asosiy menyu' });
  await expect(nav.locator(':scope > ul > li')).toHaveCount(7);
});
