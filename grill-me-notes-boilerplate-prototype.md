# Catatan Grill-Me: Boilerplate Prototipe

Tanggal: 17 November 2026. File ini mencatat proses wawancara. File ini bukan dokumen desain. Desain ada di `README.md` dan `CLAUDE.md`.

## Konflik instruksi yang diangkat di awal

| # | Konflik | Penyelesaian |
|---|---|---|
| 1 | "Sesederhana mungkin" berlawanan dengan tiga layanan (Netlify + Render + Supabase). | Fakhri memilih Netlify + Supabase. Render menjadi opsi tidak aktif. |
| 2 | ToR meminta prototipe lo-fi. Fakhri meminta working prototype. | Boilerplate berjalan penuh dengan data mock, dan bisa beralih ke AI dan database asli. |
| 3 | Skill grill-me meminta file catatan. Plan mode hanya mengizinkan file plan. | File ini ditulis setelah plan disetujui. |

## Batch 1

| Pertanyaan | Jawaban Fakhri |
|---|---|
| Apa peran kamu di workshop, dan siapa yang menulis kode? | "saya sebagai AI developer, lalu di dalam tim ada uiux, ada jurnalis dan ada cofacilitator" |
| Arsitektur default mana? | Netlify + Supabase |
| Stack frontend mana? | React + Vite + Tailwind + shadcn/ui |
| Provider AI mana, dan siapa yang membayar token? | Claude API, key Fakhri sendiri |

## Batch 2

| Pertanyaan | Jawaban Fakhri |
|---|---|
| Bagaimana boilerplate menyimpan data secara default? | "mock dulu, supabase opsional, namun perlu jelas di UI tampil data apa yang digunakan, apakah data asli atau data mock" |
| Modul siap pakai mana yang wajib ada? | Keempat modul: panggilan AI + output terstruktur, panel Human-in-the-Loop, unggah PDF/gambar, pengalih peran demo. Fakhri belum yakin arti modul pertama. Claude menjelaskan "output terstruktur" setelah itu. |
| Bagaimana menangani audio? (Claude API tidak membaca audio) | Transkrip dummy + pemutar audio |
| Bahasa pemrograman mana? | TypeScript longgar (`strict: false`) |

## Batch 3

| Pertanyaan | Jawaban Fakhri |
|---|---|
| Struktur repo mana? | Satu app + folder BE opsional |
| Bagaimana men-deploy ke Netlify? | Git push ke GitHub (Claude merekomendasikan Netlify CLI. Fakhri memilih git push.) |
| Bagaimana desainer bekerja dengan repo? | Desainer membuat sketsa. Fakhri menulis kode. |
| Dokumen pendukung mana? | Keempat dokumen: CLAUDE.md, checklist kickstart, template prototype card, brief 7 pain point |

## Batch 4

| Pertanyaan | Jawaban Fakhri |
|---|---|
| Kapan boilerplate harus siap? | Besok, 18 November 2026 |
| Bagaimana melindungi API key dari pemakaian liar? | Kode akses demo + batas token |
| Apa isi awal boilerplate? | Satu alur contoh utuh |
| Bagaimana repo GitHub dibuat? | "saya akan duplikat folder boilerplate ini di laptop saya. lalu saya akan buat repo github baru, private. lalu saya akan hubungkan folder duplikasi tersebut dengan repo github private yang baru saya buat ini" |

## Asumsi Claude (tidak ditanyakan)

- Teks UI memakai Bahasa Indonesia.
- Package manager: npm.
- Model default: `claude-sonnet-5-5`, bisa diganti lewat `AI_MODEL`.
- Tanpa test otomatis.

## Keputusan terkunci

| Topik | Keputusan |
|---|---|
| Arsitektur | Netlify (FE + Functions) + Supabase opsional. Render tidak aktif. |
| Frontend | React + Vite + Tailwind + komponen gaya shadcn/ui |
| Bahasa | TypeScript longgar |
| AI | Claude API lewat satu fungsi Netlify |
| Data | Mock sebagai default, Supabase lewat satu env var |
| Indikator | Badge tetap di header untuk mode data dan mode AI |
| Proteksi AI | Kode akses demo + batas token + batas ukuran file |
| Audio | Transkrip dummy + pemutar. Tanpa provider kedua. |
| Deploy | Git push ke GitHub. Fakhri membuat repo sendiri. |
| Tenggat | 18 November 2026 |

## Penyimpangan dari plan saat implementasi

| Plan | Hasil | Alasan |
|---|---|---|
| `max_tokens` default 2000 | 8000 | Claude Sonnet 5.5 memakai sebagian token untuk berpikir. |
| Batas file 5 MB | 4 MB | Netlify membatasi badan permintaan sampai 6 MB. Base64 menambah 33%. |
| File audio contoh | Mode simulasi tanpa suara | Claude tidak punya file audio publik untuk disertakan. |
| Komponen dari CLI shadcn | Komponen ditulis tangan dengan gaya shadcn | CLI shadcn meminta input interaktif. `components.json` tetap ada untuk `npx shadcn add`. |
| `netlify-cli` sebagai devDependency | Dipanggil lewat `npx` | Instalasi lebih ringan. |
| Tidak ada di plan | Klien memakai jawaban tiruan lokal jika `/api/ai` tidak terjangkau | Demo tetap berjalan tanpa internet. |

## Risiko yang perlu dipantau

- Batas waktu fungsi Netlify bisa memotong panggilan AI yang lama (PDF besar).
- Tabel Supabase terbuka untuk pemegang anon key. Hanya data dummy atau data publik.
- Kode akses demo adalah satu kode bersama. Siapa pun yang tahu kode itu bisa memakai token.
