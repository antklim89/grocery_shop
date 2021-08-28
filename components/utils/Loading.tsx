import { FC, HTMLAttributes } from 'react';

import cls from '~/utils/cls';


interface Props extends HTMLAttributes<HTMLDivElement> {
    loading: boolean
    size?: 'sm' | 'lg'
}

const Loading: FC<Props> = ({ loading, size, className, ...props }) => {
    return loading
        ? (
            <div
                className={cls(
                    'spinner-border',
                    'ms-1',
                    size && `spinner-border-${size}`,
                    className,
                )}
                role="status"
                {...props}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        )
        : null;
};

export default Loading;
