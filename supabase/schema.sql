-- Jalankan file ini sekali di Supabase: SQL Editor > New query > Run.
-- Satu tabel generik. Kolom `kind` membedakan jenis data. Ide baru tidak butuh tabel baru.

create table if not exists public.records (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  payload jsonb not null default '{}'::jsonb,
  review_status text not null default 'pending'
    check (review_status in ('pending', 'approved', 'edited', 'rejected')),
  reviewed_by text,
  created_at timestamptz not null default now()
);

create index if not exists records_kind_idx on public.records (kind, created_at desc);

-- PERINGATAN: kebijakan di bawah membuka tabel ini untuk semua orang yang punya anon key.
-- Anon key ada di kode browser. Kebijakan ini hanya untuk prototipe dengan data dummy atau data publik.
-- Jangan simpan data pribadi atau data narasumber di tabel ini.
alter table public.records enable row level security;

drop policy if exists "prototipe: akses terbuka" on public.records;
create policy "prototipe: akses terbuka" on public.records
  for all to anon, authenticated
  using (true)
  with check (true);
