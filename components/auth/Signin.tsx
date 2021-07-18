import axios from 'axios';
import { FormEvent, useState } from 'react';

import styles from '~/styles/Auth.module.scss';


export default function Signin(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data } = await axios.post('http://192.168.90.19:1337/auth/local/register', {
            email,
            username,
            password,
        });
        localStorage.setItem('token', data.jwt);
    };

    return (
        <div className="container">
            <h1 className="text-center text-primary">Sign In</h1>
            <form className={`p-5 border ${styles.form}`} onSubmit={handleLogin}>
                <div className="mb-3">
                    <input
                        required
                        className="form-control"
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
                        placeholder="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        required
                        className="form-control"
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
