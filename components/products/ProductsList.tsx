import { FC } from 'react';

import ProductCard from './ProductCard';

import { IProductPreview } from '~/types';


interface Props {
    products: IProductPreview[]
}

const ProductsList: FC<Props> = ({ products }) => {
    return (
        <div className="my-3">
            {products.length > 0
                ? (
                    <div className="row g-2">
                        {products.map((product) => (
                            <ProductCard {...product} key={product.id} />
                        ))}
                    </div>
                )
                : null}
        </div>
    );
};

export default ProductsList;

