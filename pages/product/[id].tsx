import { GetStaticProps, GetStaticPaths } from 'next';

import Product from '~/components/products/Product';
import Seo from '~/components/utils/Seo';
import ProductPageQuery from '~/queries/ProductPageQuery.gql';
import { IProduct } from '~/types';
import fetcher from '~/utils/fetcher';


interface Props {
    product: IProduct;
}

const ProductPage = ({ product }: Props): JSX.Element => {

    return (
        <>
            <Seo
                description={product.description}
                keywords={[product.category.name, product.country.name]}
                title={product.name}
            />
            <Product {...product} />
        </>
    );
};


export const getStaticPaths: GetStaticPaths = async () => {
    const products = await fetcher<IProduct[]>('/product');

    const paths = products.map((product) => ({ params: { id: product.id.toString() } }));

    return {
        paths,
        fallback: false,
    };
};


export const getStaticProps: GetStaticProps<Props, {id: string}> = async ({ params }) => {
    if (!params || !params.id || Number.isNaN(Number(params.id))) {
        return { notFound: true };
    }

    const { product } = await fetcher<Props>(
        ProductPageQuery,
        { id: Number(params.id) },
    );

    if (!product) {
        return { notFound: true };
    }

    return { props: { product } };
};

export default ProductPage;
