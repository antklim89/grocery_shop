import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';


import Catalog from './Catalog';
import ProductsList from './ProductsList';
import SortProducts from './SortProducts';

import Loading from '~/components/utils/Loading';
import ProductsPageQuery from '~/queries/ProductsPageQuery.gql';
import { IProductPreview } from '~/types';
import { PRODUCTS_LIMIT } from '~/utils/constants';
import fetcher from '~/utils/fetcher';


interface FetchNextArgs {
    lastId?: number;
    lastPrice?: number;
    firstId?: number;
    firstPrice?: number;
}

const ProductsBlock: FC = () => {
    const [products, setProducts] = useState<IProductPreview[]>([]);
    const [hasNext, setHasNext] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const query = router.asPath.includes('?') ? router.asPath.replace(/^.+\?/, '') : '';

    const searchParamsObject = useMemo(() => {
        const searchParams = new URLSearchParams(query);
        return Object.fromEntries(searchParams.entries());
    }, [query]);


    useEffect(() => {
        (async () => {
            try {
                const newProducts = await fetchProducts();
                setProducts(newProducts);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [query]);

    const fetchProducts = async (
        { lastId, lastPrice, firstId, firstPrice }: FetchNextArgs = {},
    ): Promise<IProductPreview[]> => {
        setLoading(true);

        const data = await fetcher<{products: IProductPreview[]}>(
            ProductsPageQuery,
            { ...searchParamsObject, lastId, lastPrice, firstId, firstPrice },
        );
        setHasNext(data.products.length >= PRODUCTS_LIMIT);
        setLoading(false);
        return data.products;
    };

    const handleNext = async () => {
        const sortDir = searchParamsObject.sort ? searchParamsObject.sort.split(':').pop() : 'asc';
        const { id, discountPrice } = products.slice().pop() || {} as IProductPreview;
        if (!id) return;
        console.debug(': \n', id, discountPrice);

        if (sortDir === 'asc') {
            const newProducts = await fetchProducts({ firstId: id, firstPrice: Number(discountPrice) });
            setProducts((prev) => [...prev, ...newProducts]);
        }
        if (sortDir === 'desc') {
            const newProducts = await fetchProducts({ lastId: id, lastPrice: Number(discountPrice) });
            setProducts((prev) => [...prev, ...newProducts]);
        }
    };


    const catalog = <Catalog />;
    return (
        <>
            <div className="container d-block d-xl-none">
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
            <div className="row">
                <div className="col-12 col-xl-3 d-none d-xl-block">
                    {catalog}
                </div>
                <div className="col-12 col-xl-9 position-relative">
                    <div className="breadcrumb d-flex justify-content-end me-3">
                        <SortProducts className="breadcrumb-item" value="discountPrice">
                            Sort by Price
                        </SortProducts>
                        <SortProducts className="breadcrumb-item" value="id">
                            Sort by Recency
                        </SortProducts>
                    </div>
                    {products.length === 0 ? (
                        <div className="h2 text-center my-5">Nothing found...</div>
                    ) : (
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
        </>
    );
};

export default ProductsBlock;
