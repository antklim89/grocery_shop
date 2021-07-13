import { getPrice } from '~/utils';


interface Props {
    price: number;
    discount: number;
    unit: number;
    measure: string;
}

export function Price({
    price, discount, unit, measure,
}: Props): JSX.Element {
    const rest = (
        <>
            {' '}
            for
            {' '}
            <big>{unit}</big>
            {' '}
            {measure}
        </>
    );
    return (
        <>
            {discount && discount > 0 ? (
                <span>
                    <del>
                        {price.toFixed(2)}
                        $
                    </del>
                    {' '}
                    <big>
                        {getPrice(price, discount)}
                        $
                    </big>
                    {rest}
                </span>
            ) : (
                <span>
                    <big>
                        {price.toFixed(2)}
                        $
                    </big>
                    {rest}
                </span>
            )}
        </>
    );
}
