import { useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StepProps } from "./FundingFlow";
import { AUDIENS, LANGKAH_AI, type Artikel } from "./dummy";
import { alasanArtikel, partnerOf, urutkanArtikel } from "./mockAI";
import { AIBadge, AIWorking, RatihBadge } from "./shared";

export function Step2Konteks({ state, set, go }: StepProps) {
  const onLoaded = useCallback(() => set({ contextLoaded: true }), [set]);

  if (!state.contextLoaded) {
    return <AIWorking steps={LANGKAH_AI.konteks} onDone={onLoaded} />;
  }

  const toggle = (id: string) => {
    const selected = state.selected.includes(id) ? state.selected.filter((x) => x !== id) : [...state.selected, id];
    // Pilihan artikel berubah → draf perlu disusun ulang.
    set({ selected, pitchLoaded: false, approved: false });
  };
  const none = state.selected.length === 0;
  const t = state.tafsiran!;
  const partner = partnerOf(t.partnerId);
  const urut = urutkanArtikel(t.tags, t.partnerId);
  const saran = urut.filter((a) => t.artikelIds.includes(a.id));
  const lain = urut.filter((a) => !t.artikelIds.includes(a.id));

  const renderArtikel = (a: Artikel, disarankan: boolean) => {
    const on = state.selected.includes(a.id);
    return (
      <label
        key={a.id}
        className={cn(
          "flex cursor-pointer gap-3 rounded-lg border p-3 transition-colors",
          on ? "border-blue-400 bg-blue-50" : "bg-card opacity-80",
        )}
      >
        <input type="checkbox" checked={on} onChange={() => toggle(a.id)} className="mt-1 size-4 shrink-0 accent-blue-600" />
        <div className="text-sm">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-800">
            {a.kode}
            {disarankan && <span className="rounded bg-emerald-100 px-1.5 text-[10px] text-emerald-800">Disarankan AI</span>}
          </div>
          <div className="font-medium">{a.judul}</div>
          <div className="text-xs text-muted-foreground">
            {a.tanggal} · {a.views}
          </div>
          {disarankan && (
            <div className="mt-1 text-xs text-emerald-900">
              <span className="font-semibold">Alasan AI:</span> {alasanArtikel(a, t)}
            </div>
          )}
        </div>
      </label>
    );
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between gap-2">
          <div>
            <CardTitle>Karya redaksi pendukung untuk {partner.nama}</CardTitle>
            <p className="text-xs text-muted-foreground">
              AI memilih 3 dari arsip sesuai intensimu. Centang yang mau kamu pakai sebagai bukti, atau tambah dari arsip lain.
            </p>
          </div>
          <AIBadge />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-md bg-muted px-3 py-2 text-xs">
            <span className="font-semibold">Intensimu:</span> {t.tujuan}
          </div>
          {saran.map((a) => renderArtikel(a, true))}
          <details className="rounded-lg border p-3">
            <summary className="cursor-pointer text-sm font-medium">Arsip lain ({lain.length} karya)</summary>
            <div className="mt-3 space-y-2">{lain.map((a) => renderArtikel(a, false))}</div>
          </details>

          <div className="flex flex-wrap items-center gap-3 border-t pt-3">
            <RatihBadge />
            <Button disabled={none} onClick={() => go(3)}>
              Rancang pitch <ArrowRight className="size-4" />
            </Button>
            {none && <span className="text-sm text-warning">Pilih minimal 1 karya.</span>}
            {!none && <span className="text-xs text-muted-foreground">{state.selected.length} karya dipilih</span>}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:self-start">
        <CardHeader className="flex-row flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-base">Snapshot audiens</CardTitle>
          <AIBadge />
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            {AUDIENS.map((d) => (
              <div key={d.label} className="rounded-md bg-muted p-2">
                <dt className="text-xs text-muted-foreground">{d.label}</dt>
                <dd className="font-bold">{d.nilai}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-[11px] text-muted-foreground">Data dummy dari analitik redaksi.</p>
        </CardContent>
      </Card>
    </div>
  );
}
