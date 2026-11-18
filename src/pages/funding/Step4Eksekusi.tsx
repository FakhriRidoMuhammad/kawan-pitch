import { useState } from "react";
import { ArrowRight, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StepProps } from "./FundingFlow";
import { CO_PUBLIKASI, TIMELINE } from "./dummy";
import { AIBadge, RatihBadge } from "./shared";

export function Step4Eksekusi({ state, set, go }: StepProps) {
  const [confirm, setConfirm] = useState(false);

  if (!state.approved && !state.sent) {
    return (
      <Card>
        <CardContent className="space-y-3 pt-6 text-sm">
          <p>Draf pitch belum kamu setujui. Tidak ada yang terkirim tanpa persetujuanmu.</p>
          <Button onClick={() => go(3)}>Kembali ke draf</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between gap-2">
          <div>
            <CardTitle>Kirim pitch ke Eiger</CardTitle>
            <p className="text-xs text-muted-foreground">Kepada: Dina Kusuma (fiktif) · Subjek: Kolaborasi Hari Ibu "Ibu Penjaga Alam"</p>
          </div>
          <RatihBadge />
        </CardHeader>
        <CardContent>
          {state.sent ? (
            <div className="flex items-center gap-2 rounded-md bg-emerald-50 p-3 text-sm font-medium text-emerald-800">
              <CheckCircle2 className="size-5" /> Terkirim · 22 Nov 2026, 09.14 (simulasi)
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => setConfirm(true)}>
                <Send className="size-4" /> Kirim
              </Button>
              <Button variant="outline" size="lg" onClick={() => go(3)}>
                Kembali ke draf
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {state.sent && (
        <>
          <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
            <Card>
              <CardHeader className="flex-row flex-wrap items-center justify-between gap-2">
                <CardTitle>Timeline aktivasi</CardTitle>
                <AIBadge />
              </CardHeader>
              <CardContent>
                <ol className="relative space-y-4 border-l-2 border-primary/30 pl-5">
                  {TIMELINE.map((t, i) => (
                    <li key={t.kapan} className="relative">
                      <span
                        className={cn(
                          "absolute -left-[27px] top-1 size-3 rounded-full border-2 border-primary",
                          i === 0 ? "bg-primary" : "bg-card",
                        )}
                      />
                      <div className="text-xs font-semibold text-primary">{t.kapan}</div>
                      <div className="text-sm">{t.apa}</div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
            <Card className="lg:self-start">
              <CardHeader className="flex-row flex-wrap items-center justify-between gap-2">
                <CardTitle className="text-base">Saran mitra co-publikasi</CardTitle>
                <AIBadge />
              </CardHeader>
              <CardContent className="space-y-2">
                {CO_PUBLIKASI.map((c) => (
                  <div key={c.nama} className="rounded-md bg-muted p-3 text-sm">
                    <div className="font-medium">{c.nama}</div>
                    <div className="text-xs text-muted-foreground">{c.alasan}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => go(5)}>
              Lihat monitoring <ArrowRight className="size-4" />
            </Button>
          </div>
        </>
      )}

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setConfirm(false)}>
          <div className="w-full max-w-md space-y-4 rounded-lg bg-card p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold">Kirim pitch sekarang?</h3>
            <p className="text-sm text-muted-foreground">
              Email dan one-pager akan dikirim ke Dina Kusuma (Eiger). Pastikan kamu sudah membaca seluruh draf.
            </p>
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setConfirm(false);
                  go(3);
                }}
              >
                Kembali ke draf
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  setConfirm(false);
                  set({ sent: true });
                }}
              >
                <Send className="size-4" /> Kirim
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
