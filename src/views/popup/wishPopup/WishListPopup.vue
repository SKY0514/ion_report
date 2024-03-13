<template>
    <AppModal
        v-model:modalShow="show"
        title="찜목록"
        widthSize="w1200"
        @confirmEvent="$emit('confirmEvent')"
        :isCancleBtn="false"
        :isConrfirmBtn="false"
    >
        <template #content><ProductItem /> </template>
    </AppModal>
</template>
<script setup>
import { computed } from 'vue';
import ProductItem from '@/components/product/ProductItem.vue';
const props = defineProps({
    modalValue: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modalValue', 'cancleEvent', 'confirmEvent']);
const show = computed({
    get() {
        return props.modalValue;
    },
    set(value) {
        emit('update:modalValue', value);
    },
});
</script>
<style></style>
