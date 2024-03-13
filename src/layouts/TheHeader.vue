<template>
    <header id="header">
        <div class="container">
            <div class="row clearfix">
                <div class="mb_menu" @click="toggleMbMenu" :class="{ active: isMobileMenuShow }">
                    <span class="ir_pm">모바일 메뉴</span>
                </div>
                <div class="header_logo">
                    <router-link class="logo" to="/"><span class="ir_pm">홈페이지 로고</span></router-link>
                </div>
                <div class="header_menu">
                    <ul>
                        <li class="shopping_cart" @click="isCartListShow = true">
                            <router-link to="/"
                                ><span class="ir_pm">장바구니</span
                                ><em class="cart_count">{{ cartCount }}</em></router-link
                            >
                        </li>
                        <li class="Wishlist" @click="isWishListShow = true">
                            <router-link to="/"><span class="ir_pm">찜 목록</span></router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div>
            <Transition name="slide">
                <div v-if="isMobileMenuShow">
                    <TheMobileMenu />
                </div>
            </Transition>
        </div>
    </header>
    <CartListPopup v-model:modalValue="isCartListShow" />
    <WishListPopup v-model:modalValue="isWishListShow" />
</template>

<script setup>
import { ref } from 'vue';
import { useProductStore } from '@/stores/product.js';
import { storeToRefs } from 'pinia';
import CartListPopup from '@/views/popup/cartPopup/CartListPopup.vue';
import WishListPopup from '@/views/popup/wishPopup/WishListPopup.vue';
import TheMobileMenu from './TheMobileMenu.vue';
const isCartListShow = ref(false);
const isWishListShow = ref(false);
const isMobileMenuShow = ref(false);
const store = useProductStore();
const { cartCount } = storeToRefs(store);
/**
 * 모바일 메뉴 토글
 */
function toggleMbMenu() {
    isMobileMenuShow.value = !isMobileMenuShow.value;
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.5s ease;
}
.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

.slide-enter-to,
.slide-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>
