# The Good AI! — Brief 7 pain point

Acara: Ideation & Lo-fi Prototype Co-Creation, 18–20 November 2026, Fragment Project, Bandung. Sumber lengkap: `ToR.md` di folder ini.

## Syarat prototipe

- Prototipe kasar yang cukup untuk ditanggapi. Bukan produk jadi.
- Terikat pada satu pain point, satu pengguna, dan satu tahap alur kerja.
- Wajib menunjukkan titik tempat jurnalis memeriksa, mengubah, atau memutuskan.
- Hanya data dummy atau data publik.
- Pertanyaan uji: "Apakah prototipe ini mengurangi beban kerja total, atau hanya memindahkan beban ke tahap belakang?"

Tahap alur kerja: perencanaan, riset, liputan, draf, penyuntingan, terbit, distribusi, pascaterbit.

## Pain point dan titik mulai di boilerplate

Kolom "Titik mulai" adalah usul saya, bukan isi ToR. Tim jurnalis yang memilih ide.

| # | Pain point | Inti masalah | Titik mulai di boilerplate | Data dummy yang perlu disiapkan |
|---|---|---|---|---|
| 1 | Pencarian & pemaknaan informasi | Informasi tercecer di banyak sumber dan format. Jurnalis memvalidasi dan menghubungkan informasi itu sendiri. | Salin `ExampleFlow.tsx`. Unggah beberapa PDF publik. AI mengekstrak klaim dengan `kutipan_sumber`. | 2–3 PDF publik (peraturan, laporan tahunan, rilis instansi) |
| 2 | Akses narasumber, keamanan & emosi | Akses bergantung pada kepercayaan dan bahasa. Wawancara sensitif menuntut perlindungan narasumber. | Form teks + `askAI` tanpa file. Contoh: daftar periksa persiapan wawancara, penyamaran identitas di draf. | Profil narasumber fiktif, draf dengan nama fiktif |
| 3 | Transkripsi tidak akurat | Audio bising dan bahasa campuran membuat transkrip keliru. Nada dan emosi hilang. | `Transcript.tsx` + `TranscriptPlayer`. Baris dengan `flag` menandai bagian yang harus didengar ulang. | `mock/transcript.json` + satu file audio di `public/samples/` |
| 4 | Interupsi & kesinambungan liputan | Liputan panjang terpotong penugasan rutin. Jurnalis menyusun ulang konteks dari awal. | `data.list("catatan")` + `askAI` untuk ringkasan "posisi terakhir". | 5–8 catatan liputan fiktif dengan tanggal berbeda |
| 5 | Audiens & distribusi | Satu liputan diolah ulang untuk tiap platform. Jangkauan jarang kembali ke situs. | Textarea artikel + `askAI` dengan skema per platform. `ReviewPanel` per versi. | 1 artikel yang sudah terbit (publik) |
| 6 | Pendapatan & nilai konten | Pemasukan dirangkai dari banyak sumber. Tiap sumber menambah dokumen. | Unggah panduan hibah (PDF). AI memetakan syarat ke daftar periksa proposal. | 1 panduan hibah publik, profil redaksi fiktif |
| 7 | Beban operasional & administratif | Invoice, kuitansi, dan laporan dicek manual. Beban menumpuk di editor dan pimpinan. | `ExampleFlow.tsx` langsung cocok (alur kuitansi). | `public/samples/kuitansi-contoh.pdf` + 2–3 variasi |

## Kalimat rumusan masalah

"Bagaimana kita bisa membantu [siapa] menghadapi [masalah] di tahap [alur kerja]?"

Tulis kalimat ini di `APP.problem` pada `src/config.ts`.
