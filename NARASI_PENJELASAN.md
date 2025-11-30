# Narasi Penjelasan Pengerjaan Tugas Praktik 3 - SITTA

## 1. Pendahuluan (30 detik)

Halo, pada video ini saya akan menjelaskan pengerjaan Tugas Praktik 3 untuk membuat aplikasi Sistem Informasi Tiras dan Transaksi Bahan Ajar (SITTA) menggunakan Vue.js. Aplikasi ini merupakan single-page application yang terdiri dari tiga halaman utama: Stok Bahan Ajar, Tracking Delivery Order, dan Pemesanan.

## 2. Struktur Proyek (1 menit)

Struktur proyek mengikuti standar yang diminta dalam tugas:
- **index.html** sebagai root file dengan mount point `#app`
- **js/services/api.js** untuk menangani fetch data dari JSON
- **js/components/** berisi 5 komponen Vue:
  - `stock-table.js` untuk komponen `<ba-stock-table>`
  - `do-tracking.js` untuk komponen `<do-tracking>`
  - `order-form.js` untuk komponen `<order-form>`
  - `status-badge.js` untuk komponen `<status-badge>`
  - `app-modal.js` untuk komponen `<app-modal>`
- **js/app.js** sebagai root Vue instance
- **css/style.css** untuk styling global
- **dataBahanAjar.json** sebagai sumber data

Semua komponen menggunakan naming convention kebab-case dan template terpisah di index.html dengan ID `tpl-*`.

## 3. Arsitektur Vue.js (1.5 menit)

### Root Instance (app.js)
Root instance menggunakan:
- **Data binding**: `v-bind` untuk props, `v-model` untuk two-way binding
- **Conditional rendering**: `v-show` untuk menampilkan/menyembunyikan section berdasarkan tab aktif
- **Watchers**: 3 watcher untuk memantau perubahan:
  1. `state.stok` - memantau perubahan stok untuk alert low stock
  2. `state.tracking` - memantau perubahan data tracking
  3. `tab` - memantau perubahan tab untuk logging

### Komponen Stock Table
Menggunakan:
- **Computed properties**: 
  - `filteredKategoriList` - dependent options (kategori muncul setelah UT-Daerah dipilih)
  - `filteredItems` - filter tanpa recompute yang tidak perlu
  - `filteredAndSortedItems` - hasil akhir yang sudah difilter dan diurutkan
- **Watchers**: 2 watcher untuk reset kategori filter dan monitor perubahan items
- **Methods**: CRUD operations, validasi, event handlers
- **Filters**: `currency` dan `unit` untuk formatting

## 4. Fitur Halaman Stok Bahan Ajar (2 menit)

### Filter dan Sort
- Filter berdasarkan UT-Daerah dengan **dependent options** - kategori hanya muncul setelah UT-Daerah dipilih
- Filter berdasarkan Status Stok (Aman/Menipis/Kosong)
- Sort berdasarkan Judul, Jumlah Stok, atau Harga
- Semua filter menggunakan computed properties untuk menghindari recompute yang tidak perlu

### CRUD Operations
- **Create**: Form tambah stok baru dengan validasi semua field wajib
- **Read**: Tampilan tabel dengan formatting currency dan unit
- **Update**: Edit stok dengan form yang sama, trigger dengan tombol Edit
- **Delete**: Hapus dengan konfirmasi modal sebelum menghapus

### Event Handlers
- **Enter key**: Submit form langsung saat tekan Enter
- **Mouse hover**: Tooltip menampilkan catatanHTML saat hover pada kolom Status

### Status Badge
Menggunakan komponen `<status-badge>` dengan:
- Status "Aman" (hijau) jika qty >= safety
- Status "Menipis" (orange) jika qty < safety dan qty > 0
- Status "Kosong" (merah) jika qty = 0

## 5. Fitur Tracking Delivery Order (1.5 menit)

### Pencarian
- Pencarian berdasarkan Nomor DO atau NIM
- **Enter key**: Submit pencarian
- **Esc key**: Clear/reset pencarian
- Menggunakan computed property `filteredTrackingList` untuk hasil pencarian

### Timeline Perjalanan
- Menampilkan riwayat perjalanan dengan format timeline
- Fitur tambah status perjalanan baru dengan waktu otomatis dari local time

### Formatting
- Format tanggal menggunakan method `formatDate` dengan format "25 Agustus 2025"
- Format currency untuk total harga

## 6. Fitur Pemesanan (1.5 menit)

### Form Pemesanan DO
- **Auto-generate Nomor DO**: Format DO2025-001, DO2025-002, dst berdasarkan tahun dan sequence number
- **Validasi**: Validasi semua field wajib termasuk format NIM (harus angka)
- **Enter key**: Submit form langsung saat tekan Enter

### Dependent Display
- Setelah memilih paket, detail paket muncul otomatis (kode, isi, harga)
- Total harga otomatis ter-update dari harga paket yang dipilih
- Menggunakan watcher untuk update detail paket saat paket berubah

### Auto-fill
- Tanggal kirim otomatis terisi dengan tanggal hari ini jika kosong
- Format tanggal ditampilkan dalam format Indonesia

## 7. Penggunaan Vue.js Features (2 menit)

### Data Binding
- **v-bind**: Menggunakan `:items`, `:upbjj-list` untuk pass props ke komponen
- **v-model**: Two-way binding untuk form inputs dan select dropdowns
- **v-text / {{ }}**: Interpolation untuk menampilkan data

### Conditional Rendering
- **v-if / v-else**: Conditional rendering untuk empty state
- **v-show**: Menampilkan/menyembunyikan section berdasarkan tab aktif
- **v-for**: Loop untuk render array (stok items, tracking list, options)

### Computed Properties
Digunakan untuk:
- Filter dan sort tanpa recompute yang tidak perlu
- Dependent options (kategori berdasarkan UT-Daerah)
- Formatting data (total harga, nomor DO)

### Watchers
Total 7 watcher di seluruh aplikasi:
- 3 di root instance (stok, tracking, tab)
- 2 di stock-table (upbjj filter, items changes)
- 2 di order-form (paket selection, auto-fill tanggal)

### Filters
- `currency`: Format angka menjadi "Rp 120.000"
- `unit`: Format dengan satuan "28 buah"

### Custom Components
5 komponen Vue yang dibuat:
1. `<ba-stock-table>` - Tabel stok dengan filter dan CRUD
2. `<do-tracking>` - Tracking delivery order
3. `<order-form>` - Form pemesanan DO baru
4. `<status-badge>` - Badge status dengan warna
5. `<app-modal>` - Modal konfirmasi

## 8. Event Handling (1 menit)

### Keyboard Events
- **Enter**: Submit form (tambah/edit stok, tambah DO, search)
- **Esc**: Clear pencarian di tracking

### Mouse Events
- **Click**: Edit, delete, submit buttons
- **Hover**: Tooltip untuk menampilkan catatanHTML

### Form Events
- **@submit.prevent**: Prevent default form submission
- **@keydown.enter**: Handle Enter key untuk submit

## 9. Validasi dan Error Handling (1 menit)

### Validasi Form
- Validasi field wajib (kode, judul, kategori, UT-Daerah, lokasi rak, harga)
- Validasi format NIM (harus angka)
- Validasi nilai negatif (harga, qty, safety tidak boleh negatif)
- Error message ditampilkan di bawah field yang error

### Error Handling
- Try-catch untuk fetch data JSON
- Fallback paths jika file tidak ditemukan
- Alert untuk error yang tidak bisa di-handle

## 10. Kesimpulan (30 detik)

Aplikasi SITTA telah berhasil diimplementasikan dengan:
- ✅ Struktur proyek sesuai standar
- ✅ 5 komponen Vue dengan template terpisah
- ✅ Penggunaan directives (v-bind, v-model, v-if, v-show, v-for)
- ✅ Computed properties untuk optimasi
- ✅ 7 watcher untuk monitoring perubahan
- ✅ Filters untuk formatting data
- ✅ Event handlers (keyboard dan mouse)
- ✅ Validasi form
- ✅ CRUD operations lengkap
- ✅ Filter dan sort dengan dependent options

Terima kasih, semoga penjelasan ini membantu memahami implementasi Vue.js dalam aplikasi SITTA.

---

**Total Durasi Estimasi: 12-13 menit**

