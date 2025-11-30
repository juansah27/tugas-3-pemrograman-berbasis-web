# 📦 Panduan Deploy Aplikasi SITTA ke GitHub Pages

## ✅ Status Saat Ini
- ✅ Semua file sudah di-commit ke Git lokal
- ✅ Remote sudah di-set ke: `https://github.com/juansah27/tugas-3-pemrograman-berbasis-web.git`
- ⏳ **Tunggu**: Repository GitHub perlu dibuat terlebih dahulu

---

## 🚀 Langkah-Langkah Deploy

### **Langkah 1: Buat Repository Baru di GitHub**

1. **Buka GitHub** di browser: https://github.com
2. **Login** ke akun GitHub Anda
3. Klik tombol **"+"** di kanan atas → pilih **"New repository"**
4. **Isi form**:
   ```
   Repository name: tugas-3-pemrograman-berbasis-web
   Description: Tugas Praktik 3 - SITTA dengan Vue.js Components
   Visibility: ⚪ Public (pilih Public untuk GitHub Pages gratis)
   ```
5. **JANGAN** centang:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
   
   (Karena kita sudah punya file-file ini)
6. Klik **"Create repository"**

---

### **Langkah 2: Push Code ke GitHub**

Setelah repository dibuat, jalankan perintah ini di terminal (dari folder proyek):

```bash
git push -u origin main
```

**Atau** jalankan file `deploy.bat` (double-click):
```
deploy.bat
```

Jika diminta login, masukkan:
- **Username**: `juansah27` (atau username GitHub Anda)
- **Password**: Gunakan **Personal Access Token** (bukan password GitHub)

> **Cara buat Personal Access Token:**
> 1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
> 2. Generate new token (classic)
> 3. Beri nama: "Tugas 3 Deploy"
> 4. Centang: `repo` (semua checkbox di bawah repo)
> 5. Generate token
> 6. **Copy token** (hanya muncul sekali!)
> 7. Gunakan token sebagai password saat push

---

### **Langkah 3: Setup GitHub Pages**

1. **Buka repository** di GitHub:
   ```
   https://github.com/juansah27/tugas-3-pemrograman-berbasis-web
   ```

2. Klik tab **"Settings"** (di menu atas)

3. Scroll ke bagian **"Pages"** (di sidebar kiri)

4. Di bagian **"Source"**:
   - **Branch**: Pilih `main`
   - **Folder**: Pilih `/ (root)`

5. Klik **"Save"**

6. **Tunggu 1-2 menit** untuk deployment

---

### **Langkah 4: Akses Aplikasi Online**

Setelah deployment selesai, aplikasi akan tersedia di:

**🌐 https://juansah27.github.io/tugas-3-pemrograman-berbasis-web/**

URL ini akan muncul di:
- Settings → Pages → "Your site is live at..."
- Tab "About" di repository (bisa di-edit untuk ditampilkan)

---

## 🔍 Verifikasi

Setelah deployment, pastikan:

- ✅ Halaman bisa diakses tanpa error
- ✅ Data JSON ter-load (cek console browser)
- ✅ Halaman Stok menampilkan data
- ✅ Halaman Tracking menampilkan data
- ✅ Halaman Pemesanan form berfungsi
- ✅ Filter dan Sort bekerja
- ✅ CRUD operations berfungsi

---

## 🐛 Troubleshooting

### **Error: Repository not found**
- Pastikan repository sudah dibuat di GitHub
- Pastikan nama repository sama: `tugas-3-pemrograman-berbasis-web`
- Pastikan username GitHub benar

### **Error: Authentication failed**
- Gunakan Personal Access Token, bukan password
- Pastikan token memiliki permission `repo`

### **Data tidak ter-load**
- Pastikan file `dataBahanAjar.json` ada di root folder
- Cek console browser untuk error
- Pastikan path di `js/services/api.js` menggunakan path relatif

### **Halaman blank**
- Tunggu 1-2 menit untuk deployment selesai
- Clear cache browser (Ctrl+F5)
- Cek tab "Actions" di GitHub untuk status deployment

### **GitHub Pages tidak muncul**
- Pastikan repository adalah **Public** (bukan Private)
- Pastikan branch `main` sudah di-push
- Pastikan Settings → Pages sudah di-set ke branch `main`

---

## 📝 Checklist Deploy

- [ ] Repository GitHub sudah dibuat
- [ ] Code sudah di-push ke GitHub
- [ ] GitHub Pages sudah di-setup (Settings → Pages)
- [ ] Deployment selesai (tunggu 1-2 menit)
- [ ] Aplikasi bisa diakses di URL GitHub Pages
- [ ] Semua fitur berfungsi normal

---

## 🎉 Selesai!

Setelah semua langkah selesai, aplikasi SITTA Anda akan:
- ✅ Online dan bisa diakses siapa saja
- ✅ Ter-update otomatis setiap kali push ke GitHub
- ✅ Gratis dengan GitHub Pages
- ✅ URL permanen yang bisa dibagikan

**Selamat! Aplikasi Anda sekarang online! 🚀**

---

## 📞 Bantuan

Jika ada masalah, cek:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Status](https://www.githubstatus.com/)
- Console browser untuk error messages

