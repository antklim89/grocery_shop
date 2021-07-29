import { IProduct } from '~/types';


export interface CartItem {
    id: number;
    cartId?: number
    product: IProduct;
    qty: number;
}

export interface CartItemStore extends CartItem {
    changeQty(numb: number|string): void;
}
