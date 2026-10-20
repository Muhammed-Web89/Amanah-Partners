'use client';

import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { NavLink } from './NavLink';
import { programNav } from './nav';

// <details> tabanlı açılır menü: JavaScript olmadan da açılır.
// JavaScript varsa: dışarı tıklayınca, Escape'e basınca ve sayfa değişince kapanır.
export function ProgramsMenu({ itemClass }: { itemClass: string }) {
  const t = useTranslations('nav');
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const active = pathname.startsWith('/programs');

  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  useEffect(() => {
    function onPointer(event: PointerEvent) {
      if (ref.current?.open && !ref.current.contains(event.target as Node)) ref.current.open = false;
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && ref.current?.open) {
        ref.current.open = false;
        ref.current.querySelector('summary')?.focus();
      }
    }
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const groups = [
    { key: 'mainPrograms', items: programNav.filter((p) => p.group === 'main') },
    { key: 'supportPrograms', items: programNav.filter((p) => p.group === 'support') },
  ] as const;

  return (
    <details ref={ref} className="group relative">
      <summary className={itemClass} data-active={active || undefined}>
        {t('programs')}
        <ChevronDown aria-hidden="true" className="size-4 transition-transform duration-base group-open:rotate-180" />
      </summary>
      <div className="absolute top-full left-0 z-50 mt-px w-[34rem] rounded-md border border-rule bg-paper p-5 shadow-raised">
        <div className="grid grid-cols-2 gap-6">
          {groups.map((group) => (
            <div key={group.key}>
              <p className="label-caps mb-2 text-accent">{t(group.key)}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      href={item.href}
                      className="block rounded-sm px-2 py-2 text-ink hover:bg-paper-2 aria-[current=page]:font-semibold -mx-2"
                    >
                      {t(`program.${item.key}`)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t border-rule pt-3">
          <NavLink href="/programs" className="font-semibold text-link">
            {t('allPrograms')}
          </NavLink>
        </div>
      </div>
    </details>
  );
}
