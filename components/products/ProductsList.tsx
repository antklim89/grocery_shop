import ProductCard from './ProductCard';

import { IProduct } from '~/types';


interface PropTypes {
    products: IProduct[]
}

export default function ProductsList({ products }: PropTypes): JSX.Element {
    return (
        <div className="container  my-5">
            <div className="row">
                {products.map((product) => (
                    <ProductCard {...product} key={product.id} />
                ))}
            </div>
        </div>
    );
}
