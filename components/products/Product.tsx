import ReactMarkdown from 'react-markdown';

import ProductCarousel from './ProductCarousel';
import ProductOrder from './ProductOrder';

import { IProduct } from '~/types';


export default function Product({ images, description, ...product }: IProduct): JSX.Element {
    return (
        <article className="container my-5">
            <div className="row">
                <div className="col-lg-8 col-12">
                    <ProductCarousel images={images} />
                </div>
                <div className="col-lg-4 col-12">
                    <ProductOrder {...product} />
                </div>
            </div>
            <ReactMarkdown>{description}</ReactMarkdown>
        </article>
    );
}
