import type { RecordService } from 'pocketbase';
import type PocketBase from 'pocketbase';
import type { z } from 'zod';
import type { AuthUserSchema, CartItemSchema } from './schemas';


export type AuthUser = z.infer<typeof AuthUserSchema>;


export type Unit = 'gram' | 'kilogram' | 'milligram' | 'milliliter' | 'liter' | 'milliliter' | 'piece';

export interface ProductType {
  id: string;
  name: string;
  price: number;
  discount: number;
  description: string;
  images: string[];
  category: string;
  country: string;
  unit: Unit;
}


export interface TypedPocketBase extends PocketBase {
  collection:
    ((idOrName: string) => RecordService) &
    ((idOrName: 'products') => RecordService<ProductType>);
}

export type CartItem = z.infer<typeof CartItemSchema>;
