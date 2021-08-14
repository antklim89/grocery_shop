import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, HTMLAttributes } from 'react';

import cls from '~/utils/cls';


interface Props extends HTMLAttributes<HTMLAnchorElement> {
    value: string
}

const NAME = 'sort';

const SortProducts: FC<Props> = ({ value, children, className, ...props }) => {
    const { query } = useRouter();

    const params = new URLSearchParams(query as Record<string, string> || '');

    const [currentValue, direction] = params.get(NAME)?.split(':') || [];
    if (currentValue === value) params.set(NAME, `${value}:${direction === 'asc' ? 'desc' : 'asc'}`);
    else if (currentValue !== value) params.set(NAME, `${value}:asc`);

    const isActive = currentValue === value;


    return (
        <Link href={params.toString().length === 0 ? '/product' : `/product?${params}`}>
            <a className={cls(className, isActive && 'active')} {...props}>
                {children || value}
                {(direction === 'asc' && currentValue === value) ? (
                    <i className="bi bi-chevron-down mx-1" />
                ) : <i className="bi bi-chevron-up mx-1" />}
            </a>
        </Link>
    );
};

export default SortProducts;
