import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';


import { useCart } from './CartProvider';

import { useAuth } from '~/components/auth/AuthProvider';
import Alert from '~/components/utils/Alert';
import Loading from '~/components/utils/Loading';
import { ORDER_EXPIRE_TIME } from '~/constants';
import query from '~/queries/Order.gql';
import fetcher from '~/utils/fetcher';


interface OrderResponse {
    createOrder: {
        order: {
            id: number;
            uid: string;
        };
    };
}

const ORDER_STATE = 'ORDER_STATE';


const CreateOrderModal = (): JSX.Element => {
    const auth = useAuth();
    const user = auth.getUser();
    const cart = useCart();

    const router = useRouter();

    const [name, setName] = useState(user.name || '');
    const [surname, setSurname] = useState(user.surname || '');
    const [address, setAddress] = useState(user.address || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [email, setEmail] = useState(user.email || '');

    const [errorMessage, setErrorMessage] = useState<string|null>(null);
    const [loading, setLoading] = useState(false);

    const handleCreateOrder = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const [uid, date] = localStorage.getItem(ORDER_STATE)?.split(':') || [];
        if (uid && date && Date.now() < Number(date)) {
            localStorage.removeItem(ORDER_STATE);
            router.push(`/order/${uid}`);
            return;
        }

        if (cart.cartItems.length === 0) {
            setErrorMessage('There are not products in the cart.');
            return;
        }

        setLoading(true);
        setErrorMessage(null);

        try {
            const data = await fetcher<OrderResponse>(
                query.CreateOrderMutation,
                { email, name, surname, phone, address },
            );

            localStorage.setItem(ORDER_STATE, `${data.createOrder.order.uid}:${Date.now() + ORDER_EXPIRE_TIME}`);
            setLoading(false);
            router.push(`/order/${data.createOrder.order.uid}`);
        } catch (error) {
            setLoading(false);
            setErrorMessage(error.message);
            console.error('Create Order Error: \n', error);
        }
    };

    return (
        <div className="container">
            <form className="row" onSubmit={handleCreateOrder}>
                <Alert message={errorMessage} type="danger" />
                <div className="mb-3 col-sm-6 col-12">
                    <label className="w-100" htmlFor="email">
                        Name:
                        <br />
                        <input
                            required
                            autoComplete="given-name"
                            className="form-control"
                            id="name"
                            maxLength={200}
                            minLength={5}
                            pattern="^[a-zA-Z-']*$"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
                <div className="mb-3 col-sm-6 col-12">
                    <label className="w-100" htmlFor="email">
                        Surname:
                        <br />
                        <input
                            required
                            autoComplete="family-name"
                            className="form-control"
                            id="surname"
                            maxLength={200}
                            minLength={3}
                            pattern="^[a-zA-Z-']*$"
                            type="text"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </label>
                </div>
                <div className="mb-3 col-12">
                    <label className="w-100" htmlFor="email">
                        E-mail:
                        <br />
                        <input
                            required
                            autoComplete="email"
                            className="form-control"
                            id="email"
                            maxLength={200}
                            minLength={3}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                <div className="mb-3 col-12">
                    <label className="w-100" htmlFor="email">
                        Address:
                        <br />
                        <input
                            required
                            autoComplete="address-level1"
                            className="form-control"
                            id="address"
                            maxLength={2000}
                            minLength={5}
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </label>
                </div>
                <div className="mb-3 col-12">
                    <label className="w-100" htmlFor="email">
                        Phone number:
                        <br />
                        <input
                            required
                            autoComplete="tel"
                            className="form-control"
                            id="phone"
                            maxLength={200}
                            minLength={3}
                            pattern="^[\d-]*$"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </label>
                </div>
                <div className="d-flex justify-content-end">
                    <button
                        className="btn btn-primary mx-2"
                        data-bs-dismiss="modal"
                        type="submit"
                    >
                        Confirm
                        <Loading loading={loading} size="sm" />
                    </button>
                    <button
                        className="btn btn-danger mx-2"
                        data-bs-dismiss="modal"
                        type="button"
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default observer(CreateOrderModal);
