import { getTranslations } from 'next-intl/server';
import { Send, ShieldAlert } from 'lucide-react';
import { ConsultationForm } from '@/components/forms/ConsultationForm';
import { TelegramLink } from '@/components/layout/TelegramLink';
import { Accordion } from '@/components/ui/Accordion';
import { PageHeader } from '@/components/ui/PageHeader';
import { buttonClass } from '@/components/ui/button';
import { ArrowLink } from '@/components/ui/misc';
import { isStaging, shows, site, type VerifiedKey } from '@/config/site';
import { Link } from '@/i18n/navigation';
import type { StaticPathname } from '@/i18n/routing';
import { faqLink, getContent } from '@/lib/content';
import { resolveLocale } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps<'/[locale]/contact'>) {
  const locale = await resolveLocale(params);
  const { meta } = await getContent(locale, 'contact');
  return pageMetadata({ locale, href: '/contact', ...meta });
}

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  const locale = await resolveLocale(params);
  const [page, faq] = await Promise.all([getContent(locale, 'contact'), getContent(locale, 'faq')]);
  const nav = await getTranslations('nav');
  const t = await getTranslations('form');
  const common = await getTranslations('common');
  const faqItems = faq.categories.flatMap((c) => c.items).filter((q) => page.faqIds.includes(q.id));

  return (
    <>
      <PageHeader crumbs={[{ label: nav('contact') }]} {...page.header} />
      <div className="container-page grid gap-12 py-section-sm lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
        <section id="form" aria-labelledby="form-title" className="scroll-mt-32">
          <h2 id="form-title" className="text-2xl">
            {t('title')}
          </h2>
          <p className="mt-3 mb-8 max-w-measure text-ink-2">{t('intro')}</p>
          <ConsultationForm />
        </section>

        <aside className="grid content-start gap-8">
          <section className="rounded-md border border-rule bg-paper-2 p-5">
            <h2 className="text-xl">{page.aside.telegramTitle}</h2>
            <p className="mt-2 text-ink-2">{page.aside.telegramBody}</p>
            <TelegramLink className={buttonClass('secondary', 'mt-4 w-full')} showUsername>
              <Send aria-hidden="true" className="size-4" />
              {common('telegram')}
            </TelegramLink>
          </section>
          <section>
            <h2 className="label-caps text-accent">{page.aside.locationTitle}</h2>
            <p className="mt-2 text-ink-2">{page.aside.locationBody}</p>
          </section>
          {(site.hours || isStaging) && (
            <section>
              <h2 className="label-caps text-accent">{page.aside.hoursTitle}</h2>
              <p className="mt-2 text-ink-2">
                {site.hours ?? <span lang="tr">[KARAR 3] çalışma saatleri</span>} · {page.aside.hoursNote}
              </p>
            </section>
          )}
          {site.email && (
            <section>
              <h2 className="label-caps text-accent">E-mail</h2>
              <a href={`mailto:${site.email}`} className="mt-2 inline-block">
                {site.email}
              </a>
            </section>
          )}
          <section className="flex gap-3 rounded-md border border-accent-line bg-accent-soft p-4">
            <ShieldAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
            <div>
              <h2 className="font-sans text-base font-semibold">{page.aside.officialTitle}</h2>
              <p className="mt-1 text-sm text-ink-2">{page.aside.officialBody}</p>
              <Link href="/official-accounts" className="mt-1 inline-block text-sm font-semibold">
                {page.aside.officialLink}
              </Link>
            </div>
          </section>
        </aside>
      </div>

      <section aria-labelledby="contact-faq" className="border-t border-rule bg-paper-2 py-section-sm">
        <div className="container-page max-w-[52rem]">
          <h2 id="contact-faq" className="mb-6 text-2xl">
            {page.faqTitle}
          </h2>
          <Accordion
            items={faqItems.map((item) => ({
              question: item.q,
              answer: (
                <>
                  <p>{'verify' in item && shows(item.verify as VerifiedKey) && 'aVerified' in item ? item.aVerified : item.a}</p>
                  {faqLink(item) && (
                    <ArrowLink href={faqLink(item)!.href as StaticPathname} className="mt-2">
                      {faqLink(item)!.label}
                    </ArrowLink>
                  )}
                </>
              ),
            }))}
          />
        </div>
      </section>
    </>
  );
}
