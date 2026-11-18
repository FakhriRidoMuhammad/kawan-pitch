import { useEffect, useState } from "react";
import { Check, Loader2, Sparkles, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/** Badge hijau: hasil kerja AI. */
export function AIBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800",
        className,
      )}
    >
      <Sparkles className="size-3" /> AI menyarankan
    </span>
  );
}

/** Badge biru: titik keputusan Ratih. */
export function RatihBadge({ className, label = "Keputusan Ratih" }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-blue-300 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-800",
        className,
      )}
    >
      <UserCheck className="size-3" /> {label}
    </span>
  );
}

/** Animasi "AI sedang bekerja". Menampilkan langkah satu per satu, lalu memanggil onDone. */
export function AIWorking({ steps, onDone, stepMs = 450 }: { steps: string[]; onDone: () => void; stepMs?: number }) {
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (done >= steps.length) {
      const t = setTimeout(onDone, 250);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDone((d) => d + 1), stepMs);
    return () => clearTimeout(t);
  }, [done, steps.length, stepMs, onDone]);

  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-900">
        <Loader2 className="size-4 animate-spin" /> AI sedang bekerja…
      </div>
      <ul className="space-y-1.5 text-sm">
        {steps.map((s, i) => (
          <li
            key={s}
            className={cn(
              "flex items-center gap-2 transition-opacity",
              i < done ? "text-emerald-800" : i === done ? "text-foreground" : "opacity-30",
            )}
          >
            {i < done ? <Check className="size-4" /> : <span className="size-4 text-center">•</span>}
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
