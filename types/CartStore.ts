import { CartItemStore, CartItem } from './CartItemStore';


export type CartStore = {
    products: CartItemStore[] | null;
    currentProduct: CartItemStore | null;
    toggle(product: CartItemStore): void;
    replace(newProducts: CartItemStore[]): void;
    getById(id: number): CartItemStore | undefined;
    exists(id: number): boolean;
    setCurrentProduct(product: CartItem): CartItemStore;
};
