import Image from 'next/image';
import Link from 'next/link';

import { IProduct } from '~/types';


export default function ProductCard({
    name, price, country, id, type, mainImage,
}: IProduct): JSX.Element {
    return (
        <div className="col-3">
            <article className="card">
                <span className="card-footer bg-primary text-white m-0 text-uppercase">
                    {type}
                    {' '}
                    -
                    {' '}
                    {country}
                </span>
                <Image
                    alt={name}
                    blurDataURL={mainImage.formats.thumbnail.url}
                    className="card-img-top"
                    height={272}
                    placeholder="blur"
                    src={mainImage.url}
                    width={400}
                />
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p className="card-text">
                        Price: $
                        {price}
                    </p>
                    <Link href={`/products/${id}`}>
                        <a className="btn btn-outline-primary">View Details</a>
                    </Link>
                </div>
            </article>
        </div>
    );
}
