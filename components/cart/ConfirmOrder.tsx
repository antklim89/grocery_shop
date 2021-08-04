import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';


import Loading from '../utils/Loading';

import { useAuth } from '~/components/auth/AuthProvider';
import Price from '~/components/utils/Price';
import OrderQuery from '~/queries/OrderQuery.gql';
import { Order } from '~/types';
import getTotalPrice from '~/utils/getTotalPrice';
import client from '~/utils/graphql-request';


function ConfirmOrder(): JSX.Element {
    const router = useRouter();
    const auth = useAuth();

    const [order, setOrder] = useState<Order|null>(null);
    const [error, setError] = useState<string|null>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<null|'success'|'error'>(null);

    useEffect(() => {
        (async () => {
            setError(null);
            if (!router.query.id) return;
            if (!auth.isAuth) return;
            try {
                const data = await client.request<{order: Order}>(OrderQuery, { id: router.query.id });
                console.debug(data);
                setOrder(data.order);
            } catch (err) {
                console.error(err);
                setError('Unexpected server error.');
            }
        })();
    }, [router.query.id]);

    const handleConfirm = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) return;
        const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/confirm/${router.query.id}`, {
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const isOk = await data.json();
        if (isOk) setStatus('success');
        else setStatus('error');
        setLoading(false);
    };

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
                <Loading loading />
            </div>
        );
    }

    const totalPrice = getTotalPrice(order.carts);

    return (
        <div>
            <h1 className="text-center text-primary mb-5">
                Order
            </h1>
            {status === 'error' && (
                <p className="h1">Order failed. Try again later.</p>
            )}
            {status === 'success' && (
                <p className="h1">Order successfully confirmed.</p>
            )}
            <div className="list-group mb-5">
                <p className="list-group-item">
                    <span className="h5">Name:&nbsp;</span>
                    <span>
                        {order.name}
                        &nbsp;
                        {order.surname}
                    </span>
                </p>
                <p className="list-group-item">
                    <span className="h5">E-mail:&nbsp;</span>
                    <span>
                        {order.email}
                    </span>
                </p>
                <p className="list-group-item">
                    <span className="h5">Phone number:&nbsp;</span>
                    <span>
                        {order.phone}
                    </span>
                </p>
                <p className="list-group-item">
                    <span className="h5">Address:&nbsp;</span>
                    <span>
                        {order.address}
                    </span>
                </p>
            </div>
            <ul className="list-group mb-5">
                {order.carts.map(({ qty, product }) => (
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
                                    price={(product.price / product.unit) * qty}
                                    unit={qty}
                                />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mb-5">
                <p className="text-end h2">
                    Total Price:
                    {' '}
                    {totalPrice}
                    $
                </p>
            </div>
            {(status === 'error' || status === null) && (
                <button
                    className="btn btn-primary" disabled={loading} type="submit"
                    onClick={handleConfirm}
                >
                    Confirm
                    <Loading loading={loading} size="sm" />
                </button>
            )}
        </div>
    );
}

export default observer(ConfirmOrder);
