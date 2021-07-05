import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import { IFeature } from '~/types';


export default function Features({ features }: {features: IFeature[]}): JSX.Element {
    return (
        <section className="mb-5 py-2 bg-dark text-white">
            <div className="container">
                <h1 className="text-center">Features</h1>
                <div className="row g-2">
                    {features.map((feature) => (
                        <div className="col-xl-3 col-md-6 col-xs-12 align-items-stretch" key={feature.id}>
                            <section className="card bg-white text-dark h-100">
                                <Image
                                    alt={feature.title}
                                    className="card-img-top"
                                    height={198}
                                    objectFit="cover"
                                    src={feature.image.url}
                                    width={400}
                                />
                                <div className="card-body">
                                    <h3 className="card-title text-center text-uppercase">{feature.title}</h3>
                                    <ReactMarkdown className="card-text">{feature.feature}</ReactMarkdown>
                                </div>
                            </section>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
