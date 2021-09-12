import Link from 'next/link';
import { FC, useState } from 'react';

import query from '~/queries/Order.gql';
import { Order, OrderStatus } from '~/types';
import fetcher from '~/utils/fetcher';
import useAsyncEffect from '~/utils/useAsyncEffect';


const UserOrders: FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useAsyncEffect(async () => {
        const data = await fetcher<{orders: Order[]}>(query.OrdersQuery);
        setOrders(data.orders);
    }, []);

    const handleDeleteOrder = async (id: number|string) => {
        await fetcher(query.DeleteOrderMutation, { id });
        setOrders((prevOrders) => prevOrders.filter((orderItem) => orderItem.id !== id));
    };

    const statusMessage = (status: OrderStatus): string => {
        switch (status) {
        case OrderStatus.DRAFT:
            return 'Waiting for payment.';
        case OrderStatus.PROCESSING:
            return 'Order in processing.';
        case OrderStatus.SHIPPING:
            return 'Order is on the way.';
        case OrderStatus.COMPLETED:
            return 'The order has been delivered.';
        default:
            return 'Order in processing.';
        }
    };

    return (
        <ul className="list-group">
            {orders.map((order) => (
                <li className="list-group-item" key={order.id}>
                    <Link href={`/order/${order.uid}`}>
                        <a className="d-flex justify-content-between">
                            <h5>
                                Order N: {order.uid}
                                <br />
                                <span className="h6">{new Date(order.createdAt).toLocaleString()}</span>
                            </h5>
                            <div className="d-flex flex-column">
                                <span>Status: {statusMessage(order.status)}</span>
                            </div>
                        </a>
                    </Link>
                    <ul className="d-flex justify-content-between">
                        <div>
                            {order.orderedProducts.map((cart) => (
                                <Link href={`/product/${cart.product.id}`} key={cart.id}>
                                    <a>
                                        <li>
                                            {cart.product.name} - {cart.qty}{' '}{cart.product.unit}
                                        </li>
                                    </a>
                                </Link>
                            ))}
                        </div>
                        {order.status === OrderStatus.DRAFT && (
                            <button
                                className="btn btn-outline-danger align-self-end"
                                type="button"
                                onClick={() => handleDeleteOrder(order.id)}
                            >
                                <i className="bi bi-trash" />
                            </button>
                        )}
                    </ul>
                </li>
            ))}
        </ul>
    );
};

export default UserOrders;
