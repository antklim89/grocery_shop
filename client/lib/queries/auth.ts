import type { AuthUser } from '@/lib/types';
import { toast } from '@/hooks/use-toast';
import { login, logout, signup } from '@/lib/actions/auth';
import { pb } from '@/lib/pocketbase/client';
import { AuthUserSchema } from '@/lib/schemas';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';


export function useUserQuery() {
  return useSWR<AuthUser | null, Error, 'auth'>(
    'auth',
    async () => {
      const model = pb.authStore.model;
      if (model == null) return null;
      const user = await AuthUserSchema.parseAsync(model).catch(() => null);
      return user;
    },
    {
      fallbackData: null,
    },
  );
}

export function useLoginQuery() {
  const router = useRouter();

  return useSWRMutation<AuthUser, Error, 'auth', { email: string; password: string }>(
    'auth',
    async (key, { arg }) => {
      const model = await login(arg);
      pb.authStore.save(model.token, model.record);
      const user = await AuthUserSchema.parseAsync(model.record);

      return user;
    },
    {
      populateCache: newData => newData,
      revalidate: false,

      onSuccess() {
        router.replace('/');

        toast({
          title: 'Login successful',
          description: 'You are now logged in.',
        });
      },
      onError(err) {
        toast({
          variant: 'error',
          title: 'Signup failed',
          description: err.message,
        });
      },
    },
  );
}

export function useSignupQuery() {
  const router = useRouter();

  return useSWRMutation<AuthUser, Error, 'auth', { email: string; password: string }>(
    'auth',
    async (key, { arg }) => {
      await signup(arg);
      const model = await login(arg);
      pb.authStore.save(model.token, model.record);
      const user = await AuthUserSchema.parseAsync(model);

      return user;
    },
    {
      populateCache: newData => newData,
      revalidate: false,
      onSuccess() {
        router.replace('/');

        toast({
          title: 'Signup successful',
          description: 'You are now logged in.',
        });
      },
      onError(err) {
        toast({
          variant: 'error',
          title: 'Signup failed',
          description: err.message,
        });
      },
    },
  );
}

export function useLogoutQuery() {
  return useSWRMutation<void, Error, 'auth', void>(
    'auth',
    async () => {
      await logout();
      pb.authStore.clear();
    },
    {
      populateCache: () => null,
      revalidate: false,
    },
  );
}

