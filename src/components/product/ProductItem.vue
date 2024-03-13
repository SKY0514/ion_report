<template>
    <div>
        <div class="prod_box clearfix" v-for="item in listItem">
            <div class="check_box" v-if="isCartList">
                <input type="checkbox" :id="`product${item.id}`" v-model="item.isChecked" />
                <label :for="`product${item.id}`"></label>
            </div>

            <div class="prod_img">
                <router-link to="/"><img :src="item.image" :alt="item.label" /></router-link>
            </div>
            <div class="prod_info">
                <h3 class="product_title">{{ item.label }}</h3>
                <p class="product_price">{{ formatPrice(item.price) }}원</p>
                <div class="prod_cnt_box" v-if="isCartList">
                    <button class="minus_btn" @click="minusCount(item)" :disabled="item.count === 0">
                        <span>-</span>
                    </button>
                    <input type="number" min="0" v-model="item.count" @input="inputValidation(item)" />
                    <button class="plus_btn" @click="item.count++" :disabled="item.count === 10"><span>+</span></button>
                </div>
                <div class="prod_add_cart" v-else>
                    <button class="add_cart_btn" @click="onClickAddCart(item)">
                        <p><span class="cart_icon"></span>장바구니 추가</p>
                    </button>
                </div>
            </div>

            <div class="prod_whisBox" @click="onClickWish(item)">
                <span class="prod_wish" :class="item.isWish ? 'prod_wished' : 'prod_wish'"></span>
                <!--  prod_wish active-->
            </div>
        </div>
        <div class="prod_payment" v-if="isCartList && listItem.length > 0">
            <h2 class="expected_amount">결제 예정금액</h2>
            <div class="payment_info clearfix">
                <p>
                    주문 금액 <span>{{ formatPrice(productSumPrice) }}원</span>
                </p>
                <p>
                    할인 <span>{{ formatPrice(0) }}원</span>
                </p>
                <p>
                    배송비 <span>{{ formatPrice(13600) }}원</span>
                </p>
            </div>
            <h2 class="total_price">
                총 결제예정금액 <span>{{ formatPrice(totalPrice) }}원</span>
            </h2>
        </div>

        <div class="no_product" v-if="listItem.length === 0">
            <h2>선택하신 상품이 없습니다.</h2>
            <p v-if="isCartList">마음에 드는 상품을 장바구니 목록에 추가해보세요!</p>
            <p v-else>마음에 드는 상품을 찜해 찜 목록에 추가해보세요!</p>
        </div>
    </div>
    <Transition name="fade" mode="out-in">
        <AppDialog v-if="isDialog" message="추가되었습니다." />
    </Transition>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores/product.js';
import { computed, onMounted, ref } from 'vue';
import { formatPrice } from '@/composables/format';
const props = defineProps({
    isCartList: { type: Boolean, default: false },
});
const store = useProductStore();
const { removeCartList, toggleWishList, addCartList } = store;
const { cartList, wishList } = storeToRefs(store);
const listItem = computed(() => {
    if (props.isCartList) {
        return cartList.value;
    } else {
        return wishList.value;
    }
});
/* magic number */
const discount = 0;
const deliveryPrice = 13600;

const isDialog = ref(false);
//상품 * 개수 합한 가격
const productSumPrice = computed(() => {
    const checkedList = cartList.value.filter((list) => list.isChecked); //선택된 항목
    const sum = checkedList.reduce((acc, cur) => {
        if (cur.isChecked) {
            return acc + cur.count * cur.price;
        }
    }, 0);

    if (sum == undefined) {
        return 0;
    }

    return sum;
});
//(총 상품가격 + 배송비 ) - 할인율 = 총 결제금액
const totalPrice = computed(() => productSumPrice.value + deliveryPrice - discount);

/**
 * input 상품 수량이 음수가 되지않게 vali check
 * @param {item} 상품 아이템
 */
function inputValidation(item) {
    if (item.count <= 0) {
        item.count = 1;
    }
}
/**
 * 상품 수량 줄이기 및 상품 수량이 0 인 경우 장바구니에서 제거
 * @param {item} 상품 아이템
 */
function minusCount(item) {
    item.count--;
    if (item.count === 0) {
        removeCartList(item);
    }
}

/**
 * 찜하기 버튼 이벤트, 찜 리스트에 추가하고, 상품정보를 반영합니다.
 * @param {object} item 상품
 */
function onClickWish(item) {
    toggleWishList(item);
}

/**
 * 찜목록에서 장바구니 추가
 * @param {object} item 상품
 */
function onClickAddCart(item) {
    addCartList(item);
    isDialog.value = true;
    setTimeout(() => {
        isDialog.value = false;
    }, 1000);
}

onMounted(() => {
    if (props.isCartList) {
        cartList.value = cartList.value.map((item) => {
            return {
                ...item,
                isChecked: false,
            };
        });
    }
});
</script>
<style>
@import '/src/assets/css/itemBox.css';
</style>
