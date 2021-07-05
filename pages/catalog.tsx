import { GetStaticProps } from 'next';

import { Product } from '~/types';


export default function Catalog({ products }: {products: Product[]}): JSX.Element {
    return (
        <>
            {products.map((product) => (
                <p key={product.id}>{product.name}</p>
            ))}
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
