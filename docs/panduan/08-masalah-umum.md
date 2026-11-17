# Masalah umum

## Status uji boilerplate (17 November 2026)

| Bagian | Status |
|---|---|
| `npm run build` | Teruji, lolos |
| `/api/ai` mode mock di server lokal Netlify | Teruji, lolos |
| Kode akses (401 tanpa kode, 401 kode salah, 200 kode benar) | Teruji, lolos |
| Pesan error untuk key salah, tipe file salah, badan permintaan salah | Teruji, lolos |
| Tampilan halaman Alur contoh, Transkrip, Data tersimpan | Teruji lewat tangkapan layar |
| Panggilan ke Claude asli | Belum teruji |
| Klik di alur contoh sampai data tersimpan | Belum teruji |
| Deploy ke Netlify | Belum teruji |
| Adapter Supabase | Belum teruji |
| `server-optional/` | Belum teruji |
| `npx shadcn@latest add` | Belum teruji |

Ubah tabel ini setelah kamu menguji satu bagian.

## Masalah mode

| Gejala | Penyebab | Tindakan |
|---|---|---|
| Badge "AI MOCK" di `localhost:5173` | `npm run dev` tidak menjalankan fungsi | Normal. Pakai `npm run dev:netlify` untuk AI asli. |
| Badge "AI MOCK" di URL Netlify | API key kosong, atau deploy belum diulang | Isi `ANTHROPIC_API_KEY`. Trigger deploy baru. |
| Badge "DATA MOCK" setelah mengisi env var Supabase | Build lama masih aktif | Trigger deploy baru. Untuk kerja lokal, jalankan lagi server. |
| Output AI selalu sama dan tidak cocok dengan file | Mode AI MOCK aktif | Normal. Jawaban tiruan tidak membaca file. |

## Masalah AI

| Pesan | Tindakan |
|---|---|
| "Kode akses salah atau kosong." | Masukkan kode yang sama dengan `DEMO_ACCESS_CODE`. |
| "DEMO_ACCESS_CODE belum diisi di server." | Isi env var itu. Trigger deploy baru. |
| "ANTHROPIC_API_KEY ditolak." | Periksa key. Buat key baru jika perlu. |
| "Batas laju Claude API tercapai." | Tunggu satu menit. Kurangi jumlah orang yang menguji bersamaan. |
| "Jawaban terpotong karena batas token." | Isi `AI_MAX_TOKENS=16000`. Atau kurangi jumlah kolom. |
| "Claude menolak permintaan ini." | Ubah isi dokumen atau prompt. |
| "Tipe file ... tidak didukung." | Pakai PDF, PNG, JPEG, GIF, atau WebP. |
| "File ... melebihi batas 4 MB." | Kecilkan file. Untuk PDF, ambil halaman yang perlu saja. |
| "Claude API: ..." dengan teks tentang parameter | Parameter tidak cocok dengan model. Baca catatan di bawah. |
| Permintaan berhenti tanpa jawaban setelah lama | Fungsi Netlify melewati batas waktu. Pakai file lebih kecil, atau isi `AI_EFFORT=low`. |

Catatan untuk error parameter: `netlify/functions/ai.ts` mengirim `output_config.effort` dan `output_config.format`. Jika kamu mengganti `AI_MODEL` ke model lama, model itu bisa menolak parameter ini. Kembalikan `AI_MODEL` ke nilai default.

## Masalah data

| Gejala | Tindakan |
|---|---|
| Perubahan di `mock/records.json` tidak tampil | Klik "Reset data dummy" di halaman "Data tersimpan". |
| Data hilang di laptop lain | Normal untuk mode mock. Pakai Supabase untuk data bersama. |
| "VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY wajib diisi" | Isi dua env var itu, atau hapus `VITE_DATA_SOURCE`. |
| "Supabase: relation ... does not exist" | Jalankan `supabase/schema.sql` di SQL Editor. |
| "Supabase: ... row-level security" | Jalankan lagi `supabase/schema.sql`. File itu membuat kebijakan akses. |
| Project Supabase tidak menjawab | Project gratis berhenti setelah lama tidak aktif. Aktifkan lagi di dashboard Supabase. |

## Masalah build dan deploy

| Gejala | Tindakan |
|---|---|
| `npm run build` gagal dengan error TypeScript | Baca nama file dan nomor baris. Beri error itu ke Claude Code. |
| Build Netlify gagal, build laptop lolos | Periksa apakah kamu sudah meng-commit semua file. Jalankan `git status`. |
| Halaman selain beranda memberi 404 di Netlify | Periksa blok `[[redirects]]` di `netlify.toml`. |
| `/api/ai` memberi 404 di Netlify | Periksa `netlify/functions/ai.ts` dan baris `export const config = { path: "/api/ai" }`. |
| `npm run dev:netlify` tidak siap setelah beberapa menit | Tunggu sampai teks "Local dev server ready" tampil. Start pertama mengunduh Netlify CLI. |
| Port 5173 atau 8888 sudah dipakai | Tutup terminal lain yang menjalankan server. |
| PDF contoh rusak setelah clone | Periksa `.gitattributes`. File itu menandai PDF sebagai biner. |

## Masalah tampilan

| Gejala | Tindakan |
|---|---|
| Kelas Tailwind tidak berpengaruh | Periksa nama token di `src/index.css`. Jalankan lagi `npm run dev`. |
| `ReviewPanel` menampilkan keputusan lama untuk hasil baru | Beri prop `key` yang berubah untuk setiap hasil. |
| Pratinjau PDF kosong | Beberapa browser ponsel tidak menampilkan PDF di dalam halaman. Uji di laptop. |
| Pemutar audio tidak bersuara | `audio` di `mock/transcript.json` berisi `null`. Baca `05-ui-dan-komponen.md`. |

## Rencana cadangan saat demo

1. **Wi-Fi mati.** Jalankan `npm run dev`. Tunjukkan demo di laptop kamu dengan mode mock.
2. **AI asli gagal.** Jalankan `npm run dev`. Perintah itu selalu memakai AI MOCK. Sebut bahwa output adalah tiruan.
3. **Netlify gagal deploy.** Tunjukkan demo dari `localhost`. Perbaiki deploy setelah sesi.
4. **Semua gagal.** Tunjukkan tangkapan layar. Ambil tangkapan layar setiap kali satu alur selesai.

## Catatan dari acara

Tulis masalah baru dan penyelesaiannya di bawah ini setelah setiap acara.

| Tanggal | Acara | Masalah | Penyelesaian |
|---|---|---|---|
| | | | |
