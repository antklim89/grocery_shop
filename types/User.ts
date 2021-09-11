import type { UserStore } from '~/store/UserStote';


export type User = Pick<UserStore, 'email'|'id'|'name'|'surname'|'phone'|'address'>
