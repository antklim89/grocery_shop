import {
    useState, ChangeEvent, FormEvent, useEffect,
} from 'react';

import { Price } from '~/components/utils/Price';
import { IProduct, CartItem } from '~/types';
import { useCart } from '~/utils/useCart';


export default function ProductOrder(product: IProduct): JSX.Element {
    const {
        name, country, type, discount, price, unit, measure, id,
    } = product;

    const cart = useCart();

    const [cartItem, setCartItem] = useState<CartItem | null>(null);

    useEffect(() => {
        if (cartItem) cart.update(cartItem);
    }, [cartItem]);

    useEffect(() => {
        const item = cart.products.find((i) => i.id === id);
        setCartItem(item || { id, product, qty: unit });
    }, [cart.productsLoaded]);

    const isProductInCart = cart.products && cart.products.find((p) => p.id === id);

    const handleQteChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const qty = Number(e.target.value);
        if (cartItem) setCartItem({ ...cartItem, qty });
    };

    const handleOrder = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (cartItem) cart.toggle(cartItem);
    };


    if (!cartItem) return <p>Loading</p>;
    return (
        <div className="border h-100 shadow p-2 d-flex flex-column">
            <h1 className="text-center py-2 text-dark border-bottom">{name}</h1>

            <div className="fs-5 py-2 border-bottom">
                <p>
                    <Price
                        discount={discount}
                        measure={measure}
                        price={price}
                        unit={unit}
                    />
                </p>
                <p>
                    <Price
                        discount={discount}
                        measure={measure}
                        price={(price / unit) * cartItem.qty}
                        unit={cartItem.qty}
                    />
                </p>
                {discount > 0 ? (
                    <p>
                        Discount:
                        {' '}
                        {discount}
                        %
                    </p>
                ) : null}
            </div>

            <div className="py-2  border-bottom">
                <p><big className="text-capitalize">{type}</big></p>
                <p><big className="text-uppercase">{country}</big></p>
            </div>

            <form className="d-flex flex-column justify-content-end flex-column flex-grow-1" onSubmit={handleOrder}>
                <label className="form-label my-2" htmlFor="qte">
                    Quantity: (
                    {measure}
                    )
                    <input
                        className="form-control"
                        id="qte"
                        type="number"
                        value={cartItem.qty}
                        onChange={handleQteChange}
                    />
                </label>
                {isProductInCart ? (
                    <input className="btn btn-primary my-2" type="submit" value="Remove from Cart" />
                ) : (
                    <input className="btn btn-primary my-2" type="submit" value="Place to Cart" />
                )}
            </form>
        </div>
    );
}
