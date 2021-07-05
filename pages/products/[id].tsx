import { GetStaticProps, GetStaticPaths } from 'next';

import Product from '~/components/products/Product';
import Seo from '~/components/Seo';
import { IProduct } from '~/types';


interface ProductPageProps {
    product: IProduct;
}


export default function ProductPage({ product }: ProductPageProps): JSX.Element {
    return (
        <>
            <Seo title={product.name} />
            <Product {...product} />
        </>
    );
}


export const getStaticPaths: GetStaticPaths = async () => {
    const products = await fetch(`${process.env.API_URL}/products`).then<IProduct[]>((d) => d.json());
    const paths = products.map((product) => ({
        params: {
            id: product.id.toString(),
        },
    }));

    return {
        paths,
        fallback: false,
    };
};


export const getStaticProps: GetStaticProps<ProductPageProps, {id: string}> = async ({ params }) => {
    const product = await fetch(`${process.env.API_URL}/products/${params?.id}`).then<IProduct>((d) => d.json());

    product.mainImage.url = `${process.env.API_URL}${product.mainImage.url}`;
    product.mainImage.formats.thumbnail.url = `${process.env.API_URL}${product.mainImage.formats.thumbnail.url}`;

    for (const image of product.images) {
        image.url = `${process.env.API_URL}${image.url}`;
        image.formats.thumbnail.url = `${process.env.API_URL}${image.formats.thumbnail.url}`;
    }


    return {
        props: {
            product,
        },
    };
};
