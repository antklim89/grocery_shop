import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

import { useCart } from '~/utils/useCart';


function CartButton(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>): JSX.Element {
    const cart = useCart();
    return (
        <button className="btn btn-primary position-relative align-self-end" type="button" {...props}>
            <Link passHref href="/cart">
                <i className="bi bi-cart" />
            </Link>
            {cart.products?.length ? (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.products?.length || 0}
                    <span className="visually-hidden">unread messages</span>
                </span>
            ) : null}
        </button>
    );
}

export default observer(CartButton);
