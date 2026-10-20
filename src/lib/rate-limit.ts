import { createHash } from 'node:crypto';

// İstek hız sınırı: aynı IP'den 10 dakikada en fazla 5 başvuru.
// IP saklanmaz; tuzlu SHA-256 özeti kullanılır. Bellek içi sayaç tek sunucu örneği içindir;
// Supabase yapılandırılmışsa leads.ts aynı kontrolü veritabanında da yapar.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

export function hashIp(ip: string) {
  return createHash('sha256')
    .update(`${process.env.LEAD_HASH_SALT ?? 'amanah-dev-salt'}:${ip}`)
    .digest('hex')
    .slice(0, 32);
}

export function rateLimited(ipHash: string, now = Date.now()) {
  const recent = (hits.get(ipHash) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) return true;
  recent.push(now);
  hits.set(ipHash, recent);
  return false;
}

export const RATE_WINDOW_MS = WINDOW_MS;
export const RATE_LIMIT = LIMIT;
