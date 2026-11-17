import { useCallback, useState, useSyncExternalStore } from "react";
import mockResponses from "@mock/ai-responses.json";

const ENDPOINT = "/api/ai";
const CODE_KEY = "prototype.demoCode";

export type AIMode = "claude" | "mock";

export interface AIFile {
  name?: string;
  mediaType: string;
  /** base64 tanpa awalan `data:`. Pakai `fileToBase64()` dari lib/utils. */
  data: string;
}

export interface AskAIInput {
  system?: string;
  prompt: string;
  /** JSON Schema. Jika diisi, `result.data` berisi objek yang sesuai skema ini. */
  schema?: Record<string, unknown>;
  files?: AIFile[];
  /** Kunci di mock/ai-responses.json yang dipakai saat mode AI MOCK. */
  mockKey?: string;
  maxTokens?: number;
}

export interface AskAIResult<T = any> {
  text: string;
  data: T | null;
  mode: AIMode;
}

// ---------- Status global (dibaca oleh badge dan AccessGate) ----------

interface AIStatus {
  /** "unknown" sampai pemeriksaan pertama selesai. */
  mode: AIMode | "unknown";
  /** true = server meminta kode akses. */
  protected: boolean;
  /** false = fungsi /api/ai tidak terjangkau. Klien memakai jawaban tiruan lokal. */
  reachable: boolean;
  hasCode: boolean;
}

function readCode() {
  try {
    return localStorage.getItem(CODE_KEY) ?? "";
  } catch {
    return "";
  }
}

let status: AIStatus = { mode: "unknown", protected: false, reachable: false, hasCode: !!readCode() };
const listeners = new Set<() => void>();

function setStatus(patch: Partial<AIStatus>) {
  status = { ...status, ...patch };
  listeners.forEach((listener) => listener());
}

export function useAIStatus() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => status,
  );
}

async function fetchJSON(init?: RequestInit) {
  const response = await fetch(ENDPOINT, init);
  const isJSON = response.headers.get("content-type")?.includes("application/json");
  // `npm run dev` tanpa Netlify mengembalikan index.html untuk /api/ai. Itu berarti fungsi tidak ada.
  if (!isJSON) throw new Error("FUNGSI_TIDAK_ADA");
  return { response, body: await response.json() };
}

/** Memeriksa mode AI di server. Dipanggil sekali saat aplikasi mulai. */
export async function checkAIStatus() {
  try {
    const { body } = await fetchJSON();
    setStatus({ mode: body.mode, protected: !!body.protected, reachable: true });
  } catch {
    setStatus({ mode: "mock", protected: false, reachable: false });
  }
}

/** Memeriksa kode akses ke server. Menyimpan kode jika server menerima kode itu. */
export async function submitAccessCode(code: string) {
  const { response, body } = await fetchJSON({
    method: "POST",
    headers: { "content-type": "application/json", "x-demo-code": code },
    body: JSON.stringify({ check: true }),
  });
  if (!response.ok) throw new Error(body.error ?? "Kode akses ditolak.");
  try {
    localStorage.setItem(CODE_KEY, code);
  } catch {
    // Tanpa localStorage, kode hanya berlaku sampai halaman dimuat ulang.
  }
  sessionCode = code;
  setStatus({ hasCode: true });
}

let sessionCode = readCode();

function clearAccessCode() {
  sessionCode = "";
  try {
    localStorage.removeItem(CODE_KEY);
  } catch {
    // abaikan
  }
  setStatus({ hasCode: false });
}

function localMock<T>(input: AskAIInput): AskAIResult<T> {
  const responses = mockResponses as Record<string, any>;
  const hit = (input.mockKey && responses[input.mockKey]) || responses.default;
  if (input.schema) return { text: JSON.stringify(hit), data: hit as T, mode: "mock" };
  return { text: hit.text ?? JSON.stringify(hit), data: null, mode: "mock" };
}

// ---------- API utama ----------

/**
 * Memanggil AI lewat fungsi Netlify.
 * Jika fungsi tidak terjangkau, fungsi ini mengembalikan jawaban tiruan lokal dengan `mode: "mock"`.
 */
export async function askAI<T = any>(input: AskAIInput): Promise<AskAIResult<T>> {
  let result: { response: Response; body: any };
  try {
    result = await fetchJSON({
      method: "POST",
      headers: { "content-type": "application/json", "x-demo-code": sessionCode },
      body: JSON.stringify(input),
    });
  } catch {
    // Jeda singkat agar status "memproses" terlihat saat demo.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus({ mode: "mock", reachable: false });
    return localMock<T>(input);
  }

  const { response, body } = result;
  if (response.status === 401) {
    clearAccessCode();
    throw new Error("Kode akses salah. Masukkan kode akses lagi.");
  }
  if (!response.ok) throw new Error(body.error ?? `Permintaan AI gagal (${response.status}).`);

  setStatus({ mode: body.mode, reachable: true });
  return { text: body.text, data: body.data, mode: body.mode };
}

/** Hook React untuk `askAI`. Memberi state `loading`, `error`, dan `result`. */
export function useAI<T = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AskAIResult<T> | null>(null);

  const run = useCallback(async (input: AskAIInput) => {
    setLoading(true);
    setError(null);
    try {
      const answer = await askAI<T>(input);
      setResult(answer);
      return answer;
    } catch (cause) {
      setError((cause as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { run, reset, loading, error, result };
}
