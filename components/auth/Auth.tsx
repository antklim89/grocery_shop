import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

import { useCart } from '../cart/CartProvider';
import Loading from '../utils/Loading';

import { useAuth } from '~/components/auth/AuthProvider';
import LogInMutation from '~/queries/LogInMutation.gql';
import SingUpMutation from '~/queries/SingUpMutation.gql';
import { CartItemStoreArgs } from '~/store/CartItemStore';
import styles from '~/styles/Auth.module.scss';
import { User } from '~/types';
import { getCartItems } from '~/utils/cartStorage';
import fetcher from '~/utils/fetcher';
import client from '~/utils/graphql-request';


interface AuthResponse {
    data: {
        jwt: string;
        user: User;
    };
}

export default function Auth({ isSignup }: {isSignup?: boolean}): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setloading] = useState(false);

    const auth = useAuth();
    const router = useRouter();
    const cart = useCart();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloading(true);

        try {
            const { data } = isSignup
                ? await client.request<AuthResponse>(SingUpMutation, {
                    email, username, password, cart: [{ qty: 1, products: 1 }],
                })
                : await client.request<AuthResponse>(LogInMutation, {
                    identifier: email, password,
                });

            auth.setUser(data.user, data.jwt);

            const cartItems = getCartItems()?.map((i) => ({ qty: i.qty, product: i.product.id }));
            console.debug('cartItems: ', cartItems);
            const newCartItems = await fetcher<CartItemStoreArgs[]>('/carts/refresh', {
                method: 'post',
                body: cartItems || [],
            });

            console.debug(newCartItems);
            cart.replace(newCartItems);

            setloading(false);
            await router.back();
        } catch (err) {
            console.error(err);
            setloading(false);
        }
    };

    // if (auth.user) {
    //     return (
    //         <p className="h1 text-center">
    //             You are already
    //             {isSignup ? ' sign up.' : ' log in.'}
    //         </p>
    //     );
    // }
    return (
        <div className="container">
            <h1 className="text-center text-primary">{isSignup ? 'Sign Up' : 'Log In'}</h1>
            <form className={`p-5 border ${styles.form}`} onSubmit={handleLogin}>
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
                {isSignup && (
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
                )}
                <div className="mb-3">
                    <input
                        required
                        autoComplete="current-password"
                        className="form-control"
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
                            autoComplete="current-password"
                            className="form-control"
                            placeholder="Confirm password"
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                        />
                    </div>
                )}
                <button className="btn btn-primary" disabled={loading} type="submit">
                    {isSignup ? 'Sign up' : 'Log In'}
                    <Loading loading={loading} size="sm" />
                </button>
            </form>
        </div>
    );
}
