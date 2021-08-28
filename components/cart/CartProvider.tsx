import { reaction } from 'mobx';
import { createContext, ReactChild, useContext, useEffect, useMemo } from 'react';

import { CartItem } from '~/store/CartItemStore';
import { CartStore } from '~/store/CartStore';
import { getCartItems } from '~/utils/cartStorage';
import { AUTH_TOKEN_NAME, CART_LOCAL_STORAGE_NAME } from '~/utils/constants';
import { hasCookie } from '~/utils/cookie';
import fetcher from '~/utils/fetcher';


export const Context = createContext({} as CartStore);


const CartProvider = ({ children }: { children: ReactChild[]}): JSX.Element => {
    const cart = useMemo(() => new CartStore(), []);

    useEffect(() => {
        (async () => {
            try {
                if (hasCookie(AUTH_TOKEN_NAME)) {
                    const data = await fetcher<CartItem[]>('/carts/refresh', [], { method: 'post' });
                    cart.replace(data);
                } else {
                    cart.replace(getCartItems());
                }
            } catch (error) {
                cart.replace(getCartItems());
            } finally {
                cart.setCartFedched();
            }
        })();
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
};

export default CartProvider;

export const useCart = (): CartStore => useContext(Context);
