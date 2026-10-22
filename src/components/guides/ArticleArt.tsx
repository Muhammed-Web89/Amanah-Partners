import { BookOpen, GraduationCap, Landmark, Languages, PenLine, Plane, Sparkles, type LucideIcon } from 'lucide-react';
import type { ComponentType, ReactNode, SVGProps } from 'react';
import { BigBen, Brandenburg, Colosseum, Liberty, MapleLeaf, Windmill } from '@/components/home/CountryIcons';
import { cn } from '@/lib/cn';

// docs/11 §8: makale illüstrasyonları — stok fotoğraf yok; pastel zemin, kesik çizgili rotalar ve 3D cam karolar kodla çizilir.
// Simge degradesi userSpaceOnUse (0–24, Lucide viewBox): objectBoundingBox düz çizgilerde (sıfır genişlik) boyanmaz.
// Aynı SVG hem kart kapağında (16:9) hem makale başlığında kullanılır. Tamamen dekoratif (aria-hidden).
// Sahneler: programs (IGCSE → A-Level → universitet merdiveni), countries (Toshkentdan 6 davlatga rotalar),
// exams (IELTS/TOEFL ve SAT kesişimi). Makale başlığında 2:1 kırpıldığı için öğeler y 30–330 arasında kalır. Metin yalnızca marka adları (IGCSE, A-Level, SAT…): her dilde aynı.

type Icon = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;
export const articleArts = ['programs', 'countries', 'exams'] as const;
export type ArticleArtName = (typeof articleArts)[number];

export function isArticleArt(name?: string): name is ArticleArtName {
  return articleArts.includes(name as ArticleArtName);
}

/** 3D cam karo: alt kenar (kalınlık) + degrade yüz + parlak üst çizgi + ortada simge */
function Tile({
  x,
  y,
  s,
  icon: I,
  uid,
  glow = false,
}: {
  x: number;
  y: number;
  s: number;
  icon: Icon;
  uid: string;
  glow?: boolean;
}) {
  const r = s * 0.28;
  return (
    <g>
      {glow && <circle cx={x + s / 2} cy={y + s / 2} r={s * 0.95} fill={`url(#${uid}-glow)`} />}
      <rect x={x} y={y + s * 0.09} width={s} height={s} rx={r} fill="var(--tile-edge)" />
      <rect x={x} y={y} width={s} height={s} rx={r} fill={`url(#${uid}-tile)`} />
      <rect
        x={x + 1}
        y={y + 1}
        width={s - 2}
        height={s - 2}
        rx={r - 1}
        fill="none"
        stroke="var(--glass-highlight)"
        strokeWidth="1.5"
      />
      <I x={x + s * 0.25} y={y + s * 0.25} width={s * 0.5} height={s * 0.5} stroke={`url(#${uid}-ink)`} strokeWidth={1.4} />
    </g>
  );
}

function Label({
  x,
  y,
  children,
  anchor = 'middle',
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: 'start' | 'middle';
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily="var(--font-sans), sans-serif"
      fontWeight={700}
      fontSize={17}
      fill="var(--c-ink)"
    >
      {children}
    </text>
  );
}

function Programs({ uid }: { uid: string }) {
  // Yükselen üç cam basamak; neon kesik rota basamakları birleştirir
  const steps = [
    { x: 70, top: 250, w: 150, icon: BookOpen, label: 'IGCSE' },
    { x: 245, top: 195, w: 150, icon: GraduationCap, label: 'A-Level' },
    { x: 420, top: 135, w: 150, icon: Landmark, label: null },
  ];
  return (
    <>
      {steps.map((st, i) => (
        <g key={i}>
          <rect x={st.x} y={st.top + 10} width={st.w} height={360 - st.top} rx="14" fill="var(--tile-edge)" opacity="0.7" />
          <rect x={st.x} y={st.top} width={st.w} height={360 - st.top} rx="14" fill={`url(#${uid}-slab)`} />
          <rect x={st.x + 1} y={st.top + 1} width={st.w - 2} height="28" rx="13" fill="var(--glass-highlight)" opacity="0.35" />
        </g>
      ))}
      <path
        d="M145 215 C 190 170, 250 190, 320 158 S 440 110, 495 98"
        fill="none"
        stroke="var(--rm-neon)"
        strokeWidth="2.5"
        strokeDasharray="6 9"
        className="animate-dash"
      />
      {steps.map((st, i) => (
        <g key={i} className={i === 2 ? 'animate-float' : undefined}>
          <Tile
            uid={uid}
            x={st.x + st.w / 2 - (i === 2 ? 42 : 34)}
            y={st.top - (i === 2 ? 108 : 88)}
            s={i === 2 ? 84 : 68}
            icon={st.icon}
            glow={i === 2}
          />
          {st.label && (
            <Label x={st.x + st.w / 2} y={st.top + 48}>
              {st.label}
            </Label>
          )}
        </g>
      ))}
      <Sparkles x={560} y={40} width={34} height={34} stroke="var(--rm-neon)" strokeWidth={1.4} className="animate-float" />
    </>
  );
}

