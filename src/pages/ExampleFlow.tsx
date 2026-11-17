// ALUR CONTOH UTUH: unggah dokumen -> AI mengekstrak -> manusia meninjau -> simpan.
// Salin file ini untuk alur baru. Ubah PROMPT, FIELDS, `kind`, dan `mockKey`.
import { useState } from "react";
import { Link } from "react-router";
import { CheckCircle2, Loader2, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { ReviewPanel, AI_FIELDS_SCHEMA, type AIField, type ReviewResult } from "@/components/hitl/ReviewPanel";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDrop } from "@/components/upload/FileDrop";
import { FilePreview } from "@/components/upload/FilePreview";
import { useAI } from "@/lib/ai";
import { data } from "@/lib/data";
import { cn, fileToBase64 } from "@/lib/utils";

const KIND = "kuitansi";
const SAMPLE_URL = "/samples/kuitansi-contoh.pdf";
const FIELDS = ["Nomor kuitansi", "Tanggal", "Penerima", "Keperluan", "Jumlah"];

const SYSTEM =
  "Kamu membantu editor redaksi memeriksa dokumen administrasi. Kamu hanya menyalin informasi yang tertulis di dokumen. Kamu tidak menebak.";

const PROMPT = `Baca dokumen terlampir. Ekstrak kolom berikut: ${FIELDS.join(", ")}.
Untuk setiap kolom, isi:
- nama: nama kolom persis seperti daftar di atas
- nilai: isi kolom. Tulis string kosong jika dokumen tidak memuat informasi itu.
- kutipan_sumber: potongan teks dari dokumen yang mendasari nilai itu
- yakin: "tinggi" jika teks jelas terbaca, "sedang" jika ada tafsiran, "rendah" jika teks tidak jelas atau tidak ada`;

const STEPS = ["Unggah", "AI membaca", "Tinjauan manusia", "Tersimpan"];

export function ExampleFlow() {
  const [file, setFile] = useState<File | null>(null);
  const [saved, setSaved] = useState(false);
  const ai = useAI<{ bidang: AIField[] }>();

  const step = saved ? 3 : ai.result ? 2 : ai.loading ? 1 : 0;

  const extract = async (target: File) => {
    setFile(target);
    await ai.run({
      system: SYSTEM,
      prompt: PROMPT,
      schema: AI_FIELDS_SCHEMA,
      files: [{ name: target.name, mediaType: target.type, data: await fileToBase64(target) }],
      mockKey: "ekstrak-kuitansi",
    });
  };

  const useSample = async () => {
    const response = await fetch(SAMPLE_URL);
    const blob = await response.blob();
    await extract(new File([blob], "kuitansi-contoh.pdf", { type: "application/pdf" }));
  };

  const save = async (review: ReviewResult) => {
    await data.insert({
      kind: KIND,
      payload: { file: file?.name, bidang: review.values, keputusan: review.decisions },
      review_status: review.status,
      reviewed_by: review.reviewedBy,
    });
    setSaved(true);
    toast.success("Data tersimpan.");
  };

  const restart = () => {
    setFile(null);
    setSaved(false);
    ai.reset();
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">Periksa kuitansi kontributor</h1>
          <p className="text-sm text-muted-foreground">
            AI membaca kuitansi. Editor memutuskan setiap kolom sebelum data tersimpan.
          </p>
        </div>
        {step > 0 && (
          <Button variant="outline" size="sm" onClick={restart}>
            <RotateCcw /> Mulai lagi
          </Button>
        )}
      </div>

      <ol className="flex flex-wrap gap-2 text-xs">
        {STEPS.map((label, index) => (
          <li
            key={label}
            className={cn(
              "rounded-full border px-3 py-1",
              index === step && "border-primary bg-primary text-primary-foreground",
              index < step && "border-success/40 bg-success/10 text-success",
              index > step && "text-muted-foreground",
            )}
          >
            {index + 1}. {label}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>1. Unggah kuitansi</CardTitle>
            <CardDescription>Pakai hanya data dummy atau data publik.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <FileDrop onFile={extract} />
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Tidak punya file?</span>
              <Button variant="secondary" size="sm" onClick={useSample}>
                Pakai kuitansi contoh
              </Button>
            </div>
            {ai.error && <p className="text-sm text-destructive">{ai.error}</p>}
          </CardContent>
        </Card>
      )}

      {step === 1 && (
        <Card>
          <CardContent className="flex items-center gap-3 py-8">
            <Loader2 className="size-5 animate-spin text-primary" />
            <span className="text-sm">AI sedang membaca {file?.name}...</span>
          </CardContent>
        </Card>
      )}

      {step === 2 && ai.result?.data && file && (
        <>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="size-4" />
            {ai.result.mode === "mock"
              ? "Output di bawah adalah jawaban tiruan (AI MOCK). Output ini tidak membaca file kamu."
              : "Output di bawah berasal dari Claude."}
          </p>
          <ReviewPanel
            key={file.name + file.lastModified}
            fields={ai.result.data.bidang}
            source={<FilePreview file={file} />}
            onSave={save}
          />
        </>
      )}

      {step === 3 && (
        <Card>
          <CardContent className="flex flex-col items-start gap-3 py-8">
            <p className="flex items-center gap-2 font-semibold text-success">
              <CheckCircle2 className="size-5" /> Data tersimpan setelah tinjauan manusia.
            </p>
            <div className="flex gap-2">
              <Link to="/data" className={buttonVariants({ size: "sm" })}>
                Lihat data tersimpan
              </Link>
              <Button variant="outline" size="sm" onClick={restart}>
                Periksa kuitansi lain
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
