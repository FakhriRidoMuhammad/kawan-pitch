# CLAUDE.md

Repo ini adalah boilerplate untuk prototipe lo-fi di hackathon dan workshop design thinking. Tujuan utama: demo yang berjalan dalam waktu kira-kira 2 jam. Kecepatan lebih penting daripada kerapian.

## Aturan kerja

- Tulis teks UI dalam Bahasa Indonesia.
- Pakai hanya data dummy atau data publik. Jangan masukkan data pribadi atau data narasumber.
- Setiap alur yang memakai AI wajib melewati `<ReviewPanel>` sebelum data tersimpan. Manusia yang memutuskan.
- Jangan panggil Claude API dari browser. Panggil `askAI()`, yang meneruskan permintaan ke `netlify/functions/ai.ts`.
- Jangan akses Supabase atau `localStorage` langsung dari halaman. Pakai `data` dari `@/lib/data`.
- Jangan tambah dependensi, test, atau abstraksi baru kecuali demo membutuhkannya.
- TypeScript berjalan dengan `strict: false`. `any` boleh dipakai.

## Perintah

| Perintah | Guna |
|---|---|
| `npm run dev` | FE saja di port 5173. AI selalu mock (fungsi tidak berjalan). |
| `npm run dev:netlify` | FE + fungsi AI di port 8888. Pakai ini untuk menguji Claude asli. |
| `npm run build` | Typecheck + build produksi. Jalankan sebelum push. |

## Peta file

| File | Isi |
|---|---|
| `src/config.ts` | Nama prototipe, rumusan masalah, daftar peran, menu. Ubah file ini lebih dulu. |
| `src/index.css` | Token tema (warna, font, radius) di blok `@theme`. |
| `src/App.tsx` | Daftar rute. |
| `src/pages/ExampleFlow.tsx` | Alur contoh utuh. Salin file ini untuk alur baru. |
| `src/lib/ai.ts` | `askAI()` dan `useAI()`. |
| `src/lib/data/` | Lapisan data. `mockAdapter` dan `supabaseAdapter`. |
| `src/lib/roles.tsx` | `useRole()` untuk peran demo. |
| `src/components/hitl/ReviewPanel.tsx` | Panel tinjauan manusia + `AI_FIELDS_SCHEMA`. |
| `src/components/upload/` | `FileDrop`, `FilePreview`. |
| `src/components/audio/TranscriptPlayer.tsx` | Pemutar audio + transkrip tersinkron. |
| `netlify/functions/ai.ts` | Satu-satunya tempat API key. Rute `/api/ai`. |
| `mock/` | Data dummy dan jawaban AI tiruan. |
| `supabase/` | `schema.sql` dan `seed.sql`. |
| `events/` | Bahan per acara. Tidak dipakai oleh kode. |

## Resep: tambah alur baru

1. Salin `src/pages/ExampleFlow.tsx` ke `src/pages/<Nama>.tsx`.
2. Ubah `KIND`, `FIELDS`, `SYSTEM`, `PROMPT`, dan `mockKey`.
3. Tambah jawaban tiruan dengan kunci `mockKey` itu di `mock/ai-responses.json`.
4. Tambah `<Route>` di `src/App.tsx`.
5. Tambah menu di `NAV` pada `src/config.ts`.

## Resep: panggil AI

```tsx
import { useAI } from "@/lib/ai";
import { AI_FIELDS_SCHEMA, ReviewPanel } from "@/components/hitl/ReviewPanel";

const ai = useAI<{ bidang: AIField[] }>();
await ai.run({
  system: "Peran AI dalam satu kalimat.",
  prompt: "Instruksi lengkap.",
  schema: AI_FIELDS_SCHEMA,          // hapus baris ini untuk jawaban teks bebas (ai.result.text)
  files: [{ mediaType: file.type, data: await fileToBase64(file) }], // opsional: PDF atau gambar
  mockKey: "kunci-di-ai-responses",  // jawaban saat mode AI MOCK
});
// ai.result.data.bidang -> masukkan ke <ReviewPanel fields={...} onSave={...} />
```

- `AI_FIELDS_SCHEMA` menghasilkan daftar `{ nama, nilai, kutipan_sumber, yakin }`. Skema ini cocok untuk hampir semua tugas ekstraksi dan ringkasan.
- Untuk skema sendiri: setiap objek wajib punya `required` dan `additionalProperties: false`.
- Claude API tidak membaca audio. Untuk audio, pakai transkrip teks (lihat `src/pages/Transcript.tsx`).
- Batas server: 3 file per permintaan, 4 MB per file.

## Resep: simpan dan baca data

```ts
import { data } from "@/lib/data";

await data.insert({ kind: "catatan", payload: { ... }, review_status: "approved", reviewed_by: role });
const rows = await data.list("catatan");
await data.update(id, { review_status: "edited" });
await data.remove(id);
```

Data dummy awal ada di `mock/records.json`. Jika kamu mengubah file itu, ubah juga `supabase/seed.sql`.

## Resep: aturan peran

```tsx
const { role, roleLabel } = useRole(); // "jurnalis" | "editor" | "pimred"
{role !== "jurnalis" && <Button>Setujui pembayaran</Button>}
```

## Resep: komponen UI baru

`npx shadcn@latest add dialog tabs select` menambah komponen ke `src/components/ui/`. Token tema sudah cocok dengan shadcn.

## Mode dan env var

- Badge di header menunjukkan mode aktif. Jangan hapus badge itu.
- `ANTHROPIC_API_KEY` kosong: AI MOCK. Terisi: AI CLAUDE, dan `DEMO_ACCESS_CODE` wajib terisi.
- `VITE_DATA_SOURCE=supabase` + `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`: DATA SUPABASE.
- Env var dengan awalan `VITE_` masuk ke kode browser. Jangan beri awalan itu pada rahasia.
- Model default: `claude-sonnet-5-5`. Ganti lewat `AI_MODEL`.
