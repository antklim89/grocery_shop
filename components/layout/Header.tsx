import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


export default function Header(): JSX.Element {
    useEffect(() => {
        import('bootstrap/js/src/collapse');
    }, []);

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

                <nav className="collapse navbar-collapse" id="navbar-collapse-id">
                    <ul className="navbar-nav m-0">
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
                        <li className="nav-item">
                            <Link href="/about">
                                <a className={`nav-link ${asPath === '/about' ? 'active' : ''}`}>ABOUT</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
