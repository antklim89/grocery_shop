import Image from 'next/image';
import Link from 'next/link';

import style from '~/styles/Hero.module.scss';
import { HeroProps } from '~/types';


export default function Hero({ image, title, text }: HeroProps): JSX.Element {
    return (
        <section className="position-relative">
            <Image
                alt="hero"
                blurDataURL={`/_next/image?url=${image.url}&w=640&q=10`}
                className="img-fluid d-block mx-auto"
                height={500}
                layout="responsive"
                objectFit="cover"
                placeholder="blur"
                src={image.url}
                width={1280}
            />
            <div className={`${style.text} p-2 mx-auto position-absolute top-50 translate-middle-y w-100`}>
                <div className="w-50 mx-auto">
                    <h1 className="text-center fs-1">{title}</h1>
                    <p className="text-center d-none d-lg-block fs-1">{text}</p>
                    <Link passHref href="/products">
                        <button className="btn btn-outline-primary btn-lg d-block mx-auto" type="button">
                            Get Catalog
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
