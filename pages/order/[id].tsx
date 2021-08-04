import ConfirmOrder from '~/components/cart/ConfirmOrder';
import ProtectedComponent from '~/components/utils/ProtectedComponent';
import Seo from '~/components/utils/Seo';


export default function ConfirmOrderPage(): JSX.Element {
    return (
        <ProtectedComponent notFound>
            <Seo title="Confirm Order" />
            <div className="container">
                <ConfirmOrder />
            </div>
        </ProtectedComponent>
    );
}
