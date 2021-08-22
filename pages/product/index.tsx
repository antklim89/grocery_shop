import { GetServerSideProps } from 'next';

import ProductsBlock from '~/components/products/ProductsBlock';
import Seo from '~/components/utils/Seo';
import ProductsPageQuery from '~/queries/ProductsPageQuery.gql';
import { IProductPreview, ICatalogItem } from '~/types';
import fetcher from '~/utils/fetcher';


interface ProductsPageQuery {
    products: IProductPreview[]
    categories: ICatalogItem[]
    countries: ICatalogItem[]
}

export default function ProductsPage({ products, categories, countries }: ProductsPageQuery): JSX.Element {
    return (
        <>
            <Seo title="Products" />
            <ProductsBlock categories={categories} countries={countries} initProducts={products} />
        </>
    );
}

export const getServerSideProps: GetServerSideProps<ProductsPageQuery> = async (args) => {
    const props = await fetcher<ProductsPageQuery>(
        ProductsPageQuery,
        args.query,
    );

    return { props };
};

