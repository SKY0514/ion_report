import { defineStore } from 'pinia';

export const useProductStore = defineStore('productInfo', {
    state: () => ({
        productList: [],
        cartList: [],
        wishList: [],
    }),
    getters: {
        cartCount: (state) => state.cartList.reduce((acc, cur) => acc + cur.count, 0),
    },
    actions: {
        addCartList(item) {
            const isAdded = this.cartList.some((cartItme) => cartItme.id === item.id);
            if (isAdded) {
                this.cartList.forEach((charItem) => {
                    charItem.count++;
                });
            } else {
                item.count++;
                this.cartList.push(item);
            }
        },

        removeCartList(item) {
            this.cartList.forEach((cartItem) => {
                if (cartItem.id === item.id) {
                    cartItem.count = 0;
                }
            });

            this.cartList = this.cartList.filter((cartItem) => cartItem.id !== item.id);
            this.changeInfoProduct(item, 'count');
        },

        cartListChangeWish(item) {
            this.cartList.forEach((list) => {
                if (list.id === item.id) {
                    list.isWish = item.isWish;
                }
            });
        },

        changeInfoProduct(item, option) {
            this.productList.forEach((list) => {
                if (list.id === item.id) {
                    list[option] = item[option];
                }
            });
        },

        toggleWishList(item) {
            const isWished = this.wishList.some((wishItem) => wishItem.id === item.id);

            if (isWished) {
                // 이미 찜 해놓은 상품이라면
                item.isWish = false;
                this.wishList.forEach((list) => {
                    if (list.id === item.id) {
                        list.isWish = false;
                    }
                });
                this.wishList = this.wishList.filter((wishItem) => wishItem.isWish !== false);
            } else {
                item.isWish = true;
                this.wishList.push(item);
            }
            this.cartListChangeWish(item);
            this.changeInfoProduct(item, 'isWish');
        },
    },
});
