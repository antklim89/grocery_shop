import { cookies } from 'next/headers';
import PocketBase from 'pocketbase';


if (typeof window !== 'undefined') throw new Error('This file should be imported on the server only');

export async function initPocketBase() {
  const pb = new PocketBase(process.env.SERVER_URL);

  const authCookie = (await cookies()).get('pb_auth');

  if (!authCookie) return pb;

  pb.authStore.loadFromCookie(`${authCookie.name}=${authCookie.value}`);
  try {
    pb.authStore.isValid && await pb.collection('users').authRefresh();
  } catch {
    pb.authStore.clear();
  }

  return pb;
}
