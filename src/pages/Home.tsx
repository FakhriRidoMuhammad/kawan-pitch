import { Link } from "react-router";
import { ArrowRight, FileSearch, Mic, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP } from "@/config";
import { useRole } from "@/lib/roles";

export function Home() {
  const { roleLabel } = useRole();

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-lg border bg-card p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Rumusan masalah</p>
        <h1 className="mt-2 text-xl font-bold leading-snug md:text-2xl">{APP.problem}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Kamu sekarang melihat prototipe ini sebagai <strong>{roleLabel}</strong>. Ganti peran di pojok kanan atas.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <FileSearch className="size-5 text-primary" />
            <CardTitle>Alur contoh: dokumen</CardTitle>
            <CardDescription>Unggah kuitansi. AI membaca isi kuitansi. Manusia memeriksa setiap kolom.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/contoh" className={buttonVariants({ size: "sm" })}>
              Coba alur <ArrowRight />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Mic className="size-5 text-primary" />
            <CardTitle>Alur contoh: transkrip</CardTitle>
            <CardDescription>Putar wawancara. AI menandai kutipan dan bagian yang perlu didengar ulang.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/transkrip" className={buttonVariants({ size: "sm", variant: "outline" })}>
              Coba alur <ArrowRight />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <ShieldCheck className="size-5 text-primary" />
            <CardTitle>Data tersimpan</CardTitle>
            <CardDescription>Semua data yang sudah lolos tinjauan manusia, dengan nama peran yang memutuskan.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/data" className={buttonVariants({ size: "sm", variant: "outline" })}>
              Lihat data <ArrowRight />
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
