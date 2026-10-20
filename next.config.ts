import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const dev = process.env.NODE_ENV !== 'production';
const analyticsOrigin = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ? new URL(process.env.NEXT_PUBLIC_PLAUSIBLE_SRC).origin : 'https://plausible.io';

// İçerik güvenlik politikası (prompt §9).
// Sapma: script-src 'unsafe-inline' — Next.js statik sayfalarda satır içi hidrasyon betikleri üretir;
// nonce kullanmak her sayfayı dinamik yapar ve statik üretimi (performans hedefi) bozar. Ayrıntı: docs/06-teknik.md
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${analyticsOrigin}${dev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self' ${analyticsOrigin}${dev ? ' ws:' : ''}`,
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  // Yalnızca canlıda: WebKit, http://localhost testlerinde bu kuralla CSS/JS isteklerini https'e çevirip kırıyor.
  ...(process.env.NEXT_PUBLIC_SITE_ENV === 'production' ? ['upgrade-insecure-requests'] : []),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
