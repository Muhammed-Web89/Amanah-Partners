'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { buttonClass } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { NavLink } from './NavLink';
import { mainNav, programNav } from './nav';

export function MobileMenu() {
  const t = useTranslations('nav');
  const common = useTranslations('common');
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  function closeOnLink(event: MouseEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  }

  const linkClass =
    'flex min-h-12 items-center border-b border-rule text-lg text-ink aria-[current=page]:font-semibold aria-[current=page]:text-accent';

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? common('menuClose') : common('menuOpen')}
        className={buttonClass('icon', 'lg:hidden')}
      >
        {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
      </button>

      {open && (
        <div
          id="mobile-menu"
          onClick={closeOnLink}
          className="fixed inset-x-0 top-header-h bottom-0 z-30 overflow-y-auto border-t border-rule bg-paper px-gutter pt-3 pb-28 lg:hidden"
        >
          {/* Plan §4.2: dil seçici en üstte */}
          <LanguageSwitcher variant="full" className="border-b border-rule pb-3" />
          <nav aria-label={t('primary')}>
            <ul>
              <li className="border-b border-rule pb-2">
                <NavLink href="/programs" className={linkClass + ' border-b-0'}>
                  {t('programs')}
                </NavLink>
                <ul className="grid grid-cols-2 gap-x-4 pb-2">
                  {programNav.map((p) => (
                    <li key={p.href}>
                      <NavLink
                        href={p.href}
                        className="flex min-h-11 items-center text-ink-2 aria-[current=page]:font-semibold aria-[current=page]:text-ink"
                      >
                        {t(`program.${p.key}`)}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              {mainNav.slice(1).map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href} className={linkClass}>
                    {t(item.key)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
