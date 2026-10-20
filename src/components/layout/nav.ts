import { verified, isStaging } from '@/config/site';
import type { StaticPathname } from '@/i18n/routing';

// Plan v2 §4.1: logo + 7 bağlantı. "Dasturlar" açılır menüdür.
export const mainNav = [
  { href: '/programs', key: 'programs' },
  { href: '/how-we-work', key: 'howWeWork' },
  { href: '/destinations', key: 'destinations' },
  { href: '/fees', key: 'fees' },
  { href: '/guides', key: 'guides' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
] as const satisfies ReadonlyArray<{ href: StaticPathname; key: string }>;

const allProgramNav = [
  { href: '/programs/a-level', key: 'aLevel', group: 'main' },
  { href: '/programs/igcse-a-level', key: 'igcse', group: 'main' },
  { href: '/programs/sat', key: 'sat', group: 'support' },
  { href: '/programs/ielts-toefl', key: 'ielts', group: 'support' },
  { href: '/programs/medicine-ucat-imat', key: 'medicine', group: 'support' },
  { href: '/programs/ap-ib', key: 'apIb', group: 'support' },
  { href: '/programs/portfolio', key: 'portfolio', group: 'support' },
  { href: '/programs/btec', key: 'btec', group: 'support' },
] as const satisfies ReadonlyArray<{ href: StaticPathname; key: string; group: 'main' | 'support' }>;

// BTEC [TEYİT 6]: canlıda menüde de görünmez.
export const programNav = allProgramNav.filter((p) => p.key !== 'btec' || verified.btec || isStaging);

// Tüm "Bepul konsultatsiya" düğmeleri iletişim sayfasındaki forma gider.
export const consultationHref = { pathname: '/contact', hash: 'form' } as const;
