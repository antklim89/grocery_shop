import Link from 'next/link';
import { useEffect } from 'react';

import styles from './Header.module.scss';


export default function Header(): JSX.Element {
    useEffect(() => {
        import('bootstrap/js/src/collapse');
    }, []);

    return (
        <header className={`navbar navbar-expand-lg navbar-dark bg-dark ${styles.root}`}>
            <div className="container">
                <Link href="/">
                    <a className="navbar-brand" href="/">
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

                <nav className="collapse navbar-collapse" id="navbar-collapse-id">
                    <ul className="navbar-nav m-0">
                        <li className="nav-item">
                            <Link href="/">
                                <a className="nav-link active">HOME</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/about">
                                <a className="nav-link">ABOUT</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
