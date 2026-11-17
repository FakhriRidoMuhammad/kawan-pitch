# Deploy dan env var

Daftar langkah lengkap ada di `docs/KICKSTART.md`. File ini menjelaskan konsep dan semua env var.

## Tiga cara menjalankan

| Perintah | URL | AI | Guna |
|---|---|---|---|
| `npm run dev` | `http://localhost:5173` | Selalu mock | Membangun UI. Mulai dalam 2 detik. |
| `npm run dev:netlify` | `http://localhost:8888` | Sesuai `.env` | Menguji AI asli di laptop |
| Push ke GitHub | URL Netlify | Sesuai env var Netlify | Demo untuk orang lain |

`npm run dev:netlify` lambat di laptop ini. Start pertama butuh beberapa menit karena perintah itu mengunduh Netlify CLI. Setiap panggilan fungsi butuh kira-kira 3 detik. Pakai `npm run dev` untuk kerja sehari-hari.

## Alur deploy

1. Kamu menjalankan `git push`.
2. Netlify membaca `netlify.toml`, lalu menjalankan `npm run build`.
3. Netlify menerbitkan folder `dist` dan fungsi di `netlify/functions/`.
4. URL publik memuat versi baru dalam 1 sampai 2 menit.

Jalankan `npm run build` di laptop sebelum push. Build yang gagal di laptop juga gagal di Netlify.

## Daftar env var

| Env var | Dibaca oleh | Default | Isi |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | Fungsi | kosong | API key Claude. Kosong = AI MOCK. |
| `DEMO_ACCESS_CODE` | Fungsi | kosong | Kode yang pengguna masukkan di UI. Wajib jika API key terisi. |
| `AI_MODEL` | Fungsi | `claude-sonnet-5-5` | Model Claude |
| `AI_EFFORT` | Fungsi | `low` | `low`, `medium`, atau `high` |
| `AI_MAX_TOKENS` | Fungsi | `8000` | Batas token jawaban |
| `VITE_DATA_SOURCE` | Browser | `mock` | `mock` atau `supabase` |
| `VITE_SUPABASE_URL` | Browser | kosong | URL project Supabase |
| `VITE_SUPABASE_ANON_KEY` | Browser | kosong | Anon key Supabase |

Dua aturan:

1. **Awalan `VITE_` berarti nilai itu masuk ke kode browser.** Semua pengunjung bisa membaca nilai itu. Jangan beri awalan `VITE_` pada rahasia.
2. **Env var baru berlaku setelah deploy baru.** Di Netlify: Deploys > Trigger deploy > Deploy project.

## File `.env` untuk kerja lokal

1. Salin `.env.example` menjadi `.env`.
2. Isi nilai yang kamu butuhkan.
3. Hentikan lalu jalankan lagi server lokal.

`.gitignore` memuat `.env`. Git tidak mengirim file itu ke GitHub. Jangan hapus baris itu.

## Kombinasi umum

| Tujuan | Isi |
|---|---|
| Membangun UI | Tidak ada. Semua kosong. |
| Demo dengan AI asli | `ANTHROPIC_API_KEY`, `DEMO_ACCESS_CODE` |
| Demo dengan data bersama | Tiga env var `VITE_` |
| Demo penuh | Kelima env var itu |

## Kode akses demo

- Jika API key terisi dan `DEMO_ACCESS_CODE` kosong, fungsi menolak semua permintaan. Aturan ini mencegah pemakaian token tanpa perlindungan.
- Pengguna memasukkan kode satu kali. Browser menyimpan kode itu.
- Jika kamu mengganti kode, pengguna lama mendapat layar kode akses lagi pada permintaan AI berikutnya.
- Tulis kode itu di papan atau kertas untuk tim lain saat sesi uji coba.

## Memakai ulang boilerplate

1. Duplikat folder ini. Jangan bekerja di folder asli.
2. Hapus folder `.git` di folder duplikat.
3. Buat repo GitHub privat baru untuk setiap acara.
4. Buat project Netlify baru untuk setiap acara.
5. Setelah acara, salin perbaikan yang berguna kembali ke folder asli.

## Setelah acara

1. Hapus `ANTHROPIC_API_KEY` dari Netlify, atau cabut key itu di Anthropic Console.
2. Hentikan atau hapus project Supabase jika kamu tidak memakai project itu lagi.
