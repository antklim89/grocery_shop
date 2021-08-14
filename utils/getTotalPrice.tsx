import { IBaseProduct } from '~/types/IBaseProduct';
import getPrice from '~/utils/getPrice';


type CartItem = Array<{
    qty: number;
    product: IBaseProduct;
}>;

export default function getTotalPrice(cartItems: CartItem): number {
    return cartItems.reduce((total, { qty, product: { price, discount, unit } }) => (
        total + Number(getPrice(price * unit * qty, discount))
    ), 0);
}
