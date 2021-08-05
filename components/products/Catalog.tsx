import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import CatalogItem from './CatalogItem';

import CatalogQuery from '~/queries/CatalogQuery.gql';
import cls from '~/utils/cls';
import fetcher from '~/utils/fetcher';


const Catalog: FC = () => {
    const [categories, setCatecories] = useState<string[]>([]);
    const [countries, setCountries] = useState<string[]>([]);

    const { asPath } = useRouter();
    const query: string | undefined = asPath.split('?')[1];

    useEffect(() => {
        (async () => {
            const data = await fetcher<Record<string, {name: string}[]>>(CatalogQuery);
            setCatecories(data.categories.map((i) => i.name));
            setCountries(data.countries.map((i) => i.name));
        })();
    }, []);

    return (
        <nav className="container">
            <ul className="list-group mb-4">
                <Link href="/product">
                    <a
                        className={cls(
                            'list-group-item',
                            'list-group-item-action',
                            (!query || query.length === 0) && 'active',
                        )}
                        role="listitem"
                    >
                        <b>All</b>
                    </a>
                </Link>
            </ul>
            <ul className="list-group mb-4">
                <h5>Category</h5>
                {categories.map((category) => (
                    <CatalogItem key={category} name="category" value={category} />
                ))}
            </ul>
            <ul className="list-group mb-4">
                <h5>Countries</h5>
                {countries.map((country) => (
                    <CatalogItem key={country} name="country" value={country} />
                ))}
            </ul>
        </nav>
    );
};

export default Catalog;
