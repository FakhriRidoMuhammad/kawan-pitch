// Semua data di file ini FIKTIF untuk keperluan demo workshop.

export type RelasiStatus = "hangat" | "dingin";

export interface Relasi {
  id: string;
  nama: string;
  kategori: "Partner" | "Klien" | "Investor";
  pic: string;
  riwayat: string[];
  minat: string[];
  status: RelasiStatus;
}

export const RELASI: Relasi[] = [
  {
    id: "eiger",
    nama: "Eiger",
    kategori: "Partner",
    pic: "Dina Kusuma (Brand Manager, fiktif)",
    riwayat: ["Mar 2026 · Iklan banner kampanye Earth Day", "Agu 2025 · Bertemu di acara komunitas outdoor"],
    minat: ["Petualangan", "Perempuan di alam", "Konservasi"],
    status: "dingin",
  },
  {
    id: "bumd",
    nama: "Bank Jabar Daerah (BUMD)",
    kategori: "Klien",
    pic: "Hendra Saputra (Humas, fiktif)",
    riwayat: ["Jun 2026 · Advertorial literasi keuangan UMKM"],
    minat: ["UMKM", "Literasi keuangan"],
    status: "hangat",
  },
  {
    id: "kopi",
    nama: "Kedai Kopi Lereng",
    kategori: "Klien",
    pic: "Asep Rahman (Pemilik, fiktif)",
    riwayat: ["Sep 2026 · Sponsor diskusi publik bulanan"],
    minat: ["Kopi lokal", "Komunitas"],
    status: "hangat",
  },
  {
    id: "yayasan",
    nama: "Yayasan Cahaya Nusantara",
    kategori: "Investor",
    pic: "Maria Lestari (Program Officer, fiktif)",
    riwayat: ["2025 · Hibah pelatihan jurnalisme data"],
    minat: ["Jurnalisme publik", "Kesetaraan gender"],
    status: "dingin",
  },
  {
    id: "kampus",
    nama: "Universitas Parahyangan Raya",
    kategori: "Partner",
    pic: "Dr. Yusuf Hakim (Dekan FISIP, fiktif)",
    riwayat: ["Okt 2026 · Program magang 6 mahasiswa"],
    minat: ["Magang", "Riset media"],
    status: "hangat",
  },
];

export const ALASAN_AI_EIGER = [
  "Hari Ibu (22 Des) dekat dengan kampanye akhir tahun Eiger.",
  "Eiger sedang fokus pada narasi perempuan di alam dan konservasi.",
  "Redaksi punya 3 liputan tokoh ibu dan alam yang relevan.",
];

export interface Artikel {
  id: string;
  kode: string;
  judul: string;
  tanggal: string;
  views: string;
  alasan: string;
}

export const ARTIKEL: Artikel[] = [
  {
    id: "a1",
    kode: "A1",
    judul: "Mak Iyah, 20 Tahun Menanam Pohon di Lereng Burangrang",
    tanggal: "12 Apr 2026",
    views: "38 rb pembaca",
    alasan: "Tokoh ibu + konservasi. Cocok dengan minat Eiger pada konservasi.",
  },
  {
    id: "a2",
    kode: "A2",
    judul: "Komunitas Ibu Pendaki Bandung Bersihkan Jalur Manglayang Tiap Bulan",
    tanggal: "3 Jul 2026",
    views: "52 rb pembaca",
    alasan: "Perempuan di alam + aktivitas mendaki. Paling dekat dengan produk Eiger.",
  },
  {
    id: "a3",
    kode: "A3",
    judul: "Perempuan Petani Kopi Puntang Menembus Pasar Ekspor",
    tanggal: "21 Sep 2026",
    views: "41 rb pembaca",
    alasan: "Perempuan tangguh di dataran tinggi. Membuka sudut cerita ekonomi lokal.",
  },
];

export const AUDIENS = [
  { label: "Pembaca per bulan", nilai: "180 rb" },
  { label: "Pembaca perempuan", nilai: "48%" },
  { label: "Usia 25–40", nilai: "62%" },
  { label: "Followers Instagram", nilai: "45 rb" },
  { label: "Topik teratas", nilai: "Lingkungan & UMKM" },
];

export const SUMBER_LABEL: Record<string, string> = {
  a1: "A1",
  a2: "A2",
  a3: "A3",
  aud: "Audiens",
};

export const KONSEP = {
  nama: "Ibu Penjaga Alam",
  ringkas: "Kampanye Hari Ibu yang merayakan para ibu yang menjaga alam Priangan.",
  komponen: [
    "Seri liputan 3 tokoh ibu penjaga alam (artikel + video pendek)",
    "Hiking keluarga di Tahura Djuanda pada 22 Desember",
    "Konten Instagram kolaborasi @kabarpriangan × @eigeradventure",
  ],
};

