import { IBaseProduct } from '~/types/IBaseProduct';


type CartItem = Array<{
    qty: number;
    product: IBaseProduct;
}>;

export default function getTotalPrice(cartItems: CartItem): number {
    return cartItems.reduce((total, { qty, product: { discountPrice, quantityPerUnit } }) => (
        total + Number(discountPrice * (qty / quantityPerUnit))
    ), 0);
}
