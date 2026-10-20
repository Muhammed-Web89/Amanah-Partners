/**
 * Amanah Partners — Tailwind eşlemesi
 *
 * Değerlerin kendisi src/styles/tokens.css içindedir (açık + koyu tema).
 * Bu dosya yalnızca token'ları Tailwind sınıflarına bağlar: bg-paper, text-ink, border-rule…
 * Tailwind v4 ile src/styles/globals.css içindeki `@config` satırıyla yüklenir.
 *
 * Tip ölçeği: akışkan. Mobilde (360 px) taban 16 px ve oran 1.2; masaüstünde (1240 px)
 * taban 17 px ve oran 1.25. Ara genişliklerde doğrusal geçiş (clamp).
 * Boşluk: Tailwind'in 4 px ölçeği; bileşenler 8'in katlarını kullanır (2, 4, 6, 8, 12, 16…).
 *
 * @type {import('tailwindcss').Config}
 */
const fluid = (minPx, maxPx) => {
  const slope = (maxPx - minPx) / (1240 - 360);
  const intercept = minPx - slope * 360;
  return `clamp(${minPx / 16}rem, ${(intercept / 16).toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${maxPx / 16}rem)`;
};

export default {
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: 'var(--c-paper)', 2: 'var(--c-paper-2)', 3: 'var(--c-paper-3)' },
        ink: { DEFAULT: 'var(--c-ink)', 2: 'var(--c-ink-2)' },
        link: 'var(--c-link)',
        accent: { DEFAULT: 'var(--c-accent)', line: 'var(--c-accent-line)', soft: 'var(--c-accent-soft)', light: 'var(--c-accent-light)' },
        rule: { DEFAULT: 'var(--c-rule)', strong: 'var(--c-rule-strong)' },
        danger: { DEFAULT: 'var(--c-danger)', soft: 'var(--c-danger-soft)' },
        success: { DEFAULT: 'var(--c-success)', soft: 'var(--c-success-soft)' },
        action: {
          DEFAULT: 'var(--c-action)',
          hover: 'var(--c-action-hover)',
          active: 'var(--c-action-active)',
          text: 'var(--c-action-text)',
        },
        focus: 'var(--c-focus)',
      },

      fontFamily: {
        // next/font ile yüklenir; yedek yığınlar Özbekçe ʻ ʼ ve Kiril içeren sistem fontlarıdır.
        serif: ['var(--font-serif)', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['var(--font-sans)', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },

      fontSize: {
        // [boyut, satır aralığı]; adımlar: -1 … 5
        xs: [fluid(12.8, 13.6), { lineHeight: '1.45' }], // adım -1: etiket, not
        sm: [fluid(14, 15), { lineHeight: '1.5' }], // yardımcı metin
        base: [fluid(16, 17), { lineHeight: '1.6' }], // adım 0: gövde
        lg: [fluid(19.2, 21.25), { lineHeight: '1.5' }], // adım 1: giriş paragrafı, H4
        xl: [fluid(23.04, 26.56), { lineHeight: '1.3', letterSpacing: '-0.005em' }], // adım 2: H3
        '2xl': [fluid(27.65, 33.2), { lineHeight: '1.22', letterSpacing: '-0.01em' }], // adım 3: H2
        '3xl': [fluid(33.18, 41.5), { lineHeight: '1.15', letterSpacing: '-0.015em' }], // adım 4: iç sayfa H1
        display: [fluid(28, 48), { lineHeight: '1.14', letterSpacing: '-0.015em' }], // hero H1 (uzun Özbekçe başlık için mobilde küçük)
      },

      spacing: {
        gutter: '1rem', // mobil kenar: 16 px
        'gutter-lg': '2rem',
        section: 'clamp(3.5rem, 2.5rem + 4vw, 6rem)', // 56 → 96 px
        'section-sm': 'clamp(2.5rem, 2rem + 2vw, 4rem)', // 40 → 64 px
        'header-h': '4rem',
        'nav-h': '2.75rem',
        'mobile-bar-h': '4.5rem',
      },

      maxWidth: {
        measure: '65ch', // gövde metni satır uzunluğu
        content: '75rem', // 1200 px
      },

      // Üç seviye: keskin (düğme, alan), yumuşak (panel, kart, menü), tam (durum etiketi)
      borderRadius: {
        sm: '2px',
        md: '6px',
        lg: '16px', // buzlu cam paneller
        full: '9999px',
      },

      boxShadow: {
        raised: 'var(--shadow-raised)',
        overlay: 'var(--shadow-overlay)',
        glass: 'var(--glass-shadow)',
      },

      transitionDuration: {
        fast: 'var(--dur-fast)',
        base: 'var(--dur-base)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
      },
    },
  },
};
