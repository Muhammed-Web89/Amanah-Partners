import { getTranslations } from 'next-intl/server';
import { HeroBackdrop } from '@/components/hero/HeroBackdrop';
import { isStaging, shows, site } from '@/config/site';
import { Link } from '@/i18n/navigation';
import type { StaticPathname } from '@/i18n/routing';
import { Logo } from './Logo';
import { TelegramLink } from './TelegramLink';

// tasarım09 §14B: hover/odakta soldan sağa çizilen alt çizgi (background-size animasyonu; satır kırılsa da çalışır)
const linkClass =
  'text-sm text-ink-2 no-underline bg-[linear-gradient(var(--rm-neon),var(--rm-neon))] bg-no-repeat bg-[length:0%_1px] bg-[position:0_100%] pb-0.5 transition-[background-size,color] duration-base ease-out hover:bg-[length:100%_1px] hover:text-ink focus-visible:bg-[length:100%_1px]';
const headingClass = 'label-caps text-accent';

type FooterLink = { href: StaticPathname; label: string };

export async function Footer() {
  const t = await getTranslations('footer');
  const nav = await getTranslations('nav');
  const common = await getTranslations('common');

  // Plan v2 §4.3: dört sütun
  const columns: Array<{ title: string; links: FooterLink[] }> = [
    {
      title: t('services'),
      links: [
        { href: '/programs/a-level', label: nav('program.aLevel') },
        { href: '/programs/igcse-a-level', label: nav('program.igcse') },
        { href: '/programs', label: t('supportPrograms') },
        { href: '/how-we-work', label: t('applicationVisa') },
      ],
    },
    {
      title: t('company'),
      links: [
        { href: '/about', label: nav('about') },
        ...(shows('partnersPage') ? [{ href: '/partners', label: t('partners') } as FooterLink] : []),
        { href: '/official-accounts', label: t('officialAccounts') },
        { href: '/contact', label: nav('contact') },
      ],
    },
    {
      title: t('info'),
      links: [
        { href: '/guides', label: nav('guides') },
        { href: '/faq', label: t('faq') },
        { href: '/destinations', label: nav('destinations') },
        { href: '/fees', label: nav('fees') },
      ],
    },
  ];

  const legal: FooterLink[] = [
    { href: '/privacy', label: t('privacy') },
    { href: '/terms', label: t('terms') },
    { href: '/service-agreement', label: t('serviceAgreement') },
    { href: '/refunds', label: t('refunds') },
    { href: '/cookies', label: t('cookies') },
  ];

  return (
    // tasarım01 §1: buzlu cam alt bilgi; arkasında hareketsiz pastel zemin (cam efekti bir zemin olmadan görünmez)
    <footer className="relative isolate overflow-hidden pt-2 pb-6">
      <HeroBackdrop still fade="top" />
      <div className="container-page">
        <div className="glass rounded-lg">
          <div className="grid gap-10 px-6 py-10 sm:grid-cols-2 sm:px-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
            <div className="sm:col-span-2 lg:col-span-1">
              <Logo size="lg" />
              <p className="mt-3 font-serif text-accent">{common('slogan')}</p>
              <p className="mt-4 max-w-sm text-sm text-ink-2">{t('tagline')}</p>
              <p className="mt-3 max-w-sm text-sm text-ink">{t('noGuarantee')}</p>
            </div>

            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className={headingClass}>{column.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div>
              <h2 className={headingClass}>{t('contactTitle')}</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-ink-2">
                <li>
                  <TelegramLink className={linkClass} showUsername>
                    {t('telegramSupport')}
                  </TelegramLink>
                </li>
                <li>
                  <TelegramLink className={linkClass} channel>
                    {t('telegramChannel')}
                  </TelegramLink>
                </li>
                {site.email && (
                  <li>
                    <a href={`mailto:${site.email}`} className={linkClass}>
                      {site.email}
                    </a>
                  </li>
                )}
                {site.hours && <li>{site.hours}</li>}
                {isStaging && (!site.email || !site.hours) && (
                  <li lang="tr" className="text-xs text-accent">
                    Staging · [KARAR 3, 4] e-posta ve çalışma saatleri bekleniyor
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="border-t border-[var(--glass-edge)]">
            <div className="flex flex-col gap-4 px-6 py-6 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
              <nav aria-label={t('legal')}>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {legal.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <p className="text-xs text-ink-2">
                © {new Date().getFullYear()} {site.name}
                {/* Plan §4.3: unvan, vergi no. ve adres bilgi hazır olunca */}
                {site.company && ` · ${site.company.legalName} · ${site.company.taxId} · ${site.company.address}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
