import { GetServerSideProps } from 'next';

import ConfirmOrder from '~/components/cart/ConfirmOrder';
import Seo from '~/components/utils/Seo';
import query from '~/queries/Order.gql';
import { Order } from '~/types';
import fetcher from '~/utils/fetcher';


interface Props {
    order: Order
}

const OrderPage = ({ order }: Props): JSX.Element => {
    return (
        <>
            <Seo title="Confirm Order" />
            <div className="container">
                <ConfirmOrder order={order} />
            </div>
        </>
    );
};


export const getServerSideProps: GetServerSideProps<Props> = async ({ params, req }) => {
    const { token } = req.cookies;
    if (!token) {
        return { notFound: true };
    }

    const Authorization = token
        ? `Bearer ${token}`
        : '';

    const { order } = await fetcher<{order: Order}>(
        query.OrderQuery,
        { id: params?.id },
        { headers: { Authorization } },
    );

    if (!order) {
        return { notFound: true };
    }

    return { props: { order } };
};

export default OrderPage;
