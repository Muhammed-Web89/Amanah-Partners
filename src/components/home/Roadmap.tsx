'use client';

import { ClipboardCheck, Compass, FileCheck2, MessagesSquare, MonitorPlay, PlaneTakeoff, type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { HeroBackdrop } from '@/components/hero/HeroBackdrop';
import { cn } from '@/lib/cn';

// tasarım07: "Birinchi suhbatdan kampusgacha olti qadam" — dikey, hafif kıvrımlı (S) yol haritası.
// Kaydırdıkça bağlantı çizgisi yukarıdan aşağı neon gibi dolar, kartlar sırayla soldan/sağdan süzülür.
// Geniş ekran: kartlar çizginin iki yanında dönüşümlü. Mobil: çizgi solda, kartlar sağda.
// JS yoksa ya da "hareketi azalt" açıksa: tüm kartlar görünür, çizgi dolu.
const icons: LucideIcon[] = [MessagesSquare, ClipboardCheck, Compass, MonitorPlay, FileCheck2, PlaneTakeoff];

type Step = { title: string; body?: string };
type Props = { eyebrow: string; title: string; steps: Step[]; children?: ReactNode };

// Satırlar eşit yükseklikte (auto-rows-fr, aralık yok): düğüm i'nin merkezi = (i + 0.5) · h / n.
// Yol gerçek piksel ölçüsünde çizilir (ölçekleme yok): kalınlık sabit kalır, pathLength=1 ile dolgu doğru çalışır.
// Düğümler arasında dönüşümlü sola/sağa kıvrılır (S).
function windingPath(n: number, w: number, h: number) {
  const cx = w / 2;
  const swing = w * 0.42;
  const row = h / n;
  let d = `M${cx} 0 L${cx} ${row / 2}`;
  for (let i = 0; i < n - 1; i++) {
    const y1 = i * row + row / 2;
    const y2 = y1 + row;
    const x = i % 2 === 0 ? cx + swing : cx - swing;
    d += ` C ${x} ${y1 + row * 0.3}, ${x} ${y2 - row * 0.3}, ${cx} ${y2}`;
  }
  return `${d} L${cx} ${h}`;
}

export function Roadmap({ eyebrow, title, steps, children }: Props) {
  const listRef = useRef<HTMLOListElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const progressRef = useRef<SVGPathElement>(null);
  const [size, setSize] = useState({ w: 48, h: steps.length * 200 }); // ilk çizim; ölçünce güncellenir
  const [armed, setArmed] = useState(false); // gizleme yalnızca JS çalışınca ve hareket açıksa
  const [shown, setShown] = useState<boolean[]>(() => steps.map(() => true));
  const [reached, setReached] = useState(steps.length);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(svg);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const list = listRef.current;
    const path = progressRef.current;
    if (!list || !path || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const items = Array.from(list.querySelectorAll<HTMLElement>('[data-step]'));
    const below = items.map((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
    setShown(below.map((b) => !b));
    setArmed(true);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = Number((e.target as HTMLElement).dataset.step);
          setShown((prev) => (prev[i] ? prev : prev.map((v, j) => (j === i ? true : v))));
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    items.forEach((el, i) => below[i] && io.observe(el));

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = list.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - rect.top) / rect.height));
        path.style.strokeDashoffset = String(1 - p);
        setReached(Math.floor(p * steps.length + 0.5));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [steps.length]);

  const d = windingPath(steps.length, size.w, size.h);

  return (
    <section id="steps" aria-labelledby="steps-title" className="relative isolate overflow-hidden py-section">
      <HeroBackdrop fade="both" icons={false} />

      <div className="container-page">
        <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p className="label-caps text-accent [text-shadow:0_0_16px_var(--glass-border)]">{eyebrow}</p>
          <h2
            id="steps-title"
            className="mt-3 text-[clamp(1.875rem,1.3rem+2.2vw,3rem)] leading-tight font-bold [text-shadow:0_0_32px_var(--glass-border)]"
          >
            {title}
          </h2>
        </header>

        <ol ref={listRef} className="relative grid auto-rows-fr">
          {/* Bağlantı çizgisi: soluk taban + neon dolgu (pathLength=1 → dashoffset = 1 − ilerleme) */}
          <svg
            ref={svgRef}
            aria-hidden="true"
            viewBox={`0 0 ${size.w} ${size.h}`}
            preserveAspectRatio="none"
            className="pointer-events-none absolute top-0 left-0 h-full w-12 md:left-1/2 md:w-40 md:-translate-x-1/2"
          >
            <path d={d} fill="none" stroke="var(--rm-line)" strokeWidth="3" />
            <path
              ref={progressRef}
              d={d}
              fill="none"
              stroke="var(--rm-neon)"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={armed ? 1 : 0}
              style={{ filter: 'drop-shadow(0 0 6px var(--rm-neon-glow))' }}
            />
          </svg>

          {steps.map((step, i) => {
            const Icon = icons[i % icons.length];
            const right = i % 2 === 1;
            const lit = i < reached;
            const hidden = armed && !shown[i];
            return (
              <li
                key={step.title}
                data-step={i}
                className="relative grid grid-cols-[3rem_minmax(0,1fr)] items-center py-4 md:grid-cols-[minmax(0,1fr)_10rem_minmax(0,1fr)] md:py-5"
              >
                {/* Düğüm: çizgi buraya ulaşınca neon yanar */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'relative z-10 col-start-1 row-start-1 size-4 justify-self-center rounded-full border-2 transition-all duration-500 md:col-start-2',
                    lit
                      ? 'scale-110 border-[var(--rm-neon)] bg-[var(--rm-neon)] shadow-[0_0_0_6px_var(--rm-neon-glow),0_0_18px_var(--rm-neon-glow)]'
                      : 'border-[var(--rm-line)] bg-paper',
                  )}
                />

                <article
                  className={cn(
                    'glass-roadmap col-start-2 row-start-1 rounded-lg p-6 transition-[opacity,transform] duration-700 ease-out sm:p-7',
                    right ? 'md:col-start-3' : 'md:col-start-1',
                    hidden ? cn('translate-y-8 opacity-0', right ? 'md:translate-x-10' : 'md:-translate-x-10') : 'translate-x-0 translate-y-0 opacity-100',
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="tabular bg-gradient-to-br from-[var(--ink-grad-from)] to-[var(--ink-grad-to)] bg-clip-text font-serif text-5xl leading-none font-bold text-transparent"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      aria-hidden="true"
                      className="grid size-11 place-items-center rounded-lg border border-[var(--glass-border)] shadow-[inset_0_1px_0_var(--glass-highlight),0_6px_16px_-8px_var(--rm-neon-glow)]"
                      style={{ background: 'linear-gradient(140deg, var(--tile-from), var(--tile-to))' }}
                    >
                      <Icon strokeWidth={1.5} className="size-5 text-[var(--rm-neon)] drop-shadow-[0_0_6px_var(--rm-neon-glow)]" />
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg leading-snug font-semibold sm:text-xl">
                    <span className="sr-only">{i + 1}. </span>
                    {step.title}
                  </h3>
                  {step.body && <p className="mt-2 text-ink-2">{step.body}</p>}
                </article>
              </li>
            );
          })}
        </ol>

        {children && <div className="mt-10 flex justify-center">{children}</div>}
      </div>
    </section>
  );
}
