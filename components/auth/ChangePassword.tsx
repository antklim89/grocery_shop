import { observer } from 'mobx-react-lite';
import { FC, FormEvent, useState } from 'react';


import Loading from '../utils/Loading';

import UpdatePasswordMutation from '~/queries/UpdatePasswordMutation.gql';
import fetcher from '~/utils/fetcher';


const ChangePassword: FC = () => {
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string|null>(null);
    const [resultMessage, setResultMessage] = useState<string|null>(null);

    const handleSaveProfile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);
        setResultMessage(null);
        try {
            await fetcher(UpdatePasswordMutation, { password: newPassword, oldPassword });
            setResultMessage('Password is successully changed.');
        } catch (err) {
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="border rounded p-5 w-sm m-auto" onSubmit={handleSaveProfile}>
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-triangle px-2" />
                    {errorMessage}
                </div>
            )}
            {resultMessage && (
                <div className="alert alert-success" role="alert">
                    <i className="bi bi-exclamation-triangle px-2" />
                    {resultMessage}
                </div>
            )}
            <div className="mb-3">
                <label className="form-label w-100" htmlFor="newPassword">
                    Old Password
                    <input
                        autoComplete="current-password"
                        className="form-control"
                        id="newPassword"
                        type="text"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </label>
            </div>
            <div className="mb-3">
                <label className="form-label w-100" htmlFor="newPassword">
                    New Password
                    <input
                        autoComplete="current-password"
                        className="form-control"
                        id="newPassword"
                        type="text"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </label>
            </div>
            <div className="mb-3">
                <label className="form-label w-100" htmlFor="confirmPassword">
                    Confirm Password
                    <input
                        autoComplete="current-password"
                        className="form-control"
                        id="confirmPassword"
                        type="text"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
            </div>
            <button className="btn btn-primary" type="submit">
                Save
                <Loading loading={loading} size="sm" />
            </button>
        </form>
    );
};

export default observer(ChangePassword);
