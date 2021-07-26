import { User } from './User';


export interface AuthStore {
    user?: User|null
    setUser(user: User, jwt?: string): void
    logout(): void
}
