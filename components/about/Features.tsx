import Image from 'next/image';

import { IFeature } from '~/types';


export default function Features({ features }: {features: IFeature[]}): JSX.Element {
    return (
        <section className="mb-5 py-2 bg-dark text-light">
            <div className="container">
                <h1 className="text-center">Features</h1>
                <div className="row g-2">
                    {features.map((feature) => (
                        <section className="card col-lg-3 col-md-6 col-sm-12 bg-dark" key={feature.id}>
                            <Image
                                alt={feature.title}
                                className="card-img-top"
                                height={272}
                                objectFit="cover"
                                src={feature.image.url}
                                width={100}
                            />
                            <div>
                                <h3 className="card-title text-center text-uppercase">{feature.title}</h3>
                                <p className="card-text">{feature.feature}</p>
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </section>
    );
}
