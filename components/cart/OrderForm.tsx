import { useState } from 'react';

import { useAuth } from '~/utils';


export default function OrderForm(): JSX.Element {
    const auth = useAuth();

    const [email, setEmail] = useState(() => auth.user?.email || '');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');


    return (
        <form className="row">
            <div className="mb-3 col-sm-6 col-12">
                <label className="w-100" htmlFor="email">
                    Name:
                    <input
                        required
                        autoComplete="username"
                        className="form-control"
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
            </div>
            <div className="mb-3 col-sm-6 col-12">
                <label className="w-100" htmlFor="email">
                    Surname:
                    <input
                        required
                        autoComplete="surname"
                        className="form-control"
                        id="surname"
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </label>
            </div>
            <div className="mb-3 col-12">
                <label className="w-100" htmlFor="email">
                    E-mail:
                    <input
                        required
                        autoComplete="username"
                        className="form-control"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
            </div>
            <div className="mb-3 col-12">
                <label className="w-100" htmlFor="email">
                    Address:
                    <input
                        required
                        autoComplete="address"
                        className="form-control"
                        id="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
            </div>
            <div className="mb-3 col-12">
                <label className="w-100" htmlFor="email">
                    Phone number:
                    <input
                        required
                        autoComplete="phone"
                        className="form-control"
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </label>
            </div>
        </form>
    );
}
