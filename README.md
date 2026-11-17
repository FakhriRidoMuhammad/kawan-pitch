# Boilerplate Prototipe

Titik mulai untuk prototipe lo-fi di hackathon dan workshop design thinking. Satu alur contoh sudah berjalan: unggah dokumen, AI mengekstrak data, manusia meninjau, data tersimpan.

## Mulai cepat

```
npm install
npm run dev
```

Buka `http://localhost:5173`. Aplikasi berjalan tanpa akun dan tanpa API key (mode DATA MOCK dan AI MOCK).

Lupa isi repo ini? Mulai dari `docs/panduan/00-mulai-di-sini.md`.

Langkah lengkap sampai URL publik: `docs/KICKSTART.md`.

## Stack

| Bagian | Pilihan |
|---|---|
| Frontend | React, Vite, TypeScript longgar, Tailwind, komponen gaya shadcn/ui |
| AI | Claude API lewat satu fungsi Netlify (`/api/ai`) |
| Data | File JSON + `localStorage` (default) atau Postgres di Supabase |
| Deploy | Netlify, otomatis dari GitHub |

## Dua mode, satu badge

Header selalu menampilkan dua badge. Kuning berarti tiruan. Hijau berarti asli.

| Badge | Syarat |
|---|---|
| DATA MOCK | Default |
| DATA SUPABASE | `VITE_DATA_SOURCE=supabase` + URL + anon key |
| AI MOCK | `ANTHROPIC_API_KEY` kosong, atau fungsi tidak terjangkau |
| AI CLAUDE | `ANTHROPIC_API_KEY` + `DEMO_ACCESS_CODE` terisi |

## Isi repo

- `src/` — aplikasi. Mulai dari `src/config.ts` dan `src/pages/ExampleFlow.tsx`.
- `netlify/functions/ai.ts` — fungsi AI. API key hanya ada di sini.
- `mock/` — data dummy dan jawaban AI tiruan.
- `supabase/` — skema dan data awal.
- `docs/panduan/` — panduan penggunaan, 9 file. Mulai dari `00-mulai-di-sini.md`.
- `docs/` — kickstart dan template prototype card.
- `events/` — bahan per acara.
- `CLAUDE.md` — instruksi dan resep untuk Claude Code.

## Batasan

- Prototipe ini tidak punya login. Pengalih peran hanya untuk demo.
- Tabel Supabase terbuka untuk pemegang anon key. Simpan hanya data dummy atau data publik.
- Claude API tidak membaca audio. Alur transkrip memakai teks transkrip.
