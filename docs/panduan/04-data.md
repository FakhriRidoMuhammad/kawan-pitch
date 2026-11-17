# Data

## Aturan utama

Halaman memanggil `data` dari `@/lib/data`. Halaman tidak memanggil `localStorage` atau Supabase secara langsung. Dengan aturan ini, satu env var bisa memindahkan seluruh aplikasi dari data mock ke Supabase.

## Lima fungsi

```ts
import { data } from "@/lib/data";

const semua = await data.list();              // semua data, terbaru lebih dulu
const kuitansi = await data.list("kuitansi"); // hanya satu jenis
const satu = await data.get(id);

const baru = await data.insert({
  kind: "kuitansi",
  payload: { file: "a.pdf", bidang: { Jumlah: "Rp 1.000.000" } },
  review_status: "approved",
  reviewed_by: role,
});

await data.update(id, { review_status: "edited" });
await data.remove(id);
```

`data.source` berisi `"mock"` atau `"supabase"`. `data.reset()` hanya ada di adapter mock.

## Menyimpan hasil ReviewPanel

```ts
const save = async (review: ReviewResult) => {
  await data.insert({
    kind: KIND,
    payload: { file: file?.name, bidang: review.values, keputusan: review.decisions },
    review_status: review.status,
    reviewed_by: review.reviewedBy,
  });
};
```

Halaman "Data tersimpan" menampilkan `payload.file` dan setiap pasangan di `payload.bidang`. Pakai dua nama itu supaya data kamu langsung tampil di tabel.

## Mode mock

- Data awal: `mock/records.json`.
- Perubahan tersimpan di `localStorage` browser itu saja. Laptop lain tidak melihat perubahan itu.
- Setelah kamu mengubah `mock/records.json`, klik "Reset data dummy" di halaman "Data tersimpan". Tanpa langkah ini, browser tetap menampilkan data lama.
- Setiap id di `mock/records.json` harus unik.

## Kapan memakai Supabase

Pakai Supabase jika minimal satu syarat ini benar:

- Dua perangkat atau lebih harus melihat data yang sama saat demo.
- Data harus tetap ada setelah pengguna mengganti browser.

Jika tidak, tetap pakai mode mock. Mode mock tidak punya titik gagal.

## Mengaktifkan Supabase

1. Buat project di Supabase. Tunggu sampai project siap.
2. Buka SQL Editor. Jalankan isi `supabase/schema.sql`.
3. Jalankan isi `supabase/seed.sql`.
4. Buka Project Settings > API. Salin Project URL dan anon key.
5. Isi tiga env var di Netlify (dan di `.env` untuk kerja lokal):
   ```
   VITE_DATA_SOURCE=supabase
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=...
   ```
6. Trigger deploy baru di Netlify. Untuk kerja lokal, hentikan lalu jalankan lagi `npm run dev`.
7. Periksa badge. Badge harus menunjukkan "DATA SUPABASE".

Env var dengan awalan `VITE_` masuk ke file build. Perubahan nilai baru berlaku setelah build baru.

## Batas keamanan Supabase

`schema.sql` membuka tabel `records` untuk semua orang yang punya anon key. Anon key ada di kode browser, jadi semua pengunjung situs bisa membaca, mengubah, dan menghapus data.

Simpan hanya data dummy atau data publik. Jangan simpan data pribadi atau data narasumber.

## Menjaga dua sumber tetap sama

`mock/records.json` dan `supabase/seed.sql` memuat data awal yang sama. Jika kamu mengubah satu file, ubah juga file yang lain.

## Tabel sendiri

Satu tabel `records` cukup untuk hampir semua prototipe. Bedakan jenis data dengan `kind`.

Jika kamu benar-benar butuh tabel lain, buat tabel itu di Supabase dan tulis fungsi baru di `src/lib/data/supabaseAdapter.ts`. Mode mock tidak akan mendukung tabel itu kecuali kamu juga mengubah `mockAdapter.ts`.
