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

export interface Artikel {
  id: string;
  kode: string;
  judul: string;
  tanggal: string;
  views: string;
  tags: string[];
  /** Kalimat klaim yang dipakai di draf pitch. */
  klaim: { formal: string; hangat: string };
}

export const ARTIKEL: Artikel[] = [
  {
    id: "a1",
    kode: "A1",
    judul: "Mak Iyah, 20 Tahun Menanam Pohon di Lereng Burangrang",
    tanggal: "12 Apr 2026",
    views: "38 rb pembaca",
    tags: ["alam", "ibu", "perempuan", "lingkungan"],
    klaim: {
      formal: "Liputan kami tentang Mak Iyah, yang 20 tahun menanam pohon di lereng Burangrang, dibaca 38 ribu orang dan menunjukkan kekuatan cerita ibu penjaga alam.",
      hangat: "Cerita Mak Iyah yang 20 tahun menanam pohon di Burangrang bikin 38 ribu pembaca kami terharu.",
    },
  },
  {
    id: "a2",
    kode: "A2",
    judul: "Komunitas Ibu Pendaki Bandung Bersihkan Jalur Manglayang Tiap Bulan",
    tanggal: "3 Jul 2026",
    views: "52 rb pembaca",
    tags: ["outdoor", "ibu", "perempuan", "alam", "komunitas"],
    klaim: {
      formal: "Liputan Komunitas Ibu Pendaki Bandung dibaca 52 ribu orang. Ini menunjukkan minat tinggi pada perempuan yang aktif di alam.",
      hangat: "Liputan Komunitas Ibu Pendaki Bandung dibaca 52 ribu orang. Ternyata banyak yang terinspirasi!",
    },
  },
  {
    id: "a3",
    kode: "A3",
    judul: "Perempuan Petani Kopi Puntang Menembus Pasar Ekspor",
    tanggal: "21 Sep 2026",
    views: "41 rb pembaca",
    tags: ["kopi", "perempuan", "umkm"],
    klaim: {
      formal: "Kisah perempuan petani kopi Puntang yang menembus pasar ekspor dibaca 41 ribu orang dan membuka sudut ekonomi lokal.",
      hangat: "Kisah ibu-ibu petani kopi Puntang yang tembus pasar ekspor dibaca 41 ribu orang.",
    },
  },
  {
    id: "a4",
    kode: "A4",
    judul: "Pinjol vs Koperasi: Cara Pedagang Pasar Kosambi Bertahan",
    tanggal: "5 Mei 2026",
    views: "47 rb pembaca",
    tags: ["umkm", "keuangan"],
    klaim: {
      formal: "Liputan kami tentang pedagang Pasar Kosambi yang memilih koperasi daripada pinjol dibaca 47 ribu orang. Literasi keuangan UMKM adalah isu yang dicari pembaca.",
      hangat: "Cerita pedagang Pasar Kosambi yang memilih koperasi daripada pinjol dibaca 47 ribu orang. Pembaca butuh literasi keuangan!",
    },
  },
  {
    id: "a5",
    kode: "A5",
    judul: "Ibu-Ibu Penjahit Cigondewah Naik Kelas Lewat Toko Daring",
    tanggal: "18 Jun 2026",
    views: "35 rb pembaca",
    tags: ["umkm", "perempuan", "ibu"],
    klaim: {
      formal: "Liputan ibu-ibu penjahit Cigondewah yang naik kelas lewat toko daring menunjukkan dampak nyata pendampingan UMKM perempuan.",
      hangat: "Ibu-ibu penjahit Cigondewah sekarang jualan online dan omzetnya naik. Ceritanya dibaca 35 ribu orang.",
    },
  },
  {
    id: "a6",
    kode: "A6",
    judul: "Kedai Kopi Jadi Ruang Diskusi Warga Antapani",
    tanggal: "9 Agu 2026",
    views: "29 rb pembaca",
    tags: ["kopi", "komunitas", "kota"],
    klaim: {
      formal: "Liputan kami tentang kedai kopi yang menjadi ruang diskusi warga Antapani menunjukkan peran kedai sebagai ruang publik.",
      hangat: "Kedai kopi di Antapani jadi tempat warga ngobrolin kotanya. Liputannya dibaca 29 ribu orang.",
    },
  },
  {
    id: "a7",
    kode: "A7",
    judul: "Mahasiswa Bandung Bangun Peta Banjir Berbasis Warga",
    tanggal: "14 Feb 2026",
    views: "33 rb pembaca",
    tags: ["pendidikan", "anak muda", "lingkungan", "kota"],
    klaim: {
      formal: "Liputan mahasiswa Bandung yang membangun peta banjir berbasis warga dibaca 33 ribu orang dan dikutip oleh pemerintah kota.",
      hangat: "Mahasiswa Bandung bikin peta banjir bareng warga, dan liputannya sampai dikutip pemkot.",
    },
  },
  {
    id: "a8",
    kode: "A8",
    judul: "Sinden Muda Menjaga Tembang Sunda di Era TikTok",
    tanggal: "27 Okt 2026",
    views: "61 rb pembaca",
    tags: ["budaya", "anak muda", "perempuan"],
    klaim: {
      formal: "Liputan sinden muda yang menjaga tembang Sunda di era TikTok adalah artikel kami yang paling banyak dibagikan tahun ini (61 ribu pembaca).",
      hangat: "Liputan sinden muda yang viral di TikTok jadi artikel paling banyak dibagikan tahun ini: 61 ribu pembaca!",
    },
  },
  {
    id: "a9",
    kode: "A9",
    judul: "Jurnalis Perempuan di Daerah: Gaji Rendah, Risiko Tinggi",
    tanggal: "8 Mar 2026",
    views: "26 rb pembaca",
    tags: ["gender", "perempuan"],
    klaim: {
      formal: "Laporan mendalam kami tentang kondisi jurnalis perempuan di daerah dikutip oleh dua organisasi pers nasional.",
      hangat: "Laporan kami soal jurnalis perempuan di daerah sampai dikutip dua organisasi pers nasional.",
    },
  },
  {
    id: "a10",
    kode: "A10",
    judul: "Angkot Bandung dan Mimpi Transportasi Publik yang Ramah Perempuan",
    tanggal: "30 Jul 2026",
    views: "44 rb pembaca",
    tags: ["transportasi", "kota", "gender", "perempuan"],
    klaim: {
      formal: "Liputan kami tentang transportasi publik yang ramah perempuan dibaca 44 ribu orang dan memicu diskusi di DPRD.",
      hangat: "Liputan soal angkot yang ramah perempuan dibaca 44 ribu orang dan sampai dibahas di DPRD.",
    },
  },
];

