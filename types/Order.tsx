import { IProductPreview } from '~/types';


export interface Order {
    email: string;
    name: string;
    surname: string;
    address: string;
    phone: string;
    products: IProductPreview[];
    user: {
        id: string;
        username: string;
        email: string;
    };
}
