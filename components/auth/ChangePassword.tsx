import { observer } from 'mobx-react-lite';
import { FC, FormEvent, useMemo, useState } from 'react';

import Alert from '~/components/utils/Alert';
import Loading from '~/components/utils/Loading';
import UpdatePasswordMutation from '~/queries/UpdatePasswordMutation.gql';
import cls from '~/utils/cls';
import fetcher from '~/utils/fetcher';


const ChangePassword: FC = () => {
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string|null>(null);
    const [resultMessage, setResultMessage] = useState<string|null>(null);
    const [submitClicked, setSubmitClicked] = useState(false);

    const isValidFields = useMemo(() => ({
        newPassword: /^[\S]{3,}$/ig.test(newPassword),
        oldPassword: /^[\S]{3,}$/ig.test(oldPassword),
        get confirmPassword(): boolean {
            return newPassword === confirmPassword;
        },
    }), [newPassword, oldPassword, confirmPassword]);

    const handleSaveProfile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitClicked(true);
        if (!Object.values(isValidFields).every((i) => i)) return;
        setLoading(true);
        setErrorMessage(null);
        setResultMessage(null);
        try {
            await fetcher(UpdatePasswordMutation, { password: newPassword, oldPassword });
            setResultMessage('Password is successully changed.');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setSubmitClicked(false);
        } catch (err) {
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="border rounded p-5 m-auto" onSubmit={handleSaveProfile}>
            <Alert message={resultMessage} type="success" />
            <Alert message={errorMessage} type="danger" />
            <div className="mb-3">
                <label className="form-label w-100" htmlFor="newPassword">
                    Old Password
                    <input
                        autoComplete="current-password"
                        className={cls('form-control', submitClicked && !isValidFields.oldPassword && 'is-invalid')}
                        id="newPassword"
                        type="text"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <span className="invalid-feedback">Old password is invalid</span>
                </label>
            </div>
            <div className="mb-3">
                <label className="form-label w-100" htmlFor="newPassword">
                    New Password
                    <input
                        autoComplete="current-password"
                        className={cls('form-control', submitClicked && !isValidFields.newPassword && 'is-invalid')}
                        id="newPassword"
                        type="text"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <span className="invalid-feedback">New password is invalid</span>
                </label>
            </div>
            <div className="mb-3">
                <label className="form-label w-100" htmlFor="confirmPassword">
                    Confirm Password
                    <input
                        autoComplete="current-password"
                        className={cls('form-control', submitClicked && !isValidFields.confirmPassword && 'is-invalid')}
                        id="confirmPassword"
                        type="text"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span className="invalid-feedback">The new and old passwords do not match.</span>
                </label>
            </div>
            <button className="btn btn-primary" disabled={loading} type="submit">
                Save
                <Loading loading={loading} size="sm" />
            </button>
        </form>
    );
};

export default observer(ChangePassword);
