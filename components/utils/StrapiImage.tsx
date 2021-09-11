import Image, { ImageProps } from 'next/image';
import { FC, useCallback } from 'react';

import { API_URL } from '~/constants';
import { IStrapiImage, StripiFormatType } from '~/types';


type Props = Omit<ImageProps, 'src'|'width'|'height'| 'blurDataURL'> & {
    image: IStrapiImage
    width: number
    height: number
}

function getImage(type: StripiFormatType, src: string, image: IStrapiImage): string {
    const imageFormat = image.formats[type];
    return `${src}${imageFormat ? imageFormat.url : image.url}`;
}

const StrapiImage: FC<Props> = ({
    image,
    width,
    height,
    alt,
    ...props
}) => {

    const loader = useCallback(({ src, width: loaderWidth }: {src: string, width: number}) => {
        switch (loaderWidth) {
        case 640:
            return getImage('thumbnail', src, image);
        case 750: case 828: case 1080:
            if (width < 320) return getImage('thumbnail', src, image);
            return getImage('small', src, image);
        case 1200: case 1920:
            if (width < 320) return getImage('thumbnail', src, image);
            if (width < 640) return getImage('small', src, image);
            return getImage('medium', src, image);
        case 2048: case 3840:
            if (width < 320) return getImage('thumbnail', src, image);
            if (width < 640) return getImage('small', src, image);
            if (width < 1080) return getImage('medium', src, image);
            return getImage('large', src, image);
        default:
            return `${src}${image.url}`;
        }
    }, [image.url]);


    const blurDataURL = image.url.startsWith('http') ? image.formats.thumbnail.url : `${API_URL}${image.formats.thumbnail.url}`;
    const src = image.url.startsWith('http') ? '' : API_URL;

    return (
        <Image
            alt={alt}
            layout="responsive"
            placeholder="blur"
            src={{ src, blurDataURL, width, height }}
            {...props}
            loader={loader}
        />
    );
};

export default StrapiImage;
