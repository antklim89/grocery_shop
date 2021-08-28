import { observer } from 'mobx-react-lite';
import Link from 'next/link';

import CartListItem from './CartListItem';
import CreateOrderModal from './CreateOrder';

import { useCart } from '~/components/cart/CartProvider';
import ProtectedComponent from '~/components/utils/ProtectedComponent';
import getTotalPrice from '~/utils/getTotalPrice';


const CartList = (): JSX.Element => {
    const cart = useCart();

    if (!cart.cartItems || cart.cartItems.length === 0) {
        return (
            <p className="h1 text-center text-uppercase">Cart is Empty</p>
        );
    }

    const totalPrice = getTotalPrice(cart.cartItems);

    return (
        <div className="container">
            <div className="list-group mt-5">
                {cart.cartItems.map((cartItem) => (
                    <CartListItem cartItem={cartItem} key={cartItem.product.id} />
                ))}
            </div>
            <div className="my-2 d-flex flex-column">
                <div className="my-5 align-self-end">
                    <p className="h2">
                        Total Price:
                        <br />
                        {totalPrice.toFixed(2)}
                        $
                    </p>
                </div>
                <ProtectedComponent
                    render={(
                        <Link href="/login">
                            <a className="btn btn-primary btn-lg align-self-center">
                                Login to confirm order...
                            </a>
                        </Link>
                    )}
                >
                    <Link href="/order">
                        <a className="btn btn-primary btn-lg align-self-center">
                            Create Order
                        </a>
                    </Link>
                </ProtectedComponent>
            </div>
        </div>
    );
};

export default observer(CartList);
