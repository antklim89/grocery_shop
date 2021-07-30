import { CART_LOCAL_STORAGE_NAME } from './constants';

import { CartItemStore, CartItemStoreArgs } from '~/store/CartItemStore';


const isBrowser = typeof window !== 'undefined';

const getTokenLocalStorage = (): CartItemStore[] | null => {
    if (!isBrowser) return null;
    const dataStr = localStorage.getItem(CART_LOCAL_STORAGE_NAME);

    if (!dataStr) return null;
    const dataParsed: CartItemStoreArgs[] = JSON.parse(dataStr);

    if (!dataParsed) return null;
    const dataCart = dataParsed.map((i) => new CartItemStore(i));

    return dataCart;
};

export default getTokenLocalStorage;
