import { makeAutoObservable, observable, runInAction } from 'mobx';

import { CartItemStore, CartItem } from './CartItemStore';

import query from '~/queries/Cart.gql';
import { getCartItems } from '~/utils/cartStorage';
import { AUTH_TOKEN_NAME } from '~/utils/constants';
import { hasCookie } from '~/utils/cookie';
import fetcher from '~/utils/fetcher';


interface RefreshCart {
    qty: number;
    product: number;
}

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
        const isAuth = hasCookie(AUTH_TOKEN_NAME);

        if (isAuth && !this.loading) {
            this.setLoading(true);
            const { createCart } = await fetcher(
                query.CreateCartMutation,
                { qty: cartItem.qty, product: cartItem.product.id },
            );
            cartItem.setId(createCart.cart.id);
        }

        runInAction(() => this.cartItems.push(cartItem));
    }

    private async deleteCartItem(cartItem: CartItemStore) {
        const isAuth = hasCookie(AUTH_TOKEN_NAME);

        if (isAuth && !this.loading) {
            this.setLoading(true);
            await fetcher(query.DeleteCartMutation, { id: cartItem.id });
        }

        runInAction(() => this.cartItems.remove(cartItem));
    }

    async refreshCarts(newCartItems: RefreshCart[] = []): Promise<void> {
        try {
            if (hasCookie(AUTH_TOKEN_NAME)) {
                const data = await fetcher<CartItem[]>('/carts/refresh', newCartItems, { method: 'post' });
                this.replace(data);
            } else {
                this.replace(getCartItems());
            }
        } catch (error) {
            this.replace(getCartItems());
        } finally {
            this.setCartFedched();
        }
    }

    replace(newCartItems: CartItem[]): void {
        this.cartItems.replace(newCartItems.map((cartItem) => new CartItemStore(cartItem)));
    }

    exists(cartItem: CartItemStore): boolean {
        return Boolean(this.cartItems.find((prevItem) => prevItem.product.id === cartItem.product.id));
    }

    setCurrentProduct(cartItem: CartItem): CartItemStore {
        const oldOrNewCartItem = (
            this.cartItems.find((item) => Number(item.product.id) === Number(cartItem.product.id))
            || new CartItemStore(cartItem)
        );

        this.currentCartItem = oldOrNewCartItem;
        return oldOrNewCartItem;
    }

    private setCartFedched(): void {
        this.isCartFetched = true;
    }

    private setLoading(state = true): void {
        this.loading = state;
    }
}


