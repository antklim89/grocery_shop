import { FC } from 'react';

import getPrice from '~/utils/getPrice';


interface Props {
    price: number;
    discount: number;
    unit: number;
    measure: string;
}

const Price: FC<Props> = ({
    price,
    discount,
    unit,
    measure,
}) => {
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
};

export default Price;
