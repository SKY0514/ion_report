<template>
    <AppModal
        v-model:modalShow="show"
        title="장바구니 추가"
        cancleMessage="장바구니 더 보기"
        confirmMessage="쇼핑 더 하기"
        @cancleEvent="$emit('cancleEvent')"
        @confirmEvent="$emit('confirmEvent')"
    >
        <template #content>
            <div class="row">
                <p class="notice_p">장바구니에 정상적으로 추가되었습니다.</p>
            </div>
        </template>
    </AppModal>
</template>
<script setup>
import { computed } from 'vue';
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
<style>
.notice_p {
    font-size: 18px;
    font-weight: 500;
}
/* 화면 너비 0 ~ 480px */
@media (max-width: 480px) {
    .notice_p {
        font-size: 16px;
    }
}
@media (max-width: 480px) {
    .notice_p {
        text-align: center;
    }
}
</style>
