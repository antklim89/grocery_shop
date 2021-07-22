import { Observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/router';

import LogoutButton from '~/components/auth/LogoutButton';
import CartButton from '~/components/cart/CartButton';
import { useAuth } from '~/utils';
import { useBootstrap } from '~/utils/useBootstrap';


export default function Header(): JSX.Element {
    const auth = useAuth();

    const [collapse, collapseRef] = useBootstrap('Collapse');

    const handleClose = () => {
        collapse?.hide();
    };

    const { route } = useRouter();

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-4">
            <div className="container">
                <Link passHref href="/">
                    <a className="navbar-brand">
                        GROCERY SHOP
                    </a>
                </Link>

                <button
                    aria-expanded
                    aria-controls="navbar-collapse"
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-bs-target="#navbar-collapse-id"
                    data-bs-toggle="collapse"
                    type="button"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <nav className="collapse navbar-collapse" id="navbar-collapse-id" ref={collapseRef}>
                    <ul className="navbar-nav m-0 w-100">
                        <li className="nav-item">
                            <Link passHref href="/">
                                <a
                                    className={`nav-link ${route === '/' ? 'active' : ''}`}
                                    role="none"
                                    onClick={handleClose}
                                >
                                    HOME
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link passHref href="/products">
                                <a
                                    className={`nav-link ${route === '/products' ? 'active' : ''}`}
                                    role="none"
                                    onClick={handleClose}
                                >
                                    PRODUCTS
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item me-auto">
                            <Link passHref href="/about">
                                <a
                                    className={`nav-link ${route === '/about' ? 'active' : ''}`}
                                    role="none"
                                    onClick={handleClose}
                                >
                                    ABOUT
                                </a>
                            </Link>
                        </li>
                        <Observer>
                            {() => (auth.user ? (
                                <>
                                    <li className="nav-item me-1">
                                        <button className="nav-link btn btn-link" type="button">
                                            {auth.user.username}
                                        </button>
                                    </li>
                                    <li className="nav-item me-5">
                                        <LogoutButton
                                            className="nav-link"
                                            onConfirm={handleClose}
                                        />
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link passHref href="/signup">
                                            <a
                                                className={`nav-link ${route === '/signup' ? 'active' : ''}`}
                                                role="none"
                                                onClick={handleClose}
                                            >
                                                Sign Up
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="nav-item me-5">
                                        <Link passHref href="/login">
                                            <a
                                                className={`nav-link ${route === '/login' ? 'active' : ''}`}
                                                role="none"
                                                onClick={handleClose}
                                            >
                                                Log In
                                            </a>
                                        </Link>
                                    </li>
                                </>
                            ))}
                        </Observer>
                        <CartButton onClick={handleClose} />
                    </ul>
                </nav>
            </div>
        </header>
    );
}
