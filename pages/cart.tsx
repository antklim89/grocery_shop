import CartList from '~/components/cart/CartList';
import Seo from '~/components/utils/Seo';


const CartPage = (): JSX.Element => {
    return (
        <>
            <Seo title="Cart" />
            <CartList />
        </>
    );
};

export default CartPage;
