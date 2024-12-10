import type { TypedPocketBase } from '@/lib/pocketbase-types';
import { cookies } from 'next/headers';
import PocketBase from 'pocketbase';
import { cache } from 'react';


if (typeof window !== 'undefined') throw new Error('This file should be imported on the server only');

export const initPocketBase = cache(async () => {
  const pb = new PocketBase(process.env.SERVER_URL) as TypedPocketBase;
  pb.autoCancellation(false);

  const authCookie = (await cookies()).get('pb_auth');

  if (!authCookie) return pb;

  pb.authStore.loadFromCookie(`${authCookie.name}=${authCookie.value}`);
  try {
    pb.authStore.isValid && await pb.collection('users').authRefresh();
  } catch {
    pb.authStore.clear();
  }

  return pb;
});
