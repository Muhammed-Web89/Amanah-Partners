-- Amanah Partners: ücretsiz görüşme başvuruları
-- Bölge: AB (Frankfurt) önerilir — plan v2 §16 hukuki not. Saklama süresi [KARAR: avukat onayı].

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  locale text not null check (locale in ('uz', 'ru', 'en')),
  student_name text not null check (char_length(student_name) between 2 and 100),
  grade text not null check (grade in ('8', '9', '10', '11', 'graduate')),
  is_minor boolean not null,
  program text not null,
  countries text[] not null default '{}',
  filled_by text not null check (filled_by in ('student', 'parent')),
  parent_name text,
  parent_phone text,
  contact text not null,
  city text,
  message text check (char_length(message) <= 1000),
  consent_at timestamptz not null,
  parent_consent_at timestamptz,
  ip_hash text not null,
  -- 18 yaş altı: veli bilgisi ve veli onayı zorunlu
  constraint minor_needs_parent check (
    not is_minor or (parent_name is not null and parent_phone is not null and parent_consent_at is not null)
  )
);

create index if not exists leads_ip_hash_created_idx on public.leads (ip_hash, created_at desc);

-- Satır düzeyinde güvenlik: anon ve authenticated rollerine hiçbir politika verilmez.
-- Yalnızca sunucudaki service role anahtarı (RLS'yi atlar) okuyup yazabilir.
alter table public.leads enable row level security;

-- Saklama süresi dolan kayıtları silme (süre avukat onayıyla kesinleşir; şimdilik 12 ay varsayımı).
create or replace function public.purge_old_leads() returns void
language sql security definer set search_path = public as $$
  delete from public.leads where created_at < now() - interval '12 months';
$$;

-- pg_cron etkinse günlük çalıştırma:
-- select cron.schedule('purge-old-leads', '0 3 * * *', $$select public.purge_old_leads()$$);
