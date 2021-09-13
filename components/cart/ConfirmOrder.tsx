import { Observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';

import { useCart } from './CartProvider';
import ConfirmTimer from './ConfirmTimer';

import Alert from '~/components/utils/Alert';
import Loading from '~/components/utils/Loading';
import query from '~/queries/Order.gql';
import { Order, OrderStatus } from '~/types';
import fetcher from '~/utils/fetcher';
import getTotalPrice from '~/utils/getTotalPrice';


interface Props {
    order: Order
}

const ConfirmOrder: FC<Props> = ({ order }) => {
    const { back, replace } = useRouter();
    const cart = useCart();

    const [confirming, setConfirming] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState<string|null>();
    const [confirmError, setConfirmError] = useState<string|null>();
    const [isSuccess, setIsSuccess] = useState(order.status !== OrderStatus.DRAFT);

    const handleConfirm = async () => {
        if (isSuccess) return;

        setConfirmError(null);
        setConfirmMessage(null);
        setConfirming(true);
        try {
            await fetcher(`/orders/confirm/${order.uid}`, {}, { method: 'POST' });
            setConfirmMessage('Order successfully confirmed.');
            setConfirming(false);
            setIsSuccess(true);
            const orderedCards = cart.cartItems.filter((cartItem) => !cartItem.inOrder);
            cart.replace(orderedCards);
        } catch (err) {
            setConfirmError('Order failed. Try again later.');
            setConfirming(false);
        }
    };

    const handleDeleteOrder = async () => {
        await fetcher(query.DeleteOrderMutation, { id: order.id });
        back();
    };

    const totalPrice = getTotalPrice(order.orderedProducts);

    const handleExpire = useCallback(() => replace('/order'), []);

    return (
        <div className="container">
            <h1 className="text-center text-primary mb-5">
                Order
            </h1>

            <Observer>
                {() => (
                    <ConfirmTimer
                        show={!isSuccess}
                        startDate={new Date(order.createdAt)}
                        text="The Order expires after: "
                        onExpire={handleExpire}
                    />
                )}
            </Observer>

            <div className="list-group mb-5">
                <p className="list-group-item">
                    <span className="h5">Name:&nbsp;</span>
                    <span>{order.name}&nbsp;{order.surname}</span>
                </p>
                <p className="list-group-item">
                    <span className="h5">E-mail:&nbsp;</span>
                    <span>{order.email}</span>
                </p>
                <p className="list-group-item">
                    <span className="h5">Phone number:&nbsp;</span>
                    <span>{order.phone}</span>
                </p>
                <p className="list-group-item">
                    <span className="h5">Address:&nbsp;</span>
                    <span>{order.address}</span>
                </p>
            </div>
            <ul className="list-group mb-5">
                {order.orderedProducts.map(({ qty, product }) => (
                    <li className="list-group-item" key={product.id}>
                        <div className="row">
                            <div className="col-lg-6 col-12">
                                <h5>{product.name}</h5>
                                <p>{product.category.name}{' '}-{' '}{product.country.name}</p>
                            </div>
                            <div className="col-lg-4 col-6">
                                <p className="h2">
                                    {(product.discountPrice * (qty / product.quantityPerUnit)).toFixed(2)}$
                                </p>
                            </div>
                            <div className="col-lg-2 col-6">
                                <p className="h2">
                                    {product.quantityPerUnit}&nbsp;{product.unit}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mb-5">
                <p className="text-end h2">
                    Total Price:{' '}{totalPrice.toFixed(2)}$
                </p>
            </div>

            <Alert message={confirmError} type="danger" />
            <Alert message={confirmMessage} type="success" />

            <div className="d-flex justify-content-center">
                {!isSuccess && order.status === OrderStatus.DRAFT && (
                    <div className="mx-2">
                        <button
                            className="btn btn-primary btn-lg"
                            disabled={confirming}
                            type="submit"
                            onClick={() => handleConfirm()}
                        >
                            Confirm
                            <Loading loading={confirming} size="sm" />
                        </button>
                    </div>
                )}
                {!isSuccess && order.status === OrderStatus.DRAFT && (
                    <div className="mx-2">
                        <button
                            className="btn btn-outline-danger btn-lg"
                            disabled={confirming}
                            type="submit"
                            onClick={() => handleDeleteOrder()}
                        >
                            Cancel
                            <Loading loading={confirming} size="sm" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConfirmOrder;
