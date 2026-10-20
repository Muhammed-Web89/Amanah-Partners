import { defineConfig, devices } from '@playwright/test';

// QA (prompt §10). Önce: npm run build. Sunucular: 3123 normal, 3124 "sunucu hatası" senaryosu için.
// Test matrisi: Chrome masaüstü, Android Chrome (Pixel 7), iOS Safari motoru (WebKit, iPhone 13).
// Her proje ayrı bir IP başlığıyla gelir; böylece başvuru hız sınırı (10 dk'da 5) projeler arasında paylaşılmaz.
const ip = (n: number) => ({ 'x-forwarded-for': `10.0.0.${n}` });
const crossBrowser = /(form|layout|i18n)\.spec\.ts/;

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['json', { outputFile: 'test-results/results.json' }]],
  use: { baseURL: 'http://localhost:3123' },
  projects: [
    { name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome', extraHTTPHeaders: ip(1) } },
    { name: 'android-chrome', testMatch: crossBrowser, use: { ...devices['Pixel 7'], channel: 'chrome', extraHTTPHeaders: ip(2) } },
    { name: 'ios-webkit', testMatch: crossBrowser, use: { ...devices['iPhone 13'], extraHTTPHeaders: ip(3) } },
    // Firefox: bu makinede (macOS / Darwin 27) Playwright Firefox başlatılamadı ("Could not find profile folder").
    // Gerçek Firefox'ta elle kontrol edilmeli; ortam uygunsa aşağıdaki satır açılır. Ayrıntı: docs/07-qa-raporu.md
    // { name: 'firefox', testMatch: /(form|layout|i18n|keyboard)\.spec\.ts/, use: { ...devices['Desktop Firefox'], extraHTTPHeaders: ip(4) } },
  ],
  webServer: [
    { command: 'npx next start -p 3123', port: 3123, reuseExistingServer: false, timeout: 60_000 },
    { command: 'npx next start -p 3124', port: 3124, reuseExistingServer: false, timeout: 60_000, env: { QA_FORCE_LEAD_ERROR: '1' } },
  ],
});
