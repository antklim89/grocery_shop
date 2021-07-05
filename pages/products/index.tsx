import { GetStaticProps } from 'next';

import ProductsList from '~/components/products/ProductsList';
import Seo from '~/components/Seo';
import { Product } from '~/types';


export default function Products({ products }: {products: Product[]}): JSX.Element {
    return (
        <>
            <Seo title="Cataolog" />
            <ProductsList products={products} />
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const products = await fetch(`${process.env.API_URL}/products`).then<Product[]>((d) => d.json());

    for (const product of products) {
        product.mainImage.url = `${process.env.API_URL}${product.mainImage.url}`;

        for (const image of product.images) {
            image.url = `${process.env.API_URL}${image.url}`;
        }
    }

    return {
        props: { products },
    };
};
