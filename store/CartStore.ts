import { makeAutoObservable, observable, runInAction as ria } from 'mobx';

import { CartItemStore, CartItemStoreArgs } from './CartItemStore';

import CreateCartMutation from '~/queries/CreateCartMutation.gql';
import DeleteCartMutation from '~/queries/DeleteCartMutation.gql';
import { client, AUTH_TOKEN_NAME } from '~/utils';


const isAuth = typeof window === 'undefined' ? false : !!localStorage.getItem(AUTH_TOKEN_NAME);

export class CartStore {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    cartItems = observable.array<CartItemStore>()

    currentCartItem: CartItemStore | null = null

    loading = false

    isCartFetched = false

    async toggle(cartItem: CartItemStore): Promise<void> {
        try {
            console.debug(cartItem.id);
            if (this.exists(cartItem)) {
                if (isAuth && !this.loading) {
                    ria(() => { this.loading = true; });
                    await client.request(
                        DeleteCartMutation,
                        { id: cartItem.id },
                    );
                }
                ria(() => this.cartItems.remove(cartItem));
            } else {
                if (isAuth && !this.loading) {
                    ria(() => { this.loading = true; });
                    const { createCart: { cart } } = await client.request(
                        CreateCartMutation,
                        { qty: cartItem.qty, product: cartItem.product.id },
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
        return this.cartItems.find((i) => i.product.id === id);
    }

    exists(cartItem: CartItemStore): boolean {
        return !!this.cartItems.find((p) => p.product.id === cartItem.product.id);
    }

    setCurrentProduct(product: CartItemStoreArgs): CartItemStore {
        const oldOrNewCartItem = (
            this.cartItems.find((i) => Number(i.product.id) === Number(product.product.id))
            || new CartItemStore(product)
        );

        this.currentCartItem = oldOrNewCartItem;
        return oldOrNewCartItem;
    }

    setCartFedched(): void {
        this.isCartFetched = true;
    }
}


