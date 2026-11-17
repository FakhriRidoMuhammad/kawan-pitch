# Membuat alur baru

Panduan ini mengubah alur contoh menjadi ide tim kamu. Target waktu: 20 sampai 30 menit untuk versi pertama.

## Langkah 0: ubah identitas

Buka `src/config.ts`. Ubah empat nilai:

```ts
export const APP = {
  name: "Nama prototipe",
  problem: "Bagaimana kita bisa membantu [siapa] menghadapi [masalah] di tahap [alur kerja]?",
  team: "Tim A",
};
```

Ubah `ROLES` jika prototipe kamu memakai peran lain.

## Langkah 1: pilih pola

Hampir semua ide cocok dengan satu dari tiga pola. Pilih pola yang paling dekat.

| Pola | Masukan | File untuk disalin |
|---|---|---|
| A. Dokumen | PDF atau gambar | `src/pages/ExampleFlow.tsx` |
| B. Teks | Teks yang pengguna ketik atau tempel | `src/pages/Transcript.tsx` (hapus pemutar audio) |
| C. Audio | Transkrip dengan cap waktu | `src/pages/Transcript.tsx` |

## Langkah 2: salin dan ubah halaman

Contoh ini memakai pola A.

1. Salin `src/pages/ExampleFlow.tsx` menjadi `src/pages/NamaAlur.tsx`.
2. Ganti nama fungsi `ExampleFlow` menjadi `NamaAlur`.
3. Ubah lima konstanta di bagian atas file:

| Konstanta | Isi |
|---|---|
| `KIND` | Jenis data, misal `"proposal"`. Nilai ini masuk ke kolom `kind`. |
| `FIELDS` | Daftar kolom yang AI harus isi |
| `SYSTEM` | Peran AI dalam satu atau dua kalimat |
| `PROMPT` | Instruksi lengkap untuk AI |
| `SAMPLE_URL` | Lokasi file contoh di `public/samples/` |

4. Ubah nilai `mockKey` di dalam fungsi `extract`, misal `"ekstrak-proposal"`.
5. Ubah judul dan teks penjelasan di bagian `return`.

## Langkah 3: tulis jawaban tiruan

Buka `mock/ai-responses.json`. Tambah satu kunci yang sama dengan `mockKey`:

```json
"ekstrak-proposal": {
  "bidang": [
    { "nama": "Tenggat", "nilai": "30 November 2026", "kutipan_sumber": "Batas akhir: 30 November 2026", "yakin": "tinggi" },
    { "nama": "Dana maksimal", "nilai": "Rp 150.000.000", "kutipan_sumber": "hingga Rp 150 juta per redaksi", "yakin": "sedang" }
  ]
}
```

Tulis jawaban tiruan yang realistis. Masukkan minimal satu kolom dengan `yakin: "rendah"`. Kolom itu menunjukkan kepada jurnalis tempat AI bisa salah.

## Langkah 4: daftarkan halaman

1. Buka `src/App.tsx`. Tambah impor dan satu baris rute:
   ```tsx
   <Route path="proposal" element={<NamaAlur />} />
   ```
2. Buka `src/config.ts`. Tambah satu baris di `NAV`:
   ```ts
   { to: "/proposal", label: "Proposal" },
   ```
3. Hapus rute dan menu yang tidak kamu pakai.

## Langkah 5: siapkan data dummy

1. Taruh file contoh di `public/samples/`.
2. Ubah `mock/records.json` supaya halaman "Data tersimpan" memuat contoh yang cocok dengan ide kamu.
3. Klik "Reset data dummy" di halaman "Data tersimpan". Browser menyimpan data lama sampai kamu menekan tombol itu.

## Langkah 6: uji

1. Jalankan `npm run dev`. Jalankan alur sampai data tersimpan.
2. Jalankan `npm run build`. Perbaiki setiap error.
3. Push. Lalu uji alur di URL Netlify dengan AI asli.

## Jika ide tidak cocok dengan tiga pola

- **Jawaban berupa teks panjang, bukan kolom.** Hapus `schema` dari panggilan `ai.run()`. Baca hasil dari `ai.result.text`. Tampilkan teks itu di `Textarea` supaya manusia bisa mengubah teks sebelum menyimpan.
- **Beberapa versi keluaran (misal satu artikel menjadi tiga format).** Pakai `AI_FIELDS_SCHEMA`. Minta AI membuat satu kolom per format.
- **Daftar item, bukan kolom tetap.** Pakai `AI_FIELDS_SCHEMA`. Minta AI memberi nama kolom "Item 1", "Item 2", dan seterusnya.
- **Skema sendiri.** Baca bagian "Skema sendiri" di `03-ai.md`.

Jangan hapus `ReviewPanel` dari alur. Prototype card meminta titik keputusan manusia. Jika kolom itu kosong, ide itu bermasalah.
