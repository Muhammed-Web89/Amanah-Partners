import {
  Award,
  BookOpen,
  BookUser,
  FileCheck2,
  FileText,
  Globe2,
  GraduationCap,
  Landmark,
  Mail,
  MapPin,
  MonitorPlay,
  Plane,
  ShieldCheck,
  Sigma,
  Sparkles,
  Stamp,
  Star,
  Trees,
  University,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/cn';

// tasarım06 §A: fotoğraflar yerine her adım için cam + "3D render" hissi veren minimalist kompozisyon.
// Ana nesne: perspektifle eğik duran kalın cam karo (degrade dolgu, parlak üst kenar, kalınlık gölgesi).
// Etrafında süzülen küçük cam çipler. Tamamen dekoratif (aria-hidden); anlamı adım metni taşır.

type Scene = {
  main: LucideIcon;
  chips: [LucideIcon, LucideIcon, LucideIcon];
  route?: boolean; // vize: pasaporttan çıkan uçuş rotası
  seal?: boolean; // belgeler: zarf üzerinde mühür
};

// Sıra: 0 = açılış (hikâye başlamadan), 1–5 = home.json → hero.route
export const scenes: Scene[] = [
  { main: GraduationCap, chips: [Globe2, BookOpen, Sparkles] },
  { main: MonitorPlay, chips: [BookOpen, Sigma, Globe2] },
  { main: Award, chips: [FileCheck2, ShieldCheck, Star] },
  { main: Mail, chips: [FileText, Landmark, Sparkles], seal: true },
  { main: BookUser, chips: [Stamp, Plane, MapPin], route: true },
  { main: University, chips: [GraduationCap, Users, Trees] },
];

const chipSpots = [
  'top-[12%] left-[10%] rotate-[-8deg]',
  'top-[18%] right-[8%] rotate-[10deg]',
  'bottom-[14%] left-[16%] rotate-[6deg]',
];

const gradientStroke = 'url(#ill-ink)';

export function IllustrationDefs() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <defs>
        <linearGradient id="ill-ink" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0" stopColor="var(--ink-grad-from)" />
          <stop offset="1" stopColor="var(--ink-grad-to)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function StepIllustration({ scene, active, className }: { scene: Scene; active: boolean; className?: string }) {
  const Main = scene.main;
  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute inset-0 transition-[opacity,transform] duration-700 ease-out',
        active ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0',
        className,
      )}
    >
      {/* Arka ışık halkası */}
      <div
        className="absolute inset-[12%] rounded-full blur-2xl"
        style={{ background: 'radial-gradient(closest-side, var(--beam), transparent 70%)' }}
      />

      {/* Vize: pasaporttan yükselen kesik çizgili uçuş rotası */}
      {scene.route && (
        <svg viewBox="0 0 400 400" className="absolute inset-0 size-full">
          <path
            d="M200 250 C 230 150, 300 110, 350 70"
            fill="none"
            stroke="var(--c-accent-line)"
            strokeWidth="2.5"
            strokeDasharray="6 10"
            strokeLinecap="round"
            className="animate-dash"
          />
        </svg>
      )}

      {/* Ana nesne: 3D cam karo */}
      {/* Dış katman süzülür, iç katman perspektifle eğik durur (iki transform çakışmasın) */}
      <div className="animate-float absolute inset-0 grid place-items-center [perspective:900px]">
        <div
          className="relative grid size-[46%] place-items-center rounded-[28%] [transform:rotateX(12deg)_rotateY(-16deg)]"
          style={{
            background: 'linear-gradient(145deg, var(--tile-from), var(--tile-to))',
            boxShadow:
              'inset 0 2px 0 var(--glass-highlight), inset 0 -10px 24px -12px var(--tile-edge), 0 14px 0 -4px var(--tile-edge), var(--glass-depth)',
          }}
        >
          {/* Cam parıltısı */}
          <span className="absolute inset-x-[12%] top-[8%] h-[30%] rounded-full bg-gradient-to-b from-white/70 to-transparent opacity-70 dark:from-white/15" />
          <Main strokeWidth={1.25} stroke={gradientStroke} className="relative size-[55%] drop-shadow-[0_6px_10px_var(--beam)]" />
          {scene.seal && (
            <span className="absolute -right-[6%] -bottom-[6%] grid size-[30%] place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#f3d48a,#b8860b)] shadow-[0_6px_14px_-4px_rgb(120_80_10/0.5)]">
              <Star strokeWidth={1.75} className="size-1/2 fill-white/40 text-white" />
            </span>
          )}
        </div>
      </div>

      {/* Süzülen cam çipler */}
      {scene.chips.map((Chip, i) => (
        <span
          key={i}
          className={cn('glass-strong animate-float absolute grid size-[18%] place-items-center rounded-[30%]', chipSpots[i])}
          style={{ animationDelay: `${-i * 3.5}s` }}
        >
          <Chip strokeWidth={1.5} stroke={gradientStroke} className="size-1/2" />
        </span>
      ))}
    </div>
  );
}
