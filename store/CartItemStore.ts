import { makeAutoObservable } from 'mobx';

import { IProduct } from '~/types';


export type CartItemStoreArgs = Pick<CartItemStore, 'productId'|'product'|'qty'|'cartId'>

export class CartItemStore {
    constructor(args: CartItemStoreArgs) {
        this.productId = args.productId;
        this.product = args.product;
        this.qty = args.qty;
        this.cartId = args.cartId;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    productId: number

    product: IProduct;

    qty: number

    cartId?: number

    changeQty(numb: number|string): void {
        this.qty = Number(numb);
    }
}
