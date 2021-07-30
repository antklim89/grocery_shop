import { HTMLAttributes } from 'react';

import { useAuth } from '~/components/auth/AuthProvider';
import useBootstrap from '~/utils/useBootstrap';


export default function LogoutButton(props: HTMLAttributes<HTMLButtonElement>): JSX.Element {
    const auth = useAuth();
    const [modal, ref] = useBootstrap('Modal');

    const handleLogout = () => {
        auth.logout();
        modal?.hide();
    };

    return (
        <>
            <button
                {...props}
                className="btn btn-link nav-link"
                data-bs-target="#logout-button"
                data-bs-toggle="modal"
                type="button"
            >
                Logout
            </button>

            <div
                aria-hidden
                aria-labelledby="orderFormLabel"
                className="modal fade"
                id="logout-button"
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
