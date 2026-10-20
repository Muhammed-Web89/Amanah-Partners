import { getLocale, getTranslations } from 'next-intl/server';
import { Send } from 'lucide-react';
import { buttonClass } from '@/components/ui/button';
import { consultationHref } from '@/components/layout/nav';
import { TelegramLink } from '@/components/layout/TelegramLink';
import { Link } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';
import { getContent } from '@/lib/content';

// Son çağrı (plan §5.14): her sayfanın sonunda aynı birincil eylem + Telegram alternatifi.
export async function ConsultationBand({ title }: { title?: string }) {
  const locale = (await getLocale()) as AppLocale;
  const shared = await getContent(locale, 'shared');
  const t = await getTranslations('common');

  return (
    <section aria-labelledby="cta-title" className="border-t-2 border-ink bg-paper-2 py-section-sm">
      <div className="container-page grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-measure">
          <h2 id="cta-title" className="text-2xl">
            {title ?? shared.cta.title}
          </h2>
          <p className="mt-3 text-ink-2">{shared.cta.body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href={consultationHref} className={buttonClass('primary')}>
            {t('consultation')}
          </Link>
          <TelegramLink className={buttonClass('secondary')}>
            <Send aria-hidden="true" className="size-4" />
            {t('telegramWrite')}
          </TelegramLink>
        </div>
      </div>
    </section>
  );
}
