import { CartItemStore, CartItem } from '~/types';


export const createCartItemStore = (store: CartItem): CartItemStore => ({
    ...store,
    changeQty(numb: number) {
        this.qty = numb;
    },
});