export const AUDIENS = [
  { label: "Pembaca per bulan", nilai: "180 rb" },
  { label: "Pembaca perempuan", nilai: "48%" },
  { label: "Usia 25–40", nilai: "62%" },
  { label: "Followers Instagram", nilai: "45 rb" },
  { label: "Topik teratas", nilai: "Lingkungan & UMKM" },
];

/** Kata di prompt Ratih yang memicu sebuah tag topik. */
export const TAG_KATA: Record<string, string[]> = {
  alam: ["alam", "hutan", "pohon", "gunung"],
  perempuan: ["perempuan", "wanita", "kartini"],
  ibu: ["ibu", "mama"],
  outdoor: ["outdoor", "hiking", "mendaki", "pendaki", "camping", "petualangan"],
  umkm: ["umkm", "ukm", "usaha", "pedagang", "pasar", "wirausaha"],
  keuangan: ["bank", "keuangan", "kredit", "pinjol", "koperasi", "finansial"],
  kopi: ["kopi", "kedai", "ngopi", "kafe"],
  komunitas: ["komunitas", "warga"],
  pendidikan: ["kampus", "mahasiswa", "sekolah", "pendidikan", "beasiswa", "magang", "guru", "universitas"],
  "anak muda": ["anak muda", "gen z", "milenial", "pemuda", "remaja"],
  gender: ["gender", "kesetaraan"],
  budaya: ["budaya", "sunda", "seni", "tradisi", "sinden"],
  kota: ["kota"],
  transportasi: ["transportasi", "angkot", "bus", "trotoar"],
  lingkungan: ["lingkungan", "sampah", "banjir", "iklim", "bumi"],
};

export interface Preset {
  /** Kata yang langsung menunjuk partner ini. */
  namaKunci: string[];
  tags: string[];
  momen: string;
  tanggal: string;
  dana: string;
  konsep: { nama: string; ringkas: string; komponen: string[] };
  valueExchange: { redaksiKePartner: string[]; partnerKeRedaksi: string[] };
  deliverable: string;
}

