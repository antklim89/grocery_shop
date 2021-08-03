import { CART_LOCAL_STORAGE_NAME } from './constants';

import { CartItemStoreArgs } from '~/store/CartItemStore';


const isBrowser = typeof window !== 'undefined';


export const saveCart = (cartItems: CartItemStoreArgs[]): CartItemStoreArgs[] => {
    localStorage.setItem(CART_LOCAL_STORAGE_NAME, JSON.stringify(cartItems));

    return cartItems;
};


export function getCartItems(): CartItemStoreArgs[] | null {
    if (!isBrowser) return null;
    const dataStr = localStorage.getItem(CART_LOCAL_STORAGE_NAME);

    if (!dataStr) return null;
    return JSON.parse(dataStr);
}
