import { Observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import CartButton from '~/components/cart/CartButton';
import { useAuth } from '~/utils';


export default function Header(): JSX.Element {
    const collapseRef = useRef<HTMLDivElement>(null);
    const [collapse, setCollapse] = useState<bootstrap.Collapse>();

    const auth = useAuth();

    useEffect(() => {
        import('bootstrap/js/src/collapse')
            .then(({ default: Collapse }) => {
                if (collapseRef.current) {
                    setCollapse(new Collapse(collapseRef.current, { toggle: false }));
                }
            });
    }, []);

    const handleClose = () => {
        collapse?.hide();
    };

    const handleLogout = () => {
        auth.logout();
    };

    const { asPath } = useRouter();

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
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
                                    className={`nav-link ${asPath === '/' ? 'active' : ''}`}
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
                                    className={`nav-link ${asPath === '/products' ? 'active' : ''}`}
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
                                    className={`nav-link ${asPath === '/about' ? 'active' : ''}`}
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
                                    <li className="nav-item me-5">
                                        <button className="nav-link" type="button">
                                            {auth.user.username}
                                        </button>
                                    </li>
                                    <li className="nav-item me-5">
                                        <a
                                            className="nav-link"
                                            role="none"
                                            onClick={handleLogout}
                                        >
                                            Log Out
                                        </a>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link passHref href="/signin">
                                            <a
                                                className={`nav-link ${asPath === '/signin' ? 'active' : ''}`}
                                                role="none"
                                                onClick={handleClose}
                                            >
                                                Sign In
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="nav-item me-5">
                                        <Link passHref href="/login">
                                            <a
                                                className={`nav-link ${asPath === '/login' ? 'active' : ''}`}
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
