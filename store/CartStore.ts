import { makeAutoObservable, observable, runInAction as ria } from 'mobx';

import { CartItemStore, CartItemStoreArgs } from './CartItemStore';

import CreateCartMutation from '~/queries/CreateCartMutation.gql';
import DeleteCartMutation from '~/queries/DeleteCartMutation.gql';
import { AUTH_TOKEN_NAME } from '~/utils/constants';
import fetcher from '~/utils/fetcher';


export class CartStore {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    cartItems = observable.array<CartItemStore>()

    currentCartItem: CartItemStore | null = null

    loading = false

    isCartFetched = false

    async toggle(cartItem: CartItemStore): Promise<void> {
        const isAuth = !!localStorage.getItem(AUTH_TOKEN_NAME);

        try {
            if (this.exists(cartItem)) {
                if (isAuth && !this.loading) {
                    this.setLoading(true);
                    await fetcher(
                        DeleteCartMutation,
                        { id: cartItem.id },
                    );
                }
                ria(() => this.cartItems.remove(cartItem));
            } else {
                if (isAuth && !this.loading) {
                    this.setLoading(true);
                    const { createCart: { cart } } = await fetcher(
                        CreateCartMutation,
                        { qty: cartItem.qty, product: cartItem.product.id },
                    );
                    ria(() => Object.assign(cartItem, { id: cart.id }));
                }
                ria(() => this.cartItems.push(cartItem));
            }
        } catch (err) {
            console.error(err);
        } finally {
            this.setLoading(false);
        }
    }

    replace(newCartItems: CartItemStoreArgs[]): void {
        this.cartItems.replace(newCartItems.map((cartItem) => new CartItemStore(cartItem)));
    }

    getById(id: number): CartItemStore | undefined {
        return this.cartItems.find((i) => i.product.id === id);
    }

    exists(cartItem: CartItemStore): boolean {
        return !!this.cartItems.find((p) => p.product.id === cartItem.product.id);
    }

    setCurrentProduct(cartItem: CartItemStoreArgs): CartItemStore {
        const oldOrNewCartItem = (
            this.cartItems.find((i) => Number(i.product.id) === Number(cartItem.product.id))
            || new CartItemStore(cartItem)
        );

        this.currentCartItem = oldOrNewCartItem;
        return oldOrNewCartItem;
    }

    setCartFedched(): void {
        this.isCartFetched = true;
    }

    setLoading(state = true): void {
        this.loading = state;
    }
}


