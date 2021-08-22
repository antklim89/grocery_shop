import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

import { useAuth } from '~/components/auth/AuthProvider';
import Alert from '~/components/utils/Alert';
import Loading from '~/components/utils/Loading';
import query from '~/queries/Order.gql';
import { CartItemStore } from '~/store/CartItemStore';
import { CART_LOCAL_STORAGE_NAME } from '~/utils/constants';
import fetcher from '~/utils/fetcher';
import useBootstrap from '~/utils/useBootstrap';


interface OrderResponse {
    createOrder: {
        order: {
            id: number;
        };
    };
}


function CreateOrderModal(): JSX.Element {
    const [modal, ref] = useBootstrap('Modal');

    const auth = useAuth();
    const user = auth.user || (() => { throw new Error(); })();
    const router = useRouter();

    const [name, setName] = useState(user.name || '');
    const [surname, setSurname] = useState(user.surname || '');
    const [address, setAddress] = useState(user.address || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [email, setEmail] = useState(user.email || '');

    const [errorMessage, setErrorMessage] = useState<string|null>(null);
    const [loading, setLoading] = useState(false);

    const handleConfirm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dataString = localStorage.getItem(CART_LOCAL_STORAGE_NAME);
        if (!dataString) return;

        setLoading(true);
        setErrorMessage(null);

        const cartItemStore: CartItemStore[] = JSON.parse(dataString);
        const carts = cartItemStore.map(({ qty, product }) => ({ qty, product: product.id }));

        try {
            const data = await fetcher<OrderResponse>(
                query.CreateOrderMutation,
                {
                    email, name, surname, phone, address, orderedProducts: carts,
                },
            );

            setLoading(false);
            localStorage.removeItem(CART_LOCAL_STORAGE_NAME);
            modal?.hide();
            router.push(`/order/${data.createOrder.order.id}`);
        } catch (error) {
            setLoading(false);
            setErrorMessage(error.message);
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

                        <form onSubmit={handleConfirm}>
                            <div className="modal-body row">
                                <Alert message={errorMessage} type="danger" />
                                <div className="mb-3 col-sm-6 col-12">
                                    <label className="w-100" htmlFor="email">
                                        Name:
                                        <input
                                            required
                                            autoComplete="username"
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
                                        <input
                                            required
                                            autoComplete="surname"
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
                                        <input
                                            required
                                            autoComplete="address"
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
                                        <input
                                            required
                                            autoComplete="phone"
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
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-primary"
                                    type="submit"
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

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default observer(CreateOrderModal);
