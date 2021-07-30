import { reaction } from 'mobx';
import {
    createContext, ReactChild, useEffect, useMemo,
} from 'react';

import { CartStore } from '~/store/CartStore';
import { CART_LOCAL_STORAGE_NAME } from '~/utils';
import { getTokenLocalStorage } from '~/utils/getLocalStorage';


export const Context = createContext({} as CartStore);


function CartProvider({ children }: { children: ReactChild[]}): JSX.Element {
    const cart = useMemo(() => new CartStore(), []);

    useEffect(() => {
        const dataCart = getTokenLocalStorage();
        if (dataCart) {
            cart.replace(dataCart);
        }
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
