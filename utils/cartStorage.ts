import { CART_LOCAL_STORAGE_NAME } from './constants';

import { CartItemStore, CartItemStoreArgs } from '~/store/CartItemStore';


const isBrowser = typeof window !== 'undefined';

export const getCartStoreItems = (): CartItemStore[] | null => {
    const dataParsed = getCartItems();

    if (!dataParsed) return null;
    const dataCart = dataParsed.map((i) => new CartItemStore(i));

    return dataCart;
};

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
