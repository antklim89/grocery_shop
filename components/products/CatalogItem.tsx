import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, HTMLAttributes } from 'react';

import cls from '~/utils/cls';


interface Props extends HTMLAttributes<HTMLAnchorElement> {
    name: string;
    value: string
}

const CatalogItem: FC<Props> = ({ name, value, className, children, ...props }) => {
    const { query } = useRouter();

    const params = new URLSearchParams(query as Record<string, string> || '');
    const isActive = params.get(name) === value;

    if (params.get(name) === value) {
        params.delete(name);
    } else if (params.has(name)) {
        params.set(name, value);
    } else {
        params.append(name, value);
    }


    return (
        <Link replace href={params.toString().length === 0 ? '/product' : `/product?${params}`}>
            <a
                {...props}
                className={cls(
                    className,
                    isActive && 'active',
                )}
                data-bs-dismiss="offcanvas"
            >
                { children || value }
            </a>
        </Link>
    );
};

export default CatalogItem;
