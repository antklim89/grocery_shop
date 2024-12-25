'use server';
import type { UserType } from '@/lib/types';
import type { RecordAuthResponse } from 'pocketbase';
import { pb } from '@/lib/pocketbase/client';
import { isPocketBaseError } from '@/lib/utils';
import { cookies } from 'next/headers';


export async function login({ email, password }: { email: string; password: string }): Promise<RecordAuthResponse<UserType>> {
  try {
    const result = await pb.collection('users').authWithPassword(email, password);

    const cookie = pb.authStore.exportToCookie().split(';')[0]?.split('=')[1]?.trim();

    const expires = new Date();
    expires.setMonth(expires.getMonth() + 1);
    (await cookies()).set('pb_auth', cookie ?? '', {
      expires,
      httpOnly: true,
      sameSite: 'strict',
      // secure: true,
    });

    return result;
  } catch {
    throw new Error('Failed to login. Email or password is invalid.');
  }
}

export async function signup({ email, password }: { email: string; password: string }): Promise<UserType> {
  try {
    const result = await pb.collection('users').create({
      email,
      password,
      passwordConfirm: password,
    });

    return result;
  } catch (error) {
    if (isPocketBaseError(error)) {
      if (error.response.data.email?.code === 'validation_not_unique') {
        throw new Error('User with this email is already exists.');
      }
      throw new Error(error.response.message ?? 'Failed to sign up.');
    }
    throw new Error('Failed to sign up.');
  }
}

export async function logout() {
  (await cookies()).delete('pb_auth');
}
