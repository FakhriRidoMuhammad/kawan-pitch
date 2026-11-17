# Hari acara

Panduan ini untuk sesi satu hari dengan waktu build kira-kira 2 jam. Angka waktu adalah usul. Fasilitator menentukan jadwal yang sebenarnya.

## Sebelum berangkat

1. Laptop dan pengisi daya.
2. Folder boilerplate dengan `node_modules` yang sudah terpasang. Jangan bergantung pada Wi-Fi venue untuk `npm install`.
3. API key, kode akses demo, dan akses login ke GitHub dan Netlify.
4. Satu latihan deploy sudah berhasil (bagian B di `docs/KICKSTART.md`).

## Selama tahap masalah dan ide

Kamu belum menulis kode. Kerjakan tiga hal:

1. **Deploy kerangka kosong.** Duplikat folder, buat repo, hubungkan Netlify, isi env var. URL publik harus hidup sebelum tahap build mulai.
2. **Dengarkan contoh nyata dari jurnalis.** Catat nama dokumen, nama kolom, dan kata yang mereka pakai. Kata itu menjadi teks UI dan nama kolom.
3. **Jawab pertanyaan kelayakan dengan jujur.** Tabel di bawah membantu.

| Jurnalis meminta | Jawaban |
|---|---|
| AI membaca PDF atau foto dokumen | Bisa. Pola A. |
| AI meringkas atau mengubah teks | Bisa. Pola B. |
| AI membaca beberapa dokumen dan menghubungkannya | Bisa, maksimal 3 file dan 4 MB per file |
| AI mentranskripsi audio | Tidak bisa dengan boilerplate ini. Pakai transkrip dummy. Demo menunjukkan langkah setelah transkrip ada. |
| AI mencari di internet | Tidak ada di boilerplate. Pakai dokumen yang sudah diunduh sebagai pengganti. |
| Login dan hak akses asli | Tidak ada. Pengalih peran sudah cukup untuk demo. |
| Kirim email, WhatsApp, atau unggahan ke media sosial | Tiruan saja. Tampilkan pratinjau dan tombol yang tidak mengirim apa pun. |

## Saat tim memilih satu ide

Minta tim menjawab empat pertanyaan sebelum kamu menulis kode. Jawaban itu menjadi isi file halaman.

1. Apa masukan pengguna? (dokumen, teks, atau transkrip)
2. Kolom apa yang AI harus isi? (menjadi `FIELDS`)
3. Di titik mana manusia memeriksa dan memutuskan? (menjadi `ReviewPanel`)
4. Siapa penggunanya? (menjadi peran aktif saat demo)

## Pembagian waktu build 2 jam

| Menit | Kerja | Hasil |
|---|---|---|
| 0–10 | Ubah `src/config.ts`. Salin halaman contoh. | Nama dan rumusan masalah tampil |
| 10–40 | Ubah `FIELDS`, `PROMPT`, dan jawaban tiruan. Siapkan data dummy. | Alur berjalan dengan AI MOCK |
| 40–50 | Push. Uji di URL publik dengan AI asli. | Alur berjalan dengan AI CLAUDE |
| 50–90 | Perbaiki prompt bersama jurnalis. Terapkan masukan desainer. | Keluaran AI masuk akal bagi jurnalis |
| 90–110 | Rapikan teks UI. Hapus menu yang tidak dipakai. Isi data dummy akhir. | Siap diuji tim lain |
| 110–120 | Push terakhir. Uji dari ponsel atau laptop lain. Berhenti menulis kode. | URL siap dibagikan |

Dua aturan:

1. **Push pertama paling lambat menit ke-50.** Masalah deploy lebih mudah diperbaiki saat kode masih sedikit.
2. **Jangan push dalam 10 menit terakhir**, kecuali untuk memperbaiki kerusakan.

## Bekerja dengan Claude Code

Claude Code membaca `CLAUDE.md` secara otomatis. File itu memuat konvensi dan resep. Kamu cukup menulis permintaan yang jelas.

Prompt untuk alur baru:

```
Buat alur baru dengan menyalin src/pages/ExampleFlow.tsx.
Nama halaman: Proposal. Rute: /proposal. kind: "proposal".
Masukan: PDF panduan hibah.
Kolom yang AI isi: Tenggat, Dana maksimal, Syarat pelamar, Dokumen wajib.
Pengguna: pimpinan redaksi.
Tulis jawaban tiruan di mock/ai-responses.json dengan satu kolom "yakin: rendah".
Hapus rute Transkrip dari menu.
Jalankan npm run build setelah selesai.
```

Prompt untuk perubahan tampilan:

```
Desainer memberi warna utama #1D4ED8 dan font "Plus Jakarta Sans".
Ubah token di src/index.css. Jangan ubah warna badge mode.
```

Prompt untuk aturan peran:

```
Di halaman Proposal, hanya peran pimred yang melihat tombol "Setujui untuk dikirim".
Peran lain melihat teks "Menunggu keputusan Pimpinan Redaksi".
```

Kebiasaan yang menghemat waktu:

- Minta satu perubahan per prompt. Uji di browser setelah setiap perubahan.
- Beri kata persis dari jurnalis untuk teks UI.
- Minta `npm run build` di akhir setiap perubahan besar.
- Jangan minta fitur yang tidak akan tampil di demo.

## Bekerja dengan desainer

- Desainer membuat sketsa di kertas atau Figma. Kamu menerjemahkan sketsa itu.
- Minta tiga hal di awal: satu warna utama, satu font, dan urutan layar.
- Tunjukkan URL publik kepada desainer setiap 20 sampai 30 menit.

## Bekerja dengan jurnalis

- Tampilkan `SYSTEM` dan `PROMPT` kepada jurnalis. Mereka tahu aturan kerja redaksi lebih baik daripada kamu.
- Minta jurnalis menulis data dummy. Data dari jurnalis lebih realistis.
- Tanyakan: "Di bagian mana kamu tidak percaya pada output ini?" Jawaban itu menunjukkan tempat `ReviewPanel` harus lebih kuat.

## Saat uji coba dengan tim lain

1. Bagikan URL publik dan kode akses.
2. Sebut mode yang aktif. Badge di header membantu kamu.
3. Biarkan jurnalis mengklik sendiri. Jangan pegang mouse mereka.
4. Catat dua hal untuk prototype card: "Mau memakai karena..." dan "Akan gagal ketika...".
5. Jika AI asli gagal, jalankan `npm run dev` dan tunjukkan demo dari laptop kamu. `npm run dev` selalu memakai AI MOCK.

## Prototype card

Salin `docs/prototype-card-template.md`. Isi kolom 1 sampai 6 saat tim memilih ide. Isi kolom 7 dengan URL Netlify. Isi kolom 8 sampai 10 setelah uji coba.

Isi juga bagian "Catatan teknis": bagian mana yang asli dan bagian mana yang tiruan. Catatan itu mencegah orang salah menilai kemampuan prototipe.

## Setelah sesi

1. Hapus atau cabut API key.
2. Simpan prototype card di repo acara.
3. Salin perbaikan yang berguna ke folder boilerplate asli.
4. Tulis hal yang menghambat kamu di `08-masalah-umum.md`.
