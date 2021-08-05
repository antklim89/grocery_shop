import CartList from '~/components/cart/CartList';
import Seo from '~/components/utils/Seo';


export default function CartPage(): JSX.Element {
    return (
        <>
            <Seo title="Cart" />
            <CartList />
        </>
    );
}
