import axios from 'axios';
import { FormEvent, useState } from 'react';

import styles from '~/styles/Auth.module.scss';


export default function Login(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data } = await axios.post('http://192.168.90.19:1337/auth/local', {
            identifier: email,
            password,
        });
        localStorage.setItem('token', data.jwt);
    };

    return (
        <div className="container">
            <h1 className="text-center text-primary">Log In</h1>
            <form className={`p-5 border ${styles.form}`} onSubmit={handleLogin}>
                <div className="mb-3">
                    <input
                        required
                        className="form-control"
                        id="email"
                        placeholder="E-mail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        required
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary" type="submit">
                    Log In
                </button>
            </form>
        </div>
    );
}
