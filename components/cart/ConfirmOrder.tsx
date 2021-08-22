import { runInAction as a } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Alert from '~/components/utils/Alert';
import Loading from '~/components/utils/Loading';
import query from '~/queries/Order.gql';
import { Order, OrderStatus } from '~/types';
import fetcher from '~/utils/fetcher';
import getTotalPrice from '~/utils/getTotalPrice';


const confirmOrderStore = {
    order: null as Order|null,
    fetchError: null as string|null,
    confirming: false,
    confirmMessage: null as string|null,
    confirmError: null as string|null,
    isSuccess: false,

    async fetchOrders(orderId: number|string): Promise<void> {
        this.fetchError = null;
        if (!orderId) return;
        try {
            const data = await fetcher<{order: Order}>(query.OrderQuery, { id: orderId });

            a(() => {
                if (!data.order) this.fetchError = 'Order not found';
                else this.order = data.order;
            });
        } catch (err) {
            console.error(err);
            a(() => { this.fetchError = 'Unexpected server error.'; });
        }
    },

    async handleConfirm(orderId: number|string) {
        if (this.order?.status !== OrderStatus.DRAFT) return;
        const token = localStorage.getItem('token');
        if (!token) return;

        this.confirming = true;
        try {
            await fetcher(`/orders/confirm/${orderId}`, {}, { method: 'POST' });
            a(() => {
                this.confirmMessage = 'Order successfully confirmed.';
                this.confirming = false;
                if (this.order) this.order.status = OrderStatus.PROCESSING;
            });
        } catch (err) {
            a(() => {
                this.confirmError = 'Order failed. Try again later.';
                this.confirming = false;
            });
        }
    },

    handleDeleteOrder: async (id: number|string) => {
        await fetcher(query.DeleteOrderMutation, { id });
        window.history.back();
    },
};


function ConfirmOrder(): JSX.Element {
    const orderId = useRouter().query.id as string || (() => { throw new Error(); })();

    const state = useLocalObservable(() => confirmOrderStore);

    useEffect(() => {
        state.fetchOrders(orderId);
    }, [orderId]);


    if (state.fetchError) {
        return (
            <div className="d-flex justify-content-center">
                <p className="h1">{state.fetchError}</p>
            </div>
        );
    }
    if (!state.order) {
        return (
            <div className="d-flex justify-content-center">
                <Loading loading />
            </div>
        );
    }

    const totalPrice = getTotalPrice(state.order.orderedProducts);

    return (
        <div>
            <h1 className="text-center text-primary mb-5">
                Order
            </h1>

            <div className="list-group mb-5">
                <p className="list-group-item">
                    <span className="h5">Name:&nbsp;</span>
                    <span>
                        {state.order.name}
                        &nbsp;
                        {state.order.surname}
                    </span>
                </p>
                <p className="list-group-item">
                    <span className="h5">E-mail:&nbsp;</span>
                    <span>
                        {state.order.email}
                    </span>
                </p>
                <p className="list-group-item">
                    <span className="h5">Phone number:&nbsp;</span>
                    <span>
                        {state.order.phone}
                    </span>
                </p>
                <p className="list-group-item">
                    <span className="h5">Address:&nbsp;</span>
                    <span>
                        {state.order.address}
                    </span>
                </p>
            </div>
            <ul className="list-group mb-5">
                {state.order.orderedProducts.map(({ qty, product }) => (
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
                                    {(product.discountPrice * (qty / product.quantityPerUnit)).toFixed(2)}
                                    $
                                </p>
                            </div>
                            <div className="col-lg-2 col-6">
                                <p className="h2">
                                    {product.quantityPerUnit}
                                    &nbsp;
                                    {product.unit}
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
                    {totalPrice.toFixed(2)}
                    $
                </p>
            </div>

            <div className="d-flex justify-content-center">
                {state.order.status === OrderStatus.DRAFT && (
                    <div className="mx-2">
                        <button
                            className="btn btn-primary btn-lg"
                            disabled={state.confirming}
                            type="submit"
                            onClick={() => state.handleConfirm(orderId)}
                        >
                            Confirm
                            <Loading loading={state.confirming} size="sm" />
                        </button>
                    </div>
                )}
                {state.order.status === OrderStatus.DRAFT && (
                    <div className="mx-2">
                        <button
                            className="btn btn-outline-danger btn-lg"
                            disabled={state.confirming}
                            type="submit"
                            onClick={() => state.handleDeleteOrder(orderId)}
                        >
                            Cancel
                            <Loading loading={state.confirming} size="sm" />
                        </button>
                    </div>
                )}
            </div>

            <Alert message={state.confirmError} type="danger" />
            <Alert message={state.confirmMessage} type="success" />
        </div>
    );
}

export default observer(ConfirmOrder);
