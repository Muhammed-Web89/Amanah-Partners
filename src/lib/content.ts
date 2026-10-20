import type { AppLocale } from '@/i18n/routing';
import type About from '../../content/uz/about.json';
import type Contact from '../../content/uz/contact.json';
import type Destinations from '../../content/uz/destinations.json';
import type Faq from '../../content/uz/faq.json';
import type Fees from '../../content/uz/fees.json';
import type Home from '../../content/uz/home.json';
import type HowWeWork from '../../content/uz/how-we-work.json';
import type Legal from '../../content/uz/legal.json';
import type Partners from '../../content/uz/partners.json';
import type Programs from '../../content/uz/programs.json';
import type Shared from '../../content/uz/shared.json';

// Özbekçe dosya şemanın kaynağıdır; ru ve en aynı yapıda olmak zorundadır (tsc kontrol eder: scripts/check-content.ts).
export type ContentMap = {
  home: typeof Home;
  programs: typeof Programs;
  'how-we-work': typeof HowWeWork;
  destinations: typeof Destinations;
  fees: typeof Fees;
  about: typeof About;
  partners: typeof Partners;
  contact: typeof Contact;
  faq: typeof Faq;
  legal: typeof Legal;
  shared: typeof Shared;
};

export type ContentKey = keyof ContentMap;

export async function getContent<K extends ContentKey>(locale: AppLocale, key: K): Promise<ContentMap[K]> {
  return (await import(`../../content/${locale}/${key}.json`)).default as ContentMap[K];
}

export type FaqLink = { label: string; href: string };
export function faqLink(item: object) {
  return (item as { link?: FaqLink }).link;
}
