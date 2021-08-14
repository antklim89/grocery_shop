import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Loading from '../utils/Loading';

import OrderQuery from '~/queries/OrderQuery.gql';
import { Order } from '~/types';
import fetcher from '~/utils/fetcher';
import getTotalPrice from '~/utils/getTotalPrice';


function ConfirmOrder(): JSX.Element {
    const router = useRouter();

    const [order, setOrder] = useState<Order|null>(null);
    const [error, setError] = useState<string|null>(null);
    const [loading, setLoading] = useState(false);
    const [confirmStatus, setConfirmStatus] = useState<null|'success'|'error'>(null);

    useEffect(() => {
        (async () => {
            setError(null);
            if (!router.query.id) return;
            try {
                const data = await fetcher<{order: Order}>(OrderQuery, { id: router.query.id });
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
        try {
            await fetcher(`/orders/confirm/${router.query.id}`);
            setConfirmStatus('success');
        } catch {
            setConfirmStatus('error');
        } finally {
            setLoading(false);
        }
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
            {confirmStatus === 'error' && (
                <p className="h1">Order failed. Try again later.</p>
            )}
            {confirmStatus === 'success' && (
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
                            <div className="col-lg-6 col-12">
                                <h5>{product.name}</h5>
                                <p>
                                    {product.category.name}
                                    {' '}
                                    -
                                    {' '}
                                    {product.country.name}
                                </p>
                            </div>
                            <div className="col-lg-4 col-6">
                                <p className="h2">
                                    {product.discountPrice * qty}
                                    $
                                </p>
                            </div>
                            <div className="col-lg-2 col-6">
                                <p className="h2">
                                    {product.unit}
                                    &nbsp;
                                    {product.measure}
                                </p>
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
            {(confirmStatus === 'error' || confirmStatus === null) && (
                <div className="text-center">
                    <button
                        className="btn btn-primary btn-lg" disabled={loading} type="submit"
                        onClick={handleConfirm}
                    >
                        Confirm
                        <Loading loading={loading} size="sm" />
                    </button>
                </div>
            )}
        </div>
    );
}

export default observer(ConfirmOrder);
