import {
    createContext, useState, useEffect, ReactChild,
} from 'react';

import { CartItem, CartContext } from '~/types';


export const Context = createContext({} as CartContext);


const isBrowser = typeof window !== 'undefined';

export default function CartProvider({ children }: { children: ReactChild[]}): JSX.Element {
    const [products, setPoducts] = useState<CartItem[]>([]);
    const [productsLoaded, setProductsLoaded] = useState(false);

    useEffect(() => {
        if (isBrowser) {
            const data = localStorage.getItem('grocery-shop-cart');
            if (data) setPoducts(JSON.parse(data));
            setProductsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (isBrowser) localStorage.setItem('grocery-shop-cart', JSON.stringify(products));
    }, [products]);

    const toggle = (product: CartItem) => {
        setPoducts((prev) => {
            const isProductInCart = prev.find((p) => p.id === product.id);
            if (isProductInCart) return prev.filter((i) => i !== product);
            return [...prev, product];
        });
    };

    const update = (itemToUpdate: CartItem) => {
        setPoducts((prev) => prev.map((i) => (i.id === itemToUpdate.id ? itemToUpdate : i)));
    };

    return (
        <Context.Provider value={{
            products, toggle, update, productsLoaded,
        }}
        >
            {children}
        </Context.Provider>
    );
}


