// Metin kontrolü (prompt §8, plan v2 §18). Kullanım: npm run check:content
//  1. Yapı: ru ve en içerik dosyaları uz ile aynı anahtar ve dizi uzunluğunda mı?
//  2. Özbekçe yazım: oʻ/gʻ için U+02BB (ʻ), tutuq belgisi için U+02BC (ʼ); düz kesme işareti yok.
//  3. Yasak ifadeler: garanti/kafolat/гарант/guarantee, "100%", "son fırsat", BMAT, rakamla fiyat, UZ/RU'da "KVKK".
//     Bunlar uyarıdır: olumsuz kullanım ("garanti vermeyiz") serbesttir, her biri elle gözden geçirilir.
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const locales = ['uz', 'ru', 'en'];
const errors = [];
const warnings = [];

// Ekip notları (staging) Türkçedir; bu alanlar dil kontrollerinden muaf.
const TEAM_KEYS = new Set(['draftNotice', 'code', 'id', 'faqIds']);
const isTeamNote = (s) => /^\[?(KARAR|TEYİT)|Örnek üniversite|Güncel kabul/.test(s);

function shape(a, b, where) {
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return errors.push(`${where}: dizi bekleniyordu`);
    if (a.length !== b.length) errors.push(`${where}: dizi uzunluğu ${a.length} ≠ ${b.length}`);
    a.forEach((x, i) => b[i] !== undefined && shape(x, b[i], `${where}[${i}]`));
  } else if (a && typeof a === 'object') {
    if (!b || typeof b !== 'object') return errors.push(`${where}: nesne bekleniyordu`);
    for (const k of Object.keys(a)) {
      if (!(k in b)) errors.push(`${where}.${k}: eksik`);
      else shape(a[k], b[k], `${where}.${k}`);
    }
    for (const k of Object.keys(b)) if (!(k in a)) errors.push(`${where}.${k}: uz'da yok`);
  }
}

function strings(node, out = [], key = '') {
  if (typeof node === 'string') {
    if (!TEAM_KEYS.has(key) && !isTeamNote(node)) out.push(node);
  } else if (Array.isArray(node)) node.forEach((n) => strings(n, out, key));
  else if (node && typeof node === 'object') for (const [k, v] of Object.entries(node)) strings(v, out, k);
  return out;
}

const files = readdirSync('content/uz').filter((f) => f.endsWith('.json'));
const all = {};
for (const l of locales) {
  all[l] = {};
  for (const f of files) all[l][f] = JSON.parse(readFileSync(`content/${l}/${f}`, 'utf8'));
  all[l]['messages'] = JSON.parse(readFileSync(`messages/${l}.json`, 'utf8'));
}
for (const l of ['ru', 'en']) {
  for (const f of [...files, 'messages']) shape(all.uz[f], all[l][f], `${l}/${f}`);
}

// Rehber yazıları: her yazı üç dilde olmalı
for (const id of readdirSync('content/guides')) {
  for (const l of locales) {
    try {
      readFileSync(`content/guides/${id}/${l}.md`);
    } catch {
      warnings.push(`content/guides/${id}: ${l}.md yok`);
    }
  }
}
const guideText = (l) =>
  readdirSync('content/guides').flatMap((id) => {
    try {
      return [readFileSync(`content/guides/${id}/${l}.md`, 'utf8')];
    } catch {
      return [];
    }
  });

// Özbekçe kesme işaretleri
const ALLOWED_APOSTROPHE = ["King’s", "you've"];
for (const [file, data] of Object.entries(all.uz)) {
  for (const s of [...strings(data), ...(file === 'messages' ? [] : [])]) checkUz(s, `uz/${file}`);
}
for (const md of guideText('uz')) md.split('\n').forEach((line) => !line.startsWith('  - Pearson') && checkUz(line, 'guides/*/uz.md'));

function checkUz(s, where) {
  let t = s;
  for (const a of ALLOWED_APOSTROPHE) t = t.replaceAll(a, '');
  if (/[A-Za-zʻʼ]['‘’`][A-Za-z]/.test(t)) errors.push(`${where}: düz/tipografik kesme işareti → "${ctx(t, /[A-Za-z]['‘’`][A-Za-z]/)}"`);
  if (/(?<![oOgG])ʻ/.test(t)) errors.push(`${where}: ʻ (U+02BB) yalnızca oʻ, gʻ için → "${ctx(t, /(?<![oOgG])ʻ/)}"`);
  if (/[oOgG]ʼ(?=[a-z])/.test(t) && !/(maʼ|taʼ|saʼ|eʼ|naʼ|sanʼ|masʼ)/.test(t)) warnings.push(`${where}: oʼ/gʼ (U+02BC) — oʻ/gʻ (U+02BB) olmalı mı? → "${ctx(t, /[oOgG]ʼ/)}"`);
  if (/KVKK/.test(t)) errors.push(`${where}: Özbekçe arayüzde "KVKK" kullanılmaz (plan §16)`);
}

// Yasak ifadeler
const BANNED = [
  [/kafolat|гарант|guarante|garanti/i, 'garanti ifadesi (olumsuz kullanım serbest, kontrol edin)'],
  [/100\s?%|%\s?100/, '"%100" sonuç vaadi'],
  [/son fırsat|oxirgi imkoniyat|последний шанс|last chance|kontenjan|oʻrinlar tugayapti/i, 'sahte aciliyet'],
  [/BMAT/, 'BMAT kaldırıldı; UCAT/IMAT yazılmalı'],
  [/\d[\d\s.,]*\s?(\$|€|USD|EUR|soʻm|сум|so'm|руб)|(\$|€)\s?\d/i, 'rakamla fiyat'],
  [/eng arzon|самый дешёвый|cheapest|en ucuz/i, 'doğrulanamayan karşılaştırmalı fiyat'],
  [/(?<!Maxfiylik |Cookie )siyosat(?!i)|(?<!-)политик(?![аеиуой]* (конфиденциальности|cookie|каждого))|politic/i, 'siyasi içerik?'],
];
for (const l of locales) {
  const texts = [...Object.entries(all[l]).flatMap(([f, d]) => strings(d).map((s) => [`${l}/${f}`, s])), ...guideText(l).map((g) => [`guides/${l}`, g])];
  for (const [where, s] of texts) {
    for (const [re, label] of BANNED) if (re.test(s)) warnings.push(`${where}: ${label} → "${ctx(s, re)}"`);
    if (l === 'ru' && /KVKK/.test(s)) errors.push(`${where}: Rusça arayüzde "KVKK" kullanılmaz (plan §16)`);
  }
}

function ctx(s, re) {
  const m = s.match(re);
  if (!m) return s.slice(0, 60);
  const i = m.index ?? 0;
  return s.slice(Math.max(0, i - 30), i + 40).replace(/\n/g, ' ');
}

const unique = (a) => [...new Set(a)];
for (const w of unique(warnings)) console.log('⚠', w);
for (const e of unique(errors)) console.log('✗', e);
console.log(`\n${unique(errors).length} hata, ${unique(warnings).length} uyarı (uyarılar elle gözden geçirilir)`);
process.exit(errors.length ? 1 : 0);
