import Link from 'next/link';
import { memo } from 'react';

import StrapiImage from '~/components/utils/StrapiImage';
import style from '~/styles/Hero.module.scss';
import { HeroProps } from '~/types';


const Hero = ({ image, title, text }: HeroProps): JSX.Element => {
    return (
        <section className={style.section}>
            <StrapiImage
                alt="hero"
                className="img-fluid d-block mx-auto"
                height={500}
                image={image}
                objectFit="cover"
                width={1280}
            />
            <div className={style.text}>
                <div className="m-auto">
                    <h1 className="text-center fs-1">{title}</h1>
                    <p className="text-center d-none d-lg-block fs-1">{text}</p>
                    <Link passHref href="/product">
                        <button className="btn btn-outline-primary btn-lg d-block mx-auto" type="button">
                            Show Products
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default memo(Hero);
