# Tugas 3 - Pemrograman Berbasis Web

## SITTA - Sistem Informasi Tiras dan Transaksi Bahan Ajar

Aplikasi web berbasis Vue.js untuk mengelola stok bahan ajar, tracking delivery order, dan pemesanan di Universitas Terbuka.

**🌐 Live Demo:** [https://juansah27.github.io/tugas-3-pemrograman-berbasis-web/](https://juansah27.github.io/tugas-3-pemrograman-berbasis-web/)

## Struktur Proyek

```
tugas3-vue-ut/
├── index.html              # Root: mount #app (Single-page application)
├── css/
│   └── style.css          # Gaya global
├── data/
│   └── dataBahanAjar.json # Sumber data (JSON)
├── js/
│   ├── app.js             # Inisialisasi Vue root
│   ├── services/
│   │   └── api.js         # Fetch JSON (data service)
│   └── components/
│       ├── stock-table.js  # <ba-stock-table>
│       ├── do-tracking.js  # <do-tracking>
│       ├── order-form.js   # <order-form>
│       ├── status-badge.js # <status-badge>
│       └── app-modal.js    # <app-modal>
└── README.md
```

## Fitur

### 📚 Halaman Stok Bahan Ajar
- ✅ Menampilkan daftar stok dengan semua field (kode, judul, kategori, UT-Daerah, lokasi rak, harga, stok, safety)
- ✅ Formatting: Currency (Rp) dan Unit (buah)
- ✅ Filter berdasarkan:
  - UT-Daerah (dengan dependent options - kategori muncul setelah UT-Daerah dipilih)
  - Kategori Mata Kuliah
  - Status Stok (Aman/Menipis/Kosong)
- ✅ Sort berdasarkan: Judul, Jumlah Stok, Harga
- ✅ Status stok dengan tooltip (hover untuk melihat catatanHTML):
  - 🟢 **Aman**: qty >= safety stock
  - 🟠 **Menipis**: qty < safety stock
  - 🔴 **Kosong**: qty = 0
- ✅ CRUD Operations:
  - **Create**: Form tambah stok baru dengan validasi
  - **Read**: Tampilan tabel dengan formatting
  - **Update**: Edit stok dengan form, Enter untuk submit
  - **Delete**: Hapus dengan konfirmasi modal
- ✅ Event handlers: Enter key untuk submit, hover untuk tooltip
- ✅ Reset filter

### 🚚 Tracking Delivery Order
- ✅ Pencarian berdasarkan:
  - Nomor DO
  - NIM
- ✅ Event handlers: Enter untuk search, Esc untuk clear
- ✅ Menampilkan timeline perjalanan pengiriman
- ✅ Fitur tambah status progress perjalanan dengan waktu otomatis
- ✅ Formatting tanggal (25 Agustus 2025)
- ✅ Formatting currency untuk total harga

### 📝 Pemesanan
- ✅ Form pemesanan DO baru dengan validasi lengkap
- ✅ Auto-generate nomor DO (DO2025-001, DO2025-002, dst)
- ✅ Detail paket muncul otomatis setelah memilih paket
- ✅ Total harga otomatis ter-update dari harga paket
- ✅ Auto-fill tanggal kirim (tanggal hari ini)
- ✅ Formatting tanggal Indonesia
- ✅ Event handler: Enter untuk submit

## Teknologi

- **Vue.js 2.6.14** (CDN)
- **HTML5** dengan Vue Templates
- **CSS3** dengan modern styling
- **Vanilla JavaScript** (ES6+)
- **GitHub Pages** untuk hosting

## Cara Menjalankan

### Opsi 1: Online (GitHub Pages) - **DISARANKAN**
Aplikasi dapat diakses langsung di:
**https://juansah27.github.io/tugas-3-pemrograman-berbasis-web/**

### Opsi 2: Local Server
```bash
# Menggunakan Python
python -m http.server 8000

# Atau menggunakan Node.js
npx http-server -p 8000
```

Lalu buka: `http://localhost:8000`

**⚠️ Penting:** Aplikasi harus dijalankan melalui web server (bukan file://) karena menggunakan fetch untuk load JSON.

## Vue.js Features yang Digunakan

### Directives
- **v-bind** (`:items`, `:upbjj-list`): Pass props ke komponen
- **v-model**: Two-way data binding untuk form inputs
- **v-if / v-else**: Conditional rendering
- **v-show**: Toggle visibility (tab switching)
- **v-for**: Loop untuk render array
- **v-text / {{ }}**: Interpolation data
- **v-html**: Render HTML (untuk catatanHTML)

### Computed Properties
- `filteredKategoriList`: Dependent options (kategori berdasarkan UT-Daerah)
- `filteredItems`: Filter tanpa recompute yang tidak perlu
- `filteredAndSortedItems`: Hasil akhir filter + sort
- `nextDONumber`: Auto-generate nomor DO
- `totalHarga`: Harga dari paket terpilih
- `formattedTanggalKirim`: Format tanggal Indonesia

### Watchers (7 total)
**Root Instance (3):**
- `state.stok`: Monitor perubahan stok untuk low stock alert
- `state.tracking`: Monitor perubahan data tracking
- `tab`: Monitor perubahan tab

**Stock Table (2):**
- `filters.upbjj`: Reset kategori filter
- `items`: Monitor perubahan items

**Order Form (2):**
- `formData.paket`: Update detail paket
- `formData`: Auto-fill tanggal kirim

### Filters
- **currency**: `{{ harga | currency }}` → "Rp 120.000"
- **unit**: `{{ qty | unit('buah') }}` → "28 buah"

### Custom Components
1. `<ba-stock-table>`: Tabel stok dengan filter & CRUD
2. `<do-tracking>`: Tracking delivery order
3. `<order-form>`: Form pemesanan DO baru
4. `<status-badge>`: Badge status dengan warna
5. `<app-modal>`: Modal konfirmasi

### Event Handlers
- **Keyboard Events:**
  - Enter: Submit form (tambah/edit stok, tambah DO, search)
  - Esc: Clear pencarian
- **Mouse Events:**
  - Click: Edit, delete, submit buttons
  - Hover: Tooltip untuk menampilkan catatanHTML

## Kriteria Penilaian

1. ✅ **Arsitektur dan Struktur Proyek Vue.js** (20 Poin)
   - Struktur folder sesuai standar
   - Vue Component dan Template terpisah
   - Naming convention kebab-case

2. ✅ **Data Binding & Directive, Array, dan Filter** (10 Poin)
   - Mustaches, v-text, v-html
   - v-bind, v-model
   - v-for untuk array
   - Filters untuk formatting

3. ✅ **Conditional** (7 Poin)
   - v-if, v-else, v-else-if, v-show
   - Conditional yang efektif

4. ✅ **Property (Computed & Methods)** (10 Poin)
   - Computed properties untuk optimasi
   - Methods untuk operasi

5. ✅ **Watchers** (10 Poin)
   - 7 watcher total (lebih dari minimal 2)

6. ✅ **Formulir input dan Validasi** (20 Poin)
   - Form lengkap dengan validasi
   - Event handler keyboard & mouse
   - Enter untuk submit, Esc untuk clear

7. ✅ **Kreativitas UI/UX** (8 Poin)
   - Interface yang mudah digunakan
   - Pengalaman penggunaan yang nyaman

8. ✅ **Video Penjelasan** (15 Poin)
   - Durasi maksimal 15 menit
   - Sistematika dan alur berpikir jelas

## Screenshots

### Halaman Stok Bahan Ajar
- Filter & Sort dengan dependent options
- Tabel dengan status badge dan tooltip
- Form CRUD operations

### Tracking Delivery Order
- Pencarian dengan Enter/Esc
- Timeline perjalanan
- Tambah status progress

### Pemesanan
- Auto-generate nomor DO
- Detail paket otomatis
- Validasi form lengkap

## Author

**Juan Sah**
- GitHub: [@juansah27](https://github.com/juansah27)

## Mata Kuliah

**STSI4209 - Pemrograman Berbasis Web**  
Universitas Terbuka  
Tugas Praktik 3

## License

This project is for educational purposes only.

---

**Note:** Pastikan untuk menjalankan aplikasi melalui web server (bukan file://) karena menggunakan fetch API untuk load data JSON.
