import { FC } from 'react';
import ReactMarkdown from 'react-markdown';

import ProductCarousel from './ProductCarousel';
import ProductOrder from './ProductOrder';

import { IProduct } from '~/types';


const Product: FC<IProduct> = (product) => {
    return (
        <article className="container my-5">
            <div className="row">
                <div className="col-lg-8 col-12">
                    <ProductCarousel images={product.images} />
                </div>
                <div className="col-lg-4 col-12">
                    <ProductOrder {...product} />
                </div>
            </div>
            <ReactMarkdown>{product.description}</ReactMarkdown>
        </article>
    );
};

export default Product;
