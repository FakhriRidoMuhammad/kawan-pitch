# server-optional

Folder ini tidak aktif. Aplikasi utama tidak memakai folder ini.

## Kapan memakai folder ini

Pakai server Express di Render hanya jika fungsi Netlify tidak cukup:

- Satu permintaan butuh waktu lebih lama dari batas waktu fungsi Netlify.
- Prototipe butuh proses yang terus hidup (WebSocket, antrean, tugas terjadwal).
- File yang diunggah lebih besar dari 4 MB.

## Risiko

Render paket gratis menidurkan server setelah 15 menit tanpa permintaan. Permintaan pertama setelah itu butuh kira-kira 50 detik. Buka URL `/health` 2 menit sebelum demo.

## Cara mengaktifkan

1. Di folder ini, jalankan `npm install`.
2. Jalankan `npm start`. Server berjalan di `http://localhost:3001`.
3. Di Render: New > Blueprint > pilih repo ini. Render membaca `render.yaml`.
4. Isi env var di Render: `ANTHROPIC_API_KEY`, `DEMO_ACCESS_CODE`, `ALLOWED_ORIGIN` (URL Netlify kamu).
5. Di `src/lib/ai.ts`, ubah `ENDPOINT` menjadi `https://<nama>.onrender.com/api/ai`.

`server.mjs` hanya memuat kerangka: pemeriksaan kode akses, CORS, dan satu panggilan Claude untuk teks. Salin logika file dan skema dari `netlify/functions/ai.ts` jika kamu membutuhkannya.

Folder ini belum pernah diuji di Render.
