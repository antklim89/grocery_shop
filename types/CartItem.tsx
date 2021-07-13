import { IProduct } from '~/types';


export interface CartItem {
    id: number;
    qty: number;
    product: IProduct;
}
