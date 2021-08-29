import CreateOrder from '~/components/cart/CreateOrder';
import ProtectedComponent from '~/components/utils/ProtectedComponent';
import Seo from '~/components/utils/Seo';


const CreateOrderPage = (): JSX.Element => {
    return (
        <ProtectedComponent>
            <Seo description="Create order page." title="Create order" />
            <CreateOrder />
        </ProtectedComponent>
    );
};

export default CreateOrderPage;
