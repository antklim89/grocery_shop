import { useEffect } from 'react';

import OrderForm from './OrderForm';


function CartFormModal(): JSX.Element {
    useEffect(() => {
        import('bootstrap/js/src/modal');
    }, []);

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
                            <OrderForm />
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-primary"
                                type="button"
                            >
                                Confirm
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

export default CartFormModal;
