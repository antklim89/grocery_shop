import { makeAutoObservable } from 'mobx';

import { IProduct } from '~/types';


export type CartItemStoreArgs = Pick<CartItemStore, 'id'|'product'|'qty'>

export class CartItemStore {
    constructor(args: CartItemStoreArgs) {
        this.product = args.product;
        this.qty = args.qty;
        this.id = args.id;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    product: IProduct;

    qty: number

    id?: number

    changeQty(numb: number|string): void {
        this.qty = Number(numb);
    }
}
