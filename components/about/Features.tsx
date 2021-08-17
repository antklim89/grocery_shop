import ReactMarkdown from 'react-markdown';

import StrapiImage from '~/components/utils/StrapiImage';
import { IFeature } from '~/types';


export default function Features({ features }: {features: IFeature[]}): JSX.Element {
    return (
        <section className="mb-5 py-2 bg-dark text-white">
            <div className="container">
                <div className="row g-2">
                    {features.map(({ feature, image, title, id }) => (
                        <div className="col-12 col-md-6 col-xl-4 align-items-stretch" key={id}>
                            <section className="card bg-white text-dark h-100">
                                <StrapiImage
                                    alt={title}
                                    blurDataURL={image.formats.thumbnail.url}
                                    className="card-img-top"
                                    height={198}
                                    objectFit="cover"
                                    placeholder="blur"
                                    src={image.url}
                                    width={400}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h3 className="card-title text-center text-uppercase">{title}</h3>
                                    <ReactMarkdown className="card-text mt-auto">{feature}</ReactMarkdown>
                                </div>
                            </section>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
