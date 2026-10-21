'use client';

import { GraduationCap, Pause, Play } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { HeroBackdrop } from '@/components/hero/HeroBackdrop';
import { cn } from '@/lib/cn';

// tasarım09 §11: üniversite listesi → sağdan sola sonsuz kayan buzlu cam kapsüller.
// Fare üstündeyken ya da klavye odağı içerideyken durur; WCAG 2.2.2 için ayrıca Durdur/Oynat düğmesi.
// "Hareketi azalt" açıksa kayma yok, kapsüller satırlara sarılır. İkinci kopya yalnızca görsel (aria-hidden).
type Props = {
  eyebrow: string;
  title: string;
  list: string[];
  note: string;
  pauseLabel: string;
  playLabel: string;
  notice?: ReactNode; // staging teyit notu
};

function Pill({ name }: { name: string }) {
  const [uni, country] = name.split(' · ');
  return (
    <span className="glass inline-flex shrink-0 items-center gap-2.5 rounded-full px-5 py-3 whitespace-nowrap transition-[box-shadow,border-color] duration-base hover:border-[var(--rm-neon)] hover:shadow-[0_0_0_1px_var(--rm-neon),0_0_24px_-4px_var(--rm-neon-glow),var(--glass-shadow)]">
      <GraduationCap aria-hidden="true" strokeWidth={1.5} className="size-5 text-[var(--rm-neon)]" />
      <span className="font-semibold text-ink">{uni}</span>
      {country && <span className="text-sm text-ink-2">{country}</span>}
    </span>
  );
}

export function UniversityMarquee({ eyebrow, title, list, note, pauseLabel, playLabel, notice }: Props) {
  const [paused, setPaused] = useState(false);

  return (
    <section id="universities" aria-labelledby="universities-title" className="relative isolate overflow-hidden py-section">
      <HeroBackdrop fade="both" icons={false} />
      <div className="container-page">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <p className="label-caps text-accent [text-shadow:0_0_16px_var(--glass-border)]">{eyebrow}</p>
          <h2
            id="universities-title"
            className="mt-3 text-[clamp(1.875rem,1.3rem+2.2vw,3rem)] leading-tight font-bold [text-shadow:0_0_32px_var(--glass-border)]"
          >
            {title}
          </h2>
        </header>
        {notice}
      </div>

      <div
        className="group/marquee relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] motion-reduce:[mask-image:none]"
      >
        <div
          className={cn(
            'flex w-max gap-4 animate-marquee group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]',
            'motion-reduce:container-page motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:animate-none',
            paused && '[animation-play-state:paused]',
          )}
        >
          <ul className="flex shrink-0 gap-4 motion-reduce:flex-wrap motion-reduce:justify-center">
            {list.map((u) => (
              <li key={u}>
                <Pill name={u} />
              </li>
            ))}
          </ul>
          <ul aria-hidden="true" className="flex shrink-0 gap-4 motion-reduce:hidden">
            {list.map((u) => (
              <li key={u}>
                <Pill name={u} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page mt-6 flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="glass inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium text-ink motion-reduce:hidden"
        >
          {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
          {paused ? playLabel : pauseLabel}
        </button>
        <p className="max-w-3xl text-center text-sm text-ink-2">{note}</p>
      </div>
    </section>
  );
}
