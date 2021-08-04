import { makeAutoObservable } from 'mobx';

import { User } from '~/types';
import client from '~/utils/graphql-request';


export default class AuthStore {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    user?: User | null;

    setUser(user: User, jwt?: string): void {
        this.user = user;
        this.isAuth = true;

        if (jwt) {
            localStorage.setItem('token', jwt);
            client.setHeader('Authorization', `Bearer ${jwt}`);
        }
    }

    logout(): void {
        this.user = null;
        this.isAuth = false;

        localStorage.removeItem('token');
        client.setHeader('Authorization', '');
    }

    isAuth = typeof window === 'undefined' ? true : !!localStorage.getItem('token')
}
