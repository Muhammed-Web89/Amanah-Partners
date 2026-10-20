import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { fmt } from '@/lib/typo';

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: ReactNode;
  tone?: 'paper' | 'file';
  className?: string;
  children?: ReactNode;
};

// Dikey ritim: her bölüm aynı üst/alt boşluk (section token). Metin sola hizalı, en fazla 65 karakter.
export function Section({ id, eyebrow, title, intro, tone = 'paper', className, children }: Props) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn('py-section', tone === 'file' && 'border-y border-rule bg-paper-2', className)}
    >
      <div className="container-page">
        {(eyebrow || title || intro) && (
          <header className="mb-8 max-w-measure md:mb-10">
            {eyebrow && <p className="label-caps mb-3 text-accent">{eyebrow}</p>}
            {title && (
              <h2 id={headingId} className="text-2xl">
                {fmt(title)}
              </h2>
            )}
            {intro && <div className="mt-4 text-lg text-ink-2">{fmt(intro)}</div>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
