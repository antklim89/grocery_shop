'use server';
import type { RecordAuthResponse, RecordModel } from 'pocketbase';
import { handlePocketBaseError } from '@/lib/handlePocketbaseError';
import { pb } from '@/lib/pocketbase/client';
import { err, ok, type PromiseResult } from '@/lib/result';
import { cookies } from 'next/headers';


export async function login({ email, password }: { email: string; password: string }): PromiseResult<RecordAuthResponse<RecordModel>, string> {
  try {
    const result = await pb.collection('users').authWithPassword(email, password);

    const cookie = pb.authStore.exportToCookie().split(';')[0]?.split('=')[1]?.trim();
    cookies().set('pb_auth', cookie ?? '', { httpOnly: true, sameSite: 'strict', secure: true });

    return ok(result);
  } catch (error) {
    return err(handlePocketBaseError(error));
  }
}

export async function signup({ email, password }: { email: string; password: string }): PromiseResult<{ id: string }, string> {
  try {
    const result = await pb.collection('users').create({
      email,
      password,
      passwordConfirm: password,
    });
    return ok({ id: result.id });
  } catch (error) {
    return err(handlePocketBaseError(error));
  }
}
