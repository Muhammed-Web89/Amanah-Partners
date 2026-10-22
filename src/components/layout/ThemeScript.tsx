'use client';

// Sayfa boyanmadan önce çalışır: kayıtlı tercih yoksa sistem temasını izler.
// Böylece karanlık modda açılışta beyaz ekran yanıp sönmez.
const script = `(function(){var t=null;try{t=localStorage.getItem('theme')}catch(e){}var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')})()`;

// Betik yalnızca sunucu HTML'inde çalışır. Dil değişince React <html>'i istemcide yeniden kurar; o anda
// çalıştırılabilir <script> üretirse React konsola hata yazar (betik zaten çalışmaz, işi ThemeSync yapar).
// Bu yüzden istemcide "text/plain" veri bloğu olur; hidrasyondaki type farkı suppressHydrationWarning ile susturulur.
export function ThemeScript() {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
