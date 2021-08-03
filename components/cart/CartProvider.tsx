import { reaction } from 'mobx';
import {
    createContext, ReactChild, useContext, useEffect, useMemo,
} from 'react';

import { CartItemStoreArgs } from '~/store/CartItemStore';
import { CartStore } from '~/store/CartStore';
import { getCartItems } from '~/utils/cartStorage';
import { CART_LOCAL_STORAGE_NAME, AUTH_TOKEN_NAME } from '~/utils/constants';
import fetcher from '~/utils/fetcher';


export const Context = createContext({} as CartStore);


function CartProvider({ children }: { children: ReactChild[]}): JSX.Element {
    const cart = useMemo(() => new CartStore(), []);

    useEffect(() => {
        if (localStorage.getItem(AUTH_TOKEN_NAME)) {
            fetcher<CartItemStoreArgs[]>('/carts/refresh', { method: 'post', body: [] })
                .then((data) => cart.replace(data));
        } else {
            const dataCart = getCartItems();
            if (dataCart) cart.replace(dataCart);
        }
        cart.setCartFedched();
    }, []);

    useEffect(() => reaction(
        () => JSON.stringify(cart.cartItems),
        (json) => localStorage.setItem(CART_LOCAL_STORAGE_NAME, json),
    ), []);

    return (
        <Context.Provider value={cart}>
            {children}
        </Context.Provider>
    );
}

export default CartProvider;

export const useCart = (): CartStore => useContext(Context);
