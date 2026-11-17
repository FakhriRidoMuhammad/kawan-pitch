# Mulai di sini

Baca file ini jika kamu lupa isi repo ini. Waktu baca: 5 menit.

## Apa repo ini

Repo ini adalah titik mulai untuk prototipe lo-fi di hackathon dan workshop design thinking. Kamu menduplikat folder ini, mengubah beberapa file, lalu men-deploy hasilnya ke Netlify.

Repo ini sudah memuat satu alur yang berjalan: pengguna mengunggah dokumen, AI mengekstrak data, manusia memeriksa setiap kolom, lalu data tersimpan.

## Tiga ide utama

1. **Aplikasi berjalan tanpa akun dan tanpa internet.** Mode default memakai data dummy dan jawaban AI tiruan. Kamu mengaktifkan AI asli dan database asli lewat env var, tanpa mengubah kode.
2. **Dua badge di header selalu menunjukkan mode aktif.** Kuning berarti tiruan ("DATA MOCK", "AI MOCK"). Hijau berarti asli ("DATA SUPABASE", "AI CLAUDE").
3. **Manusia memutuskan sebelum data tersimpan.** Setiap output AI melewati komponen `ReviewPanel`.

## Coba dalam 2 menit

1. Buka terminal di folder repo.
2. Jalankan `npm install` jika folder `node_modules` belum ada.
3. Jalankan `npm run dev`.
4. Buka `http://localhost:5173`.
5. Klik "Alur contoh", lalu klik "Pakai kuitansi contoh".
6. Putuskan setiap kolom, lalu klik "Simpan hasil tinjauan".
7. Buka "Data tersimpan". Data baru ada di baris pertama.

## Peta panduan

| File | Baca jika kamu ingin |
|---|---|
| `01-cara-kerja.md` | Memahami arsitektur dan alur data |
| `02-membuat-alur-baru.md` | Mengubah alur contoh menjadi ide tim kamu |
| `03-ai.md` | Memanggil Claude, menulis prompt, mengatur jawaban tiruan |
| `04-data.md` | Menyimpan data, mengubah data dummy, memakai Supabase |
| `05-ui-dan-komponen.md` | Mengubah tema, peran, dan memakai komponen siap pakai |
| `06-deploy-dan-env.md` | Men-deploy dan mengisi env var |
| `07-hari-acara.md` | Mengatur waktu saat sesi, dan bekerja dengan Claude Code |
| `08-masalah-umum.md` | Memperbaiki masalah, dan melihat bagian yang belum teruji |

Dokumen lain:

| File | Isi |
|---|---|
| `docs/KICKSTART.md` | Daftar langkah bernomor dari duplikat folder sampai URL publik |
| `docs/prototype-card-template.md` | Template prototype card |
| `CLAUDE.md` | Instruksi untuk Claude Code. Claude Code membaca file ini secara otomatis. |
| `events/good-ai-2026/` | ToR dan brief 7 pain point untuk acara The Good AI! |
| `grill-me-notes-boilerplate-prototype.md` | Alasan di balik setiap keputusan desain |

## Urutan baca yang disarankan

- **H-1 acara:** `06-deploy-dan-env.md`, lalu `docs/KICKSTART.md` bagian A dan B sebagai latihan.
- **Pagi hari acara:** `07-hari-acara.md`.
- **Saat membangun:** `02-membuat-alur-baru.md`, lalu `03-ai.md` jika perlu.
- **Saat ada masalah:** `08-masalah-umum.md`.
