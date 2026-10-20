'use client';

import Script from 'next/script';
import { usePathname } from '@/i18n/navigation';

const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? 'https://plausible.io/js/script.outbound-links.tagged-events.js';

/**
 * Çerezsiz analitik (Plausible). Kişisel veri ve çerez yok.
 * Prompt §9: formda üçüncü taraf betik bulunmaz → iletişim sayfalarında yüklenmez;
 * form dönüşümü sunucudan bildirilir (src/lib/analytics.ts).
 */
export function Analytics() {
  const pathname = usePathname();
  if (!domain || pathname.startsWith('/contact')) return null;
  return <Script defer data-domain={domain} src={src} strategy="afterInteractive" />;
}
