-- Kopi Catat: jalankan sekali di editor SQL database cloud
create table if not exists public.kopi_records (
  collection text not null,
  id text not null,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (collection, id)
);

alter table public.kopi_records enable row level security;

-- Tanpa login: anon boleh baca/tulis. Ganti dengan policy berbasis auth saat login ditambahkan.
drop policy if exists "kopi_anon_all" on public.kopi_records;
create policy "kopi_anon_all" on public.kopi_records
  for all to anon using (true) with check (true);
