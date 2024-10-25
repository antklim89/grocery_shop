import { toast } from '@/hooks/use-toast';
import { login, signup } from '@/lib/actions/auth';
import useSWRMutation from 'swr/mutation';


export function useLoginQuery() {
  return useSWRMutation<any, Error, 'auth', { email: string; password: string }>(
    'auth',
    async (key, { arg }) => {
      const [err, val] = await login(arg);
      if (err == null) {
        toast({
          title: 'Login successful',
          description: 'You are now logged in.',
        });
      } else {
        toast({
          variant: 'destructive',
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
  return useSWRMutation<any, Error, 'auth', { email: string; password: string }>(
    'auth',
    async (key, { arg }) => {
      const [err, val] = await signup(arg);

      if (err == null) {
        toast({
          title: 'Signup successful',
          description: 'You are now logged in.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Signup failed',
          description: err,
        });
      }
      return [err, val];
    },
    {},
  );
}
