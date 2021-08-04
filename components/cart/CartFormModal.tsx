import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useAuth } from '../auth/AuthProvider';
import Loading from '../utils/Loading';

import OrderForm from './OrderForm';

import CreateOrderMutation from '~/queries/CreateOrderMutation.gql';
import { CartItemStore } from '~/store/CartItemStore';
import { CART_LOCAL_STORAGE_NAME } from '~/utils/constants';
import client from '~/utils/graphql-request';
import useBootstrap from '~/utils/useBootstrap';


function CartFormModal(): JSX.Element {
    const [modal, ref] = useBootstrap('Modal');

    const auth = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState(() => auth.user?.email || '');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        setLoading(true);
        const dataString = localStorage.getItem(CART_LOCAL_STORAGE_NAME);
        if (!dataString) return;
        const cartItemStore: CartItemStore[] = JSON.parse(dataString);
        const carts = cartItemStore.map((p) => p.id);

        try {
            const data = await client.request(CreateOrderMutation, {
                email, name, surname, address, phone, carts,
            });
            setLoading(false);
            modal?.hide();
            router.push(`/order/${data.createOrder.order.id}`);
        } catch (error) {
            setLoading(false);
            console.error('Create Order Error: \n', error);
        }
    };

    return (
        <>
            <button
                className="btn btn-primary btn-lg align-self-center"
                data-bs-target="#order-form"
                data-bs-toggle="modal"
                type="button"
            >
                Order
            </button>

            <div
                aria-hidden
                aria-labelledby="orderFormLabel"
                className="modal fade"
                id="order-form"
                ref={ref}
                tabIndex={-1}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Order</h5>
                            <button
                                aria-label="Close"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                type="button"
                            />
                        </div>

                        <div className="modal-body">
                            <OrderForm
                                setValues={{
                                    setEmail, setName, setSurname, setAddress, setPhone,
                                }}
                                values={{
                                    email, name, surname, address, phone,
                                }}
                            />
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleConfirm}
                            >
                                Confirm
                                <Loading loading={loading} size="sm" />
                            </button>
                            <button
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                type="button"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default observer(CartFormModal);
