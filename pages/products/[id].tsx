import { GetStaticProps, GetStaticPaths } from 'next';

import Product from '~/components/products/Product';
import Seo from '~/components/utils/Seo';
import ProductPageQuery from '~/queries/ProductPageQuery.gql';
import { IProduct } from '~/types';
import client from '~/utils/graphql-request';


interface Props {
    product: IProduct;
}


export default function ProductPage({ product }: Props): JSX.Element {
    return (
        <>
            <Seo title={product.name} />
            <Product {...product} />
        </>
    );
}


export const getStaticPaths: GetStaticPaths = async () => {
    const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
        .then<IProduct[]>((d) => d.json());

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


export const getStaticProps: GetStaticProps<Props, {id: string}> = async ({ params }) => {
    // const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${params?.id}`)
    //     .then<IProduct>((d) => d.json());

    const props = await client.request<Props>(
        ProductPageQuery,
        { id: params?.id },
    );

    return { props };
};
