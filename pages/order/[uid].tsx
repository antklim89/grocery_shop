import ConfirmOrder from '~/components/cart/ConfirmOrder';
import Seo from '~/components/utils/Seo';


export default function ConfirmOrderPage(): JSX.Element {
    return (
        <>
            <Seo title="Confirm Order" />
            <div className="container">
                <ConfirmOrder />
            </div>
        </>
    );
}
