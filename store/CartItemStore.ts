import { makeAutoObservable } from 'mobx';

import UpdateCartMutation from '~/queries/UpdateCartMutation.gql';
import type { IProduct } from '~/types';
import { AUTH_TOKEN_NAME } from '~/utils/constants';
import fetcher from '~/utils/fetcher';


export type CartItemStoreArgs = Pick<CartItemStore, 'id'|'qty'> & {
    product: IProduct
}

let timeout: NodeJS.Timeout;


export class CartItemStore {
    constructor(args: CartItemStoreArgs) {
        this.product = {
            ...args.product,
            images: [args.product.images[0]],
        };
        this.qty = args.qty;
        this.id = args.id;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    product: Omit<IProduct, 'description'>;

    qty: number

    id?: number

    changeQty(numb: number|string): void {
        this.qty = Number(numb);

        const isAuth = !!localStorage.getItem(AUTH_TOKEN_NAME);

        if (!isAuth || !this.id) return;
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            fetcher(UpdateCartMutation, { qty: this.qty, id: this.id });
        }, 700);
    }
}
