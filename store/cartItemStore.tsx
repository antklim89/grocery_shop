import { CartItemStore, CartItem } from '~/types';


export function cartItemStore(store: CartItem): CartItemStore {
    return {
        ...store,
        changeQty(numb: number) {
            this.qty = numb;
        },
    };
}
