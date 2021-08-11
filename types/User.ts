import type { UserStore } from '~/store/UserStote';


export type User = Pick<UserStore, 'email'|'id'|'username'|'name'|'surname'|'phone'|'address'>
