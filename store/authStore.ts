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
    },

    logout() {
        this.user = null;
        localStorage.removeItem('token');
    },
};
