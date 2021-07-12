import Image from 'next/image';
import Link from 'next/link';

import { Price } from '~/components/utils/Price';
import { IProduct } from '~/types';


export default function ProductCard({
    name, price, country, id, type, mainImage, unit, measure, discount,
}: IProduct): JSX.Element {
    return (
        <div className="col-sm-12 col-md-6 col-lg-3">
            <article className="card shadow-sm h-100">
                <span className="card-footer bg-primary text-white m-0 text-uppercase">
                    {type}
                    {' '}
                    -
                    {' '}
                    {country}
                </span>
                <Image
                    alt={name}
                    blurDataURL={`/_next/image?url=${mainImage.url}&w=640&q=10`}
                    className="card-img-top"
                    height={272}
                    placeholder="blur"
                    src={mainImage.url}
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
}
