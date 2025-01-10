import type { TypedPocketBaseExtended } from '@/lib/types';
import PocketBase from 'pocketbase';


export const pb = new PocketBase('/pb') as TypedPocketBaseExtended;
pb.autoCancellation(false);
