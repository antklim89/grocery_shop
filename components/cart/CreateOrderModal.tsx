import { observer, useLocalObservable } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import CreateOrderForm from './CreateOrderForm';

import { useAuth } from '~/components/auth/AuthProvider';
import Loading from '~/components/utils/Loading';
import CreateOrderMutation from '~/queries/CreateOrderMutation.gql';
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

export const createOrderStore = {
    email: '',
    name: '',
    surname: '',
    address: '',
    phone: '',
    setValue<T>(this: T, name: 'email'|'name'|'surname'|'phone'|'address', value: T[keyof T]): void {
        this[name as keyof T] = value;
    },
    loading: false,
    setLoading(state = true): void {
        this.loading = state;
    },
    errorMessage: null as null|string,
    setErrorMessage(state = null): void {
        this.errorMessage = state;
    },
};

function CreateOrderModal(): JSX.Element {
    const [modal, ref] = useBootstrap('Modal');

    const auth = useAuth();
    const user = auth.user || (() => { throw new Error(); })();
    const router = useRouter();

    const inputStore = useLocalObservable(() => ({
        ...createOrderStore,
        ...user,
    }));

    const handleConfirm = async () => {
        inputStore.setLoading(true);
        inputStore.setErrorMessage();
        const dataString = localStorage.getItem(CART_LOCAL_STORAGE_NAME);
        if (!dataString) return;
        const cartItemStore: CartItemStore[] = JSON.parse(dataString);
        const carts = cartItemStore.map(({ qty, product }) => ({ qty, product: product.id }));

        const { email, name, surname, phone, address } = inputStore;
        try {
            const data = await fetcher<OrderResponse>(
                CreateOrderMutation,
                {
                    email, name, surname, phone, address, orderedProducts: carts,
                },
            );

            inputStore.setLoading(false);
            localStorage.removeItem(CART_LOCAL_STORAGE_NAME);
            modal?.hide();
            router.push(`/order/${data.createOrder.order.id}`);
        } catch (error) {
            inputStore.setLoading(false);
            inputStore.setErrorMessage(error.message);
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
                            <CreateOrderForm inputStore={inputStore} />
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleConfirm}
                            >
                                Confirm
                                <Loading loading={inputStore.loading} size="sm" />
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

export default observer(CreateOrderModal);
