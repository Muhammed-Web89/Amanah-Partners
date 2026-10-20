import { BookOpen, ClipboardCheck, FileSignature, GraduationCap, Send } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ConsultationBand } from '@/components/blocks/ConsultationBand';
import { ExamBlock } from '@/components/blocks/ExamBlock';
import { HeroBackdrop } from '@/components/hero/HeroBackdrop';
import { HeroStory } from '@/components/hero/HeroStory';
import { CompareGrid } from '@/components/home/CompareGrid';
import { ServiceModel } from '@/components/home/ServiceModel';
import { WhyALevel } from '@/components/home/WhyALevel';
import { consultationHref } from '@/components/layout/nav';
import { TelegramLink } from '@/components/layout/TelegramLink';
import { Accordion } from '@/components/ui/Accordion';
import { PendingNote } from '@/components/ui/Notice';
import { formatDate } from '@/components/ui/PageHeader';
import { ProcessSteps } from '@/components/ui/ProcessSteps';
import { Section } from '@/components/ui/Section';
import { buttonClass } from '@/components/ui/button';
import { ArrowLink, Card, FinePrint } from '@/components/ui/misc';
import { shows, type VerifiedKey } from '@/config/site';
import { Link } from '@/i18n/navigation';
import type { StaticPathname } from '@/i18n/routing';
import { faqLink, getContent } from '@/lib/content';
import { getGuides } from '@/lib/guides';
import { resolveLocale } from '@/lib/page';
import { pageMetadata } from '@/lib/seo';
import { fmt } from '@/lib/typo';

const trustIcons = [ClipboardCheck, GraduationCap, BookOpen, FileSignature];

