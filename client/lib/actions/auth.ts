'use server';
import type { RecordAuthResponse, RecordModel } from 'pocketbase';
import { handlePocketBaseError } from '@/lib/handlePocketbaseError';
import { pb } from '@/lib/pocketbase/client';
import { cookies } from 'next/headers';


export async function login({ email, password }: { email: string; password: string }): Promise<RecordAuthResponse<RecordModel>> {
  try {
    const result = await pb.collection('users').authWithPassword(email, password);

    const cookie = pb.authStore.exportToCookie().split(';')[0]?.split('=')[1]?.trim();
    (await cookies()).set('pb_auth', cookie ?? '', { httpOnly: true, sameSite: 'strict', secure: true });

    return result;
  } catch (error) {
    throw new Error(handlePocketBaseError(error));
  }
}

export async function signup({ email, password }: { email: string; password: string }): Promise<{ id: string }> {
  try {
    const result = await pb.collection('users').create({
      email,
      password,
      passwordConfirm: password,
    });
    return { id: result.id };
  } catch (error) {
    throw new Error(handlePocketBaseError(error));
  }
}

export async function logout() {
  (await cookies()).delete('pb_auth');
}
