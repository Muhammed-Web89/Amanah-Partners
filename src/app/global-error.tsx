'use client';

// Kök düzeyde hata (layout da çöktüğünde): çeviri yüklenemeyebilir, bu yüzden üç dil birlikte.
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="uz-Latn">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, padding: '48px 16px', color: '#13202f', background: '#fff' }}>
        <main style={{ maxWidth: 640, margin: '0 auto' }}>
          <p style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', borderTop: '1px solid #13202f', paddingTop: 12 }}>500</p>
          <h1 lang="uz-Latn">Nimadir notoʻgʻri ketdi</h1>
          <p lang="ru">Что-то пошло не так.</p>
          <p lang="en">Something went wrong.</p>
          <p>
            <button type="button" onClick={reset} style={{ minHeight: 48, padding: '0 20px', background: '#13202f', color: '#fff', border: 0, borderRadius: 2, fontWeight: 600 }}>
              Qayta urinish · Ещё раз · Try again
            </button>
          </p>
          <p>
            <a href="/uz">Bosh sahifa</a> · <a href="/ru">Главная</a> · <a href="/en">Home</a>
          </p>
        </main>
      </body>
    </html>
  );
}
