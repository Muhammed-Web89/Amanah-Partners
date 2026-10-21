## 8. Görev: "Ko'p beriladigan savollar" (SSS - Akordeon) Bölümü Tasarımı

Bu adımda, sıkça sorulan soruların listelendiği akordeon yapısını[cite: 12] modernleştireceğiz. Klasik düz çizgilerden kurtulup, etkileşimli ve derinliği olan bir tasarım oluşturacağız.

**A. Soru Kutuları (Glassmorphism & Neomorphism Karışımı):**
*   Her bir soru maddesi ("Maktabni tark etmasdan A-Level olsam bo'ladimi?" vb.[cite: 12]) düz bir çizgi üzerinde değil, bağımsız ve genişletilebilir **Buzlu Cam Paneller** içinde yer almalı.
*   Panellerin kapalı halinde çok hafif bir arka plan bulanıklığı ve ince bir çerçevesi (border) olmalı.
*   Panellerin arasında boşluk (gap) bırakarak birbirlerinden bağımsız kartlar hissi yarat.

**B. Etkileşim ve Animasyon (Açılma Efekti):**
*   **Hover (Üzerine Gelme):** Kullanıcı bir sorunun üzerine geldiğinde, panel hafifçe parlamalı ve sağdaki ok ikonu (chevron) aşağı doğru hafifçe esnemeli.
*   **Aktif/Açık Durum:** Bir panel tıklandığında (açıldığında), kart hafifçe büyümeli (`scale: 1.01`) ve arka planındaki cam efekti daha belirginleşmeli (örneğin karanlık temada biraz daha açık bir lacivert tonu almalı).
*   **Cevap Metni Geçişi:** Açılan kısmın içindeki cevap metni ("Ha. Darslar kechqurun..."[cite: 12]) aniden belirlememeli; yukarıdan aşağıya doğru süzülerek pürüzsüz bir animasyonla (smooth slide-down ve fade-in) açılmalı.

**C. İkonografi ve Tipografi:**
*   Soru başlıkları okunaklı ve hafif kalın (semi-bold) olmalı.
*   Sağ taraftaki basit oklar `v` veya `^` yerine[cite: 12], modern dairesel ikonlar veya animasyonlu artı/eksi (`+` / `-`) işaretleri kullan. Panel açıldığında ikon kendi ekseninde dönerek şekil değiştirmeli (örneğin `+` dönerken `-` veya `x` olmalı).

**D. Link Vurgusu:**
*   Cevabın altındaki "A-Level dasturi ->" veya en alttaki "Barcha savollar ->" linkleri[cite: 12] düz metin olmaktan çıkarılmalı. Üzerine gelindiğinde altı çizilen, okun yan tarafa doğru kaydığı modern buton veya şık metin bağlantıları (inline link hover effects) şeklinde tasarlanmalı.

**Komut:** Bu talimatlara uygun olarak, HTML, CSS ve pürüzsüz açılma animasyonlarını yönetecek minimal bir JavaScript kodu ile SSS (Akordeon) bölümünü yeniden oluştur.