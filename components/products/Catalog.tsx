import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import CatalogItem from './CatalogItem';

import CatalogQuery from '~/queries/CatalogQuery.gql';
import cls from '~/utils/cls';
import fetcher from '~/utils/fetcher';


interface ICatalogItem {
    name: string;
    id: number;
}

const placeholderItems = Array.from({ length: 5 }).map((_, id) => ({ name: '-----------------', id }));

const Catalog: FC = () => {
    const [categories, setCatecories] = useState<ICatalogItem[]>(placeholderItems);
    const [countries, setCountries] = useState<ICatalogItem[]>(placeholderItems);

    const { query } = useRouter();

    useEffect(() => {
        (async () => {
            const data = await fetcher<Record<string, ICatalogItem[]>>(CatalogQuery);
            setCatecories(data.categories);
            setCountries(data.countries);
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
                            (!query.category || !query.country) && 'active',
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
                    <CatalogItem
                        className="list-group-item list-group-item-action text-uppercase"
                        key={category.id}
                        name="category"
                        value={category.name}
                    />
                ))}
            </ul>
            <ul className="list-group mb-4">
                <h5>Countries</h5>
                {countries.map((country) => (
                    <CatalogItem
                        className="list-group-item list-group-item-action text-uppercase"
                        key={country.id}
                        name="country"
                        value={country.name}
                    />
                ))}
            </ul>
        </nav>
    );
};

export default Catalog;
