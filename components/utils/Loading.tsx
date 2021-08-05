import { FC } from 'react';

import cls from '~/utils/cls';


interface Props {
    loading: boolean
    size?: 'sm' | 'lg'
}

const Loading: FC<Props> = ({ loading, size }) => {
    return loading ? (
        <div
            className={cls(
                'spinner-border',
                'ms-1',
                size && `spinner-border-${size}`,
            )}
            role="status"
        >
            <span className="visually-hidden">Loading...</span>
        </div>
    ) : null;
};

export default Loading;
