# Instruksi Deploy ke GitHub Pages

## Langkah 1: Buat Repository Baru di GitHub

1. Buka [GitHub](https://github.com) dan login
2. Klik tombol **"+"** di kanan atas → **"New repository"**
3. Isi detail repository:
   - **Repository name**: `tugas-3-pemrograman-berbasis-web`
   - **Description**: "Tugas Praktik 3 - SITTA dengan Vue.js"
   - **Visibility**: Public (untuk GitHub Pages gratis)
   - **JANGAN** centang "Initialize with README" (karena sudah ada)
4. Klik **"Create repository"**

## Langkah 2: Update Remote dan Push

Jalankan perintah berikut di terminal (dari folder proyek):

```bash
# Hapus remote lama (jika ada)
git remote remove origin

# Tambah remote baru
git remote add origin https://github.com/juansah27/tugas-3-pemrograman-berbasis-web.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

**Catatan:** Ganti `juansah27` dengan username GitHub Anda jika berbeda.

## Langkah 3: Setup GitHub Pages

1. Buka repository di GitHub
2. Klik **Settings** (di menu atas)
3. Scroll ke bagian **Pages** (di sidebar kiri)
4. Di bagian **Source**, pilih:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Klik **Save**

## Langkah 4: Tunggu Deployment

- GitHub Pages akan otomatis deploy dalam 1-2 menit
- URL aplikasi akan muncul di bagian **Pages** settings
- Format URL: `https://[username].github.io/tugas-3-pemrograman-berbasis-web/`

## Langkah 5: Update Path JSON (Jika Perlu)

Jika aplikasi tidak bisa load data JSON setelah deploy, pastikan path di `js/services/api.js` sudah benar. Path relatif `dataBahanAjar.json` seharusnya sudah bekerja dengan baik.

## Troubleshooting

### Data tidak ter-load
- Pastikan file `dataBahanAjar.json` ada di root folder
- Cek console browser untuk error
- Pastikan path di `api.js` menggunakan path relatif

### Halaman blank
- Cek apakah semua file JavaScript sudah ter-commit
- Pastikan Vue.js CDN bisa diakses
- Cek console browser untuk error

### GitHub Pages tidak update
- Tunggu 1-2 menit untuk deployment
- Clear cache browser (Ctrl+F5)
- Cek Actions tab di GitHub untuk melihat status deployment

## Verifikasi

Setelah deployment selesai, akses:
**https://[username].github.io/tugas-3-pemrograman-berbasis-web/**

Aplikasi harus bisa:
- ✅ Load data dari JSON
- ✅ Menampilkan halaman Stok
- ✅ Menampilkan halaman Tracking
- ✅ Menampilkan halaman Pemesanan
- ✅ Semua fitur berfungsi normal

---

**Selamat! Aplikasi Anda sekarang online dan bisa diakses siapa saja! 🎉**

