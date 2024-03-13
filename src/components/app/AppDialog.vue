<template>
    <div class="app_dialog">
        <p>
            {{ message }}
        </p>
    </div>
</template>

<script setup>
const props = defineProps({
    message: {
        type: String,
        defualt: '저장 되었습니다.',
    },
});
</script>

<style scoped>
.app_dialog {
    padding: 20px;
    width: 300px;
    height: 100px;
    border: 1px solid #37b24d;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
}
.app_dialog p {
    line-height: 100px;

    font-size: 20px;
    font-weight: 500;
    text-align: center;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@media (max-width: 600px) {
    .app_dialog {
        width: 60%;
        height: 80px;
    }
    .app_dialog p {
        line-height: 80px;
    }
}

@media (max-width: 480px) {
    .app_dialog {
        padding: 10px;

        width: 40%;
        height: 50px;
    }
    .app_dialog p {
        font-size: 16px;
        line-height: 50px;
    }
}

/* .slide-enter-active,
.slide-leave-active {
    transition: all 0.5s ease;
}
.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}

.v-enter-to,
.v-leave-from {
    opacity: 1;
    transform: translateY(0);
}  */
</style>
