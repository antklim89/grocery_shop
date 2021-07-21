import ProductCard from './ProductCard';

import { IProduct } from '~/types';


interface PropTypes {
    products: IProduct[]
}

export default function ProductsList({ products }: PropTypes): JSX.Element {
    return (
        <div className="container  my-3">
            <div className="row g-2">
                {products.map((product) => (
                    <ProductCard {...product} key={product.id} />
                ))}
            </div>
        </div>
    );
}
