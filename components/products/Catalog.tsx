import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import CatalogQuery from '~/queries/CatalogQuery.gql';
import cls from '~/utils/cls';
import fetcher from '~/utils/fetcher';


export default function Catalog(): JSX.Element {
    const [categories, setCatecories] = useState<string[]>([]);
    const [countries, setCountries] = useState<string[]>([]);

    const { route, query } = useRouter();

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
                <Link href="/products">
                    <a
                        className={cls(
                            'list-group-item',
                            'list-group-item-action',
                            (!query['category.name'] && !query['country.name']) && 'active',
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
                    <Link href={`${route}?category.name=${category}`} key={category}>
                        <a
                            className={cls(
                                'list-group-item',
                                'list-group-item-action',
                                query['category.name'] === category && 'active',
                            )}
                            data-bs-dismiss="offcanvas"
                            role="listitem"
                        >
                            {category}
                        </a>
                    </Link>
                ))}
            </ul>
            <ul className="list-group mb-4">
                <h5>Countries</h5>
                {countries.map((country) => (
                    <Link href={`${route}?country.name=${country}`} key={country}>
                        <a
                            className={cls(
                                'list-group-item',
                                'list-group-item-action',
                                query['country.name'] === country && 'active',
                            )}
                            data-bs-dismiss="offcanvas"
                            role="listitem"
                        >
                            {country}
                        </a>
                    </Link>
                ))}
            </ul>
        </nav>
    );
}
