import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowRight, Send } from 'lucide-react';
import { HeroBackdrop } from '@/components/hero/HeroBackdrop';
import { consultationHref } from '@/components/layout/nav';
import { TelegramLink } from '@/components/layout/TelegramLink';
import { buttonClass } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';
import { getContent } from '@/lib/content';

// Son çağrı (plan §5.14): her sayfanın sonunda aynı birincil eylem + Telegram alternatifi.
// tasarım09 §14: ortalanmış geniş cam panel; arkasından yavaşça süzülen mavi/lacivert degrade parıltı.
// Zemin altta paper-2'ye erir ve alt bilginin aynı zeminine dikişsiz bağlanır.
export async function ConsultationBand({ title }: { title?: string }) {
  const locale = (await getLocale()) as AppLocale;
  const shared = await getContent(locale, 'shared');
  const t = await getTranslations('common');

  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden py-section">
      <HeroBackdrop fade="both" icons={false} />
      <div className="container-page">
        <div className="relative isolate mx-auto max-w-4xl">
          {/* Güven veren mavi/lacivert parıltı: iki leke yavaşça süzülür (dekoratif) */}
          <div aria-hidden="true" className="pointer-events-none absolute -inset-x-10 inset-y-0 -z-10">
            <div
              className="animate-drift-a absolute top-0 left-[5%] size-[70%] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(closest-side, var(--rm-neon-glow), transparent)' }}
            />
            <div
              className="animate-drift-b absolute right-[5%] bottom-[10%] size-[60%] rounded-full opacity-70 blur-3xl"
              style={{ background: 'radial-gradient(closest-side, var(--c-action), transparent)' }}
            />
          </div>

          <div className="glass-strong rounded-lg px-6 py-12 text-center sm:px-12 sm:py-14">
            <h2 id="cta-title" className="text-[clamp(1.875rem,1.3rem+2.2vw,3rem)] leading-tight font-bold">
              {title ?? shared.cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[56ch] text-lg text-ink-2">{shared.cta.body}</p>

            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link href={consultationHref} className={buttonClass('glow')}>
                {t('consultation')}
                <ArrowRight aria-hidden="true" className="size-5 transition-transform duration-base group-hover:translate-x-1" />
              </Link>
              <TelegramLink className={buttonClass('glass')}>
                <Send aria-hidden="true" className="size-5 text-(--ds-neon)" />
                {t('telegramWrite')}
              </TelegramLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
