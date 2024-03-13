import AppModal from '@/components/app/AppModal.vue';
import AppDialog from '@/components/app/AppDialog.vue';
export default {
    install(app) {
        app.component('AppDialog', AppDialog);
        app.component('AppModal', AppModal);
    },
};
