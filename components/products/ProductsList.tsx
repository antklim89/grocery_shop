import ProductCard from './ProductCard';

import { IProductPreview } from '~/types';


interface PropTypes {
    products: IProductPreview[]
}

export default function ProductsList({ products }: PropTypes): JSX.Element {
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
}
