import type { SVGProps } from 'react';

// tasarım09 §10: ülke kartları için minimalist, tek çizgili simge ikonları (24×24, Lucide çizgi diliyle uyumlu).
// Dekoratif; ülke adı metin olarak yanında.
type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

// Buyuk Britaniya: Big Ben
export function BigBen(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 1.5 9.5 6h5L12 1.5Z" />
      <path d="M9.5 6h5v4h-5z" />
      <circle cx="12" cy="8" r="1.2" />
      <path d="M9 10h6v12H9z" />
      <path d="M10.5 13h3M10.5 16h3M10.5 19h3" />
      <path d="M6 22h12" />
    </Svg>
  );
}

// AQSh: Ozodlik haykali
export function Liberty(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M16.5 2.5 17 5" />
      <path d="M15.5 2.2c.6-.5 1.6-.4 2 .3" />
      <path d="M16.8 5 14 9.5" />
      <path d="M10 6.5 9.4 5M12 6l.2-1.6M13.8 6.6l1-1.2" />
      <circle cx="12" cy="8.2" r="1.6" />
      <path d="M10.5 10.5 9 17h6l-1.5-6.5" />
      <path d="M8 17h8v2.5H8z" />
      <path d="M6.5 22l1.5-2.5h8l1.5 2.5z" />
    </Svg>
  );
}

// Germaniya: Brandenburg darvozasi
export function Brandenburg(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M10 3.5h4v2h-4z" />
      <path d="M3 5.5h18v3H3z" />
      <path d="M4.5 8.5V20M7.5 8.5V20M10.5 8.5V20M13.5 8.5V20M16.5 8.5V20M19.5 8.5V20" />
      <path d="M2.5 20h19v1.5h-19z" />
    </Svg>
  );
}

// Italiya: Kolizey
export function Colosseum(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.5 8.5c0-2 4.3-3.5 9.5-3.5s9.5 1.5 9.5 3.5V20h-19z" />
      <path d="M2.5 13h19M2.5 8.5h19" />
      <path d="M5 13v-2a1 1 0 0 1 2 0v2M9 13v-2a1 1 0 0 1 2 0v2M13 13v-2a1 1 0 0 1 2 0v2M17 13v-2a1 1 0 0 1 2 0v2" />
      <path d="M5 20v-3.5a1 1 0 0 1 2 0V20M9 20v-3.5a1 1 0 0 1 2 0V20M13 20v-3.5a1 1 0 0 1 2 0V20M17 20v-3.5a1 1 0 0 1 2 0V20" />
    </Svg>
  );
}

// Niderlandiya: shamol tegirmoni
export function Windmill(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 9 5 2.5M12 9l7-6.5M12 9l-6.5 7M12 9l6.5 7" />
      <circle cx="12" cy="9" r="1" />
      <path d="M10 11.5 8.5 21.5h7L14 11.5" />
      <path d="M11 21.5v-3a1 1 0 0 1 2 0v3" />
      <path d="M5 21.5h14" />
    </Svg>
  );
}

// Kanada: zarang bargi
export function MapleLeaf(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 2.5 10.6 5.4 8.8 4.6l.8 4.7-2.3-1.6-.6 1.6-2.9-.6 1 2.8-1.3.7 4.1 3.4-.6 1.7 4.2-.7.1 4.4h1.4l.1-4.4 4.2.7-.6-1.7 4.1-3.4-1.3-.7 1-2.8-2.9.6-.6-1.6-2.3 1.6.8-4.7-1.8.8z" />
      <path d="M12 16.4v5.1" />
    </Svg>
  );
}
