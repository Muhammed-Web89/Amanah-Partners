// Sayfa boyanmadan önce çalışır: kayıtlı tercih yoksa sistem temasını izler.
// Böylece karanlık modda açılışta beyaz ekran yanıp sönmez. "js" sınıfı: .reveal içerik yalnızca JS varken gizlenir.
const script = `(function(){var e=document.documentElement;e.classList.add('js');var t=null;try{t=localStorage.getItem('theme')}catch(x){}var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)e.classList.add('dark')})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
