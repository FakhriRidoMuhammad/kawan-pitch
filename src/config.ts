// Satu tempat untuk mengubah identitas prototipe. Ubah file ini lebih dulu saat acara mulai.

export const APP = {
  name: "Nama Prototipe",
  // Rumusan masalah: "Bagaimana kita bisa membantu [siapa] menghadapi [masalah] di tahap [alur kerja]?"
  problem:
    "Bagaimana kita bisa membantu editor menghadapi kuitansi yang dicek manual di tahap administrasi?",
  team: "Tim A",
};

export const ROLES = [
  { id: "jurnalis", label: "Jurnalis" },
  { id: "editor", label: "Editor" },
  { id: "pimred", label: "Pimpinan Redaksi" },
] as const;

export type RoleId = (typeof ROLES)[number]["id"];

export const NAV = [
  { to: "/", label: "Beranda" },
  { to: "/contoh", label: "Alur contoh" },
  { to: "/transkrip", label: "Transkrip" },
  { to: "/data", label: "Data tersimpan" },
];
