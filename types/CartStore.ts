import { CartItemStore, CartItem } from './CartItemStore';


export type CartStore = {
    products: CartItemStore[];
    currentProduct: CartItemStore | null;
    toggle(product: CartItemStore): Promise<void>;
    replace(newProducts: CartItemStore[]): void;
    getById(id: number): CartItemStore | undefined;
    exists(id: number): boolean;
    setCurrentProduct(product: CartItem): CartItemStore;
    isAuth: boolean;
};
