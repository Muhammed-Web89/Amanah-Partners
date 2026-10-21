import { ArrowRight, MessageCircle, PackageOpen } from 'lucide-react';
import { consultationHref } from '@/components/layout/nav';
import { Link } from '@/i18n/navigation';
import { fmt } from '@/lib/typo';

// tasarım09 §12: fiyat + ana dönüşüm alanı. Ortalanmış, büyük cam panel; yalnızca bu panelin arkasında
// çok yavaş dönen pastel/neon ışık kümesi. Yüksek kontrastlı, hover'da parlayan ve büyüyen birincil düğme.
// Zemin üstte önceki cam bölümlerin paper-2'siyle birleşir, altta SSS'nin paper zeminine erir (dikiş yok).
type Props = { eyebrow: string; title: string; body: string; button: string; link: string };

export function PriceCta({ eyebrow, title, body, button, link }: Props) {
  return (
    <section id="price" aria-labelledby="price-title" className="relative isolate overflow-x-clip bg-linear-to-b from-paper-2 from-60% to-paper py-section">
      <div className="container-page">
        <div className="relative isolate mx-auto max-w-4xl">
          {/* Dönen ışık kümesi (dekoratif) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 grid place-items-center">
            <div
              className="animate-spin-slow size-[115%] rounded-full opacity-80 blur-3xl"
              style={{
                background:
                  'conic-gradient(from 0deg, var(--pastel-1), var(--rm-neon-glow), var(--pastel-2), var(--pastel-3), var(--pastel-4), var(--pastel-1))',
              }}
            />
          </div>

          <div className="glass-strong rounded-lg px-6 py-12 text-center sm:px-12 sm:py-16">
            <p className="label-caps text-accent">{eyebrow}</p>
            <h2 id="price-title" className="mt-3 text-[clamp(2rem,1.3rem+2.8vw,3.5rem)] leading-tight font-bold">
              {fmt(title)}
            </h2>
            <p className="mx-auto mt-6 max-w-[60ch] text-lg leading-relaxed text-ink-2">{fmt(body)}</p>

            <div className="mt-10 flex flex-col items-center gap-5">
              <Link
                href={consultationHref}
                className="group inline-flex min-h-14 items-center gap-3 rounded-full bg-action px-8 py-4 text-lg font-semibold text-action-text no-underline shadow-[0_10px_30px_-10px_var(--rm-neon-glow)] transition-[transform,box-shadow,background-color] duration-base ease-out hover:scale-[1.04] hover:bg-action-hover hover:text-action-text hover:shadow-[0_0_0_3px_var(--glass-border),0_0_36px_-2px_var(--rm-neon-glow)] active:scale-100"
              >
                <MessageCircle aria-hidden="true" className="size-5" />
                {button}
                <ArrowRight aria-hidden="true" className="size-5 transition-transform duration-base group-hover:translate-x-1" />
              </Link>

              <Link
                href="/fees"
                className="group inline-flex min-h-11 items-center gap-2.5 rounded-full px-4 py-2 font-semibold text-link no-underline transition-colors duration-base hover:bg-[var(--glass-bg)] hover:text-ink"
              >
                <PackageOpen aria-hidden="true" className="size-5 text-[var(--rm-neon)]" />
                <span className="underline decoration-1 underline-offset-[0.2em] group-hover:decoration-2">{link}</span>
                <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-base group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
