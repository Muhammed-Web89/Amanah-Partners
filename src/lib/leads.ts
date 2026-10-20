import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { isStaging } from '@/config/site';
import type { Lead } from './lead-schema';
import { RATE_LIMIT, RATE_WINDOW_MS } from './rate-limit';

// Form verisi nereye gider? (prompt §9) → docs/06-teknik.md "Form verisi"
//  1. Supabase (AB bölgesi), "leads" tablosu, yalnızca sunucudaki service role anahtarıyla.
//  2. Supabase yoksa ve staging ise: .data/leads.ndjson (yerel geliştirme ve QA). Canlıda bu yol kapalıdır.
//  3. İsteğe bağlı: ekibe Telegram bot bildirimi (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID).

const supabase =
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
      })
    : null;

export type LeadRecord = Lead & { locale: string; ipHash: string };

export async function overDbRateLimit(ipHash: string) {
  if (!supabase) return false;
  const since = new Date(Date.now() - RATE_WINDOW_MS).toISOString();
  const { count, error } = await supabase
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gte('created_at', since);
  if (error) throw error;
  return (count ?? 0) >= RATE_LIMIT;
}

export async function saveLead(lead: LeadRecord) {
  if (process.env.QA_FORCE_LEAD_ERROR === '1' && isStaging) throw new Error('QA: zorlanmış sunucu hatası');

  const now = new Date().toISOString();
  const minor = lead.age === 'minor';
  const row = {
    locale: lead.locale,
    student_name: lead.studentName,
    grade: lead.grade,
    is_minor: minor,
    program: lead.program,
    countries: lead.countries,
    filled_by: lead.filledBy,
    parent_name: minor ? lead.parentName : null,
    parent_phone: minor ? lead.parentPhone : null,
    contact: lead.contact,
    city: lead.city || null,
    message: lead.message || null,
    consent_at: now,
    parent_consent_at: minor ? now : null,
    ip_hash: lead.ipHash,
  };

  if (supabase) {
    const { error } = await supabase.from('leads').insert(row);
    if (error) throw error;
  } else if (isStaging) {
    const dir = path.join(process.cwd(), '.data');
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, 'leads.ndjson'), JSON.stringify({ ...row, created_at: now }) + '\n');
  } else {
    throw new Error('Canlı ortamda SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY tanımlı değil.');
  }

  await notifyTeam(row).catch((e) => console.error('Telegram bildirimi gönderilemedi', e));
}

async function notifyTeam(row: { student_name: string; program: string; contact: string; locale: string; is_minor: boolean }) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return;
  const text = `Yangi ariza (${row.locale.toUpperCase()})\nDastur: ${row.program}\nOʻquvchi: ${row.student_name}${row.is_minor ? ' (18 yoshgacha)' : ''}\nAloqa: ${row.contact}`;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chat, text }),
  });
}
