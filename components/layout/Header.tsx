import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import CartButton from '~/components/cart/CartButton';


export default function Header(): JSX.Element {
    const collapseRef = useRef<HTMLDivElement>(null);
    const [collapse, setCollapse] = useState<bootstrap.Collapse>();

    useEffect(() => {
        import('bootstrap/js/src/collapse')
            .then(({ default: Collapse }) => {
                if (collapseRef.current) {
                    setCollapse(new Collapse(collapseRef.current, { toggle: false }));
                }
            });
    }, []);

    // useEffect(() => {
    //     const listener = () => {
    //         setTimeout(() => collapse?.hide(), 100);
    //     };
    //     window.addEventListener('click', listener);
    //     return () => window.removeEventListener('click', listener);
    // }, [collapse]);
    const handleClose = () => {
        collapse?.hide();
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
                                <button
                                    className={`nav-link btn btn-link ${asPath === '/' ? 'active' : ''}`}
                                    type="button"
                                    onClick={handleClose}
                                >
                                    HOME
                                </button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link passHref href="/products">
                                <button
                                    className={`nav-link btn btn-link ${asPath === '/products' ? 'active' : ''}`}
                                    type="button"
                                    onClick={handleClose}
                                >
                                    PRODUCTS
                                </button>
                            </Link>
                        </li>
                        <li className="nav-item me-auto">
                            <Link passHref href="/about">
                                <button
                                    className={`nav-link btn btn-link ${asPath === '/about' ? 'active' : ''}`}
                                    type="button"
                                    onClick={handleClose}
                                >
                                    ABOUT
                                </button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link passHref href="/signin">
                                <button
                                    className={`nav-link btn btn-link ${asPath === '/signin' ? 'active' : ''}`}
                                    type="button"
                                    onClick={handleClose}
                                >
                                    Sign In
                                </button>
                            </Link>
                        </li>
                        <li className="nav-item me-5">
                            <Link passHref href="/login">
                                <button
                                    className={`nav-link btn btn-link ${asPath === '/login' ? 'active' : ''}`}
                                    type="button"
                                    onClick={handleClose}
                                >
                                    Log In
                                </button>
                            </Link>
                        </li>
                        <CartButton onClick={handleClose} />
                    </ul>
                </nav>
            </div>
        </header>
    );
}
