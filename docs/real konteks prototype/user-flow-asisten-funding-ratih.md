# User Flow — Asisten Funding Ratih

> Skenario: Ratih mengajak Eiger bekerja sama untuk aktivasi Hari Ibu (22 Desember).
> Nomor langkah (L1–L14) sama dengan PRD dan panduan user testing.
> Hijau = kerja AI ("AI menyarankan") · Biru = keputusan Ratih.

## Alur utama

```mermaid
flowchart TD
    Start([Ratih membuka aplikasi]) --> L1

    subgraph T1["1 · Relasi (Data creation)"]
        L1["L1 · Beranda: 5 kartu relasi<br/>+ banner peluang Hari Ibu × Eiger"]
        L1 --> D1{Tindak lanjuti<br/>peluang?}
        D1 -- Abaikan --> L1x[Banner hilang,<br/>kartu Eiger tetap ada]
        D1 -- Ya --> L2["L2 · Detail kartu Eiger:<br/>PIC, riwayat, minat, alasan AI"]
        L2 --> L3["L3 · Klik 'Mulai susun pendekatan'"]
    end

    subgraph T2["2 · Konteks (AI / context gathering)"]
        L4["L4 · AI membaca arsip:<br/>3 artikel relevan + snapshot audiens"]
        L4 --> L5["L5 · Ratih mencentang / menghapus artikel"]
        L5 --> D2{Minimal 1<br/>artikel dipilih?}
        D2 -- Tidak --> W2[Tombol nonaktif +<br/>pesan 'Pilih minimal 1 karya'] --> L5
        D2 -- Ya --> L6["L6 · Klik 'Rancang pitch'"]
    end

    subgraph T3["3 · Rancang pitch (AI system utilization)"]
        L7["L7 · AI: konsep 'Ibu Penjaga Alam'<br/>+ value exchange"]
        L7 --> L8["L8 · AI: draf email + one-pager<br/>dengan label sumber per klaim"]
        L8 --> L9["L9 · Ratih ganti tone / edit teks"]
        L9 --> D3{Puas dengan<br/>draf?}
        D3 -- Buat ulang --> L8
        D3 -- Ganti artikel --> L5
        D3 -- Ya --> L10["L10 · Klik 'Setujui'"]
    end

    subgraph T4["4 · Eksekusi (Strategy execution)"]
        L11["L11 · Klik 'Kirim'"] --> D4{Konfirmasi<br/>kirim?}
        D4 -- Kembali ke draf --> L9
        D4 -- Kirim --> S4[Status 'Terkirim' · mock]
        S4 --> L12["L12 · Timeline H-30 s.d. H+7<br/>+ saran 2 mitra co-publikasi"]
    end

    subgraph T5["5 · Monitoring (AI performance monitoring)"]
        L13["L13 · Funnel proposal: reachout → terkirim<br/>→ dibalas → goal + funding vs target"]
        L13 --> L14["L14 · Klik 'Simpan sebagai bukti'"]
    end

    L3 --> L4
    L6 --> L7
    L10 --> L11
    L12 --> L13
    L14 --> End([Kartu Eiger diperbarui:<br/>status 'hangat', riwayat bertambah])
    End -. memperkaya pitch berikutnya .-> L1

    classDef ai fill:#E6F4EA,stroke:#2E7D32,color:#1B1B1B;
    classDef human fill:#E3F2FD,stroke:#1565C0,color:#1B1B1B;
    classDef warn fill:#FFF8E1,stroke:#F9A825,color:#1B1B1B;
    class L1,L2,L4,L7,L8,L12,L13 ai;
    class L3,L5,L6,L9,L10,L11,L14,D1,D2,D3,D4 human;
    class W2,L1x,S4 warn;
```

## Ringkas: siapa melakukan apa

```mermaid
sequenceDiagram
    actor R as Ratih
    participant A as Asisten AI
    participant P as Eiger (fiktif)

    A->>R: Notif peluang Hari Ibu × Eiger (L1)
    R->>A: Mulai susun pendekatan (L3)
    A->>R: 3 artikel relevan + data audiens (L4)
    R->>A: Pilih artikel (L5–L6)
    A->>R: Konsep aktivasi + draf pitch berlabel sumber (L7–L8)
    R->>R: Edit, atur tone, setujui (L9–L10)
    R->>P: Kirim pitch (L11, mock)
    A->>R: Timeline + saran co-publikasi (L12)
    A->>R: Funnel proposal + win rate + funding vs target (L13)
    R->>A: Simpan sebagai bukti (L14)
```

## Titik kritis untuk desain & testing
- **L5, L9, L10:** di sini kendali Ratih atas AI harus paling terasa.
- **L8:** label sumber adalah kunci kredibilitas. Amati apakah peserta testing melihatnya tanpa diminta.
