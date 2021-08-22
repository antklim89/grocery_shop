import { useRouter } from 'next/router';
import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';

import cls from '~/utils/cls';


const SearchProducts: FC<HTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => {
    const [searchValue, setSearchValue] = useState('');
    const { replace, query } = useRouter();
    const prevSearchValue = useRef<string|null>(null);

    const handleSearch = async () => {
        if (searchValue === prevSearchValue.current) return;
        const params = new URLSearchParams(query as Record<string, string> || '');

        if (searchValue.length > 0) {
            params.set('search', searchValue);
        } else {
            params.delete('search');
        }
        if (params.toString().length > 0) replace(`/product?${params}`);
        else replace('/product');

        prevSearchValue.current = searchValue;
    };

    useEffect(() => {
        if (query.search === searchValue || typeof query.search === 'object') return;
        setSearchValue(query.search || '');
    }, [query.search]);

    return (
        <div className="position-relative">
            <input
                autoComplete="search"
                className={cls(className, 'form-control')}
                placeholder="Enter search request..."
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                {...props}
            />
            <button
                className="btn btn-primary px-4 position-absolute top-0 end-0"
                type="button"
                onClick={handleSearch}
            >
                <i className="bi bi-search" />
            </button>
        </div>
    );
};

export default SearchProducts;
