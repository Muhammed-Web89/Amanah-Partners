import { expect, test } from '@playwright/test';

test('hreflang + x-default + canonical', async ({ page }) => {
  await page.goto('/ru/programs/a-level');
  const alt = await page.locator('link[rel="alternate"][hreflang]').evaluateAll((els) =>
    Object.fromEntries(els.map((e) => [e.getAttribute('hreflang'), new URL(e.getAttribute('href')!).pathname])),
  );
  expect(alt).toEqual({
    'uz-Latn': '/uz/dasturlar/a-level',
    ru: '/ru/programs/a-level',
    en: '/en/programs/a-level',
    'x-default': '/uz/dasturlar/a-level',
  });
  expect(new URL((await page.locator('link[rel="canonical"]').getAttribute('href'))!).pathname).toBe('/ru/programs/a-level');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
});

test('dil değiştirince aynı sayfanın karşılığına gider', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/uz/davlatlar/germaniya');
  await page.getByRole('navigation', { name: 'Tilni tanlash' }).getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveURL(/\/en\/destinations\/germany$/);
  await page.getByRole('navigation', { name: 'Choose language' }).getByRole('link', { name: 'Русский' }).click();
  await expect(page).toHaveURL(/\/ru\/destinations\/germany$/);
});

test('rehber yazısında dil değişimi doğru slug’a yönlendirir', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/uz/maqolalar/pearson-imtihonlari-qanday-otadi');
  await page.getByRole('navigation', { name: 'Tilni tanlash' }).getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveURL(/\/en\/guides\/how-pearson-exams-work$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('How do Pearson exams work?');
});

test('kök adres tarayıcı diline göre yönlendirir', async ({ browser }) => {
  for (const [lang, expected] of [['ru-RU', '/ru'], ['uz-UZ', '/uz'], ['en-GB', '/en'], ['de-DE', '/uz']] as const) {
    const ctx = await browser.newContext({ locale: lang });
    const page = await ctx.newPage();
    await page.goto('/');
    expect(new URL(page.url()).pathname).toBe(expected);
    await ctx.close();
  }
});

test('404 sayfası üç dilde, ana sayfa ve iletişim bağlantılı', async ({ page }) => {
  for (const [path, title] of [['/uz/yoq-sahifa', 'Sahifa topilmadi'], ['/ru/net-stranicy', 'Страница не найдена'], ['/en/no-page/here', 'Page not found']]) {
    const res = await page.goto(path);
    expect(res?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    await expect(page.locator('main a')).toHaveCount(2);
  }
});

test('staging: robots noindex, sitemap ve robots.txt', async ({ page, request }) => {
  await page.goto('/uz');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /');
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('/uz/dasturlar/a-level');
  expect(sitemap).toContain('hreflang="ru"');
});

test('yapılandırılmış veri: Organization + WebSite her sayfada, FAQPage yalnızca SSS’te', async ({ page }) => {
  const types = async () =>
    page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent!)['@type']));
  await page.goto('/uz');
  expect(await types()).toEqual(expect.arrayContaining(['EducationalOrganization', 'WebSite']));
  expect(await types()).not.toContain('FAQPage');
  await page.goto('/uz/savollar');
  expect(await types()).toEqual(expect.arrayContaining(['FAQPage', 'BreadcrumbList']));
});

test('güvenlik başlıkları', async ({ request }) => {
  const h = (await request.get('/uz')).headers();
  expect(h['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(h['strict-transport-security']).toContain('max-age=');
  expect(h['x-content-type-options']).toBe('nosniff');
  expect(h['referrer-policy']).toBe('strict-origin-when-cross-origin');
});
