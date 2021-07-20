import axios from 'axios';
import { FormEvent, useState } from 'react';

import styles from '~/styles/Auth.module.scss';
import { User } from '~/types';
import { useAuth } from '~/utils';


export default function Login(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setloading] = useState(false);

    const auth = useAuth();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloading(true);
        try {
            const { data } = await axios.post<{jwt: string, user: User}>(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
                    identifier: email,
                    password,
                },
            );
            localStorage.setItem('token', data.jwt);
            auth.setUser(data.user);
        } finally {
            setloading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center text-primary">Log In</h1>
            <form className={`p-5 border ${styles.form}`} onSubmit={handleLogin}>
                <div className="mb-3">
                    <input
                        required
                        autoComplete="username"
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
                        autoComplete="current-password"
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
                    {loading && (
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}
                </button>
            </form>
        </div>
    );
}
