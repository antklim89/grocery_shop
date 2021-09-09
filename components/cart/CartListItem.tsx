import { Observer } from 'mobx-react-lite';
import Image from 'next/image';
import Link from 'next/link';
import { FC, memo, useCallback } from 'react';

import { useCart } from './CartProvider';

import Price from '~/components/utils/Price';
import SwitchToggle from '~/components/utils/SwitchToggle';
import { API_URL } from '~/constants';
import { CartItemStore } from '~/store/CartItemStore';


const CartListItem: FC<{cartItem: CartItemStore}> = ({ cartItem }) => {
    const cart = useCart();
    const { product } = cartItem;

    const handleToggle = useCallback((e) => cartItem.changeInOrder(e.currentTarget.checked), [cartItem]);

    return (
        <section className="row list-group-item d-flex">
            <div className="col-lg-2 col-4">
                <Image
                    unoptimized
                    alt={product.name}
                    height={120}
                    src={product.url.startsWith('http') ? product.url : `${API_URL}${product.url}`}
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
                    <Observer>
                        {() => (
                            <input
                                className="form-control"
                                type="number"
                                value={cartItem.qty}
                                onChange={(e) => cartItem.changeQty(e.target.value)}
                            />
                        )}
                    </Observer>
                </label>
                <div className="d-flex">
                    <Observer>
                        {() => (
                            <SwitchToggle
                                checked={cartItem.inOrder}
                                label="In order: "
                                onChange={handleToggle}
                            />
                        )}
                    </Observer>
                    <button
                        className="btn btn-outline-danger btn-lg p-1 align-self-end"
                        type="button"
                        onClick={() => cart.remove(cartItem)}
                    >
                        <i className="bi bi-trash" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default memo(CartListItem);
