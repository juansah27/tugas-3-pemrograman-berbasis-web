// Order Form Component
Vue.component('order-form', {
    template: '#tpl-order',
    props: {
        paket: {
            type: Array,
            default: () => []
        },
        ekspedisi: {
            type: Array,
            default: () => []
        },
        tracking: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            formData: {
                nim: '',
                nama: '',
                ekspedisi: '',
                paket: '',
                tanggalKirim: ''
            },
            formErrors: {},
            selectedPaketDetail: null
        };
    },
    computed: {
        // Generate next DO number
        nextDONumber() {
            const currentYear = new Date().getFullYear();
            let maxSeq = 0;
            
            // Find max sequence from existing tracking
            this.tracking.forEach(item => {
                Object.keys(item).forEach(doNumber => {
                    const match = doNumber.match(/DO(\d+)-(\d+)/);
                    if (match) {
                        const year = parseInt(match[1]);
                        const seq = parseInt(match[2]);
                        if (year === currentYear && seq > maxSeq) {
                            maxSeq = seq;
                        }
                    }
                });
            });
            
            const nextSeq = (maxSeq + 1).toString().padStart(3, '0');
            return `DO${currentYear}-${nextSeq}`;
        },
        // Total harga from selected paket
        totalHarga() {
            if (!this.formData.paket || !this.selectedPaketDetail) {
                return 0;
            }
            return this.selectedPaketDetail.harga || 0;
        },
        // Formatted date
        formattedTanggalKirim() {
            if (!this.formData.tanggalKirim) return '';
            return this.formatDate(this.formData.tanggalKirim);
        }
    },
    watch: {
        // Watcher 1: Update paket detail when paket changes
        'formData.paket'(newVal) {
            if (newVal) {
                this.selectedPaketDetail = this.paket.find(p => p.kode === newVal);
            } else {
                this.selectedPaketDetail = null;
            }
        },
        // Watcher 2: Auto-set tanggal kirim if empty
        formData: {
            handler() {
                if (!this.formData.tanggalKirim) {
                    const today = new Date();
                    const year = today.getFullYear();
                    const month = String(today.getMonth() + 1).padStart(2, '0');
                    const day = String(today.getDate()).padStart(2, '0');
                    this.formData.tanggalKirim = `${year}-${month}-${day}`;
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        handleSubmit(event) {
            // Handle Enter key
            if (event && event.type === 'keydown' && event.key !== 'Enter') {
                return;
            }
            
            if (!this.validateForm()) {
                return;
            }
            
            const ekspedisiNama = this.ekspedisi.find(e => e.kode === this.formData.ekspedisi)?.nama || this.formData.ekspedisi;
            
            // Format waktu untuk perjalanan
            const now = new Date();
            const waktuStr = now.toISOString().slice(0, 19).replace('T', ' ');
            
            const doData = {
                [this.nextDONumber]: {
                    nim: this.formData.nim.trim(),
                    nama: this.formData.nama.trim(),
                    status: "Dalam Perjalanan",
                    ekspedisi: ekspedisiNama,
                    tanggalKirim: this.formData.tanggalKirim,
                    paket: this.formData.paket,
                    total: this.totalHarga,
                    perjalanan: [
                        {
                            waktu: waktuStr,
                            keterangan: `Penerimaan di Loket: ${ekspedisiNama}`
                        }
                    ]
                }
            };
            
            this.$emit('created', doData);
            this.resetForm();
        },
        resetForm() {
            this.formData = {
                nim: '',
                nama: '',
                ekspedisi: '',
                paket: '',
                tanggalKirim: ''
            };
            this.formErrors = {};
            this.selectedPaketDetail = null;
        },
        validateForm() {
            this.formErrors = {};
            let isValid = true;
            
            if (!this.formData.nim.trim()) {
                this.formErrors.nim = 'NIM harus diisi';
                isValid = false;
            } else if (!/^\d+$/.test(this.formData.nim.trim())) {
                this.formErrors.nim = 'NIM harus berupa angka';
                isValid = false;
            }
            
            if (!this.formData.nama.trim()) {
                this.formErrors.nama = 'Nama harus diisi';
                isValid = false;
            }
            
            if (!this.formData.ekspedisi) {
                this.formErrors.ekspedisi = 'Ekspedisi harus dipilih';
                isValid = false;
            }
            
            if (!this.formData.paket) {
                this.formErrors.paket = 'Paket harus dipilih';
                isValid = false;
            }
            
            if (!this.formData.tanggalKirim) {
                this.formErrors.tanggalKirim = 'Tanggal kirim harus diisi';
                isValid = false;
            }
            
            return isValid;
        },
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                          'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            const day = date.getDate();
            const month = months[date.getMonth()];
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
        }
    }
});

