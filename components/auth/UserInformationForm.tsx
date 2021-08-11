import { observer } from 'mobx-react-lite';
import { FC, FormEvent } from 'react';

import Loading from '../utils/Loading';

import { useAuth } from './AuthProvider';


const UserInformationForm: FC = () => {
    const { user } = useAuth();
    if (!user) return null;

    const handleSaveProfile = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        user.updateServerProfile();
    };

    return (
        <form className="border rounded p-5 w-sm m-auto" onSubmit={handleSaveProfile}>
            <div className="mb-3">
                <label className="form-label w-100" htmlFor="name">
                    Name
                    <input
                        autoComplete="name"
                        className="form-control"
                        id="name"
                        type="text"
                        value={user.name || ''}
                        onChange={(e) => user.setValue('name', e.target.value)}
                    />
                </label>
            </div>
            <div className="mb-3">
                <label className="form-label w-100" htmlFor="surname">
                    Surname
                    <input
                        autoComplete="surname"
                        className="form-control"
                        id="surname"
                        type="text"
                        value={user.surname || ''}
                        onChange={(e) => user.setValue('surname', e.target.value)}
                    />
                </label>
            </div>
            <div className="mb-3">
                <label className="form-label w-100" htmlFor="phone">
                    Phone
                    <input
                        autoComplete="tel"
                        className="form-control"
                        id="phone"
                        type="tel"
                        value={user.phone || ''}
                        onChange={(e) => user.setValue('phone', e.target.value)}
                    />
                </label>
            </div>
            <div className="mb-3">
                <label className="form-label w-100" htmlFor="address">
                    Address
                    <input
                        autoComplete="address-line1"
                        className="form-control"
                        id="address"
                        type="text"
                        value={user.address || ''}
                        onChange={(e) => user.setValue('address', e.target.value)}
                    />
                </label>
            </div>
            <button className="btn btn-primary" disabled={user.savingProfile} type="submit">
                Save
                <Loading loading={user.savingProfile} size="sm" />
            </button>
        </form>
    );
};

export default observer(UserInformationForm);
