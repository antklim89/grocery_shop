import { AuthStore } from '~/types';


export const authStore: AuthStore = {
    user: null,

    setUser(user) {
        this.user = user;
    },

    logout() {
        this.user = null;
        localStorage.removeItem('token');
    },
};
