import { observer, Observer } from 'mobx-react-lite';
import { FormEvent } from 'react';

import { Price } from '~/components/utils/Price';
import { IProduct } from '~/types';
import { useCart } from '~/utils/useCart';


function ProductOrder(product: IProduct): JSX.Element {
    const {
        name, country, category, discount, price, unit, measure,
    } = product;

    const cart = useCart();

    const cartItem = cart.setCurrentProduct({ product, qty: unit });

    const handleOrder = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (cartItem) cart.toggle(cartItem);
    };

    if (!cart.isCartFetched) {
        return (
            <div className="border h-100 shadow p-2 d-flex flex-column">
                <h1 className="text-center py-2 text-dark border-bottom">{name}</h1>
                <div className="spinner-border m-auto" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

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
                <Observer>
                    {() => (
                        <p>
                            <Price
                                discount={discount}
                                measure={measure}
                                price={(price / unit) * cartItem.qty}
                                unit={cartItem.qty}
                            />
                        </p>
                    )}
                </Observer>
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
                <p><big className="text-capitalize">{category.name}</big></p>
                <p><big className="text-uppercase">{country.name}</big></p>
            </div>

            <form
                className="d-flex flex-column justify-content-end flex-column flex-grow-1"
                onSubmit={handleOrder}
            >
                <label className="form-label my-2" htmlFor="qte">
                    Quantity: (
                    {measure}
                    )
                    <Observer render={() => (
                        <input
                            className="form-control"
                            id="qte"
                            type="number"
                            value={cartItem.qty}
                            onChange={(e) => cartItem.changeQty(e.target.value)}
                        />
                    )}
                    />
                </label>
                <Observer>
                    {() => (cart.exists(cartItem) ? (
                        <input
                            className="btn btn-primary my-2"
                            disabled={cart.loading}
                            type="submit"
                            value="Remove from Cart"
                        />
                    ) : (
                        <input
                            className="btn btn-primary my-2"
                            disabled={cart.loading}
                            type="submit"
                            value="Place to Cart"
                        />
                    ))}
                </Observer>
            </form>
        </div>
    );
}

export default observer(ProductOrder);
