import { useCallback, useState } from "react";
import { ArrowLeft, Check, Pencil, RefreshCw, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StepProps } from "./FundingFlow";
import { ARTIKEL, AUDIENS, KONSEP, LANGKAH_AI, SEGMEN, SUMBER_LABEL, VALUE_EXCHANGE, type Segmen } from "./dummy";
import { AIBadge, AIWorking, RatihBadge } from "./shared";

export function Step3Pitch({ state, set, go }: StepProps) {
  const [highlight, setHighlight] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [regenerating, setRegenerating] = useState(false);

  const onLoaded = useCallback(() => set({ pitchLoaded: true }), [set]);
  const onRegenerated = useCallback(() => setRegenerating(false), []);

  if (!state.pitchLoaded) {
    return <AIWorking steps={LANGKAH_AI.pitch} onDone={onLoaded} />;
  }

  // Klaim dari artikel yang tidak dipilih di Layar 2 tidak dipakai.
  const visible = SEGMEN.filter((s) => !s.sumber || s.sumber === "aud" || state.selected.includes(s.sumber));
  const aiText = (s: Segmen) => {
    const src = state.variant === 1 && s.alt ? s.alt : s;
    return src[state.tone];
  };
  const editedCount = Object.keys(state.edits).length;

  const showSource = (id: string) => {
    setHighlight(id);
    document.getElementById(`sumber-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const startEdit = (s: Segmen) => {
    setEditing(s.id);
    setDraft(state.edits[s.id] ?? aiText(s));
  };
  const saveEdit = (s: Segmen) => {
    const edits = { ...state.edits };
    if (draft.trim() && draft !== aiText(s)) edits[s.id] = draft;
    else delete edits[s.id];
    set({ edits, approved: false });
    setEditing(null);
  };
  const undoEdit = (id: string) => {
    const edits = { ...state.edits };
    delete edits[id];
    set({ edits });
  };

  const renderSeg = (s: Segmen, block = false) => {
    const edited = state.edits[s.id] !== undefined;
    const text = edited ? state.edits[s.id] : aiText(s);

    if (editing === s.id) {
      return (
        <div key={s.id} className="space-y-2 rounded-md border-2 border-blue-400 bg-blue-50 p-2">
          {s.judul && <div className="text-xs font-semibold uppercase text-muted-foreground">{s.judul}</div>}
          <textarea
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            className="w-full rounded border bg-white p-2 text-sm"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={() => saveEdit(s)}>
              Simpan editan
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setEditing(null)}>
              Batal
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div
        key={s.id}
        className={cn(
          "group relative rounded-md border-l-4 px-3 py-1.5 text-sm leading-relaxed whitespace-pre-line",
          edited ? "border-blue-500 bg-blue-50 text-blue-950" : "border-emerald-300 bg-emerald-50/40",
          block && "py-2",
        )}
      >
        {s.judul && <div className="text-xs font-semibold uppercase text-muted-foreground">{s.judul}</div>}
        <span>{text}</span>{" "}
        {s.sumber && (
          <button
            onClick={() => showSource(s.sumber!)}
            title="Klik untuk melihat sumber klaim ini"
            className={cn(
              "ml-1 inline-flex items-center rounded border px-1.5 text-[11px] font-semibold align-middle transition-colors",
              highlight === s.sumber
                ? "border-amber-500 bg-amber-200 text-amber-900"
                : "border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100",
            )}
          >
            Sumber: {SUMBER_LABEL[s.sumber]}
          </button>
        )}
        <span className="ml-2 inline-flex gap-1 align-middle">
          {edited && (
            <span className="rounded bg-blue-600 px-1.5 text-[10px] font-semibold text-white">Diedit Ratih</span>
          )}
          <button onClick={() => startEdit(s)} className="text-muted-foreground hover:text-foreground" title="Edit">
            <Pencil className="size-3.5" />
          </button>
          {edited && (
            <button onClick={() => undoEdit(s.id)} className="text-muted-foreground hover:text-foreground" title="Kembalikan teks AI">
              <Undo2 className="size-3.5" />
            </button>
          )}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Konsep + value exchange */}
      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between gap-2">
          <CardTitle>Konsep aktivasi: "{KONSEP.nama}"</CardTitle>
          <AIBadge />
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="text-sm">
            <p className="mb-2 text-muted-foreground">{KONSEP.ringkas}</p>
            <ul className="list-disc space-y-1 pl-5">
              {KONSEP.komponen.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-md bg-muted p-3 text-sm">
            <div className="mb-1 font-semibold">Redaksi → Eiger</div>
            <ul className="list-disc space-y-0.5 pl-5">
              {VALUE_EXCHANGE.redaksiKePartner.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-md bg-muted p-3 text-sm">
            <div className="mb-1 font-semibold">Eiger → Redaksi</div>
            <ul className="list-disc space-y-0.5 pl-5">
              {VALUE_EXCHANGE.partnerKeRedaksi.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-card p-3">
        <RatihBadge />
        <div className="inline-flex rounded-md border p-0.5">
          {(["formal", "hangat"] as const).map((t) => (
            <button
              key={t}
              onClick={() => set({ tone: t })}
              className={cn(
                "rounded px-3 py-1 text-sm capitalize",
                state.tone === t ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )}
            >
              Tone {t}
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={regenerating}
          onClick={() => {
            setRegenerating(true);
            set({ variant: state.variant === 0 ? 1 : 0, approved: false });
          }}
        >
          <RefreshCw className="size-3.5" /> Buat ulang
        </Button>
        <Button variant="outline" size="sm" onClick={() => go(2)}>
          <ArrowLeft className="size-3.5" /> Ganti artikel
        </Button>
        <div className="ml-auto flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <span className="size-3 rounded-sm border-l-4 border-emerald-300 bg-emerald-50" /> Teks AI
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="size-3 rounded-sm border-l-4 border-blue-500 bg-blue-50" /> Diedit Ratih ({editedCount})
          </span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        {/* Draf */}
        <div className="space-y-4">
          {regenerating ? (
            <AIWorking steps={LANGKAH_AI.ulang} onDone={onRegenerated} />
          ) : (
            <>
              <Card>
                <CardHeader className="flex-row flex-wrap items-center justify-between gap-2">
                  <div>
                    <CardTitle>Draf email pitch</CardTitle>
                    <p className="text-xs text-muted-foreground">Kepada: Dina Kusuma, Eiger (fiktif) · Lampiran: one-pager.pdf</p>
                  </div>
                  <AIBadge />
                </CardHeader>
                <CardContent className="space-y-1.5">
                  {visible.filter((s) => s.bagian === "email").map((s) => renderSeg(s))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex-row flex-wrap items-center justify-between gap-2">
                  <CardTitle>One-pager proposal</CardTitle>
                  <AIBadge />
                </CardHeader>
                <CardContent className="space-y-2">
                  {visible.filter((s) => s.bagian === "onepager").map((s) => renderSeg(s, true))}
                </CardContent>
              </Card>
            </>
          )}

          <div className="flex flex-wrap items-center gap-3 rounded-lg border-2 border-blue-300 bg-blue-50 p-4">
            <RatihBadge />
            <p className="flex-1 text-sm text-blue-950">
              {editedCount > 0
                ? `Kamu mengedit ${editedCount} bagian. Sudah sesuai?`
                : "Baca draf, klik label sumber untuk mengecek, lalu edit bila perlu."}
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={regenerating || editing !== null}
              onClick={() => {
                set({ approved: true });
                go(4);
              }}
            >
              <Check className="size-4" /> Setujui draf
            </Button>
          </div>
        </div>

        {/* Panel sumber */}
        <aside className="space-y-3 lg:sticky lg:top-28 lg:self-start">
          <div className="text-sm font-semibold">Sumber yang dipakai AI</div>
          <p className="text-xs text-muted-foreground">Klik label "Sumber" di draf untuk menyorot asal klaim.</p>
          {ARTIKEL.filter((a) => state.selected.includes(a.id)).map((a) => (
            <div
              key={a.id}
              id={`sumber-${a.id}`}
              onClick={() => setHighlight(a.id)}
              className={cn(
                "cursor-pointer rounded-lg border bg-card p-3 text-sm transition-all",
                highlight === a.id && "border-amber-500 bg-amber-50 ring-4 ring-amber-300",
              )}
            >
              <div className="mb-1 text-xs font-semibold text-amber-800">{a.kode} · Karya redaksi</div>
              <div className="font-medium">{a.judul}</div>
              <div className="text-xs text-muted-foreground">
                {a.tanggal} · {a.views}
              </div>
            </div>
          ))}
          <div
            id="sumber-aud"
            onClick={() => setHighlight("aud")}
            className={cn(
              "cursor-pointer rounded-lg border bg-card p-3 text-sm transition-all",
              highlight === "aud" && "border-amber-500 bg-amber-50 ring-4 ring-amber-300",
            )}
          >
            <div className="mb-1 text-xs font-semibold text-amber-800">Audiens · Data redaksi</div>
            <dl className="grid grid-cols-2 gap-1 text-xs">
              {AUDIENS.map((d) => (
                <div key={d.label}>
                  <dt className="text-muted-foreground">{d.label}</dt>
                  <dd className="font-semibold">{d.nilai}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
