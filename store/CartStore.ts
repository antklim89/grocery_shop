import { makeAutoObservable, observable, runInAction } from 'mobx';

import { CartItemStore, CartItem } from './CartItemStore';

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
        try {
            if (this.exists(cartItem)) await this.deleteCartItem(cartItem);
            else await this.createCartItem(cartItem);
        } catch (err) {
            console.error(err);
        } finally {
            this.setLoading(false);
        }
    }

    private async createCartItem(cartItem: CartItemStore) {
        const isAuth = !!localStorage.getItem(AUTH_TOKEN_NAME);

        if (isAuth && !this.loading) {
            this.setLoading(true);
            const { createCart } = await fetcher(
                CreateCartMutation,
                { qty: cartItem.qty, product: cartItem.product.id },
            );
            cartItem.setId(createCart.cart.id);
        }

        runInAction(() => this.cartItems.push(cartItem));
    }

    private async deleteCartItem(cartItem: CartItemStore) {
        const isAuth = !!localStorage.getItem(AUTH_TOKEN_NAME);

        if (isAuth && !this.loading) {
            this.setLoading(true);
            await fetcher(DeleteCartMutation, { id: cartItem.id });
        }

        runInAction(() => this.cartItems.remove(cartItem));
    }

    replace(newCartItems: CartItem[]): void {
        this.cartItems.replace(newCartItems.map((cartItem) => new CartItemStore(cartItem)));
    }

    exists(cartItem: CartItemStore): boolean {
        return !!this.cartItems.find((p) => p.product.id === cartItem.product.id);
    }

    setCurrentProduct(cartItem: CartItem): CartItemStore {
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


