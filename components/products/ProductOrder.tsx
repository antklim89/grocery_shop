import { useState, ChangeEvent } from 'react';

import { Price } from '~/components/utils/Price';
import { IProduct } from '~/types';


export default function ProductOrder({
    name, country, type, discount, price, unit, measure,
}: Omit<IProduct, 'images'|'description'>): JSX.Element {
    const [qte, setQte] = useState(1);

    const handleQteChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const number = Number(e.target.value);
        setQte(number);
    };

    return (
        <div className="border h-100 shadow p-2 d-flex flex-column">
            <h1 className="text-center py-2 text-dark border-bottom">{name}</h1>

            <div className="fs-5 py-2 border-bottom">
                <p>
                    <Price
                        discount={discount}
                        measure={measure}
                        price={price}
                        unit={unit}
                    />
                </p>
                <p>
                    <Price
                        discount={discount}
                        measure={measure}
                        price={price * qte}
                        unit={qte}
                    />
                </p>
                {discount > 0 ? (
                    <p>
                        Discount:
                        {' '}
                        {discount}
                        %
                    </p>
                ) : null}
            </div>

            <div className="py-2  border-bottom">
                <p><big className="text-capitalize">{type}</big></p>
                <p><big className="text-uppercase">{country}</big></p>
            </div>

            <form className="d-flex flex-column justify-content-end flex-column flex-grow-1">
                <label className="form-label my-2" htmlFor="qte">
                    Quantity: (
                    {measure}
                    )
                    <input
                        className="form-control"
                        id="qte"
                        type="number"
                        value={qte}
                        onChange={handleQteChange}
                    />
                </label>
                <input className="btn btn-primary my-2" type="submit" value="Place to Cart" />
            </form>
        </div>
    );
}
