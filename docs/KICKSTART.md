# Kickstart

Target: dari folder kosong sampai URL publik hidup dalam 15 menit.

## A. Sebelum acara (H-1)

1. Pastikan Node versi 20 atau lebih baru terpasang: `node -v`.
2. Pastikan kamu bisa login ke GitHub, Netlify, dan Anthropic Console.
3. Buat API key di Anthropic Console. Simpan key itu di pengelola kata sandi.
4. Pasang batas belanja bulanan di Anthropic Console (Settings > Limits).
5. Tentukan satu kode akses demo, misal `tim-a-2026`.
6. Jalankan seluruh bagian B sekali sebagai latihan. Hapus situs latihan itu setelah selesai.
7. Opsional: buat satu project Supabase kosong. Project baru butuh kira-kira 2 menit untuk siap.

## B. Saat acara mulai

1. Duplikat folder boilerplate ini. Beri nama sesuai acara.
2. Hapus folder `.git` di folder duplikat jika folder itu ada.
3. Buka terminal di folder duplikat. Jalankan `npm install`.
4. Jalankan `npm run dev`. Buka `http://localhost:5173`. Badge harus menunjukkan "DATA MOCK" dan "AI MOCK".
5. Buat repo GitHub privat yang kosong.
6. Jalankan:
   ```
   git init
   git add .
   git commit -m "Mulai dari boilerplate"
   git branch -M main
   git remote add origin <URL repo>
   git push -u origin main
   ```
7. Di Netlify: Add new project > Import an existing project > pilih repo itu. Netlify membaca `netlify.toml`. Jangan ubah pengaturan build.
8. Di Netlify: Project configuration > Environment variables. Isi:
   - `ANTHROPIC_API_KEY`
   - `DEMO_ACCESS_CODE`
9. Di Netlify: Deploys > Trigger deploy > Deploy project. Env var baru hanya berlaku setelah deploy baru.
10. Buka URL Netlify. Masukkan kode akses. Badge harus menunjukkan "AI CLAUDE".
11. Jalankan alur contoh dengan tombol "Pakai kuitansi contoh". Pastikan data muncul di halaman "Data tersimpan".

## C. Saat membangun prototipe

1. Ubah `src/config.ts`: nama prototipe, rumusan masalah, tim, peran.
2. Minta Claude Code membuat alur baru. `CLAUDE.md` memuat resepnya.
3. Uji di `http://localhost:5173` (AI mock) atau jalankan `npm run dev:netlify` dan buka `http://localhost:8888` (AI asli, butuh file `.env`).
4. Jalankan `npm run build` sebelum setiap push. Build yang gagal di laptop juga gagal di Netlify.
5. `git add . && git commit -m "..." && git push`. Netlify men-deploy dalam 1 sampai 2 menit.
6. Isi `docs/prototype-card-template.md` selama sesi.

## D. Opsional: pakai Supabase

Pakai Supabase hanya jika beberapa orang harus melihat data yang sama dari perangkat berbeda.

1. Buka SQL Editor di project Supabase. Jalankan isi `supabase/schema.sql`, lalu `supabase/seed.sql`.
2. Salin Project URL dan anon key dari Project Settings > API.
3. Di Netlify, isi `VITE_DATA_SOURCE=supabase`, `VITE_SUPABASE_URL`, dan `VITE_SUPABASE_ANON_KEY`.
4. Trigger deploy baru. Badge harus menunjukkan "DATA SUPABASE".

Tabel `records` terbuka untuk semua orang yang punya anon key. Simpan hanya data dummy atau data publik.

## E. Jika ada masalah saat demo

| Gejala | Tindakan |
|---|---|
| Wi-Fi mati | Jalankan `npm run dev` di laptop. Semua alur berjalan dengan data mock dan AI mock. |
| Badge tetap "AI MOCK" di Netlify | Periksa `ANTHROPIC_API_KEY`, lalu trigger deploy baru. |
| Pesan "DEMO_ACCESS_CODE belum diisi" | Isi env var itu di Netlify, lalu trigger deploy baru. |
| AI terlalu lama atau timeout | Pakai file yang lebih kecil. Fungsi Netlify punya batas waktu eksekusi. |
| Pesan "Jawaban terpotong" | Isi `AI_MAX_TOKENS` dengan nilai lebih besar, misal `16000`. |
| Build Netlify gagal | Jalankan `npm run build` di laptop dan baca error itu. |
| Data aneh di mode mock | Buka "Data tersimpan" > "Reset data dummy". |

## F. Setelah acara

1. Hapus `ANTHROPIC_API_KEY` dari Netlify, atau cabut key itu di Anthropic Console.
2. Salin perbaikan yang berguna kembali ke folder boilerplate.
