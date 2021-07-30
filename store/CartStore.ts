import { makeAutoObservable, observable, runInAction as ria } from 'mobx';

import { CartItemStore, CartItemStoreArgs } from './CartItemStore';

import CreateCartMutation from '~/queries/CreateCartMutation.gql';
import DeleteCartMutation from '~/queries/DeleteCartMutation.gql';
import { client, TOKEN_NAME } from '~/utils';


const isAuth = typeof window === 'undefined' ? false : !!localStorage.getItem(TOKEN_NAME);

export class CartStore {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    cartItems = observable.array<CartItemStore>()

    currentCartItem: CartItemStore | null = null

    loading = false

    async toggle(cartItem: CartItemStore): Promise<void> {
        try {
            console.debug(cartItem.cartId);
            if (this.exists(cartItem)) {
                if (isAuth && !this.loading) {
                    ria(() => { this.loading = true; });
                    await client.request(
                        DeleteCartMutation,
                        { id: cartItem.cartId },
                    );
                }
                ria(() => this.cartItems.remove(cartItem));
            } else {
                if (isAuth && !this.loading) {
                    ria(() => { this.loading = true; });
                    const { createCart: { cart } } = await client.request(
                        CreateCartMutation,
                        { qty: cartItem.qty, product: cartItem.productId },
                    );
                    console.debug(cart.id);
                    ria(() => Object.assign(cartItem, { cartId: cart.id }));
                }
                ria(() => this.cartItems.push(cartItem));
            }
        } catch (err) {
            console.error(err);
        } finally {
            ria(() => { this.loading = false; });
        }
    }

    replace(newCartItems: CartItemStore[]): void {
        this.cartItems.replace(newCartItems);
    }

    getById(id: number): CartItemStore | undefined {
        return this.cartItems.find((i) => i.productId === id);
    }

    exists(cartItem: CartItemStore): boolean {
        return !!this.cartItems.find((p) => p.productId === cartItem.productId);
    }

    setCurrentProduct(product: CartItemStoreArgs): CartItemStore {
        const oldOrNewCartItem = (
            this.cartItems.find((i) => Number(i.productId) === Number(product.productId)) || new CartItemStore(product)
        );
        this.currentCartItem = oldOrNewCartItem;
        return oldOrNewCartItem;
    }
}


