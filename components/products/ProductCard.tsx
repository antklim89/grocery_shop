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
    unit,
    measure,
    discount,
}) => {
    const cart = useCart();
    const isPoroductInCart = cart.cartItems.findIndex((i) => +i.product.id === +id) >= 0;
    return (
        <div className="col-12 col-sm-6 col-lg-3 align-items-stretch">
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
                        blurDataURL={`${process.env.NEXT_PUBLIC_API_URL}${mainImage.formats.thumbnail.url}`}
                        className="card-img-top"
                        height={272}
                        placeholder="blur"
                        src={`${process.env.NEXT_PUBLIC_API_URL}${mainImage.url}`}
                        width={400}
                    />
                    {isPoroductInCart && (
                        <i className="bi bi-cart-check position-absolute end-0 p-1 m-1 rounded text-white bg-primary" />
                    )}

                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                    <h2 className="card-title">{name}</h2>
                    <p className="card-text flex-shrink-0">
                        <Price
                            discount={discount}
                            measure={measure}
                            price={price}
                            unit={unit}
                        />
                    </p>
                    <Link href={`/product/${id}`}>
                        <a className="btn btn-outline-primary">View Details</a>
                    </Link>
                </div>
            </article>
        </div>
    );
};

export default observer(ProductCard);

