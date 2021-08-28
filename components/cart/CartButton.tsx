import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';

import { useCart } from '~/components/cart/CartProvider';


const CartButton = (props: ButtonHTMLAttributes<HTMLAnchorElement>): JSX.Element => {
    const cart = useCart();
    return (
        <Link href="/cart">
            <a {...props}>
                <i className="bi bi-cart " />
                {cart.cartItems?.length
                    ? (
                        <span
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        >
                            {cart.cartItems?.length || 0}
                            <span className="visually-hidden">unread messages</span>
                        </span>
                    )
                    : null}
            </a>
        </Link>
    );
};

export default observer(CartButton);
