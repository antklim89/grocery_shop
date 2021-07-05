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
                        height={600}
                        objectFit="cover"
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
