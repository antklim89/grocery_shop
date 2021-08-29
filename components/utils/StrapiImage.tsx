import Image, { ImageProps } from 'next/image';
import { FC, memo } from 'react';

import { API_URL } from '~/constants';


type Props = Omit<ImageProps, 'src'|'width'|'height'> & {
    width: number
    height: number
    src: string
}

const StrapiImage: FC<Props> = ({
    blurDataURL, src, alt, width, height, ...props
}) => {
    const url = src.startsWith('http') ? src : `${API_URL || ''}${src}`;
    const blurUrl = src.startsWith('http') ? blurDataURL : `${API_URL || ''}${blurDataURL}`;

    return (
        <Image
            alt={alt}
            placeholder="blur"
            src={{
                src: url,
                blurDataURL: blurUrl,
                width,
                height,
            }}
            {...props}
        />
    );
};

export default memo(StrapiImage);
