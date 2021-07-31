import type { IProductPreview } from '~/types';


export interface Order {
    email: string;
    name: string;
    surname: string;
    address: string;
    phone: string;
    carts: Array<{
        id: number
        qty: number
        product: IProductPreview;
    }>
    user: {
        id: string;
        username: string;
        email: string;
    };
}
