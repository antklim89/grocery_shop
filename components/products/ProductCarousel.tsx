import Image from 'next/image';
import { useEffect } from 'react';

import { StrapiImage } from '~/types';


interface PropTypes {
    images: StrapiImage[];
}

export default function ProductCarousel({ images }: PropTypes): JSX.Element {
    useEffect(() => {
        import('bootstrap/js/src/carousel');
    }, []);

    return (
        <div className="carousel slide" data-bs-ride="carousel" id="images-carousel">
            <div className="carousel-inner">
                {images.map((img, index) => (
                    <div className={`carousel-item${index === 0 ? ' active' : ''}`} key={img.id}>
                        <Image
                            alt={img.alternativeText || `carousel-image-${index + 1}`}
                            blurDataURL={`/_next/image?url=${img.url}&w=640&q=10`}
                            className="img-fluid"
                            height={720}
                            objectPosition="center"
                            placeholder="blur"
                            src={img.url}
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
}
