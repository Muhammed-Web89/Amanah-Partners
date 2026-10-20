import { BookOpen, GraduationCap, Globe2, PenLine, Plane } from 'lucide-react';
import { LogoMark } from '@/components/layout/Logo';
import { cn } from '@/lib/cn';

// tasarım01 §2A: düz renk yerine çok yavaş hareket eden pastel lekeler + eğitime gönderme yapan soluk simgeler.
// Tamamen dekoratif (aria-hidden); "hareketi azalt" tercihinde globals.css animasyonları durdurur.
const floaters = [
  { Icon: GraduationCap, className: 'top-[14%] left-[46%] size-12', delay: '0s' },
  { Icon: BookOpen, className: 'bottom-[18%] left-[6%] size-10', delay: '-4s' },
  { Icon: Globe2, className: 'top-[10%] right-[6%] size-9', delay: '-8s' },
  { Icon: PenLine, className: 'bottom-[10%] left-[44%] size-8', delay: '-11s' },
  { Icon: Plane, className: 'top-[30%] left-[62%] size-9 rotate-[-25deg]', delay: '-6s' },
];

// fade: lekeler o kenarda düz zemine (paper-2) erir; art arda gelen iki zemin dikişsiz birleşir.
const fadeMask = {
  top: 'linear-gradient(to bottom, transparent, #000 10rem)',
  bottom: 'linear-gradient(to top, transparent, #000 10rem)',
  both: 'linear-gradient(to bottom, transparent, #000 10rem, #000 calc(100% - 10rem), transparent)',
};

// travel (tasarım06): seyahat + eğitim — dünya meridyenleri ve yavaş akan kesik çizgili uçuş rotaları.
type Props = { still?: boolean; icons?: boolean; travel?: boolean; fade?: keyof typeof fadeMask; className?: string };

export function HeroBackdrop({ still = false, icons = true, travel = false, fade, className }: Props) {
  const mask = fade ? { maskImage: fadeMask[fade], WebkitMaskImage: fadeMask[fade] } : undefined;
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      <div className="absolute inset-0 bg-paper-2" />
      <div className="absolute inset-0" style={mask}>
        <div
          className={cn('absolute -top-1/4 -left-1/4 size-[70%] rounded-full', !still && 'animate-drift-a')}
          style={{ background: 'radial-gradient(closest-side, var(--pastel-1), transparent)' }}
        />
        <div
          className={cn('absolute -right-1/4 -bottom-1/3 size-[75%] rounded-full', !still && 'animate-drift-b')}
          style={{ background: 'radial-gradient(closest-side, var(--pastel-2), transparent)' }}
        />
        <div
          className={cn('absolute top-1/3 left-1/4 size-[55%] rounded-full', !still && 'animate-drift-c')}
          style={{ background: 'radial-gradient(closest-side, var(--pastel-3), transparent)' }}
        />
        <div
          className="absolute -top-1/4 right-0 size-[45%] rounded-full opacity-70"
          style={{ background: 'radial-gradient(closest-side, var(--pastel-4), transparent)' }}
        />
      </div>
      {travel && (
        <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" style={mask}>
          {/* Soluk dünya: enlem/boylam halkaları */}
          <g fill="none" stroke="var(--grid-line)" strokeWidth="1.5">
            <circle cx="980" cy="660" r="300" />
            <ellipse cx="980" cy="660" rx="120" ry="300" />
            <ellipse cx="980" cy="660" rx="220" ry="300" />
            <ellipse cx="980" cy="660" rx="300" ry="110" />
            <ellipse cx="980" cy="660" rx="300" ry="210" />
          </g>
          {/* Uçuş rotaları */}
          <g
            fill="none"
            stroke="var(--c-accent-light)"
            strokeWidth="2"
            strokeDasharray="4 12"
            strokeLinecap="round"
            opacity="0.7"
          >
            <path className={still ? undefined : 'animate-dash'} d="M-40 620 C 220 380, 520 300, 820 140 S 1180 40, 1260 20" />
            <path
              className={still ? undefined : 'animate-dash'}
              style={{ animationDuration: '60s' }}
              d="M80 820 C 300 640, 640 600, 900 420"
            />
          </g>
        </svg>
      )}
      {!still && icons && (
        <>
          <LogoMark className="animate-float absolute top-[58%] right-[38%] h-16 w-auto opacity-[0.07]" />
          {floaters.map(({ Icon, className: c, delay }) => (
            <Icon
              key={c}
              strokeWidth={1.25}
              className={cn('animate-float absolute text-accent-line opacity-25', c)}
              style={{ animationDelay: delay }}
            />
          ))}
        </>
      )}
    </div>
  );
}
