import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import Price from '~/components/utils/Price';
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
    return (
        <div className="col-12 col-sm-6 col-lg-3 align-items-stretch">
            <article className="card shadow-sm h-100">
                <span className="card-footer bg-primary text-white m-0 text-uppercase">
                    {category.name}
                    &nbsp;-&nbsp;
                    {country.name}
                </span>
                <Image
                    alt={name}
                    blurDataURL={`${process.env.NEXT_PUBLIC_API_URL}${mainImage.formats.thumbnail.url}`}
                    className="card-img-top"
                    height={272}
                    placeholder="blur"
                    src={`${process.env.NEXT_PUBLIC_API_URL}${mainImage.url}`}
                    width={400}
                />
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
                    <Link href={`/products/${id}`}>
                        <a className="btn btn-outline-primary">View Details</a>
                    </Link>
                </div>
            </article>
        </div>
    );
};

export default ProductCard;

