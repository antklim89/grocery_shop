import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Catalog from '~/components/products/Catalog';
import ProductsBlock from '~/components/products/ProductsBlock';
import ProductsList from '~/components/products/ProductsList';
import Seo from '~/components/utils/Seo';
import ProductsPageQuery from '~/queries/ProductsPageQuery.gql';
import { IProductPreview } from '~/types';
import fetcher from '~/utils/fetcher';
import useBootstrap from '~/utils/useBootstrap';


export default function ProductsPage(): JSX.Element {
    const [products, setProducts] = useState<IProductPreview[]>([]);
    const router = useRouter();
    const query = router.asPath.replace('/products', '');

    useBootstrap('Offcanvas');

    useEffect(() => {
        (async () => {
            try {
                const data = await fetcher<{products: IProductPreview[]}>(
                    ProductsPageQuery,
                    // { country: 'Egypt' },
                );
                setProducts(data.products);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [query]);

    return (
        <>
            <Seo title="Products" />
            <ProductsBlock
                catalog={<Catalog />}
                productsList={<ProductsList products={products} />}
            />
        </>
    );
}
