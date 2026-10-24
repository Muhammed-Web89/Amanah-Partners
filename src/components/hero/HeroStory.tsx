'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { RouteDiagram } from '@/components/ui/RouteDiagram';
import { cn } from '@/lib/cn';
import { HeroBackdrop } from './HeroBackdrop';
import { IllustrationDefs, StepIllustration, scenes } from './StepIllustration';
import { StoryStepper } from './StoryStepper';

// tasarım01 §2 + tasarım02 + tasarım06: hero + kaydırma hikâyesi.
// Hikâye modunda üç sütun: adım metni (dikey ortalı) | dikey ilerleme çubuğu | adım illüstrasyonu.
// tasarım06: fotoğraflar kaldırıldı; her adımın cam/3D illüstrasyonu (StepIllustration). Sahne 0 = açılış,
// 1–5 = content/*/home.json → hero.route sırası.

// Hikâye modu yalnızca geniş ve yeterince yüksek ekranda, hareket tercihi açıkken.
// Aksi halde (mobil, JS yok, "hareketi azalt") aynı içerik statik düzende kalır.
const storyQuery = '(min-width: 64rem) and (min-height: 42rem) and (prefers-reduced-motion: no-preference)';

const FADE_END = 0.12; // kaydırmanın ilk %12'sinde metin paneli yukarı kayıp kaybolur
const SCROLL_SCREENS = 3.6; // hikâyenin kaydırma uzunluğu (ekran yüksekliği cinsinden)

type Props = { label: string; stops: string[]; details: string[]; children: ReactNode };

