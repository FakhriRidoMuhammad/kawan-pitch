// Satu-satunya tempat ANTHROPIC_API_KEY dipakai. Browser tidak pernah menerima key ini.
// Rute: GET /api/ai (status) dan POST /api/ai (panggilan AI).
import Anthropic from "@anthropic-ai/sdk";
import mockResponses from "../../mock/ai-responses.json";

export const config = { path: "/api/ai" };

const DEFAULT_MODEL = "claude-sonnet-5-5";
const MAX_FILE_BYTES = 4 * 1024 * 1024; // Netlify membatasi badan permintaan sampai 6 MB. Base64 menambah 33%.
const MAX_FILES = 3;
const IMAGE_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp"];

interface AIFile {
  name?: string;
  mediaType: string;
  data: string; // base64 tanpa awalan data:
}

interface AIRequest {
  check?: boolean;
  system?: string;
  prompt?: string;
  schema?: Record<string, unknown>;
  files?: AIFile[];
  mockKey?: string;
  maxTokens?: number;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function mockAnswer(body: AIRequest) {
  const responses = mockResponses as Record<string, any>;
  const hit = (body.mockKey && responses[body.mockKey]) || responses.default;
  if (body.schema) return { text: JSON.stringify(hit), data: hit, mode: "mock" };
  return { text: hit.text ?? JSON.stringify(hit), data: null, mode: "mock" };
}

export default async (req: Request) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const accessCode = process.env.DEMO_ACCESS_CODE;
  const mode = apiKey ? "claude" : "mock";

  if (req.method === "GET") {
    return json({ mode, protected: mode === "claude" });
  }
  if (req.method !== "POST") {
    return json({ error: "Metode tidak didukung." }, 405);
  }

  // Kode akses hanya wajib saat key asli aktif. Mode mock tidak memakai biaya.
  if (mode === "claude") {
    if (!accessCode) {
      return json(
        { error: "DEMO_ACCESS_CODE belum diisi di server. Fungsi AI menolak semua permintaan." },
        500,
      );
    }
    if (req.headers.get("x-demo-code") !== accessCode) {
      return json({ error: "Kode akses salah atau kosong." }, 401);
    }
  }

  let body: AIRequest;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Badan permintaan bukan JSON yang valid." }, 400);
  }

  if (body.check) return json({ ok: true, mode });
  if (!body.prompt) return json({ error: "Kolom `prompt` wajib diisi." }, 400);
  if (mode === "mock") return json(mockAnswer(body));

  // Susun isi pesan: file lebih dulu, lalu teks.
  const files = body.files ?? [];
  if (files.length > MAX_FILES) {
    return json({ error: `Maksimal ${MAX_FILES} file per permintaan.` }, 400);
  }
  const content: any[] = [];
  for (const file of files) {
    const bytes = Math.floor((file.data.length * 3) / 4);
    if (bytes > MAX_FILE_BYTES) {
      return json({ error: `File ${file.name ?? ""} melebihi batas 4 MB.` }, 413);
    }
    const data = file.data.replace(/\s/g, "");
    if (file.mediaType === "application/pdf") {
      content.push({ type: "document", source: { type: "base64", media_type: "application/pdf", data } });
    } else if (IMAGE_TYPES.includes(file.mediaType)) {
      content.push({ type: "image", source: { type: "base64", media_type: file.mediaType, data } });
    } else {
      return json({ error: `Tipe file ${file.mediaType} tidak didukung. Pakai PDF, PNG, JPEG, GIF, atau WebP.` }, 400);
    }
  }
  content.push({ type: "text", text: body.prompt });

  const cap = Number(process.env.AI_MAX_TOKENS) || 8000;
  const params: any = {
    model: process.env.AI_MODEL || DEFAULT_MODEL,
    max_tokens: Math.min(body.maxTokens ?? cap, cap),
    messages: [{ role: "user", content }],
    output_config: { effort: process.env.AI_EFFORT || "low" },
  };
  if (body.system) params.system = body.system;
  if (body.schema) {
    params.output_config.format = { type: "json_schema", schema: body.schema };
  }

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.stream(params).finalMessage();

    if (message.stop_reason === "refusal") {
      return json({ error: "Claude menolak permintaan ini. Ubah isi permintaan lalu coba lagi." }, 422);
    }
    if (message.stop_reason === "max_tokens") {
      return json({ error: "Jawaban terpotong karena batas token. Naikkan AI_MAX_TOKENS atau perpendek permintaan." }, 422);
    }

    const text = message.content
      .filter((block) => block.type === "text")
      .map((block: any) => block.text)
      .join("");

    let data: unknown = null;
    if (body.schema) {
      try {
        data = JSON.parse(text);
      } catch {
        return json({ error: "Jawaban Claude bukan JSON yang valid.", text }, 502);
      }
    }
    return json({ text, data, mode: "claude", usage: message.usage });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      return json({ error: "ANTHROPIC_API_KEY ditolak. Periksa key di env var." }, 500);
    }
    if (error instanceof Anthropic.RateLimitError) {
      return json({ error: "Batas laju Claude API tercapai. Tunggu sebentar lalu coba lagi." }, 429);
    }
    if (error instanceof Anthropic.APIError) {
      return json({ error: `Claude API: ${error.message}` }, error.status ?? 502);
    }
    return json({ error: `Kesalahan server: ${(error as Error).message}` }, 500);
  }
};
