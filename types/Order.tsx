import { CartItemStoreArgs } from '~/store/CartItemStore';


export interface Order {
    email: string;
    name: string;
    surname: string;
    address: string;
    phone: string;
    carts: CartItemStoreArgs[]
    user: {
        id: string;
        username: string;
        email: string;
    };
}
