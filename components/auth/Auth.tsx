import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { FC, FormEvent, useState } from 'react';

import { useAuth } from '~/components/auth/AuthProvider';
import Loading from '~/components/utils/Loading';
import styles from '~/styles/Auth.module.scss';


const Auth: FC<{isSignup?: boolean}> = ({ isSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const auth = useAuth();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (isSignup) {
                await auth.signup({ email, username: email, password });
            } else {
                await auth.login({ email, password });
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="container">
            <h1 className="text-center text-primary">{isSignup ? 'Sign Up' : 'Log In'}
            </h1>
            <form className={`p-5 border ${styles.form}`} onSubmit={handleLogin}>
                {auth.error && (
                    <div className="alert alert-danger" role="alert">
                        <i className="bi bi-exclamation-triangle px-2" />
                        {auth.error}
                    </div>
                )}
                <div className="mb-3">
                    <input
                        required
                        autoComplete="email"
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
                        autoComplete={isSignup ? 'new-password' : 'current-password'}
                        className="form-control"
                        pattern="\S*"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                { isSignup && (
                    <div className="mb-3">
                        <input
                            required
                            autoComplete="new-password"
                            className="form-control"
                            pattern="\S*"
                            placeholder="Confirm password"
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                        />
                    </div>
                )}
                <div>
                    <p className="text-center">
                        or{' '}
                        {isSignup
                            ? (
                                <Link passHref href="/login">
                                    <a className="text-decoration-underline">Log In</a>
                                </Link>
                            )
                            : (
                                <Link passHref href="/signup">
                                    <a className="text-decoration-underline">Sign Up</a>
                                </Link>
                            )}
                    </p>
                </div>
                <button className="btn btn-primary" disabled={auth.loading} type="submit">
                    {isSignup ? 'Sign up' : 'Log In'}
                    <Loading loading={auth.loading} size="sm" />
                </button>
            </form>
        </div>
    );
};

export default observer(Auth);
