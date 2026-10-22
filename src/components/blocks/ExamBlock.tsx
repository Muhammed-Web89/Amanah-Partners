import { ArrowRight, BadgeCheck, CalendarDays } from 'lucide-react';
import { getLocale } from 'next-intl/server';
import { HeroBackdrop } from '@/components/hero/HeroBackdrop';
import { PendingNote } from '@/components/ui/Notice';
import { shows } from '@/config/site';
import { Link } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';
import { getContent, type ContentMap } from '@/lib/content';

// Plan §7: ayrı sınav merkezi sayfası yok; bu blok ana sayfa, A-Level, Nasıl çalışıyoruz ve SSS'te kullanılır.
// Merkez adı geçen genişletilmiş metin yalnızca Nasıl çalışıyoruz sayfasında ve [TEYİT 2] kapandıysa.
export async function ExamBlock({
  id,
  extended = false,
  showLink = false,
}: {
  id?: string;
  extended?: boolean;
  showLink?: boolean;
}) {
  const locale = (await getLocale()) as AppLocale;
  const { exam } = await getContent(locale, 'shared');
  // docs/11: her sayfada aynı cam kart (tasarım09 §9)
  return <ExamGlass id={id} exam={exam} showLink={showLink} extended={extended && shows('centre91667')} />;
}

// "International A-Level: oktyabr, yanvar, may–iyun · International GCSE: noyabr, may–iyun" → [{ label, months[] }]
function parseSessions(text: string) {
  return text.split(' · ').map((part) => {
    const [label, months = ''] = part.split(/:\s*/);
    return { label, months: months.split(/,\s*/).filter(Boolean) };
  });
}

type Exam = ContentMap['shared']['exam'];

// tasarım09 §9: tek büyük cam kart, iki eşit sütun. Sol: başlık + ferah metin + parlayan bağlantı düğmesi.
// Sağ: daha koyu, belirgin iç panelde oturumlar (ay çipleri) ve notlar. Sağ üstte 3D sınav rozeti
// (genel sınav simgesi; Pearson logosu değil, Amanah'ın kendi merkez numarası yok — docs/08 TEYİT 4).
function ExamGlass({ id, exam, showLink, extended }: { id?: string; exam: Exam; showLink: boolean; extended: boolean }) {
  const sessions = parseSessions(exam.sessions);
  return (
    <section id={id ?? 'exams'} aria-labelledby="exams-title" className="relative isolate overflow-hidden py-section">
      <HeroBackdrop fade="both" icons={false} />
      <div className="container-page">
        <div className="glass-strong relative grid gap-8 rounded-lg p-6 sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-12">
          {/* 3D rozet */}
          <span
            aria-hidden="true"
            className="animate-float absolute -top-7 -right-2 grid size-16 rotate-[8deg] place-items-center rounded-[30%] sm:-top-8 sm:-right-5 sm:size-20"
            style={{
              background: 'linear-gradient(145deg, var(--tile-from), var(--tile-to))',
              boxShadow:
                'inset 0 2px 0 var(--glass-highlight), 0 8px 0 -3px var(--tile-edge), 0 0 28px -4px var(--rm-neon-glow), var(--glass-depth)',
            }}
          >
            <BadgeCheck strokeWidth={1.5} className="size-1/2 text-[var(--rm-neon)] drop-shadow-[0_0_8px_var(--rm-neon-glow)]" />
          </span>

          <div>
            <p className="label-caps text-accent">{exam.eyebrow}</p>
            <h2 id="exams-title" className="mt-3 pr-16 text-[clamp(1.75rem,1.2rem+1.8vw,2.5rem)] leading-tight font-bold">
              {exam.title}
            </h2>
            <p className="mt-6 max-w-measure text-lg leading-relaxed text-ink-2">{exam.body}</p>
            {extended && (
              <div className="mt-5">
                <PendingNote code="TEYİT 2, 3">
                  Merkez no. 91667 üzerinden kayıt ve Özbekistan merkezleri yazılı teyit bekliyor.
                </PendingNote>
                <p className="max-w-measure text-lg leading-relaxed text-ink-2">{exam.extended}</p>
              </div>
            )}
            {showLink && (
              <Link
                href={{ pathname: '/how-we-work', hash: 'imtihon' }}
                className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full border border-[var(--rm-neon)] bg-[var(--glass-bg)] px-6 py-3 font-semibold text-ink no-underline shadow-[0_0_18px_-6px_var(--rm-neon-glow)] transition-[box-shadow,transform] duration-base ease-out hover:-translate-y-0.5 hover:text-ink hover:shadow-[0_0_0_1px_var(--rm-neon),0_0_28px_-2px_var(--rm-neon-glow)]"
              >
                {exam.link}
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 text-[var(--rm-neon)] transition-transform duration-base group-hover:translate-x-1"
                />
              </Link>
            )}
          </div>

          {/* İç panel: daha koyu ve belirgin */}
          <div className="self-start rounded-lg border border-[var(--glass-border)] bg-[var(--inner-card)] p-6 shadow-[inset_0_1px_0_var(--glass-highlight)] sm:p-8">
            <h3 className="label-caps flex items-center gap-2 font-sans text-accent">
              <CalendarDays aria-hidden="true" className="size-4" />
              {exam.sessionsLabel}
            </h3>
            <dl className="mt-5 space-y-5">
              {sessions.map((s) => (
                <div key={s.label}>
                  <dt className="font-semibold text-ink">{s.label}</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {s.months.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg-strong)] px-3 py-1 text-sm font-medium text-ink"
                      >
                        {m}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
            <ul className="mt-6 space-y-3 border-t border-[var(--glass-edge)] pt-5">
              {exam.notes.map((n) => (
                <li key={n} className="text-sm text-ink-2">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
