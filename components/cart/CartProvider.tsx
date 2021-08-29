import { reaction } from 'mobx';
import { createContext, ReactChild, useContext, useEffect, useMemo } from 'react';

import { useAuth } from '~/components/auth/AuthProvider';
import { CART_LOCAL_STORAGE_NAME } from '~/constants';
import { CartStore } from '~/store/CartStore';


export const Context = createContext({} as CartStore);


const CartProvider = ({ children }: { children: ReactChild[]}): JSX.Element => {
    const cart = useMemo(() => new CartStore(), []);
    const auth = useAuth();

    useEffect(() => {
        cart.refresh();
    }, []);

    useEffect(() => reaction(
        () => JSON.stringify(cart.cartItems),
        (json) => localStorage.setItem(CART_LOCAL_STORAGE_NAME, json),
    ), []);

    useEffect(() => reaction(
        () => auth.user?.id,
        (id) => {
            if (id && auth.isUserFetched) cart.refresh(cart.cartItems);
        },
    ), []);

    return (
        <Context.Provider value={cart}>
            {children}
        </Context.Provider>
    );
};

export default CartProvider;

export const useCart = (): CartStore => useContext(Context);
