import { CartItem } from './CartItem';


export interface CartContext {
    products: CartItem[];
    toggle: (arg: CartItem) => void;
    update: (arg: CartItem) => void;
    productsLoaded: boolean;
}
