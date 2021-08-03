import { makeAutoObservable, runInAction } from 'mobx';

import type { CartStore } from './CartStore';

import UpdateCartMutation from '~/queries/UpdateCartMutation.gql';
import { IProduct } from '~/types';
import { AUTH_TOKEN_NAME } from '~/utils/constants';
import client from '~/utils/graphql-request';


export type CartItemStoreArgs = Pick<CartItemStore, 'id'|'product'|'qty'>

export class CartItemStore {
    constructor(args: CartItemStoreArgs, public parent: CartStore) {
        this.product = args.product;
        this.qty = args.qty;
        this.id = args.id;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    product: IProduct;

    qty: number

    id?: number

    private timeout?: NodeJS.Timeout

    changeQty(numb: number|string): void {
        this.qty = Number(numb);

        const isAuth = !!localStorage.getItem(AUTH_TOKEN_NAME);

        if (!isAuth || !this.id) return;
        if (this.timeout) clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            runInAction(() => { this.parent.loading = true; });
            client.request(UpdateCartMutation, { qty: this.qty, id: this.id })
                .finally(() => runInAction(() => { this.parent.loading = false; }));
        }, 700);
    }
}
