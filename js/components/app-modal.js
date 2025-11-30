// Modal Component
Vue.component('app-modal', {
    template: '#tpl-modal',
    data() {
        return {
            show: false,
            title: '',
            message: '',
            onConfirm: null
        };
    },
    methods: {
        showModal(title, message, onConfirm) {
            this.title = title;
            this.message = message;
            this.onConfirm = onConfirm;
            this.show = true;
        },
        hide() {
            this.show = false;
            this.title = '';
            this.message = '';
            this.onConfirm = null;
        },
        confirm() {
            if (this.onConfirm) {
                this.onConfirm();
            }
            this.hide();
        }
    }
});

