import { getTranslations } from 'next-intl/server';
import { CircleCheck, Send } from 'lucide-react';
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
  return { ...pageMetadata({ locale, href: '/contact/thank-you', title: t('thanksTitle'), description: t('thanksBody') }), robots: { index: false } };
}

export default async function ThankYouPage({ params }: PageProps<'/[locale]/contact/thank-you'>) {
  await resolveLocale(params);
  const t = await getTranslations('form');
  const common = await getTranslations('common');
  const steps = t.raw('thanksSteps') as string[];

  return (
    <section className="container-page py-section">
      <div className="max-w-measure">
        <CircleCheck aria-hidden="true" className="size-10 text-success" />
        <h1 className="mt-4 text-3xl">{t('thanksTitle')}</h1>
        <p className="mt-4 text-lg text-ink-2">{t('thanksBody')}</p>
        {!site.responseTimeKnown && (
          <Notice tone="pending" title="Staging · KARAR 2" className="mt-6">
            Form yanıt süresi sözü ("1 iş günü içinde" gibi) henüz belirlenmedi.
          </Notice>
        )}
        <h2 className="mt-10 text-xl">{t('thanksNext')}</h2>
        <ol className="mt-4 grid gap-3">
          {steps.map((s, i) => (
            <li key={s} className="flex gap-3">
              <span className="font-serif font-semibold text-accent">{i + 1}.</span>
              {s}
            </li>
          ))}
        </ol>
        <p className="mt-10 text-ink-2">{t('thanksTelegram')}</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <TelegramLink className={buttonClass('primary')} showUsername>
            <Send aria-hidden="true" className="size-4" />
            {common('telegramWrite')}
          </TelegramLink>
          <Link href="/" className={buttonClass('secondary')}>
            {t('backHome')}
          </Link>
        </div>
      </div>
    </section>
  );
}
