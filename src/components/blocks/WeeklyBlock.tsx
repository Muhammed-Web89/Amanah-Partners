import { getLocale } from 'next-intl/server';
import { DataTable } from '@/components/ui/DataTable';
import { Ledger } from '@/components/ui/Ledger';
import { PendingNote } from '@/components/ui/Notice';
import { GlassSection } from '@/components/ui/GlassSection';
import { FinePrint, StatusTag } from '@/components/ui/misc';
import { shows } from '@/config/site';
import type { AppLocale } from '@/i18n/routing';
import { getContent } from '@/lib/content';

// Plan §8: haftalık program ayrı sayfa değil, program sayfalarında bölüm.
// Saat tablosu [KARAR 5] kesinleşmeden canlıda yayınlanmaz; "okulla birlikte" metni ve rapor örneği her zaman görünür.
// docs/11: cam bölüm; rapor örneği hover'da kalkan cam kartta.
export async function WeeklyBlock() {
  const locale = (await getLocale()) as AppLocale;
  const { weekly } = await getContent(locale, 'shared');

  return (
    <GlassSection id="weekly" eyebrow={weekly.eyebrow} title={weekly.title} intro={weekly.intro}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        {shows('weeklyHours') ? (
          <div>
            <PendingNote code="KARAR 5">Haftalık ders saatleri ve yük tahmini kesinleşmedi.</PendingNote>
            <DataTable caption={weekly.caption} columns={weekly.columns} rows={weekly.rows} />
            <FinePrint className="mt-3">{weekly.tableNote}</FinePrint>
          </div>
        ) : null}
        <div className="reveal glass-card rounded-lg p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl">{weekly.reportTitle}</h3>
            <StatusTag>{weekly.reportLabel}</StatusTag>
          </div>
          <p className="mt-3 text-ink-2">{weekly.reportBody}</p>
          <figure className="mt-5 rounded-lg border border-(--glass-border) bg-(--inner-card) px-5 py-2 shadow-[inset_0_1px_0_var(--glass-highlight)]">
            <Ledger rows={weekly.report} />
            <figcaption className="mt-1 pb-3 text-xs text-ink-2">{weekly.reportNote}</figcaption>
          </figure>
        </div>
      </div>
    </GlassSection>
  );
}
