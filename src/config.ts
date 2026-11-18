// Satu tempat untuk mengubah identitas prototipe. Ubah file ini lebih dulu saat acara mulai.

export const APP = {
  name: "Asisten Funding Ratih",
  // Rumusan masalah: "Bagaimana kita bisa membantu [siapa] menghadapi [masalah] di tahap [alur kerja]?"
  problem:
    "Ratih butuh cara untuk mengomunikasikan nilai unik dan kredibilitas brand medianya kepada calon partner & investor, sehingga target funding tahunan dapat terpenuhi.",
  team: "Kelompok 3",
};

export const ROLES = [
  { id: "jurnalis", label: "Jurnalis" },
  { id: "editor", label: "Editor" },
  { id: "pimred", label: "Pimpinan Redaksi" },
] as const;

export type RoleId = (typeof ROLES)[number]["id"];

export const NAV = [{ to: "/", label: "Asisten Funding" }];
