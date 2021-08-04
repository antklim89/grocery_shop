import { useLocalObservable } from 'mobx-react-lite';
import {
    useEffect, ReactChild, createContext, useContext, useMemo,
} from 'react';

import MeQuery from '~/queries/MeQuery.gql';
import AuthStore from '~/store/AuthStore';
import client from '~/utils/graphql-request';


export const Context = createContext<AuthStore>({} as AuthStore);

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

    const auth = useMemo(() => new AuthStore(), []);


    return (
        <Context.Provider value={auth}>
            {children}
        </Context.Provider>
    );
}

export const useAuth = (): AuthStore => useContext(Context);
