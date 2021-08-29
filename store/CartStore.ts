import { makeAutoObservable, observable, runInAction } from 'mobx';

import { CartItemStore, CartItem, CartProduct } from './CartItemStore';

import query from '~/queries/Cart.gql';
import { getCartItems } from '~/utils/cartStorage';
import { AUTH_TOKEN_NAME } from '~/utils/constants';
import { hasCookie } from '~/utils/cookie';
import fetcher from '~/utils/fetcher';


export class CartStore {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    cartItems = observable.array<CartItemStore>()

    currentCartItem?: CartItemStore

    loading = false

    isCartFetched = false

    async toggle(cartItem: CartItemStore): Promise<void> {
        if (this.exists(cartItem)) await this.remove(cartItem);
        else await this.push(cartItem);
    }

    async push(cartItem: CartItemStore): Promise<void> {
        await this.request(async () => {
            const { createCart } = await fetcher(
                query.CreateCartMutation,
                { qty: cartItem.qty, product: cartItem.product.id },
            );
            cartItem.setId(createCart.cart.id);

            runInAction(() => this.cartItems.push(cartItem));
        });
    }

    async remove(cartItem: CartItemStore): Promise<void> {
        await this.request(async () => {
            this.setLoading(true);
            if (cartItem.id) await fetcher(query.DeleteCartMutation, { id: cartItem.id });

            const idx = this.cartItems.findIndex((item) => Number(item.product.id) === Number(cartItem.product.id));
            runInAction(() => this.cartItems.splice(idx, 1));
        });
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
        const items = newCartItems.map((cartItem) => {
            if (this.currentCartItem && Number(cartItem.product.id) === Number(this.currentCartItem.product.id)) {
                this.currentCartItem.id = cartItem.id;
                return this.currentCartItem;
            }
            return new CartItemStore(cartItem);
        });
        this.cartItems.replace(items);
    }

    exists(cartItem?: CartItemStore|null): boolean {
        if (!cartItem) return false;
        return Boolean(this.cartItems.find((prevItem) => Number(prevItem.product.id) === Number(cartItem.product.id)));
    }

    setCurrentCart(product: CartProduct): CartItemStore {
        const oldOrNewCartItem
            = this.cartItems.find((item) => Number(item.product.id) === Number(product.id))
            || new CartItemStore({ qty: product.quantityPerUnit, product });

        this.currentCartItem = oldOrNewCartItem;
        return oldOrNewCartItem;
    }

    private setCartFedched(): void {
        this.isCartFetched = true;
    }

    private setLoading(state = true): void {
        this.loading = state;
    }

    private async request(callback: () => Promise<void>) {
        const isAuth = hasCookie(AUTH_TOKEN_NAME);

        if (isAuth && !this.loading) {
            this.setLoading(true);
            try {
                await callback();
            } catch (error) {
                console.error(error);
            } finally {
                this.setLoading(false);
            }
        }

    }
}


