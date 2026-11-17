import { UserRound } from "lucide-react";
import { ROLES, type RoleId } from "@/config";
import { useRole } from "@/lib/roles";

/** Pengalih peran demo. Tanpa login. Peran aktif tercatat sebagai `reviewed_by` saat data disimpan. */
export function RoleSwitcher() {
  const { role, setRole } = useRole();
  return (
    <label className="flex items-center gap-2 text-sm">
      <UserRound className="size-4 text-muted-foreground" />
      <span className="sr-only">Peran aktif</span>
      <select
        value={role}
        onChange={(event) => setRole(event.target.value as RoleId)}
        className="h-8 rounded-md border border-input bg-card px-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {ROLES.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
