import { defineRouting } from 'next-intl/routing';

// Plan v2 §3: Özbekçe sürüm Özbekçe adres; Rusça ve İngilizce ortak İngilizce adres kullanır.
// Koddaki anahtarlar (klasörler) İngilizcedir.
const uzOnly = <T extends string, U extends string>(uz: U, shared: T) => ({ uz, ru: shared, en: shared });

export const routing = defineRouting({
  locales: ['uz', 'ru', 'en'],
  defaultLocale: 'uz',
  localePrefix: 'always',
  localeDetection: true,
  pathnames: {
    '/': '/',

    '/programs': uzOnly('/dasturlar', '/programs'),
    '/programs/a-level': uzOnly('/dasturlar/a-level', '/programs/a-level'),
    '/programs/igcse-a-level': uzOnly('/dasturlar/igcse-va-a-level', '/programs/igcse-a-level'),
    '/programs/sat': uzOnly('/dasturlar/sat', '/programs/sat'),
    '/programs/ielts-toefl': uzOnly('/dasturlar/ielts-toefl', '/programs/ielts-toefl'),
    '/programs/medicine-ucat-imat': uzOnly('/dasturlar/tibbiyot-ucat-imat', '/programs/medicine-ucat-imat'),
    '/programs/ap-ib': uzOnly('/dasturlar/ap-ib', '/programs/ap-ib'),
    '/programs/portfolio': uzOnly('/dasturlar/portfolio', '/programs/portfolio'),
    '/programs/btec': uzOnly('/dasturlar/btec', '/programs/btec'),

    '/how-we-work': uzOnly('/qanday-ishlaymiz', '/how-we-work'),

    '/destinations': uzOnly('/davlatlar', '/destinations'),
    '/destinations/uk': uzOnly('/davlatlar/buyuk-britaniya', '/destinations/uk'),
    '/destinations/usa': uzOnly('/davlatlar/aqsh', '/destinations/usa'),
    '/destinations/germany': uzOnly('/davlatlar/germaniya', '/destinations/germany'),
    '/destinations/italy': uzOnly('/davlatlar/italiya', '/destinations/italy'),
    '/destinations/netherlands': uzOnly('/davlatlar/niderlandiya', '/destinations/netherlands'),
    '/destinations/canada': uzOnly('/davlatlar/kanada', '/destinations/canada'),

    '/fees': uzOnly('/narxlar', '/fees'),
    '/guides': uzOnly('/maqolalar', '/guides'),
    '/guides/[slug]': uzOnly('/maqolalar/[slug]', '/guides/[slug]'),
    '/about': uzOnly('/biz-haqimizda', '/about'),
    '/partners': uzOnly('/hamkorlar', '/partners'),
    '/contact': uzOnly('/aloqa', '/contact'),
    '/contact/thank-you': uzOnly('/aloqa/rahmat', '/contact/thank-you'),
    '/faq': uzOnly('/savollar', '/faq'),

    '/privacy': uzOnly('/maxfiylik-siyosati', '/privacy'),
    '/terms': uzOnly('/foydalanish-shartlari', '/terms'),
    '/service-agreement': uzOnly('/xizmat-shartnomasi', '/service-agreement'),
    '/refunds': uzOnly('/qaytarish-shartlari', '/refunds'),
    '/cookies': uzOnly('/cookie', '/cookies'),
    '/official-accounts': uzOnly('/rasmiy-sahifalar', '/official-accounts'),
  },
});

export type AppLocale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
export type StaticPathname = Exclude<AppPathname, `${string}[${string}`>;
