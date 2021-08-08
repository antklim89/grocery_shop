import { Observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Loading from '../utils/Loading';
import ProtectedComponent from '../utils/ProtectedComponent';

import { useAuth } from '~/components/auth/AuthProvider';
import LogoutButton from '~/components/auth/LogoutButton';
import CartButton from '~/components/cart/CartButton';
import useBootstrap from '~/utils/useBootstrap';


export default function Header(): JSX.Element {
    const auth = useAuth();

    useBootstrap('Offcanvas');

    const { route } = useRouter();

    const links = (
        <>
            <li className="nav-item">
                <Link passHref href="/">
                    <a
                        className={`nav-link ${route === '/' ? 'active' : ''}`}
                        data-bs-dismiss="offcanvas"
                    >
                        HOME
                    </a>
                </Link>
            </li>
            <li className="nav-item">
                <Link passHref href="/product">
                    <a
                        className={`nav-link ${route === '/products' ? 'active' : ''}`}
                        data-bs-dismiss="offcanvas"
                    >
                        PRODUCTS
                    </a>
                </Link>
            </li>
            <li className="nav-item me-auto">
                <Link passHref href="/about">
                    <a
                        className={`nav-link ${route === '/about' ? 'active' : ''}`}
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
                                    className={`nav-link ${route === '/signup' ? 'active' : ''}`}
                                    data-bs-dismiss="offcanvas"
                                >
                                    Sign Up
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item me-5">
                            <Link passHref href="/login">
                                <a
                                    className={`nav-link ${route === '/login' ? 'active' : ''}`}
                                    data-bs-dismiss="offcanvas"
                                >
                                    Log In
                                </a>
                            </Link>
                        </li>
                    </>
                )}
            >
                <>
                    <li className="nav-item me-1">
                        <Link href="/profile">
                            <a className="nav-link btn btn-link" data-bs-dismiss="offcanvas">
                                <Observer>
                                    {() => <>{auth.user?.username}</>}
                                </Observer>
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item me-5">
                        <LogoutButton
                            className="nav-link"
                            data-bs-dismiss="offcanvas"
                        />
                    </li>
                </>
            </ProtectedComponent>
        </>
    );

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-4">
            <div className="container">
                <Link passHref href="/">
                    <a className="navbar-brand me-auto">
                        GROCERY SHOP
                    </a>
                </Link>


                <nav className="d-lg-block d-none">
                    <ul className="navbar-nav m-0 w-100">
                        {links}
                    </ul>
                </nav>

                <CartButton className="btn btn-primary bg-dark position-relative align-self-end me-lg-0 me-4" />

                <button
                    aria-expanded
                    aria-controls="offcanvas"
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-bs-target="#header-navbar"
                    data-bs-toggle="offcanvas"
                    type="button"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div
                    aria-labelledby="offcanvasCalalogLabel"
                    className="offcanvas offcanvas-end bg-primary"
                    id="header-navbar"
                    tabIndex={-1}
                >
                    <div className="offcanvas-header">
                        <button
                            aria-label="Close"
                            className="btn-close btn-close-white text-reset me-auto"
                            data-bs-dismiss="offcanvas"
                            type="button"
                        />
                    </div>
                    <div className="offcanvas-body">
                        <nav>
                            <ul className="navbar-nav">
                                {links}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
