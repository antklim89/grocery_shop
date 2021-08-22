import { CartItem } from '~/store/CartItemStore';


export enum OrderStatus {
    DRAFT = 'draft',
    PROCESSING = 'processing',
    SHIPPING = 'shipping',
    COMPLETED = 'completed'
}

export interface Order {
    email: string;
    name: string;
    surname: string;
    address: string;
    phone: string;
    orderedProducts: CartItem[]
    status: OrderStatus
    user: {
        id: string;
        username: string;
        email: string;
    };
}
