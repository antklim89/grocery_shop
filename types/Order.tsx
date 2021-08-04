import { IProduct } from './IProduct';


export interface Order {
    email: string;
    name: string;
    surname: string;
    address: string;
    phone: string;
    carts: Array<{
        id: number
        qty: number
        product: Omit<IProduct, 'description'>;
    }>
    user: {
        id: string;
        username: string;
        email: string;
    };
}