export const PRESET: Record<string, Preset> = {
  eiger: {
    namaKunci: ["eiger"],
    tags: ["alam", "outdoor", "perempuan", "ibu", "lingkungan"],
    momen: "Hari Ibu",
    tanggal: "22 Des 2026",
    dana: "Rp 85 juta",
    konsep: {
      nama: "Ibu Penjaga Alam",
      ringkas: "Kampanye yang merayakan para ibu yang menjaga alam Priangan.",
      komponen: [
        "Seri liputan 3 tokoh ibu penjaga alam (artikel + video pendek)",
        "Hiking keluarga di Tahura Djuanda",
        "Konten Instagram kolaborasi @kabarpriangan × @eigeradventure",
      ],
    },
    valueExchange: {
      redaksiKePartner: ["Jangkauan 180 rb pembaca lokal", "Kredibilitas jurnalisme independen", "Cerita autentik tokoh nyata"],
      partnerKeRedaksi: ["Funding liputan", "Perlengkapan untuk tim lapangan", "Honor mitra & kontributor"],
    },
    deliverable: "3 artikel mendalam, 3 video pendek, 6 unggahan Instagram kolaborasi, 1 event hiking keluarga (±100 peserta).",
  },
  bumd: {
    namaKunci: ["bank jabar", "bumd", "bank daerah"],
    tags: ["umkm", "keuangan"],
    momen: "Hari Kartini",
    tanggal: "21 Apr 2027",
    dana: "Rp 100 juta",
    konsep: {
      nama: "UMKM Perempuan Naik Kelas",
      ringkas: "Seri cerita dan kelas literasi keuangan untuk pelaku UMKM perempuan di Bandung.",
      komponen: [
        "Seri liputan 3 pelaku UMKM perempuan",
        "Kelas literasi keuangan bersama ahli bank",
        "Konten Instagram mingguan \"Cerita Usaha\"",
      ],
    },
    valueExchange: {
      redaksiKePartner: ["Jangkauan ke pelaku UMKM Bandung", "Kredibilitas jurnalisme independen", "Cerita nasabah yang nyata"],
      partnerKeRedaksi: ["Funding liputan", "Narasumber ahli keuangan", "Honor kontributor"],
    },
    deliverable: "3 artikel mendalam, 2 kelas literasi keuangan (±60 peserta), 8 unggahan Instagram.",
  },
  kopi: {
    namaKunci: ["kopi lereng", "kedai kopi lereng"],
    tags: ["kopi", "komunitas", "kota"],
    momen: "Awal tahun",
    tanggal: "Jan 2027",
    dana: "Rp 25 juta",
    konsep: {
      nama: "Ngopi Bareng Warga",
      ringkas: "Diskusi publik bulanan di kedai kopi, ditemani cerita para petani kopi lokal.",
      komponen: [
        "Diskusi publik bulanan di Kedai Kopi Lereng",
        "Seri liputan petani kopi perempuan Priangan",
        "Konten Instagram kolaborasi",
      ],
    },
    valueExchange: {
      redaksiKePartner: ["Kedai jadi ruang publik yang diliput", "Jangkauan 45 rb followers IG", "Cerita asal-usul kopi"],
      partnerKeRedaksi: ["Sponsor acara", "Tempat & konsumsi diskusi", "Honor narasumber"],
    },
    deliverable: "3 diskusi publik, 2 artikel liputan, 6 unggahan Instagram.",
  },
  yayasan: {
    namaKunci: ["yayasan", "cahaya nusantara", "hibah"],
    tags: ["gender", "perempuan", "budaya"],
    momen: "Hari Pers Nasional",
    tanggal: "9 Feb 2027",
    dana: "Rp 200 juta",
    konsep: {
      nama: "Suara Perempuan Priangan",
      ringkas: "Program liputan mendalam dan penguatan jurnalis perempuan lokal.",
      komponen: [
        "Seri liputan mendalam tentang kesetaraan gender di Jawa Barat",
        "Pelatihan 10 jurnalis perempuan lokal",
        "Laporan dampak publik",
      ],
    },
    valueExchange: {
      redaksiKePartner: ["Dampak program yang terukur", "Liputan independen & kredibel", "Jaringan jurnalis lokal"],
      partnerKeRedaksi: ["Hibah program", "Mentor & pelatih", "Honor jurnalis peserta"],
    },
    deliverable: "6 artikel mendalam, 1 pelatihan 3 hari, 1 laporan dampak publik.",
  },
  kampus: {
    namaKunci: ["universitas", "parahyangan", "kampus"],
    tags: ["pendidikan", "anak muda"],
    momen: "Awal semester",
    tanggal: "Feb 2027",
    dana: "Rp 60 juta",
    konsep: {
      nama: "Kelas Jurnalisme Warga",
      ringkas: "Program magang dan riset bersama untuk melatih mahasiswa meliput isu kota.",
      komponen: [
        "Program magang liputan untuk 10 mahasiswa",
        "Riset bersama tentang media lokal",
        "Seri liputan karya mahasiswa",
      ],
    },
    valueExchange: {
      redaksiKePartner: ["Pengalaman lapangan untuk mahasiswa", "Publikasi karya mahasiswa", "Data untuk riset"],
      partnerKeRedaksi: ["Dana program", "Tenaga liputan", "Akses peneliti"],
    },
    deliverable: "10 peserta magang, 6 artikel karya mahasiswa, 1 laporan riset.",
  },
};

