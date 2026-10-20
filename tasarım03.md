## 3. Görev: "Nega aynan A-Level?" (Avantajlar) Bölümü Tasarımı

Bu adımda Hero Banner'ın hemen altındaki "Nega aynan A-Level?" bölümünü tasarlayacağız. Sitenin ana konsepti olan Glassmorfizm (Buzlu Cam) etkisini burada kart tasarımlarında kullanacağız.

**A. Arka Plan (Global Bütünlük):**
*   Sayfa beyaz zemin olmamalı. Yukarıdaki Hero bölümünden aşağıya doğru akan, çok yumuşak ve açık pastel tonlardaki (örn: açık mavi/gri/krem) hareketli degrade (gradient) arka plan bu bölümde de devam etmeli.

**B. Başlık Alanı:**
*   **"Nega aynan A-Level?"** başlığı ortalanmış, büyük ve kalın (bold) olmalı.
*   Başlığın arkasında çok hafif bir parlama (glow) efekti verilerek arka plandan ayrışması ve okunaklı olması sağlanmalı.

**C. Grid Yapısı ve Cam Kartlar (Glassmorphism Cards):**
*   Mevcut 4 madde, aralarına çizgi çekilmiş düz metinler yerine, **2x2 Grid (Izgara)** düzeninde dizilmiş 4 adet "Buzlu Cam Kart" içine yerleştirilmeli.
*   **Kart Özellikleri:** Yarı saydam beyaz arka plan, güçlü arka plan bulanıklığı (`backdrop-filter: blur(10px)`), çok ince beyaz/gri kenarlıklar (border) ve derinlik katan hafif dış gölge (box-shadow).
*   **Hover (Üzerine Gelme) Efekti:** Kullanıcı fareyle bu kartlardan birinin üzerine geldiğinde kart hafifçe yukarı kalkmalı (`transform: translateY(-5px)`) ve kenarlığı hafifçe parlamalı.

**D. Görsel/İkon Eklentileri (Her Kart İçin):**
Metinlerin sıkıcılığını kırmak için her cam kartın sol üst veya orta üst kısmına, konuyu temsil eden modern, minimalist ve hafif 3D görünümlü (veya neon hatlı) ikonlar/SVG'ler eklenmeli. İkon tanımları şunlardır:

1.  **Kart 1 (Foundation yili kerak emas):** *Görsel:* Hedefe doğrudan giden bir ok veya bir basamağı atlayan figür ikonu.
2.  **Kart 2 (Bir yil va bir yillik xarajatni tejang):** *Görsel:* Şık bir kum saati ve yanında bir madeni para/cüzdan ikonu (zaman ve para tasarrufu).
3.  **Kart 3 (Germaniya va Italiyaga to'g'ri yo'l):** *Görsel:* Minimalist bir pusula veya Avrupa haritası üzerinde parlayan bir rota ikonu.
4.  **Kart 4 (Moslashuvchan va modulli):** *Görsel:* Birbiriyle iç içe geçen yapboz parçaları veya modüler bloklar ikonu.

**Komut:** Lütfen sadece bu "Avantajlar (A-Level)" bölümünün HTML/CSS yapısını, belirttiğim Glassmorfizm kartları, grid düzeni ve ikon yerleşimleriyle birlikte oluştur. İkonlar için şimdilik modern SVG kodları veya ikon kütüphanesi (FontAwesome/Lucide vb.) kullan.