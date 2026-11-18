import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Tone } from "./dummy";
import { AIBadge, RatihBadge } from "./shared";
import { Step1Relasi } from "./Step1Relasi";
import { Step2Konteks } from "./Step2Konteks";
import { Step3Pitch } from "./Step3Pitch";
import { Step4Eksekusi } from "./Step4Eksekusi";
import { Step5Monitoring } from "./Step5Monitoring";

const STEPS = [
  { n: 1, label: "Relasi", sub: "Data creation" },
  { n: 2, label: "Konteks", sub: "AI context gathering" },
  { n: 3, label: "Rancang pitch", sub: "AI system utilization" },
  { n: 4, label: "Eksekusi", sub: "Strategy execution" },
  { n: 5, label: "Monitoring", sub: "AI performance monitoring" },
];

export interface FlowState {
  bannerDismissed: boolean;
  eigerOpen: boolean;
  contextLoaded: boolean;
  selected: string[];
  pitchLoaded: boolean;
  tone: Tone;
  variant: 0 | 1;
  edits: Record<string, string>;
  approved: boolean;
  sent: boolean;
  eigerSaved: boolean;
}

const INITIAL: FlowState = {
  bannerDismissed: false,
  eigerOpen: false,
  contextLoaded: false,
  selected: ["a1", "a2", "a3"],
  pitchLoaded: false,
  tone: "hangat",
  variant: 0,
  edits: {},
  approved: false,
  sent: false,
  eigerSaved: false,
};

export interface StepProps {
  state: FlowState;
  set: (patch: Partial<FlowState>) => void;
  go: (step: number) => void;
}

export function FundingFlow() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<FlowState>(INITIAL);
  const set = (patch: Partial<FlowState>) => setState((s) => ({ ...s, ...patch }));
  const go = (n: number) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const reset = () => {
    setState(INITIAL);
    go(1);
  };

  const props: StepProps = { state, set, go };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold">Asisten Funding — Kabar Priangan</h1>
          <p className="text-sm text-muted-foreground">
            Halo, Ratih. AI menyiapkan, kamu yang memutuskan. Tidak ada yang terkirim tanpa persetujuanmu.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <AIBadge />
          <RatihBadge />
          <Button variant="ghost" size="sm" onClick={reset} title="Kembalikan demo ke awal untuk peserta berikutnya">
            <RotateCcw className="size-3.5" /> Ulangi demo
          </Button>
        </div>
      </div>

      <ol className="flex gap-2 overflow-x-auto pb-1">
        {STEPS.map((s) => (
          <li key={s.n} className="min-w-[140px] flex-1">
            <button
              onClick={() => go(s.n)}
              className={cn(
                "w-full rounded-lg border px-3 py-2 text-left transition-colors",
                step === s.n
                  ? "border-primary bg-primary text-primary-foreground"
                  : step > s.n
                    ? "border-primary/40 bg-accent text-accent-foreground"
                    : "bg-card text-muted-foreground hover:bg-muted",
              )}
            >
              <div className="text-sm font-semibold">
                {s.n}. {s.label}
              </div>
              <div className={cn("text-[11px]", step === s.n ? "opacity-80" : "opacity-70")}>{s.sub}</div>
            </button>
          </li>
        ))}
      </ol>

      {step === 1 && <Step1Relasi {...props} />}
      {step === 2 && <Step2Konteks {...props} />}
      {step === 3 && <Step3Pitch {...props} />}
      {step === 4 && <Step4Eksekusi {...props} />}
      {step === 5 && <Step5Monitoring {...props} />}
    </div>
  );
}
