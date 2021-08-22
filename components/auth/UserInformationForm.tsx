import { observer } from 'mobx-react-lite';
import { FC, FormEvent, useMemo, useState } from 'react';

import { useAuth } from './AuthProvider';

import Alert from '~/components/utils/Alert';
import Loading from '~/components/utils/Loading';
import cls from '~/utils/cls';


const UserInformationForm: FC = () => {
    const user = useAuth().user || (() => { throw new Error(); })();
    const { name = '', phone = '', address = '', surname = '' } = user;

    const [errorMessage, setErrorMessage] = useState<string|null>(null);
    const [resultMessage, setResultMessage] = useState<string|null>(null);
    const [submitClicked, setSubmitClicked] = useState(false);

    const isValidFields = useMemo(() => ({
        name: /^[a-zA-Z-']*$/ig.test(name),
        surname: /^[a-zA-Z-']*$/ig.test(surname),
        phone: /^[\d-]*$/ig.test(phone),
        address: /[.]*/ig.test(address),
    }), [name, phone, address, surname]);


    const handleSaveProfile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitClicked(true);
        if (!Object.values(isValidFields).every((i) => i)) return;
        setErrorMessage(null);
        setResultMessage(null);
        try {
            await user.updateServerProfile();
            setResultMessage(`${user.username}'s profile has been successfully updated`);
            setSubmitClicked(false);
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    return (
        <form className="border rounded p-5 m-auto" onSubmit={handleSaveProfile}>
            <Alert message={resultMessage} type="success" />
            <Alert message={errorMessage} type="danger" />
            <div className="mb-3">
                <label className="form-label w-100" htmlFor="name">
                    Name
                    <input
                        autoComplete="name"
                        className={cls('form-control', submitClicked && !isValidFields.name && 'is-invalid')}
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => user.setValue('name', e.target.value)}
                    />
                    <span className="invalid-feedback">Name is invalid</span>
                </label>
            </div>
            <div className="mb-3">
                <label className="form-label w-100" htmlFor="surname">
                    Surname
                    <input
                        autoComplete="surname"
                        className={cls('form-control', submitClicked && !isValidFields.surname && 'is-invalid')}
                        id="surname"
                        type="text"
                        value={surname}
                        onChange={(e) => user.setValue('surname', e.target.value)}
                    />
                    <span className="invalid-feedback">Surname password is invalid</span>
                </label>
            </div>
            <div className="mb-3">
                <label className="form-label w-100" htmlFor="phone">
                    Phone
                    <input
                        autoComplete="tel"
                        className={cls('form-control', submitClicked && !isValidFields.phone && 'is-invalid')}
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => user.setValue('phone', e.target.value)}
                    />
                    <span className="invalid-feedback">Phone is invalid</span>
                </label>
            </div>
            <div className="mb-3">
                <label className="form-label w-100" htmlFor="address">
                    Address
                    <input
                        autoComplete="address-line1"
                        className={cls('form-control', submitClicked && !isValidFields.address && 'is-invalid')}
                        id="address"
                        type="text"
                        value={address}
                        onChange={(e) => user.setValue('address', e.target.value)}
                    />
                    <span className="invalid-feedback">Address is invalid</span>
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