export const VALUE_EXCHANGE = {
  redaksiKePartner: ["Jangkauan 180 rb pembaca lokal", "Kredibilitas jurnalisme independen", "Cerita autentik tokoh nyata"],
  partnerKeRedaksi: ["Funding liputan", "Perlengkapan untuk tim lapangan", "Honor mitra & kontributor"],
};

export type Tone = "formal" | "hangat";

export interface Segmen {
  id: string;
  bagian: "email" | "onepager";
  judul?: string; // judul subbagian one-pager
  formal: string;
  hangat: string;
  /** Varian setelah "Buat ulang". */
  alt?: { formal: string; hangat: string };
  sumber?: "a1" | "a2" | "a3" | "aud";
}

export const SEGMEN: Segmen[] = [
  // ---- Email
  {
    id: "e1",
    bagian: "email",
    formal: "Yth. Ibu Dina Kusuma,",
    hangat: "Halo Mbak Dina,",
  },
  {
    id: "e2",
    bagian: "email",
    formal:
      "Saya Ratih, pemimpin redaksi Kabar Priangan. Kami ingin mengajak Eiger berkolaborasi dalam kampanye Hari Ibu, 22 Desember 2026.",
    hangat:
      "Saya Ratih dari Kabar Priangan. Semoga kabar Mbak baik! Kami punya ide seru untuk Hari Ibu, 22 Desember nanti, dan langsung teringat Eiger.",
    alt: {
      formal:
        "Perkenalkan, saya Ratih dari Kabar Priangan. Menjelang Hari Ibu 22 Desember 2026, kami melihat peluang kolaborasi yang sejalan dengan nilai Eiger.",
      hangat:
        "Saya Ratih dari Kabar Priangan. Menjelang Hari Ibu, kami kepikiran satu cerita yang rasanya Eiger banget!",
    },
  },
  {
    id: "e3",
    bagian: "email",
    sumber: "a1",
    formal:
      "Liputan kami tentang Mak Iyah, yang 20 tahun menanam pohon di lereng Burangrang, menunjukkan kekuatan cerita ibu penjaga alam.",
    hangat: "Cerita Mak Iyah yang 20 tahun menanam pohon di Burangrang bikin banyak pembaca kami terharu.",
  },
  {
    id: "e4",
    bagian: "email",
    sumber: "a2",
    formal:
      "Liputan Komunitas Ibu Pendaki Bandung dibaca 52 ribu orang. Ini menunjukkan minat tinggi pada perempuan yang aktif di alam.",
    hangat: "Liputan Komunitas Ibu Pendaki Bandung juga dibaca 52 ribu orang. Ternyata banyak yang terinspirasi!",
  },
  {
    id: "e5",
    bagian: "email",
    sumber: "a3",
    formal: "Kisah perempuan petani kopi Puntang menambah sudut ekonomi lokal yang relevan bagi audiens Eiger.",
    hangat: "Ada juga kisah ibu-ibu petani kopi Puntang yang tangguh di dataran tinggi.",
  },
  {
    id: "e6",
    bagian: "email",
    sumber: "aud",
    formal:
      "Pembaca kami mencapai 180 ribu per bulan, 48% perempuan, dan 62% berusia 25–40 tahun. Profil ini sejalan dengan target pasar Eiger.",
    hangat: "Pembaca kami 180 ribu per bulan, hampir setengahnya perempuan usia 25–40. Pas sekali dengan sahabat Eiger.",
  },
  {
    id: "e7",
    bagian: "email",
    formal:
      "Kami mengusulkan konsep \"Ibu Penjaga Alam\". Proposal lengkap kami lampirkan. Apakah Ibu berkenan berdiskusi 30 menit minggu depan?",
    hangat:
      "Kami namai idenya \"Ibu Penjaga Alam\". Detailnya ada di lampiran. Boleh kita ngobrol 30 menit minggu depan, Mbak?",
    alt: {
      formal:
        "Konsep \"Ibu Penjaga Alam\" terlampir. Kami siap menyesuaikan dengan kebutuhan Eiger. Mohon kabari waktu yang sesuai untuk berdiskusi.",
      hangat:
        "Konsep \"Ibu Penjaga Alam\" ada di lampiran. Kami terbuka banget untuk diubah bareng. Kapan Mbak senggang buat ngopi?",
    },
  },
  {
    id: "e8",
    bagian: "email",
    formal: "Hormat saya,\nRatih — Pemimpin Redaksi, Kabar Priangan",
    hangat: "Salam hangat,\nRatih — Kabar Priangan",
  },
  // ---- One-pager
  {
    id: "o1",
    bagian: "onepager",
    judul: "Latar",
    sumber: "aud",
    formal:
      "Kabar Priangan adalah media lokal independen di Bandung dengan 180 ribu pembaca per bulan. Topik teratas kami: lingkungan dan UMKM.",
    hangat: "Kabar Priangan adalah media lokal independen di Bandung. Setiap bulan, 180 ribu warga membaca cerita kami tentang lingkungan dan UMKM.",
  },
  {
    id: "o2",
    bagian: "onepager",
    judul: "Konsep",
    sumber: "a2",
    formal:
      "\"Ibu Penjaga Alam\": seri liputan 3 tokoh ibu, hiking keluarga di Tahura Djuanda, dan konten Instagram kolaborasi. Komunitas Ibu Pendaki Bandung menjadi mitra lapangan.",
    hangat:
      "\"Ibu Penjaga Alam\": 3 cerita ibu hebat, jalan-jalan keluarga di Tahura Djuanda, dan konten IG bareng. Komunitas Ibu Pendaki Bandung ikut menemani di lapangan.",
  },
  {
    id: "o3",
    bagian: "onepager",
    judul: "Deliverable",
    formal: "3 artikel mendalam, 3 video pendek, 6 unggahan Instagram kolaborasi, 1 event hiking keluarga (±100 peserta).",
    hangat: "3 artikel, 3 video pendek, 6 unggahan IG bareng, dan 1 hiking keluarga untuk sekitar 100 peserta.",
  },
  {
    id: "o4",
    bagian: "onepager",
    judul: "Timeline",
    formal: "Pitch 22 Nov · Produksi liputan mulai 8 Des · Event & publikasi 22 Des · Laporan ke partner 29 Des.",
    hangat: "Ngobrol akhir November, liputan mulai 8 Des, hari H 22 Des, laporan hasil 29 Des.",
  },
  {
    id: "o5",
    bagian: "onepager",
    judul: "Paket (dummy)",
    formal: "Paket Utama Rp 85 juta · Paket Konten Rp 45 juta (tanpa event). Termasuk honor mitra dan kontributor.",
    hangat: "Paket Utama Rp 85 juta, atau Paket Konten Rp 45 juta tanpa event. Sudah termasuk honor mitra & kontributor.",
  },
];

