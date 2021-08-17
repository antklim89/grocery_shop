import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { FC } from 'react';


import CatalogItem from './CatalogItem';

import { useCart } from '~/components/cart/CartProvider';
import Price from '~/components/utils/Price';
import StrapiImage from '~/components/utils/StrapiImage';
import { IProductPreview } from '~/types';


const ProductCard: FC<IProductPreview> = ({
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
}) => {
    const cart = useCart();
    const isPoroductInCart = cart.cartItems.findIndex((i) => +i.product.id === +id) >= 0;
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
                </div>
            </article>
        </div>
    );
};

export default observer(ProductCard);

