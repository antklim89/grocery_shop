import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Price } from '../utils/Price';

import OrderQuery from '~/queries/OrderQuery.gql';
import { Order } from '~/types';
import { useAuth, client, getPrice } from '~/utils';


function ConfirmOrder(): JSX.Element {
    const router = useRouter();
    const auth = useAuth();

    const [order, setOrder] = useState<Order|null>(null);
    const [error, setError] = useState<string|null>(null);


    useEffect(() => {
        (async () => {
            setError(null);
            if (!router.query.id) return;
            if (!auth.tokenExists) return;
            try {
                const data = await client.request<{order: Order}>(OrderQuery, { id: router.query.id });
                setOrder(data.order);
            } catch (err) {
                console.error(err);
                setError('Unexpected server error.');
            }
        })();
    }, [router.query.id]);

    if (error) {
        return (
            <div className="d-flex justify-content-center">
                <p>{error}</p>
            </div>
        );
    }
    if (!order) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    const totalPrice = order.products.reduce((total, {
        price, discount, unit,
    }) => (
        total + Number(getPrice(price * unit * 1, discount))
    ), 0);

    return (
        <div>
            <h1 className="text-center text-primary mb-5">
                Order
            </h1>
            <div className="row mb-5">
                <div className="col-12 col-md-6 col-lg-3 border">{order.name}</div>
                <div className="col-12 col-md-6 col-lg-3 border">{order.surname}</div>
                <div className="col-12 col-md-6 col-lg-3 border">{order.email}</div>
                <div className="col-12 col-md-6 col-lg-3 border">{order.phone}</div>
                <div className="col-12 border">{order.address}</div>
            </div>
            <ul className="list-group mb-5">
                {order.products.map((product) => (
                    <li className="list-group-item" key={product.id}>
                        <div className="row">
                            <div className="col-8">
                                <h5>{product.name}</h5>
                                <p>
                                    {product.category.name}
                                    {' '}
                                    -
                                    {' '}
                                    {product.country.name}
                                </p>
                            </div>
                            <div className="col-4">
                                <Price
                                    discount={product.discount}
                                    measure={product.measure}
                                    price={(product.price / product.unit) * 1}
                                    unit={1}
                                />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div>
                <p className="text-end h2">
                    Total Price:
                    {' '}
                    {totalPrice}
                    $
                </p>
            </div>
        </div>
    );
}

export default observer(ConfirmOrder);
