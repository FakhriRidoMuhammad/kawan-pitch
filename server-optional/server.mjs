// Kerangka server Express untuk Render. Tidak aktif secara default. Baca README.md di folder ini.
import Anthropic from "@anthropic-ai/sdk";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "20mb" }));

const apiKey = process.env.ANTHROPIC_API_KEY;
const accessCode = process.env.DEMO_ACCESS_CODE;
const mode = apiKey ? "claude" : "mock";

app.get("/health", (_req, res) => res.json({ ok: true }));

app.get("/api/ai", (_req, res) => res.json({ mode, protected: mode === "claude" }));

app.post("/api/ai", async (req, res) => {
  if (mode === "claude") {
    if (!accessCode) return res.status(500).json({ error: "DEMO_ACCESS_CODE belum diisi di server." });
    if (req.get("x-demo-code") !== accessCode) {
      return res.status(401).json({ error: "Kode akses salah atau kosong." });
    }
  }
  const { check, system, prompt } = req.body ?? {};
  if (check) return res.json({ ok: true, mode });
  if (!prompt) return res.status(400).json({ error: "Kolom `prompt` wajib diisi." });
  if (mode === "mock") {
    return res.json({ text: "Ini jawaban tiruan (AI MOCK).", data: null, mode });
  }

  try {
    const client = new Anthropic({ apiKey });
    const params = {
      model: process.env.AI_MODEL || "claude-sonnet-5-5",
      max_tokens: Number(process.env.AI_MAX_TOKENS) || 8000,
      messages: [{ role: "user", content: prompt }],
      output_config: { effort: process.env.AI_EFFORT || "low" },
    };
    if (system) params.system = system;
    const message = await client.messages.stream(params).finalMessage();
    if (message.stop_reason === "refusal") {
      return res.status(422).json({ error: "Claude menolak permintaan ini." });
    }
    const text = message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("");
    res.json({ text, data: null, mode });
  } catch (error) {
    const status = error instanceof Anthropic.APIError ? (error.status ?? 502) : 500;
    res.status(status).json({ error: `Claude API: ${error.message}` });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server berjalan di port ${port}`));
