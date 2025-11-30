# Outline Presentasi Tugas Praktik 3 - SITTA

## Slide 1: Pendahuluan
- Aplikasi SITTA (Sistem Informasi Tiras dan Transaksi Bahan Ajar)
- Single-page application dengan Vue.js
- 3 halaman: Stok, Tracking DO, Pemesanan

## Slide 2: Struktur Proyek
```
tugas3-vue-ut/
├── index.html (root, mount #app)
├── js/
│   ├── app.js (root Vue instance)
│   ├── services/
│   │   └── api.js (fetch JSON)
│   └── components/
│       ├── stock-table.js
│       ├── do-tracking.js
│       ├── order-form.js
│       ├── status-badge.js
│       └── app-modal.js
├── css/style.css
└── dataBahanAjar.json
```

## Slide 3: Komponen Vue
- **ba-stock-table**: Tabel stok dengan filter & CRUD
- **do-tracking**: Tracking delivery order
- **order-form**: Form pemesanan DO baru
- **status-badge**: Badge status (Aman/Menipis/Kosong)
- **app-modal**: Modal konfirmasi

## Slide 4: Data Binding & Directives
- **v-bind**: Pass props ke komponen (`:items`, `:upbjj-list`)
- **v-model**: Two-way binding (form inputs, select)
- **v-if/v-else**: Conditional rendering
- **v-show**: Toggle visibility (tab switching)
- **v-for**: Loop array (stok, tracking, options)
- **v-text / {{ }}**: Interpolation data

## Slide 5: Computed Properties
- `filteredKategoriList`: Dependent options
- `filteredItems`: Filter tanpa recompute
- `filteredAndSortedItems`: Filter + sort
- `nextDONumber`: Auto-generate nomor DO
- `totalHarga`: Harga dari paket terpilih

## Slide 6: Watchers (7 total)
**Root Instance (3):**
- `state.stok` → Low stock alert
- `state.tracking` → Log updates
- `tab` → Log tab changes

**Stock Table (2):**
- `filters.upbjj` → Reset kategori
- `items` → Monitor changes

**Order Form (2):**
- `formData.paket` → Update detail paket
- `formData` → Auto-fill tanggal

## Slide 7: Filters
- **currency**: `{{ harga | currency }}` → "Rp 120.000"
- **unit**: `{{ qty | unit('buah') }}` → "28 buah"

## Slide 8: Halaman Stok - Filter & Sort
- Filter UT-Daerah → Kategori muncul (dependent options)
- Filter Status (Aman/Menipis/Kosong)
- Sort (Judul/Stok/Harga)
- Reset filter

## Slide 9: Halaman Stok - CRUD
- **Create**: Form tambah, validasi, Enter submit
- **Read**: Tabel dengan formatting
- **Update**: Edit dengan form, Enter submit
- **Delete**: Konfirmasi modal

## Slide 10: Event Handlers
- **Enter**: Submit form (tambah/edit stok, DO, search)
- **Esc**: Clear pencarian
- **Hover**: Tooltip catatanHTML
- **Click**: Edit, delete, buttons

## Slide 11: Tracking DO
- Pencarian (DO/NIM) dengan Enter/Esc
- Timeline perjalanan
- Tambah status perjalanan
- Format tanggal Indonesia

## Slide 12: Pemesanan
- Auto-generate nomor DO (DO2025-001, dst)
- Validasi form lengkap
- Detail paket muncul otomatis
- Total harga auto-update
- Enter untuk submit

## Slide 13: Validasi
- Field wajib (kode, judul, kategori, dll)
- Format NIM (harus angka)
- Nilai tidak negatif
- Error message per field

## Slide 14: Kesimpulan
✅ Struktur proyek sesuai standar
✅ 5 komponen Vue + templates
✅ Directives (v-bind, v-model, v-if, v-show, v-for)
✅ 7 watcher
✅ Computed properties
✅ Filters (currency, unit)
✅ Event handlers (keyboard & mouse)
✅ CRUD lengkap
✅ Filter & sort dengan dependent options

---

**Tips Presentasi:**
- Demo langsung di browser untuk setiap fitur
- Tunjukkan console untuk watchers
- Highlight dependent options saat demo filter
- Tunjukkan event handlers dengan keyboard
- Jelaskan computed properties untuk optimasi

