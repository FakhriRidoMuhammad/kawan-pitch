// ALUR CONTOH AUDIO: pemutar + transkrip dummy -> AI menandai kutipan -> manusia meninjau -> simpan.
// Claude API tidak membaca audio. AI bekerja pada teks transkrip di mock/transcript.json.
import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import transcript from "@mock/transcript.json";
import { TranscriptPlayer } from "@/components/audio/TranscriptPlayer";
import { ReviewPanel, AI_FIELDS_SCHEMA, type AIField, type ReviewResult } from "@/components/hitl/ReviewPanel";
import { Button } from "@/components/ui/button";
import { useAI } from "@/lib/ai";
import { data } from "@/lib/data";
import { formatTime } from "@/lib/utils";

const transcriptText = transcript.segments
  .map((s) => `[${formatTime(s.start).padStart(5, "0")}] ${s.speaker}: ${s.text}`)
  .join("\n");

const PROMPT = `Berikut transkrip wawancara dengan cap waktu:

${transcriptText}

Buat tiga kolom:
1. "Kutipan kunci": satu kutipan narasumber yang paling kuat. Salin kata per kata.
2. "Klaim yang perlu dicek": satu klaim faktual yang harus jurnalis verifikasi.
3. "Bagian yang tidak jelas": bagian transkrip yang harus jurnalis dengar ulang, dengan cap waktu.
Untuk setiap kolom, isi kutipan_sumber dengan baris transkrip asli beserta cap waktu.`;

export function Transcript() {
  const ai = useAI<{ bidang: AIField[] }>();
  const [savedCount, setSavedCount] = useState(0);

  const analyze = () =>
    ai.run({
      system: "Kamu membantu jurnalis memeriksa transkrip. Kamu tidak mengubah kata narasumber.",
      prompt: PROMPT,
      schema: AI_FIELDS_SCHEMA,
      mockKey: "ringkas-transkrip",
    });

  const save = async (review: ReviewResult) => {
    await data.insert({
      kind: "transkrip",
      payload: { file: transcript.title, bidang: review.values, keputusan: review.decisions },
      review_status: review.status,
      reviewed_by: review.reviewedBy,
    });
    setSavedCount((n) => n + 1);
    ai.reset();
    toast.success("Catatan transkrip tersimpan.");
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-bold">{transcript.title}</h1>
        <p className="text-sm text-muted-foreground">
          Klik satu baris untuk mendengar bagian itu. Baris dengan tanda kuning perlu didengar ulang.
        </p>
      </div>

      <TranscriptPlayer segments={transcript.segments} audioSrc={transcript.audio} duration={transcript.duration} />

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={analyze} disabled={ai.loading}>
          {ai.loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
          {ai.loading ? "AI sedang membaca transkrip..." : "Minta AI menandai kutipan"}
        </Button>
        {savedCount > 0 && <span className="text-sm text-success">{savedCount} catatan tersimpan.</span>}
        {ai.error && <span className="text-sm text-destructive">{ai.error}</span>}
      </div>

      {ai.result?.data && <ReviewPanel fields={ai.result.data.bidang} onSave={save} saveLabel="Simpan catatan" />}
    </div>
  );
}
