import type { RecordService } from 'pocketbase';
import type PocketBase from 'pocketbase';
import type { z } from 'zod';
import type { AuthUserSchema } from './schemas';


export type AuthUser = z.infer<typeof AuthUserSchema>;

export interface ProductType {
  id: string;
  name: string;
  price: number;
  discount: number;
  description: string;
  images: string[];
  category: string;
  country: string;
}


export interface TypedPocketBase extends PocketBase {
  collection:
    ((idOrName: string) => RecordService) &
    ((idOrName: 'products') => RecordService<ProductType>);
}
