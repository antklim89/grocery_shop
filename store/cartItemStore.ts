import { CartItemStore, CartItem } from '~/types';


export const createCartItemStore = (store: CartItem): CartItemStore => ({
    ...store,
    changeQty(numb) {
        this.qty = Number(numb);
    },
});
