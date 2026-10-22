import type { ReactNode } from 'react';
import { HeroBackdrop } from '@/components/hero/HeroBackdrop';

// 404 / 500 ortak görünümü: ne olduğunu söyler, ana sayfa ve iletişim bağlantısı verir.
// docs/11: hareketli zemin üzerinde belirgin cam panel; kod degrade rakamla.
export function ErrorView({ code, title, body, actions }: { code: string; title: string; body: string; actions: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden py-section">
      <HeroBackdrop fade="bottom" travel icons={false} />
      <div className="container-page">
        <div className="glass-strong max-w-[44rem] rounded-lg px-6 py-10 sm:px-12 sm:py-12">
          <p
            aria-hidden="true"
            className="bg-linear-to-br from-(--ink-grad-from) to-(--ink-grad-to) bg-clip-text font-serif text-6xl leading-none font-bold text-transparent"
          >
            {code}
          </p>
          <h1 className="mt-6 text-[clamp(2rem,1.4rem+2.4vw,3rem)] leading-tight font-bold">{title}</h1>
          <p className="mt-4 max-w-measure text-lg text-ink-2">{body}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>
        </div>
      </div>
    </section>
  );
}
