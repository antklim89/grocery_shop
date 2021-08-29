import { makeAutoObservable } from 'mobx';

import query from '~/queries/Cart.gql';
import type { IProduct } from '~/types';
import { AUTH_TOKEN_NAME } from '~/utils/constants';
import { hasCookie } from '~/utils/cookie';
import fetcher from '~/utils/fetcher';


export type CartItem = Pick<CartItemStore, 'id'|'qty'> & {
    product: Omit<IProduct, 'description'>
    inOrder?: boolean
}

let qtyTimeout: NodeJS.Timeout;
let inOrderTimeout: NodeJS.Timeout;


export class CartItemStore {
    constructor(args: CartItem) {
        this.product = {
            ...args.product,
            images: [args.product.images[0]],
        };
        this.qty = args.qty;
        this.id = args.id;
        this.inOrder = typeof args.inOrder === 'undefined' ? true : args.inOrder;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    product: Omit<IProduct, 'description'>;

    qty: number

    id?: number

    inOrder = true

    changeQty(numb: number|string): void {
        this.qty = Number(numb);

        const isAuth = hasCookie(AUTH_TOKEN_NAME);

        if (!isAuth || !this.id) return;
        if (qtyTimeout) clearTimeout(qtyTimeout);

        qtyTimeout = setTimeout(() => {
            fetcher(query.UpdateCartMutation, { qty: this.qty, id: this.id });
        }, 700);
    }

    changeInOrder(value: boolean): void {
        this.inOrder = value;

        const isAuth = hasCookie(AUTH_TOKEN_NAME);

        if (!isAuth || !this.id) return;
        if (inOrderTimeout) clearTimeout(inOrderTimeout);

        inOrderTimeout = setTimeout(() => {
            fetcher(query.UpdateCartMutation, { inOrder: this.inOrder, id: this.id });
        }, 700);
    }

    setId(id: number): void {
        this.id = id;
    }
}
