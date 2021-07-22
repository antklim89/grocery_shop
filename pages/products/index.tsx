import axios from 'axios';
// import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Catalog from '~/components/products/Catalog';
import ProductsBlock from '~/components/products/ProductsBlock';
import ProductsList from '~/components/products/ProductsList';
import Seo from '~/components/utils/Seo';
import { IProduct } from '~/types';
import { useBootstrap } from '~/utils/useBootstrap';


export default function ProductsPage(): JSX.Element {
    const [products, setProducts] = useState<IProduct[]>([]);
    const router = useRouter();
    const query = router.asPath.replace('/products', '');

    useBootstrap('Offcanvas');

    useEffect(() => {
        axios.get<IProduct[]>(`/products${query}`)
            .then(({ data }) => {
                setProducts(data);
            });
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

// export const getStaticProps: GetStaticProps = async () => {
//     const { data: products } = await axios.get(`${process.env.API_URL}/products`);

//     return {
//         props: { products },
//     };
// };
