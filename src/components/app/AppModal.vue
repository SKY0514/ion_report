<template>
    <div v-if="modalShow">
        <div class="modal-bim fade show"></div>

        <!-- Modal -->
        <div
            class="modal fade show d-block"
            :class="widthSize"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content clearfix">
                    <div class="modal-header">
                        <slot name="header">
                            <h1 class="modal-title">{{ title }}</h1>

                            <button type="button" class="btn-close" @click="$emit('update:modalShow', false)"></button>
                        </slot>
                    </div>
                    <div class="modal-body"><slot name="content"></slot></div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            v-if="isCancleBtn"
                            class="btn btn-cancle"
                            data-bs-dismiss="modal"
                            @click="onClickClose"
                        >
                            {{ cancleMessage }}
                        </button>
                        <button
                            type="button"
                            v-if="isConrfirmBtn"
                            class="btn btn-confirm"
                            data-bs-dismiss="modal"
                            @click="onClickConfirm"
                        >
                            {{ confirmMessage }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { watch } from 'vue';

const props = defineProps({
    modalShow: { type: Boolean, default: false },
    title: { type: String, default: '' },
    widthSize: { type: String, default: 'w684' },
    cancleMessage: { type: String, default: '취소' },
    confirmMessage: { type: String, default: '확인' },
    isCancleBtn: { type: Boolean, default: true },
    isConrfirmBtn: { type: Boolean, default: true },
});

const emit = defineEmits(['close', 'update:modalShow', 'cancleEvent', 'confirmEvent']);

function onClickClose() {
    emit('cancleEvent');

    emit('update:modalShow', false);
}

function onClickConfirm() {
    emit('confirmEvent');
}
watch(
    () => props.modalShow,
    (newv) => {
        if (newv) {
            document.body.classList.add('stop-scrolling');
        } else {
            document.body.classList.remove('stop-scrolling');
        }
    }
);
</script>

<style scoped>
@import '/src/assets/css/modal.css';
</style>
