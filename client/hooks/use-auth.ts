import type { UserType } from '@/lib/types';
import { login, logout, signup } from '@/actions/auth';
import { toast } from '@/hooks/use-toast';
import { pb } from '@/lib/pocketbase/client';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';


export function useUserQuery() {
  return useSWR<UserType | null, Error, 'auth'>(
    'auth',
    async () => {
      return pb.authStore.record;
    },
    {
      fallbackData: null,
    },
  );
}

export function useLoginQuery() {
  const router = useRouter();

  return useSWRMutation<UserType, Error, 'auth', { email: string; password: string }>(
    'auth',
    async (key, { arg }) => {
      const user = await login(arg);
      pb.authStore.save(user.token, user.record);

      return user.record;
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

  return useSWRMutation<UserType, Error, 'auth', { email: string; password: string }>(
    'auth',
    async (key, { arg }) => {
      await signup(arg);
      const user = await login(arg);
      pb.authStore.save(user.token, user.record);

      return user.record;
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

