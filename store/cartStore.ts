import { createCartItemStore } from './cartItemStore';

import { CartStore } from '~/types';


export const cartStore: CartStore = {
    products: null,

    currentProduct: null,

    toggle(product) {
        if (!this.products) {
            this.products = [product];
            return;
        }

        if (this.exists(product.id)) this.products.splice(this.products.indexOf(product), 1);
        else this.products.push(product);
    },

    replace(newProducts) {
        this.products = newProducts;
    },

    getById(id) {
        if (!this.products) return undefined;
        return this.products.find((i) => i.id === id);
    },

    exists(id) {
        if (!this.products) return false;
        return !!this.products.find((p) => p.id === id);
    },

    setCurrentProduct(product) {
        const currentProduct = this.products?.find((i) => i.id === product.id) || createCartItemStore(product);
        this.currentProduct = currentProduct;
        return this.currentProduct;
    },
};


