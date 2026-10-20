import { Send } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { buttonClass } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { NavLink } from './NavLink';
import { ProgramsMenu } from './ProgramsMenu';
import { TelegramLink } from './TelegramLink';
import { ThemeToggle } from './ThemeToggle';
import { consultationHref, mainNav } from './nav';

const navItemClass =
  'relative flex h-nav-h items-center gap-1 px-3 text-[0.9375rem] font-medium whitespace-nowrap text-ink-2 no-underline transition-colors duration-fast hover:text-ink aria-[current=page]:text-ink data-active:text-ink aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3 aria-[current=page]:after:-bottom-px aria-[current=page]:after:h-0.5 aria-[current=page]:after:bg-accent-light data-active:after:absolute data-active:after:inset-x-3 data-active:after:-bottom-px data-active:after:h-0.5 data-active:after:bg-accent-light';

// Masaüstünde iki katlı: üstte logo ve eylemler, altta 7 bağlantı. Mobilde tek satır + hamburger.
export async function Header() {
  const t = await getTranslations('nav');
  const common = await getTranslations('common');

  return (
    <header className="glass-bar sticky top-0 z-40 border-b border-[var(--glass-edge)]">
      <a
        href="#main"
        className="sr-only rounded-sm bg-action px-4 py-2 text-action-text focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
      >
        {common('skipToContent')}
      </a>

      <div className="container-page flex h-header-h items-center gap-3">
        <Link href="/" className="-my-1 rounded-sm py-1 no-underline">
          <Logo />
        </Link>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <LanguageSwitcher className="hidden md:block" />
          <TelegramLink className={buttonClass('icon', 'max-md:hidden')}>
            <Send aria-hidden="true" className="size-5" />
            <span className="sr-only">{common('telegramWrite')}</span>
          </TelegramLink>
          <ThemeToggle />
          <Link href={consultationHref} className={buttonClass('primary', 'ml-1 min-h-11 py-2.5 max-md:hidden')}>
            {common('consultationShort')}
          </Link>
          <MobileMenu />
        </div>
      </div>

      <nav aria-label={t('primary')} className="hidden border-t border-[var(--glass-edge)] lg:block">
        <ul className="container-page flex items-center">
          <li className="-ml-3">
            <ProgramsMenu itemClass={navItemClass + ' list-none'} />
          </li>
          {mainNav.slice(1).map((item) => (
            <li key={item.href}>
              <NavLink href={item.href} className={navItemClass}>
                {t(item.key)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
