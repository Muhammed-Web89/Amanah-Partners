import { getTranslations } from 'next-intl/server';
import { CircleCheck, Send } from 'lucide-react';
import { HeroBackdrop } from '@/components/hero/HeroBackdrop';
import { TelegramLink } from '@/components/layout/TelegramLink';
import { buttonClass } from '@/components/ui/button';
import { Notice } from '@/components/ui/Notice';
import { site } from '@/config/site';
import { Link } from '@/i18n/navigation';
import { resolveLocale } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps<'/[locale]/contact/thank-you'>) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: 'form' });
  return {
    ...pageMetadata({ locale, href: '/contact/thank-you', title: t('thanksTitle'), description: t('thanksBody') }),
    robots: { index: false },
  };
}

export default async function ThankYouPage({ params }: PageProps<'/[locale]/contact/thank-you'>) {
  await resolveLocale(params);
  const t = await getTranslations('form');
  const common = await getTranslations('common');
  const steps = t.raw('thanksSteps') as string[];

  return (
    // docs/11: ortalanmış belirgin cam panel; adımlar parlayan numaralı satırlar
    <section className="relative isolate overflow-hidden py-section">
      <HeroBackdrop fade="bottom" travel icons={false} />
      <div className="container-page">
        <div className="glass-strong mx-auto max-w-[44rem] rounded-lg px-6 py-10 sm:px-12 sm:py-12">
          <span
            aria-hidden="true"
            className="grid size-16 place-items-center rounded-[28%]"
            style={{
              background: 'linear-gradient(145deg, var(--tile-from), var(--tile-to))',
              boxShadow: 'inset 0 2px 0 var(--glass-highlight), 0 6px 0 -2px var(--tile-edge), 0 0 28px -6px var(--check-glow)',
            }}
          >
            <CircleCheck strokeWidth={1.75} className="size-8 text-(--check)" />
          </span>
          <h1 className="mt-6 text-[clamp(2rem,1.4rem+2.4vw,3rem)] leading-tight font-bold">{t('thanksTitle')}</h1>
          <p className="mt-4 text-lg text-ink-2">{t('thanksBody')}</p>
          {!site.responseTimeKnown && (
            <Notice tone="pending" title="Staging · KARAR 2" className="mt-6">
              Form yanıt süresi sözü ("1 iş günü içinde" gibi) henüz belirlenmedi.
            </Notice>
          )}
          <h2 className="mt-10 text-xl">{t('thanksNext')}</h2>
          <ol className="mt-4 grid gap-3">
            {steps.map((s, i) => (
              <li key={s} className="flex items-start gap-3.5 rounded-md border border-(--glass-border) bg-(--inner-card) p-3.5">
                <span
                  aria-hidden="true"
                  className="tabular glass grid size-8 shrink-0 place-items-center rounded-full font-serif font-bold text-accent"
                  style={{ borderColor: 'var(--ds-neon)', boxShadow: '0 0 14px -4px var(--ds-glow)' }}
                >
                  {i + 1}
                </span>
                <span className="pt-1">{s}</span>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-ink-2">{t('thanksTelegram')}</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <TelegramLink className={buttonClass('glow')} showUsername>
              <Send aria-hidden="true" className="size-4" />
              {common('telegramWrite')}
            </TelegramLink>
            <Link href="/" className={buttonClass('glass')}>
              {t('backHome')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
