import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, HTMLAttributes } from 'react';

import cls from '~/utils/cls';


interface Props extends HTMLAttributes<HTMLAnchorElement> {
    name: string;
    value: string
}

const CatalogItem: FC<Props> = ({
    name, value, className, ...props
}) => {
    const { asPath } = useRouter();

    const [, query] = asPath.split('?');
    const params = new URLSearchParams(query);
    const isActive = params.get(name) === value;

    if (params.get(name) === value) {
        params.delete(name);
    } else if (params.has(name)) {
        params.set(name, value);
    } else {
        params.append(name, value);
    }

    return (
        <Link href={params.toString().length === 0 ? '/product' : `/product?${params}`}>
            <a
                {...props}
                className={cls(
                    className,
                    isActive && 'active',
                )}
                data-bs-dismiss="offcanvas"
            >
                {value}
            </a>
        </Link>
    );
};

export default CatalogItem;
