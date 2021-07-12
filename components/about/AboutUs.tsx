import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import { AboutAsProps } from '~/types';


export default function AboutUs({ title, image, body }: AboutAsProps): JSX.Element {
    return (
        <section className="my-5">
            <h1 className="text-center">{title}</h1>
            <div className="row">
                <div className="col-lg">
                    <Image
                        alt="about"
                        blurDataURL={`/_next/image?url=${image.url}&w=640&q=10`}
                        height={600}
                        objectFit="cover"
                        placeholder="blur"
                        src={image.url}
                        width={1000}
                    />
                </div>
                <div className="col-lg">
                    <ReactMarkdown>{body}</ReactMarkdown>
                </div>
            </div>
        </section>
    );
}
