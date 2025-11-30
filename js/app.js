// Root Vue Instance
const app = new Vue({
    el: '#app',
    data: {
        tab: 'stok',
        dataLoaded: false,
        state: {
            upbjjList: [],
            kategoriList: [],
            pengirimanList: [],
            paket: [],
            stok: [],
            tracking: []
        }
    },
    async mounted() {
        try {
            console.log('Starting to load data...');
            const data = await API.fetchData();
            console.log('Data loaded:', data);
            
            this.state = {
                upbjjList: data.upbjjList || [],
                kategoriList: data.kategoriList || [],
                pengirimanList: data.pengirimanList || [],
                paket: data.paket || [],
                stok: data.stok || [],
                tracking: data.tracking || []
            };
            
            // Ensure reactivity
            this.$set(this.state, 'stok', data.stok || []);
            this.$set(this.state, 'upbjjList', data.upbjjList || []);
            this.$set(this.state, 'kategoriList', data.kategoriList || []);
            this.$set(this.state, 'pengirimanList', data.pengirimanList || []);
            this.$set(this.state, 'paket', data.paket || []);
            this.$set(this.state, 'tracking', data.tracking || []);
            
            this.dataLoaded = true;
        } catch (error) {
            console.error('Error loading data:', error);
            alert('Gagal memuat data. Pastikan file dataBahanAjar.json tersedia.\n\nError: ' + error.message + '\n\nPastikan Anda membuka aplikasi melalui web server (bukan file://) atau gunakan live server.');
            this.dataLoaded = true; // Still show UI even if data fails
        }
    },
    watch: {
        // Watcher 1: Monitor stock changes for low stock alerts
        'state.stok': {
            handler(newStok) {
                const lowStock = newStok.filter(item => item.qty < item.safety && item.qty > 0);
                const emptyStock = newStok.filter(item => item.qty === 0);
                
                if (lowStock.length > 0 || emptyStock.length > 0) {
                    console.log('Low stock alert:', { lowStock: lowStock.length, emptyStock: emptyStock.length });
                }
            },
            deep: true
        },
        // Watcher 2: Monitor tracking changes
        'state.tracking': {
            handler(newTracking) {
                console.log('Tracking data updated:', newTracking.length, 'DO entries');
            },
            deep: true
        },
        // Watcher 3: Tab changes
        tab(newTab) {
            console.log('Tab changed to:', newTab);
        }
    },
    methods: {
        handleStockUpdate(payload) {
            if (payload.action === 'add') {
                this.state.stok.push(payload.item);
            } else if (payload.action === 'update') {
                Vue.set(this.state.stok, payload.index, payload.item);
            } else if (payload.action === 'delete') {
                this.state.stok.splice(payload.index, 1);
            }
        },
        handleNewDO(doData) {
            // Check if DO already exists (update) or new (add)
            const doNumber = Object.keys(doData)[0];
            const existingIndex = this.state.tracking.findIndex(item => 
                Object.keys(item)[0] === doNumber
            );
            
            if (existingIndex >= 0) {
                // Update existing
                Vue.set(this.state.tracking, existingIndex, doData);
            } else {
                // Add new
                this.state.tracking.push(doData);
            }
            
            // Force reactivity update
            this.$forceUpdate();
        },
        handleAddProgress(doNumber) {
            // Find the DO and add progress
            const doIndex = this.state.tracking.findIndex(item => 
                Object.keys(item)[0] === doNumber
            );
            
            if (doIndex >= 0) {
                const doData = this.state.tracking[doIndex];
                const doKey = Object.keys(doData)[0];
                const now = new Date();
                const waktuStr = now.toISOString().slice(0, 19).replace('T', ' ');
                
                const keterangan = prompt('Masukkan keterangan perjalanan:');
                if (keterangan) {
                    if (!doData[doKey].perjalanan) {
                        doData[doKey].perjalanan = [];
                    }
                    doData[doKey].perjalanan.push({
                        waktu: waktuStr,
                        keterangan: keterangan
                    });
                    
                    Vue.set(this.state.tracking, doIndex, doData);
                }
            }
        }
    },
    filters: {
        currency(value) {
            if (!value) return 'Rp 0';
            return 'Rp ' + value.toLocaleString('id-ID');
        },
        unit(value, unit) {
            return value + ' ' + unit;
        }
    }
});
