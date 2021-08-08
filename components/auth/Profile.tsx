import { FC } from 'react';

import { User } from '~/types';


const Profile: FC<User> = ({ profile, username }) => {
    return (
        <div className="container">
            <h1 className="text-center mb-4">
                {username}
                &apos; profile
            </h1>
            {profile?.name}
        </div>
    );
};

export default Profile;
