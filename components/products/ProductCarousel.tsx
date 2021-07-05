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
                    <div className={`carousel-item${index === 1 ? ' active' : ''}`} key={img.id}>
                        <Image
                            alt={img.alternativeText}
                            blurDataURL={img.formats.thumbnail.url}
                            className="d-block w-100"
                            height={500}
                            layout="fixed"
                            placeholder="blur"
                            src={img.url}
                            width={500}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
