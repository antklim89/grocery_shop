import { GetServerSideProps } from 'next';

import ConfirmOrder from '~/components/cart/ConfirmOrder';
import ProtectedComponent from '~/components/utils/ProtectedComponent';
import Seo from '~/components/utils/Seo';
import query from '~/queries/Order.gql';
import { Order, OrderStatus } from '~/types';
import { AUTH_TOKEN_NAME } from '~/utils/constants';
import { getCookie } from '~/utils/cookie';
import fetcher from '~/utils/fetcher';


interface Props {
    order: Order
}

export default function OrderPage({ order }: Props): JSX.Element {
    return (
        <>
            <Seo title="Confirm Order" />
            <div className="container">
                <ConfirmOrder order={order} />
            </div>
        </>
    );
}


export const getServerSideProps: GetServerSideProps<Props> = async ({ params, req }) => {
    console.debug('req.cook: \n', req.cookies);
    const { token } = req.cookies;
    if (!token) { return { notFound: true }; }

    const { order } = await fetcher<{order: Order}>(
        query.OrderQuery,
        { id: params?.id },
        { headers: { Authorization: token ? `Bearer ${token}` : '' } },
    );


    return { props: { order } };
};
