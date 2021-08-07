import Link from 'next/link';

import StrapiImage from '~/components/utils/StrapiImage';
import style from '~/styles/Hero.module.scss';
import { HeroProps } from '~/types';


export default function Hero({ image, title, text }: HeroProps): JSX.Element {
    return (
        <section className={style.section}>
            <StrapiImage
                alt="hero"
                blurDataURL={image.formats.thumbnail.url}
                className="img-fluid d-block mx-auto"
                height={500}
                layout="responsive"
                objectFit="cover"
                placeholder="blur"
                src={image.url}
                width={1280}
            />
            <div className={style.text}>
                <div className="m-auto">
                    <h1 className="text-center fs-1">{title}</h1>
                    <p className="text-center d-none d-lg-block fs-1">{text}</p>
                    <Link passHref href="/product">
                        <button className="btn btn-outline-primary btn-lg d-block mx-auto" type="button">
                            Get Catalog
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
