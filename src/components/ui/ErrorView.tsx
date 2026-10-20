import type { ReactNode } from 'react';

// 404 / 500 ortak görünümü: ne olduğunu söyler, ana sayfa ve iletişim bağlantısı verir.
export function ErrorView({ code, title, body, actions }: { code: string; title: string; body: string; actions: ReactNode }) {
  return (
    <section className="container-page py-section">
      <p className="label-caps border-t border-ink pt-3 text-ink-2">{code}</p>
      <h1 className="mt-5 text-3xl">{title}</h1>
      <p className="mt-4 max-w-measure text-lg text-ink-2">{body}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>
    </section>
  );
}
