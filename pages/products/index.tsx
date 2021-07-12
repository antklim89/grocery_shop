import { GetStaticProps } from 'next';

import ProductsList from '~/components/products/ProductsList';
import Seo from '~/components/utils/Seo';
import { IProduct } from '~/types';


export default function ProductsPage({ products }: {products: IProduct[]}): JSX.Element {
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
