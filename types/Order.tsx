import { CartItem } from '~/store/CartItemStore';


export interface Order {
    email: string;
    name: string;
    surname: string;
    address: string;
    phone: string;
    orderedProducts: CartItem[]
    user: {
        id: string;
        username: string;
        email: string;
    };
}
