import { useState, type FormEvent, type ReactNode } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { submitAccessCode, useAIStatus } from "@/lib/ai";

/**
 * Meminta kode akses sekali jika server memakai API key asli.
 * Mode AI MOCK tidak meminta kode.
 */
export function AccessGate({ children }: { children: ReactNode }) {
  const ai = useAIStatus();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!ai.protected || ai.hasCode) return <>{children}</>;

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await submitAccessCode(code.trim());
    } catch (cause) {
      setError((cause as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto mt-16 max-w-sm px-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="size-4" /> Kode akses demo
          </CardTitle>
          <CardDescription>
            Prototipe ini memakai AI asli. Minta kode akses ke tim pembuat prototipe.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <Input
              autoFocus
              type="password"
              placeholder="Kode akses"
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={!code.trim() || busy}>
              {busy ? "Memeriksa..." : "Masuk"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
