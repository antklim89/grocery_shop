import axios from 'axios';
// import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Catalog from '~/components/products/Catalog';
import ProductsList from '~/components/products/ProductsList';
import Seo from '~/components/utils/Seo';
import { IProduct } from '~/types';


// interface Props {
//     products: IProduct[];
// }

export default function ProductsPage(): JSX.Element {
    const [products, setProducts] = useState<IProduct[]>([]);
    const router = useRouter();
    const query = router.asPath.replace('/products', '');

    useEffect(() => {
        axios.get<IProduct[]>(`/products${query}`)
            .then(({ data }) => {
                setProducts(data);
            });
    }, [query]);

    return (
        <>
            <Seo title="Products" />
            <div className="row">
                <div className="col-12 col-xl-4">
                    <Catalog />
                </div>
                <div className="col-12 col-xl-8">
                    <ProductsList products={products} />
                </div>
            </div>
        </>
    );
}

// export const getStaticProps: GetStaticProps = async () => {
//     const { data: products } = await axios.get(`${process.env.API_URL}/products`);

//     return {
//         props: { products },
//     };
// };
