import { reaction } from 'mobx';
import { createContext, ReactChild, useContext, useEffect, useMemo } from 'react';

import { CartStore } from '~/store/CartStore';
import { CART_LOCAL_STORAGE_NAME } from '~/utils/constants';


export const Context = createContext({} as CartStore);


const CartProvider = ({ children }: { children: ReactChild[]}): JSX.Element => {
    const cart = useMemo(() => new CartStore(), []);

    useEffect(() => {
        cart.refreshCarts();
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
