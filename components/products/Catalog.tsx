import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import CatalogItem from './CatalogItem';

import { ICatalogItem } from '~/types';
import cls from '~/utils/cls';


interface Props {
    categories: ICatalogItem[]
    countries: ICatalogItem[]
}

const Catalog: FC<Props> = ({ categories, countries }) => {
    const { query } = useRouter();

    return (
        <nav>
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
