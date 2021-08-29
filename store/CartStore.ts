import { makeAutoObservable, observable, runInAction } from 'mobx';

import { CartItemStore, CartItem, CartProduct } from './CartItemStore';

import { AUTH_TOKEN_NAME } from '~/constants';
import query from '~/queries/Cart.gql';
import { getCartItems } from '~/utils/cartStorage';
import { hasCookie } from '~/utils/cookie';
import fetcher from '~/utils/fetcher';


export class CartStore {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    cartItems = observable.array<CartItemStore>()

    loading = false

    isCartFetched = false

    async toggle(cartItem: CartItemStore): Promise<void> {
        if (this.isProductInCart(cartItem.product.id)) await this.remove(cartItem);
        else await this.push(cartItem);
    }

    async push(cartItem?: CartItemStore): Promise<void> {
        if (!cartItem) return;

        if (hasCookie(AUTH_TOKEN_NAME) && !this.loading) {
            this.setLoading(true);
            try {
                const { createCart } = await fetcher(
                    query.CreateCartMutation,
                    { qty: cartItem.qty, product: cartItem.product.id },
                );

                cartItem.setId(Number(createCart.cart.id));
            } catch (error) {
                console.error(error);
            } finally {
                this.setLoading(false);
            }
        }

        runInAction(() => this.cartItems.push(cartItem));

    }

    async remove(cartItem?: CartItemStore): Promise<void> {
        if (!cartItem) return;

        if (hasCookie(AUTH_TOKEN_NAME) && !this.loading) {
            this.setLoading(true);
            try {
                if (cartItem.id) await fetcher(query.DeleteCartMutation, { id: cartItem.id });
            } catch (error) {
                console.error(error);
            } finally {
                this.setLoading(false);
            }
        }

        const idx = this.cartItems.findIndex((item) => Number(item.product.id) === Number(cartItem.product.id));
        runInAction(() => this.cartItems.splice(idx, 1));
    }

    async refresh(newCartItems: CartItem[] = []): Promise<void> {
        try {
            if (hasCookie(AUTH_TOKEN_NAME)) {
                const cartItemsBody = newCartItems.map(({ qty, product }) => ({ qty, product: product.id }));
                const data = await fetcher<CartItem[]>('/carts/refresh', cartItemsBody, { method: 'post' });
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
        const newCartItemStores = newCartItems.map((cartItem) => new CartItemStore(cartItem));
        this.cartItems.replace(newCartItemStores);
    }

    isProductInCart(productId?: number|string): boolean {
        if (!productId) return false;
        return Boolean(this.cartItems.find((prevItem) => Number(prevItem.product.id) === Number(productId)));
    }

    getCurrentCart(product: CartProduct): CartItemStore {
        return this.cartItems.find((item) => Number(item.product.id) === Number(product.id))
            || new CartItemStore({ qty: product.quantityPerUnit, product });
    }

    private setCartFedched(): void {
        this.isCartFetched = true;
    }

    private setLoading(state = true): void {
        this.loading = state;
    }
}


