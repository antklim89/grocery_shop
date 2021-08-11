import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useAuth } from './AuthProvider';
import UserInformationForm from './UserInformationForm';


const Profile: FC = () => {
    const { user } = useAuth();

    if (!user) return null;
    return (
        <div className="container">
            <h1 className="text-center mb-4">
                {user.username}
                &apos; profile
            </h1>
            <UserInformationForm />
        </div>
    );
};

export default observer(Profile);
