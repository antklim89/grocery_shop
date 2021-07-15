import { IProduct } from '~/types';


export interface CartItem {
    id: number;
    product: IProduct;
    qty: number;
}

export interface CartItemStore extends CartItem {
    changeQty(numb: number): void;
}
