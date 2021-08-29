import CartList from '~/components/cart/CartList';
import Seo from '~/components/utils/Seo';


const CartPage = (): JSX.Element => {
    return (
        <>
            <Seo description="Your cart." title="Cart" />
            <CartList />
        </>
    );
};

export default CartPage;
