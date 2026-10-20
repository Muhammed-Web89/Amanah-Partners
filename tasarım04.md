## 4. Görev: "Siz faqat o'qing..." (Hizmet ve Görev Dağılımı) Bölümü Tasarımı

Bu adımda, kullanıcının "Ne hizmet alıyorum ve bunu kim yapıyor?" sorusuna cevap veren tablo bölümünü tasarlayacağız. Düz, sıkıcı çizgilerden oluşan tablo yapısından tamamen kurtulup, güçlü Glassmorfizm ve hareketli arka plan ile etkileşimli bir liste oluşturacağız.

**A. Arka Plan (Soft Kareli Defter Efekti):**
*   Bu bölümün arka planına, eğitimi ve planlamayı simgeleyen çok hafif, yumuşak bir "kareli defter/ızgara" (grid) deseni ekle.
*   *Teknik İpucu:* CSS ile çok açık gri/mavi tonlarında ince grid çizgileri oluştur (`background-image: linear-gradient...`). Bu grid sabit kalsın, ancak gridin arkasından çok yavaş hareket eden pastel bir ışık kümesi (glow) geçsin, böylece sayfa canlı hissettirsin.

**B. Başlık Alanı:**
*   "KIM NIMANI OLIB BORADI?" üst başlığı ve "Siz faqat o'qing, qolganini biz hal qilamiz." ana başlığı vurgulu bir şekilde ortalansın. Başlık metinlerinin arkasında okunabilirliği artıran çok hafif bir parlama (text-shadow) olsun.

**C. Dinamik Satırlar (Buzlu Cam Efekti):**
*   Mevcut "XIZMAT", "KIM OLIB BORADI?" ve "QANDAY ISHLAYDI?" sütunlarından oluşan tabloyu iptal et. Bunun yerine, her bir hizmet kalemi (Onlayn darslar, Imtihon, Universitetga hujjat...) için alt alta sıralanmış, geniş ve yatay **Buzlu Cam (Glassmorphism) Paneller** oluştur.
*   **Buzlu Cam Gücü Artırılmalı:** Bu alanda `backdrop-filter: blur(16px)` gibi daha yüksek bir bulanıklık değeri kullan. Panellerin arka plan rengi daha şeffaf (`rgba(255, 255, 255, 0.1)`) olsun, böylece arkadaki kareli defter deseni camın içinden çok şık bir şekilde kırılarak görünsün.
*   **İçerik Yerleşimi (Grid/Flex):** Her bir yatay panelin içi üç eşit veya orantılı sütuna bölünsün:
    1.  *Sol:* Hizmet Adı (Büyük ve ikonlu)
    2.  *Orta:* Kimin üstlendiği (Amanah Partners vb. - rozet/badge tasarımıyla vurgulu)
    3.  *Sağ:* Nasıl çalıştığı (Kısa, okunabilir metin)

**D. Hareket ve Etkileşim (Hover Efektleri):**
*   Kullanıcı fare ile bu yatay cam panellerden birinin üzerine geldiğinde (hover) statik kalmasın.
*   **Görsel Tepki:** Üzerine gelinen panel hafifçe büyüsün (`scale: 1.02`), panelin içini dolduran buzlu cam efekti biraz daha aydınlansın ve panelin dış kenarlığı (border) neon/pastel bir mavi renkle parlasın.
*   Sıra dışındaki paneller ise odaklanmayı artırmak için çok hafifçe soluklaşsın (opacity düşsün).

**Komut:** Klasik tablo kodları (`<table>`, `<tr>` vb.) KULLANMA. Modern CSS Grid veya Flexbox ile yatay, etkileşimli, yoğun buzlu cam efektine sahip "Soft Kareli Defter" konseptli bu yapıyı oluştur.