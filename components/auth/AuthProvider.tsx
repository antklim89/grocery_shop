import axios from 'axios';
import { useLocalObservable } from 'mobx-react-lite';
import { useEffect, ReactChild, createContext } from 'react';

import { authStore } from '~/store/authStore';
import { AuthStore } from '~/types';


export const Context = createContext<AuthStore>(authStore);

export default function AuthProvider({ children }: { children: ReactChild}): JSX.Element {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(({ data }) => {
                auth.setUser(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const auth = useLocalObservable(() => authStore);


    return (
        <Context.Provider value={auth}>
            {children}
        </Context.Provider>
    );
}
