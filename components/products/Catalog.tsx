import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { cls } from '~/utils';


export default function Catalog(): JSX.Element {
    const [catecories, setCatecories] = useState<string[]>([]);
    const [countries, setCountries] = useState<string[]>([]);

    const { asPath, route } = useRouter();

    useEffect(() => {
        axios.get('/categories/enumerate')
            .then(({ data }) => {
                setCatecories(data);
            });
        axios.get('/countries/enumerate')
            .then(({ data }) => {
                setCountries(data);
            });
    }, []);

    return (
        <nav className="container">
            <ul className="list-group">
                <h5>Category</h5>
                <Link href="/products">
                    <a
                        className={`list-group-item list-group-item-action${asPath === route ? ' active' : ''}`}
                        role="listitem"
                    >
                        <b>All</b>
                    </a>
                </Link>
                {catecories.map((category) => {
                    const path = `${route}?category.name=${category}`;

                    return (
                        <Link href={path} key={category}>
                            <a
                                className={cls(
                                    'list-group-item',
                                    'list-group-item-action',
                                    asPath === path && 'active',
                                )}
                                role="listitem"
                            >
                                {category}
                            </a>
                        </Link>
                    );
                })}
            </ul>
            <ul>
                {countries.map((country) => (
                    <li key={country}>
                        <Link href={`?country.name=${country}`}>
                            <a>{country}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
