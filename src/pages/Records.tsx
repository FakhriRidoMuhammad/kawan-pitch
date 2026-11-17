import { useCallback, useEffect, useState } from "react";
import { RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { data, type DataRecord, type ReviewStatus } from "@/lib/data";
import { roleLabelOf, useRole } from "@/lib/roles";
import { formatDate } from "@/lib/utils";

const STATUS: Record<ReviewStatus, { label: string; variant: "success" | "warning" | "destructive" | "secondary" }> = {
  approved: { label: "Disetujui", variant: "success" },
  edited: { label: "Diubah manusia", variant: "warning" },
  rejected: { label: "Ditolak", variant: "destructive" },
  pending: { label: "Belum ditinjau", variant: "secondary" },
};

export function Records() {
  const { role } = useRole();
  const [rows, setRows] = useState<DataRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await data.list());
    } catch (cause) {
      setError((cause as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (id: string) => {
    await data.remove(id);
    toast.success("Data dihapus.");
    load();
  };

  const reset = async () => {
    await data.reset?.();
    toast.success("Data kembali ke data dummy awal.");
    load();
  };

  // Contoh aturan peran: hanya Editor dan Pimpinan Redaksi yang boleh menghapus data.
  const canDelete = role !== "jurnalis";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">Data tersimpan</h1>
          <p className="text-sm text-muted-foreground">
            Sumber: {data.source === "mock" ? "data dummy di browser ini" : "database Supabase"}.
          </p>
        </div>
        {data.reset && (
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw /> Reset data dummy
          </Button>
        )}
      </div>

      {error && <p className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">{error}</p>}
      {loading && <p className="text-sm text-muted-foreground">Memuat data...</p>}
      {!loading && !error && rows.length === 0 && <p className="text-sm text-muted-foreground">Belum ada data.</p>}

      {rows.length > 0 && (
        <div className="overflow-x-auto rounded-lg border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-muted text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-2">Jenis</th>
                <th className="px-3 py-2">Isi</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Diputuskan oleh</th>
                <th className="px-3 py-2">Waktu</th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const status = STATUS[row.review_status] ?? STATUS.pending;
                const fields: Record<string, string> = row.payload?.bidang ?? {};
                return (
                  <tr key={row.id} className="border-b align-top last:border-0">
                    <td className="px-3 py-3 font-medium">{row.kind}</td>
                    <td className="px-3 py-3">
                      {row.payload?.file && <p className="mb-1 text-xs text-muted-foreground">{row.payload.file}</p>}
                      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5">
                        {Object.entries(fields).map(([name, value]) => (
                          <div key={name} className="contents">
                            <dt className="text-xs text-muted-foreground">{name}</dt>
                            <dd>{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </td>
                    <td className="px-3 py-3">
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </td>
                    <td className="px-3 py-3">{roleLabelOf(row.reviewed_by)}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">{formatDate(row.created_at)}</td>
                    <td className="px-3 py-3">
                      {canDelete && (
                        <Button variant="ghost" size="icon" onClick={() => remove(row.id)} aria-label="Hapus data">
                          <Trash2 />
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {!canDelete && (
        <p className="text-xs text-muted-foreground">Peran Jurnalis tidak bisa menghapus data. Ganti peran untuk melihat tombol hapus.</p>
      )}
    </div>
  );
}
