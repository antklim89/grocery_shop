import { GetServerSideProps } from 'next';

import ProductsBlock from '~/components/products/ProductsBlock';
import Seo from '~/components/utils/Seo';
import ProductsPageQuery from '~/queries/ProductsPageQuery.gql';
import { IProductPreview, ICatalogItem } from '~/types';
import fetcher from '~/utils/fetcher';


interface ProductsPageProps {
    products: IProductPreview[]
    categories: ICatalogItem[]
    countries: ICatalogItem[]
}

const ProductsPage = ({ products, categories, countries }: ProductsPageProps): JSX.Element => {
    const categoriesNames = categories.map((item) => item.name);
    const countiesNames = countries.map((item) => item.name);

    return (
        <>
            <Seo description="Product list." title="Products"/* keywords={[...categoriesNames, ...countiesNames]} */ />
            {/* <ProductsBlock categories={categories} countries={countries} initProducts={products} /> */}
        </>
    );
};

// export const getServerSideProps: GetServerSideProps<ProductsPageProps> = async (args) => {
//     const props = await fetcher<ProductsPageProps>(
//         ProductsPageQuery,
//         args.query,
//     );

//     return { props };
// };

export default ProductsPage;
