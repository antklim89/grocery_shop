import Link from 'next/link';

import HeaderLinks from './HeaderLinks';

import CartButton from '~/components/cart/CartButton';
import useBootstrap from '~/utils/useBootstrap';


const Header = (): JSX.Element => {
    useBootstrap('Offcanvas');

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-4">
            <div className="container">
                <Link passHref href="/">
                    <a className="navbar-brand me-auto">
                        GROCERY SHOP
                    </a>
                </Link>


                <nav className="d-lg-block d-none">
                    <HeaderLinks />
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
                    <nav className="offcanvas-body">
                        <HeaderLinks />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
