import { BookOpen, ClipboardCheck, FileSignature, GraduationCap, Send } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ConsultationBand } from '@/components/blocks/ConsultationBand';
import { ExamBlock } from '@/components/blocks/ExamBlock';
import { HeroBackdrop } from '@/components/hero/HeroBackdrop';
import { HeroStory } from '@/components/hero/HeroStory';
import { CompareGrid } from '@/components/home/CompareGrid';
import { isArticleArt } from '@/components/guides/ArticleArt';
import { CountryCards } from '@/components/home/CountryCards';
import { GuideCards, type GuideCard } from '@/components/home/GuideCards';
import { PriceCta } from '@/components/home/PriceCta';
import { Roadmap } from '@/components/home/Roadmap';
import { ServiceModel } from '@/components/home/ServiceModel';
import { UniversityMarquee } from '@/components/home/UniversityMarquee';
import { WhyALevel } from '@/components/home/WhyALevel';
import { consultationHref } from '@/components/layout/nav';
import { TelegramLink } from '@/components/layout/TelegramLink';
import { Accordion } from '@/components/ui/Accordion';
import { formatDate } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { buttonClass } from '@/components/ui/button';
import { ArrowLink, Card } from '@/components/ui/misc';
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
  const [home, shared, faq, guides, howWeWork] = await Promise.all([
    getContent(locale, 'home'),
    getContent(locale, 'shared'),
    getContent(locale, 'faq'),
    getGuides(locale),
    getContent(locale, 'how-we-work'),
  ]);
  // Ana sayfadaki 6 adım = "Qanday ishlaymiz" sayfasındaki 6 adım, aynı sırada (açıklamalar oradan)
  const sixSteps = howWeWork.blocks.find((b) => b.type === 'steps' && 'items' in b);
  const stepBodies = sixSteps && 'items' in sixSteps ? (sixSteps.items as { body: string }[]).map((s) => s.body) : [];
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
            <Card
              key={card.title}
              eyebrow={card.eyebrow}
              title={card.title}
              href={card.href as StaticPathname}
              linkLabel={card.link}
            >
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

      {/* 5.6 Nasıl çalışıyoruz özeti (tasarım07: kaydırmayla dolan dikey yol haritası).
          Kart açıklamaları "Qanday ishlaymiz" sayfasındaki aynı sıradaki adımdan gelir. */}
      <Roadmap
        eyebrow={home.steps.eyebrow}
        title={home.steps.title}
        steps={home.steps.items.map((title, i) => ({ title, body: stepBodies[i] }))}
      >
        <ArrowLink href="/how-we-work">{home.steps.link}</ArrowLink>
      </Roadmap>

      {/* 5.7 Sınavlar nerede (tasarım09 §9: iki sütunlu cam panel) */}
      <ExamBlock showLink />

      {/* 5.8 Hedef ülkeler (tasarım09 §10: 3×2 cam ülke kartları) */}
      <CountryCards
        eyebrow={home.countries.eyebrow}
        title={home.countries.title}
        items={home.countries.items}
        footnote={
          <>
            {shared.countryNote} {t('updated')}:{' '}
            <time dateTime={home.countries.updated}>{formatDate(home.countries.updated, locale)}</time>
          </>
        }
      />

      {/* 5.9 Üniversiteler [TEYİT 1 · onaylandı] (tasarım09 §11: kayan cam kapsüller) */}
      {shows('universityList') && (
        <UniversityMarquee
          eyebrow={home.universities.eyebrow}
          title={home.universities.title}
          list={home.universities.list}
          note={home.universities.note}
          pauseLabel={t('marqueePause')}
          playLabel={t('marqueePlay')}
        />
      )}

      {/* 5.10 Uygun fiyat (tasarım09 §12: vurgulu CTA paneli) */}
      <PriceCta {...home.price} />

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
                    <ArrowLink href={faqLink(item)!.href as StaticPathname} variant="sweep" className="mt-2">
                      {faqLink(item)!.label}
                    </ArrowLink>
                  )}
                </>
              ),
            }))}
          />
          <ArrowLink href="/faq" variant="pill" className="mt-6">
            {home.faq.all}
          </ArrowLink>
        </div>
      </Section>

      {/* 5.13 Son yazılar (tasarım09 §13: 3 sütunlu cam kartlar, kapaklı). 3'ten az yazı varsa boşluklar
          sitedeki gerçek sayfalara giden kartlarla dolar; yazı hiç yoksa bölüm gösterilmez. */}
      {guides.length > 0 && (
        <GuideCards
          eyebrow={home.guides.eyebrow}
          title={home.guides.title}
          allLabel={home.guides.all}
          readLabel={home.guides.read}
          cards={[
            ...guides.slice(0, 3).map((g): GuideCard => ({
              key: g.id,
              href: { pathname: '/guides/[slug]', params: { slug: g.slug } },
              label: formatDate(g.published, locale),
              dateTime: g.published,
              title: g.title,
              description: g.description,
              icon: g.category === 'exams' ? 'exam' : 'guide',
              art: isArticleArt(g.art) ? g.art : undefined,
            })),
            {
              key: 'how-we-work',
              href: '/how-we-work',
              label: howWeWork.header.eyebrow,
              title: howWeWork.header.title,
              description: howWeWork.header.lede,
              icon: 'route',
            } satisfies GuideCard,
            {
              key: 'faq',
              href: '/faq',
              label: faq.header.eyebrow,
              title: faq.header.title,
              description: faq.meta.description,
              icon: 'faq',
            } satisfies GuideCard,
          ].slice(0, 3)}
        />
      )}

      <ConsultationBand />
    </>
  );
}
