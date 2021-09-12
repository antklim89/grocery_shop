import { GetServerSideProps } from 'next';

import ConfirmOrder from '~/components/cart/ConfirmOrder';
import Seo from '~/components/utils/Seo';
import query from '~/queries/Order.gql';
import { Order } from '~/types';
import fetcher from '~/utils/fetcher';


interface Props {
    order?: Order
    error?: string
}

const OrderPage = ({ order, error }: Props): JSX.Element => {
    if (!order) return (
        <>
            <Seo title="Confirm Order" />
            <div className="position-absolute top-50 start-50 translate-middle">
                <span className="h1">
                    {error}
                </span>
            </div>
        </>
    );

    return (
        <>
            <Seo description="Your orders." title="Confirm Order" />
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

    try {
        const { order } = await fetcher<{order: Order}>(
            query.OrderQuery,
            { id: params.id },
            { headers: { Authorization: `Bearer ${token}` } },
        );

        if (!order) {
            return { notFound: true };
        }

        return { props: { order } };
    } catch (error) {
        return { props: { error: error instanceof Error ? error.message : 'Unexpected error.Try again later.' } };
    }

};

export default OrderPage;
