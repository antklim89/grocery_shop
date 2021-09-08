import { Observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '~/components/auth/AuthProvider';
import LogoutButton from '~/components/auth/LogoutButton';
import Loading from '~/components/utils/Loading';
import ProtectedComponent from '~/components/utils/ProtectedComponent';


const HeaderLinks = (): JSX.Element => {
    const { route } = useRouter();
    const auth = useAuth();

    return (
        <ul className="navbar-nav m-0 w-100">
            <li className="nav-item">
                <Link passHref href="/">
                    <a
                        className={`nav-link ${route === '/'
                            ? 'active'
                            : ''}`}
                        data-bs-dismiss="offcanvas"
                    >
                        HOME
                    </a>
                </Link>
            </li>
            <li className="nav-item">
                <Link passHref href="/product">
                    <a
                        className={`nav-link ${route === '/products'
                            ? 'active'
                            : ''}`}
                        data-bs-dismiss="offcanvas"
                    >
                        PRODUCTS
                    </a>
                </Link>
            </li>
            <li className="nav-item me-auto">
                <Link passHref href="/about">
                    <a
                        className={`nav-link ${route === '/about'
                            ? 'active'
                            : ''}`}
                        data-bs-dismiss="offcanvas"
                    >
                        ABOUT
                    </a>
                </Link>
            </li>
            <ProtectedComponent
                fallback={(
                    <li className="nav-item">
                        <button className="btn btn-link nav-link mx-5" type="button">
                            <Loading loading size="sm" />
                        </button>
                    </li>
                )}
                render={(
                    <>
                        <li className="nav-item">
                            <Link passHref href="/signup">
                                <a
                                    className={`nav-link ${route === '/signup'
                                        ? 'active'
                                        : ''}`}
                                    data-bs-dismiss="offcanvas"
                                >
                                    Sign Up
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item me-5">
                            <Link passHref href="/login">
                                <a
                                    className={`nav-link ${route === '/login'
                                        ? 'active'
                                        : ''}`}
                                    data-bs-dismiss="offcanvas"
                                >
                                    Log In
                                </a>
                            </Link>
                        </li>
                    </>
                )}
            >
                <li className="nav-item me-1">
                    <Observer>
                        {() => (
                            <Link href="/profile">
                                <a className="nav-link btn btn-link" data-bs-dismiss="offcanvas">
                                    {auth.user?.username || ''}
                                </a>
                            </Link>
                        )}
                    </Observer>
                </li>
                <li className="nav-item me-5">
                    <LogoutButton
                        className="nav-link"
                        data-bs-dismiss="offcanvas"
                    />
                </li>
            </ProtectedComponent>
        </ul>
    );
};

export default HeaderLinks;
