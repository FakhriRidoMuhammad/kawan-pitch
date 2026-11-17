import { createContext, useContext, useState, type ReactNode } from "react";
import { ROLES, type RoleId } from "@/config";

const KEY = "prototype.role";

interface RoleState {
  role: RoleId;
  roleLabel: string;
  setRole: (role: RoleId) => void;
}

const RoleContext = createContext<RoleState | null>(null);

function initialRole(): RoleId {
  try {
    const saved = localStorage.getItem(KEY);
    if (ROLES.some((r) => r.id === saved)) return saved as RoleId;
  } catch {
    // abaikan
  }
  return ROLES[0].id;
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<RoleId>(initialRole);

  const setRole = (next: RoleId) => {
    setRoleState(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // abaikan
    }
  };

  const roleLabel = ROLES.find((r) => r.id === role)?.label ?? role;
  return <RoleContext.Provider value={{ role, roleLabel, setRole }}>{children}</RoleContext.Provider>;
}

/** Peran demo yang aktif. Tanpa login. Pakai `role` untuk menampilkan atau menyembunyikan aksi. */
export function useRole() {
  const state = useContext(RoleContext);
  if (!state) throw new Error("useRole() harus dipakai di dalam <RoleProvider>.");
  return state;
}

export function roleLabelOf(id: string | null) {
  return ROLES.find((r) => r.id === id)?.label ?? id ?? "-";
}
