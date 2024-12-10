import type { z } from 'zod';
import type { units } from './constants';
import type { CartItemSchema } from './schemas';


export type CartItem = z.infer<typeof CartItemSchema>;
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

export interface UserType {
  id: string;
  avatar: string;
  created: string;
  email: string;
  name: string;
}
