import type { User } from '~/types';


export interface AuthResponse {
    data: {
        jwt: string;
        user: User;
    };
}
