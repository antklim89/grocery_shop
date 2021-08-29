import { observer, Observer } from 'mobx-react-lite';
import { FC, FormEvent, useMemo } from 'react';

import { useCart } from '~/components/cart/CartProvider';
import Loading from '~/components/utils/Loading';
import { IProduct } from '~/types';


const ProductOrder: FC<IProduct> = (product) => {
    const {
        name, country, category, discount, quantityPerUnit, unit, discountPrice,
    } = product;

    const cart = useCart();

    const cartItem = useMemo(() => cart.getCurrentCart(product), []);

    if (!cart.isCartFetched) {
        return (
            <div className="border h-100 shadow p-2 d-flex flex-column">
                <h1 className="text-center py-2 text-dark border-bottom">{name}</h1>
                <Loading loading />
            </div>
        );
    }


    const handleOrder = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        cart.toggle(cartItem);
    };

    return (
        <div className="border h-100 shadow p-2 d-flex flex-column">
            <h1 className="text-center py-2 text-dark border-bottom">{name}</h1>

            <div className="fs-5 py-2 border-bottom">
                {discount > 0
                    ? (
                        <p>
                            Discount:{' '}{discount}%
                        </p>
                    )
                    : null}
                <p>
                    Price for{' '}{quantityPerUnit}{' '}{unit}:
                    <br />
                    <big>
                        <b>
                            {discountPrice.toFixed(2)}$
                        </b>
                    </big>
                </p>
                <Observer>
                    {() => (
                        <p>
                            Total price for{' '}{cartItem.qty}{' '}{unit}:
                            <br />
                            <big>
                                <b>
                                    {(discountPrice * (cartItem.qty / quantityPerUnit)).toFixed(2)}$
                                </b>
                            </big>
                        </p>
                    )}
                </Observer>
            </div>

            <div className="py-2  border-bottom">
                <p><big className="text-capitalize">{category.name}</big></p>
                <p><big className="text-uppercase">{country.name}</big></p>
            </div>

            <form
                className="d-flex flex-column justify-content-end flex-column flex-grow-1"
                onSubmit={handleOrder}
            >
                <label className="form-label my-2" htmlFor="qte">
                    Quantity: ({unit})
                    <input
                        className="form-control"
                        id="qte"
                        type="number"
                        value={cartItem.qty}
                        onChange={(e) => cartItem.changeQty(e.target.value)}
                    />
                </label>
                {cart.isProductInCart(cartItem.product.id)
                    ? (
                        <input
                            className="btn btn-primary my-2"
                            disabled={cart.loading}
                            type="submit"
                            value="Remove from Cart"
                        />
                    )
                    : (
                        <input
                            className="btn btn-primary my-2"
                            disabled={cart.loading}
                            type="submit"
                            value="Place to Cart"
                        />
                    )}
            </form>
        </div>
    );
};

export default observer(ProductOrder);
