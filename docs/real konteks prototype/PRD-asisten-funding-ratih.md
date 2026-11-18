# PRD — Asisten Funding Ratih (prototype workshop)

> Kelompok 3 · Workshop Double Diamond · 18 November 2026
> Status: prototype demo (AI di-mock, semua data fiktif)

## 1. Konteks
- **Pengguna:** Ratih, pemimpin "Kabar Priangan", media lokal independen di Bandung (fiktif).
- **Problem statement:** Ratih butuh cara untuk mengomunikasikan nilai unik dan kredibilitas brand medianya kepada calon partner & investor, sehingga target funding tahunan dapat terpenuhi.
- **HMW (gabungan):** Bagaimana kita membantu Ratih menerjemahkan value & branding medianya menjadi narasi pitching yang personal, sehingga jaringan klien, partner, dan investor (lama maupun baru) mau mendukung funding redaksi dan kesejahteraan mitranya?

## 2. Konsep solusi
Asisten berbasis AI yang menemani Ratih melewati 5 tahap:

1. **Data creation:** bank data relasi (klien, partner, investor) beserta riwayat dan minatnya.
2. **AI / context gathering:** AI membaca karya tulis dan data audiens redaksi untuk merumuskan nilai unik media.
3. **AI system utilization:** AI mencocokkan nilai itu dengan kebutuhan partner, lalu menyusun konsep aktivasi dan pitch yang dipersonalisasi.
4. **Strategy execution:** Ratih mengedit, menyetujui, dan mengirim pitch; sistem menyiapkan timeline aktivasi.
5. **AI performance monitoring:** memantau kuantitas dan kualitas proposal (berapa partner yang dijangkau, berapa proposal yang goal), ditambah bukti nilai dari aktivasi untuk pitch berikutnya.

**Prinsip:** AI menyiapkan, Ratih memutuskan. Tidak ada yang terkirim tanpa persetujuan Ratih.

## 3. Skenario demo
Ratih ingin mengajak **Eiger** (brand outdoor) bekerja sama dalam aktivasi peringatan **Hari Ibu, 22 Desember**.
Semua data Eiger dan orang-orang di dalamnya **fiktif** untuk keperluan demo.

## 4. Stack & batasan
- Satu file `index.html` (HTML/CSS/JS vanilla), tanpa build step, tanpa library wajib.
- Cara menjalankan: buka `index.html` di browser, atau `npx serve .`.
- AI di-**mock**: semua output di-hardcode, dengan animasi "AI sedang bekerja" (1–2 detik, menampilkan langkah-langkahnya).
- Tanpa login, backend, database, API LLM, atau integrasi email/CRM.

## 5. Layar & fitur
Elemen global: stepper 5 tahap di bagian atas (bisa diklik), badge **"AI menyarankan"** dan **"Keputusan Ratih"**.

### Layar 1 — Relasi (L1–L3)
- Grid 5 kartu relasi: Eiger, bank daerah (BUMD), kedai kopi lokal, yayasan filantropi, kampus.
- Isi kartu: nama, kategori (partner/klien/investor), PIC fiktif, riwayat interaksi, minat, status (hangat/dingin).
- Banner notifikasi AI: *"Peluang: Hari Ibu 22 Des cocok dengan fokus Eiger pada petualangan & perempuan di alam. Mulai susun pendekatan?"* + tombol "Abaikan".
- Tombol **Mulai susun pendekatan**.

### Layar 2 — Konteks (L4–L6)
- Animasi AI membaca arsip redaksi.
- 3 artikel relevan + alasan relevansi, masing-masing dengan checkbox:
  - "Mak Iyah, 20 Tahun Menanam Pohon di Lereng Burangrang"
  - "Komunitas Ibu Pendaki Bandung Bersihkan Jalur Manglayang Tiap Bulan"
  - "Perempuan Petani Kopi Puntang Menembus Pasar Ekspor"
- Snapshot audiens (dummy): 180 rb pembaca/bulan, 48% perempuan, 62% usia 25–40, IG 45 rb followers, topik teratas lingkungan & UMKM.
- Tombol **Rancang pitch** (nonaktif jika tidak ada artikel terpilih).

