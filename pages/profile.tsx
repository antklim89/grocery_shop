import { observer } from 'mobx-react-lite';

import { useAuth } from '~/components/auth/AuthProvider';
import Profile from '~/components/auth/Profile';
import ProtectedComponent from '~/components/utils/ProtectedComponent';
import Seo from '~/components/utils/Seo';


const ProfilePage = (): JSX.Element => {
    const { user } = useAuth();

    return (
        <ProtectedComponent notFound>
            <Seo description={`${user?.username}' profile`} title={`${user?.username}' profile`} />
            <Profile />
        </ProtectedComponent>
    );
};

export default observer(ProfilePage);