export function HeroStory({ label, stops, details, children }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [story, setStory] = useState(false);
  const [checked, setChecked] = useState(false); // hikâye kararı verildi mi (statik şerit yalnızca sonra görünür)
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const mq = window.matchMedia(storyQuery);
    // Metin paneli sahneye (ekran − üst menü) sığmıyorsa hikâye kapalı kalır: kesik metin olmaz.
    const fits = () => {
      const header = document.querySelector('header')?.offsetHeight ?? 0;
      return (cardRef.current?.offsetHeight ?? Infinity) + 24 <= window.innerHeight - header;
    };
    const update = () => {
      setStory(mq.matches && fits());
      setChecked(true);
    };
    update();
    mq.addEventListener('change', update);
    window.addEventListener('resize', update);
    return () => {
      mq.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!story || !section || !card) {
      card?.removeAttribute('style');
      setActive(-1);
      return;
    }

    // Sabit üst menünün yüksekliği: sahne onun hemen altına yapışır
    const header = document.querySelector('header');
    const setOffset = () => section.style.setProperty('--story-top', `${header?.offsetHeight ?? 0}px`);
    setOffset();

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const distance = rect.height - (window.innerHeight - (header?.offsetHeight ?? 0));
        const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, distance)));

        const fade = Math.min(1, p / FADE_END);
        card.style.opacity = String(1 - fade);
        card.style.transform = `translate3d(0, ${-fade * 120}px, 0)`;
        card.style.visibility = fade >= 1 ? 'hidden' : '';

        const next = p < FADE_END ? -1 : Math.min(stops.length - 1, Math.floor(((p - FADE_END) / (1 - FADE_END)) * stops.length));
        setActive(next);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', setOffset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', setOffset);
    };
  }, [story, stops.length]);

  const revealed = story && active >= 0;
  const total = String(stops.length).padStart(2, '0');

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative isolate"
      style={story ? { height: `calc(100svh - var(--story-top, 0px) + ${SCROLL_SCREENS * 100}svh)` } : undefined}
    >
      <div
        className={cn(
          'relative isolate flex items-center overflow-hidden lg:min-h-[calc(100svh-6.875rem)]',
          story && 'sticky top-[var(--story-top)] h-[calc(100svh-var(--story-top))]',
        )}
      >
        <HeroBackdrop fade="bottom" travel />

        <div
          className={cn(
            'container-page grid w-full gap-6 py-6 sm:gap-10 sm:py-12 lg:items-center lg:py-6',
            // Statik düzende sol sütun, hikâyedeki "metin + çubuk" genişliğine eşit: sığma ölçümü iki düzende aynı
            story
              ? 'grid-cols-[minmax(0,1fr)_11rem_minmax(0,24rem)] gap-8 xl:grid-cols-[minmax(0,1fr)_12rem_minmax(0,27rem)] xl:gap-12'
              : 'lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] xl:gap-12',
          )}
        >
          {/* Sol (hikâyede ilk iki sütun): buzlu cam metin paneli; kaydırınca yukarı kayıp kaybolur */}
          <div className={cn('relative z-10', story && 'col-span-2 col-start-1 row-start-1')}>
            <div ref={cardRef} className="glass rounded-lg p-6 will-change-transform sm:p-8 xl:p-9">
              {children}
            </div>
          </div>

          {/* tasarım02 §A: panel kaybolunca her adımın numarası, adı ve 2–3 cümlelik açıklaması; dikey ortalı.
              Beş blok üst üste durur, yalnızca aktif olan görünür. Hepsi ekran okuyucuya açık. */}
          {story && (
            <div className="col-start-1 row-start-1 grid self-center">
              {stops.map((stop, i) => (
                <div
                  key={stop}
                  className={cn(
                    'glass-strong col-start-1 row-start-1 self-center rounded-lg p-8 transition-[opacity,transform] duration-700 ease-out',
                    i === active
                      ? 'translate-y-0 opacity-100'
                      : i < active
                        ? '-translate-y-6 opacity-0'
                        : 'translate-y-6 opacity-0',
                  )}
                >
                  <p className="label-caps text-accent">{label}</p>
                  <p className="tabular mt-4 font-serif text-6xl leading-none font-semibold text-ink xl:text-7xl">
                    {String(i + 1).padStart(2, '0')}
                    <span className="text-2xl text-ink-2"> / {total}</span>
                  </p>
                  <h2 className="mt-5 text-3xl xl:text-4xl">{stop}</h2>
                  <p className="mt-4 max-w-[46ch] text-lg text-ink-2">{details[i]}</p>
                </div>
              ))}
            </div>
          )}

          {/* tasarım02 §B: metin ile görsel arasında bağımsız dikey ilerleme çubuğu; panel kaybolunca aşağıdan süzülür */}
          {story && (
            <StoryStepper
              label={label}
              stops={stops}
              active={active}
              className={cn(
                'col-start-2 row-start-1 h-[min(34rem,calc(100svh-var(--story-top)-6rem))] self-center transition-[opacity,transform] duration-700 ease-out',
                revealed ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-10 opacity-0',
              )}
            />
          )}

          {/* Dar ekran (< 1024 px, metnin altına düşen düzen): yüzen cam kare ve 3D ikon tamamen kaldırıldı.
              Mobilde (< 768 px) "Universitetgacha 5 qadam" listesi de gizli (süreç aşağıdaki 6 adımlı yol haritasında
              ve Qanday ishlaymiz sayfasında anlatılır), bu yüzden sütunun tamamı gizlenir: boş ızgara aralığı kalmaz. */}
          {/* Sağ: cam sahne üzerinde adım illüstrasyonu (çapraz geçiş). Statik düzende açılış sahnesi + yol kutusu. */}
          <div className={cn('relative max-md:hidden', story && 'col-start-3 row-start-1')}>
            <div
              aria-hidden="true"
              className="absolute -inset-12 -z-10 rounded-full blur-3xl max-lg:hidden"
              style={{ background: 'radial-gradient(closest-side, var(--beam), transparent 75%)' }}
            />
            <div className="glass-strong relative mx-auto aspect-square w-full overflow-hidden rounded-lg max-lg:hidden">
              <IllustrationDefs />
              {scenes.map((scene, i) => (
                <StepIllustration key={i} scene={scene} active={i === (story ? active + 1 : 0)} />
              ))}
            </div>
            {!story && <RouteDiagram label={label} stops={stops} details={details} className="glass animate-rise-in lg:hidden" />}
          </div>

          {/* Statik düzen, geniş ekran (hareketi azalt / alçak ekran): adımlar yatay şeritte.
              Hikâye kararından önce gizli: masaüstünde açılışta içerik kaymasın (CLS). */}
          {!story && (
            <ol
              aria-label={label}
              className={cn('hidden gap-4 lg:col-span-2 lg:grid-cols-5 lg:motion-reduce:grid', checked && 'lg:grid')}
            >
              {stops.map((stop, i) => (
                <li key={stop} className="glass rounded-lg p-5">
                  <p className="tabular font-serif text-2xl font-semibold text-accent">{String(i + 1).padStart(2, '0')}</p>
                  <p className="mt-2 font-semibold text-ink">{stop}</p>
                  <p className="mt-2 text-sm text-ink-2">{details[i]}</p>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
