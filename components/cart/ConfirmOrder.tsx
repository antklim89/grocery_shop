import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';


import { useAuth } from '~/components/auth/AuthProvider';
import Price from '~/components/utils/Price';
import OrderQuery from '~/queries/OrderQuery.gql';
import { Order } from '~/types';
import getPrice from '~/utils/getPrice';
import client from '~/utils/graphql-request';


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
                console.debug(data);
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

    const totalPrice = order.carts.reduce((total, {
        qty, product: { price, discount, unit },
    }) => (
        total + Number(getPrice(price * unit * qty, discount))
    ), 0);

    return (
        <div>
            <h1 className="text-center text-primary mb-5">
                Order
            </h1>
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
