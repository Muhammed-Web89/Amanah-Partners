'use client';

import type { MouseEvent, ReactNode } from 'react';

type Item = { id?: string; question: string; answer: ReactNode };

const EASE = 'cubic-bezier(0.2, 0.7, 0.2, 1)';

// tasarım08: her soru ayrı bir buzlu cam panel. <details> korunur: JavaScript olmadan da açılır
// (Telegram içi tarayıcı), klavyeyle ve sayfa içi aramayla çalışır. JS yalnızca yüksekliği yumuşak
// açıp kapatır ve cevabı yukarıdan süzerek getirir.
function toggle(e: MouseEvent<HTMLElement>) {
  const details = e.currentTarget.parentElement as HTMLDetailsElement;
  const body = details.querySelector<HTMLElement>('[data-faq-body]');
  if (!body || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  e.preventDefault();

  const inner = body.firstElementChild as HTMLElement;
  body.getAnimations().forEach((a) => a.cancel());
  inner.getAnimations().forEach((a) => a.cancel());

  if (!details.open || details.dataset.closing !== undefined) {
    delete details.dataset.closing;
    details.open = true;
    const h = body.scrollHeight;
    body.animate({ height: ['0px', `${h}px`] }, { duration: 380, easing: EASE });
    inner.animate(
      { opacity: [0, 1], transform: ['translateY(-10px)', 'none'] },
      { duration: 420, delay: 60, easing: EASE, fill: 'backwards' },
    );
  } else {
    details.dataset.closing = '';
    const h = body.offsetHeight;
    inner.animate({ opacity: [1, 0], transform: ['none', 'translateY(-6px)'] }, { duration: 180, easing: 'ease-in', fill: 'forwards' });
    const a = body.animate({ height: [`${h}px`, '0px'] }, { duration: 300, easing: EASE, fill: 'forwards' });
    a.onfinish = () => {
      details.open = false;
      delete details.dataset.closing;
      a.cancel();
      inner.getAnimations().forEach((x) => x.cancel());
    };
  }
}

export function Accordion({ items }: { items: Item[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details key={item.question} id={item.id} className="glass-faq group scroll-mt-24 rounded-2xl">
          <summary
            onClick={toggle}
            className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-ink sm:px-6 [&::-webkit-details-marker]:hidden"
          >
            <span>{item.question}</span>
            <PlusMinus />
          </summary>
          <div data-faq-body className="overflow-hidden">
            <div className="max-w-measure px-5 pb-5 text-ink-2 sm:px-6 [&_a]:font-semibold">{item.answer}</div>
          </div>
        </details>
      ))}
    </div>
  );
}

// Dairesel artı/eksi: açılınca kendi ekseninde yarım tur döner, dikey çizgi kaybolur (+ → −).
// Hover'da halka hafifçe aşağı esner.
function PlusMinus() {
  return (
    <span
      aria-hidden="true"
      className="relative grid size-9 shrink-0 place-items-center rounded-full border border-[var(--faq-border-hover)] bg-paper/40 text-accent transition-[rotate,translate,background-color,color,box-shadow] duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] faq-open:rotate-180 faq-open:bg-accent faq-open:text-paper [@media(hover:hover)]:group-hover:translate-y-0.5 [@media(hover:hover)]:group-hover:shadow-[0_0_14px_-4px_var(--rm-neon-glow)] motion-reduce:transition-none"
    >
      <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
      <span className="absolute h-3.5 w-0.5 rounded-full bg-current transition-transform duration-300 ease-out faq-open:scale-y-0 motion-reduce:transition-none" />
    </span>
  );
}
