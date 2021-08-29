import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

import Product from '~/components/products/Product';
import Loading from '~/components/utils/Loading';
import Seo from '~/components/utils/Seo';
import ProductPageQuery from '~/queries/ProductPageQuery.gql';
import { IProduct } from '~/types';
import fetcher from '~/utils/fetcher';


interface Props {
    product: IProduct;
}

const ProductPage = ({ product }: Props): JSX.Element => {
    const { isFallback } = useRouter();

    if (isFallback) return (
        <>
            <Seo title="Loading" />
            <div className="d-flex justify-content-center p-5">
                <Loading loading />
            </div>
        </>
    );

    return (
        <>
            <Seo title={product.name} />
            <Product {...product} />
        </>
    );
};


export const getStaticPaths: GetStaticPaths = async () => {
    const products = await fetcher<IProduct[]>('/product');

    const paths = products.map((product) => ({ params: { id: product.id.toString() } }));

    return {
        paths,
        fallback: true,
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

    return {
        props: { product },
        revalidate: 1000,
    };
};

export default ProductPage;
