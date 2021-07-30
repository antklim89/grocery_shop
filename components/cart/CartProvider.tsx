import { reaction } from 'mobx';
import {
    createContext, ReactChild, useEffect, useMemo,
} from 'react';

import CartQuery from '~/queries/CartQuery.gql';
import { CartItemStore } from '~/store/CartItemStore';
import { CartStore } from '~/store/CartStore';
import { CART_LOCAL_STORAGE_NAME, client, AUTH_TOKEN_NAME } from '~/utils';
import { getTokenLocalStorage } from '~/utils/getLocalStorage';


export const Context = createContext({} as CartStore);


function CartProvider({ children }: { children: ReactChild[]}): JSX.Element {
    const cart = useMemo(() => new CartStore(), []);

    useEffect(() => {
        if (localStorage.getItem(AUTH_TOKEN_NAME)) {
            client.request(CartQuery)
                .then(({ carts }): void => {
                    cart.replace(carts);
                });
        } else {
            const dataCart = getTokenLocalStorage();
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
