import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import Link from 'next/link';


import CartFormModal from './CartFormModal';

import { useAuth } from '~/components/auth/AuthProvider';
import { useCart } from '~/components/cart/CartProvider';
import Price from '~/components/utils/Price';
import getTotalPrice from '~/utils/getTotalPrice';


function imagePath(url: string) {
    return `${process.env.NEXT_PUBLIC_API_URL}${url}`;
}

function CartList(): JSX.Element {
    const cart = useCart();
    const auth = useAuth();

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
                            <Image
                                alt={cartItem.product.name}
                                blurDataURL={imagePath(cartItem.product.images[0].formats.thumbnail.url)}
                                height={120}
                                placeholder="blur"
                                src={imagePath(cartItem.product.images[0].url)}
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
                    <p className="h3">
                        Total Price:
                        <br />
                        {totalPrice}
                    </p>
                </div>
                {
                    auth.isAuth ? (
                        <CartFormModal />
                    ) : (
                        <Link href="/login">
                            <a className="btn btn-primary btn-lg align-self-center">
                                Login to confirm order...
                            </a>
                        </Link>
                    )
                }
            </div>
        </div>
    );
}

export default observer(CartList);
