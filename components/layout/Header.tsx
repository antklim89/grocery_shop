import type CollapseType from 'bootstrap/js/src/collapse';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import CartButton from '~/components/cart/CartButton';


export default function Header(): JSX.Element {
    const collapseRef = useRef<HTMLDivElement>(null);
    const [collapse, setCollapse] = useState<CollapseType>();

    useEffect(() => {
        import('bootstrap/js/src/collapse')
            .then(({ default: Collapse }) => {
                if (collapseRef.current) {
                    setCollapse(new Collapse(collapseRef.current, { toggle: false }));
                }
            });
    }, []);

    useEffect(() => {
        const listener = () => {
            setTimeout(() => collapse?.hide(), 100);
        };
        window.addEventListener('click', listener);
        return () => window.removeEventListener('click', listener);
    }, [collapse]);

    const { asPath } = useRouter();

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container">
                <Link href="/">
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
                            <Link href="/">
                                <a className={`nav-link ${asPath === '/' ? 'active' : ''}`}>HOME</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/products">
                                <a className={`nav-link ${asPath === '/products' ? 'active' : ''}`}>PRODUCTS</a>
                            </Link>
                        </li>
                        <li className="nav-item me-auto">
                            <Link href="/about">
                                <a className={`nav-link ${asPath === '/about' ? 'active' : ''}`}>ABOUT</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/signin">
                                <a className={`nav-link ${asPath === '/signin' ? 'active' : ''}`}>
                                    Sign In
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item me-5">
                            <Link href="/login">
                                <a className={`nav-link ${asPath === '/login' ? 'active' : ''}`}>
                                    Log In
                                </a>
                            </Link>
                        </li>
                        <CartButton />
                    </ul>
                </nav>
            </div>
        </header>
    );
}
