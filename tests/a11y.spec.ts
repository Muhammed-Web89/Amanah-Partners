import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { all } from './pages';

// Erişilebilirlik: axe (WCAG 2.2 A/AA) — kritik ve ciddi sorun sıfır olmalı.
for (const theme of ['light', 'dark'] as const) {
  test.describe(`axe · ${theme}`, () => {
    test.use({ colorScheme: theme });
    for (const path of theme === 'light' ? all : ['/uz', '/uz/aloqa', '/ru/programs/a-level', '/en/faq']) {
      test(path, async ({ page }) => {
        await page.goto(path);
        // Kapalı akordeonlar dahil tüm içerik denetlensin
        await page.evaluate(() => document.querySelectorAll('details').forEach((d) => (d.open = true)));
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
        const serious = results.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious');
        expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
      });
    }
  });
}
