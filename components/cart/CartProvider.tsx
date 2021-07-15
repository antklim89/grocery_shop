import { useLocalObservable, observer } from 'mobx-react-lite';
import { createContext, ReactChild, useEffect } from 'react';

import { createCartItemStore } from '~/store/cartItemStore';
import { cartStore } from '~/store/cartStore';


const isBrowser = typeof window !== 'undefined';


export const Context = createContext(cartStore);

const STORE_NAME = 'grocery_shop_cart';

function CartProvider({ children }: { children: ReactChild[]}): JSX.Element {
    const cart = useLocalObservable(() => cartStore);

    useEffect(() => {
        if (!isBrowser) return;
        const dataStr = localStorage.getItem(STORE_NAME);
        if (!dataStr) return;
        const dataParsed = JSON.parse(dataStr);
        if (dataParsed) {
            const dataCart = dataParsed.map(createCartItemStore);
            cart.replace(dataCart);
        } else {
            cart.replace([]);
        }
    }, []);


    useEffect(() => {
        if (isBrowser) localStorage.setItem(STORE_NAME, JSON.stringify(cart.products));
    }, [JSON.stringify(cart.products)]);

    return (
        <Context.Provider value={cart}>
            {children}
        </Context.Provider>
    );
}

export default observer(CartProvider);
