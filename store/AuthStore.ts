import { makeAutoObservable } from 'mobx';

import LogInMutation from '~/queries/LogInMutation.gql';
import MeQuery from '~/queries/MeQuery.gql';
import SingUpMutation from '~/queries/SingUpMutation.gql';
import { AuthResponse, User } from '~/types';
import fetcher from '~/utils/fetcher';
import client from '~/utils/graphql-request';


export default class AuthStore {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    public user?: User | null;

    public isAuth = typeof window === 'undefined' ? true : !!localStorage.getItem('token')

    public isUserFetched = false

    public loading = false

    public error: null | string = null

    setUser(user: User, jwt?: string): void {
        this.user = user;
        this.isAuth = true;

        if (jwt) {
            localStorage.setItem('token', jwt);
            client.setHeader('Authorization', `Bearer ${jwt}`);
        }
    }

    async logout(): Promise<void> {
        this.user = null;
        this.isAuth = false;

        localStorage.removeItem('token');
        client.setHeader('Authorization', '');
    }

    async signup({ email, username, password }: {email: string, username: string, password: string}): Promise<void> {
        await this.loginOrSignup(() => fetcher<AuthResponse>(SingUpMutation, {
            email, username, password,
        }));
    }

    async login({ email, password }: {email: string, password: string}): Promise<void> {
        await this.loginOrSignup(() => fetcher<AuthResponse>(LogInMutation, {
            identifier: email, password,
        }));
    }


    async fetchMe(): Promise<void> {
        if (!this.isAuth) {
            this.isUserFetched = true;
            return;
        }
        try {
            const { me } = await client.request(MeQuery);
            this.setUser(me);
            this.setIsUserFetched();
        } catch (error) {
            console.error('Fetch Me Error: \n', error);
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
