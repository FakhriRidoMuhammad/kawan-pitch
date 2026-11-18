import { Lightbulb, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StepProps } from "./FundingFlow";
import { AKTIVASI, FUNDING, FUNNEL, PROPOSAL, SEBELUM, type ProposalStatus } from "./dummy";
import { AIBadge, RatihBadge } from "./shared";

const STATUS_STYLE: Record<ProposalStatus, string> = {
  Terkirim: "bg-slate-100 text-slate-700",
  Dibalas: "bg-sky-100 text-sky-800",
  Negosiasi: "bg-amber-100 text-amber-800",
  Goal: "bg-emerald-100 text-emerald-800",
  Ditolak: "bg-red-100 text-red-700",
};

export function Step5Monitoring({ state, set, go }: StepProps) {
  const top = FUNNEL[0].nilai;
  const terkirim = FUNNEL[1].nilai;
  const fundingPct = Math.round((FUNDING.terkumpul / FUNDING.target) * 100);

  const rows = [
    ...(state.sent
      ? [{ partner: "Eiger · Ibu Penjaga Alam", tanggal: "22 Nov 2026", status: "Terkirim" as ProposalStatus, nilai: "Rp 85 jt", baru: true }]
      : []),
    ...PROPOSAL.map((p) => ({ ...p, baru: false })),
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        {/* Funnel */}
        <Card>
          <CardHeader className="flex-row flex-wrap items-center justify-between gap-2">
            <div>
              <CardTitle>Pipeline proposal · Q4 2026</CardTitle>
              <p className="text-xs text-muted-foreground">Kuantitas dan kualitas proposal yang dibantu asisten</p>
            </div>
            <AIBadge />
          </CardHeader>
          <CardContent className="space-y-2">
            {FUNNEL.map((f, i) => {
              const pctTop = (f.nilai / top) * 100;
              const note =
                i === 2 ? `${Math.round((f.nilai / terkirim) * 100)}% response rate` : i === 3 ? `${Math.round((f.nilai / terkirim) * 100)}% win rate` : null;
              return (
                <div key={f.label} className="flex items-center gap-3">
                  <div className="w-36 shrink-0 text-sm sm:w-44">{f.label}</div>
                  <div className="relative h-9 flex-1 rounded bg-muted">
                    <div
                      className={cn("flex h-full items-center rounded px-3 text-sm font-bold text-white", i === 3 ? "bg-emerald-600" : "bg-primary")}
                      style={{ width: `${Math.max(pctTop, 12)}%`, opacity: 1 - i * 0.12 }}
                    >
                      {f.nilai}
                    </div>
                  </div>
                  <div className="hidden w-32 text-xs text-muted-foreground sm:block">{note}</div>
                </div>
              );
            })}
            <p className="pt-2 text-xs text-muted-foreground sm:hidden">
              Response rate 50% · Win rate 28%
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Funding vs target tahunan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rp {FUNDING.terkumpul} jt</div>
              <div className="text-xs text-muted-foreground">dari target Rp 1,2 M · {fundingPct}%</div>
              <div className="mt-2 h-3 rounded-full bg-muted">
                <div className="h-full rounded-full bg-emerald-600" style={{ width: `${fundingPct}%` }} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sebelum vs sesudah asisten</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead className="text-xs text-muted-foreground">
                  <tr>
                    <th className="text-left font-normal">per kuartal</th>
                    <th className="text-right font-normal">Sebelum</th>
                    <th className="text-right font-normal">Sesudah</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Proposal terkirim</td>
                    <td className="text-right">{SEBELUM.terkirim}</td>
                    <td className="text-right font-bold text-emerald-700">{terkirim}</td>
                  </tr>
                  <tr>
                    <td>Proposal goal</td>
                    <td className="text-right">{SEBELUM.goal}</td>
                    <td className="text-right font-bold text-emerald-700">{FUNNEL[3].nilai}</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-sm">
        <Lightbulb className="mt-0.5 size-5 shrink-0 text-emerald-700" />
        <div>
          <AIBadge className="mb-1" />
          <p className="font-medium text-emerald-950">
            Proposal yang memakai ≥2 karya redaksi sebagai bukti 2× lebih sering goal.
          </p>
          <p className="text-xs text-emerald-900/80">
            Pitch Eiger memakai {state.selected.length} karya redaksi dengan label sumber.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar proposal</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="border-b text-left text-xs text-muted-foreground">
              <tr>
                <th className="py-2 font-normal">Partner</th>
                <th className="font-normal">Tanggal kirim</th>
                <th className="font-normal">Status</th>
                <th className="text-right font-normal">Nilai</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.partner} className={cn("border-b last:border-0", r.baru && "bg-blue-50")}>
                  <td className="py-2 font-medium">
                    {r.partner} {r.baru && <span className="ml-1 rounded bg-blue-600 px-1.5 text-[10px] text-white">baru</span>}
                  </td>
                  <td>{r.tanggal}</td>
                  <td>
                    <span className={cn("rounded px-2 py-0.5 text-xs font-medium", STATUS_STYLE[r.status])}>{r.status}</span>
                  </td>
                  <td className="text-right">{r.nilai}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!state.sent && (
            <p className="pt-2 text-xs text-muted-foreground">Pitch Eiger belum dikirim. Selesaikan tahap 4 agar muncul di sini.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base">Hasil aktivasi Eiger (simulasi setelah 22 Des)</CardTitle>
            <p className="text-xs text-muted-foreground">Bukti nilai untuk pitch berikutnya</p>
          </div>
          <AIBadge />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {AKTIVASI.map((a) => (
              <div key={a.label} className="rounded-md bg-muted p-3">
                <div className="text-xs text-muted-foreground">{a.label}</div>
                <div className="text-lg font-bold">{a.nilai}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <RatihBadge />
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                set({ eigerSaved: true, eigerOpen: true, bannerDismissed: true });
                toast.success("Tersimpan sebagai bukti di kartu Eiger.");
                go(1);
              }}
            >
              <Save className="size-4" /> Simpan sebagai bukti
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
