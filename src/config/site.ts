// Plan v2 §20: açık kararlar ve teyitler. Bilgi kesinleşince yalnızca bu dosya ya da
// ortam değişkenleri güncellenir. `null` olan alan canlıda gizlenir, staging'de işaretli görünür.

export const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV === 'production' ? 'production' : 'staging';
export const isStaging = siteEnv === 'staging';

export const site = {
  name: 'Amanah Partners',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://amanahpartners.net',

  telegram: {
    // [KARAR 3] Destek hesabı kullanıcı adı (ör. "amanahpartners_support", @ olmadan)
    supportUsername: process.env.NEXT_PUBLIC_TELEGRAM_SUPPORT ?? null,
    // [KARAR 3] Duyuru kanalı kullanıcı adı
    channelUsername: process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL ?? null,
  },
  // [KARAR 4] Kurumsal e-posta
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? null,
  // [KARAR 3] Çalışma saatleri, Taşkent saati (UTC+5). Ör. "Du–Ju 10:00–19:00"
  hours: null as string | null,
  // [KARAR 2] Form yanıt süresi sözü. Ör. "1 ish kuni" — dil bazlı metin messages içinde
  responseTimeKnown: false,
  // Şirket unvanı, vergi no., adres: kuruluş sonrası
  company: null as { legalName: string; taxId: string; address: string } | null,
} as const;

// [TEYİT] maddeleri. `false` olan bölümler canlıda hiç görünmez; staging'de "teyit bekliyor" notuyla görünür.
export const verified = {
  faydalanName: false, // TEYİT 1: Faydalan adı, ortak ağ ve partnerler
  universityList: false, // TEYİT 1: "öğrencilerimizin yol aldığı üniversiteler"
  centre91667: false, // TEYİT 2: ABC Horizon üzerinden kayıt
  uzbekistanCentres: false, // TEYİT 3
  courseList: false, // TEYİT 5: sunulan A-Level / IGCSE ders listesi
  btec: false, // TEYİT 6
  netherlandsCanada: false, // TEYİT 8
  weeklyHours: false, // KARAR 5: haftalık ders saatleri
} as const;

export type VerifiedKey = keyof typeof verified;

/** Bölüm gösterilsin mi? Canlıda yalnızca teyitli olanlar; staging'de hepsi (notla). */
export function shows(key: VerifiedKey) {
  return verified[key] || isStaging;
}

export function telegramUrl(username: string | null) {
  return username ? `https://t.me/${username}` : null;
}
