import type { TypedPocketBaseExtended } from '@/lib/types';
import PocketBase from 'pocketbase';


export const pb = new PocketBase(process.env.SERVER_URL) as TypedPocketBaseExtended;
pb.autoCancellation(false);
