import { useCallback, useRef, useState } from "react";
import { ArrowRight, Bell, Pencil, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { StepProps } from "./FundingFlow";
import { CONTOH_PROMPT, LANGKAH_AI, PROMPT_BANNER, RELASI, type Relasi } from "./dummy";
import { gantiPartner, tafsirkan, type Tafsiran } from "./mockAI";
import { AIBadge, AIWorking, RatihBadge } from "./shared";

export function Step1Relasi({ state, set, go }: StepProps) {
  const [pending, setPending] = useState<Tafsiran | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const t = state.tafsiran;

  const kirim = (prompt: string) => {
    if (!prompt.trim()) return;
    set({ prompt, tafsiran: null, bannerDismissed: true });
    setPending(tafsirkan(prompt));
  };
  const onLoaded = useCallback(() => {
    set({ tafsiran: pending });
    setPending(null);
  }, [pending, set]);

  const ubah = (patch: Partial<Tafsiran>) => t && set({ tafsiran: { ...t, ...patch } });

  const konfirmasi = () => {
    if (!t) return;
    set({ selected: t.artikelIds, contextLoaded: false, pitchLoaded: false, edits: {}, approved: false, sent: false, variant: 0 });
    go(2);
  };

  const klikKartu = (r: Relasi) => {
    if (t) {
      set({ tafsiran: gantiPartner(t, r.id) });
      return;
    }
    set({ prompt: `Ajak ${r.nama} bekerja sama untuk ` });
    inputRef.current?.focus();
  };

  const relasi: Relasi[] = RELASI.map((r) =>
    r.id === state.savedPartnerId
      ? {
          ...r,
          status: "hangat",
          riwayat: [
            `Des 2026 · Aktivasi "${t?.konsepNama ?? "kolaborasi"}": 126 rb views, 112 peserta (bukti tersimpan)`,
            `Nov 2026 · Pitch "${t?.konsepNama ?? "kolaborasi"}" terkirim`,
            ...r.riwayat,
          ],
        }
      : r,
  );

  return (
    <div className="space-y-4">
      {/* Kotak prompt */}
      {!t && (
        <Card className="border-primary/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" /> Apa ide atau peluang funding yang ingin kamu kejar, Ratih?
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Tulis dengan bahasamu sendiri: partner, momen, topik liputan, atau target dana. AI akan menafsirkannya, lalu kamu yang mengoreksi.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              ref={inputRef}
              rows={3}
              value={state.prompt}
              disabled={!!pending}
              onChange={(e) => set({ prompt: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) kirim(state.prompt);
              }}
              placeholder="Contoh: Aku mau ajak Bank Jabar dukung liputan UMKM perempuan di Hari Kartini, target Rp 100 juta"
              className="text-base"
            />
            <div className="flex flex-wrap items-center gap-2">
              <Button onClick={() => kirim(state.prompt)} disabled={!state.prompt.trim() || !!pending}>
                <Send className="size-4" /> Kirim ke AI
              </Button>
              <span className="text-xs text-muted-foreground">atau coba:</span>
              {CONTOH_PROMPT.map((c) => (
                <button
                  key={c}
                  disabled={!!pending}
                  onClick={() => set({ prompt: c })}
                  className="rounded-full border bg-muted px-3 py-1 text-left text-xs hover:bg-accent"
                >
                  {c}
                </button>
              ))}
            </div>
            {pending && <AIWorking steps={LANGKAH_AI.intensi} onDone={onLoaded} />}
          </CardContent>
        </Card>
      )}

      {/* Banner saran AI (pintu kedua) */}
      {!t && !pending && !state.bannerDismissed && (
        <div className="flex flex-wrap items-start gap-3 rounded-lg border border-emerald-300 bg-emerald-50 p-4">
          <Bell className="mt-0.5 size-5 shrink-0 text-emerald-700" />
          <div className="min-w-0 flex-1">
            <AIBadge className="mb-1" />
            <p className="text-sm font-medium text-emerald-950">
              Belum punya ide? Peluang terdekat: Hari Ibu 22 Des cocok dengan fokus Eiger pada petualangan & perempuan di alam. Mulai susun
              pendekatan?
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => kirim(PROMPT_BANNER)}>
              Mulai susun pendekatan
            </Button>
            <Button size="sm" variant="ghost" onClick={() => set({ bannerDismissed: true })}>
              <X className="size-3.5" /> Abaikan
            </Button>
          </div>
        </div>
      )}

      {/* Kartu tafsiran (HITL) */}
      {t && (
        <Card className="border-2 border-blue-300">
          <CardHeader className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle>Begini AI memahami intensimu</CardTitle>
              <div className="flex gap-2">
                <AIBadge />
                <RatihBadge label="Koreksi bila perlu" />
              </div>
            </div>
            <blockquote className="rounded-md border-l-4 border-muted-foreground/30 bg-muted px-3 py-2 text-sm italic">
              "{t.prompt}"
            </blockquote>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-[1fr_300px]">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1 text-sm sm:col-span-2">
                <span className="text-xs font-medium text-muted-foreground">Tujuan</span>
                <Textarea rows={2} value={t.tujuan} onChange={(e) => ubah({ tujuan: e.target.value })} className="min-h-0" />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-xs font-medium text-muted-foreground">Partner sasaran</span>
                <select
                  value={t.partnerId}
                  onChange={(e) => set({ tafsiran: gantiPartner(t, e.target.value) })}
                  className="h-9 w-full rounded-md border border-input bg-card px-2 text-sm"
                >
                  {RELASI.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.nama} ({r.kategori})
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-xs font-medium text-muted-foreground">Nama konsep</span>
                <Input value={t.konsepNama} onChange={(e) => ubah({ konsepNama: e.target.value })} />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-xs font-medium text-muted-foreground">Momen</span>
                <Input value={t.momen} onChange={(e) => ubah({ momen: e.target.value, momenDariPrompt: true })} />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-xs font-medium text-muted-foreground">Tanggal</span>
                <Input value={t.tanggal} onChange={(e) => ubah({ tanggal: e.target.value, momenDariPrompt: true })} />
              </label>
              <label className="space-y-1 text-sm sm:col-span-2">
                <span className="text-xs font-medium text-muted-foreground">Target dana</span>
                <Input value={t.dana} onChange={(e) => ubah({ dana: e.target.value, danaDariPrompt: true })} />
              </label>
            </div>
            <div className="space-y-3">
              <div className="rounded-md bg-emerald-50 p-3 text-sm">
                <div className="mb-1 font-medium text-emerald-900">Alasan AI</div>
                <ul className="list-disc space-y-1 pl-5 text-emerald-950">
                  {t.alasan.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={konfirmasi}>
                  Ya, lanjut susun pendekatan <ArrowRight className="size-4" />
                </Button>
                <Button variant="outline" onClick={() => set({ tafsiran: null })}>
                  <Pencil className="size-3.5" /> Ubah prompt
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="text-lg font-semibold">Bank data relasi</h2>
        <p className="text-sm text-muted-foreground">
          {t
            ? "Klik kartu lain untuk mengganti partner sasaran."
            : "5 klien, partner, dan investor Kabar Priangan (fiktif). Klik kartu untuk mulai menulis ide dengan partner itu."}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {relasi.map((r) => (
          <button
            key={r.id}
            onClick={() => klikKartu(r)}
            className={cn(
              "rounded-lg border bg-card p-4 text-left transition-shadow hover:shadow-md",
              t?.partnerId === r.id && "ring-2 ring-blue-500",
            )}
          >
            <div className="mb-1 flex items-start justify-between gap-2">
              <div className="font-semibold">{r.nama}</div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
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
            <ul className="mt-2 space-y-0.5 text-xs text-muted-foreground">
              {r.riwayat.slice(0, r.id === state.savedPartnerId ? 3 : 1).map((h, i) => (
                <li key={h} className={cn(r.id === state.savedPartnerId && i < 2 && "font-medium text-blue-800")}>
                  {h}
                </li>
              ))}
            </ul>
            {t?.partnerId === r.id && <div className="mt-2 text-xs font-semibold text-blue-700">✓ Partner sasaran</div>}
          </button>
        ))}
      </div>
    </div>
  );
}
