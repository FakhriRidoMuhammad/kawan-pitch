# Cara kerja

## Arsitektur

```
Browser (React)
   │
   ├── askAI() ──────► /api/ai (fungsi Netlify) ──► Claude API
   │                     └─ API key hanya ada di sini
   │
   └── data.insert() ─► adapter mock (localStorage)      ← default
                    └─► adapter Supabase (Postgres)      ← jika VITE_DATA_SOURCE=supabase
```

| Bagian | Teknologi | Tempat berjalan |
|---|---|---|
| Frontend | React, Vite, TypeScript longgar, Tailwind | Netlify (file statis) |
| Fungsi AI | Satu fungsi Netlify, SDK Anthropic | Netlify Functions |
| Data | File JSON + `localStorage`, atau Postgres | Browser, atau Supabase |

Repo ini tidak memakai server terpisah. Folder `server-optional/` memuat kerangka Express untuk Render, tetapi folder itu tidak aktif.

## Dua mode

| Mode | Syarat | Guna |
|---|---|---|
| DATA MOCK | Default | Demo tanpa akun. Data tersimpan di browser itu saja. |
| DATA SUPABASE | `VITE_DATA_SOURCE=supabase` + URL + anon key | Beberapa perangkat melihat data yang sama |
| AI MOCK | `ANTHROPIC_API_KEY` kosong, atau `/api/ai` tidak terjangkau | Membangun UI tanpa biaya token |
| AI CLAUDE | `ANTHROPIC_API_KEY` + `DEMO_ACCESS_CODE` terisi | Demo dengan AI asli |

`npm run dev` tidak menjalankan fungsi Netlify. Jadi `npm run dev` selalu menghasilkan AI MOCK. Pakai `npm run dev:netlify` untuk menguji AI asli di laptop.

## Alur satu permintaan AI

1. Halaman memanggil `ai.run({ prompt, schema, files, mockKey })`.
2. `src/lib/ai.ts` mengirim permintaan POST ke `/api/ai` dengan header `x-demo-code`.
3. `netlify/functions/ai.ts` memeriksa kode akses. Fungsi menolak permintaan dengan status 401 jika kode salah.
4. Jika API key kosong, fungsi mengembalikan jawaban dari `mock/ai-responses.json` dengan kunci `mockKey`.
5. Jika API key ada, fungsi memanggil Claude. Fungsi meminta JSON yang sesuai `schema`.
6. Halaman menerima `{ text, data, mode }`. Badge AI berubah sesuai `mode`.
7. Halaman memasukkan `data.bidang` ke `<ReviewPanel>`.
8. Manusia memutuskan setiap kolom. `onSave` memanggil `data.insert()`.

Jika `/api/ai` tidak terjangkau, langkah 2 gagal. `src/lib/ai.ts` lalu memakai `mock/ai-responses.json` langsung di browser.

## Bentuk data

Semua data masuk ke satu bentuk generik. Kamu tidak perlu membuat tabel baru untuk ide baru.

```ts
{
  id: string,
  kind: string,            // jenis data, misal "kuitansi" atau "catatan"
  payload: any,            // isi bebas
  review_status: "pending" | "approved" | "edited" | "rejected",
  reviewed_by: string,     // id peran yang memutuskan
  created_at: string
}
```

## Struktur folder

```
src/
  config.ts              nama prototipe, rumusan masalah, peran, menu
  index.css              token tema
  App.tsx                daftar rute
  pages/                 satu file per halaman
  components/
    ui/                  Button, Card, Input, Textarea, Badge
    layout/              AppShell, ModeBadges, RoleSwitcher, AccessGate
    hitl/ReviewPanel     panel tinjauan manusia
    upload/              FileDrop, FilePreview
    audio/               TranscriptPlayer
  lib/
    ai.ts                askAI(), useAI()
    data/                lapisan data dan dua adapter
    roles.tsx            useRole()
    utils.ts             cn(), formatDate(), fileToBase64()
netlify/functions/ai.ts  fungsi AI
mock/                    data dummy dan jawaban AI tiruan
public/samples/          file contoh yang bisa diakses browser
supabase/                schema.sql, seed.sql
```
