import cls from '~/utils/cls';


interface Props {
    loading: boolean
    size?: 'sm' | 'lg'
}

export default function Loading({ loading, size }: Props): JSX.Element | null {
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
}