export async function generateMetadata({ params }: PageProps<'/[locale]'>) {
  const locale = await resolveLocale(params);
  const { meta } = await getContent(locale, 'home');
  return { ...pageMetadata({ locale, href: '/', ...meta }), title: { absolute: meta.title } };
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const locale = await resolveLocale(params);
  const [home, shared, faq, guides] = await Promise.all([
    getContent(locale, 'home'),
    getContent(locale, 'shared'),
    getContent(locale, 'faq'),
    getGuides(locale),
  ]);
  const t = await getTranslations('common');

  const faqItems = faq.categories
    .flatMap((c) => c.items)
    .filter((q) => ['school', 'online', 'countries', 'price', 'guarantee'].includes(q.id));

  return (
    <>
      {/* 5.1 Hero + kaydırma hikâyesi (tasarım01 §2): ilk ekranda ne sunulduğu ve kime sunulduğu (prompt §7) */}
      <HeroStory label={home.hero.routeLabel} stops={home.hero.route} details={home.hero.routeSteps}>
        <p className="label-caps border-t border-ink pt-3 text-ink-2">{home.hero.eyebrow}</p>
        <h1 id="hero-title" className="mt-5 text-display lg:text-[clamp(1.875rem,0.75rem+1.5vw,2.5rem)]">
          {fmt(home.hero.title)}
        </h1>
        <p className="mt-5 max-w-measure text-lg text-ink-2">{fmt(home.hero.subtitle)}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link href={consultationHref} className={buttonClass('primary')}>
            {t('consultation')}
          </Link>
          <Link href="/programs" className={buttonClass('secondary')}>
            {home.hero.secondary}
          </Link>
          <TelegramLink className={buttonClass('text', 'sm:ml-2')} showUsername>
            <Send aria-hidden="true" className="size-4" />
            {t('telegramWrite')}
          </TelegramLink>
        </div>
      </HeroStory>

      {/* tasarım03 §A: hero'nun pastel, hareketli zemini güven şeridi ve "Nega aynan A-Level?" boyunca sürer */}
      <div className="relative isolate overflow-hidden">
        <HeroBackdrop fade="both" icons={false} />

        {/* Güven şeridi: yalnızca doğrulanmış ifadeler */}
        <div className="container-page pt-8">
          <ul className="grid gap-x-8 gap-y-4 pt-2 sm:grid-cols-2 lg:grid-cols-4">
            {home.trust
              .filter((item) => !('verify' in item) || shows(item.verify as VerifiedKey))
              .map((item, i) => {
                const Icon = trustIcons[i % trustIcons.length];
                return (
                  <li key={item.text} className="flex items-start gap-3 text-sm text-ink">
                    <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
                    {item.text}
                  </li>
                );
              })}
          </ul>
        </div>

        {/* 5.2 Neden A-Level (tasarım03: 2×2 cam kartlar) */}
        <WhyALevel
          eyebrow={shared.whyALevel.eyebrow}
          title={shared.whyALevel.title}
          items={shared.whyALevel.items}
          note={shared.admissionNote}
        />
      </div>

      {/* 5.3 Kime uygun */}
      <Section id="audience" eyebrow={home.audience.eyebrow} title={home.audience.title} tone="file">
        <div className="grid gap-4 md:grid-cols-2">
          {home.audience.cards.map((card) => (
            <Card key={card.title} eyebrow={card.eyebrow} title={card.title} href={card.href as StaticPathname} linkLabel={card.link}>
              {card.body}
            </Card>
          ))}
        </div>
        <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-ink-2">
          <span>{home.audience.moreLabel}</span>
          {home.audience.more.map((m) => (
            <Link key={m.href} href={m.href as StaticPathname} className="inline-flex min-h-11 items-center">
              {m.label}
            </Link>
          ))}
        </p>
      </Section>

      {/* 5.4 Kim neyi yürütür (tasarım04: kareli defter zemininde yatay cam paneller) */}
      <ServiceModel
        eyebrow={home.model.eyebrow}
        title={home.model.title}
        columns={home.model.columns}
        rows={home.model.rows.map((row) => {
          // Teyit gelince ayrıntı rozetin altında: "Amanah Partners (…)" / "…markazlar: …" → yalnızca ek kısım
          const gate = 'verifyWho' in row ? (row.verifyWho as VerifiedKey) : null;
          const verified = gate && shows(gate) && 'whoVerified' in row ? row.whoVerified : null;
          const detail = verified?.startsWith(row.who) ? verified.slice(row.who.length).replace(/^[\s:(]+|\)$/g, '') : undefined;
          return { service: row.service, who: row.who, detail, how: row.how };
        })}
      />

      {/* 5.5 Neden Amanah Partners (tasarım05: Amanah sütunu öne çıkan cam grid) */}
      <CompareGrid {...home.compare} yes={t('yes')} no={t('no')} />

      {/* 5.6 Nasıl çalışıyoruz özeti */}
      <Section id="steps" eyebrow={home.steps.eyebrow} title={home.steps.title}>
        <ProcessSteps variant="compact" steps={home.steps.items.map((title) => ({ title }))} />
        <ArrowLink href="/how-we-work" className="mt-8">
          {home.steps.link}
        </ArrowLink>
      </Section>

      {/* 5.7 Sınavlar nerede */}
      <ExamBlock tone="file" showLink />

      {/* 5.8 Hedef ülkeler */}
      <Section id="countries" eyebrow={home.countries.eyebrow} title={home.countries.title}>
        <ul className="grid border-t border-rule md:grid-cols-2 md:gap-x-10 lg:grid-cols-3">
          {home.countries.items.map((c) => (
            <li key={c.href} className="border-b border-rule py-5">
              <Link href={c.href as StaticPathname} className="font-serif text-xl font-semibold text-ink no-underline hover:text-link">
                {c.name}
              </Link>
              <p className="mt-1.5 text-ink-2">{fmt(c.text)}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-ink-2">
          {shared.countryNote} {t('updated')}: <time dateTime={home.countries.updated}>{formatDate(home.countries.updated, locale)}</time>
        </p>
      </Section>

      {/* 5.9 Üniversiteler [TEYİT 1] */}
      {shows('universityList') && (
        <Section id="universities" eyebrow={home.universities.eyebrow} title={home.universities.title} tone="file">
          <PendingNote code="TEYİT 1">Faydalan Academy&apos;nin listeyi ortak kullanım için yazılı onayı bekleniyor.</PendingNote>
          <ul className="grid gap-x-10 border-t border-rule sm:grid-cols-2">
            {home.universities.list.map((u) => (
              <li key={u} className="border-b border-rule py-3">
                {u}
              </li>
            ))}
          </ul>
          <FinePrint className="mt-5">{home.universities.note}</FinePrint>
        </Section>
      )}

      {/* 5.10 Uygun fiyat */}
      <Section id="price" eyebrow={home.price.eyebrow} title={home.price.title}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,65ch)_1fr] lg:items-end">
          <p className="text-lg text-ink-2">{fmt(home.price.body)}</p>
          <div className="flex flex-col items-start gap-2">
            <Link href={consultationHref} className={buttonClass('primary')}>
              {home.price.button}
            </Link>
            <ArrowLink href="/fees">{home.price.link}</ArrowLink>
          </div>
        </div>
      </Section>

      {/* 5.11 Ekip: sayaç kartı yok, düz cümle (Aşama 1, karar 2) */}
      <Section id="team" eyebrow={home.team.eyebrow} title={home.team.title} tone="file">
        <p className="max-w-measure text-lg">{home.team.body}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {home.team.points.map((p) => (
            <li key={p} className="rounded-full border border-rule bg-paper px-3 py-1 text-sm text-ink-2">
              {p}
            </li>
          ))}
        </ul>
      </Section>

      {/* 5.12 SSS önizleme */}
      <Section id="faq" eyebrow={home.faq.eyebrow} title={home.faq.title}>
        <div className="max-w-[52rem]">
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
          <ArrowLink href="/faq" className="mt-6">
            {home.faq.all}
          </ArrowLink>
        </div>
      </Section>

      {/* 5.13 Son yazılar: yazı yoksa bölüm gösterilmez */}
      {guides.length > 0 && (
        <Section id="guides" eyebrow={home.guides.eyebrow} title={home.guides.title} tone="file">
          <ul className="grid gap-4 md:grid-cols-3">
            {guides.slice(0, 3).map((g) => (
              <li key={g.id}>
                <article className="relative h-full rounded-md border border-rule bg-paper p-5 hover:border-ink">
                  <time dateTime={g.published} className="text-sm text-ink-2">
                    {formatDate(g.published, locale)}
                  </time>
                  <h3 className="mt-2 text-xl">
                    <Link
                      href={{ pathname: '/guides/[slug]', params: { slug: g.slug } }}
                      className="text-ink no-underline after:absolute after:inset-0"
                    >
                      {g.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-ink-2">{g.description}</p>
                </article>
              </li>
            ))}
          </ul>
          <ArrowLink href="/guides" className="mt-6">
            {home.guides.all}
          </ArrowLink>
        </Section>
      )}

      <ConsultationBand />
    </>
  );
}
