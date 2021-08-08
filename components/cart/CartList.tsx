import { observer } from 'mobx-react-lite';
import Link from 'next/link';

import CreateOrderModal from './CreateOrderModal';

import { useCart } from '~/components/cart/CartProvider';
import Price from '~/components/utils/Price';
import ProtectedComponent from '~/components/utils/ProtectedComponent';
import StrapiImage from '~/components/utils/StrapiImage';
import getTotalPrice from '~/utils/getTotalPrice';


function CartList(): JSX.Element {
    const cart = useCart();

    if (!cart.cartItems || cart.cartItems.length === 0) {
        return (
            <p className="h1 text-center text-uppercase">Cart is Empty</p>
        );
    }

    const totalPrice = getTotalPrice(cart.cartItems);

    return (
        <div className="container">
            <div className="list-group mt-5">
                {cart.cartItems.map((cartItem) => (
                    <section className="row list-group-item d-flex" key={cartItem.product.id}>
                        <div className="col-lg-2 col-4">
                            <StrapiImage
                                alt={cartItem.product.name}
                                // blurDataURL={cartItem.product.images[0].formats.thumbnail.url}
                                height={120}
                                // placeholder="blur"
                                src={cartItem.product.images[0].formats.thumbnail.url}
                                width={100}
                            />
                        </div>
                        <div className="col-8">
                            <Link passHref href="/">
                                <a><h2 className="mb-1">{cartItem.product.name}</h2></a>
                            </Link>
                            <p className="mb-1">{cartItem.product.country.name}</p>
                            <small>
                                <Price
                                    discount={cartItem.product.discount}
                                    measure={cartItem.product.measure}
                                    price={(cartItem.product.price / cartItem.product.unit) * cartItem.qty}
                                    unit={cartItem.qty}
                                />
                            </small>
                        </div>
                        <div className="col-lg-2 col-12 d-flex flex-lg-column justify-content-between">
                            <label className="form-label my-2" htmlFor={`qte-${cartItem.product.id}`}>
                                Quantity: (
                                {cartItem.product.measure}
                                )
                                <input
                                    className="form-control"
                                    id={`qte-${cartItem.product.id}`}
                                    type="number"
                                    value={cartItem.qty}
                                    onChange={(e) => cartItem.changeQty(Number(e.target.value))}
                                />
                            </label>
                            <button
                                className="btn btn-outline-danger btn-lg p-1 align-self-end"
                                type="button"
                                onClick={() => cart.toggle(cartItem)}
                            >
                                <i className="bi bi-trash" />
                            </button>
                        </div>
                    </section>
                ))}
            </div>
            <div className="my-2 d-flex flex-column">
                <div className="my-5 align-self-end">
                    <p className="h2">
                        Total Price:
                        <br />
                        {totalPrice.toFixed(2)}
                        $
                    </p>
                </div>
                <ProtectedComponent
                    render={(
                        <Link href="/login">
                            <a className="btn btn-primary btn-lg align-self-center">
                                Login to confirm order...
                            </a>
                        </Link>
                    )}
                >
                    <CreateOrderModal />
                </ProtectedComponent>
            </div>
        </div>
    );
}

export default observer(CartList);
