import Image from 'next/image';

import { IFeature } from '~/types';


export default function Features({ features }: {features: IFeature[]}): JSX.Element {
    return (
        <section className="mb-5 py-2 bg-dark text-light">
            <div className="container">
                <h1 className="text-center">Features</h1>
                <div className="row gx-2">
                    {features.map((feature) => (
                        <div className="col-xl-3 col-lg-6 col-sm-12" key={feature.id}>
                            <section className="card  bg-light text-dark">
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
                                    <p className="card-text">{feature.feature}</p>
                                </div>
                            </section>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
