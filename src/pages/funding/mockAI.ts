// "AI" tiruan: menafsirkan prompt Ratih dengan kata kunci, lalu menyusun pitch dari templat.
// Tidak ada panggilan ke Claude. Semua data fiktif.
import { ARTIKEL, MOMEN_DIKENAL, PRESET, RELASI, TAG_KATA, type Artikel, type Segmen } from "./dummy";

export interface Tafsiran {
  prompt: string;
  tujuan: string;
  partnerId: string;
  momen: string;
  tanggal: string;
  dana: string;
  konsepNama: string;
  /** Tag topik yang terdeteksi di prompt. */
  tags: string[];
  /** 3 artikel saran AI. */
  artikelIds: string[];
  alasan: string[];
  momenDariPrompt: boolean;
  danaDariPrompt: boolean;
}

const has = (teks: string, kata: string) =>
  new RegExp(`(^|[^a-z])${kata.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(teks);

export function partnerOf(id: string) {
  return RELASI.find((r) => r.id === id) ?? RELASI[0];
}

/** Nama PIC tanpa keterangan "(…, fiktif)". */
export function picOf(id: string) {
  return partnerOf(id).pic.split(" (")[0];
}

function skorArtikel(a: Artikel, promptTags: string[], partnerTags: string[]) {
  return a.tags.reduce((s, t) => s + (promptTags.includes(t) ? 2 : 0) + (partnerTags.includes(t) ? 1 : 0), 0);
}

/** Artikel diurutkan dari yang paling cocok. */
export function urutkanArtikel(promptTags: string[], partnerId: string) {
  const partnerTags = PRESET[partnerId].tags;
  return [...ARTIKEL].sort((a, b) => skorArtikel(b, promptTags, partnerTags) - skorArtikel(a, promptTags, partnerTags));
}

export function alasanArtikel(a: Artikel, t: Tafsiran) {
  const cocok = a.tags.filter((tag) => t.tags.includes(tag) || PRESET[t.partnerId].tags.includes(tag));
  return cocok.length ? `Cocok dengan topik: ${cocok.join(", ")}.` : "Tidak banyak kaitan dengan intensimu.";
}

function formatDana(teks: string): string | null {
  const m = teks.match(/(?:rp\.?\s*)?(\d+(?:[.,]\d+)?)\s*(juta|jt|miliar|m)\b/);
  if (m) return `Rp ${m[1]} ${m[2].startsWith("m") ? "miliar" : "juta"}`;
  const n = teks.match(/rp\.?\s*([\d.]{6,})/);
  if (n) return `Rp ${n[1]}`;
  return null;
}

export function tafsirkan(prompt: string): Tafsiran {
  const teks = prompt.toLowerCase();
  const tags = Object.entries(TAG_KATA)
    .filter(([, kata]) => kata.some((k) => has(teks, k)))
    .map(([tag]) => tag);

  // Skor partner: nama disebut = +5, setiap tag yang cocok = +1.
  let best = { id: "eiger", skor: 0, sebutNama: "" };
  for (const r of RELASI) {
    const p = PRESET[r.id];
    const sebut = p.namaKunci.find((k) => has(teks, k)) ?? "";
    const skor = (sebut ? 5 : 0) + p.tags.filter((t) => tags.includes(t)).length;
    if (skor > best.skor) best = { id: r.id, skor, sebutNama: sebut };
  }
  const partner = partnerOf(best.id);
  const preset = PRESET[best.id];

  const momenHit = MOMEN_DIKENAL.find((m) => m.kata.some((k) => has(teks, k)));
  const dana = formatDana(teks);

  const alasan: string[] = [];
  if (best.sebutNama) alasan.push(`Kamu menyebut "${best.sebutNama}", jadi AI memilih ${partner.nama}.`);
  else if (best.skor > 0)
    alasan.push(`Topik di idemu (${tags.join(", ")}) cocok dengan minat ${partner.nama}: ${partner.minat.join(", ")}.`);
  else alasan.push(`AI belum yakin partner yang kamu maksud. Untuk sementara AI memilih ${partner.nama}. Silakan koreksi.`);
  alasan.push(
    momenHit
      ? `Momen ${momenHit.momen} (${momenHit.tanggal}) disebut di idemu.`
      : `Kamu belum menyebut momen. AI menyarankan ${preset.momen} (${preset.tanggal}).`,
  );
  alasan.push(dana ? `Target dana ${dana} diambil dari idemu.` : `Kamu belum menyebut target dana. AI memakai paket standar ${preset.dana}.`);

  return {
    prompt,
    tujuan: prompt.trim(),
    partnerId: best.id,
    momen: momenHit?.momen ?? preset.momen,
    tanggal: momenHit?.tanggal ?? preset.tanggal,
    dana: dana ?? preset.dana,
    konsepNama: preset.konsep.nama,
    tags,
    artikelIds: urutkanArtikel(tags, best.id)
      .slice(0, 3)
      .map((a) => a.id),
    alasan,
    momenDariPrompt: !!momenHit,
    danaDariPrompt: !!dana,
  };
}

/** Ratih mengganti partner di kartu tafsiran: konsep, artikel, dan nilai bawaan ikut menyesuaikan. */
export function gantiPartner(t: Tafsiran, partnerId: string): Tafsiran {
  const p = PRESET[partnerId];
  return {
    ...t,
    partnerId,
    konsepNama: p.konsep.nama,
    momen: t.momenDariPrompt ? t.momen : p.momen,
    tanggal: t.momenDariPrompt ? t.tanggal : p.tanggal,
    dana: t.danaDariPrompt ? t.dana : p.dana,
    artikelIds: urutkanArtikel(t.tags, partnerId)
      .slice(0, 3)
      .map((a) => a.id),
  };
}

export function susunPitch(t: Tafsiran, selected: string[]): Segmen[] {
  const r = partnerOf(t.partnerId);
  const p = PRESET[t.partnerId];
  const pic = picOf(t.partnerId);
  const sapaan = pic.split(" ")[0];
  const konsep = t.konsepNama;
  const artikel = ARTIKEL.filter((a) => selected.includes(a.id));

  return [
    { id: "e-salam", bagian: "email", formal: `Yth. ${pic},`, hangat: `Halo ${sapaan},` },
    {
      id: "e-buka",
      bagian: "email",
      formal: `Saya Ratih, pemimpin redaksi Kabar Priangan. Kami ingin mengajak ${r.nama} berkolaborasi menyambut ${t.momen} (${t.tanggal}).`,
      hangat: `Saya Ratih dari Kabar Priangan. Semoga kabar baik! Menjelang ${t.momen}, kami punya ide yang langsung mengingatkan kami pada ${r.nama}.`,
      alt: {
        formal: `Perkenalkan, saya Ratih dari Kabar Priangan. Menjelang ${t.momen} (${t.tanggal}), kami melihat peluang kolaborasi yang sejalan dengan nilai ${r.nama}.`,
        hangat: `Saya Ratih dari Kabar Priangan. Menjelang ${t.momen}, kami kepikiran satu cerita yang rasanya cocok banget dengan ${r.nama}!`,
      },
    },
    ...artikel.map<Segmen>((a) => ({ id: `e-${a.id}`, bagian: "email", sumber: a.id, ...a.klaim })),
    {
      id: "e-aud",
      bagian: "email",
      sumber: "aud",
      formal: `Pembaca kami mencapai 180 ribu per bulan, 48% perempuan, dan 62% berusia 25–40 tahun. Profil ini relevan untuk ${r.nama}.`,
      hangat: `Pembaca kami 180 ribu per bulan, hampir setengahnya perempuan usia 25–40. Pas untuk menjangkau sahabat ${r.nama}.`,
    },
    {
      id: "e-ajak",
      bagian: "email",
      formal: `Kami mengusulkan konsep "${konsep}". Proposal lengkap kami lampirkan. Apakah Anda berkenan berdiskusi 30 menit minggu depan?`,
      hangat: `Kami namai idenya "${konsep}". Detailnya ada di lampiran. Boleh kita ngobrol 30 menit minggu depan?`,
      alt: {
        formal: `Konsep "${konsep}" terlampir. Kami siap menyesuaikan dengan kebutuhan ${r.nama}. Mohon kabari waktu yang sesuai untuk berdiskusi.`,
        hangat: `Konsep "${konsep}" ada di lampiran. Kami terbuka banget untuk diubah bareng. Kapan senggang buat ngopi?`,
      },
    },
    {
      id: "e-ttd",
      bagian: "email",
      formal: "Hormat saya,\nRatih — Pemimpin Redaksi, Kabar Priangan",
      hangat: "Salam hangat,\nRatih — Kabar Priangan",
    },
    {
      id: "o-latar",
      bagian: "onepager",
      judul: "Latar",
      sumber: "aud",
      formal: "Kabar Priangan adalah media lokal independen di Bandung dengan 180 ribu pembaca per bulan. Topik teratas kami: lingkungan dan UMKM.",
      hangat: "Kabar Priangan adalah media lokal independen di Bandung. Setiap bulan, 180 ribu warga membaca cerita kami tentang lingkungan dan UMKM.",
    },
    {
      id: "o-konsep",
      bagian: "onepager",
      judul: "Konsep",
      formal: `"${konsep}": ${p.konsep.ringkas} Komponen: ${p.konsep.komponen.join("; ")}.`,
      hangat: `"${konsep}" bareng ${r.nama}: ${p.konsep.komponen.join(", ").toLowerCase()}.`,
    },
    { id: "o-deliv", bagian: "onepager", judul: "Deliverable", formal: p.deliverable, hangat: p.deliverable },
    {
      id: "o-time",
      bagian: "onepager",
      judul: "Timeline",
      formal: `Pitch minggu ini · Produksi konten mulai H-14 · Event & publikasi ${t.tanggal} (${t.momen}) · Laporan ke partner H+7.`,
      hangat: `Ngobrol minggu ini, produksi mulai dua pekan sebelum hari H, puncaknya ${t.momen} (${t.tanggal}), laporan hasil seminggu setelahnya.`,
    },
    {
      id: "o-paket",
      bagian: "onepager",
      judul: "Paket (dummy)",
      formal: `Nilai kerja sama yang diusulkan: ${t.dana}. Termasuk honor mitra dan kontributor.`,
      hangat: `Kami usulkan ${t.dana}, sudah termasuk honor mitra & kontributor.`,
    },
  ];
}
