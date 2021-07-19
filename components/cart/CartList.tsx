import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import Link from 'next/link';

import { Price } from '~/components/utils/Price';
import { useCart } from '~/utils/useCart';


function imagePath(url: string) {
    return `${process.env.NEXT_PUBLIC_API_URL}${url}`;
}

function CartList(): JSX.Element {
    const cart = useCart();

    return (
        <div className="container">
            <div className="list-group mt-5">
                {cart.products?.map((cartItem) => (
                    <section className="row list-group-item d-flex" key={cartItem.id}>
                        <div className="col-lg-2 col-4">
                            <Image
                                alt={cartItem.product.name}
                                blurDataURL={imagePath(cartItem.product.mainImage.formats.thumbnail.url)}
                                height={120}
                                placeholder="blur"
                                src={imagePath(cartItem.product.mainImage.url)}
                                width={100}
                            />
                        </div>
                        <div className="col-8">
                            <Link passHref href="/">
                                <a><h2 className="mb-1">{cartItem.product.name}</h2></a>
                            </Link>
                            <p className="mb-1">{cartItem.product.country}</p>
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
                            <label className="form-label my-2" htmlFor={`qte-${cartItem.id}`}>
                                Quantity: (
                                {cartItem.product.measure}
                                )
                                <input
                                    className="form-control"
                                    id={`qte-${cartItem.id}`}
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
        </div>
    );
}

export default observer(CartList);
