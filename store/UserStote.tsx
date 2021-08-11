import { makeAutoObservable } from 'mobx';

import UpdateUserMutation from '~/queries/UpdateUserMutation.gql';
import type { User } from '~/types';
import fetcher from '~/utils/fetcher';


export class UserStore implements User {
    constructor(args: User) {
        this.email = args.email;
        this.id = args.id;
        this.username = args.username;
        this.name = args.name;
        this.surname = args.surname;
        this.phone = args.phone;
        this.address = args.address;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    public email: string;

    readonly id: string;

    public username: string;

    public name?: string;

    public surname?: string;

    public phone?: string;

    public address?: string;

    public savingProfile = false;

    public errors: null | string = null

    setValue<T extends User, U extends 'phone'|'name'|'surname'|'address'>(
        this: T, key: U, newValue: T[U],
    ): void {
        this[key] = newValue;
    }

    async updateServerProfile(): Promise<void> {
        this.setSavingProfile(true);
        this.setErrors();
        const { name, surname, address, phone } = this;
        try {
            await fetcher(UpdateUserMutation, { name, surname, address, phone });
        } catch (error) {
            this.setErrors(error.message);
        } finally {
            this.setSavingProfile(false);
        }
    }

    setSavingProfile(state = true): void {
        this.savingProfile = state;
    }

    setErrors(state = null): void {
        this.errors = state;
    }
}
