import type { BaseAuthStore, RecordModel } from 'pocketbase';
import type { z } from 'zod';
import type { units } from './constants';
import type { TypedPocketBase } from './pocketbase-types';
import type { CartItemSchema } from './schemas';


export type TypedPocketBaseExtended = TypedPocketBase & {
  authStore: BaseAuthStore & {
    record: UserType;
    save: (token: string, record: UserType) => void;
  };
};

export type CartItem = z.infer<typeof CartItemSchema>;
export type CartItemUpdate = Partial<Pick<CartItem, 'qty'>>;

export type Unit = typeof units[number];

export interface ProductType {
  id: string;
  name: string;
  price: number;
  discount: number;
  description: string;
  images: string[];
  category: string;
  country: string;
  batch: number;
  unit: Unit;
}

export interface UserType extends Omit<RecordModel, 'expand'> {
  id: string;
  avatar: string;
  created: string;
  email: string;
  name: string;
}
