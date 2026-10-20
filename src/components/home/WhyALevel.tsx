import {
  Blocks,
  Compass,
  Hourglass,
  MoveUpRight,
  Puzzle,
  Route,
  Target,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { FinePrint } from '@/components/ui/misc';
import { fmt } from '@/lib/typo';

// tasarım03: "Nega aynan A-Level?" — ortalı, parlamalı başlık + 2×2 buzlu cam kartlar.
// Her kartta ana ikon + küçük rozet ikonu: hafif 3D cam karo, neon hatlı çizgi. Sıra shared.json → whyALevel.items ile aynı.
const icons: { main: LucideIcon; badge: LucideIcon }[] = [
  { main: Target, badge: MoveUpRight }, // Foundation yili kerak emas: hedefe doğrudan
  { main: Hourglass, badge: Wallet }, // Bir yil va xarajatni tejang: zaman + para
  { main: Compass, badge: Route }, // Germaniya va Italiyaga yoʻl: pusula + rota
  { main: Puzzle, badge: Blocks }, // Moslashuvchan va modulli: yapboz + bloklar
];

type Props = {
  eyebrow: string;
  title: string;
  items: { title: string; body: string }[];
  note: string;
};

export function WhyALevel({ eyebrow, title, items, note }: Props) {
  return (
    <section id="why" aria-labelledby="why-title" className="py-section">
      <div className="container-page">
        <header className="relative mx-auto mb-10 max-w-3xl text-center md:mb-14">
          {/* Başlık arkası parlama: pastel zeminden ayrışır, okunurluğu artırır */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -inset-y-10 -z-10 blur-2xl"
            style={{ background: 'radial-gradient(closest-side, var(--glass-border), transparent)' }}
          />
          <p className="label-caps text-accent">{eyebrow}</p>
          <h2
            id="why-title"
            className="mt-3 text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-tight font-bold [text-shadow:0_0_32px_var(--glass-border)]"
          >
            {fmt(title)}
          </h2>
        </header>

        <ul className="grid gap-5 md:grid-cols-2 lg:gap-6">
          {items.map((item, i) => {
            const { main: Icon, badge: Badge } = icons[i % icons.length];
            return (
              <li
                key={item.title}
                className="glass group rounded-lg p-6 transition-[transform,box-shadow,border-color] duration-base ease-out hover:-translate-y-[5px] hover:border-accent-light hover:shadow-[0_0_0_1px_var(--c-accent-light),0_0_28px_-4px_var(--beam),var(--glass-shadow)] sm:p-8"
              >
                <div className="relative mb-6 inline-flex">
                  <span
                    aria-hidden="true"
                    className="grid size-16 place-items-center rounded-lg border border-[var(--glass-border)] shadow-[inset_0_1px_0_rgb(255_255_255/0.6),0_8px_20px_-8px_var(--beam)]"
                    style={{ background: 'linear-gradient(140deg, var(--pastel-1), var(--pastel-2) 60%, var(--pastel-3))' }}
                  >
                    <Icon
                      strokeWidth={1.5}
                      className="size-8 text-accent drop-shadow-[0_0_6px_var(--beam)] transition-transform duration-base ease-out group-hover:scale-110"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="glass absolute -right-3.5 -bottom-3.5 grid size-9 place-items-center rounded-full [--glass-fill:var(--glass-bg-strong)]"
                  >
                    <Badge strokeWidth={2} className="size-[1.125rem] text-accent" />
                  </span>
                </div>
                <h3 className="text-xl font-semibold sm:text-2xl">{fmt(item.title)}</h3>
                <p className="mt-3 text-ink-2">{fmt(item.body)}</p>
              </li>
            );
          })}
        </ul>

        <FinePrint className="mx-auto mt-8 max-w-3xl text-center">{note}</FinePrint>
      </div>
    </section>
  );
}
