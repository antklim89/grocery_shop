import { FC } from 'react';

import StrapiImage from '~/components/utils/StrapiImage';
import { IStrapiImage } from '~/types';
import useBootstrap from '~/utils/useBootstrap';


interface Props {
    images: IStrapiImage[];
}


const ProductCarousel: FC<Props> = ({ images }) => {
    useBootstrap('Carousel');

    return (
        <div className="carousel slide" data-bs-ride="carousel" id="images-carousel">
            <div className="carousel-inner">
                {images.map((image, index) => (
                    <div className={`carousel-item${index === 0 ? ' active' : ''}`} key={image.id}>
                        <StrapiImage
                            alt={image.alternativeText || `carousel-image-${index + 1}`}
                            blurDataURL={`${process.env.NEXT_PUBLIC_API_URL}${image.formats.thumbnail.url}`}
                            className="img-fluid"
                            height={720}
                            objectPosition="center"
                            placeholder="blur"
                            src={`${process.env.NEXT_PUBLIC_API_URL}${image.url}`}
                            width={1200}
                        />
                    </div>
                ))}
            </div>
            <button
                className="carousel-control-prev bg-transparent-25"
                data-bs-slide="prev"
                data-bs-target="#images-carousel"
                type="button"
            >
                <span aria-hidden className="carousel-control-prev-icon" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next bg-transparent-25"
                data-bs-slide="next"
                data-bs-target="#images-carousel"
                type="button"
            >
                <span aria-hidden className="carousel-control-next-icon" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default ProductCarousel;
