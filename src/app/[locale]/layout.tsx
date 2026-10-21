import type { Metadata, Viewport } from 'next';
import { Source_Sans_3, Source_Serif_4 } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Analytics } from '@/components/layout/Analytics';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { MobileBar } from '@/components/layout/MobileBar';
import { ThemeScript } from '@/components/layout/ThemeScript';
import { RevealObserver } from '@/components/ui/RevealObserver';
import { JsonLd } from '@/components/seo/JsonLd';
import { isStaging, shows, site, telegramUrl } from '@/config/site';
import { routing } from '@/i18n/routing';
import { resolveLocale } from '@/lib/page';
import '@/styles/globals.css';

// Tasarım yönü A (docs/02): başlık Source Serif 4, gövde Source Sans 3. ʻ ʼ glifleri doğrulandı.
// Yalnızca kullanılan ağırlıklar. CSS tüm alt kümeleri (Latin, Latin genişletilmiş, Kiril) unicode-range ile içerir;
// "subsets" yalnızca önceden yüklenecekleri belirler → Latin (Özbekçe ʻ ʼ dahil). Kiril yalnızca Rusça metinde iner.
// Başlık fontu "optional": yavaş ağda LCP fonta takılmaz; metrik uyumlu yedek font kullanılır (docs/06).
const serif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-serif',
  display: 'optional',
});
const sans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const htmlLang = { uz: 'uz-Latn', ru: 'ru', en: 'en' } as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    metadataBase: new URL(site.url),
    title: { default: t('title'), template: `%s · ${site.name}` },
    description: t('description'),
    applicationName: site.name,
    robots: isStaging ? { index: false, follow: false } : undefined,
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0e1726' },
  ],
};

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'meta' });
  // İstemciye yalnızca istemci bileşenlerinin kullandığı çeviriler gönderilir.
  const all = await getMessages();
  const clientMessages = Object.fromEntries(
    (['common', 'nav', 'form', 'guides', 'faq', 'errors'] as const).map((k) => [k, all[k]]),
  );
  // Teyit bekleyen BTEC [TEYİT 6] canlıda istemci verisinde de yer almaz.
  if (!shows('btec')) {
    const { btec: _btec, ...program } = all.nav.program;
    clientMessages.nav = { ...all.nav, program } as typeof all.nav;
  }

  const sameAs = [telegramUrl(site.telegram.channelUsername)].filter(Boolean);
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    slogan: 'Maqsadingiz sari birga',
    areaServed: ['UZ', 'KZ', 'KG', 'TJ', 'TM'],
    knowsLanguage: ['uz', 'ru', 'en'],
    ...(site.email ? { email: site.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: `${site.url}/${locale}`,
    inLanguage: htmlLang[locale],
    description: t('description'),
    publisher: { '@id': `${site.url}/#organization` },
  };

  return (
    // suppressHydrationWarning: ThemeScript React yüklenmeden <html>'e "dark" sınıfı ekleyebilir.
    <html lang={htmlLang[locale]} className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <NextIntlClientProvider messages={clientMessages}>
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
          <MobileBar />
          <Analytics />
          <RevealObserver />
        </NextIntlClientProvider>
        <JsonLd data={organization} />
        <JsonLd data={website} />
      </body>
    </html>
  );
}
