import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import { IFeature } from '~/types';


export default function Features({ features }: {features: IFeature[]}): JSX.Element {
    return (
        <section className="mb-5 py-2 bg-dark text-white">
            <div className="container">
                <div className="row g-2">
                    {features.map(({
                        feature, image, title, id,
                    }) => (
                        <div className="col-12 col-sm-6 col-lg-3 align-items-stretch" key={id}>
                            <section className="card bg-white text-dark h-100">
                                <Image
                                    alt={title}
                                    blurDataURL={`${process.env.NEXT_PUBLIC_API_URL}${image.formats.thumbnail.url}`}
                                    className="card-img-top"
                                    height={198}
                                    objectFit="cover"
                                    placeholder="blur"
                                    src={`${process.env.NEXT_PUBLIC_API_URL}${image.url}`}
                                    width={400}
                                />
                                <div className="card-body">
                                    <h3 className="card-title text-center text-uppercase">{title}</h3>
                                    <ReactMarkdown className="card-text">{feature}</ReactMarkdown>
                                </div>
                            </section>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
