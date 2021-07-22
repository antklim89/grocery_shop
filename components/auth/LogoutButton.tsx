import { HTMLAttributes } from 'react';

import { useAuth } from '~/utils';
import { useBootstrap } from '~/utils/useBootstrap';


export default function LogoutButton(props: HTMLAttributes<HTMLAnchorElement>): JSX.Element {
    const auth = useAuth();
    const [modal, ref] = useBootstrap('Modal');

    const handleLogout = () => {
        auth.logout();
        modal?.hide();
    };

    return (
        <>
            <a
                {...props}
                data-bs-target="#order-form"
                data-bs-toggle="modal"
            >
                Logout
            </a>

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
                        <div className="modal-body">
                            Are you sure you want to log out?
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleLogout}
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