### Layar 3 — Rancang pitch (L7–L10) — INTI DEMO
- Konsep aktivasi **"Ibu Penjaga Alam"**: seri liputan 3 tokoh ibu + hiking keluarga di Tahura Djuanda + konten IG kolaborasi.
- Value exchange: Redaksi → Eiger (reach, kredibilitas, cerita autentik); Eiger → Redaksi (funding, perlengkapan, honor mitra/kontributor).
- Draf email pitch untuk PIC Eiger + one-pager proposal (latar, konsep, deliverable, timeline, paket harga dummy).
- Setiap klaim diberi **label sumber**. Saat diklik, artikel/data asalnya tersorot.
- Toggle tone (formal / hangat), teks bisa diedit langsung, tombol **Buat ulang** dan **Setujui**.
- Teks hasil edit Ratih dibedakan secara visual dari teks buatan AI.

### Layar 4 — Eksekusi (L11–L12)
- Tombol **Kirim** → dialog konfirmasi ("Kirim" / "Kembali ke draf") → status "Terkirim" (mock).
- Timeline: H-30 pitch, H-21 follow-up, H-14 produksi liputan, 22 Des event & publikasi, H+7 laporan ke partner.
- Saran AI: 2 media/komunitas lokal untuk co-publikasi.

### Layar 5 — Monitoring (L13–L14)
- **Pipeline proposal (fokus utama layar ini)**, berbentuk funnel dengan angka dummy per kuartal (Q4 2026):
  - Partner direachout: 24
  - Proposal terkirim: 18
  - Proposal dibalas: 9 (50%)
  - Proposal goal (deal tercapai): 5 (28% dari yang terkirim)
  - Funding terkumpul: Rp 425 jt dari target tahunan Rp 1,2 M (35%)
- Pembanding "sebelum memakai asisten" (dummy): 6 proposal terkirim/kuartal, 1 goal.
- Tabel proposal: partner, tanggal kirim, status (Terkirim / Dibalas / Negosiasi / Goal / Ditolak), nilai (Rp). Proposal Eiger muncul di sini.
- Insight AI (mock): *"Proposal yang memakai ≥2 karya redaksi sebagai bukti 2× lebih sering goal."* Insight ini menghubungkan kualitas proposal dengan fitur label sumber.
- Panel sekunder, hasil aktivasi Eiger: views, engagement, peserta event → estimasi nilai media (Rp).
- Tombol **Simpan sebagai bukti** → kembali ke kartu Eiger (status "hangat", riwayat bertambah).

## 6. Scope
| Harus ada | Di-mock | Tidak dibuat |
|---|---|---|
| Stepper 5 tahap, pilih Eiger, centang artikel, generate pitch, edit + setujui, kirim, dashboard monitoring | Semua output AI, data relasi, metrik, pengiriman | Login, backend, API LLM, integrasi email/CRM, balasan partner |

## 7. Kriteria selesai (demo 3 menit)
1. Notif peluang muncul → klik → masuk konteks Eiger.
2. Artikel relevan & data audiens tampil dan bisa dipilih.
3. Pitch + konsep aktivasi muncul dengan label sumber, bisa diedit & disetujui.
4. Status "Terkirim" + timeline tampil.
5. Dashboard monitoring menampilkan funnel proposal (reachout → terkirim → dibalas → goal) dan funding vs target, lalu hasilnya kembali ke kartu relasi.

## 8. Metrik keberhasilan

### 8a. Metrik solusi (dipantau di Layar 5)
Keberhasilan solusi diukur dari **kuantitas** dan **kualitas** proposal.

| Dimensi | Metrik | Definisi | Arah |
|---|---|---|---|
| Kuantitas | Partner direachout | Jumlah partner unik yang dihubungi per kuartal | Naik |
| Kuantitas | Proposal terkirim | Jumlah proposal yang dikirim per kuartal | Naik |
| Efektivitas | Response rate | Proposal dibalas ÷ proposal terkirim | Naik |
| **Kualitas (metrik utama)** | **Proposal goal** | Jumlah proposal yang berujung deal/funding | Naik |
| Kualitas | Win rate | Proposal goal ÷ proposal terkirim | Naik |
| Dampak | Funding terkumpul | Total Rp dari proposal goal vs target tahunan | Naik |

Asumsi: "goal" berarti proposal disetujui partner dan berujung kerja sama atau funding.

### 8b. Sinyal user testing
- Peserta mengedit draf sebelum menyetujui (tanda kendali).
- Peserta memperhatikan label sumber tanpa diminta (tanda kepercayaan).
- Skor keyakinan mengirim pitch ≥ 4 dari 5.

## 9. Cara membangun (instruksi untuk Claude Code)
Bangun bertahap:
1. Stepper + navigasi 5 layar dengan data dummy.
2. Interaksi inti di layar 3 (label sumber, edit, tone, setujui).
3. Animasi AI dan polesan visual.
