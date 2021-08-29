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
            <ConfirmOrder order={order} />
        </>
    );
};


export const getServerSideProps: GetServerSideProps<Props> = async ({ params, req }) => {
    const { token } = req.cookies;
    if (!token) {
        return { notFound: true };
    }
    if (!params || !params.id) {
        return { notFound: true };
    }

    const { order } = await fetcher<{order: Order}>(
        query.OrderQuery,
        { id: params.id },
        { headers: { Authorization: `Bearer ${token}` } },
    );

    if (!order) {
        return { notFound: true };
    }

    return { props: { order } };
};

export default OrderPage;
