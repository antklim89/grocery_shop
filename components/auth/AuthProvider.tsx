import {
    useEffect, ReactChild, createContext, useContext, useMemo,
} from 'react';

import AuthStore from '~/store/AuthStore';


export const Context = createContext<AuthStore>({} as AuthStore);

export default function AuthProvider({ children }: { children: ReactChild}): JSX.Element {
    const auth = useMemo(() => new AuthStore(), []);

    useEffect(() => {
        auth.fetchMe();
    }, []);

    return (
        <Context.Provider value={auth}>
            {children}
        </Context.Provider>
    );
}

export const useAuth = (): AuthStore => useContext(Context);
