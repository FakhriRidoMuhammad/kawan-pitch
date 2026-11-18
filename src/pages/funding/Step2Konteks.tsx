import { useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StepProps } from "./FundingFlow";
import { ARTIKEL, AUDIENS, LANGKAH_AI } from "./dummy";
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

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between gap-2">
          <div>
            <CardTitle>Karya redaksi yang relevan untuk Eiger</CardTitle>
            <p className="text-xs text-muted-foreground">AI memilih 3 dari 1.240 artikel arsip. Centang yang mau kamu pakai sebagai bukti.</p>
          </div>
          <AIBadge />
        </CardHeader>
        <CardContent className="space-y-3">
          {ARTIKEL.map((a) => {
            const on = state.selected.includes(a.id);
            return (
              <label
                key={a.id}
                className={cn(
                  "flex cursor-pointer gap-3 rounded-lg border p-3 transition-colors",
                  on ? "border-blue-400 bg-blue-50" : "bg-card opacity-70",
                )}
              >
                <input type="checkbox" checked={on} onChange={() => toggle(a.id)} className="mt-1 size-4 accent-blue-600" />
                <div className="text-sm">
                  <div className="text-xs font-semibold text-amber-800">{a.kode}</div>
                  <div className="font-medium">{a.judul}</div>
                  <div className="text-xs text-muted-foreground">
                    {a.tanggal} · {a.views}
                  </div>
                  <div className="mt-1 text-xs text-emerald-900">
                    <span className="font-semibold">Alasan AI:</span> {a.alasan}
                  </div>
                </div>
              </label>
            );
          })}

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
