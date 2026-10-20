import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

// Prompt §10 form senaryoları: başarılı, eksik alan, geçersiz Telegram, onaysız, sunucu hatası (+ JS kapalı).
const leadsFile = '.data/leads.ndjson';
const leadCount = () => {
  try {
    return readFileSync(leadsFile, 'utf8').trim().split('\n').filter(Boolean).length;
  } catch {
    return 0;
  }
};

async function fillValid(page: Page, { minor = true } = {}) {
  await page.getByLabel('Oʻquvchining ismi').fill('Test Oʻquvchi');
  await page.getByLabel('Sinfi').selectOption('10');
  await page.getByLabel(minor ? 'Yoʻq, 18 yoshdan kichik' : 'Ha, 18 yosh yoki katta').check();
  await page.getByLabel('A-Level', { exact: true }).check();
  await page.getByLabel('Buyuk Britaniya').check();
  await page.getByLabel('Ota-ona (vasiy)').check();
  if (minor) {
    await page.getByLabel('Ota-onaning ismi').fill('Test Ota-ona');
    await page.getByLabel('Ota-onaning telefon raqami').fill('+998 90 123 45 67');
  }
  await page.getByLabel('Telegram yoki telefon').fill('@amanah_test');
  await page.locator('#consent').check();
  if (minor) await page.locator('#parentConsent').check();
}

test.beforeEach(async ({ page }) => {
  await page.goto('/uz/aloqa');
  await page.waitForTimeout(2700); // bot zaman kontrolü (2,5 sn) — gerçek kullanıcı süresi
});

test('başarılı gönderim → teşekkür sayfası ve kayıt', async ({ page }) => {
  const before = leadCount();
  await fillValid(page);
  await page.getByRole('button', { name: 'Arizani yuborish' }).click();
  await expect(page).toHaveURL(/\/uz\/aloqa\/rahmat$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Arizangiz qabul qilindi');
  expect(leadCount()).toBe(before + 1);
});

test('eksik alanlar → hata özeti, odak ve aria-invalid', async ({ page }) => {
  await page.getByRole('button', { name: 'Arizani yuborish' }).click();
  const summary = page.locator('form [role=alert]');
  await expect(summary).toContainText('Formada');
  await expect(summary).toContainText('Oʻquvchining ismini yozing.');
  await expect(page.getByLabel('Oʻquvchining ismi')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('[tabindex="-1"][aria-live="assertive"]')).toBeFocused();
});

test('geçersiz Telegram adı → açık hata mesajı, girilen değerler korunur', async ({ page }) => {
  await fillValid(page);
  await page.getByLabel('Telegram yoki telefon').fill('amanah');
  await page.getByRole('button', { name: 'Arizani yuborish' }).click();
  await expect(page.locator('#contact-error')).toHaveText('Telegram foydalanuvchi nomini @ bilan yozing yoki telefon raqamini kiriting.');
  await expect(page.getByLabel('Oʻquvchining ismi')).toHaveValue('Test Oʻquvchi');
});

test('onay kutusu işaretlenmeden gönderilmez', async ({ page }) => {
  const before = leadCount();
  await fillValid(page);
  await page.locator('#consent').uncheck();
  await page.getByRole('button', { name: 'Arizani yuborish' }).click();
  await expect(page.locator('#consent-error')).toBeVisible();
  expect(leadCount()).toBe(before);
});

test('18 yaş altı: veli bilgisi ve veli onayı zorunlu', async ({ page }) => {
  await fillValid(page);
  await page.getByLabel('Ota-onaning ismi').fill('');
  await page.locator('#parentConsent').uncheck();
  await page.getByRole('button', { name: 'Arizani yuborish' }).click();
  await expect(page.locator('#parentName-error')).toBeVisible();
  await expect(page.locator('#parentConsent-error')).toBeVisible();
});

test('18 yaş ve üstü seçilince veli alanları gizlenir', async ({ page }) => {
  await page.getByLabel('Ha, 18 yosh yoki katta').check();
  await expect(page.getByLabel('Ota-onaning ismi')).toBeHidden();
  await page.getByLabel('Yoʻq, 18 yoshdan kichik').check();
  await expect(page.getByLabel('Ota-onaning ismi')).toBeVisible();
});

test('sunucu hatası → açık mesaj, veriler korunur', async ({ page }) => {
  await page.goto('http://localhost:3124/uz/aloqa');
  await page.waitForTimeout(2700);
  await fillValid(page);
  await page.getByRole('button', { name: 'Arizani yuborish' }).click();
  await expect(page.locator('form [role=alert]')).toContainText('serverda xatolik');
  await expect(page.getByLabel('Telegram yoki telefon')).toHaveValue('@amanah_test');
});

test.describe('JavaScript kapalı (Telegram içi tarayıcı yedeği)', () => {
  test.use({ javaScriptEnabled: false });
  test('form JS olmadan gönderilir', async ({ page }) => {
    const before = leadCount();
    await fillValid(page, { minor: false });
    await page.getByRole('button', { name: 'Arizani yuborish' }).click();
    await expect(page).toHaveURL(/\/uz\/aloqa\/rahmat$/);
    expect(leadCount()).toBe(before + 1);
  });
});

test('honeypot dolu → kayıt yapılmaz', async ({ page }) => {
  const before = leadCount();
  await fillValid(page);
  await page.locator('#website').fill('spam', { force: true });
  await page.getByRole('button', { name: 'Arizani yuborish' }).click();
  await expect(page).toHaveURL(/rahmat$/);
  expect(leadCount()).toBe(before);
});
