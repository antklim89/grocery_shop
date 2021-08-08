import { IProfile } from './IProfile';


export interface User {
    email: string;
    id: string;
    username: string;
    profile?: IProfile
}
