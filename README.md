# GKJW Karangpilang — Landing Page

Website jemaat GKJW Karangpilang: jadwal ibadah, warta jemaat, pelayanan, kegiatan, galeri, dan lokasi.

```
GKJW-LandingPage/
├── frontend/   React + Vite + TypeScript (halaman website)
└── backend/    Express API (menyajikan konten dari file JSON)
```

Frontend **tetap tampil walau backend mati**: ia membawa salinan konten (`frontend/src/data/fallback-content.json`) dan menggantinya dengan data API bila `VITE_API_URL` diisi dan API merespons.

## Mode terang & gelap

Website otomatis mengikuti mode terang/gelap perangkat pengunjung. Tombol matahari/bulan di header mengganti mode secara manual; pilihan disimpan di browser pengunjung. Jika pengunjung memilih mode yang sama dengan sistemnya, website kembali mengikuti sistem otomatis. Warna diatur lewat token di `frontend/src/styles/tokens.css` (`:root` = terang, `:root[data-theme='dark']` = gelap).

## Menjalankan di komputer

```bash
# Terminal 1 — API (http://localhost:4000/api/content)
cd backend && npm install && npm run dev

# Terminal 2 — website (http://localhost:5173)
cd frontend && npm install
cp .env.example .env.local   # berisi VITE_API_URL=http://localhost:4000
npm run dev
```

Tes: `npm test` (atau `npm run test:coverage`) di masing-masing folder.

## Mengubah isi website

Semua konten ada di `backend/data/`:

| File | Isi |
|------|-----|
| `site.json` | nama, tagline, tentang, alamat, kontak (Instagram, YouTube, WhatsApp, email), jam kantor |
| `schedules.json` | jadwal ibadah (`icon`: church, family, youth, bible, child, music, heart, people) |
| `announcements.json` | warta jemaat — `date` format `YYYY-MM-DD`, `pdfUrl` isi link PDF atau `null` |
| `ministries.json` | bidang pelayanan |
| `events.json` | agenda — kegiatan yang tanggalnya sudah lewat otomatis disembunyikan |
| `gallery.json` | foto galeri + keterangan |

Setelah mengubah data, salin juga ke cadangan frontend:

```bash
cd backend && npm run sync:frontend
```

### Mengganti foto

Semua foto memakai format **WebP** (maks. beberapa ratus KB) agar website cepat. Foto selain hero masih **placeholder acak**. Ganti file di `frontend/public/images/` dengan **nama file yang sama**:

| Folder | File | Lebar ideal |
|--------|------|-------------|
| `hero/` | `gereja.webp` + `gereja-828.webp` (versi HP), `warta-bg.webp` | 1672 / 828 px |
| `about/` | `ruang-ibadah.webp`, `pujian.webp`, `persekutuan.webp` | 900 / 600 px |
| `warta/` | `warta-1.webp` … `warta-3.webp` | 640 px |
| `pelayanan/` | `anak-remaja`, `pemuda`, `keluarga`, `musik`, `diakonia`, `kesaksian` (.webp) | 560 px |
| `galeri/` | `galeri-1.webp` … `galeri-6.webp` | 720 px |

Konversi dari JPG/PNG (butuh `brew install webp`), atau pakai squoosh.app → WebP kualitas ±75:

```bash
cwebp -q 76 -resize 720 0 foto-asli.jpg -o frontend/public/images/galeri/galeri-1.webp
# Hero: dua ukuran
cwebp -q 78 foto-gereja.png -o frontend/public/images/hero/gereja.webp
cwebp -q 72 -resize 828 0 foto-gereja.png -o frontend/public/images/hero/gereja-828.webp
```

`frontend/public/og-image.jpg` adalah gambar pratinjau saat link dibagikan di WhatsApp/Instagram (tetap JPG karena tidak semua aplikasi mendukung WebP).

### Data yang masih perlu dilengkapi

Di `backend/data/site.json`: alamat lengkap (`address.street`), nomor WhatsApp (`contact.whatsapp`), email, link YouTube (`contact.youtubeUrl`), dan cek username Instagram. Kolom yang kosong otomatis disembunyikan dari halaman.

## Deploy ke Vercel

Buat **dua project** Vercel dari repo yang sama:

1. **Backend** — *Root Directory*: `backend`. Tidak perlu build command.
   Environment variable (opsional): `ALLOWED_ORIGINS=https://<domain-frontend>`.
   Cek: `https://<domain-backend>/api/health`.
2. **Frontend** — *Root Directory*: `frontend`, framework **Vite** (terdeteksi otomatis).
   Environment variable: `VITE_API_URL=https://<domain-backend>` (tanpa `/` di akhir).

`frontend/vercel.json` sudah memasang header keamanan (CSP, HSTS, dll). CSP mengizinkan API di `*.vercel.app`; kalau backend memakai domain sendiri, tambahkan domain itu ke `connect-src`.

## API

Semua respons memakai format `{ success, data, error }`.

| Endpoint | Keterangan |
|----------|-----------|
| `GET /api/health` | status API |
| `GET /api/content` | seluruh konten sekaligus (dipakai website) |
| `GET /api/content/:bagian?limit=n` | satu bagian: `site`, `schedules`, `announcements`, `ministries`, `events`, `gallery` |
