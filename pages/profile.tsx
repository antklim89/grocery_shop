import { Observer } from 'mobx-react-lite';

import { useAuth } from '~/components/auth/AuthProvider';
import Profile from '~/components/auth/Profile';
import ProtectedComponent from '~/components/utils/ProtectedComponent';
import Seo from '~/components/utils/Seo';


export default function ProfilePage (): JSX.Element {

    const auth = useAuth();

    return (
        <ProtectedComponent notFound>
            <Observer>
                {() => <Seo title={`${auth.user?.username}' profile`} />}
            </Observer>
            <Profile />
        </ProtectedComponent>
    );

}
