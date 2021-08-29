import { Observer } from 'mobx-react-lite';
import Link from 'next/link';
import { FC } from 'react';

import Price from '../utils/Price';
import StrapiImage from '../utils/StrapiImage';

import { useCart } from './CartProvider';

import { CartItemStore } from '~/store/CartItemStore';


const CartListItem: FC<{cartItem: CartItemStore}> = ({ cartItem }) => {
    const cart = useCart();
    const { product } = cartItem;

    return (
        <section className="row list-group-item d-flex">
            <div className="col-lg-2 col-4">
                <StrapiImage
                    alt={product.name}
                    height={120}
                    src={product.images[0].formats.thumbnail.url}
                    width={100}
                />
            </div>
            <div className="col-8">
                <Link passHref href={`/product/${product.id}`}>
                    <a><h2 className="mb-1">{product.name}</h2></a>
                </Link>
                <p className="mb-1">{product.country.name}</p>
                <small>
                    <Price
                        discountPrice={
                            (product.discountPrice / product.quantityPerUnit) * cartItem.qty
                        }
                        measure={product.unit}
                        price={(product.price / product.quantityPerUnit) * cartItem.qty}
                        unit={cartItem.qty}
                    />
                </small>
            </div>
            <div className="col-lg-2 col-12 d-flex flex-lg-column justify-content-between">
                <label className="form-label my-2">
                    Quantity: ({product.unit})
                    <Observer render={() => (
                        <input
                            className="form-control"
                            type="number"
                            value={cartItem.qty}
                            onChange={(e) => cartItem.changeQty(e.target.value)}
                        />
                    )}
                    />
                </label>
                <label className="form-check-label">
                    In order: {'  '}
                    <Observer render={() => (
                        <input
                            checked={cartItem.inOrder}
                            className="form-check-input"
                            type="checkbox"
                            value="on"
                            onChange={(e) => cartItem.changeInOrder(e.currentTarget.checked)}
                        />
                    )}
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
    );
};

export default CartListItem;
