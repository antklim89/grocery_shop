import { makeAutoObservable } from 'mobx';

import { UserStore } from './UserStote';

import { AUTH_TOKEN_NAME } from '~/constants';
import query from '~/queries/Auth.gql';
import { AuthResponse, User } from '~/types';
import { clearCookie, hasCookie, setCookie } from '~/utils/cookie';
import fetcher from '~/utils/fetcher';


export default class AuthStore {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    public user?: UserStore | null;

    public isAuth = hasCookie(AUTH_TOKEN_NAME)

    public isUserFetched = false

    public loading = false

    public error: null | string = null

    setUser(user: User, jwt?: string): void {
        this.user = new UserStore(user);
        this.isAuth = true;

        if (jwt) {
            setCookie(AUTH_TOKEN_NAME, jwt);
        }
    }

    getUser(): UserStore {
        if (this.user) return this.user;
        throw new Error('User is required');
    }

    async logout(): Promise<void> {
        this.user = null;
        this.isAuth = false;

        clearCookie(AUTH_TOKEN_NAME);
    }

    async signup({ email, username, password }: {email: string, username: string, password: string}): Promise<void> {
        await this.loginOrSignup(() => fetcher<AuthResponse>(
            query.SingUpMutation,
            { email, username, password },
        ));
    }

    async login({ email, password }: {email: string, password: string}): Promise<void> {
        await this.loginOrSignup(() => fetcher<AuthResponse>(
            query.LogInMutation,
            { identifier: email, password },
        ));
    }


    async fetchMe(): Promise<void> {
        if (!this.isAuth) return this.setIsUserFetched();
        try {
            const { me } = await fetcher(query.MeQuery);
            this.setUser(me);
            return this.setIsUserFetched();
        } catch (error) {
            clearCookie(AUTH_TOKEN_NAME);
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

    public setError(state: string|null = null): void {
        this.error = state;
    }
}
