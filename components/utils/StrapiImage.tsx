import Image, { ImageProps } from 'next/image';
import { FC } from 'react';


type Props = Omit<ImageProps, 'src'|'width'|'height'> & {
    width: number
    height: number
    src: string
}

const StrapiImage: FC<Props> = ({
    blurDataURL, src, alt, width, height, ...props
}) => {
    const url = src.startsWith('http')
        ? src
        : `${process.env.NEXT_PUBLIC_API_URL || ''}${src}`;

    const blurUrl = src.startsWith('http')
        ? blurDataURL
        : `${process.env.NEXT_PUBLIC_API_URL || ''}${blurDataURL}`;

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

export default StrapiImage;
