import { useState, type ReactNode } from "react";
import { Check, Pencil, ShieldCheck, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ReviewStatus } from "@/lib/data";
import { useRole } from "@/lib/roles";
import { cn } from "@/lib/utils";

/** Satu kolom dari output AI. Cocok dengan skema `AI_FIELDS_SCHEMA`. */
export interface AIField {
  nama: string;
  nilai: string;
  /** Teks dari sumber asli yang mendasari nilai ini. */
  kutipan_sumber?: string;
  yakin?: "tinggi" | "sedang" | "rendah";
}

/** JSON Schema siap pakai untuk `askAI({ schema })`. Hasilnya langsung bisa masuk ke <ReviewPanel>. */
export const AI_FIELDS_SCHEMA = {
  type: "object",
  properties: {
    bidang: {
      type: "array",
      items: {
        type: "object",
        properties: {
          nama: { type: "string" },
          nilai: { type: "string" },
          kutipan_sumber: { type: "string" },
          yakin: { type: "string", enum: ["tinggi", "sedang", "rendah"] },
        },
        required: ["nama", "nilai", "kutipan_sumber", "yakin"],
        additionalProperties: false,
      },
    },
  },
  required: ["bidang"],
  additionalProperties: false,
};

type Decision = "pending" | "approved" | "edited" | "rejected";

export interface ReviewResult {
  /** Nilai akhir per kolom. Kolom yang ditolak tidak masuk. */
  values: Record<string, string>;
  decisions: Record<string, Decision>;
  /** Ringkasan untuk kolom `review_status`. */
  status: ReviewStatus;
  /** Peran yang memutuskan. */
  reviewedBy: string;
}

interface ReviewPanelProps {
  fields: AIField[];
  /** Tampilan sumber asli (dokumen, transkrip, teks). Tampil di samping output AI. */
  source?: ReactNode;
  onSave: (result: ReviewResult) => void | Promise<void>;
  saveLabel?: string;
}

const CONFIDENCE: Record<string, { label: string; variant: "success" | "warning" | "destructive" }> = {
  tinggi: { label: "AI yakin", variant: "success" },
  sedang: { label: "AI kurang yakin", variant: "warning" },
  rendah: { label: "AI tidak yakin", variant: "destructive" },
};

/**
 * Titik keputusan manusia (Human in the Loop).
 * Manusia harus memutuskan setiap kolom: Setujui, Ubah, atau Tolak.
 * Tombol simpan aktif hanya setelah semua kolom diputuskan.
 */
export function ReviewPanel({ fields, source, onSave, saveLabel = "Simpan hasil tinjauan" }: ReviewPanelProps) {
  const { role, roleLabel } = useRole();
  const [values, setValues] = useState(() => fields.map((f) => f.nilai));
  const [decisions, setDecisions] = useState<Decision[]>(() => fields.map(() => "pending"));
  const [editing, setEditing] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const decide = (index: number, decision: Decision) =>
    setDecisions((prev) => prev.map((d, i) => (i === index ? decision : d)));

  const finishEdit = (index: number) => {
    setEditing(null);
    decide(index, values[index] === fields[index].nilai ? "approved" : "edited");
  };

  const pending = decisions.filter((d) => d === "pending").length;

  const save = async () => {
    const kept = fields.map((f, i) => ({ f, i })).filter(({ i }) => decisions[i] !== "rejected");
    const status: ReviewStatus =
      kept.length === 0 ? "rejected" : decisions.every((d) => d === "approved") ? "approved" : "edited";
    setSaving(true);
    try {
      await onSave({
        values: Object.fromEntries(kept.map(({ f, i }) => [f.nama, values[i]])),
        decisions: Object.fromEntries(fields.map((f, i) => [f.nama, decisions[i]])),
        status,
        reviewedBy: role,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-lg border-2 border-primary/40 bg-card">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-accent px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-accent-foreground">
          <ShieldCheck className="size-4" />
          Tinjauan manusia: {roleLabel} memeriksa setiap kolom
        </div>
        <span className="text-xs text-muted-foreground">
          {pending > 0 ? `${pending} kolom belum diputuskan` : "Semua kolom sudah diputuskan"}
        </span>
      </div>

      <div className={cn("grid gap-4 p-4", source && "lg:grid-cols-2")}>
        {source && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sumber asli</p>
            {source}
          </div>
        )}

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Output AI</p>
          <ul className="flex flex-col gap-3">
            {fields.map((field, index) => {
              const decision = decisions[index];
              const confidence = field.yakin ? CONFIDENCE[field.yakin] : null;
              return (
                <li
                  key={field.nama}
                  className={cn(
                    "rounded-md border p-3",
                    decision === "approved" && "border-success/40 bg-success/5",
                    decision === "edited" && "border-warning/40 bg-warning/5",
                    decision === "rejected" && "border-destructive/40 bg-destructive/5",
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-muted-foreground">{field.nama}</span>
                    {confidence && <Badge variant={confidence.variant}>{confidence.label}</Badge>}
                  </div>

                  {editing === index ? (
                    <form
                      className="mt-2 flex gap-2"
                      onSubmit={(event) => {
                        event.preventDefault();
                        finishEdit(index);
                      }}
                    >
                      <Input
                        autoFocus
                        value={values[index]}
                        onChange={(event) =>
                          setValues((prev) => prev.map((v, i) => (i === index ? event.target.value : v)))
                        }
                      />
                      <Button type="submit" size="sm">
                        Selesai
                      </Button>
                    </form>
                  ) : (
                    <p className={cn("mt-1 text-sm font-medium", decision === "rejected" && "line-through opacity-60")}>
                      {values[index] || <span className="text-muted-foreground">(kosong)</span>}
                    </p>
                  )}

                  {field.kutipan_sumber && (
                    <p className="mt-1 border-l-2 pl-2 text-xs italic text-muted-foreground">
                      Sumber: “{field.kutipan_sumber}”
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant={decision === "approved" ? "success" : "outline"}
                      onClick={() => {
                        setEditing(null);
                        decide(index, values[index] === field.nilai ? "approved" : "edited");
                      }}
                    >
                      <Check /> Setujui
                    </Button>
                    <Button
                      size="sm"
                      variant={decision === "edited" ? "secondary" : "outline"}
                      onClick={() => setEditing(index)}
                    >
                      <Pencil /> Ubah
                    </Button>
                    <Button
                      size="sm"
                      variant={decision === "rejected" ? "destructive" : "outline"}
                      onClick={() => {
                        setEditing(null);
                        decide(index, "rejected");
                      }}
                    >
                      <X /> Tolak
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3">
        <p className="text-xs text-muted-foreground">
          AI hanya mengusulkan. Data tersimpan atas nama peran <strong>{roleLabel}</strong>.
        </p>
        <Button onClick={save} disabled={pending > 0 || editing !== null || saving}>
          {saving ? "Menyimpan..." : saveLabel}
        </Button>
      </div>
    </div>
  );
}
