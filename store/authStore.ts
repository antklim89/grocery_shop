import { AuthStore } from '~/types';
import client from '~/utils/graphql-request';


export const authStore: AuthStore = {
    user: null,

    setUser(user, jwt) {
        this.user = user;
        if (jwt) {
            localStorage.setItem('token', jwt);
            client.setHeader('Authorization', `Bearer ${jwt}`);
        }
        this.isAuth = true;
    },

    logout() {
        this.user = null;
        localStorage.removeItem('token');
        client.setHeader('Authorization', '');
        this.isAuth = false;
    },

    isAuth: typeof window === 'undefined' ? true : !!localStorage.getItem('token'),

    get tokenExists() {
        return !!localStorage.getItem('token');
    },
};
