-- Data dummy awal. Isi sama dengan mock/records.json.
-- Jalankan setelah schema.sql.

insert into public.records (kind, payload, review_status, reviewed_by, created_at) values
(
  'kuitansi',
  '{"file": "kuitansi-contoh-lama.pdf", "bidang": {"Nomor kuitansi": "KW/2026/10/031", "Tanggal": "28 Oktober 2026", "Penerima": "Sari Wulandari (kontributor lepas, data dummy)", "Keperluan": "Honor liputan banjir rob Pekalongan", "Jumlah": "Rp 1.250.000"}}',
  'approved', 'editor', '2026-10-29T03:15:00Z'
),
(
  'kuitansi',
  '{"file": "kuitansi-transport.jpg", "bidang": {"Nomor kuitansi": "KW/2026/11/004", "Tanggal": "5 November 2026", "Penerima": "Bima Prasetyo (kontributor lepas, data dummy)", "Keperluan": "Transport liputan tambang nikel Morowali", "Jumlah": "Rp 875.000"}}',
  'edited', 'pimred', '2026-11-06T08:40:00Z'
);
