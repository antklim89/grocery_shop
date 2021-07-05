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

    for (const product of products) {
        product.mainImage.url = `${process.env.API_URL}${product.mainImage.url}`;
        product.mainImage.formats.thumbnail.url = `${process.env.API_URL}${product.mainImage.formats.thumbnail.url}`;

        for (const image of product.images) {
            image.url = `${process.env.API_URL}${image.url}`;
            image.formats.thumbnail.url = `${process.env.API_URL}${image.formats.thumbnail.url}`;
        }
    }

    return {
        props: { products },
    };
};
