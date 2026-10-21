## 7. Görev: "Birinchi suhbatdan kampusgacha olti qadam" Bölümü Tasarımı

Bu adımda, 6 aşamalı süreci gösteren yatay zaman çizelgesini[cite: 10, 11] modern, etkileşimli ve Glassmorfizm (Buzlu Cam) stiline uygun hale getireceğiz. Bu bölümün hem aydınlık hem de karanlık tema ile uyumlu çalışması gerekiyor.

**A. Yapısal Değişim (Yataydan Dikeye/Sarmal Geçiş):**
*   Mevcut düz yatay çizgiyi[cite: 10, 11] iptal et. Bunun yerine, kullanıcı sayfayı aşağı kaydırdıkça (scroll) aktifleşen, dikey ve hafif kıvrımlı (s veya z şeklinde) inen bir yol haritası (roadmap) kurgusu oluştur.
*   Bu sayede mobil cihazlarda da mükemmel bir görünüm ve okunabilirlik elde edeceğiz.

**B. Adım Kartları (Glassmorphism):**
*   6 adımın her biri[cite: 10, 11] ("Bepul konsultatsiya...", "Ingliz tili...", "Yo'nalish..." vb.) ayrı birer **Buzlu Cam Kart** içine yerleştirilmeli.
*   **Aydınlık Tema:** Kartların arka planı çok hafif saydam beyaz, güçlü blur (`backdrop-filter: blur(12px)`) ve ince gri kenarlık.
*   **Karanlık Tema:** Kartların arka planı saydam koyu lacivert/gri (`rgba(25, 30, 45, 0.6)`), güçlü blur ve parlayan ince mavi/cyan kenarlık.

**C. Etkileşim ve Animasyon (Scroll-Triggered):**
*   Sayfa yüklendiğinde tüm adımlar görünür olmasın. Kullanıcı aşağı doğru kaydırdıkça, sıradaki adım kartı sağdan veya soldan yumuşak bir şekilde süzülerek (fade-in ve slide-up) ekrana gelsin.
*   Yol haritasını birbirine bağlayan dikey çizgi, kullanıcı kaydırdıkça yukarıdan aşağıya doğru bir neon ışık gibi dolmaya (progress) başlasın.

**D. İkonografi:**
*   Mevcut durumda sadece rakamlar var (1, 2, 3...)[cite: 10, 11]. Rakamları daha büyük ve estetik bir tipografiyle kartın sol üstüne yerleştir.
*   Rakamların yanına, her adımın içeriğini destekleyen minimalist, hafif parlak ikonlar ekle.

**Komut:** Bu dikey, scroll tetiklemeli ve tam uyumlu (responsive) Glassmorfizm zaman çizelgesini HTML/CSS (ve gerekli minimal JS ile) oluştur. Hem karanlık hem de aydınlık mod değişkenlerini (CSS variables) koda dahil et.