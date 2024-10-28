import { toast } from '@/hooks/use-toast';
import { login, signup } from '@/lib/actions/auth';
import { pb } from '@/lib/pocketbase/client';
import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';


export function useLoginQuery() {
  const router = useRouter();

  return useSWRMutation<any, Error, 'auth', { email: string; password: string }>(
    'auth',
    async (key, { arg }) => {
      const [err, val] = await login(arg);

      if (err == null) {
        toast({
          title: 'Login successful',
          description: 'You are now logged in.',
        });
        pb.authStore.save(val.token, val.record);

        router.back();
        location.reload();
      } else {
        toast({
          variant: 'error',
          title: 'Signup failed',
          description: err,
        });
      }
      return [err, val];
    },
    {},
  );
}

export function useSignupQuery() {
  const router = useRouter();

  return useSWRMutation<any, Error, 'auth', { email: string; password: string }>(
    'auth',
    async (key, { arg }) => {
      const [err, val] = await signup(arg);

      if (err == null) {
        await login(arg);

        toast({
          title: 'Signup successful',
          description: 'You are now logged in.',
        });

        router.replace('/auth/?login');
      } else {
        toast({
          variant: 'error',
          title: 'Signup failed',
          description: err,
        });
      }
      return [err, val];
    },
    {},
  );
}
