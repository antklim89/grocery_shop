import { makeAutoObservable } from 'mobx';

import query from '~/queries/Auth.gql';
import type { User } from '~/types';
import fetcher from '~/utils/fetcher';


export class UserStore implements User {
    constructor(args: User) {
        this.email = args.email;
        this.id = args.id;
        this.name = args.name;
        this.surname = args.surname;
        this.phone = args.phone;
        this.address = args.address;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    public email: string;

    readonly id: string;

    public name = '';

    public surname = '';

    public phone = '';

    public address = '';

    public savingProfile = false;


    async saveProfile(newValues: Pick<UserStore, 'name'|'surname'|'address'|'phone'>): Promise<void> {
        if (this.savingProfile) return;
        this.setSavingProfile(true);
        try {
            await fetcher(query.UpdateUserMutation, newValues);
        } finally {
            this.setSavingProfile(false);
        }
    }

    setSavingProfile(state = true): void {
        this.savingProfile = state;
    }

    get username(): string {
        return this.email.replace(/^(.*)@.*$/, '$1');
    }

}
