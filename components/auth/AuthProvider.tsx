import { useLocalObservable } from 'mobx-react-lite';
import { useEffect, ReactChild, createContext } from 'react';

import MeQuery from '~/queries/MeQuery.gql';
import { authStore } from '~/store/authStore';
import { AuthStore } from '~/types';
import client from '~/utils/graphql-request';


export const Context = createContext<AuthStore>(authStore);

export default function AuthProvider({ children }: { children: ReactChild}): JSX.Element {
    useEffect(() => {
        if (!localStorage.getItem('token')) return;

        (async () => {
            try {
                const { me } = await client.request(MeQuery);
                auth.setUser(me);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const auth = useLocalObservable(() => authStore);


    return (
        <Context.Provider value={auth}>
            {children}
        </Context.Provider>
    );
}
