import { GetServerSideProps } from 'next';

import ConfirmOrder from '~/components/cart/ConfirmOrder';
import ProtectedComponent from '~/components/utils/ProtectedComponent';
import Seo from '~/components/utils/Seo';
import query from '~/queries/Order.gql';
import { Order, OrderStatus } from '~/types';
import fetcher from '~/utils/fetcher';


export default function OrderPage(): JSX.Element {
    return (
        <ProtectedComponent notFound>
            <Seo title="Confirm Order" />
            <div className="container">
                <ConfirmOrder />
            </div>
        </ProtectedComponent>
    );
}


export const getServerSideProps: GetServerSideProps<any> = async ({ params, req }) => {
    console.debug('req: \n', req.headers);
    // const data = await fetcher<{order: Order}>(query.OrderQuery, { id: params?.id });
    // console.debug('data: \n', data);
    return { props: { x: 1 } };
};