/** Momen yang dikenali dari prompt. */
export const MOMEN_DIKENAL: { kata: string[]; momen: string; tanggal: string }[] = [
  { kata: ["hari ibu"], momen: "Hari Ibu", tanggal: "22 Des 2026" },
  { kata: ["kartini"], momen: "Hari Kartini", tanggal: "21 Apr 2027" },
  { kata: ["hari bumi"], momen: "Hari Bumi", tanggal: "22 Apr 2027" },
  { kata: ["hari guru"], momen: "Hari Guru", tanggal: "25 Nov 2026" },
  { kata: ["hari pers"], momen: "Hari Pers Nasional", tanggal: "9 Feb 2027" },
  { kata: ["kemerdekaan", "17 agustus", "agustusan", "hut ri"], momen: "HUT RI", tanggal: "17 Agu 2027" },
  { kata: ["ramadan", "ramadhan", "lebaran"], momen: "Ramadan", tanggal: "Feb–Mar 2027" },
  { kata: ["sumpah pemuda"], momen: "Sumpah Pemuda", tanggal: "28 Okt 2027" },
  { kata: ["akhir tahun", "tahun baru"], momen: "Akhir tahun", tanggal: "31 Des 2026" },
];

export const CONTOH_PROMPT = [
  "Aku mau ajak Bank Jabar dukung liputan UMKM perempuan di Hari Kartini, target Rp 100 juta",
  "Cari pendanaan untuk seri liputan kopi dan diskusi warga bareng kedai lokal",
  "Ajukan hibah ke yayasan untuk program liputan kesetaraan gender",
];

export const PROMPT_BANNER = "Ajak Eiger kolaborasi aktivasi Hari Ibu 22 Desember tentang ibu dan perempuan di alam";

export type Tone = "formal" | "hangat";

export interface Segmen {
  id: string;
  bagian: "email" | "onepager";
  judul?: string;
  formal: string;
  hangat: string;
  alt?: { formal: string; hangat: string };
  /** id artikel atau "aud". */
  sumber?: string;
}

export const LANGKAH_AI = {
  konteks: ["Membaca 1.240 artikel arsip redaksi…", "Mencocokkan dengan minat Eiger…", "Merangkum data audiens…"],
  intensi: ["Memahami intensimu…", "Mencari partner yang cocok di bank relasi…", "Mencari momen & target dana…", "Memilih karya redaksi pendukung…"],
  pitch: ["Merumuskan konsep aktivasi…", "Menyusun value exchange…", "Menulis draf email & one-pager…", "Menautkan label sumber…"],
  ulang: ["Menulis ulang draf…", "Memeriksa label sumber…"],
};

export function timeline(tanggalEvent: string) {
  return [
    { kapan: "H-30", apa: "Pitch terkirim" },
    { kapan: "H-21", apa: "Follow-up & diskusi detail" },
    { kapan: "H-14", apa: "Produksi liputan & konten" },
    { kapan: tanggalEvent, apa: "Event & publikasi" },
    { kapan: "H+7", apa: "Laporan hasil ke partner" },
  ];
}

export const CO_PUBLIKASI = [
  { nama: "Bandung Hijau Podcast", alasan: "Audiens peduli lingkungan, 12 rb pendengar/episode." },
  { nama: "Komunitas Ibu Pendaki Bandung", alasan: "Komunitas aktif yang pernah diliput; bisa jadi mitra lapangan & amplifikasi." },
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
