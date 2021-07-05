import { getPrice } from '~/utils';


export function Price({ price, discount }: { price: number; discount: number; }): JSX.Element {
    return (
        <>
            {discount && discount > 0 ? (
                <span>
                    <del>
                        {price}
                        $
                    </del>
                    {' '}
                    <big>
                        {getPrice(price, discount)}
                        $
                    </big>
                </span>
            ) : (
                <span>
                    <big>
                        {price}
                        $
                    </big>
                </span>
            )}
        </>
    );
}
