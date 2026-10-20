// Prototip ekran görüntüleri (docs/prototip). Kullanım: node scripts/screens.mjs [baseURL]
import { chromium } from '@playwright/test';

const base = process.argv[2] ?? 'http://localhost:3123';
const pages = [
  ['ana-sayfa', '/uz'],
  ['a-level', '/uz/dasturlar/a-level'],
  ['nasil-calisiyoruz', '/uz/qanday-ishlaymiz'],
  ['form', '/uz/aloqa'],
];
const viewports = [
  ['mobil', { width: 390, height: 844 }],
  ['masaustu', { width: 1440, height: 900 }],
];
const theme = process.argv[3] ?? 'light';

const browser = await chromium.launch({ channel: 'chrome' });
for (const [vName, viewport] of viewports) {
  const context = await browser.newContext({ viewport, colorScheme: theme, deviceScaleFactor: 1, isMobile: vName === 'mobil', hasTouch: vName === 'mobil' });
  const page = await context.newPage();
  for (const [name, path] of pages) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `docs/prototip/${name}-${vName}${theme === 'dark' ? '-koyu' : ''}.png`, fullPage: true });
  }
  await context.close();
}
await browser.close();
console.log('ok');
