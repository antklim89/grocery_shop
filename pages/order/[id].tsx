import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '~/utils';
import client from '~/utils/graphql-request';


function OrderConfirmPage(): JSX.Element {
    const router = useRouter();
    const auth = useAuth();

    console.debug('||router: \n', router);

    useEffect(() => {
        (async () => {
            if (!router.query.id) return;
            if (!auth.tokenExists) return;
            const { data } = await client.rawRequest(`
                query OrderQuery($id: ID!) {
                    order( id: $id ) {
                        name
                        user {
                            username
                        }
                    }
                }
            `, { id: router.query.id });

            console.debug('||data: \n', data);
        })();
    }, [router.query.id]);

    return (
        <div>
            OrderConfirmPage
        </div>
    );
}

export default observer(OrderConfirmPage);
