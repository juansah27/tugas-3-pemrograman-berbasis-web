// Stock Table Component
Vue.component('ba-stock-table', {
    template: '#tpl-stock',
    props: {
        items: {
            type: Array,
            default: () => []
        },
        upbjjList: {
            type: Array,
            default: () => []
        },
        kategoriList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            showAddForm: false,
            editingItem: null,
            editingIndex: -1,
            filters: {
                upbjj: '',
                kategori: '',
                statusFilter: 'all'
            },
            sortBy: 'judul',
            newItem: {
                kode: '',
                judul: '',
                kategori: '',
                upbjj: '',
                lokasiRak: '',
                harga: 0,
                qty: 0,
                safety: 0,
                catatanHTML: ''
            },
            hoveredItem: null,
            hoveredItemIndex: -1
        };
    },
    computed: {
        // Dependent options: kategori hanya muncul setelah upbjj dipilih
        filteredKategoriList() {
            if (!this.filters.upbjj || !this.items || this.items.length === 0) {
                return [];
            }
            // Get unique categories from filtered items by upbjj
            const filtered = this.items.filter(item => item.upbjj === this.filters.upbjj);
            const categories = [...new Set(filtered.map(item => item.kategori))];
            return categories;
        },
        // Filter items - tidak perlu recompute jika filter tidak berubah
        filteredItems() {
            if (!this.items || this.items.length === 0) {
                return [];
            }
            let result = [...this.items];
            
            // Filter by upbjj
            if (this.filters.upbjj) {
                result = result.filter(item => item.upbjj === this.filters.upbjj);
            }
            
            // Filter by kategori (only if upbjj is selected)
            if (this.filters.kategori && this.filters.upbjj) {
                result = result.filter(item => item.kategori === this.filters.kategori);
            }
            
            // Filter by status
            if (this.filters.statusFilter === 'low') {
                result = result.filter(item => item.qty < item.safety && item.qty > 0);
            } else if (this.filters.statusFilter === 'empty') {
                result = result.filter(item => item.qty === 0);
            }
            
            return result;
        },
        // Sort items
        filteredAndSortedItems() {
            const result = [...this.filteredItems];
            
            // Sort
            result.sort((a, b) => {
                if (this.sortBy === 'judul') {
                    return a.judul.localeCompare(b.judul);
                } else if (this.sortBy === 'qty') {
                    return b.qty - a.qty;
                } else if (this.sortBy === 'harga') {
                    return a.harga - b.harga;
                }
                return 0;
            });
            
            return result;
        }
    },
    watch: {
        // Watcher 1: Reset kategori filter when upbjj changes
        'filters.upbjj'(newVal) {
            if (!newVal) {
                this.filters.kategori = '';
            }
        },
        // Watcher 2: Monitor items changes
        items: {
            handler() {
                // Reset edit mode if item was deleted
                if (this.editingIndex >= 0) {
                    const item = this.items[this.editingIndex];
                    if (!item) {
                        this.cancelEdit();
                    }
                }
            },
            deep: true
        }
    },
    methods: {
        onFilterChange() {
            // Reset kategori filter if upbjj is cleared
            if (!this.filters.upbjj) {
                this.filters.kategori = '';
            }
        },
        resetFilters() {
            this.filters = {
                upbjj: '',
                kategori: '',
                statusFilter: 'all'
            };
            this.sortBy = 'judul';
        },
        resetAddForm() {
            this.newItem = {
                kode: '',
                judul: '',
                kategori: '',
                upbjj: '',
                lokasiRak: '',
                harga: 0,
                qty: 0,
                safety: 0,
                catatanHTML: ''
            };
            this.showAddForm = false;
            this.editingItem = null;
            this.editingIndex = -1;
        },
        handleAddSubmit(event) {
            // Handle Enter key
            if (event && event.type === 'keydown' && event.key !== 'Enter') {
                return;
            }
            
            // Validation
            if (!this.validateItem(this.newItem)) {
                return;
            }
            
            // Emit event to parent
            this.$emit('updated', {
                action: 'add',
                item: { ...this.newItem }
            });
            
            this.resetAddForm();
        },
        editItem(item, index) {
            // Find original index in items array
            const originalIndex = this.items.findIndex(i => i.kode === item.kode);
            this.editingItem = { ...item };
            this.editingIndex = originalIndex;
            this.showAddForm = true;
        },
        cancelEdit() {
            this.editingItem = null;
            this.editingIndex = -1;
            if (!this.newItem.kode) {
                this.showAddForm = false;
            }
        },
        handleUpdateSubmit(event) {
            // Handle Enter key
            if (event && event.type === 'keydown' && event.key !== 'Enter') {
                return;
            }
            
            if (!this.validateItem(this.editingItem)) {
                return;
            }
            
            this.$emit('updated', {
                action: 'update',
                index: this.editingIndex,
                item: { ...this.editingItem }
            });
            
            this.cancelEdit();
            this.resetAddForm();
        },
        confirmDelete(item, index) {
            // Find original index
            const originalIndex = this.items.findIndex(i => i.kode === item.kode);
            this.$parent.$refs.modal.showModal(
                'Konfirmasi Hapus',
                `Apakah Anda yakin ingin menghapus bahan ajar "${item.judul}"?`,
                () => {
                    this.$emit('updated', {
                        action: 'delete',
                        index: originalIndex
                    });
                }
            );
        },
        validateItem(item) {
            if (!item.kode || !item.judul || !item.kategori || !item.upbjj || !item.lokasiRak) {
                alert('Mohon lengkapi semua field yang wajib diisi!');
                return false;
            }
            if (item.harga < 0 || item.qty < 0 || item.safety < 0) {
                alert('Harga, jumlah stok, dan safety stock tidak boleh negatif!');
                return false;
            }
            return true;
        },
        getStatus(item) {
            if (item.qty === 0) {
                return { text: 'Kosong', class: 'status-kosong', icon: '🔴' };
            } else if (item.qty < item.safety) {
                return { text: 'Menipis', class: 'status-menipis', icon: '⚠️' };
            } else {
                return { text: 'Aman', class: 'status-aman', icon: '✅' };
            }
        },
        showTooltip(item, index) {
            this.hoveredItem = item;
            this.hoveredItemIndex = index;
        },
        hideTooltip() {
            this.hoveredItem = null;
            this.hoveredItemIndex = -1;
        }
    }
});

// Register filters globally
Vue.filter('currency', function(value) {
    if (!value) return 'Rp 0';
    return 'Rp ' + value.toLocaleString('id-ID');
});

Vue.filter('unit', function(value, unit) {
    return value + ' ' + unit;
});
