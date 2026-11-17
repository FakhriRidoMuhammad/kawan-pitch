import { Database, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { data } from "@/lib/data";
import { useAIStatus } from "@/lib/ai";

/**
 * Badge tetap di header. Badge ini memberi tahu semua orang jenis data dan jenis AI yang aktif.
 * Kuning = tiruan. Hijau = asli.
 */
export function ModeBadges() {
  const ai = useAIStatus();
  const dataIsMock = data.source === "mock";
  const aiIsMock = ai.mode !== "claude";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge
        variant={dataIsMock ? "warning" : "success"}
        title={dataIsMock ? "Data dummy dari mock/records.json. Perubahan tersimpan di browser ini saja." : "Data dari database Supabase."}
      >
        <Database className="size-3" />
        {dataIsMock ? "DATA MOCK" : "DATA SUPABASE"}
      </Badge>
      <Badge
        variant={aiIsMock ? "warning" : "success"}
        title={
          aiIsMock
            ? ai.reachable
              ? "Jawaban AI tiruan dari mock/ai-responses.json. Server belum punya API key."
              : "Fungsi /api/ai tidak terjangkau. Jawaban AI tiruan dari mock/ai-responses.json."
            : "Jawaban asli dari Claude API."
        }
      >
        <Sparkles className="size-3" />
        {ai.mode === "unknown" ? "AI ..." : aiIsMock ? "AI MOCK" : "AI CLAUDE"}
      </Badge>
    </div>
  );
}
