import { createCartItemStore } from './cartItemStore';

import CreateCartMutation from '~/queries/CreateCartMutation.gql';
import DeleteCartMutation from '~/queries/DeleteCartMutation.gql';
import { CartStore } from '~/types';
import { client, TOKEN_NAME } from '~/utils';


export const cartStore: CartStore = {
    products: [],

    currentProduct: null,

    async toggle(product) {
        if (this.exists(product.id)) {
            if (this.isAuth) {
                await client.request(
                    DeleteCartMutation,
                    { id: product.cartId },
                );
            }
            this.products.splice(this.products.indexOf(product), 1);
        } else {
            if (this.isAuth) {
                const { createCart } = await client.request(
                    CreateCartMutation,
                    { qty: product.qty, product: product.id },
                );
                Object.assign(product, { cartId: createCart.cart.id });
            }
            this.products.push(product);
        }
    },

    replace(newProducts) {
        this.products = newProducts;
    },

    getById(id) {
        return this.products.find((i) => i.id === id);
    },

    exists(id) {
        return !!this.products.find((p) => p.id === id);
    },

    setCurrentProduct(product) {
        const currentProduct = this.products?.find((i) => i.id === product.id) || createCartItemStore(product);
        this.currentProduct = currentProduct;
        return this.currentProduct;
    },

    get isAuth(): boolean {
        return typeof window === 'undefined' ? false : !!localStorage.getItem(TOKEN_NAME);
    },
};


