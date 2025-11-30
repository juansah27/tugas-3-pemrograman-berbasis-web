// DO Tracking Component
Vue.component('do-tracking', {
    template: '#tpl-tracking',
    props: {
        data: {
            type: Array,
            default: () => []
        },
        paket: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            searchQuery: '',
            searchType: 'do', // 'do' or 'nim'
            selectedDO: null
        };
    },
    computed: {
        // Convert tracking data array to flat list
        trackingList() {
            const list = [];
            this.data.forEach(item => {
                Object.keys(item).forEach(doNumber => {
                    list.push({
                        noDO: doNumber,
                        ...item[doNumber]
                    });
                });
            });
            return list.reverse(); // Terbaru di atas
        },
        // Filtered tracking list based on search
        filteredTrackingList() {
            if (!this.searchQuery.trim()) {
                return this.trackingList;
            }
            
            const query = this.searchQuery.toLowerCase().trim();
            return this.trackingList.filter(item => {
                if (this.searchType === 'do') {
                    return item.noDO.toLowerCase().includes(query);
                } else {
                    return item.nim && item.nim.toString().includes(query);
                }
            });
        }
    },
    watch: {
        // Watcher: Clear search on type change
        searchType() {
            this.searchQuery = '';
        }
    },
    methods: {
        handleSearch(event) {
            // Handle Enter key
            if (event && event.key === 'Enter') {
                // Search is already reactive, no need to do anything
                return;
            }
        },
        handleClear(event) {
            // Handle Esc key
            if (event && event.key === 'Escape') {
                this.searchQuery = '';
            }
        },
        getPaketDetail(kodePaket) {
            return this.paket.find(p => p.kode === kodePaket);
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
        },
        addProgress(doNumber) {
            // Emit to parent to handle progress addition
            this.$emit('add-progress', doNumber);
        }
    }
});

