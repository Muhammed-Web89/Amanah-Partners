import type { ReactNode } from 'react';
import { HeroBackdrop } from '@/components/hero/HeroBackdrop';
import { cn } from '@/lib/cn';
import { fmt } from '@/lib/typo';

type Props = {
  id: string;
  eyebrow?: string;
  title?: string;
  intro?: ReactNode;
  align?: 'left' | 'center'; // metin ağırlıklı bölüm sola, kısa vitrin başlığı ortaya
  fade?: 'top' | 'bottom' | 'both';
  className?: string;
  children?: ReactNode;
};

// Global tasarım sistemi (docs/11): yeni sayfaların bölüm kabı. Altta yavaş süzülen pastel ışık zemini
// (HeroBackdrop), üstünde parlamalı başlık; içerik glass-card / glass-strong panellerle gelir.
// Art arda gelen GlassSection'lar fade sayesinde dikişsiz birleşir.
export function GlassSection({ id, eyebrow, title, intro, align = 'left', fade = 'both', className, children }: Props) {
  const headingId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn('relative isolate overflow-hidden py-section', className)}
    >
      <HeroBackdrop fade={fade} icons={false} />
      <div className="container-page">
        {(eyebrow || title || intro) && (
          <header className={cn('reveal mb-10 max-w-3xl md:mb-14', align === 'center' && 'mx-auto text-center')}>
            {eyebrow && <p className="label-caps text-accent [text-shadow:0_0_16px_var(--glass-border)]">{eyebrow}</p>}
            {title && (
              <h2
                id={headingId}
                className="mt-3 text-[clamp(1.875rem,1.3rem+2.2vw,3rem)] leading-tight font-bold [text-shadow:0_0_32px_var(--glass-border)]"
              >
                {fmt(title)}
              </h2>
            )}
            {intro && (
              <div className={cn('mt-4 text-lg text-ink-2', align === 'center' && 'mx-auto max-w-[60ch]')}>{fmt(intro)}</div>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
