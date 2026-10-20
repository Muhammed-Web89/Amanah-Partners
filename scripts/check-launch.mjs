// Canlıya çıkış kapısı (plan v2 §19, prompt §12): production derlemesinden önce çalışır.
// Hukuki onay, açık kararlar ve teyitler kapanmadan NEXT_PUBLIC_SITE_ENV=production derlemesi durur.
import { readFileSync } from 'node:fs';

if (process.env.NEXT_PUBLIC_SITE_ENV !== 'production') process.exit(0);

const problems = [];
if (process.env.LEGAL_APPROVED !== 'yes') problems.push('Kapı 1: Yasal metinler avukat onayından geçmedi (LEGAL_APPROVED=yes değil).');
for (const key of ['NEXT_PUBLIC_TELEGRAM_SUPPORT', 'NEXT_PUBLIC_CONTACT_EMAIL', 'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'LEAD_HASH_SALT']) {
  if (!process.env[key]) problems.push(`Ortam değişkeni eksik: ${key}`);
}
for (const file of ['uz', 'ru', 'en'].map((l) => `content/${l}/legal.json`)) {
  if (readFileSync(file, 'utf8').includes('[KARAR')) problems.push(`${file} içinde [KARAR] yer tutucusu var.`);
}

if (problems.length) {
  console.error('\n✗ Canlıya çıkış kontrolü başarısız:\n' + problems.map((p) => '  - ' + p).join('\n') + '\n');
  process.exit(1);
}
console.log('✓ Canlıya çıkış kontrolü geçti.');
