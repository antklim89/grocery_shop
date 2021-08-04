import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { ReactElement } from 'react-markdown';

import { useAuth } from '../auth/AuthProvider';

import NotFoundPage from '~/pages/404';


interface Props {
    notFound?: boolean
    redirect?: string | 'back'
    authNeeded?: boolean
    render?: ReactElement
}

const ProtectedComponent: FC<Props> = ({
    children,
    redirect,
    notFound,
    render,
    authNeeded = true,
}) => {
    const auth = useAuth();
    const router = useRouter();

    const needProtect = authNeeded ? !auth.isAuth : auth.isAuth;
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!auth.isUserFetched) return;
        setIsMounted(true);
        console.debug('redirect: \n', redirect);
        if (needProtect && redirect === 'back') {
            router.back();
            return;
        }
        if (needProtect && redirect) {
            router.replace(redirect);
        }
    }, [auth.isUserFetched]);


    if (!isMounted) return null;

    if (needProtect && notFound) return <NotFoundPage />;

    if (needProtect && render) return render;

    if (needProtect) return null;

    return <>{children}</>;
};

export default observer(ProtectedComponent);
