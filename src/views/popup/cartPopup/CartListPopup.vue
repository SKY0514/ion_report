<template>
    <AppModal
        v-model:modalShow="show"
        title="장바구니"
        cancleMessage="닫기"
        confirmMessage="결제하기"
        widthSize="w1200"
        @confirmEvent="$emit('confirmEvent')"
    >
        <template #content><ProductItem :isCartList="true" /></template>
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
