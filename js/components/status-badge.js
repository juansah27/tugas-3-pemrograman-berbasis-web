// Status Badge Component
Vue.component('status-badge', {
    template: '#tpl-badge',
    props: {
        status: {
            type: String,
            required: true
        },
        qty: {
            type: Number,
            default: 0
        },
        safety: {
            type: Number,
            default: 0
        }
    },
    computed: {
        statusInfo() {
            if (this.status) {
                // If status is directly provided
                return this.getStatusFromString(this.status);
            } else {
                // Calculate status from qty and safety
                if (this.qty === 0) {
                    return { text: 'Kosong', class: 'status-kosong', icon: '🔴' };
                } else if (this.qty < this.safety) {
                    return { text: 'Menipis', class: 'status-menipis', icon: '⚠️' };
                } else {
                    return { text: 'Aman', class: 'status-aman', icon: '✅' };
                }
            }
        }
    },
    methods: {
        getStatusFromString(status) {
            const statusMap = {
                'Aman': { text: 'Aman', class: 'status-aman', icon: '✅' },
                'Menipis': { text: 'Menipis', class: 'status-menipis', icon: '⚠️' },
                'Kosong': { text: 'Kosong', class: 'status-kosong', icon: '🔴' },
                'Selesai': { text: 'Selesai', class: 'status-aman', icon: '✅' },
                'Dalam Perjalanan': { text: 'Dalam Perjalanan', class: 'status-menipis', icon: '🚚' },
                'Gagal': { text: 'Gagal', class: 'status-kosong', icon: '❌' }
            };
            return statusMap[status] || { text: status, class: 'status-aman', icon: 'ℹ️' };
        }
    }
});

