import Link from 'next/link';
import { FC, useState } from 'react';

import OrdersQuery from '~/queries/OrdersQuery.gql';
import { ICart } from '~/types';
import fetcher from '~/utils/fetcher';
import useAsyncEffect from '~/utils/useAsyncEffect';


interface IUserOrders {
    id: number
    status: string
    address: string
    email: string
    orderedProducts: ICart[]
}

const UserOrders: FC = () => {
    const [orders, setOrders] = useState<IUserOrders[]>([]);

    useAsyncEffect(async () => {
        const data = await fetcher<{orders: IUserOrders[]}>(OrdersQuery);
        setOrders(data.orders);
    }, []);

    return (
        <ul className="list-group">
            {orders.map((order) => (
                <li className="list-group-item" key={order.id}>
                    <Link href={`/order/${order.id}`}>
                        <a className="d-flex justify-content-between">
                            <h5>
                                {order.address}
                                <br />
                                <span className="h6">{order.email}</span>
                            </h5>
                            <span>Status: {order.status}</span>
                        </a>
                    </Link>
                    <ul>
                        {order.orderedProducts.map((cart) => (
                            <Link href={`/product/${cart.product.id}`} key={cart.id}>
                                <a>
                                    <li>
                                        {cart.product.name} - {cart.qty}{' '}{cart.product.unit}
                                    </li>
                                </a>
                            </Link>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
};

export default UserOrders;
