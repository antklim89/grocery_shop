import type { TypedPocketBase } from '@/lib/types';
import PocketBase from 'pocketbase';


export const pb = new PocketBase(process.env.SERVER_URL) as TypedPocketBase;
pb.autoCancellation(false);
