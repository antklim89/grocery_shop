import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { FC } from 'react';


import CatalogItem from './CatalogItem';

import { useCart } from '~/components/cart/CartProvider';
import Price from '~/components/utils/Price';
import StrapiImage from '~/components/utils/StrapiImage';
import { CartItemStore } from '~/store/CartItemStore';
import { IProductPreview } from '~/types';


const ProductCard: FC<IProductPreview> = (product) => {
    const {
        name,
        price,
        country,
        id,
        category,
        mainImage,
        quantityPerUnit,
        unit,
        discount,
        discountPrice,
    } = product;

    const cart = useCart();
    const isPoroductInCart = cart.cartItems.findIndex((cartItem) => Number(cartItem.product.id) === Number(id)) >= 0;

    const handleRemove = () => cart.remove(cart.cartItems.find((cartItem) => cartItem.product.id === id));
    const handlePush = () => cart.push(new CartItemStore({ product, qty: quantityPerUnit }));

    return (
        <div className="col-12 col-lg-6 col-xl-4 align-items-stretch">
            <article className="card shadow-sm h-100 position-relative">
                <div className="card-header m-0 p-1 text-uppercase breadcrumb d-flex justify-content-center">
                    <CatalogItem
                        className="breadcrumb-item"
                        name="category"
                        value={category?.name}
                    />
                    <CatalogItem
                        className="breadcrumb-item"
                        name="country"
                        value={country?.name}
                    />
                </div>
                <div className="position-relative">
                    <StrapiImage
                        alt={name}
                        blurDataURL={mainImage.formats.thumbnail.url}
                        className="card-img-top img-fluid"
                        height={220}
                        layout="responsive"
                        placeholder="blur"
                        src={mainImage.url}
                        width={400}
                    />
                    <div className="position-absolute end-0 top-10 text-white">
                        {isPoroductInCart && (
                            <i className="bi bi-cart-check d-inline-block p-1 m-1 rounded bg-primary" />
                        )}
                        <br />
                        {discount > 0 && (
                            <span className="d-inline-block p-1 m-1 rounded bg-primary">
                                {discount}
                                %
                            </span>
                        )}
                    </div>

                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                    <h2 className="card-title mb-auto">{name}</h2>
                    <div className="my-4">
                        <Price
                            discountPrice={discountPrice}
                            measure={unit}
                            price={price}
                            unit={quantityPerUnit}
                        />
                    </div>
                    <Link href={`/product/${id}`}>
                        <a className="btn btn-outline-primary">View Details</a>
                    </Link>
                    {cart.isProductInCart(id)
                        ? (
                            <button
                                className="btn btn-primary my-2"
                                disabled={cart.loading}
                                type="submit"
                                onClick={handleRemove}
                            >
                                Remove from Cart
                            </button>
                        )
                        : (
                            <button
                                className="btn btn-primary my-2"
                                disabled={cart.loading}
                                type="submit"
                                onClick={handlePush}
                            >
                                Place to Cart
                            </button>
                        )}
                </div>
            </article>
        </div>
    );
};

export default observer(ProductCard);

