import { FC } from 'react';

import ProductCard from './ProductCard';

import { IProductPreview } from '~/types';


interface Props {
    products: IProductPreview[]
}

const ProductsList: FC<Props> = ({ products }) => {
    return (
        <div className="container  my-3">
            {products.length > 0 ? (
                <div className="row g-2">
                    {products.map((product) => (
                        <ProductCard {...product} key={product.id} />
                    ))}
                </div>
            ) : (
                <h5>Nothing found...</h5>
            )}
        </div>
    );
};

export default ProductsList;