function Countries({ uid }: { uid: string }) {
  // Ortada dünya, Toshkent iğnesi; altı davlatga kesik çizgili uçuş rotaları
  const cx = 320;
  const cy = 196;
  const spots: Array<[number, number, Icon]> = [
    [70, 46, BigBen],
    [78, 238, Liberty],
    [262, 34, Brandenburg],
    [506, 226, MapleLeaf],
    [500, 46, Colosseum],
    [392, 256, Windmill],
  ];
  return (
    <>
      <g fill="none" stroke="var(--rm-line)" strokeWidth="1.5">
        <circle cx={cx} cy={cy} r="96" fill={`url(#${uid}-slab)`} />
        <ellipse cx={cx} cy={cy} rx="40" ry="96" />
        <ellipse cx={cx} cy={cy} rx="74" ry="96" />
        <ellipse cx={cx} cy={cy} rx="96" ry="34" />
        <ellipse cx={cx} cy={cy} rx="96" ry="68" />
      </g>
      {spots.map(([x, y], i) => (
        <path
          key={i}
          d={`M${cx} ${cy} Q ${(cx + x + 35) / 2} ${Math.min(cy, y) - 40}, ${x + 35} ${y + 35}`}
          fill="none"
          stroke="var(--rm-neon)"
          strokeWidth="2"
          strokeDasharray="5 8"
          opacity="0.85"
          className="animate-dash"
        />
      ))}
      <circle cx={cx} cy={cy} r="26" fill={`url(#${uid}-glow)`} />
      <circle cx={cx} cy={cy} r="8" fill="var(--rm-neon)" stroke="var(--c-paper)" strokeWidth="3" />
      {spots.map(([x, y, I], i) => (
        <g key={i} className={i % 2 ? 'animate-float' : undefined} style={{ animationDelay: `${-i * 2}s` }}>
          <Tile uid={uid} x={x} y={y} s={70} icon={I} />
        </g>
      ))}
      <Plane x={392} y={112} width={30} height={30} stroke="var(--rm-neon)" strokeWidth={1.6} transform="rotate(20 407 127)" />
    </>
  );
}

function Exams({ uid }: { uid: string }) {
  // İki kesişen cam daire: til imtihonu ve akademik test; kesişimde A-Level → toʻliq ariza paketi
  return (
    <>
      <circle cx="245" cy="180" r="128" fill={`url(#${uid}-slab)`} stroke="var(--glass-border)" strokeWidth="2" />
      <circle cx="395" cy="180" r="128" fill={`url(#${uid}-slab)`} stroke="var(--glass-border)" strokeWidth="2" />
      <path
        d="M320 76 A 128 128 0 0 1 320 284 A 128 128 0 0 1 320 76 Z"
        fill={`url(#${uid}-glow)`}
        stroke="var(--rm-neon)"
        strokeWidth="2"
        strokeDasharray="5 7"
        className="animate-dash"
      />
      <g className="animate-float" style={{ animationDelay: '-3s' }}>
        <Tile uid={uid} x={150} y={110} s={76} icon={Languages} />
      </g>
      <Label x={188} y={232}>
        IELTS / TOEFL
      </Label>
      <g className="animate-float" style={{ animationDelay: '-7s' }}>
        <Tile uid={uid} x={414} y={110} s={76} icon={PenLine} />
      </g>
      <Label x={452} y={232}>
        SAT
      </Label>
      <Tile uid={uid} x={292} y={150} s={56} icon={GraduationCap} glow />
    </>
  );
}

const scenes = { programs: Programs, countries: Countries, exams: Exams };

export function ArticleArt({
  name,
  uid,
  className,
  tint = 0,
}: {
  name: ArticleArtName;
  /** Sayfada benzersiz önek (aynı sayfada birden fazla illüstrasyonda gradient id çakışmasın) */
  uid: string;
  className?: string;
  tint?: number;
}) {
  const Scene = scenes[name];
  const tints = [
    ['var(--pastel-1)', 'var(--pastel-2)'],
    ['var(--pastel-3)', 'var(--pastel-1)'],
    ['var(--pastel-2)', 'var(--pastel-4)'],
  ][tint % 3];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 360"
      preserveAspectRatio="xMidYMid slice"
      className={cn('block size-full', className)}
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={tints[0]} />
          <stop offset="1" stopColor={tints[1]} />
        </linearGradient>
        <radialGradient id={`${uid}-beam`}>
          <stop offset="0" stopColor="var(--beam)" />
          <stop offset="1" stopColor="var(--beam)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-glow`}>
          <stop offset="0" stopColor="var(--rm-neon-glow)" />
          <stop offset="1" stopColor="var(--rm-neon-glow)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-tile`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--tile-from)" />
          <stop offset="1" stopColor="var(--tile-to)" />
        </linearGradient>
        <linearGradient id={`${uid}-slab`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--glass-strong-from)" />
          <stop offset="1" stopColor="var(--glass-strong-to)" />
        </linearGradient>
        <linearGradient id={`${uid}-ink`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0" stopColor="var(--ink-grad-from)" />
          <stop offset="1" stopColor="var(--ink-grad-to)" />
        </linearGradient>
        <pattern id={`${uid}-dots`} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="var(--grid-line)" />
        </pattern>
      </defs>
      <rect width="640" height="360" fill={`url(#${uid}-bg)`} />
      <rect width="640" height="360" fill={`url(#${uid}-dots)`} />
      <circle cx="560" cy="40" r="220" fill={`url(#${uid}-beam)`} />
      <Scene uid={uid} />
    </svg>
  );
}
