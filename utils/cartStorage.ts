import { CART_LOCAL_STORAGE_NAME } from './constants';

import { CartItem } from '~/store/CartItemStore';


const isBrowser = typeof window !== 'undefined';


export const saveCart = (cartItems: CartItem[]): CartItem[] => {
    localStorage.setItem(CART_LOCAL_STORAGE_NAME, JSON.stringify(cartItems));

    return cartItems;
};


export function getCartItems(): CartItem[] {
    if (!isBrowser) return [];
    const dataStr = localStorage.getItem(CART_LOCAL_STORAGE_NAME);

    if (!dataStr) return [];
    return JSON.parse(dataStr) || [];
}
