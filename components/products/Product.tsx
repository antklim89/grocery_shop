import ProductCarousel from './ProductCarousel';

import { IProduct } from '~/types';


export default function Product({ name, images }: IProduct): JSX.Element {
    return (
        <div className="container my-5">
            <h1 className="text-center mb-1 text-dark">{name}</h1>
            <ProductCarousel images={images} />
        </div>
    );
}
