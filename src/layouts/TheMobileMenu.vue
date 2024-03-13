<template>
    <div id="nav">
        <div class="row">
            <ul>
                <li @click="isCartListShow = true">장바구니</li>
                <li @click="isWishListShow = true">찜목록</li>
            </ul>
        </div>
    </div>
    <CartListPopup v-model:modalValue="isCartListShow" />
    <WishListPopup v-model:modalValue="isWishListShow" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import CartListPopup from '@/views/popup/cartPopup/CartListPopup.vue';
import WishListPopup from '@/views/popup/wishPopup/WishListPopup.vue';
const isCartListShow = ref(false);
const isWishListShow = ref(false);

onMounted(() => {
    document.body.classList.add('stop-scrolling');
});

onBeforeUnmount(() => {
    document.body.classList.remove('stop-scrolling');
});
</script>

<style scoped>
#nav {
    position: absolute;
    width: 100%;
    height: 100vh;
    background: #fff;
    top: auto;
    left: 0;
}
#nav .row ul {
    padding: 15px;
}
#nav .row ul li {
    font-weight: 500;
    font-size: 18px;
    padding: 8px;
    position: relative;
    cursor: pointer;
}
#nav .row ul li::after {
    content: '';
    width: 18px;
    height: 18px;
    background: url('/src/assets/image/right_arrow.png');
    background-image: -webkit-image-set(
        url('/src/assets/image/right_arrow.png') 1x,
        url('/src/assets/image/right_arrow@2.png') 2x
    );
    position: absolute;
    top: 12px;
    right: 0px;
}
</style>