export const LANGKAH_AI = {
  konteks: ["Membaca 1.240 artikel arsip redaksi…", "Mencocokkan dengan minat Eiger…", "Merangkum data audiens…"],
  pitch: ["Merumuskan konsep aktivasi…", "Menyusun value exchange…", "Menulis draf email & one-pager…", "Menautkan label sumber…"],
  ulang: ["Menulis ulang draf…", "Memeriksa label sumber…"],
};

export const TIMELINE = [
  { kapan: "H-30 · 22 Nov", apa: "Pitch terkirim ke Eiger" },
  { kapan: "H-21 · 1 Des", apa: "Follow-up & diskusi detail" },
  { kapan: "H-14 · 8 Des", apa: "Produksi liputan 3 tokoh" },
  { kapan: "22 Des", apa: "Event hiking keluarga & publikasi" },
  { kapan: "H+7 · 29 Des", apa: "Laporan hasil ke Eiger" },
];

export const CO_PUBLIKASI = [
  { nama: "Bandung Hijau Podcast", alasan: "Audiens peduli lingkungan, 12 rb pendengar/episode." },
  { nama: "Komunitas Ibu Pendaki Bandung", alasan: "Sudah diliput (A2); bisa jadi mitra lapangan & amplifikasi." },
];

export const FUNNEL = [
  { label: "Partner direachout", nilai: 24 },
  { label: "Proposal terkirim", nilai: 18 },
  { label: "Proposal dibalas", nilai: 9 },
  { label: "Proposal goal (deal)", nilai: 5 },
];

export const FUNDING = { terkumpul: 425, target: 1200 }; // dalam juta rupiah

export const SEBELUM = { terkirim: 6, goal: 1 };

export type ProposalStatus = "Terkirim" | "Dibalas" | "Negosiasi" | "Goal" | "Ditolak";

export const PROPOSAL: { partner: string; tanggal: string; status: ProposalStatus; nilai: string }[] = [
  { partner: "Bank Jabar Daerah", tanggal: "2 Okt 2026", status: "Goal", nilai: "Rp 150 jt" },
  { partner: "Yayasan Cahaya Nusantara", tanggal: "9 Okt 2026", status: "Negosiasi", nilai: "Rp 200 jt" },
  { partner: "Kedai Kopi Lereng", tanggal: "15 Okt 2026", status: "Goal", nilai: "Rp 25 jt" },
  { partner: "Universitas Parahyangan Raya", tanggal: "28 Okt 2026", status: "Dibalas", nilai: "Rp 60 jt" },
  { partner: "Toko Buku Braga", tanggal: "4 Nov 2026", status: "Ditolak", nilai: "Rp 15 jt" },
];

export const AKTIVASI = [
  { label: "Views liputan", nilai: "126 rb" },
  { label: "Engagement IG", nilai: "8,4%" },
  { label: "Peserta event", nilai: "112 orang" },
  { label: "Estimasi nilai media", nilai: "Rp 140 jt" },
];
