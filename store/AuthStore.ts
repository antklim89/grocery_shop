import { makeAutoObservable } from 'mobx';

import { UserStore } from './UserStote';

import LogInMutation from '~/queries/LogInMutation.gql';
import MeQuery from '~/queries/MeQuery.gql';
import SingUpMutation from '~/queries/SingUpMutation.gql';
import { AuthResponse, User } from '~/types';
import { AUTH_TOKEN_NAME } from '~/utils/constants';
import fetcher from '~/utils/fetcher';


export default class AuthStore {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    public user?: UserStore | null;

    public isAuth = typeof window === 'undefined' ? true : !!localStorage.getItem(AUTH_TOKEN_NAME)

    public isUserFetched = false

    public loading = false

    public error: null | string = null

    setUser(user: User, jwt?: string): void {
        this.user = new UserStore(user);
        this.isAuth = true;

        if (jwt) {
            localStorage.setItem(AUTH_TOKEN_NAME, jwt);
        }
    }

    async logout(): Promise<void> {
        this.user = null;
        this.isAuth = false;

        localStorage.removeItem(AUTH_TOKEN_NAME);
    }

    async signup({ email, username, password }: {email: string, username: string, password: string}): Promise<void> {
        await this.loginOrSignup(() => fetcher<AuthResponse>(
            SingUpMutation,
            { email, username, password },
        ));
    }

    async login({ email, password }: {email: string, password: string}): Promise<void> {
        await this.loginOrSignup(() => fetcher<AuthResponse>(
            LogInMutation,
            { identifier: email, password },
        ));
    }


    async fetchMe(): Promise<void> {
        if (!this.isAuth) return this.setIsUserFetched();
        try {
            const { me } = await fetcher(MeQuery);
            this.setUser(me);
            return this.setIsUserFetched();
        } catch (error) {
            localStorage.removeItem(AUTH_TOKEN_NAME);
            return this.setIsUserFetched();
        }
    }

    private async loginOrSignup(request: () => Promise<AuthResponse>): Promise<void> {
        this.setLoading(true);
        this.setError();
        try {
            const { data } = await request();
            this.setUser(data.user, data.jwt);
        } catch (error) {
            this.setError(error.message);
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    private setIsUserFetched(): void {
        this.isUserFetched = true;
    }

    private setLoading(state = true): void {
        this.loading = state;
    }

    private setError(state: string|null = null): void {
        this.error = state;
    }
}
