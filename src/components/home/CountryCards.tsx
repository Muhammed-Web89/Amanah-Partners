import { ArrowUpRight } from 'lucide-react';
import type { ComponentType, CSSProperties, ReactNode, SVGProps } from 'react';
import { HeroBackdrop } from '@/components/hero/HeroBackdrop';
import { Link } from '@/i18n/navigation';
import type { StaticPathname } from '@/i18n/routing';
import { fmt } from '@/lib/typo';
import { BigBen, Brandenburg, Colosseum, Liberty, MapleLeaf, Windmill } from './CountryIcons';

// tasarım09 §10: "A-Level bilan qayerga?" — ince çizgili liste yerine 3×2 bağımsız cam kart (bağlantı).
// Hover: kart yükselir, arkasında ülkenin bayrak renklerinde yumuşak neon parlama, açıklama aydınlanır.
export const countries: Record<string, { Icon: ComponentType<SVGProps<SVGSVGElement>>; flag: string }> = {
  uk: { Icon: BigBen, flag: '#012169, #ffffff, #C8102E' },
  usa: { Icon: Liberty, flag: '#B22234, #ffffff, #3C3B6E' },
  germany: { Icon: Brandenburg, flag: '#000000, #DD0000, #FFCE00' },
  italy: { Icon: Colosseum, flag: '#009246, #ffffff, #CE2B37' },
  netherlands: { Icon: Windmill, flag: '#AE1C28, #ffffff, #21468B' },
  canada: { Icon: MapleLeaf, flag: '#D80621, #ffffff, #D80621' },
};

type Props = {
  eyebrow?: string;
  title?: string; // yoksa bölüm başlığı çizilmez (Davlatlar sayfasında H1 zaten var)
  items: { href: string; name: string; text: string }[];
  footnote: ReactNode;
};

export function CountryCards({ eyebrow, title, items, footnote }: Props) {
  return (
    <section
      id="countries"
      aria-labelledby={title ? 'countries-title' : undefined}
      className="relative isolate overflow-hidden py-section"
    >
      <HeroBackdrop fade="both" icons={false} />
      <div className="container-page">
        {title && (
          <header className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
            <p className="label-caps text-accent [text-shadow:0_0_16px_var(--glass-border)]">{eyebrow}</p>
            <h2
              id="countries-title"
              className="mt-3 text-[clamp(1.875rem,1.3rem+2.2vw,3rem)] leading-tight font-bold [text-shadow:0_0_32px_var(--glass-border)]"
            >
              {fmt(title)}
            </h2>
          </header>
        )}

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((c, i) => {
            const slug = c.href.split('/').pop() ?? '';
            const { Icon, flag } = countries[slug] ?? countries.uk;
            return (
              <li
                key={c.href}
                className="reveal group/card relative isolate"
                style={{ '--reveal-delay': `${(i % 3) * 90}ms` } as CSSProperties}
              >
                {/* Bayrak renklerinde parlama (yalnızca hover/odak) */}
                <span
                  aria-hidden="true"
                  className="absolute inset-3 -z-10 rounded-lg opacity-0 blur-2xl transition-opacity duration-base ease-out group-focus-within/card:opacity-55 group-hover/card:opacity-55"
                  style={{ background: `linear-gradient(120deg, ${flag})` }}
                />
                <Link
                  href={c.href as StaticPathname}
                  className="group glass flex h-full flex-col rounded-lg p-6 text-ink no-underline transition-[transform,box-shadow] duration-base ease-out hover:-translate-y-1.5 hover:text-ink focus-visible:-translate-y-1.5 sm:p-7"
                >
                  <span className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="grid size-12 shrink-0 place-items-center rounded-lg border border-[var(--glass-border)] shadow-[inset_0_1px_0_var(--glass-highlight)]"
                      style={{ background: 'linear-gradient(140deg, var(--tile-from), var(--tile-to))' }}
                    >
                      <Icon className="size-7 text-[var(--rm-neon)] drop-shadow-[0_0_6px_var(--rm-neon-glow)]" />
                    </span>
                    <span className="font-serif text-xl font-semibold sm:text-2xl">{c.name}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="ml-auto size-5 shrink-0 text-ink-2 transition-transform duration-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                    />
                  </span>
                  <span className="mt-4 text-ink-2 transition-colors duration-base group-hover:text-ink">{fmt(c.text)}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-center text-sm text-ink-2">{footnote}</p>
      </div>
    </section>
  );
}
