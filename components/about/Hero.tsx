import Image from 'next/image';
import Link from 'next/link';

import { HeroProps } from '~/types';


export default function Hero({ image, title, text }: HeroProps): JSX.Element {
    return (
        <section className="position-relative">
            <Image
                alt="hero"
                height="60vh"
                layout="responsive"
                objectFit="cover"
                src={image.url}
                width="100%"
            />
            <div className="mx-auto position-absolute top-50 translate-middle-y w-100">
                <div className="container">
                    <h1 className="text-center fs-1 text-light">{title}</h1>
                    <p className="text-center d-none d-md-block fs-1 text-light">{text}</p>
                    <Link passHref href="/products">
                        <button className="btn btn-outline-light btn-lg d-block mx-auto" type="button">
                            Get Catalog
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
