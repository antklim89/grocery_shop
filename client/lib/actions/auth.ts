'use server';
import { handlePocketBaseError } from '@/lib/handlePocketbaseError';
import { pb } from '@/lib/pocketbase';
import { err, ok, type PromiseResult } from '@/lib/result';


export async function login({ email, password }: { email: string; password: string }): PromiseResult<{ id: string }, string> {
  try {
    const result = await pb.collection('users').authWithPassword(email, password);
    return ok({ id: result.record.id });
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
