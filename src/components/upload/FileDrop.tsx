import { useRef, useState, type DragEvent } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_ACCEPT = ["application/pdf", "image/png", "image/jpeg", "image/webp"];
const DEFAULT_MAX_MB = 4;

interface FileDropProps {
  onFile: (file: File) => void;
  accept?: string[];
  maxMB?: number;
  disabled?: boolean;
  hint?: string;
}

/** Area unggah satu file. Menolak file dengan tipe atau ukuran yang salah. */
export function FileDrop({
  onFile,
  accept = DEFAULT_ACCEPT,
  maxMB = DEFAULT_MAX_MB,
  disabled,
  hint = "PDF, PNG, JPEG, atau WebP. Hanya data dummy atau data publik.",
}: FileDropProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const take = (file: File | undefined) => {
    if (!file) return;
    if (!accept.includes(file.type)) {
      setError(`Tipe file "${file.type || "tidak dikenal"}" tidak didukung.`);
      return;
    }
    if (file.size > maxMB * 1024 * 1024) {
      setError(`Ukuran file melebihi ${maxMB} MB.`);
      return;
    }
    setError(null);
    onFile(file);
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    setOver(false);
    if (!disabled) take(event.dataTransfer.files[0]);
  };

  return (
    <div>
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
        className={cn(
          "flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors disabled:cursor-not-allowed disabled:opacity-50",
          over ? "border-primary bg-accent" : "border-input hover:bg-accent/50",
        )}
      >
        <Upload className="size-6 text-muted-foreground" />
        <span className="text-sm font-medium">Tarik file ke sini atau klik untuk memilih file</span>
        <span className="text-xs text-muted-foreground">
          {hint} Maksimal {maxMB} MB.
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept.join(",")}
        onChange={(event) => {
          take(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}
