import { FC } from 'react';


interface Props {
    price: number;
    discountPrice: number;
    unit: number;
    measure: string;
}

const Price: FC<Props> = ({
    price,
    discountPrice,
    unit,
    measure,
}) => {
    const rest = (
        <>
            for
            &nbsp;
            <big>{unit}</big>
            &nbsp;
            {measure}
        </>
    );

    return (
        <>
            {discountPrice === price ? (
                <span className="d-flex flex-wrap">
                    <big className="d-flex align-items-end">
                        <b>
                            {price?.toFixed(2) || 0}
                            $&nbsp;
                        </b>
                    </big>
                    <span className="d-flex align-items-end">
                        {rest}
                    </span>
                </span>
            ) : (
                <span className="d-flex flex-wrap">
                    <span className="d-flex align-items-end">
                        <small>
                            <del>
                                {price}
                                $&nbsp;
                            </del>
                        </small>
                        <big>
                            <b>
                                {discountPrice?.toFixed(2) || 0}
                                $&nbsp;
                            </b>
                        </big>
                    </span>
                    <span className="d-flex align-items-end">
                        {rest}
                    </span>
                </span>
            )}
        </>
    );
};

export default Price;
