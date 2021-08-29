import { useRouter } from 'next/router';
import { FC, useCallback, useMemo, useRef, useState } from 'react';

import Catalog from './Catalog';
import ProductsList from './ProductsList';
import SearchProducts from './SearchProducts';
import SortProducts from './SortProducts';

import Loading from '~/components/utils/Loading';
import { PRODUCTS_LIMIT } from '~/constants';
import ProductsPageQuery from '~/queries/ProductsPageQuery.gql';
import { IProductPreview, ICatalogItem } from '~/types';
import fetcher from '~/utils/fetcher';
import useAsyncEffect from '~/utils/useAsyncEffect';


interface ProductsPageProps {
    initProducts: IProductPreview[]
    categories: ICatalogItem[]
    countries: ICatalogItem[]
}


const ProductsBlock: FC<ProductsPageProps> = ({ initProducts, categories, countries }) => {
    const [products, setProducts] = useState<IProductPreview[]>(() => initProducts);
    const [hasNext, setHasNext] = useState(() => initProducts.length >= PRODUCTS_LIMIT);
    const [loading, setLoading] = useState(false);

    const firstRender = useRef(true);

    const router = useRouter();

    const query = router.asPath.includes('?')
        ? router.asPath.replace(/^.+\?/, '')
        : '';
    const page = useMemo(() => ({ value: 1 }), [query]);

    const searchParamsObject = useMemo(() => {
        const searchParams = new URLSearchParams(query);
        return Object.fromEntries(searchParams.entries());
    }, [query]);

    const fetchProducts = useCallback(async (offset?: number): Promise<IProductPreview[]> => {
        setLoading(true);

        const data = await fetcher<{products: IProductPreview[]}>(
            ProductsPageQuery,
            { ...searchParamsObject, offset },
        );

        setHasNext(data.products.length >= PRODUCTS_LIMIT);
        setLoading(false);
        return data.products;
    }, [searchParamsObject]);


    useAsyncEffect(async () => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        try {
            const newProducts = await fetchProducts();
            setProducts(newProducts);
        } catch (error) {
            console.error(error);
        }
    }, [query]);

    const handleNext = useCallback(async () => {
        const newProducts = await fetchProducts(page.value * PRODUCTS_LIMIT);
        page.value += 1;
        setProducts((prev) => [...prev, ...newProducts]);
    }, [searchParamsObject]);

    const catalog = useMemo(() => <Catalog categories={categories} countries={countries} />, []);

    return (
        <div className="container">
            <div className="d-block d-xl-none">
                <button
                    className="btn btn-primary"
                    data-bs-target="#catalog-offcanvas"
                    data-bs-toggle="offcanvas"
                    type="button"
                >
                    OPEN CATALOG
                </button>
                <div
                    aria-labelledby="offcanvasCalalogLabel"
                    className="offcanvas offcanvas-start"
                    id="catalog-offcanvas"
                    tabIndex={-1}
                >
                    <div className="offcanvas-header">
                        <button
                            aria-label="Close"
                            className="btn-close text-reset ms-auto"
                            data-bs-dismiss="offcanvas"
                            type="button"
                        />
                    </div>
                    <div className="offcanvas-body">
                        {catalog}
                    </div>
                </div>
            </div>
            <div className="mb-4 mx-4">
                <SearchProducts />
            </div>
            <div className="row">
                <div className="col-12 col-xl-2 d-none d-xl-block">
                    {catalog}
                </div>
                <div className="col-12 col-xl-10 position-relative">
                    <div className="breadcrumb d-flex justify-content-end me-3">
                        <SortProducts className="breadcrumb-item" value="discountPrice">
                            Sort by Price
                        </SortProducts>
                        <SortProducts className="breadcrumb-item" value="id">
                            Sort by Recency
                        </SortProducts>
                    </div>
                    {products.length === 0
                        ? (
                            <div className="h2 text-center my-5">Nothing found...</div>
                        )
                        : (
                            <ProductsList products={products} />
                        )}
                    <Loading className="position-absolute top-0 left-50" loading={loading} />

                    {(hasNext) && (
                        <div className="text-center mt-4">
                            <button
                                className="btn btn-primary"
                                disabled={loading}
                                type="button"
                                onClick={handleNext}
                            >
                                SHOW MORE
                                <Loading loading={loading} size="sm" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsBlock;
