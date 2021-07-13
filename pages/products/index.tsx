import { GetStaticProps } from 'next';

import ProductsList from '~/components/products/ProductsList';
import Seo from '~/components/utils/Seo';
import { IProduct } from '~/types';


interface Props {
    products: IProduct[];
}

export default function ProductsPage({ products }: Props): JSX.Element {
    return (
        <>
            <Seo title="Products" />
            <ProductsList products={products} />
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const products = await fetch(`${process.env.API_URL}/products`).then<IProduct[]>((d) => d.json());


    return {
        props: { products },
    };
};
