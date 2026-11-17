# UI dan komponen

## Tema

Buka `src/index.css`. Semua warna, font, dan radius ada di blok `@theme`.

| Token | Guna |
|---|---|
| `--color-primary` | Warna utama: tombol, menu aktif, sorotan |
| `--color-background` | Latar halaman |
| `--color-card` | Latar kartu dan header |
| `--color-accent` | Latar saat kursor di atas elemen |
| `--color-success`, `--color-warning`, `--color-destructive` | Hijau, kuning, merah untuk status |
| `--font-sans` | Font |
| `--radius-md`, `--radius-lg` | Sudut tombol dan kartu |

Jika desainer memberi satu warna merek, ganti `--color-primary` dan `--color-ring`. Dua baris itu cukup untuk mengubah kesan seluruh aplikasi.

Jangan ubah warna badge mode menjadi warna yang sama. Kuning dan hijau harus tetap berbeda.

## Komponen dasar

Semua ada di `src/components/ui/`.

```tsx
<Button>Simpan</Button>
<Button variant="outline" size="sm">Batal</Button>
// variant: default | outline | secondary | ghost | destructive | success
// size: default | sm | lg | icon

<Card>
  <CardHeader>
    <CardTitle>Judul</CardTitle>
    <CardDescription>Penjelasan</CardDescription>
  </CardHeader>
  <CardContent>Isi</CardContent>
</Card>

<Input placeholder="..." />
<Textarea rows={6} />
<Badge variant="warning">Perlu dicek</Badge>
// variant: default | secondary | outline | success | warning | destructive
```

Tautan dengan tampilan tombol:

```tsx
<Link to="/data" className={buttonVariants({ size: "sm" })}>Lihat data</Link>
```

Ikon berasal dari `lucide-react`. Notifikasi: `toast.success("...")` dan `toast.error("...")` dari `sonner`.

## Menambah komponen shadcn

```
npx shadcn@latest add dialog tabs select
```

Perintah itu menulis file ke `src/components/ui/`. Token tema sudah cocok. Perintah ini belum teruji di repo ini. Jika perintah gagal, tulis komponen sederhana dengan tangan.

## ReviewPanel

File: `src/components/hitl/ReviewPanel.tsx`.

```tsx
<ReviewPanel
  fields={ai.result.data.bidang}
  source={<FilePreview file={file} />}
  onSave={save}
  saveLabel="Simpan hasil tinjauan"
/>
```

| Prop | Isi |
|---|---|
| `fields` | Daftar `{ nama, nilai, kutipan_sumber, yakin }` |
| `source` | Tampilan sumber asli. Opsional. Tampil di sisi kiri. |
| `onSave` | Menerima `{ values, decisions, status, reviewedBy }` |
| `saveLabel` | Teks tombol simpan. Opsional. |

Perilaku:

- Setiap kolom punya tiga tombol: Setujui, Ubah, Tolak.
- Tombol simpan tidak aktif sampai manusia memutuskan semua kolom.
- `values` tidak memuat kolom yang ditolak.
- `status` berisi `"approved"` jika semua kolom disetujui tanpa perubahan, `"rejected"` jika semua kolom ditolak, dan `"edited"` untuk kasus lain.
- `reviewedBy` berisi id peran aktif.

Beri prop `key` yang berubah jika kamu menampilkan hasil AI baru di tempat yang sama. Tanpa `key`, panel menyimpan keputusan lama.

## Peran demo

```tsx
import { useRole } from "@/lib/roles";

const { role, roleLabel, setRole } = useRole();
{role === "pimred" && <Button>Setujui pembayaran</Button>}
```

Daftar peran ada di `ROLES` pada `src/config.ts`. Aplikasi tidak punya login. Pengalih peran menunjukkan kepada jurnalis tampilan yang berbeda untuk setiap peran.

Contoh aturan peran ada di `src/pages/Records.tsx`: peran Jurnalis tidak melihat tombol hapus.

## Unggah file

```tsx
<FileDrop onFile={(file) => proses(file)} />
<FileDrop onFile={proses} accept={["application/pdf"]} maxMB={2} />
<FilePreview file={file} />
```

`FileDrop` menolak file dengan tipe atau ukuran yang salah. Jangan naikkan `maxMB` di atas 4. Netlify menolak permintaan yang lebih besar.

## Pemutar transkrip

```tsx
<TranscriptPlayer segments={segments} audioSrc="/samples/wawancara.mp3" duration={95} />
```

- `segments`: daftar `{ start, end, speaker, text, flag }`. `start` dan `end` dalam detik.
- `flag`: alasan baris itu perlu didengar ulang. Baris itu tampil dengan tanda kuning.
- `audioSrc` kosong: pemutar berjalan dalam mode simulasi tanpa suara.

Untuk memakai audio asli:

1. Taruh file audio publik atau audio buatan sendiri di `public/samples/`.
2. Isi `"audio": "/samples/nama-file.mp3"` di `mock/transcript.json`.
3. Isi `duration` dengan durasi file dalam detik.
4. Cocokkan `start` dan `end` setiap baris dengan audio itu.

## Halaman dan menu

1. Buat file di `src/pages/`.
2. Tambah `<Route>` di `src/App.tsx`.
3. Tambah baris di `NAV` pada `src/config.ts`.

## Layout

`src/components/layout/AppShell.tsx` memuat header, menu, dan area isi. Lebar isi maksimal `max-w-6xl`. Ubah nilai itu jika prototipe kamu butuh layar penuh.
