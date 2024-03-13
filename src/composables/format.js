import { computed, unref } from 'vue';

export const useNumber = (number) => {
    const isOdd = computed(() => unref(number) % 2 === 1);
    const isEven = computed(() => !isOdd.value);
    return { isOdd, isEven };
};

/**
 * foramt price 10000 -> 10,000
 * @param {price} 상품 가격
 */
export function formatPrice(price) {
    return String(price).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}
/**
 * yyyymmdd -> YYYY-MM-dd
 * @param {string or number} date 포맷팅 할 날짜
 */
export function dateformat(stringDate) {
    return String(stringDate).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
}
