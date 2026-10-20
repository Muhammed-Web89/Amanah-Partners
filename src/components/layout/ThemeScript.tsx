// Sayfa boyanmadan önce çalışır: kayıtlı tercih yoksa sistem temasını izler.
// Böylece karanlık modda açılışta beyaz ekran yanıp sönmez.
const script = `(function(){var t=null;try{t=localStorage.getItem('theme')}catch(e){}var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
