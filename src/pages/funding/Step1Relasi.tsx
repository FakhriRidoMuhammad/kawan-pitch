import { ArrowRight, Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StepProps } from "./FundingFlow";
import { ALASAN_AI_EIGER, RELASI, type Relasi } from "./dummy";
import { AIBadge, RatihBadge } from "./shared";

export function Step1Relasi({ state, set, go }: StepProps) {
  const relasi: Relasi[] = RELASI.map((r) =>
    r.id === "eiger" && state.eigerSaved
      ? {
          ...r,
          status: "hangat",
          riwayat: ["Des 2026 · Aktivasi Ibu Penjaga Alam: 126 rb views, 112 peserta (bukti tersimpan)", "Nov 2026 · Pitch Ibu Penjaga Alam terkirim", ...r.riwayat],
        }
      : r,
  );
  const eiger = relasi[0];

  return (
    <div className="space-y-4">
      {!state.bannerDismissed && (
        <div className="flex flex-wrap items-start gap-3 rounded-lg border border-emerald-300 bg-emerald-50 p-4">
          <Bell className="mt-0.5 size-5 shrink-0 text-emerald-700" />
          <div className="min-w-0 flex-1">
            <AIBadge className="mb-1" />
            <p className="text-sm font-medium text-emerald-950">
              Peluang: Hari Ibu 22 Des cocok dengan fokus Eiger pada petualangan & perempuan di alam. Mulai susun pendekatan?
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => set({ eigerOpen: true, bannerDismissed: true })}>
              Lihat Eiger
            </Button>
            <Button size="sm" variant="ghost" onClick={() => set({ bannerDismissed: true })}>
              <X className="size-3.5" /> Abaikan
            </Button>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold">Bank data relasi</h2>
        <p className="text-sm text-muted-foreground">5 klien, partner, dan investor Kabar Priangan (fiktif). Klik kartu untuk detail.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {relasi.map((r) => (
          <button
            key={r.id}
            onClick={() => r.id === "eiger" && set({ eigerOpen: true })}
            className={cn(
              "rounded-lg border bg-card p-4 text-left transition-shadow",
              r.id === "eiger" ? "cursor-pointer hover:shadow-md" : "cursor-default",
              r.id === "eiger" && state.eigerOpen && "ring-2 ring-primary",
            )}
          >
            <div className="mb-1 flex items-start justify-between gap-2">
              <div className="font-semibold">{r.nama}</div>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-medium",
                  r.status === "hangat" ? "bg-orange-100 text-orange-800" : "bg-sky-100 text-sky-800",
                )}
              >
                {r.status === "hangat" ? "🔥 hangat" : "❄ dingin"}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {r.kategori} · PIC: {r.pic}
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {r.minat.map((m) => (
                <span key={m} className="rounded bg-muted px-1.5 py-0.5 text-[11px]">
                  {m}
                </span>
              ))}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">Terakhir: {r.riwayat[0]}</div>
          </button>
        ))}
      </div>

      {state.eigerOpen && (
        <Card className="border-primary">
          <CardContent className="grid gap-4 pt-6 md:grid-cols-2">
            <div className="space-y-2 text-sm">
              <h3 className="text-base font-semibold">Detail: {eiger.nama}</h3>
              <div>
                <span className="text-muted-foreground">PIC:</span> {eiger.pic}
              </div>
              <div>
                <span className="text-muted-foreground">Minat:</span> {eiger.minat.join(", ")}
              </div>
              <div>
                <div className="text-muted-foreground">Riwayat interaksi:</div>
                <ul className="list-disc pl-5">
                  {eiger.riwayat.map((h, i) => (
                    <li key={h} className={cn(state.eigerSaved && i < 2 && "font-medium text-blue-800")}>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-md bg-emerald-50 p-3 text-sm">
                <AIBadge className="mb-1" />
                <div className="font-medium">Kenapa Eiger sekarang?</div>
                <ul className="list-disc pl-5 text-emerald-950">
                  {ALASAN_AI_EIGER.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <RatihBadge />
                <Button onClick={() => go(2)}>
                  {state.eigerSaved ? "Susun pitch berikutnya" : "Mulai susun pendekatan"} <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
