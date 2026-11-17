import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

/** Menampilkan PDF atau gambar yang diunggah. Dipakai sebagai "sumber asli" di ReviewPanel. */
export function FilePreview({ file }: { file: File }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="overflow-hidden rounded-md border bg-muted">
      <div className="flex items-center gap-2 border-b bg-card px-3 py-2 text-xs text-muted-foreground">
        <FileText className="size-3.5" />
        <span className="truncate">{file.name}</span>
      </div>
      {url &&
        (file.type === "application/pdf" ? (
          <iframe src={url} title={file.name} className="h-96 w-full" />
        ) : (
          <img src={url} alt={file.name} className="max-h-96 w-full object-contain" />
        ))}
    </div>
  );
}
