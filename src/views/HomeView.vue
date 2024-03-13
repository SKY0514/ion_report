<template>
    <!-- slide_section -->
    <section id="slide_section">
        <!-- ban_slide -->
        <div class="ban_slide">
            <h2 class="ir_su">배너 영역</h2>
            <swiper
                :loop="true"
                :navigation="true"
                :modules="modules"
                class="slide"
                :pagination="true"
                :autoplay="banner_autoplay"
            >
                <swiper-slide class="slide_cont1">
                    <div class="container">
                        <div class="row">
                            <div class="ban_contents">
                                <h2 class="ban_title">METAPLANTS</h2>
                                <p class="ban_desc">
                                    고품질의 식물과 전문가의 조언을 제공하여 고객들에게 만족스러운 쇼핑 경험을 선사하는
                                    메타플랜츠는 식물은 건강하고 아름답게 자란다는 것을 보장하며, 실내 및 실외에서 모두
                                    훌륭하게 성장합니다. 우리의 목표는 고객들이 집안에 자연의 아름다움을 느낄 수 있도록
                                    돕는 것입니다.
                                    <em>METAPLANTS에서 멋진 식물을 찾아보세요!</em>
                                </p>
                                <div class="ban_btn">
                                    <button @click="goToBannerUrl(0)">더 알아보기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="slide_cont2">
                    <div class="container">
                        <div class="row">
                            <div class="ban_contents">
                                <h2 class="ban_title">인테리어 초보가 주목해야 할 식물 인테리어 트렌드</h2>
                                <p class="ban_desc">
                                    자연을 가까이하고 싶은 현대인에게 꼭 필요한 식물은 인테리어 아이템으로도 사랑받고
                                    있다.
                                    <em>요즘 식물 인테리어는 어떤 것이 있을까?</em>
                                </p>
                                <div class="ban_btn">
                                    <button @click="goToBannerUrl(1)">기사 보러가기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide class="slide_cont3">
                    <div class="container">
                        <div class="row">
                            <div class="ban_contents">
                                <h2 class="ban_title">METAPLANTS</h2>
                                <p class="ban_desc">
                                    메타플랜츠 더 알아보기
                                    <em>METAPLANTS에서 멋진 식물을 찾아보세요!</em>
                                </p>
                                <div class="ban_btn">
                                    <button @click="goToBannerUrl(2)">더 알아보기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        <!-- ban_slide /-->
        <!-- notice -->
        <div class="notice">
            <h2 class="ir_su">공지사항 미리보기 영역</h2>

            <div class="container">
                <div class="row">
                    <div class="notice_list">
                        <swiper
                            :direction="'vertical'"
                            :modules="noticemodules"
                            class="no_slide"
                            :pagination="{
                                clickable: false,
                            }"
                            :allowTouchMove="false"
                            :autoplay="notice_autoplay"
                        >
                            <swiper-slide v-for="(list, idx) in noticeList" :key="idx"
                                ><h3>
                                    <router-link to="/" class="clearfix">
                                        <span class="category">[{{ list.category }}]</span>
                                        <span class="label">{{ list.label }}</span>
                                        <span class="date">{{ dateformat(list.date) }}</span>
                                    </router-link>
                                </h3></swiper-slide
                            >
                        </swiper>
                    </div>
                </div>
            </div>
        </div>
        <!-- /notice -->
    </section>

    <!-- slide_section /-->
    <!-- contents_setction -->
    <section id="contents_setction">
        <h2 class="ir_su">상품 리스트 영역</h2>
        <div class="container">
            <div class="row">
                <h3>PROUDUCT LIST</h3>
                <div class="product_cont clearfix">
                    <article v-for="list in productList" :key="list.id">
                        <figure>
                            <div class="product_img">
                                <router-link to="/">
                                    <img :src="list.image" :alt="`${list.label} 상품`" />
                                </router-link>
                                <div class="prod_over">
                                    <p class="add_cart" @click="onClickAddProduct(list)">
                                        <span><em class="ir_pm">장바구니 담기</em></span>
                                    </p>

                                    <p class="add_wish" @click="onClickWish(list)">
                                        <span :class="list.isWish ? 'wished_icon' : ''"
                                            ><em class="ir_pm">찜하기</em></span
                                        >
                                    </p>
                                </div>
                            </div>

                            <figcaption class="product_info">
                                <h4>{{ list.label }}</h4>
                                <p>{{ formatPrice(list.price) }}원</p>
                            </figcaption>
                        </figure>
                    </article>
                </div>
            </div>
        </div>
    </section>

    <!-- contents_setction -->
    <!-- footer -->
    <TheFooter />
    <!-- /footer -->

    <AddCartPopup
        v-model:modalValue="isAddNoticeShow"
        @confirmEvent="onClickKeepShopping"
        @cancleEvent="onClickViewCart"
    />
    <CartListPopup v-model:modalValue="isCartListShow" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import metaJson from '/meta.json';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { storeToRefs } from 'pinia';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useProductStore } from '@/stores/product.js';
import AddCartPopup from './popup/cartPopup/AddCartPopup.vue';
import CartListPopup from './popup/cartPopup/CartListPopup.vue';
import TheFooter from '@/layouts/TheFooter.vue';
import { dateformat, formatPrice } from '@/composables/format';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
onMounted(() => {
    productList.value = metaJson.productList.map((item) => {
        return {
            ...item,
            count: 0,
            isWish: false,
        };
    });
});
const { addCartList, toggleWishList } = useProductStore();
const { productList } = storeToRefs(useProductStore());

const isAddNoticeShow = ref(false);
const isCartListShow = ref(false);

const slideList = metaJson.slideList; // 슬라이드 목록
const noticeList = metaJson.noticeList; // 공지사항 목록

/**
 *  swiper setting
 */
const modules = [Navigation, Pagination, Autoplay];
const noticemodules = [Navigation, Autoplay];
const banner_autoplay = {
    delay: 3000,
    disableOnInteraction: false,
};
const notice_autoplay = {
    delay: 1000,
    disableOnInteraction: false,
};

/**
 * 배너 버튼 클릭 이벤트. 배너 별 외부페이지로 이동
 * @param {number} idx 가져올 배너의 인덱스
 */
function goToBannerUrl(idx) {
    window.open(slideList.value[idx].url);
}

/**
 * 상품 추가 버튼 이벤트, 장바구니에 추가하고, 안내문구를 띄웁니다.
 * @param {object} item noticeList에 추가할 item
 */

function onClickAddProduct(item) {
    isAddNoticeShow.value = true;
    addCartList(item);
}
/**
 * 쇼핑 계속하기 버튼이벤트
 */
function onClickKeepShopping() {
    isAddNoticeShow.value = false;
}
/**
 * 장바구니 보기 버튼이벤트
 */
function onClickViewCart() {
    isCartListShow.value = true;
}
/**
 * 찜하기 버튼 이벤트, 찜 리스트에 추가하고, 상품정보를 반영합니다.
 * @param {object} item 상품
 */
function onClickWish(item) {
    toggleWishList(item);
}
</script>

<style lang="scss" scoped></style>
